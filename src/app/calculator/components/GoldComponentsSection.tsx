import { Copy, Plus, Trash2 } from "lucide-react";
import { generateId } from "../lib/calculations";
import { useCalculator } from "../context/CalculatorContext";
import type { GoldComponent } from "../types";
import CollapsibleSection from "./ui/CollapsibleSection";
import FieldInput from "./ui/FieldInput";

export default function GoldComponentsSection() {
  const { state, dispatch, result } = useCalculator();
  const { components } = state.currentDesign;

  const updateComponent = (id: string, patch: Partial<GoldComponent>) => {
    dispatch({
      type: "UPDATE_DESIGN",
      patch: {
        components: components.map((c) =>
          c.id === id ? { ...c, ...patch } : c,
        ),
      },
    });
  };

  const addComponent = () => {
    dispatch({
      type: "UPDATE_DESIGN",
      patch: {
        components: [
          ...components,
          {
            id: generateId(),
            name: `Component ${components.length + 1}`,
            weightGrams: 0,
            notes: "",
          },
        ],
      },
    });
  };

  const duplicateComponent = (comp: GoldComponent) => {
    dispatch({
      type: "UPDATE_DESIGN",
      patch: {
        components: [
          ...components,
          { ...comp, id: generateId(), name: `${comp.name} (Copy)` },
        ],
      },
    });
  };

  const deleteComponent = (id: string) => {
    if (components.length <= 1) return;
    dispatch({
      type: "UPDATE_DESIGN",
      patch: { components: components.filter((c) => c.id !== id) },
    });
  };

  return (
    <CollapsibleSection
      title="Gold Components"
      subtitle="Dynamic component builder — layers, pendants, bands & more"
      badge={`${result.totalGoldWeight.toFixed(2)}g total`}
    >
      <div className="space-y-3">
        {components.map((comp) => (
          <div
            key={comp.id}
            className="grid gap-3 rounded-lg border border-black/5 bg-[#faf8f5]/50 p-4 md:grid-cols-[1fr_120px_1fr_auto]"
          >
            <FieldInput
              label="Component Name"
              value={comp.name}
              onChange={(e) => updateComponent(comp.id, { name: e.target.value })}
            />
            <FieldInput
              label="Weight (g)"
              type="number"
              min={0}
              step={0.01}
              value={comp.weightGrams || ""}
              onChange={(e) =>
                updateComponent(comp.id, {
                  weightGrams: parseFloat(e.target.value) || 0,
                })
              }
            />
            <FieldInput
              label="Notes"
              value={comp.notes}
              onChange={(e) => updateComponent(comp.id, { notes: e.target.value })}
              placeholder="Optional"
            />
            <div className="flex items-end gap-1 pb-0.5">
              <button
                type="button"
                onClick={() => duplicateComponent(comp)}
                className="rounded-lg p-2 text-[#8B7355] transition hover:bg-[#C9A962]/10"
                title="Duplicate"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => deleteComponent(comp.id)}
                disabled={components.length <= 1}
                className="rounded-lg p-2 text-red-400 transition hover:bg-red-50 disabled:opacity-30"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addComponent}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-[#C9A962]/50 px-4 py-2.5 text-sm text-[#8B7355] transition hover:border-[#C9A962] hover:bg-[#C9A962]/5"
      >
        <Plus className="h-4 w-4" />
        Add Component
      </button>
    </CollapsibleSection>
  );
}
