import { Target, Search } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      {/* Container with pulsing neon cyan glow */}
      <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-cyan-950/20 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-pulse-slow">
        {/* Animated outer spinning search ring */}
        <Search
          className="absolute text-cyan-500 animate-spin-slow opacity-60"
          size={32}
        />

        {/* Fixed target company icon in the center */}
        <Target className="text-cyan-400 opacity-90" size={32} />
      </div>

      {/* Status Text (also pulsing subtly) */}
      <p className="mt-8 text-cyan-400 font-mono text-sm tracking-widest animate-pulse">
        PROCESSING FINANCIAL DATASET...
      </p>
    </div>
  );
}
