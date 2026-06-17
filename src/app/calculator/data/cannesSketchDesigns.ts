/**
 * Pricing configurations derived from Cannes atelier sketches
 * (public/Cannes/Sketches). Weights and carats are atelier estimates
 * based on annotated sketch dimensions and stone counts.
 */
import {
  DEFAULT_DIAMOND,
  DEFAULT_DISCOUNT,
  DEFAULT_GST,
  DEFAULT_MARKUP,
  DEFAULT_STONE_RATES,
} from "../constants";
import { calculatePricing, generateId } from "../lib/calculations";
import { DEFAULT_RATE_18KT, DEFAULT_RATE_14KT } from "../constants";
import type { GoldComponent, JewelleryDesign, PreciousStone } from "../types";

export type CannesSketchPricingEntry = {
  sketchFile: string;
  sketchSrc: string;
  alt: string;
  design: JewelleryDesign;
  result: ReturnType<typeof calculatePricing>;
  notes: string[];
};

function comp(name: string, weightGrams: number, notes = ""): GoldComponent {
  return { id: generateId(), name, weightGrams, notes };
}

function gem(
  stoneType: PreciousStone["stoneType"],
  quantity: number,
  caratWeight: number,
  ratePerCarat?: number,
  customName = "",
): PreciousStone {
  const rate =
    ratePerCarat ??
    (stoneType === "Custom"
      ? 10000
      : DEFAULT_STONE_RATES[stoneType as keyof typeof DEFAULT_STONE_RATES]);
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

function sketchDesign(
  partial: Pick<JewelleryDesign, "name" | "category" | "goldPurity"> &
    Partial<
      Pick<
        JewelleryDesign,
        "components" | "diamond" | "stones" | "makingCharges" | "markup"
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
    makingCharges: partial.makingCharges ?? { type: "percentage", value: 18 },
    gst: { ...DEFAULT_GST },
    markup: partial.markup ?? { ...DEFAULT_MARKUP },
    discount: { ...DEFAULT_DISCOUNT },
    createdAt: now,
    updatedAt: now,
  };
}

const SKETCH_SPECS: Omit<
  CannesSketchPricingEntry,
  "result"
