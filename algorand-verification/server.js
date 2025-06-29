require('dotenv').config();
const express = require('express');
const cors = require('cors');
const algosdk = require('algosdk');

const app = express();
app.use(express.json());
app.use(cors());

const fs = require('fs').promises;

// Deploy a job listing smart contract to Algorand
app.post('/api/algorand/deployJobListing', async (req, res) => {
  try {
    const { title, description, company = '', expiration } = req.body;
    if (!title || !description || !expiration) {
      return res.status(400).json({ error: 'Missing job info (title, description, expiration)' });
    }
    const desc = description;
    // 1. Read TEAL files
    const approvalTeal = await fs.readFile('job_listing_approval.teal', 'utf8');
    const clearTeal = await fs.readFile('job_listing_clear.teal', 'utf8');

    // 2. Compile TEAL to bytecode
    const approvalResp = await algodClient.compile(approvalTeal).do();
    const clearResp = await algodClient.compile(clearTeal).do();
    const approvalProg = new Uint8Array(Buffer.from(approvalResp.result, 'base64'));
    const clearProg = new Uint8Array(Buffer.from(clearResp.result, 'base64'));

    // 3. Prepare app create transaction
    const params = await algodClient.getTransactionParams().do();
    // Ensure all appArgs are Uint8Array (not Buffer) and strings
    const toUint8Array = (input) => new Uint8Array(Buffer.from(String(input), 'utf8'));
    // Helper to encode a JS number as 8-byte big-endian Uint8Array
    function uint64ToBigEndian(val) {
      const arr = new Uint8Array(8);
      for (let i = 7; i >= 0; i--) {
        arr[i] = val & 0xff;
        val >>= 8;
      }
      return arr;
    }
    const appArgs = [
      toUint8Array(title),
      toUint8Array(desc),
      toUint8Array(company),
      uint64ToBigEndian(Number(expiration))
    ];

    const txn = algosdk.makeApplicationCreateTxnFromObject({
      from: centralAccount.addr,
      approvalProgram: approvalProg,
      clearProgram: clearProg,
      suggestedParams: params,
      numGlobalInts: 1,
      numGlobalByteSlices: 4,
      numLocalInts: 0,
      numLocalByteSlices: 0,
      appArgs
    });
    // 4. Sign and send
    const signedTxn = txn.signTxn(centralAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    // 5. Wait for confirmation
    let confirmed = false;
    let round = (params.firstRoundValid || params['firstRoundValid'] || params['firstRound'] || params['lastRound'] || 0);
    if (typeof round !== 'number' || isNaN(round) || round === 0) {
      round = (await algodClient.status().do())['last-round'] || 1;
    }
    while (!confirmed) {
      const pending = await algodClient.pendingTransactionInformation(txId).do();
      if (pending['confirmed-round'] && pending['confirmed-round'] > 0) {
        confirmed = true;
        // 6. Respond with appId
        return res.json({ appId: pending['application-index'], txId });
      }
      round++;
      await algodClient.statusAfterBlock(round).do();
    }
  } catch (err) {
    console.error('Algorand deploy error:', err);
    res.status(500).json({ error: err.message || 'Algorand deploy error' });
  }
});

const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const mnemonic = process.env.ALGOD_MNEMONIC;
if (!mnemonic) throw new Error('ALGOD_MNEMONIC not set in environment!');
const centralAccount = algosdk.mnemonicToSecretKey(mnemonic);

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) : str;
}

// Remove Express proxy for /api/algorand/verify and instruct to use Edge Function directly
// You can now call the Edge Function directly from your frontend:
// fetch('https://occrvhahkgvvyzvpnsjz.functions.supabase.co/algorand-verify', { ... })
// No need to run this Node server for verification anymore.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Algorand verification server running on port ${PORT}`);
});
