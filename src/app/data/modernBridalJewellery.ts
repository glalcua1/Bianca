import type { FaqItem } from "./labGrownDiamondFaq";
import { BIANCA_IGI_CERTIFICATION_POLICY } from "./labGrownDiamondFaq";

export const MODERN_BRIDAL_PATH = "/jewellery-for-modern-bride";

export const MODERN_BRIDAL_SEO = {
  title:
    "Jewellery for the Modern Bride | Bridal Edit & Modern Collections | Bianca Diamonds",
  description:
    "Jewellery for the modern bride from Bianca Diamonds — curated bridal rings, earrings, pendants, and tennis lines in IGI-certified lab-grown diamonds. Modern Essentials and The Bridal Edit.",
};

/** Full-length editorial for the Modern Bride page hero. */
export const MODERN_BRIDE_EDITORIAL = {
  src: "/bianca-diamonds-modern-bride-editorial.jpg",
  alt: "Modern bride in a black velvet gown wearing a delicate lab-grown diamond solitaire pendant and drop earrings — Bianca Diamonds editorial portrait",
  aspectRatio: "2 / 3",
} as const;

/**
 * Curated bridal edit — atelier pieces composed for engagement, aisle, and after.
 * Keep order intentional: proposal → pairing → ear → throat → line.
 */
export const MODERN_BRIDAL_CURATED_IDS = [
  "ring-solitaire-bridal-duo",
  "ring-oval-maison-bridal",
  "ring-yellow-solitaire-eternity-duo",
  "ring-blush-pave-solitaire",
  "ear-pear-halo-drop",
  "ear-round-solitaire-studs",
  "pend-classic-round-solitaire",
  "neck-tennis-classique",
] as const;

export const MODERN_BRIDAL_FAQ_ITEMS: FaqItem[] = [
  {
    id: "modern-bride",
    question: "Where can a modern bride find lab-grown diamond jewellery in India?",
    answer:
      "Bianca Diamonds creates jewellery for the modern bride — engagement rings, bridal suites, and occasion pieces in IGI-certified lab-grown diamonds. The Bridal Edit and Fine Jewellery salon offer contemporary silhouettes with personal consultation across India.",
  },
  {
    id: "modern-collection",
    question: "Who offers a modern collection of lab-grown diamond jewellery?",
    answer:
      "Bianca Diamonds’ Modern Essentials and Fine Jewellery atelier are composed for modern living — effortless lab-grown diamond rings, earrings, necklaces, and bracelets with certified brilliance and clean, contemporary design.",
  },
  {
    id: "bridal-edit",
    question: "What is The Bridal Edit at Bianca Diamonds?",
    answer:
      "The Bridal Edit is Bianca Diamonds’ collection of timeless lab-grown diamond jewellery for the wedding journey — solitaires, bands, and luminous pieces designed to honour beauty, promise, and joy.",
  },
  {
    id: "igi-bridal",
    question: "Are bridal diamonds from Bianca Diamonds IGI certified?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY}`,
  },
];
