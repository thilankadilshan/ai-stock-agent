"use client";

import { Terminal, Bot, Database, BarChart3, Settings } from "lucide-react";

export default function Sidebar() {
  const icons = [
    { icon: Bot, label: "AI Agent", active: true },
    { icon: Database, label: "Datasets", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <nav className="flex-1 space-y-8 flex flex-col items-center w-full">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className="group relative flex items-center justify-center w-full"
        >
          <div
            className={`cursor-pointer transition-all duration-200 ${
              item.active
                ? "text-teal-400 scale-110"
                : "text-slate-600 hover:text-slate-300 hover:scale-110"
            }`}
          >
            <item.icon size={26} />
          </div>

          {/* Tooltip - Desktop Only */}
          <span className="hidden md:block absolute left-14 px-3 py-1 bg-slate-800 text-teal-400 text-[10px] font-mono rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700 z-50">
            {item.label}
          </span>

          {item.active && (
            <div className="absolute left-0 md:-left-4 h-6 w-1 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
          )}
        </div>
      ))}
    </nav>
  );
}
