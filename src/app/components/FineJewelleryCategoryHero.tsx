import ProtectedImage from "./protection/ProtectedImage";
import BrandImageWatermark from "./BrandImageWatermark";
import {
  FINE_JEWELLERY_CATEGORIES,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";

type HeroConfig = {
  image: string;
  alt: string;
  featureLabel: string;
  detail: string;
  imageBg: string;
  imageClassName?: string;
};

const HERO_CONFIG: Partial<Record<JewelleryCategoryId, HeroConfig>> = {
  rings: {
    image: "/Rings/Women7.jpg",
    alt: "Bianca Diamonds — women's diamond rings collection",
    featureLabel: "Sapphire Maison",
    detail: "Architectural colour and salon-set brilliance",
    imageBg: "#c8ac8d",
    imageClassName:
      "max-h-[86%] max-w-[88%] object-contain object-center drop-shadow-[0_28px_58px_rgba(8,20,16,0.24)]",
  },
  earrings: {
    image: "/Earrings/IMG_7662.jpg",
    alt: "Bianca Diamonds — ruby, emerald, and diamond earrings collection",
    featureLabel: "Ruby Emerald Trilogy Drop",
    detail: "Colour, movement, and IGI-certified lab-grown diamonds",
    imageBg: "#dedede",
    imageClassName:
      "max-h-[82%] max-w-[82%] object-contain object-center drop-shadow-[0_28px_58px_rgba(8,20,16,0.2)]",
  },
  necklaces: {
    image: "/necklace/Neck7.png",
    alt: "Ruby Heritage — ruby and diamond fringe necklace with matching earrings",
    featureLabel: "Ruby Heritage",
    detail: "High-jewellery drama for the neckline",
    imageBg: "#080808",
    imageClassName:
      "max-h-[88%] max-w-[90%] object-contain object-center drop-shadow-[0_30px_64px_rgba(0,0,0,0.38)]",
  },
  pendants: {
    image: "/Pendant/Necklace1a.jpg",
    alt: "Classic Emerald Pendant — emerald and diamond halo on gold chain",
    featureLabel: "Classic Emerald Pendant",
    detail: "A precise point of colour and light",
    imageBg: "#967c66",
    imageClassName:
      "max-h-[82%] max-w-[82%] object-contain object-center drop-shadow-[0_28px_58px_rgba(8,20,16,0.24)]",
  },
  bracelets: {
    image: "/Bracelet/iih2ksiih2ksiih2-2.jpg",
    alt: "Emerald Garden — oval emerald and diamond floral link bracelet",
    featureLabel: "Emerald Garden",
    detail: "Botanical grace articulated for the wrist",
    imageBg: "#bdaf9e",
    imageClassName:
      "max-h-[84%] max-w-[90%] object-contain object-center drop-shadow-[0_30px_60px_rgba(8,20,16,0.24)]",
  },
  "for-him": {
    image: "/Rings/Mens1.JPG",
    alt: "Maison Band — men's diamond band in white gold",
    featureLabel: "Maison Band",
    detail: "Weight, restraint, and diamond precision",
    imageBg: "#4f4d4e",
    imageClassName:
      "max-h-[82%] max-w-[84%] object-contain object-center drop-shadow-[0_28px_58px_rgba(8,20,16,0.32)]",
  },
};

type Props = {
  categoryId: JewelleryCategoryId;
};

export default function FineJewelleryCategoryHero({ categoryId }: Props) {
  const category = FINE_JEWELLERY_CATEGORIES.find((c) => c.id === categoryId);
  const config = HERO_CONFIG[categoryId];

  if (!category || !config) return null;

  return (
    <section
      aria-labelledby={`${categoryId}-hero-heading`}
      className="relative overflow-hidden bg-[#1d3c34]"
    >
      <div className="relative mx-auto grid min-h-[min(78vh,760px)] w-full max-w-[100rem] grid-cols-1 lg:min-h-[560px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10 flex min-h-[340px] flex-col justify-end overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:min-h-0 lg:px-16 lg:py-14">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(220,203,123,0.17),transparent_34%),linear-gradient(135deg,rgba(15,31,27,0.98),rgba(29,60,52,0.91))]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-10 right-0 hidden w-px bg-gradient-to-b from-transparent via-[#dccb7b]/35 to-transparent lg:block"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.32em] text-[#dccb7b] sm:text-[10px]">
              Fine Jewelry · Salon Edit
            </p>
            <h1
              id={`${categoryId}-hero-heading`}
              className="mt-3 font-editorial text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.12] tracking-[0.06em] text-[#faf8f5]"
            >
              {category.title}
            </h1>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-[#faf8f5]/85 sm:text-[14px] md:max-w-lg">
              {category.description}
            </p>
            <div className="mt-7 flex flex-col gap-2 border-l border-[#dccb7b]/35 pl-4">
              <p className="font-editorial text-[1rem] tracking-[0.08em] text-[#faf8f5]">
                {config.featureLabel}
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#dccb7b]/80">
                {config.detail}
              </p>
            </div>
          </div>
        </div>

        <div
          className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-6 py-10 sm:min-h-[540px] sm:px-10 lg:min-h-0 lg:px-14"
          style={{ backgroundColor: config.imageBg }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.5),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(15,31,27,0.1))]"
            aria-hidden
          />
          <ProtectedImage
            priority
            wrapperClassName="relative z-10 flex h-full w-full items-center justify-center"
            src={config.image}
            alt={config.alt}
            sizes="(max-width: 1024px) 100vw, 54vw"
            className={
              config.imageClassName ??
              "max-h-[84%] max-w-[88%] object-contain object-center"
            }
          />
          <BrandImageWatermark className="bottom-6 right-6 z-10 w-[clamp(48px,10vw,72px)] sm:bottom-8 sm:right-8" />
        </div>
      </div>
      <div className="h-6 md:h-8" aria-hidden />
    </section>
  );
}
