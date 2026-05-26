import { Eye, EyeOff } from "lucide-react";
import { useCalculator } from "../context/CalculatorContext";
import type { QuoteMode } from "../types";

export default function QuoteModeToggle() {
  const { state, dispatch } = useCalculator();

  const modes: { id: QuoteMode; label: string; icon: typeof Eye }[] = [
    { id: "internal", label: "Internal Mode", icon: EyeOff },
    { id: "customer", label: "Customer Quote", icon: Eye },
  ];

  return (
    <div className="inline-flex rounded-xl border border-black/10 bg-white p-1 shadow-sm">
      {modes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => dispatch({ type: "SET_QUOTE_MODE", mode: id })}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${
            state.quoteMode === id
              ? "bg-[#1d3c34] text-white"
              : "text-on-cream-muted hover:bg-[#faf8f5]"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
