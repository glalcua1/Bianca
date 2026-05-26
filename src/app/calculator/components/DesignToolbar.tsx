import { Plus, Sparkles } from "lucide-react";
import { SAMPLE_DESIGNS } from "../data/sampleDesigns";
import { useCalculator } from "../context/CalculatorContext";

export default function DesignToolbar() {
  const { dispatch } = useCalculator();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "NEW_DESIGN" })}
          className="inline-flex items-center gap-2 rounded-lg border border-[#1d3c34]/20 px-4 py-2 text-sm text-[#1d3c34] transition hover:bg-[#1d3c34]/5"
        >
          <Plus className="h-4 w-4" />
          New Design
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#717182]">
          <Sparkles className="h-3 w-3" />
          Samples
        </span>
        {SAMPLE_DESIGNS.map((sample) => (
          <button
            key={sample.name}
            type="button"
            onClick={() => dispatch({ type: "LOAD_SAMPLE", design: sample })}
            className="rounded-full border border-[#C9A962]/30 px-3 py-1 text-xs text-[#8B7355] transition hover:border-[#C9A962] hover:bg-[#C9A962]/10"
          >
            {sample.name}
          </button>
        ))}
      </div>
    </div>
  );
}
