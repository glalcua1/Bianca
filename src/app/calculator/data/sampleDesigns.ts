import {
  DEFAULT_DIAMOND,
  DEFAULT_DISCOUNT,
  DEFAULT_GST,
  DEFAULT_MARKUP,
  DEFAULT_MAKING,
  DEFAULT_STONE_RATES,
} from "../constants";
import { generateId } from "../lib/calculations";
import type { GoldComponent, JewelleryDesign, PreciousStone } from "../types";

function component(name: string, weightGrams: number, notes = ""): GoldComponent {
  return { id: generateId(), name, weightGrams, notes };
}

function stone(
  stoneType: PreciousStone["stoneType"],
  quantity: number,
  caratWeight: number,
  customName = "",
): PreciousStone {
  const rate =
    stoneType === "Custom"
      ? 10000
      : DEFAULT_STONE_RATES[stoneType as keyof typeof DEFAULT_STONE_RATES];
  return {
    id: generateId(),
    stoneType,
    customName,
    quantity,
    caratWeight,
    ratePerCarat: rate,
    overrideCost: false,
    manualCost: 0,
  };
}

function baseDesign(
  partial: Pick<JewelleryDesign, "name" | "category" | "goldPurity"> &
    Partial<
      Pick<
        JewelleryDesign,
        "components" | "diamond" | "stones" | "makingCharges"
      >
    >,
): JewelleryDesign {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    name: partial.name,
    category: partial.category,
    goldPurity: partial.goldPurity,
    components: partial.components ?? [],
    diamond: partial.diamond ?? { ...DEFAULT_DIAMOND },
    stones: partial.stones ?? [],
    makingCharges: partial.makingCharges ?? { ...DEFAULT_MAKING },
    gst: { ...DEFAULT_GST },
    markup: { ...DEFAULT_MARKUP },
    discount: { ...DEFAULT_DISCOUNT },
    createdAt: now,
    updatedAt: now,
  };
}

export const SAMPLE_DESIGNS: JewelleryDesign[] = [
  baseDesign({
    name: "3 Layer Necklace",
    category: "Necklace",
    goldPurity: "18KT",
    components: [
      component("Layer 1", 4.2, "Primary chain layer"),
      component("Layer 2", 3.1),
      component("Layer 3", 2.4),
      component("Pendant", 1.8, "Emerald pendant setting"),
    ],
    diamond: { caratWeight: 0.45, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
    stones: [stone("Emerald", 1, 1.2)],
    makingCharges: { type: "fixed", value: 2500 },
  }),
  baseDesign({
    name: "2 Layer Necklace",
    category: "Necklace",
    goldPurity: "18KT",
    components: [
      component("Layer 1", 4.0),
      component("Layer 2", 2.8),
      component("Pendant", 1.5),
    ],
    diamond: { caratWeight: 0.35, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
    stones: [stone("Emerald", 1, 0.9)],
  }),
  baseDesign({
    name: "Diamond Ring",
    category: "Ring",
    goldPurity: "18KT",
    components: [
      component("Ring Band", 3.2),
      component("Setting", 1.1),
    ],
    diamond: { caratWeight: 1.25, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
  }),
  baseDesign({
    name: "Emerald Bridal Necklace",
    category: "Bridal Set",
    goldPurity: "18KT",
    components: [
      component("Necklace Base", 12.5),
      component("Center Pendant", 3.2),
      component("Earring Left", 2.1),
      component("Earring Right", 2.1),
    ],
    diamond: { caratWeight: 2.1, ratePerCarat: 32000, overrideCost: false, manualCost: 0 },
    stones: [stone("Emerald", 3, 1.5), stone("Moissanite", 8, 0.15)],
    makingCharges: { type: "percentage", value: 15 },
  }),
  baseDesign({
    name: "Ruby Choker",
    category: "Choker",
    goldPurity: "14KT",
    components: [
      component("Choker Band", 8.5),
      component("Center Motif", 2.0),
    ],
    stones: [stone("Ruby", 5, 0.4)],
    diamond: { caratWeight: 0.2, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
  }),
  baseDesign({
    name: "Tennis Bracelet",
    category: "Tennis Bracelet",
    goldPurity: "18KT",
    components: [component("Bracelet Section", 9.8, "Full tennis line")],
    diamond: { caratWeight: 3.5, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
    makingCharges: { type: "fixed", value: 3500 },
  }),
];

export function createEmptyDesign(name = "New Design"): JewelleryDesign {
  return baseDesign({
    name,
    category: "Necklace",
    goldPurity: "18KT",
    components: [component("Layer 1", 0)],
  });
}

export function cloneDesign(design: JewelleryDesign, newName?: string): JewelleryDesign {
  const now = new Date().toISOString();
  return {
    ...structuredClone(design),
    id: generateId(),
    name: newName ?? `${design.name} (Copy)`,
    components: design.components.map((c) => ({ ...c, id: generateId() })),
    stones: design.stones.map((s) => ({ ...s, id: generateId() })),
    createdAt: now,
    updatedAt: now,
  };
}
