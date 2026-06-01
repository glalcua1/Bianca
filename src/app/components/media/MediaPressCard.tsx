import { ExternalLink } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import type { MediaPressItem } from "../../data/mediaCoverage";

type Props = {
  item: MediaPressItem;
  reversed?: boolean;
};

export default function MediaPressCard({ item, reversed = false }: Props) {
  return (
    <article
      aria-labelledby={`${item.id}-heading`}
      className="border-t border-[#1d3c34]/8 py-16 first:border-t-0 first:pt-0 md:py-20"
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
          reversed ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <EditorialReveal className={reversed ? "lg:order-2" : ""}>
          <div className="relative overflow-hidden rounded-sm bg-[#1d3c34] shadow-[0_20px_50px_rgba(29,60,52,0.12)] ring-1 ring-[#766d42]/25">
            <div className="absolute inset-x-0 top-0 z-10 h-px bg-[#dccb7b]/40" aria-hidden />
            <ProtectedImage
              src={item.image}
              alt={item.imageAlt}
              className={`w-full object-cover ${
                item.id === "hindustan-cannes"
                  ? "aspect-[16/9]"
                  : "aspect-square max-h-[min(520px,80vw)] object-center"
              }`}
            />
          </div>
        </EditorialReveal>

        <EditorialReveal delay={120} className={reversed ? "lg:order-1" : ""}>
          <EditorialEyebrow className="mb-4">{item.eyebrow}</EditorialEyebrow>
          <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
            Source · {item.source}
            {item.date ? ` · ${item.date}` : ""}
          </p>
          <h2
            id={`${item.id}-heading`}
            className="font-editorial text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.2] tracking-[0.05em] text-[#1d3c34]"
          >
            {item.title}
          </h2>
          <div className="my-6 h-px w-12 bg-[#766d42]/30" aria-hidden />
          <p className="max-w-lg text-house-body leading-relaxed text-on-cream-body">
            {item.body}
          </p>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-[#766d42]/40 bg-[#f4f0e6] px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]/80"
          >
            {item.linkLabel}
            <ExternalLink className="size-4 shrink-0 opacity-70" aria-hidden />
          </a>
        </EditorialReveal>
      </div>
    </article>
  );
}
