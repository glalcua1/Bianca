import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import type { AtelierPiece } from "../../data/fineJewelleryCollections";
import { atelierPieceEyebrow, atelierPieceUsesDarkWell } from "../../data/fineJewelleryCollections";
import { PHI_DISPLAY } from "../../data/goldenRatioEvaluation";
import {
  analyzePieceProportions,
  type GoldenRatioAnalyzeResponse,
} from "../../lib/goldenRatio";
import CollectionPhotoFrame from "../CollectionPhotoFrame";
import ProtectedImage from "../protection/ProtectedImage";
import GoldenRatioMetricCard from "./GoldenRatioMetricCard";

type Props = {
  piece: AtelierPiece | null;
};

export default function GoldenRatioAnalysisPanel({ piece }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GoldenRatioAnalyzeResponse | null>(null);

  const runAnalysis = useCallback(async (selected: AtelierPiece) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzePieceProportions({
        image: selected.image,
        category: selected.category,
        title: selected.title,
        productCode: selected.productCode,
      });

      if (!data.ok || !data.analysis || !data.report) {
        setError(data.message ?? data.error ?? "Analysis failed. Please try again.");
        return;
      }
      setResult(data);
    } catch {
      setError("Could not reach the analysis service.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (piece) {
      void runAnalysis(piece);
    } else {
      setResult(null);
      setError(null);
    }
  }, [piece, runAnalysis]);

  if (!piece) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-sm border border-dashed border-[#766d42]/30 bg-white/60 p-10 text-center">
        <Sparkles className="mb-4 h-8 w-8 text-[#766d42]/60" aria-hidden />
        <p className="font-editorial text-xl text-bianca-forest">Choose an atelier piece</p>
        <p className="mt-2 max-w-md text-sm text-on-cream-muted">
          Select a piece from the catalogue to run a full golden-ratio evaluation against φ (
          {PHI_DISPLAY}).
        </p>
      </div>
    );
  }

  const analysis = result?.analysis;
  const report = result?.report;
  const sketchSrc = result?.sketch_png_base64
    ? `data:image/png;base64,${result.sketch_png_base64}`
    : null;
  const annotationSrc = result?.sketch_annotation_base64
    ? `data:image/png;base64,${result.sketch_annotation_base64}`
    : null;
  const isGeminiSketch = result?.sketch_source === "gemini";

  function sketchFallbackCaption(): string {
    const err = result?.sketch_error ?? "";
    if (/missing.*api.*key/i.test(err)) {
      return "Proportion overlay — add GEMINI_API_KEY to .env for a full atelier redesign sketch";
    }
    if (/quota|429|too many requests/i.test(err)) {
      return "Proportion overlay shown — Gemini image quota exceeded. Check billing at ai.dev/rate-limit, then retry.";
    }
    if (err) {
      return `Proportion overlay shown — Gemini sketch unavailable (${err})`;
    }
    return "Proportion overlay — φ construction guide for the proposed silhouette";
  }

  return (
    <div className="space-y-6">
      <header className="rounded-sm border border-[#766d42]/20 bg-white p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-house-eyebrow text-gold-on-cream">{atelierPieceEyebrow(piece)}</p>
            <h2 className="font-editorial text-2xl text-bianca-forest">{piece.title}</h2>
            <p className="mt-1 text-sm text-on-cream-muted">{piece.productCode}</p>
          </div>
          {loading && (
            <div className="flex items-center gap-2 text-sm text-on-cream-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Analysing proportions &amp; generating sketch…
            </div>
          )}
          {!loading && analysis && (
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-on-cream-muted">
                Overall score
              </p>
              <p className="font-editorial text-4xl text-bianca-forest">{analysis.overall_score}</p>
              <p className="text-xs text-on-cream-muted">/ 100 · φ = {PHI_DISPLAY}</p>
            </div>
          )}
        </div>
      </header>

      {error && (
        <div className="flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-house-eyebrow text-gold-on-cream">Original piece</p>
          <CollectionPhotoFrame
            src={piece.image}
            alt={piece.alt}
            darkImageWell={atelierPieceUsesDarkWell(piece)}
            imageWellColor={piece.imageWellColor}
            fluid
          />
        </div>

        {sketchSrc ? (
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-house-eyebrow text-gold-on-cream">
                {isGeminiSketch ? "Proposed redesign — Gemini atelier sketch" : "Refinement sketch"}
              </p>
              <div className="overflow-hidden rounded-sm border border-[#766d42]/30 bg-[#f4f0e6] p-3 shadow-[0_8px_32px_rgba(29,60,52,0.08)]">
                <div className="border border-[#766d42]/25 bg-[#faf8f5] p-3">
                  <ProtectedImage
                    src={sketchSrc}
                    alt={`Proposed golden-ratio redesign for ${piece.title}`}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-on-cream-muted">
                  {isGeminiSketch
                    ? `AI-generated atelier drawing showing the refined design${result?.sketch_model ? ` · ${result.sketch_model}` : ""}`
                    : sketchFallbackCaption()}
                </p>
              </div>
            </div>

            {annotationSrc && (
              <div>
                <p className="mb-3 text-house-eyebrow text-gold-on-cream">φ proportion guide</p>
                <div className="overflow-hidden rounded-sm border border-[#766d42]/20 bg-white p-3">
                  <ProtectedImage
                    src={annotationSrc}
                    alt={`Golden ratio construction overlay for ${piece.title}`}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <p className="mt-2 text-center text-xs text-on-cream-muted">
                    Technical overlay — golden grid, ideal silhouette, and mass-centre shift
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          !loading &&
          analysis?.meets_golden_ratio && (
            <div className="flex flex-col items-center justify-center rounded-sm border border-[#1d3c34]/15 bg-[#1d3c34]/[0.03] p-8 text-center">
              <CheckCircle2 className="mb-3 h-10 w-10 text-[#1d3c34]" aria-hidden />
              <p className="font-editorial text-lg text-bianca-forest">No sketch required</p>
              <p className="mt-2 max-w-xs text-sm text-on-cream-muted">
                This piece meets the atelier golden-ratio standard. Proportions are harmonious across
                all measured dimensions.
              </p>
            </div>
          )
        )}
      </div>

      {report && !loading && (
        <section className="rounded-sm border border-[#766d42]/20 bg-[#1d3c34] p-6 text-[#f9f9f9] md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {report.verdict === "meets" ? (
              <CheckCircle2 className="h-5 w-5 text-[#dccb7b]" aria-hidden />
            ) : (
              <AlertCircle className="h-5 w-5 text-[#dccb7b]" aria-hidden />
            )}
            <h3 className="font-editorial text-xl">{report.headline}</h3>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-on-forest-body">{report.summary}</p>

          {report.recommendations.length > 0 && (
            <ul className="mt-5 space-y-2 border-t border-[#766d42]/25 pt-5">
              {report.recommendations.map((rec) => (
                <li key={rec} className="flex gap-2 text-sm text-on-forest-body">
                  <span className="text-[#dccb7b]" aria-hidden>
                    —
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {report.agent_steps.map((step) => (
              <div
                key={step.step}
                className="rounded-sm border border-[#766d42]/20 bg-[#1d3c34]/80 p-3"
              >
                <p className="text-[10px] uppercase tracking-[0.14em] text-gold-on-forest">
                  Step {step.step}
                </p>
                <p className="mt-1 text-sm font-medium text-[#f9f9f9]">{step.action}</p>
                <p className="mt-1 text-xs text-on-forest-muted">{step.result}</p>
              </div>
            ))}
          </div>

          {result?.engine && (
            <p className="mt-4 text-[10px] uppercase tracking-[0.14em] text-on-forest-muted">
              Engine: {result.engine}
            </p>
          )}
        </section>
      )}

      {analysis && !loading && (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-house-eyebrow text-gold-on-cream">Detailed metrics</p>
              <h3 className="font-editorial text-xl text-bianca-forest">φ proportion breakdown</h3>
            </div>
            <p className="text-xs text-on-cream-muted">
              Strongest: {report?.strongest_metric} · Weakest: {report?.weakest_metric}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {analysis.metrics.map((metric) => (
              <GoldenRatioMetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
