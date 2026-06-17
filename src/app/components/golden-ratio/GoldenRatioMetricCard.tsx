import type { GoldenRatioMetric } from "../../lib/goldenRatio";
import { scoreLabel, scoreTone } from "../../lib/goldenRatio";

const TONE_STYLES = {
  excellent: "bg-[#1d3c34]/8 text-[#1d3c34] border-[#1d3c34]/15",
  good: "bg-[#766d42]/10 text-[#524a28] border-[#766d42]/20",
  attention: "bg-amber-50 text-amber-900 border-amber-200/80",
  critical: "bg-red-50 text-red-900 border-red-200/80",
};

type Props = {
  metric: GoldenRatioMetric;
};

export default function GoldenRatioMetricCard({ metric }: Props) {
  const tone = scoreTone(metric.score);
  const pct = Math.min(100, Math.max(0, metric.score));

  return (
    <article className="rounded-sm border border-[#766d42]/15 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-editorial text-base text-bianca-forest">{metric.label}</h3>
          <p className="mt-1 text-xs leading-relaxed text-on-cream-muted">{metric.description}</p>
        </div>
        <span
          className={`shrink-0 rounded-sm border px-2 py-1 text-[10px] uppercase tracking-[0.12em] ${TONE_STYLES[tone]}`}
        >
          {scoreLabel(metric.score)}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-on-cream-muted">Measured</p>
          <p className="font-editorial text-2xl text-bianca-forest">{metric.value}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-on-cream-muted">Ideal (φ)</p>
          <p className="font-editorial text-lg text-gold-on-cream">{metric.ideal}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.14em] text-on-cream-muted">Score</p>
          <p className="font-editorial text-2xl text-bianca-forest">{metric.score}</p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#f4f0e6]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#766d42] to-[#dccb7b] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </article>
  );
}
