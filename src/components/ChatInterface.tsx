// src/components/ChatInterface.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Paperclip, ArrowUp, User, Bot } from "lucide-react";
import { Message } from "@/src/types/chat";
import { sendMessageToAI } from "@/src/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();

    // Create the new message array including the user's latest input
    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];

    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // PASSED THE WHOLE ARRAY HERE INSTEAD OF JUST THE STRING
    const aiResponse = await sendMessageToAI(updatedMessages);

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: aiResponse,
      },
    ]);

    setIsTyping(false);
  };

  return (
    <div className="relative h-full w-full flex flex-col items-center bg-grid overflow-hidden">
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-75 md:w-150 h-75 md:h-150 bg-teal-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <div className="flex-1 w-full max-w-4xl overflow-y-auto p-4 md:p-10 pt-20 md:pt-28 scrollbar-hide">
        {messages.length === 0 ? (
          <div className="flex flex-col justify-start pt-4 md:pt-10 animate-fade-in">
            <h1 className="text-3xl md:text-6xl font-medium text-white/90 tracking-tight leading-tight mb-8 md:mb-12">
              Hey! Analyst <br />
              <span className="text-white/40">What can I help with?</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div
                onClick={() => {
                  setInput("Analyze Financial Reports");
                  textareaRef.current?.focus();
                }}
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
                onClick={() => {
                  setInput("Short-term Price Prediction");
                  textareaRef.current?.focus();
                }}
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
                onClick={() => {
                  setInput("Latest Market Sentiment for Stock Market");
                  textareaRef.current?.focus();
                }}
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
                    className={`p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed ${msg.role === "ai" ? "bg-white/5 border border-white/10 text-white/80" : "bg-teal-600 text-white whitespace-pre-wrap"}`}
                  >
                    {msg.role === "ai" ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p className="mb-4 last:mb-0" {...props} />
                          ),
                          strong: ({ node, ...props }) => (
                            <strong
                              className="font-semibold text-white"
                              {...props}
                            />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc ml-6 mb-4 space-y-1"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal ml-6 mb-4 space-y-1"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="pl-1" {...props} />
                          ),
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold text-white mb-4 mt-6"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-xl font-bold text-white mb-3 mt-5"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-lg font-bold text-white mb-2 mt-4"
                              {...props}
                            />
                          ),
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto mb-4">
                              <table
                                className="min-w-full border-collapse border border-white/20"
                                {...props}
                              />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-white/20 bg-white/10 px-4 py-2 text-left font-medium text-white"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-white/20 px-4 py-2"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
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

            <div className="h-32 md:h-48 w-full shrink-0" />
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

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
              className="w-full bg-transparent border-none focus:ring-0 text-base md:text-xl text-white/80 placeholder:text-white/20 resize-none min-h-10 max-h-45 overflow-hidden scrollbar-hide py-1.5 outline-none"
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
