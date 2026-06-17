import { RefreshCw, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useCalculator } from "../context/CalculatorContext";
import { formatCurrency } from "../lib/calculations";
import FieldInput from "./ui/FieldInput";

export default function GoldRatesBar() {
  const { state, refreshGoldRates, setManualGoldRate, dispatch } = useCalculator();
  const { goldRates } = state;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-gold-accent/30 bg-gradient-to-r from-[#faf8f5] via-white to-[#faf8f5] p-5 shadow-[0_4px_30px_rgba(201,169,98,0.12)]"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-gold-accent" />
          <h2 className="font-editorial text-base tracking-wide text-bianca-forest">
            Today&apos;s Gold Rate — Delhi
          </h2>
          {goldRates.loading && (
            <span className="animate-pulse text-xs text-gold-on-cream">Loading…</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
              goldRates.source === "live"
                ? "bg-emerald-100 text-emerald-800"
                : goldRates.source === "manual"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {goldRates.source}
          </span>
          {goldRates.lastUpdated && (
            <span className="text-[11px] text-on-cream-subtle">
              Updated {new Date(goldRates.lastUpdated).toLocaleString("en-IN")}
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              dispatch({
                type: "SET_GOLD_RATES",
                rates: { manualOverride: false },
              });
              refreshGoldRates();
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-gold-accent/40 px-3 py-1.5 text-xs text-gold-on-cream transition hover:bg-gold-accent/10"
          >
            <RefreshCw className={`h-3 w-3 ${goldRates.loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {goldRates.error && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {goldRates.error}. Using fallback rates — edit below to override.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldInput
          label="18KT Gold Rate (₹/gram)"
          type="number"
          min={0}
          step={1}
          value={goldRates.rate18KT}
          onChange={(e) => setManualGoldRate("18KT", parseFloat(e.target.value) || 0)}
        />
        <FieldInput
          label="14KT Gold Rate (₹/gram)"
          type="number"
          min={0}
          step={1}
          value={goldRates.rate14KT}
          onChange={(e) => setManualGoldRate("14KT", parseFloat(e.target.value) || 0)}
        />
      </div>

      <p className="mt-3 font-body text-xs text-on-cream-muted">
        Live reference: 18KT {formatCurrency(goldRates.rate18KT)}/g · 14KT{" "}
        {formatCurrency(goldRates.rate14KT)}/g
      </p>
    </motion.div>
  );
}
