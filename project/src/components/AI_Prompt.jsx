import React, { useEffect, useState } from "react"

import { ArrowRight, Bot, Check, ChevronDown, Paperclip, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export default function AI_Prompt({ prefill, setPrefill }) {
  const [value, setValue] = useState(prefill || "")
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 300,
  })
  const [selectedModel, setSelectedModel] = useState("GPT-4-1 Mini")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const AI_MODELS = ["o3-mini", "Gemini 2.5 Flash", "Claude 3.5 Sonnet", "GPT-4-1 Mini", "GPT-4-1"]
  const OPENAI_SVG = (
    <div className="w-4 h-4 flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 260"
        aria-label="o3-mini icon"
        className="dark:hidden block w-4 h-4"
      >
        <title>OpenAI Icon Light</title>
        <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 260"
        aria-label="o3-mini icon"
        className="hidden dark:block w-4 h-4"
      >
        <title>OpenAI Icon Dark</title>
        <path
          fill="#fff"
          d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"
        />
      </svg>
    </div>
  )
  const MODEL_ICONS = {
    "o3-mini": OPENAI_SVG,
    "Gemini 2.5 Flash": (
      <div className="w-4 h-4 flex-shrink-0">
        <svg
          height="16"
          width="16"
          style={{ flex: "none", lineHeight: "1" }}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
        >
          <title>Gemini</title>
          <defs>
            <linearGradient id="lobe-icons-gemini-fill" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
              <stop offset="0%" stopColor="#1C7DFF" />
              <stop offset="52.021%" stopColor="#1C69FF" />
              <stop offset="100%" stopColor="#F0DCD6" />
            </linearGradient>
          </defs>
          <path
            d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
            fill="url(#lobe-icons-gemini-fill)"
            fillRule="nonzero"
          />
        </svg>
      </div>
    ),
    "Claude 3.5 Sonnet": (
      <div className="w-4 h-4 flex-shrink-0">
        <svg
          fill="#000"
          fillRule="evenodd"
          style={{ flex: "none", lineHeight: "1" }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className="dark:hidden block w-4 h-4"
        >
          <title>Anthropic Icon Light</title>
          <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
        </svg>
        <svg
          fill="#ffff"
          fillRule="evenodd"
          style={{ flex: "none", lineHeight: "1" }}
          viewBox="0 0 24 24"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className="hidden dark:block w-4 h-4"
        >
          <title>Anthropic Icon Dark</title>
          <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
        </svg>
      </div>
    ),
    "GPT-4-1 Mini": OPENAI_SVG,
    "GPT-4-1": OPENAI_SVG,
  }

  useEffect(() => {
    if (prefill) setValue(prefill)
  }, [prefill])

  // Use the deployed Supabase Edge Function URL
  const SUPABASE_AI_COACH_URL = "https://occrvhahkgvvyzvpnsjz.functions.supabase.co/ai-coach";

  const handleSend = async () => {
    if (!value.trim()) return;
    setLoading(true);
    setShowPopup(true);
    setResponse("");
    try {
      const res = await fetch(SUPABASE_AI_COACH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: value })
      });
      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || data.result || data.response || 'No response from AI.');
    } catch (err) {
      setResponse('Error contacting AI Coach.');
    }
    setLoading(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
      setValue("")
      adjustHeight(true)
    }
  }

  return (
    <div className="w-full max-w-3xl py-4 relative z-10">
      {/* Answer Popup */}
      <AnimatePresence>
        {showPopup && (loading || response) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <div className="relative bg-white/90 dark:bg-[#18122B] rounded-2xl shadow-2xl p-8 max-w-xl w-full mx-4">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                onClick={() => { setShowPopup(false); setResponse(""); setLoading(false); }}
                aria-label="Close answer"
              >
                <X size={24} />
              </button>
              {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[120px]">
                  <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span className="text-lg text-gray-700 dark:text-white">Thinking...</span>
                </div>
              ) : (
                <div className="text-gray-900 dark:text-white whitespace-pre-line text-base min-h-[120px]">
                  {response}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white/20 dark:bg-white/25 rounded-2xl p-1.5 backdrop-blur-md border border-white/30">
        <div className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <Textarea
                id="ai-input-15"
                value={value}
                placeholder="Let's practice and get you interview ready!"
                className={cn(
                  "w-full rounded-xl rounded-b-none px-4 py-3 bg-white/30 dark:bg-white/20 border-none text-white dark:text-white placeholder:text-white/80 dark:placeholder:text-white/80 resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
                  "min-h-[72px]",
                )}
                ref={textareaRef}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setValue(e.target.value)
                  adjustHeight()
                }}
              />
            </div>

            <div className="h-14 bg-white/30 dark:bg-white/20 rounded-b-xl flex items-center">
              <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 h-8 pl-1 pr-2 text-xs rounded-md text-white hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedModel}
                            initial={{
                              opacity: 0,
                              y: -5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: 5,
                            }}
                            transition={{
                              duration: 0.15,
                            }}
                            className="flex items-center gap-1"
                          >
                            {MODEL_ICONS[selectedModel]}
                            {selectedModel}
                            <ChevronDown className="w-3 h-3 opacity-50 flex-shrink-0" />
                          </motion.div>
                        </AnimatePresence>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={cn(
                        "min-w-[10rem]",
                        "border-black/10 dark:border-white/10",
                        "bg-gradient-to-b from-white via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800",
                      )}
                    >
                      {AI_MODELS.map((model) => (
                        <DropdownMenuItem
                          key={model}
                          onSelect={() => setSelectedModel(model)}
                          className="flex items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            {MODEL_ICONS[model] || <Bot className="w-4 h-4 opacity-50" />}
                            <span>{model}</span>
                          </div>
                          {selectedModel === model && <Check className="w-4 h-4 text-blue-500" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-0.5" />
                  <label
                    className={cn(
                      "rounded-lg p-2 bg-black/5 dark:bg-white/5 cursor-pointer",
                      "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                      "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white",
                    )}
                    aria-label="Attach file"
                  >
                    <input type="file" className="hidden" />
                    <Paperclip className="w-4 h-4 transition-colors" />
                  </label>
                </div>
                <button
                  type="button"
                  className={cn(
                    "rounded-lg p-2 bg-black/5 dark:bg-white/5",
                    "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
                  )}
                  aria-label="Send message"
                  disabled={!value.trim() || loading}
                  onClick={handleSend}
                >
                  <ArrowRight
                    className={cn(
                      "w-4 h-4 dark:text-white text-black transition-opacity duration-200",
                      value.trim() ? "opacity-100" : "opacity-30",
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}