import { Award, Eye, Gem, Leaf } from "lucide-react";
import { LAB_GROWN_FAQ_TRUST_PILLARS } from "../../data/labGrownDiamondFaq";

const iconMap = {
  award: Award,
  leaf: Leaf,
  gem: Gem,
  eye: Eye,
} as const;

type Pillar = (typeof LAB_GROWN_FAQ_TRUST_PILLARS)[number];

type Props = {
  pillars: readonly Pillar[];
  compact?: boolean;
};

export default function FaqTrustPillars({ pillars, compact = false }: Props) {
  return (
    <ul
      className={
        compact
          ? "grid grid-cols-2 gap-3"
          : "mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      }
      aria-label="Trust pillars"
    >
      {pillars.map((pillar) => {
        const Icon = iconMap[pillar.icon];
        return (
          <li
            key={pillar.id}
            className={
              compact
                ? "border border-[#766d42]/20 bg-[#f4f0e6]/50 px-3 py-3 text-center"
                : "border border-[#766d42]/20 bg-[#faf8f5] px-5 py-8 text-center shadow-[inset_0_0_0_1px_rgba(220,203,123,0.1)]"
            }
          >
            <Icon
              className={`mx-auto text-[#766d42] ${compact ? "size-4" : "size-6"}`}
              strokeWidth={1.25}
              aria-hidden
            />
            <p
              className={`mt-2 font-editorial tracking-[0.08em] text-[#1d3c34] ${
                compact ? "text-[11px] uppercase" : "text-sm uppercase"
              }`}
            >
              {pillar.title}
            </p>
            <p
              className={`mt-1 text-on-cream-body ${
                compact ? "text-[11px] leading-snug" : "text-house-body text-sm"
              }`}
            >
              {pillar.description}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
