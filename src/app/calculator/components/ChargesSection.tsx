import { useCalculator } from "../context/CalculatorContext";
import { formatCurrency } from "../lib/calculations";
import CollapsibleSection from "./ui/CollapsibleSection";
import FieldInput from "./ui/FieldInput";

export default function ChargesSection() {
  const { state, dispatch, result } = useCalculator();
  const { makingCharges, gst, markup, discount } = state.currentDesign;
  const isInternal = state.quoteMode === "internal";

  return (
    <CollapsibleSection
      title="Charges, GST & Pricing"
      subtitle="Making charges, tax, markup and discounts"
    >
      <div className="space-y-6">
        <div>
          <p className="mb-3 font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
            Making Charges
          </p>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={makingCharges.type === "fixed"}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_DESIGN",
                    patch: {
                      makingCharges: { ...makingCharges, type: "fixed" },
                    },
                  })
                }
              />
              <span className="text-sm">Fixed ₹</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={makingCharges.type === "percentage"}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_DESIGN",
                    patch: {
                      makingCharges: { ...makingCharges, type: "percentage" },
                    },
                  })
                }
              />
              <span className="text-sm">Percentage of gold</span>
            </label>
          </div>
          <div className="mt-3 max-w-xs">
            <FieldInput
              label={
                makingCharges.type === "fixed"
                  ? "Fixed Amount (₹)"
                  : "Percentage (%)"
              }
              type="number"
              min={0}
              value={makingCharges.value}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_DESIGN",
                  patch: {
                    makingCharges: {
                      ...makingCharges,
                      value: parseFloat(e.target.value) || 0,
                    },
                  },
                })
              }
            />
          </div>
          <p className="mt-2 text-xs text-[#999]">
            Applied: {formatCurrency(result.makingChargesAmount)}
          </p>
        </div>

        <div className="border-t border-black/5 pt-6">
          <div className="flex items-center justify-between">
            <p className="font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
              GST
            </p>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={gst.enabled}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_DESIGN",
                    patch: { gst: { ...gst, enabled: e.target.checked } },
                  })
                }
                className="rounded border-[#C9A962] text-[#C9A962]"
              />
              <span className="text-sm">Enable GST</span>
            </label>
          </div>
          {gst.enabled && (
            <div className="mt-3 max-w-xs">
              <FieldInput
                label="GST Percentage (%)"
                type="number"
                min={0}
                step={0.1}
                value={gst.percentage}
                onChange={(e) =>
                  dispatch({
                    type: "UPDATE_DESIGN",
                    patch: {
                      gst: { ...gst, percentage: parseFloat(e.target.value) || 0 },
                    },
                  })
                }
              />
            </div>
          )}
        </div>

        {isInternal && (
          <>
            <div className="border-t border-black/5 pt-6">
              <p className="mb-3 font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
                Markup & Selling Price
              </p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={markup.type === "percentage"}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_DESIGN",
                        patch: { markup: { ...markup, type: "percentage" } },
                      })
                    }
                  />
                  <span className="text-sm">Markup %</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={markup.type === "flat"}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_DESIGN",
                        patch: { markup: { ...markup, type: "flat" } },
                      })
                    }
                  />
                  <span className="text-sm">Flat Margin ₹</span>
                </label>
              </div>
              <div className="mt-3 max-w-xs">
                <FieldInput
                  label={markup.type === "percentage" ? "Markup (%)" : "Flat Margin (₹)"}
                  type="number"
                  min={0}
                  value={markup.value}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_DESIGN",
                      patch: {
                        markup: {
                          ...markup,
                          value: parseFloat(e.target.value) || 0,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="border-t border-black/5 pt-6">
              <p className="mb-3 font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
                Discount
              </p>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={discount.type === "percentage"}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_DESIGN",
                        patch: { discount: { ...discount, type: "percentage" } },
                      })
                    }
                  />
                  <span className="text-sm">Percentage</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={discount.type === "flat"}
                    onChange={() =>
                      dispatch({
                        type: "UPDATE_DESIGN",
                        patch: { discount: { ...discount, type: "flat" } },
                      })
                    }
                  />
                  <span className="text-sm">Flat ₹</span>
                </label>
              </div>
              <div className="mt-3 max-w-xs">
                <FieldInput
                  label="Discount Value"
                  type="number"
                  min={0}
                  value={discount.value}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_DESIGN",
                      patch: {
                        discount: {
                          ...discount,
                          value: parseFloat(e.target.value) || 0,
                        },
                      },
                    })
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </CollapsibleSection>
  );
}
