import { ExternalLink } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import MediaPressCarousel from "./MediaPressCarousel";
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
          <MediaPressCarousel
            images={item.images}
            label={item.source}
            centerCarousel={item.centerCarousel}
          />
        </EditorialReveal>

        <EditorialReveal delay={120} className={reversed ? "lg:order-1" : ""}>
          <EditorialEyebrow className="mb-4">{item.eyebrow}</EditorialEyebrow>
          <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
            Source ·{" "}
            <span className="font-semibold text-[#dccb7b]">{item.source}</span>
            {item.date ? (
              <>
                {" "}
                · <span className="text-gold-on-cream">{item.date}</span>
              </>
            ) : null}
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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={item.primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#766d42]/40 bg-[#f4f0e6] px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]/80"
            >
              {item.primaryLink.label}
              <ExternalLink className="size-4 shrink-0 opacity-70" aria-hidden />
            </a>
            {item.secondaryLink ? (
              <a
                href={item.secondaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#1d3c34]/15 bg-white px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/40 hover:bg-[#faf8f5]"
              >
                {item.secondaryLink.label}
                <ExternalLink className="size-4 shrink-0 opacity-70" aria-hidden />
              </a>
            ) : null}
          </div>
        </EditorialReveal>
      </div>
    </article>
  );
}
