import type {
  CalculationResult,
  DiamondConfig,
  GoldComponent,
  GoldPurity,
  JewelleryDesign,
  PreciousStone,
} from "../types";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatCurrency(value: number): string {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(safe);
}

export function formatWeight(grams: number): string {
  const safe = Number.isFinite(grams) ? grams : 0;
  return `${safe % 1 === 0 ? safe.toFixed(0) : safe.toFixed(2)}g`;
}

export function parseNumber(value: string | number, fallback = 0): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : fallback;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getStoneDisplayName(stone: PreciousStone): string {
  return stone.stoneType === "Custom" && stone.customName.trim()
    ? stone.customName.trim()
    : stone.stoneType;
}

export function computeDiamondCost(diamond: DiamondConfig): number {
  if (diamond.overrideCost) return Math.max(0, diamond.manualCost);
  return Math.max(0, diamond.caratWeight * diamond.ratePerCarat);
}

export function computeStoneCost(stone: PreciousStone): number {
  if (stone.overrideCost) return Math.max(0, stone.manualCost);
  return Math.max(
    0,
    stone.caratWeight * stone.ratePerCarat * Math.max(0, stone.quantity),
  );
}

export function computeTotalGoldWeight(components: GoldComponent[]): number {
  return components.reduce(
    (sum, c) => sum + Math.max(0, c.weightGrams),
    0,
  );
}

export function getGoldRate(
  purity: GoldPurity,
  rate18KT: number,
  rate14KT: number,
): number {
  return purity === "18KT" ? rate18KT : rate14KT;
}

export function calculatePricing(
  design: JewelleryDesign,
  rate18KT: number,
  rate14KT: number,
): CalculationResult {
  const goldRate = getGoldRate(design.goldPurity, rate18KT, rate14KT);
  const totalGoldWeight = computeTotalGoldWeight(design.components);

  const componentBreakdown = design.components.map((c) => ({
    id: c.id,
    name: c.name,
    weight: Math.max(0, c.weightGrams),
    amount: Math.max(0, c.weightGrams) * goldRate,
  }));

  const goldAmount = componentBreakdown.reduce((s, r) => s + r.amount, 0);
  const diamondCost = computeDiamondCost(design.diamond);

  const stoneBreakdown = design.stones.map((s) => ({
    id: s.id,
    name: getStoneDisplayName(s),
    quantity: Math.max(0, s.quantity),
    carat: Math.max(0, s.caratWeight),
    rate: Math.max(0, s.ratePerCarat),
    total: computeStoneCost(s),
  }));

  const preciousStoneCost = stoneBreakdown.reduce((s, r) => s + r.total, 0);

  const makingChargesAmount =
    design.makingCharges.type === "percentage"
      ? goldAmount * (Math.max(0, design.makingCharges.value) / 100)
      : Math.max(0, design.makingCharges.value);

  const subtotal =
    goldAmount + diamondCost + preciousStoneCost + makingChargesAmount;

  const gstAmount = design.gst.enabled
    ? subtotal * (Math.max(0, design.gst.percentage) / 100)
    : 0;

  const costPrice = subtotal + gstAmount;

  let sellingPrice: number;
  if (design.markup.type === "percentage") {
    sellingPrice = costPrice * (1 + Math.max(0, design.markup.value) / 100);
  } else {
    sellingPrice = costPrice + Math.max(0, design.markup.value);
  }

  const grossMargin = sellingPrice - costPrice;

  let finalPrice: number;
  if (design.discount.type === "percentage") {
    finalPrice =
      sellingPrice * (1 - Math.max(0, design.discount.value) / 100);
  } else {
    finalPrice = sellingPrice - Math.max(0, design.discount.value);
  }

  finalPrice = Math.max(0, finalPrice);

  return {
    totalGoldWeight,
    goldRate,
    goldAmount,
    componentBreakdown,
    diamondCost,
    preciousStoneCost,
    stoneBreakdown,
    makingChargesAmount,
    subtotal,
    gstAmount,
    costPrice,
    sellingPrice,
    grossMargin,
    finalPrice,
  };
}
