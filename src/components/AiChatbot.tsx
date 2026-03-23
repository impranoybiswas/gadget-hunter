"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { FiSend, FiX } from "react-icons/fi";

type Message = { role: "user" | "assistant"; text: string };

export default function AiChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm Gadget Hunter's AI assistant 🤖 How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, open]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setChat((prev) => [...prev, { role: "user", text: trimmed }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          text: res.ok ? data.reply : data.error || "Something went wrong.",
        },
      ]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "assistant", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-30 right-0 z-[150] bg-primary hover:bg-primary-focus text-primary-content shadow-lg rounded-l-2xl px-4 py-3.5 transition-all duration-300 hover:px-5 cursor-pointer flex items-center gap-2"
        aria-label="Open AI Chat"
      >
        {open ? <FiX size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-44 right-4 z-[150] w-80 sm:w-96 flex flex-col rounded-3xl overflow-hidden shadow-2xl border border-base-content/10 bg-base-100 max-h-[70vh]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-primary text-primary-content">
              <div className="size-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <FaRobot size={18} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm leading-tight">
                  Gadget Hunter AI
                </p>
                <p className="text-xs opacity-70">Always here to help</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="size-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-base-200/30 min-h-0">
              {chat.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1">
                      <FaRobot size={12} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-content rounded-tr-none"
                        : "bg-base-100 text-base-content border border-base-content/8 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="size-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FaRobot size={12} />
                  </div>
                  <div className="bg-base-100 border border-base-content/8 rounded-2xl rounded-tl-none px-4 py-2.5 flex gap-1 items-center">
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="size-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-base-content/8 bg-base-100 flex items-center gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about products..."
                className="flex-1 bg-base-200/60 border border-base-content/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-base-content placeholder:text-base-content/30"
              />
              <button
                onClick={sendMessage}
                disabled={!message.trim() || loading}
                className="bg-primary hover:bg-primary-focus disabled:opacity-40 disabled:cursor-not-allowed text-primary-content size-10 rounded-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                <FiSend size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
