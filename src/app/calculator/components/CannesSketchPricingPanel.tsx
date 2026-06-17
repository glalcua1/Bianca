import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { CANNES_SKETCH_PRICING } from "../data/cannesSketchDesigns";
import { useCalculator } from "../context/CalculatorContext";
import { cloneDesign } from "../data/sampleDesigns";
import { formatCurrency, formatWeight } from "../lib/calculations";
import CollapsibleSection from "./ui/CollapsibleSection";
import LuxuryCard from "./ui/LuxuryCard";
import ProtectedImage from "../../components/protection/ProtectedImage";

export default function CannesSketchPricingPanel() {
  const { dispatch, state } = useCalculator();
  const isInternal = state.quoteMode === "internal";

  return (
    <CollapsibleSection
      title="Cannes Sketch Pricing"
      subtitle="Atelier estimates from public/Cannes/Sketches — based on annotated specs"
      badge={`${CANNES_SKETCH_PRICING.length} pieces`}
      defaultOpen
    >
      <p className="mb-6 text-house-body text-on-cream-muted">
        Prices use default rates (18KT ₹6,850/g, diamonds ₹29,000/ct, 3% GST,
        20% markup). Gold weights and carats are atelier estimates from sketch
        annotations — refine in the calculator after loading any piece.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        {CANNES_SKETCH_PRICING.map((entry, i) => (
          <motion.article
            key={entry.sketchFile}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="overflow-hidden rounded-xl border border-black/8 bg-[#faf8f5]/60"
          >
            <div className="flex flex-col sm:flex-row">
              <a
                href={entry.sketchSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block shrink-0 sm:w-36"
              >
                <ProtectedImage
                  wrapperClassName="h-36 w-full sm:h-full sm:min-h-[140px]"
                  src={entry.sketchSrc}
                  alt={entry.alt}
                  className="h-36 w-full object-cover object-top sm:h-full sm:min-h-[140px]"
                />
                <span className="absolute right-2 top-2 rounded bg-black/50 p-1 text-white opacity-0 transition group-hover:opacity-100">
                  <ExternalLink className="h-3 w-3" />
                </span>
              </a>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-editorial text-base leading-snug text-bianca-forest">
                  {entry.design.name}
                </h3>
                <p className="mt-1 text-[11px] text-on-cream-subtle">{entry.sketchFile}</p>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <span className="text-on-cream-muted">Gold</span>
                  <span>{formatWeight(entry.result.totalGoldWeight)}</span>
                  {isInternal && (
                    <>
                      <span className="text-on-cream-muted">Cost price</span>
                      <span>{formatCurrency(entry.result.costPrice)}</span>
                    </>
                  )}
                  <span className="text-on-cream-muted">Customer price</span>
                  <span className="font-medium text-[#1d3c34]">
                    {formatCurrency(entry.result.finalPrice)}
                  </span>
                </div>

                <ul className="mt-3 space-y-0.5 text-[11px] text-on-cream-subtle">
                  {entry.notes.slice(0, 2).map((note) => (
                    <li key={note}>· {note}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: "SET_DESIGN",
                      design: cloneDesign(entry.design, entry.design.name),
                    })
                  }
                  className="mt-auto pt-4 text-left text-xs uppercase tracking-widest text-gold-on-cream transition hover:text-bianca-forest"
                >
                  Load into calculator →
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <LuxuryCard className="mt-6" variant="hero">
        <p className="text-[10px] uppercase tracking-widest text-gold-on-cream">
          Collection total (all 9 sketches)
        </p>
        <div className="mt-2 flex flex-wrap gap-8">
          <div>
            <p className="text-xs text-on-cream-muted">Combined customer price</p>
            <p className="font-editorial text-2xl text-bianca-forest">
              {formatCurrency(
                CANNES_SKETCH_PRICING.reduce(
                  (s, e) => s + e.result.finalPrice,
                  0,
                ),
              )}
            </p>
          </div>
          {isInternal && (
            <div>
              <p className="text-xs text-on-cream-muted">Combined cost price</p>
              <p className="font-editorial text-xl text-bianca-forest">
                {formatCurrency(
                  CANNES_SKETCH_PRICING.reduce(
                    (s, e) => s + e.result.costPrice,
                    0,
                  ),
                )}
              </p>
            </div>
          )}
        </div>
      </LuxuryCard>
    </CollapsibleSection>
  );
}
