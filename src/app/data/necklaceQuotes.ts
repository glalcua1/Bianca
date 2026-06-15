/** Auto-generated from order packing list — run `node scripts/generate-necklace-quotes.mjs` to refresh */

export type ParurePieceQuote = {
  styleCode: string;
  biancaProductCode?: string;
  priceInr: number;
  metal: string;
  metalNetWeightG: number;
  metalPueWeightG: number;
  diamondTotalCarat: number;
  diamondPieces: number;
  diamondShapes: string;
  centreStone: string | null;
};

export type ParureCatalogEntry = {
  bianca: string;
  kiraNecklace: string;
  kiraEarring: string | null;
};

export const PARURE_MAP: ParureCatalogEntry[] = [
  {
    "bianca": "BD-K-NK-001",
    "kiraNecklace": "NL00428",
    "kiraEarring": "NLE00428"
  },
  {
    "bianca": "BD-K-NK-003",
    "kiraNecklace": "NL00418",
    "kiraEarring": "NLE00418"
  },
  {
    "bianca": "BD-K-NK-006",
    "kiraNecklace": "NL00083",
    "kiraEarring": "NLE00083"
  },
  {
    "bianca": "BD-K-NK-008",
    "kiraNecklace": "NL00474",
    "kiraEarring": "NLE00474"
  },
  {
    "bianca": "BD-K-NK-015",
    "kiraNecklace": "NL00456",
    "kiraEarring": "NLE00456"
  },
  {
    "bianca": "BD-K-NK-016",
    "kiraNecklace": "NL00208",
    "kiraEarring": "NLE00208"
  },
  {
    "bianca": "BD-K-NK-017",
    "kiraNecklace": "NL00052",
    "kiraEarring": "NLE00052"
  }
];

export const NECKLACE_SALON_MARKUP_INR = 250_000;
export const EARRING_SALON_MARKUP_INR = 50_000;

export const NECKLACE_QUOTES: Record<string, ParurePieceQuote> = {
  "BD-K-NK-001": {
    "styleCode": "NL00428",
    "priceInr": 2246607,
    "metal": "18K yellow gold",
    "metalNetWeightG": 111.165,
    "metalPueWeightG": 84.485,
    "diamondTotalCarat": 68.04,
    "diamondPieces": 936,
    "diamondShapes": "Marquise, Pear, Round brilliant",
    "centreStone": "Marquise 37.59ct · MQ 7.2x3.5",
    "biancaProductCode": "BD-K-NK-001"
  },
  "BD-K-NK-003": {
    "styleCode": "NL00418",
    "priceInr": 2334280,
    "metal": "18K yellow gold",
    "metalNetWeightG": 90,
    "metalPueWeightG": 68.4,
    "diamondTotalCarat": 107.783,
    "diamondPieces": 251,
    "diamondShapes": "Marquise, Pear, Round brilliant",
    "centreStone": "Pear 11.7ct · PE 6.6x4.1",
    "biancaProductCode": "BD-K-NK-003"
  },
  "BD-K-NK-006": {
    "styleCode": "NL00083",
    "priceInr": 2944705,
    "metal": "18K yellow gold",
    "metalNetWeightG": 114.485,
    "metalPueWeightG": 87.009,
    "diamondTotalCarat": 126.69,
    "diamondPieces": 170,
    "diamondShapes": "Marquise, Oval, Pear, Round brilliant",
    "centreStone": "Pear 41.56ct · PE 8.9x5.0",
    "biancaProductCode": "BD-K-NK-006"
  },
  "BD-K-NK-008": {
    "styleCode": "NL00474",
    "priceInr": 1389071,
    "metal": "18K yellow gold",
    "metalNetWeightG": 71.698,
    "metalPueWeightG": 54.49,
    "diamondTotalCarat": 41.61,
    "diamondPieces": 81,
    "diamondShapes": "Oval, Pear, Round brilliant",
    "centreStone": "Oval 11.32ct · OV 6.7x4.7",
    "biancaProductCode": "BD-K-NK-008"
  },
  "BD-K-NK-015": {
    "styleCode": "NL00456",
    "priceInr": 709052,
    "metal": "18K yellow gold",
    "metalNetWeightG": 29.419,
    "metalPueWeightG": 22.358,
    "diamondTotalCarat": 30.37,
    "diamondPieces": 101,
    "diamondShapes": "Oval, Pear, Round brilliant",
    "centreStone": "Oval 11.37ct · OV 5.5x3.7",
    "biancaProductCode": "BD-K-NK-015"
  },
  "BD-K-NK-016": {
    "styleCode": "NL00208",
    "priceInr": 1211477,
    "metal": "18K yellow gold",
    "metalNetWeightG": 59.026,
    "metalPueWeightG": 44.86,
    "diamondTotalCarat": 41.92,
    "diamondPieces": 121,
    "diamondShapes": "Marquise, Pear",
    "centreStone": "Marquise 7.5ct · MQ 7.4x3.6",
    "biancaProductCode": "BD-K-NK-016"
  },
  "BD-K-NK-017": {
    "styleCode": "NL00052",
    "priceInr": 740322,
    "metal": "18K yellow gold",
    "metalNetWeightG": 34.757,
    "metalPueWeightG": 26.415,
    "diamondTotalCarat": 26.5,
    "diamondPieces": 39,
    "diamondShapes": "Oval, Pear, Round brilliant",
    "centreStone": "Round brilliant 15.74ct · RB 3.9",
    "biancaProductCode": "BD-K-NK-017"
  }
} as const;

