import type { CSSProperties } from "react";
import EditorialReveal from "../editorial/EditorialReveal";
import CollectionPhotoFrame from "../CollectionPhotoFrame";
import BespokeSectionHeader from "../bespoke/BespokeSectionHeader";
import BespokeButterflyMark from "../bespoke/BespokeButterflyMark";
import {
  BUTTERFLY_PILLARS,
  BUTTERFLY_SALON_PIECES,
} from "../../data/butterflyCollection";
import { SALON_GOLDEN_GRID_COLUMNS } from "../../lib/goldenRatioLayout";

const goldenGridStyle = {
  "--salon-grid": SALON_GOLDEN_GRID_COLUMNS,
} as CSSProperties;

const reversedGridStyle = {
  "--salon-grid": "minmax(0, 1fr) minmax(0, 1.618fr)",
} as CSSProperties;

function SalonPieceBlock({
  piece,
  reverse = false,
}: {
  piece: (typeof BUTTERFLY_SALON_PIECES)[number];
  reverse?: boolean;
}) {
  const gridStyle = reverse ? reversedGridStyle : goldenGridStyle;

  return (
    <article
      className="grid grid-cols-1 items-center gap-10 lg:gap-12 lg:[grid-template-columns:var(--salon-grid)] xl:gap-16"
      style={gridStyle}
    >
      <EditorialReveal
        className={`min-w-0 ${reverse ? "order-2 lg:order-2 lg:col-start-2" : "order-1 lg:col-start-1"}`}
      >
        <div className="relative mx-auto w-full max-w-[min(100%,26rem)] lg:mx-0 lg:max-w-none">
          <div
            className="pointer-events-none absolute -inset-3 rounded-sm bg-[#dccb7b]/[0.07] blur-2xl"
            aria-hidden
          />
          <CollectionPhotoFrame
            src={piece.src}
            alt={piece.alt}
            fluid
            data-name={piece.id}
          />
        </div>
      </EditorialReveal>

      <EditorialReveal
        delay={100}
        className={`min-w-0 ${reverse ? "order-1 lg:order-1 lg:col-start-1 lg:row-start-1" : "order-2 lg:col-start-2"}`}
      >
        <div className="lg:py-4">
          <p className="text-[9px] uppercase tracking-[0.28em] text-[#766d42]">
            {piece.eyebrow}
          </p>
          <h3 className="mt-3 font-editorial text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.12] tracking-[0.04em] text-[#1d3c34]">
            {piece.title}
          </h3>
          <div className="my-5 h-px w-10 bg-gradient-to-r from-[#dccb7b] to-transparent" />
          <p className="max-w-prose text-house-body leading-relaxed text-on-cream-body">
            {piece.description}
          </p>
          <ul className="mt-6 space-y-2.5 border-t border-[#766d42]/18 pt-6">
            {piece.details.map((detail) => (
              <li
                key={detail}
                className="flex items-baseline gap-3 text-[13px] tracking-[0.02em] text-[#1d3c34]/88"
              >
                <span className="size-1 shrink-0 rounded-full bg-[#dccb7b]" aria-hidden />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </EditorialReveal>
    </article>
  );
}

export default function ButterflySalonGallery() {
  const [primary, secondary] = BUTTERFLY_SALON_PIECES;

  return (
    <>
      <section
        aria-labelledby="butterfly-emblem-heading"
        className="relative border-t border-[#766d42]/20 bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(220,203,123,0.1),transparent_58%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div
            className="grid grid-cols-1 items-start gap-12 lg:gap-14 lg:[grid-template-columns:var(--salon-grid)]"
            style={goldenGridStyle}
          >
            <EditorialReveal className="min-w-0">
              <BespokeButterflyMark tone="gold" className="mb-5 size-8 opacity-80" />
              <BespokeSectionHeader
                id="butterfly-emblem-heading"
                align="left"
                tone="dark"
                eyebrow="The House Emblem"
                title="The B Is The Butterfly"
                subtitle="In the Bianca monogram, the letter B is not merely initial — it is wings. Two mirrored forms opening from a single centre, the same gesture that shapes every piece in this collection."
                className="mb-0 md:mb-0"
              />
              <blockquote className="mt-8 border-l border-[#dccb7b]/50 pl-6">
                <p className="font-editorial text-[clamp(1.05rem,2vw,1.25rem)] italic leading-snug tracking-[0.03em] text-[#f9f9f9]">
                  &ldquo;Every creation is a metamorphosis — from intention to
                  heirloom.&rdquo;
                </p>
              </blockquote>
            </EditorialReveal>

            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {BUTTERFLY_PILLARS.map((pillar, index) => (
                <li key={pillar.id}>
                  <EditorialReveal delay={index * 70}>
                    <div className="border border-[#766d42]/30 bg-[#243f38]/40 p-5 transition duration-300 hover:border-[#dccb7b]/45 md:p-6">
                      <div className="mb-3 h-px w-8 bg-[#dccb7b]/60" />
                      <h3 className="font-editorial text-[1rem] tracking-[0.05em] text-[#f9f9f9]">
                        {pillar.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-on-forest-body">
                        {pillar.description}
                      </p>
                    </div>
                  </EditorialReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="butterfly-salon-heading"
        className="border-t border-[#766d42]/12 bg-[#faf8f5] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <BespokeSectionHeader
            id="butterfly-salon-heading"
            eyebrow="In The Salon"
            title="Wings Composed In Light"
            subtitle="Two suites from the Butterfly Collection — studied in the atelier and composed for those who carry the house emblem."
            className="mb-12 md:mb-16"
          />

          <div className="space-y-20 md:space-y-28">
            {primary ? <SalonPieceBlock piece={primary} /> : null}
            {secondary ? <SalonPieceBlock piece={secondary} reverse /> : null}
          </div>
        </div>
      </section>
    </>
  );
}
