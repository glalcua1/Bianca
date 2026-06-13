import type { RingQuote } from "../data/ringQuotes";
import { formatRingPriceInr } from "../data/ringQuotes";

function formatCaratWeight(carat: number): string {
  if (carat === 1) return "1 carat";
  return `${carat} carats`;
}

function formatDiamondPieces(count: number): string {
  return count === 1 ? "1 stone" : `${count} stones`;
}

function formatClarity(clarity: string): string {
  return clarity
    .replace(/\+VS/g, "VS+")
    .replace(/\+/g, "")
    .replace(/\s*\/\s*/g, " and ");
}

function formatColour(color: string): string {
  if (color === "EF") return "near-colourless (E–F)";
  if (color === "E") return "near-colourless (E)";
  return color.replace(/\s*\/\s*/g, " and ");
}

function formatDiamondGrading(clarity: string, color: string): string {
  return `all diamonds in ${formatClarity(clarity)} clarity, ${formatColour(color)} colour`;
}

function parseCentreStoneGrading(centre: string): {
  clarity: string;
  colour: string;
} | null {
  const parts = centre.split("·").map((p) => p.trim());
  const clarity = parts.find((p) => /VS|VVS|SI/i.test(p));
  const colour = parts.find((p) => /^[EF]/i.test(p) && !/VS|VVS|SI/i.test(p));
  if (!clarity && !colour) return null;
  return {
    clarity: clarity ? formatClarity(clarity) : "",
    colour: colour ? formatColour(colour) : "",
  };
}

function formatCentrePiece(centre: string): string {
  const shapeAndWeight = centre.split("·")[0]?.trim() ?? centre;
  const base = shapeAndWeight.replace(/(\d+\.?\d*)ct/gi, "$1 carat");
  const grading = parseCentreStoneGrading(centre);
  if (!grading) return base;

  const gradingParts = [
    grading.clarity ? `${grading.clarity} clarity` : "",
    grading.colour ? `${grading.colour} colour` : "",
  ].filter(Boolean);

  return gradingParts.length > 0 ? `${base}, ${gradingParts.join(", ")}` : base;
}

function formatDiamondsDetail(
  pieces: number,
  clarity: string,
  color: string,
): string {
  return `${formatDiamondPieces(pieces)}, ${formatDiamondGrading(clarity, color)}`;
}

/** e.g. "18K yellow gold" → "18KT yellow gold" */
export function formatGoldKarat(metal: string): string {
  const karat = metal.match(/\b(14|18)\s*K\b/i)?.[1];
  if (!karat) return metal;
  const tone = metal.replace(/\b(14|18)\s*K\s*/i, "").trim();
  return tone ? `${karat}KT ${tone}` : `${karat}KT`;
}

export type CustomerRingDetails = {
  priceLabel: string;
  reference: string;
  goldWeightLine: string;
  goldKaratLine: string;
  diamondsTotalLine: string;
  diamondsPiecesLine: string;
  centrePieceLine: string | null;
  priceGstNote: string;
};

export function buildCustomerRingDetails(quote: RingQuote): CustomerRingDetails {
  const priceLabel = formatRingPriceInr(quote.priceInr);
  const reference = quote.styleCode;

  const goldWeightLine = `${quote.metalNetWeightG} g`;
  const goldKaratLine = formatGoldKarat(quote.metal);
  const diamondsTotalLine = formatCaratWeight(quote.diamondTotalCarat);
  const diamondsPiecesLine = formatDiamondsDetail(
    quote.diamondPieces,
    quote.diamondClarity,
    quote.diamondColor,
  );

  const centrePieceLine =
    quote.centreStone && quote.diamondPieces > 1
      ? formatCentrePiece(quote.centreStone)
      : null;

  return {
    priceLabel,
    reference,
    goldWeightLine,
    goldKaratLine,
    diamondsTotalLine,
    diamondsPiecesLine,
    centrePieceLine,
    priceGstNote: "GST 3% extra · not included in price",
  };
}
