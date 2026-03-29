import { User, Bot } from "lucide-react";

interface MessageProps {
  role: "user" | "ai";
  content: string;
}

export default function MessageBubble({ role, content }: MessageProps) {
  const isAI = role === "ai";

  return (
    <div
      className={`flex w-full ${isAI ? "justify-start" : "justify-end"} mb-6`}
    >
      <div
        className={`flex max-w-[80%] md:max-w-[70%] ${isAI ? "flex-row" : "flex-row-reverse"} items-end gap-3`}
      >
        {/* Avatar Icon */}
        <div
          className={`shrink-0 h-10 w-10 rounded-full flex items-center justify-center border shadow-lg ${
            isAI
              ? "bg-slate-900 border-cyan-500/50 text-cyan-400"
              : "bg-slate-800 border-slate-600 text-slate-300"
          }`}
        >
          {isAI ? <Bot size={20} /> : <User size={20} />}
        </div>

        {/* Message Box */}
        <div
          className={`p-4 rounded-2xl shadow-md text-sm md:text-base leading-relaxed ${
            isAI
              ? "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
              : "bg-cyan-600 text-white rounded-br-none"
          }`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
