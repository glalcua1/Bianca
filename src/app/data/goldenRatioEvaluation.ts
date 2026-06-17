import type { JewelleryCategoryId } from "./fineJewelleryCollections";

export const GOLDEN_RATIO_SEO = {
  title: "Golden Ratio Evaluation | Bianca Diamonds",
  description:
    "Atelier proportion analysis for Bianca fine jewellery — each piece evaluated against the golden ratio (φ) with detailed metrics and Gemini atelier redesign sketches.",
};

export const GOLDEN_RATIO_INTRO = {
  eyebrow: "Bianca Diamonds · Atelier Tools",
  title: "Golden Ratio Evaluation",
  description:
    "Every Bianca piece is assessed against φ (1.618) — the proportion that has guided master jewellers for centuries. Select an atelier piece for a detailed proportion report; pieces outside tolerance receive an annotated refinement sketch.",
};

export const PHI_DISPLAY = "1.618";

export type GoldenRatioCategoryFilter = JewelleryCategoryId | "all";

export const GOLDEN_RATIO_CATEGORY_FILTERS: {
  id: GoldenRatioCategoryFilter;
  label: string;
}[] = [
  { id: "all", label: "All pieces" },
  { id: "rings", label: "Rings" },
  { id: "earrings", label: "Earrings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "pendants", label: "Pendants" },
  { id: "bracelets", label: "Bracelets" },
  { id: "for-him", label: "For Him" },
];
