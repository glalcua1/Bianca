import imgModernEssentials from "figma:asset/afa9671f19943983683b5212bd4e0ff5a61cc775.png";
import imgOccasionElegance from "figma:asset/791d0a8cf2d96d0d481c05ccdd58d68bc023a7a9.png";
import imgBridalEdit from "figma:asset/581d41c78850052909c92d619a846a456fb23495.png";

export type FineJewelleryCollection = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

export type FineJewelleryCategory = {
  title: string;
  description: string;
};

export type ShowcasePiece = {
  src: string;
  alt: string;
};

export const FINE_JEWELLERY_COLLECTIONS: FineJewelleryCollection[] = [
  {
    id: "modern-essentials",
    title: "Modern Essentials",
    description:
      "Discover diamonds designed for modern living — effortless pieces that bring refined sparkle to every moment of your day.",
    image: imgModernEssentials,
    imageAlt: "Modern Essentials — everyday diamond jewellery",
  },
  {
    id: "occasion-elegance",
    title: "Occasion Elegance",
    description:
      "Statement diamonds crafted to elevate life's most memorable celebrations with brilliance, beauty, and presence.",
    image: imgOccasionElegance,
    imageAlt: "Occasion Elegance — celebration diamond rings",
    imageClassName: "object-contain p-8",
  },
  {
    id: "bridal-edit",
    title: "The Bridal Edit",
    description:
      "Timeless diamonds created to honour the beauty, promise, and joy of your wedding journey.",
    image: imgBridalEdit,
    imageAlt: "The Bridal Edit — wedding and bridal diamond jewellery",
    imageClassName: "object-cover object-top scale-110",
  },
];

export const FINE_JEWELLERY_CATEGORIES: FineJewelleryCategory[] = [
  {
    title: "Rings",
    description: "Solitaires, bands, and stackable designs for every hand.",
  },
  {
    title: "Earrings",
    description: "Studs, hoops, and drops with certified lab-grown brilliance.",
  },
  {
    title: "Necklaces",
    description: "Pendants and chains designed for layered or solo wear.",
  },
  {
    title: "Bracelets",
    description: "Tennis styles and delicate cuffs for wrist-level sparkle.",
  },
  {
    title: "For Him",
    description: "Refined bands and signet-inspired pieces for modern men.",
  },
];

export const SHOWCASE_PIECES: ShowcasePiece[] = [
  { src: "/Rings/IMG_5298.jpg", alt: "Lab-grown diamond ring — Bianca Diamonds" },
  { src: "/Rings/IMG_5299.jpg", alt: "Fine diamond ring detail — Bianca Diamonds" },
  { src: "/Rings/IMG_5302.jpg", alt: "Diamond ring on hand — Bianca Diamonds" },
  { src: "/Rings/Women_ring.png", alt: "Women's diamond ring — Bianca Diamonds" },
  { src: "/Mens/Men.png", alt: "Men's diamond band — Bianca Diamonds" },
];
