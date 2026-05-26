import { Clock, Copy, Trash2 } from "lucide-react";
import { useCalculator } from "../context/CalculatorContext";
import { formatCurrency } from "../lib/calculations";
import { cloneDesign } from "../data/sampleDesigns";
import CollapsibleSection from "./ui/CollapsibleSection";

export default function HistoryPanel() {
  const { state, dispatch } = useCalculator();
  const { history } = state;

  return (
    <CollapsibleSection
      title="Calculation History"
      subtitle="Recent pricing — persisted locally"
      defaultOpen={false}
      badge={history.length ? `${history.length}` : undefined}
    >
      {history.length === 0 ? (
        <p className="py-4 text-center text-sm text-on-cream-subtle">
          No history yet. Save a calculation to track recent quotes.
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/5 px-4 py-3"
            >
              <div>
                <p className="font-editorial">{entry.name}</p>
                <p className="flex items-center gap-1 text-xs text-on-cream-muted">
                  <Clock className="h-3 w-3" />
                  {new Date(entry.savedAt).toLocaleString("en-IN")} ·{" "}
                  {formatCurrency(entry.result.finalPrice)}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "LOAD_HISTORY", entryId: entry.id })}
                  className="rounded px-2 py-1 text-xs text-[#1d3c34] hover:bg-[#C9A962]/10"
                >
                  Open
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "SET_DESIGN",
                      design: cloneDesign(entry.design),
                    })
                  }
                  className="rounded p-1.5 text-gold-on-cream hover:bg-[#C9A962]/10"
                  title="Duplicate"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "DELETE_HISTORY", entryId: entry.id })
                  }
                  className="rounded p-1.5 text-red-400 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </CollapsibleSection>
  );
}
