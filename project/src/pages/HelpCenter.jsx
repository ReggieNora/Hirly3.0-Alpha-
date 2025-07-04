import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col items-center justify-start pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-2xl shadow-2xl p-8 border border-white/20"
          style={{
            background: 'rgba(255,255,255,0.13)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderRadius: '2rem',
            border: '1.5px solid rgba(255,255,255,0.18)'
          }}
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4 text-center drop-shadow-[0_0_16px_rgba(168,85,247,0.7)] animate-glow">
            Help Center
          </h1>
          {/* Search Bar with Magnifier Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all shadow"
                style={{backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)'}}
              />
            </div>
          </div>
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 rounded-xl p-4 border border-white/15 shadow"
            >
              <h2 className="text-xl font-semibold text-purple-200 mb-2">Getting Started</h2>
              <p className="text-gray-300 text-sm">Learn how to create an account, set up your profile, and start swiping for jobs.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white/10 rounded-xl p-4 border border-white/15 shadow"
            >
              <h2 className="text-xl font-semibold text-purple-200 mb-2">Account & Security</h2>
              <p className="text-gray-300 text-sm">Manage your account settings, privacy, and learn about our blockchain-powered security.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/10 rounded-xl p-4 border border-white/15 shadow"
            >
              <h2 className="text-xl font-semibold text-purple-200 mb-2">Troubleshooting</h2>
              <p className="text-gray-300 text-sm">Find solutions to common issues or contact our support team for help.</p>
            </motion.div>
          </div>
          <div className="mt-10 text-center">
            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

/* Add this to your global CSS or Tailwind config if not present:
.animate-glow {
  animation: glowPulse 2s infinite alternate;
}
@keyframes glowPulse {
  0% { text-shadow: 0 0 16px #a855f7, 0 0 32px #a855f7; }
  100% { text-shadow: 0 0 32px #a855f7, 0 0 48px #a855f7; }
}
*/
