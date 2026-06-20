import ProtectedImage from "./protection/ProtectedImage";
import BrandImageWatermark from "./BrandImageWatermark";
import { FINE_JEWELLERY_CATEGORIES } from "../data/fineJewelleryCollections";

const EARRINGS_HERO_IMAGE = "/Earrings/IMG_7662.jpg";

export default function FineJewelleryEarringsHero() {
  const category = FINE_JEWELLERY_CATEGORIES.find((c) => c.id === "earrings");

  return (
    <section
      aria-labelledby="earrings-hero-heading"
      className="relative bg-[#1d3c34]"
    >
      <div className="relative mx-auto w-full max-w-[100rem] px-4 pb-0 pt-4 sm:px-6 md:px-8 md:pt-6 lg:px-10">
        <div className="relative overflow-hidden rounded-sm border border-[#766d42]/20 bg-[#0f1f1b] shadow-[0_24px_64px_rgba(13,28,24,0.12)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#dccb7b]/55 to-transparent"
            aria-hidden
          />

          <div className="grid min-h-[min(78vh,760px)] grid-cols-1 bg-[#10241f] lg:min-h-[520px] lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative z-10 flex min-h-[320px] flex-col justify-end overflow-hidden px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 lg:min-h-0 lg:px-16">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,203,123,0.16),transparent_34%),linear-gradient(135deg,rgba(15,31,27,0.98),rgba(29,60,52,0.9))]"
                aria-hidden
              />
              <div className="relative">
                <p className="text-[9px] uppercase tracking-[0.32em] text-[#dccb7b] sm:text-[10px]">
                  Fine Jewelry · Salon Edit
                </p>
                <h1
                  id="earrings-hero-heading"
                  className="mt-3 max-w-xl font-editorial text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.12] tracking-[0.06em] text-[#faf8f5]"
                >
                  {category?.title ?? "Earrings"}
                </h1>
                <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#faf8f5]/85 sm:text-[14px] md:max-w-lg">
                  {category?.description ??
                    "Studs, hoops, and drops with certified lab-grown brilliance."}
                </p>
                <p className="mt-6 hidden text-[10px] uppercase tracking-[0.22em] text-[#dccb7b]/80 sm:block">
                  Colour, movement, and IGI-certified lab-grown diamonds
                </p>
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden border-t border-[#766d42]/20 bg-[#dedede] p-5 sm:min-h-[520px] sm:p-8 lg:min-h-0 lg:border-l lg:border-t-0 lg:p-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.58),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(15,31,27,0.08))]"
                aria-hidden
              />
              <ProtectedImage
                priority
                wrapperClassName="relative z-10 flex h-full w-full items-center justify-center"
                src={EARRINGS_HERO_IMAGE}
                alt="Bianca Diamonds — ruby, emerald, and diamond earrings collection"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="max-h-full max-w-full object-contain object-center drop-shadow-[0_24px_48px_rgba(15,31,27,0.18)]"
              />

              <BrandImageWatermark className="bottom-6 right-6 z-10 w-[clamp(48px,10vw,72px)] sm:bottom-8 sm:right-8" />
            </div>
          </div>

          <div
            className="h-px w-full bg-gradient-to-r from-transparent via-[#766d42]/45 to-transparent"
            aria-hidden
          />
        </div>
      </div>

      <div className="h-6 md:h-8" aria-hidden />
    </section>
  );
}
