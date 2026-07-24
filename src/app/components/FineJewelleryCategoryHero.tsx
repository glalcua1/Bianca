import SalonEditorialHero from "./SalonEditorialHero";
import {
  FINE_JEWELLERY_CATEGORIES,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";

type HeroConfig = {
  image: string;
  alt: string;
  featureLabel: string;
  detail: string;
  /** Prefer cover for lifestyle plates; contain for atelier product shots */
  imageMode?: "cover" | "contain";
  objectPosition?: string;
};

const HERO_CONFIG: Record<JewelleryCategoryId, HeroConfig> = {
  rings: {
    image: "/Rings/bianca-diamonds-sapphire-maison-ring.jpg",
    alt: "Bianca Diamonds — women's diamond rings collection",
    featureLabel: "Sapphire Maison",
    detail: "Architectural colour and salon-set brilliance",
  },
  earrings: {
    image: "/Earrings/IMG_7662.jpg",
    alt: "Bianca Diamonds — ruby, emerald, and diamond earrings collection",
    featureLabel: "Ruby Emerald Trilogy Drop",
    detail: "Colour, movement, and IGI-certified lab-grown diamonds",
  },
  necklaces: {
    image: "/necklace/Neck7.png",
    alt: "Ruby Heritage — ruby and diamond fringe necklace with matching earrings",
    featureLabel: "Ruby Heritage",
    detail: "High-jewellery drama for the neckline",
  },
  pendants: {
    image: "/Pendant/P1.jpg",
    alt: "Blue Star Pear Diamond Halo — pear blue diamond pendant with white diamond halo on yellow gold",
    featureLabel: "Blue Star Pear Diamond Halo",
    detail: "A precise point of diamond colour and light",
  },
  bracelets: {
    image: "/Bracelet/iih2ksiih2ksiih2-2.jpg",
    alt: "Emerald Garden — oval emerald and diamond floral link bracelet",
    featureLabel: "Emerald Garden",
    detail: "Botanical grace articulated for the wrist",
  },
  "for-him": {
    image: "/Rings/Mens1.JPG",
    alt: "Maison Band — men's diamond band in white gold",
    featureLabel: "Maison Band",
    detail: "Weight, restraint, and diamond precision",
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
    <SalonEditorialHero
      headingId={`${categoryId}-hero-heading`}
      eyebrow="Fine Jewellery · Salon Edit"
      title={category.title}
      body={category.description}
      image={config.image}
      imageAlt={config.alt}
      imageMode={config.imageMode ?? "contain"}
      objectPosition={config.objectPosition}
      feature={{ label: config.featureLabel, detail: config.detail }}
    />
  );
}
