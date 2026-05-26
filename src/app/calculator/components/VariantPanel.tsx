import { Copy, GitCompare, Save, Trash2 } from "lucide-react";
import { calculatePricing } from "../lib/calculations";
import { formatCurrency } from "../lib/calculations";
import { useCalculator } from "../context/CalculatorContext";
import CollapsibleSection from "./ui/CollapsibleSection";
import LuxuryCard from "./ui/LuxuryCard";

export default function VariantPanel() {
  const { state, dispatch, result } = useCalculator();
  const { variants, compareVariantIds, goldRates } = state;

  const compareA = variants.find((v) => v.id === compareVariantIds[0]);
  const compareB = variants.find((v) => v.id === compareVariantIds[1]);

  const resultA = compareA
    ? calculatePricing(compareA.design, goldRates.rate18KT, goldRates.rate14KT)
    : null;
  const resultB = compareB
    ? calculatePricing(compareB.design, goldRates.rate18KT, goldRates.rate14KT)
    : null;

  const priceDiff =
    resultA && resultB ? resultB.finalPrice - resultA.finalPrice : null;

  return (
    <CollapsibleSection
      title="Design Variants"
      subtitle="Save, compare and manage design configurations"
      defaultOpen={false}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => dispatch({ type: "SAVE_VARIANT" })}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1d3c34] px-4 py-2 text-sm text-white transition hover:bg-[#1d3c34]/90"
        >
          <Save className="h-4 w-4" />
          Save Current
        </button>
      </div>

      {variants.length === 0 ? (
        <p className="py-4 text-center text-sm text-on-cream-subtle">
          No saved variants yet. Save your current design to compare options.
        </p>
      ) : (
        <div className="space-y-2">
          {variants.map((v) => {
            const vResult = calculatePricing(
              v.design,
              goldRates.rate18KT,
              goldRates.rate14KT,
            );
            return (
              <div
                key={v.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-black/5 bg-[#faf8f5]/50 px-4 py-3"
              >
                <div>
                  <input
                    value={v.name}
                    onChange={(e) =>
                      dispatch({
                        type: "RENAME_VARIANT",
                        variantId: v.id,
                        name: e.target.value,
                      })
                    }
                    className="bg-transparent font-editorial text-base outline-none"
                  />
                  <p className="text-xs text-on-cream-muted">
                    {formatCurrency(vResult.finalPrice)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "LOAD_VARIANT", variantId: v.id })}
                    className="rounded px-2 py-1 text-xs text-[#1d3c34] hover:bg-[#C9A962]/10"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "DUPLICATE_VARIANT", variantId: v.id })
                    }
                    className="rounded p-1.5 text-gold-on-cream hover:bg-[#C9A962]/10"
                    title="Duplicate"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_COMPARE", slot: 0, variantId: v.id })
                    }
                    className={`rounded px-2 py-1 text-xs ${
                      compareVariantIds[0] === v.id
                        ? "bg-[#C9A962]/20 text-gold-on-cream"
                        : "text-on-cream-muted hover:bg-black/5"
                    }`}
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_COMPARE", slot: 1, variantId: v.id })
                    }
                    className={`rounded px-2 py-1 text-xs ${
                      compareVariantIds[1] === v.id
                        ? "bg-[#C9A962]/20 text-gold-on-cream"
                        : "text-on-cream-muted hover:bg-black/5"
                    }`}
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "DELETE_VARIANT", variantId: v.id })
                    }
                    className="rounded p-1.5 text-red-400 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {compareA && compareB && resultA && resultB && (
        <LuxuryCard className="mt-6" variant="hero">
          <div className="mb-3 flex items-center gap-2 text-gold-on-cream">
            <GitCompare className="h-4 w-4" />
            <span className="text-xs uppercase tracking-widest">Compare</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium">{compareA.name}</p>
              <p className="font-editorial text-xl">
                {formatCurrency(resultA.finalPrice)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">{compareB.name}</p>
              <p className="font-editorial text-xl">
                {formatCurrency(resultB.finalPrice)}
              </p>
            </div>
          </div>
          {priceDiff !== null && (
            <p className="mt-3 border-t border-[#C9A962]/20 pt-3 text-sm">
              Difference:{" "}
              <span
                className={
                  priceDiff >= 0 ? "text-emerald-700" : "text-red-600"
                }
              >
                {priceDiff >= 0 ? "+" : ""}
                {formatCurrency(priceDiff)}
              </span>
            </p>
          )}
        </LuxuryCard>
      )}

      <p className="mt-3 text-xs text-on-cream-subtle">
        Current design: {formatCurrency(result.finalPrice)}
      </p>
    </CollapsibleSection>
  );
}
