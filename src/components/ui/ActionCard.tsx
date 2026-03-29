import { BrainCircuit, LineChart, Newspaper } from "lucide-react";

interface CardProps {
  type: "sentiment" | "prediction" | "news";
  onClick: () => void;
}

export default function ActionCard({ type, onClick }: CardProps) {
  // Define content and styles based on the type, matching the reference's soft pastel feel
  const content = {
    sentiment: {
      title: "Company Analytics",
      description: "Analyze JKH financials & sentiment.",
      icon: BrainCircuit,
      // Pale blue from image
      baseStyle:
        "bg-sky-950/20 border-sky-700/30 hover:shadow-[0_0_15px_rgba(125,211,252,0.3)] hover:scale-105",
      iconStyle: "text-sky-400 bg-sky-950/60",
    },
    prediction: {
      title: "Trend Forecaster",
      description: "Predict JKH short-term movement.",
      icon: LineChart,
      // Pale red from image
      baseStyle:
        "bg-red-950/20 border-red-700/30 hover:shadow-[0_0_15px_rgba(252,165,165,0.3)] hover:scale-105",
      iconStyle: "text-red-400 bg-red-950/60",
    },
    news: {
      title: "Market Pulse",
      description: "Scrape latest news for JKH.",
      icon: Newspaper,
      // Pale green from image
      baseStyle:
        "bg-emerald-950/20 border-emerald-700/30 hover:shadow-[0_0_15px_rgba(110,231,183,0.3)] hover:scale-105",
      iconStyle: "text-emerald-400 bg-emerald-950/60",
    },
  };

  const {
    title,
    description,
    icon: Icon,
    baseStyle,
    iconStyle,
  } = content[type];

  return (
    <button
      onClick={onClick}
      className={`flex flex-col w-full text-left p-6 rounded-2xl border transition-all duration-300 ease-out group ${baseStyle}`}
    >
      {/* Icon Badge */}
      <div
        className={`flex items-center justify-center h-12 w-12 rounded-full mb-6 border border-current opacity-70 group-hover:opacity-100 ${iconStyle}`}
      >
        <Icon size={24} />
      </div>

      {/* Text */}
      <h3 className="text-xl font-medium text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </button>
  );
}
