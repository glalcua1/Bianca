export type GoldPurity = "18KT" | "14KT";

export type JewelleryCategory =
  | "Necklace"
  | "Ring"
  | "Bracelet"
  | "Earrings"
  | "Pendant"
  | "Bridal Set"
  | "Tennis Bracelet"
  | "Choker";

export type StoneType =
  | "Emerald"
  | "Ruby"
  | "Sapphire"
  | "Pearl"
  | "Moissanite"
  | "Tanzanite"
  | "Topaz"
  | "Custom";

export type MakingChargeType = "fixed" | "percentage";
export type MarkupType = "percentage" | "flat";
export type DiscountType = "flat" | "percentage";
export type QuoteMode = "internal" | "customer";
export type GoldRateSource = "live" | "fallback" | "manual";

export interface GoldComponent {
  id: string;
  name: string;
  weightGrams: number;
  notes: string;
}

export interface PreciousStone {
  id: string;
  stoneType: StoneType;
  customName: string;
  quantity: number;
  caratWeight: number;
  ratePerCarat: number;
  overrideCost: boolean;
  manualCost: number;
}

export interface DiamondConfig {
  caratWeight: number;
  ratePerCarat: number;
  overrideCost: boolean;
  manualCost: number;
}

export interface MakingCharges {
  type: MakingChargeType;
  value: number;
}

export interface GstConfig {
  enabled: boolean;
  percentage: number;
}

export interface MarkupConfig {
  type: MarkupType;
  value: number;
}

export interface DiscountConfig {
  type: DiscountType;
  value: number;
}

export interface JewelleryDesign {
  id: string;
  name: string;
  category: JewelleryCategory;
  goldPurity: GoldPurity;
  components: GoldComponent[];
  diamond: DiamondConfig;
  stones: PreciousStone[];
  makingCharges: MakingCharges;
  gst: GstConfig;
  markup: MarkupConfig;
  discount: DiscountConfig;
  createdAt: string;
  updatedAt: string;
}

export interface GoldRatesState {
  rate18KT: number;
  rate14KT: number;
  lastUpdated: string | null;
  source: GoldRateSource;
  loading: boolean;
  error: string | null;
  manualOverride: boolean;
}

export interface ComponentBreakdownRow {
  id: string;
  name: string;
  weight: number;
  amount: number;
}

export interface StoneBreakdownRow {
  id: string;
  name: string;
  quantity: number;
  carat: number;
  rate: number;
  total: number;
}

export interface CalculationResult {
  totalGoldWeight: number;
  goldRate: number;
  goldAmount: number;
  componentBreakdown: ComponentBreakdownRow[];
  diamondCost: number;
  preciousStoneCost: number;
  stoneBreakdown: StoneBreakdownRow[];
  makingChargesAmount: number;
  subtotal: number;
  gstAmount: number;
  costPrice: number;
  sellingPrice: number;
  grossMargin: number;
  finalPrice: number;
}

export interface SavedVariant {
  id: string;
  name: string;
  design: JewelleryDesign;
  savedAt: string;
}

export interface HistoryEntry {
  id: string;
  name: string;
  design: JewelleryDesign;
  result: CalculationResult;
  goldRates: Pick<GoldRatesState, "rate18KT" | "rate14KT">;
  savedAt: string;
}

export interface CalculatorPersistedState {
  currentDesign: JewelleryDesign;
  variants: SavedVariant[];
  history: HistoryEntry[];
  quoteMode: QuoteMode;
  compareVariantIds: [string | null, string | null];
}