export const EARRING_QUOTES: Record<string, ParurePieceQuote> = {} as const;

/** Kira workbook earring styles (NLE…) — used to pair with mapped necklaces */
export const EARRING_STYLE_QUOTES: Record<string, ParurePieceQuote> = {
  "NLE00630": {
    "styleCode": "NLE00630",
    "priceInr": 76211,
    "metal": "18K yellow gold",
    "metalNetWeightG": 3.258,
    "metalPueWeightG": 2.476,
    "diamondTotalCarat": 3.237,
    "diamondPieces": 10,
    "diamondShapes": "Marquise, Oval, Round brilliant",
    "centreStone": "Oval 1.377ct · OV 5.5X3.85"
  },
  "NLE00418": {
    "styleCode": "NLE00418",
    "priceInr": 872447,
    "metal": "18K yellow gold",
    "metalNetWeightG": 33.424,
    "metalPueWeightG": 25.402,
    "diamondTotalCarat": 40.01,
    "diamondPieces": 80,
    "diamondShapes": "Marquise, Pear, Round brilliant",
    "centreStone": "Marquise 6.39ct · MQ 8.7x4.4"
  },
  "NLE00083": {
    "styleCode": "NLE00083",
    "priceInr": 432057,
    "metal": "18K yellow gold",
    "metalNetWeightG": 16.022,
    "metalPueWeightG": 12.177,
    "diamondTotalCarat": 21.12,
    "diamondPieces": 54,
    "diamondShapes": "Marquise, Oval, Pear, Round brilliant",
    "centreStone": "Round brilliant 5.75ct · RB 4.7"
  },
  "NLE00260": {
    "styleCode": "NLE00260",
    "priceInr": 815031,
    "metal": "18K yellow gold",
    "metalNetWeightG": 32.436,
    "metalPueWeightG": 24.651,
    "diamondTotalCarat": 35.05,
    "diamondPieces": 148,
    "diamondShapes": "Emerald cut, Oval, Pear, Round brilliant",
    "centreStone": "Pear 10.04ct · PE 6.3x3.9"
  },
  "NLE00428": {
    "styleCode": "NLE00428",
    "priceInr": 824557,
    "metal": "18K yellow gold",
    "metalNetWeightG": 44.105,
    "metalPueWeightG": 33.52,
    "diamondTotalCarat": 22.58,
    "diamondPieces": 156,
    "diamondShapes": "Marquise, Pear, Round brilliant",
    "centreStone": "Marquise 9.16ct · MQ 7.0x3.5"
  },
  "NLE00208": {
    "styleCode": "NLE00208",
    "priceInr": 362005,
    "metal": "18K yellow gold",
    "metalNetWeightG": 13.758,
    "metalPueWeightG": 10.456,
    "diamondTotalCarat": 16.96,
    "diamondPieces": 38,
    "diamondShapes": "Marquise, Pear, Round brilliant",
    "centreStone": "Marquise 5.45ct · MQ 7.8x4.0"
  },
  "NLE00456": {
    "styleCode": "NLE00456",
    "priceInr": 78734,
    "metal": "18K yellow gold",
    "metalNetWeightG": 4,
    "metalPueWeightG": 3.04,
    "diamondTotalCarat": 2.663,
    "diamondPieces": 8,
    "diamondShapes": "Oval, Pear, Round brilliant",
    "centreStone": "Pear 1.0ct · PE 6.80X4.30"
  },
  "NLE00616": {
    "styleCode": "NLE00616",
    "priceInr": 66400,
    "metal": "18K yellow gold",
    "metalNetWeightG": 3.5,
    "metalPueWeightG": 2.66,
    "diamondTotalCarat": 2.49,
    "diamondPieces": 64,
    "diamondShapes": "Pear, Round brilliant",
    "centreStone": "Pear 0.84ct · PE 6.2x4.0"
  }
} as const;

