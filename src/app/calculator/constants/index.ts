import type {
  DiscountConfig,
  DiamondConfig,
  GstConfig,
  JewelleryCategory,
  MakingCharges,
  MarkupConfig,
  StoneType,
} from "../types";

export const STORAGE_KEY = "bianca-calculator-v1";

export const DEFAULT_RATE_18KT = 6850;
export const DEFAULT_RATE_14KT = 5320;
export const DEFAULT_DIAMOND_RATE = 29000;
export const DEFAULT_MAKING_CHARGE = 1500;
export const DEFAULT_GST_PERCENT = 3;

export const JEWELLERY_CATEGORIES: JewelleryCategory[] = [
  "Necklace",
  "Ring",
  "Bracelet",
  "Earrings",
  "Pendant",
  "Bridal Set",
  "Tennis Bracelet",
  "Choker",
];

export const STONE_TYPES: StoneType[] = [
  "Emerald",
  "Ruby",
  "Sapphire",
  "Pearl",
  "Moissanite",
  "Tanzanite",
  "Topaz",
  "Custom",
];

export const DEFAULT_STONE_RATES: Record<Exclude<StoneType, "Custom">, number> =
  {
    Emerald: 12000,
    Ruby: 15000,
    Sapphire: 14000,
    Pearl: 8000,
    Moissanite: 6000,
    Tanzanite: 18000,
    Topaz: 5000,
  };

export const DEFAULT_DIAMOND: DiamondConfig = {
  caratWeight: 0,
  ratePerCarat: DEFAULT_DIAMOND_RATE,
  overrideCost: false,
  manualCost: 0,
};

export const DEFAULT_MAKING: MakingCharges = {
  type: "fixed",
  value: DEFAULT_MAKING_CHARGE,
};

export const DEFAULT_GST: GstConfig = {
  enabled: true,
  percentage: DEFAULT_GST_PERCENT,
};

export const DEFAULT_MARKUP: MarkupConfig = {
  type: "percentage",
  value: 20,
};

export const DEFAULT_DISCOUNT: DiscountConfig = {
  type: "percentage",
  value: 0,
};

export const CHART_COLORS = {
  gold: "#C9A962",
  diamond: "#1a1a1a",
  stones: "#1d3c34",
  making: "#8B7355",
  gst: "#717182",
};
