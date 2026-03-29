"use client";

import { useState } from "react";
import Sidebar from "@/src/components/Sidebar";
import ChatInterface from "@/src/components/ChatInterface";
import { User, Menu, X, Target } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* 1. Sidebar - Responsive Logic */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-[75px] border-r border-white/5 bg-[#0d0d0d] flex flex-col items-center py-8 gap-10 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-8 w-8 bg-teal-500 rounded-lg flex-shrink-0" />
        <Sidebar />

        {/* Close button for mobile */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute bottom-8 p-2 text-white/40 hover:text-white"
        >
          <X size={24} />
        </button>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Top Minimal Header */}
        <header className="flex items-center justify-between p-4 md:p-6 sticky top-0 bg-[#0d0d0d]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-3">
            {/* Menu Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-white/60 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <Target className="text-teal-500 hidden sm:block" size={20} />
              <h2 className="text-xs md:text-sm font-medium text-white/40 tracking-widest uppercase">
                AI Stock Agent
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="text-xs md:text-sm font-light text-white/60">
              Analyst
            </span>
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500" />
          </div>
        </header>

        <main className="flex-1 relative overflow-hidden">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}
