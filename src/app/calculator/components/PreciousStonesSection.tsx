import { Copy, Plus, Trash2 } from "lucide-react";
import { DEFAULT_STONE_RATES, STONE_TYPES } from "../constants";
import { useCalculator } from "../context/CalculatorContext";
import { computeStoneCost, formatCurrency, generateId } from "../lib/calculations";
import type { PreciousStone, StoneType } from "../types";
import CollapsibleSection from "./ui/CollapsibleSection";
import FieldInput from "./ui/FieldInput";

export default function PreciousStonesSection() {
  const { state, dispatch, result } = useCalculator();
  const stones = state.currentDesign.stones;

  const updateStone = (id: string, patch: Partial<PreciousStone>) => {
    dispatch({
      type: "UPDATE_DESIGN",
      patch: {
        stones: stones.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      },
    });
  };

  const addStone = () => {
    dispatch({
      type: "UPDATE_DESIGN",
      patch: {
        stones: [
          ...stones,
          {
            id: generateId(),
            stoneType: "Emerald" as StoneType,
            customName: "",
            quantity: 1,
            caratWeight: 0,
            ratePerCarat: DEFAULT_STONE_RATES.Emerald,
            overrideCost: false,
            manualCost: 0,
          },
        ],
      },
    });
  };

  const onTypeChange = (id: string, stoneType: StoneType) => {
    const rate =
      stoneType === "Custom"
        ? 10000
        : DEFAULT_STONE_RATES[stoneType as keyof typeof DEFAULT_STONE_RATES];
    updateStone(id, { stoneType, ratePerCarat: rate });
  };

  return (
    <CollapsibleSection
      title="Precious Stones"
      subtitle="Emerald, ruby, sapphire and custom gemstones"
      badge={formatCurrency(result.preciousStoneCost)}
    >
      {stones.length === 0 ? (
        <p className="py-6 text-center font-body text-sm text-on-cream-subtle">
          No gemstones added. Click below to add stones.
        </p>
      ) : (
        <div className="space-y-4">
          {stones.map((stone) => {
            const cost = computeStoneCost(stone);
            return (
              <div
                key={stone.id}
                className="rounded-lg border border-black/5 bg-[#faf8f5]/50 p-4"
              >
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  <label className="block">
                    <span className="mb-1.5 block font-body text-[11px] uppercase tracking-widest text-on-cream-muted">
                      Stone Type
                    </span>
                    <select
                      value={stone.stoneType}
                      onChange={(e) =>
                        onTypeChange(stone.id, e.target.value as StoneType)
                      }
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold-accent"
                    >
                      {STONE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                  {stone.stoneType === "Custom" && (
                    <FieldInput
                      label="Custom Name"
                      value={stone.customName}
                      onChange={(e) =>
                        updateStone(stone.id, { customName: e.target.value })
                      }
                    />
                  )}
                  <FieldInput
                    label="Quantity"
                    type="number"
                    min={1}
                    value={stone.quantity}
                    onChange={(e) =>
                      updateStone(stone.id, {
                        quantity: parseInt(e.target.value, 10) || 1,
                      })
                    }
                  />
                  <FieldInput
                    label="Carat Weight"
                    type="number"
                    min={0}
                    step={0.01}
                    value={stone.caratWeight || ""}
                    onChange={(e) =>
                      updateStone(stone.id, {
                        caratWeight: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  <FieldInput
                    label="Rate / Carat (₹)"
                    type="number"
                    min={0}
                    value={stone.ratePerCarat}
                    onChange={(e) =>
                      updateStone(stone.id, {
                        ratePerCarat: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={stone.overrideCost}
                      onChange={(e) =>
                        updateStone(stone.id, { overrideCost: e.target.checked })
                      }
                      className="rounded border-gold-accent text-gold-accent"
                    />
                    <span className="text-sm">Override Stone Cost</span>
                  </label>
                  {stone.overrideCost ? (
                    <FieldInput
                      label="Manual Cost"
                      type="number"
                      min={0}
                      value={stone.manualCost}
                      onChange={(e) =>
                        updateStone(stone.id, {
                          manualCost: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="max-w-[180px]"
                    />
                  ) : (
                    <span className="font-editorial text-lg">
                      {formatCurrency(cost)}
                    </span>
                  )}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_DESIGN",
                          patch: {
                            stones: [
                              ...stones,
                              { ...stone, id: generateId() },
                            ],
                          },
                        })
                      }
                      className="rounded-lg p-2 text-gold-on-cream hover:bg-gold-accent/10"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_DESIGN",
                          patch: {
                            stones: stones.filter((s) => s.id !== stone.id),
                          },
                        })
                      }
                      className="rounded-lg p-2 text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        type="button"
        onClick={addStone}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-gold-accent/50 px-4 py-2.5 text-sm text-gold-on-cream transition hover:border-gold-accent hover:bg-gold-accent/5"
      >
        <Plus className="h-4 w-4" />
        Add Stone
      </button>
    </CollapsibleSection>
  );
}
