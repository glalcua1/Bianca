import { JEWELLERY_CATEGORIES } from "../constants";
import { useCalculator } from "../context/CalculatorContext";
import CollapsibleSection from "./ui/CollapsibleSection";
import FieldInput from "./ui/FieldInput";

export default function JewelleryDetailsSection() {
  const { state, dispatch } = useCalculator();
  const { currentDesign: design } = state;

  return (
    <CollapsibleSection
      title="Jewellery Details"
      subtitle="Name, category, and gold purity"
      defaultOpen
    >
      <div className="grid gap-4 md:grid-cols-3">
        <FieldInput
          label="Jewellery Name"
          value={design.name}
          onChange={(e) =>
            dispatch({ type: "UPDATE_DESIGN", patch: { name: e.target.value } })
          }
          placeholder="e.g. 3 Layer Necklace"
        />
        <label className="block">
          <span className="mb-1.5 block font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
            Category
          </span>
          <select
            value={design.category}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_DESIGN",
                patch: { category: e.target.value as typeof design.category },
              })
            }
            className="w-full rounded-lg border border-black/10 bg-[#faf8f5] px-3 py-2.5 font-['Arial',sans-serif] text-sm outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20"
          >
            {JEWELLERY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
            Gold Purity
          </span>
          <select
            value={design.goldPurity}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_DESIGN",
                patch: { goldPurity: e.target.value as "18KT" | "14KT" },
              })
            }
            className="w-full rounded-lg border border-black/10 bg-[#faf8f5] px-3 py-2.5 font-['Arial',sans-serif] text-sm outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20"
          >
            <option value="18KT">18KT</option>
            <option value="14KT">14KT</option>
          </select>
        </label>
      </div>
    </CollapsibleSection>
  );
}
