import type { CSSProperties } from "react";
import EditorialReveal from "../editorial/EditorialReveal";
import CollectionPhotoFrame from "../CollectionPhotoFrame";
import BespokeSectionHeader from "../bespoke/BespokeSectionHeader";
import BespokeButterflyMark from "../bespoke/BespokeButterflyMark";
import ProtectedImage from "../protection/ProtectedImage";
import {
  BUTTERFLY_EMBLEM_LIFESTYLE,
  BUTTERFLY_PILLARS,
  BUTTERFLY_SALON_PIECES,
} from "../../data/butterflyCollection";
import { SALON_GOLDEN_GRID_COLUMNS } from "../../lib/goldenRatioLayout";

const goldenGridStyle = {
  "--salon-grid": SALON_GOLDEN_GRID_COLUMNS,
} as CSSProperties;

/**
 * House Emblem: copy leads (φ), lifestyle plate is a quieter companion column.
 * Keeps the portrait proportionate to the editorial block rather than dominating it.
 */
const emblemGridStyle = {
  "--salon-grid": "minmax(0, 1.618fr) minmax(0, 1fr)",
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
            className="pointer-events-none absolute -inset-3 rounded-sm bg-[#5c4033]/[0.12] blur-2xl"
            aria-hidden
          />
          <CollectionPhotoFrame
            src={piece.src}
            alt={piece.alt}
            fluid
            variant="ebony"
            mat="flush"
            aspectRatio={piece.frameAspectRatio}
            imageClassName="size-full object-cover object-center"
            imageWrapperClassName="absolute inset-0 size-full [&_picture]:block [&_picture]:size-full"
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
        className="relative overflow-hidden border-t border-[#766d42]/20 bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_88%_28%,rgba(220,203,123,0.11),transparent_62%),radial-gradient(ellipse_50%_35%_at_8%_88%,rgba(0,0,0,0.18),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div
            className="grid grid-cols-1 items-start gap-8 lg:gap-10 lg:[grid-template-columns:var(--salon-grid)] xl:gap-12"
            style={emblemGridStyle}
          >
            <EditorialReveal className="order-2 min-w-0 lg:order-1 lg:pt-1">
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

            <EditorialReveal delay={90} className="order-1 min-w-0 lg:order-2">
              {/*
                Companion plate — deliberately smaller than the copy column so
                typography leads and the lifestyle portrait reads as accent, not hero.
              */}
              <figure className="relative mx-auto w-[min(100%,13.25rem)] sm:w-[14rem] lg:ml-auto lg:mr-2 lg:w-[15rem] xl:mr-4 xl:w-[15.75rem]">
                <div
                  className="pointer-events-none absolute -inset-3 rounded-full bg-[#dccb7b]/[0.06] blur-2xl"
                  aria-hidden
                />
                <div
                  className="relative overflow-hidden border border-[#dccb7b]/28 shadow-[0_14px_40px_rgba(0,0,0,0.36)]"
                  style={{ aspectRatio: BUTTERFLY_EMBLEM_LIFESTYLE.aspectRatio }}
                >
                  <ProtectedImage
                    wrapperClassName="absolute inset-0 size-full [&_picture]:block [&_picture]:size-full"
                    src={BUTTERFLY_EMBLEM_LIFESTYLE.src}
                    alt={BUTTERFLY_EMBLEM_LIFESTYLE.alt}
                    sizes="(max-width: 640px) 212px, (max-width: 1024px) 224px, 252px"
                    className="size-full object-cover object-[center_16%] transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1f1b]/30 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
                <figcaption className="mt-3 text-center text-[9px] uppercase tracking-[0.2em] text-gold-on-forest lg:text-right">
                  Emerald butterfly pendant · in wear
                </figcaption>
              </figure>
            </EditorialReveal>
          </div>

          <ul className="mt-16 grid gap-8 border-t border-[#766d42]/25 pt-12 sm:grid-cols-3 sm:gap-6 md:mt-20 md:gap-10 md:pt-14">
            {BUTTERFLY_PILLARS.map((pillar, index) => (
              <li key={pillar.id}>
                <EditorialReveal delay={140 + index * 70}>
                  <div className="sm:pr-4">
                    <div className="mb-4 h-px w-8 bg-[#dccb7b]/60" />
                    <h3 className="font-editorial text-[1.05rem] tracking-[0.05em] text-[#f9f9f9]">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-on-forest-body">
                      {pillar.description}
                    </p>
                  </div>
                </EditorialReveal>
              </li>
            ))}
          </ul>
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