>[] = [
  {
    sketchFile: "IMG_6727.PNG",
    sketchSrc: "/Cannes/Sketches/IMG_6727.PNG",
    alt: "Emerald-cut parure — three-tiered cascading necklace",
    notes: [
      "Sketch: 3 tiers (5+7+9 gems), white gold, 280mm drop",
      "21 necklace + 4 earring seafoam emerald-cut gems",
      "Extensive pavé halos and pear diamond fringe",
    ],
    design: sketchDesign({
      name: "Seafoam Emerald Parure (Sketch 6727)",
      category: "Bridal Set",
      goldPurity: "18KT",
      components: [
        comp("Necklace Chain & Bars", 4.2, "White gold mounting"),
        comp("Inner Tier (5 gems)", 3.8),
        comp("Middle Tier (7 gems)", 5.1),
        comp("Outer Tier (9 gems)", 6.4),
        comp("Pear Diamond Fringe", 2.2),
        comp("Earring Left", 3.1, "75mm drop"),
        comp("Earring Right", 3.1),
      ],
      diamond: {
        caratWeight: 9.5,
        ratePerCarat: 29000,
        overrideCost: false,
        manualCost: 0,
      },
      stones: [
        gem("Emerald", 25, 0.85, 12000, "Seafoam emerald-cut"),
      ],
      makingCharges: { type: "percentage", value: 20 },
    }),
  },
  {
    sketchFile: "IMG_6729.PNG",
    sketchSrc: "/Cannes/Sketches/IMG_6729.PNG",
    alt: "Ruby & diamond cascading fringe earrings",
    notes: [
      "Sketch: 18K white gold, 2 half-moon cabochon rubies",
      "18 diamond strands per earring with pear terminals",
      "Pavé diamond arch with marquise motif",
    ],
    design: sketchDesign({
      name: "Ruby Cascading Fringe Earrings (Sketch 6729)",
      category: "Earrings",
      goldPurity: "18KT",
      components: [
        comp("Earring Left — Arch & Mount", 4.5),
        comp("Earring Left — Fringe Assembly", 2.8),
        comp("Earring Right — Arch & Mount", 4.5),
        comp("Earring Right — Fringe Assembly", 2.8),
      ],
      diamond: { caratWeight: 7.2, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [gem("Ruby", 2, 3.2, 15000, "Half-moon cabochon")],
      makingCharges: { type: "percentage", value: 22 },
    }),
  },
  {
    sketchFile: "IMG_6732.jpg",
    sketchSrc: "/Cannes/Sketches/IMG_6732.jpg",
    alt: "5.00 ct solitaire ring with interwoven pavé band",
    notes: [
      "Sketch annotation: 5.00 CT round brilliant solitaire",
      "~8 accent diamonds + ~200 pavé melee in interwoven band",
    ],
    design: sketchDesign({
      name: "5ct Interwoven Pavé Ring (Sketch 6732)",
      category: "Ring",
      goldPurity: "18KT",
      components: [
        comp("Interwoven Pavé Band", 10.5),
        comp("Prong Setting & Gallery", 1.8),
      ],
      diamond: { caratWeight: 8.4, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      makingCharges: { type: "fixed", value: 8500 },
    }),
  },
  {
    sketchFile: "IMG_6733.jpg",
    sketchSrc: "/Cannes/Sketches/IMG_6733.jpg",
    alt: "12ct ruby Florentine cluster bracelet",
    notes: [
      "Sketch: ~12ct emerald-cut ruby centre",
      "40–50 pear + 260–320 round diamonds, internal filigree",
      "Estimated 95g 18KT gold",
    ],
    design: sketchDesign({
      name: "Ruby Florentine Cluster Bracelet (Sketch 6733)",
      category: "Bracelet",
      goldPurity: "18KT",
      components: [
        comp("Wide Bangle Body", 72.0, "Hinged cuff with filigree"),
        comp("Florentine Cluster Panel", 14.5),
        comp("Pavé Border Rows", 8.5),
      ],
      diamond: { caratWeight: 16.0, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [gem("Ruby", 1, 12.0, 15000, "Emerald-cut centre")],
      makingCharges: { type: "percentage", value: 22 },
    }),
  },
  {
    sketchFile: "IMG_6735.PNG",
    sketchSrc: "/Cannes/Sketches/IMG_6735.PNG",
    alt: "Emerald peacock bangle — technical design plan",
    notes: [
      "Technical plan: 18K white gold cuff",
      "Stone table: 70 white diamonds, 147 emeralds, 249 black diamonds",
      "Articulated crest/tail, spring hinge, safety clasp",
    ],
    design: sketchDesign({
      name: "Emerald Peacock Bangle (Sketch 6735)",
      category: "Bracelet",
      goldPurity: "18KT",
      components: [
        comp("Cuff Body — Oval Emeralds", 28.0),
        comp("Peacock Head & Crest", 8.5, "Articulated"),
        comp("Articulated Tail Feathers", 12.0),
        comp("Clasp & Spring Hinge", 4.2),
      ],
      diamond: { caratWeight: 10.93, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [
        gem("Emerald", 147, 0.036, 12000, "Oval pavé — from stone table"),
        gem("Custom", 249, 0.145, 8000, "Black diamond pavé"),
        gem("Ruby", 2, 0.15, 15000, "Peacock eye stones"),
      ],
      makingCharges: { type: "fixed", value: 18500 },
    }),
  },
  {
    sketchFile: "IMG_6758.jpg",
    sketchSrc: "/Cannes/Sketches/IMG_6758.jpg",
    alt: "Miami Cuban link chain — alternating metals",
    notes: [
      "Design #390150078: alternating 18K yellow & micro-pavé links",
      "~20 gold + ~20 diamond links, dual-action paved box clasp",
      "Estimated 20\" chain — 98g total metal",
    ],
    design: sketchDesign({
      name: "Miami Cuban Link Chain (Sketch 6758)",
      category: "Necklace",
      goldPurity: "18KT",
      components: [
        comp("18K Yellow Gold Links (×20)", 48.0),
        comp("White Gold Pavé Links (×20)", 42.0),
        comp("Paved Box Clasp", 8.0, "Dual-action safety"),
      ],
      diamond: { caratWeight: 18.5, ratePerCarat: 32000, overrideCost: false, manualCost: 0 },
      makingCharges: { type: "percentage", value: 15 },
    }),
  },
  {
    sketchFile: "IMG_6774.jpg",
    sketchSrc: "/Cannes/Sketches/IMG_6774.jpg",
    alt: "Custom cocktail ring — mint oval gem",
    notes: [
      "Sketch: 14×10mm oval mint green gemstone",
      "1.50 ct pavé diamond halo, 18K white gold basket",
    ],
    design: sketchDesign({
      name: "Mint Oval Cocktail Ring (Sketch 6774)",
      category: "Ring",
      goldPurity: "18KT",
      components: [
        comp("Split-Shoulder Shank", 5.5),
        comp("Prong Basket & Gallery", 4.2),
      ],
      diamond: { caratWeight: 1.5, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [
        gem("Custom", 1, 5.5, 18000, "Mint tourmaline 14×10mm"),
      ],
      makingCharges: { type: "fixed", value: 4500 },
    }),
  },
  {
    sketchFile: "IMG_6828.PNG",
    sketchSrc: "/Cannes/Sketches/IMG_6828.PNG",
    alt: "Ruby laurel wreath cocktail ring",
    notes: [
      "Large oval ruby centre with laurel wreath marquise diamonds",
      "Floral cluster (6 marquise petals), intricate wire basket",
    ],
    design: sketchDesign({
      name: "Ruby Laurel Wreath Ring (Sketch 6828)",
      category: "Ring",
      goldPurity: "18KT",
      components: [
        comp("Tapered Band", 3.8),
        comp("Wire Basket & Laurel Setting", 5.2),
      ],
      diamond: { caratWeight: 2.8, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [gem("Ruby", 1, 3.5, 15000, "Oval centre")],
      makingCharges: { type: "percentage", value: 18 },
    }),
  },
  {
    sketchFile: "IMG_6829.PNG",
    sketchSrc: "/Cannes/Sketches/IMG_6829.PNG",
    alt: "Sapphire V-form wide diamond cuff",
    notes: [
      "Wide hinged cuff, large oval sapphire centre",
      "5-tier V chevron + full pavé band (~12ct melee)",
      "Internal honeycomb gallery, ~75g gold",
    ],
    design: sketchDesign({
      name: "Sapphire V-Form Diamond Cuff (Sketch 6829)",
      category: "Bracelet",
      goldPurity: "18KT",
      components: [
        comp("Wide Pavé Cuff Body", 58.0, "7–9 rows of melee"),
        comp("Central Sapphire Mount", 6.5),
        comp("V-Chevron Cascade", 5.8),
        comp("Hinge & Clasp", 4.7),
      ],
      diamond: { caratWeight: 12.5, ratePerCarat: 29000, overrideCost: false, manualCost: 0 },
      stones: [gem("Sapphire", 1, 9.0, 14000, "Oval centre")],
      makingCharges: { type: "percentage", value: 20 },
    }),
  },
];

export const CANNES_SKETCH_PRICING: CannesSketchPricingEntry[] = SKETCH_SPECS.map(
  (entry) => ({
    ...entry,
    result: calculatePricing(
      entry.design,
      DEFAULT_RATE_18KT,
      DEFAULT_RATE_14KT,
    ),
  }),
);

export function getCannesSketchByFile(filename: string) {
  return CANNES_SKETCH_PRICING.find((s) => s.sketchFile === filename);
}
