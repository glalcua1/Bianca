import { useCalculator } from "../context/CalculatorContext";
import { computeDiamondCost, formatCurrency } from "../lib/calculations";
import CollapsibleSection from "./ui/CollapsibleSection";
import FieldInput from "./ui/FieldInput";
import LuxuryCard from "./ui/LuxuryCard";

export default function DiamondSection() {
  const { state, dispatch, result } = useCalculator();
  const diamond = state.currentDesign.diamond;
  const autoCost = computeDiamondCost({ ...diamond, overrideCost: false });

  return (
    <CollapsibleSection
      title="Diamond Details"
      subtitle="Carat weight and rate per carat"
      badge={formatCurrency(result.diamondCost)}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldInput
          label="Diamond Carat Weight"
          type="number"
          min={0}
          step={0.01}
          value={diamond.caratWeight || ""}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DESIGN",
              patch: {
                diamond: {
                  ...diamond,
                  caratWeight: parseFloat(e.target.value) || 0,
                },
              },
            })
          }
        />
        <FieldInput
          label="Rate Per Carat (₹)"
          type="number"
          min={0}
          step={100}
          value={diamond.ratePerCarat}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DESIGN",
              patch: {
                diamond: {
                  ...diamond,
                  ratePerCarat: parseFloat(e.target.value) || 0,
                },
              },
            })
          }
        />
      </div>

      <label className="mt-4 flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={diamond.overrideCost}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_DESIGN",
              patch: {
                diamond: { ...diamond, overrideCost: e.target.checked },
              },
            })
          }
          className="rounded border-[#C9A962] text-[#C9A962] focus:ring-[#C9A962]"
        />
        <span className="font-body text-sm text-bianca-forest">
          Override Auto Diamond Cost
        </span>
      </label>

      {diamond.overrideCost && (
        <div className="mt-3">
          <FieldInput
            label="Manual Diamond Cost (₹)"
            type="number"
            min={0}
            value={diamond.manualCost}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_DESIGN",
                patch: {
                  diamond: {
                    ...diamond,
                    manualCost: parseFloat(e.target.value) || 0,
                  },
                },
              })
            }
          />
        </div>
      )}

      <LuxuryCard className="mt-4 flex items-center justify-between">
        <span className="font-body text-xs uppercase tracking-widest text-on-cream-muted">
          Diamond Cost
        </span>
        <span className="font-editorial text-xl text-bianca-forest">
          {formatCurrency(result.diamondCost)}
        </span>
      </LuxuryCard>
      {!diamond.overrideCost && diamond.caratWeight > 0 && (
        <p className="mt-2 text-xs text-on-cream-subtle">
          {diamond.caratWeight} ct × {formatCurrency(diamond.ratePerCarat)} ={" "}
          {formatCurrency(autoCost)}
        </p>
      )}
    </CollapsibleSection>
  );
}
