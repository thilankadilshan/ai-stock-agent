"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Paperclip, ArrowUp, User, Bot } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "The Quant AI Agent is currently under development. Deep analysis for the Sri Lankan Stock Market (CSE) will be live in the next phase. Thank you for testing the interface.",
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center bg-grid overflow-hidden">
      {/* Soft Aurora Blob */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 md:h-150 bg-teal-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Area */}
      {/* ADDED pt-20 md:pt-28 to keep messages below the transparent navbar */}
      <div className="flex-1 w-full max-w-4xl overflow-y-auto p-4 md:p-10 pt-20 md:pt-28 scrollbar-hide pb-40">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-start pt-4 md:pt-10 animate-fade-in">
            <h1 className="text-3xl md:text-6xl font-medium text-white/90 tracking-tight leading-tight mb-8 md:mb-12">
              Hey! Analyst <br />
              <span className="text-white/40">What can I help with?</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div
                onClick={() => setInput("Analyze Financial Reports")}
                className="p-4 md:p-6 rounded-2xl glass hover:bg-white/5 transition-all cursor-pointer group"
              >
                <span className="bg-sky-200/20 text-sky-200 px-3 py-1 rounded-md text-[10px] md:text-xs mb-3 inline-block font-medium">
                  Analysis
                </span>
                <p className="text-white/50 text-xs md:text-sm group-hover:text-white/80 transition-colors">
                  Analyze Financial Reports
                </p>
              </div>
              <div
                onClick={() => setInput("Short-term Price Prediction")}
                className="p-4 md:p-6 rounded-2xl glass hover:bg-white/5 transition-all cursor-pointer group"
              >
                <span className="bg-rose-200/20 text-rose-200 px-3 py-1 rounded-md text-[10px] md:text-xs mb-3 inline-block font-medium">
                  Trends
                </span>
                <p className="text-white/50 text-xs md:text-sm group-hover:text-white/80 transition-colors">
                  Short-term Price Prediction
                </p>
              </div>
              <div
                onClick={() =>
                  setInput("Latest Market Sentiment for Stock Market")
                }
                className="p-4 md:p-6 rounded-2xl glass hover:bg-white/5 transition-all cursor-pointer group"
              >
                <span className="bg-emerald-200/20 text-emerald-200 px-3 py-1 rounded-md text-[10px] md:text-xs mb-3 inline-block font-medium">
                  News
                </span>
                <p className="text-white/50 text-xs md:text-sm group-hover:text-white/80 transition-colors">
                  Latest Market Sentiment for Stock Market
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8 animate-fade-in pt-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 md:gap-4 ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`flex max-w-[90%] md:max-w-[85%] gap-2 md:gap-3 ${msg.role === "ai" ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`h-7 w-7 md:h-8 md:w-8 rounded-full shrink-0 flex items-center justify-center border ${msg.role === "ai" ? "bg-teal-500 border-teal-400 text-black" : "bg-white/10 border-white/10 text-white/60"}`}
                  >
                    {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div
                    className={`p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === "ai" ? "bg-white/5 border border-white/10 text-white/80" : "bg-teal-600 text-white"}`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 animate-pulse ml-1">
                <div className="h-7 w-7 md:h-8 md:w-8 rounded-full bg-teal-500/20 border border-teal-500/20" />
                <div className="text-white/30 text-xs md:text-sm self-center font-mono uppercase tracking-widest">
                  Analyst is processing...
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Input Bar */}
      <div className="z-40 w-full max-w-4xl fixed bottom-4 md:bottom-8 px-4">
        <form
          onSubmit={handleSend}
          className="glass rounded-3xl md:rounded-4xl p-3 md:p-4 flex flex-col gap-2 shadow-2xl transition-all focus-within:border-teal-500/30"
        >
          <div className="flex items-start gap-3 px-2">
            <Sparkles className="text-white/40 mt-2 shrink-0" size={18} />
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything..."
              className="w-full bg-transparent border-none focus:ring-0 text-base md:text-xl text-white/80 placeholder:text-white/20 resize-none min-h-10 max-h-45 overflow-hidden scrollbar-hide py-1.5"
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-2 px-2">
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 transition-all text-[10px] md:text-sm"
            >
              <Paperclip size={14} />
              <span>Attach data</span>
            </button>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-teal-500 flex items-center justify-center text-black hover:bg-teal-400 transition-all shadow-lg disabled:opacity-20"
            >
              <ArrowUp size={isMobile ? 18 : 20} strokeWidth={3} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
