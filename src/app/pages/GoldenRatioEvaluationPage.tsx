import { useState } from "react";
import { Link } from "react-router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import GoldenRatioAnalysisPanel from "../components/golden-ratio/GoldenRatioAnalysisPanel";
import GoldenRatioPieceSelector from "../components/golden-ratio/GoldenRatioPieceSelector";
import { usePageMeta } from "../hooks/usePageMeta";
import type { AtelierPiece } from "../data/fineJewelleryCollections";
import {
  GOLDEN_RATIO_INTRO,
  GOLDEN_RATIO_SEO,
  PHI_DISPLAY,
} from "../data/goldenRatioEvaluation";

export default function GoldenRatioEvaluationPage() {
  usePageMeta(GOLDEN_RATIO_SEO.title, GOLDEN_RATIO_SEO.description);
  const [selected, setSelected] = useState<AtelierPiece | null>(null);

  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <header className="relative overflow-hidden border-b border-[#766d42]/20 bg-white px-6 py-14 md:px-10 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(220,203,123,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl">
          <EditorialEyebrow tone="gold" className="mb-4">
            {GOLDEN_RATIO_INTRO.eyebrow}
          </EditorialEyebrow>
          <h1 className="max-w-3xl font-editorial text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-bianca-forest">
            {GOLDEN_RATIO_INTRO.title}
          </h1>
          <p className="mt-4 max-w-2xl text-house-body text-on-cream-muted">
            {GOLDEN_RATIO_INTRO.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <Link
              to="/calculator"
              className="text-gold-on-cream underline-offset-4 hover:underline"
            >
              Pricing calculator
            </Link>
            <Link
              to="/fine-jewellery"
              className="text-gold-on-cream underline-offset-4 hover:underline"
            >
              Fine jewellery atelier
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="mb-8 grid gap-4 rounded-sm border border-[#766d42]/15 bg-[#f4f0e6]/50 p-5 md:grid-cols-3 md:p-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-gold-on-cream">Golden ratio</p>
            <p className="mt-1 font-editorial text-2xl text-bianca-forest">φ = {PHI_DISPLAY}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-gold-on-cream">Pass threshold</p>
            <p className="mt-1 font-editorial text-2xl text-bianca-forest">72 / 100</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em] text-gold-on-cream">Analysis</p>
            <p className="mt-1 text-sm text-on-cream-muted">
              Computer vision segmentation, category-calibrated φ metrics, agentic assessment, and
              Google Gemini atelier redesign sketches for pieces outside tolerance.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(280px,340px)_1fr] lg:items-start">
          <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-hidden">
            <GoldenRatioPieceSelector
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </div>
          <GoldenRatioAnalysisPanel piece={selected} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