/** NL00428 → NLE00428 for parure pairing */
export function earringStyleForNecklaceStyle(necklaceStyle: string): string | null {
  if (!necklaceStyle.startsWith("NL") || necklaceStyle.startsWith("NLE")) return null;
  return `NLE${necklaceStyle.slice(2)}`;
}

export function formatParurePriceInr(priceInr: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInr);
}

function withNecklaceMarkup(base: ParurePieceQuote): ParurePieceQuote {
  return { ...base, priceInr: base.priceInr + NECKLACE_SALON_MARKUP_INR };
}

function withEarringMarkup(base: ParurePieceQuote): ParurePieceQuote {
  return { ...base, priceInr: base.priceInr + EARRING_SALON_MARKUP_INR };
}

export function getNecklaceQuote(productCode: string): ParurePieceQuote | undefined {
  const base = NECKLACE_QUOTES[productCode];
  return base ? withNecklaceMarkup(base) : undefined;
}

export function getEarringQuote(productCode: string): ParurePieceQuote | undefined {
  const base = EARRING_QUOTES[productCode];
  return base ? withEarringMarkup(base) : undefined;
}

export function getEarringQuoteByStyle(styleCode: string): ParurePieceQuote | undefined {
  const base = EARRING_STYLE_QUOTES[styleCode];
  return base ? withEarringMarkup(base) : undefined;
}

export type ParureSalonQuotes = {
  suffix: string;
  necklace: ParurePieceQuote;
  earrings: ParurePieceQuote | null;
};

export function getParureQuotesForNecklace(productCode: string): ParureSalonQuotes | undefined {
  const necklace = getNecklaceQuote(productCode);
  if (!necklace) return undefined;
  const earringStyle = earringStyleForNecklaceStyle(necklace.styleCode);
  const earrings = earringStyle ? getEarringQuoteByStyle(earringStyle) ?? null : null;
  return { suffix: necklace.styleCode.slice(2), necklace, earrings };
}

export function getMatchingEarringQuote(necklaceProductCode: string): ParurePieceQuote | undefined {
  const necklace = getNecklaceQuote(necklaceProductCode);
  if (!necklace) return undefined;
  const earringStyle = earringStyleForNecklaceStyle(necklace.styleCode);
  return earringStyle ? getEarringQuoteByStyle(earringStyle) : undefined;
}
