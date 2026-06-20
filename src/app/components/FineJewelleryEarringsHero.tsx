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

          <div className="relative aspect-[4/5] w-full bg-[#dedede] sm:aspect-[16/10] lg:aspect-[21/9]">
            <ProtectedImage
              priority
              wrapperClassName="absolute inset-0"
              src={EARRINGS_HERO_IMAGE}
              alt="Bianca Diamonds — ruby, emerald, and diamond earrings collection"
              sizes="100vw"
              className="h-full w-full object-cover object-[center_42%] sm:object-[center_46%] lg:object-[center_48%]"
            />

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1f1b]/88 via-[#0f1f1b]/18 to-transparent sm:from-[#0f1f1b]/75 sm:via-[#0f1f1b]/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f1f1b]/50 via-transparent to-transparent sm:from-[#0f1f1b]/40"
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-8 pt-16 sm:px-10 sm:pb-10 md:px-14 md:pb-12 lg:px-16">
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

            <BrandImageWatermark className="bottom-6 right-6 z-10 w-[clamp(48px,10vw,72px)] sm:bottom-8 sm:right-8" />
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
