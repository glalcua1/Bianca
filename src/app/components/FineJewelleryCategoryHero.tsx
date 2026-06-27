import ProtectedImage from "./protection/ProtectedImage";
import {
  FINE_JEWELLERY_CATEGORIES,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";

type HeroConfig = {
  image: string;
  alt: string;
  featureLabel: string;
  detail: string;
  imageClassName?: string;
};

const HERO_CONFIG: Partial<Record<JewelleryCategoryId, HeroConfig>> = {
  rings: {
    image: "/Rings/Women7.jpg",
    alt: "Bianca Diamonds — women's diamond rings collection",
    featureLabel: "Sapphire Maison",
    detail: "Architectural colour and salon-set brilliance",
    imageClassName: "max-h-[72%] max-w-[78%] object-contain object-center",
  },
  earrings: {
    image: "/Earrings/IMG_7662.jpg",
    alt: "Bianca Diamonds — ruby, emerald, and diamond earrings collection",
    featureLabel: "Ruby Emerald Trilogy Drop",
    detail: "Colour, movement, and IGI-certified lab-grown diamonds",
    imageClassName: "max-h-[68%] max-w-[72%] object-contain object-center",
  },
  necklaces: {
    image: "/necklace/Neck7.png",
    alt: "Ruby Heritage — ruby and diamond fringe necklace with matching earrings",
    featureLabel: "Ruby Heritage",
    detail: "High-jewellery drama for the neckline",
    imageClassName: "max-h-[74%] max-w-[80%] object-contain object-center",
  },
  pendants: {
    image: "/Pendant/Necklace1a.jpg",
    alt: "Classic Emerald Pendant — emerald and diamond halo on gold chain",
    featureLabel: "Classic Emerald Pendant",
    detail: "A precise point of colour and light",
    imageClassName: "max-h-[68%] max-w-[72%] object-contain object-center",
  },
  bracelets: {
    image: "/Bracelet/iih2ksiih2ksiih2-2.jpg",
    alt: "Emerald Garden — oval emerald and diamond floral link bracelet",
    featureLabel: "Emerald Garden",
    detail: "Botanical grace articulated for the wrist",
    imageClassName: "max-h-[70%] max-w-[78%] object-contain object-center",
  },
  "for-him": {
    image: "/Rings/Mens1.JPG",
    alt: "Maison Band — men's diamond band in white gold",
    featureLabel: "Maison Band",
    detail: "Weight, restraint, and diamond precision",
    imageClassName: "max-h-[68%] max-w-[74%] object-contain object-center",
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
    <section aria-labelledby={`${categoryId}-hero-heading`}>
      <div className="h-[25px] shrink-0 bg-[#1d3c34]" aria-hidden />

      <div
        className="relative overflow-hidden bg-[#1d3c34]"
        style={{
          height:
            "clamp(360px, calc(100dvh - var(--site-nav-offset, 88px) - 25px), 620px)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(220,203,123,0.08),transparent_48%)]"
          aria-hidden
        />

        <div className="relative mx-auto grid h-full w-full max-w-[100rem] grid-cols-1 lg:grid-cols-[0.382fr_0.618fr]">
          <div className="flex flex-col justify-center px-6 py-8 sm:px-10 md:px-12 lg:px-14 lg:py-0 xl:px-16">
            <div className="max-w-[26rem]">
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#dccb7b] sm:text-[10px]">
                Fine Jewelry · Salon Edit
              </p>
              <h1
                id={`${categoryId}-hero-heading`}
                className="mt-3 font-editorial text-[clamp(1.65rem,3.8vw,2.75rem)] leading-[1.1] tracking-[0.06em] text-[#faf8f5]"
              >
                {category.title}
              </h1>
              <p className="mt-4 text-[13px] leading-relaxed text-[#faf8f5]/88 sm:text-[14px]">
                {category.description}
              </p>
              <div className="mt-6 flex flex-col gap-2 border-l border-[#dccb7b]/40 pl-4">
                <p className="font-editorial text-[0.95rem] tracking-[0.08em] text-[#faf8f5] sm:text-[1rem]">
                  {config.featureLabel}
                </p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#dccb7b]">
                  {config.detail}
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex min-h-[240px] items-center justify-center px-6 pb-8 pt-2 sm:min-h-[280px] sm:px-10 lg:min-h-0 lg:px-8 lg:pb-0 lg:pt-0">
            <ProtectedImage
              priority
              wrapperClassName="flex h-full w-full items-center justify-center"
              src={config.image}
              alt={config.alt}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className={
                config.imageClassName ??
                "max-h-[70%] max-w-[76%] object-contain object-center"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
