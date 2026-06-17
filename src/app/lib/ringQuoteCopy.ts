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

function parseCaratFromCentre(centre: string): number | null {
  const match = centre.match(/(\d+\.?\d*)\s*ct\b/i);
  return match ? Number(match[1]) : null;
}

/** Centre stone is a coloured gemstone (not a graded diamond line from the workbook). */
function isGemstoneCentreRing(quote: RingQuote): boolean {
  if (!quote.colourStones?.length || !quote.centreStone) return false;
  return !/\+VS|\bVS1\b|\bVVS\b|\bSI\d/i.test(quote.centreStone);
}

function formatGemstoneCentre(centre: string): { weightLine: string; detailLine: string } {
  const parts = centre.split("·").map((p) => p.trim());
  const carat = parseCaratFromCentre(centre);
  const weightLine = carat ? formatCaratWeight(carat) : formatCentrePiece(centre);
  const shape = parts[0]?.replace(/(\d+\.?\d*)\s*ct\s*/i, "").trim() ?? "";
  const gemName = parts[1] ?? "";
  const detailLine = gemName
    ? `${shape} · ${gemName}`.replace(/(\d+\.?\d*)ct/gi, "$1 carat")
    : formatCentrePiece(centre);
  return { weightLine, detailLine };
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
  diamondsTotalLabel: string;
  diamondsTotalLine: string;
  diamondsPiecesLine: string;
  centrePieceLabel: string | null;
  centrePieceLine: string | null;
  centrePieceDetail: string | null;
  priceGstNote: string;
};

export function buildCustomerRingDetails(quote: RingQuote): CustomerRingDetails {
  const priceLabel = formatRingPriceInr(quote.priceInr);
  const reference = quote.styleCode;

  const goldWeightLine = `${quote.metalNetWeightG} g`;
  const goldKaratLine = formatGoldKarat(quote.metal);

  if (isGemstoneCentreRing(quote) && quote.centreStone) {
    const gemstone = formatGemstoneCentre(quote.centreStone);
    const hasAccentDiamonds = quote.diamondTotalCarat > 0 && quote.diamondPieces > 0;

    return {
      priceLabel,
      reference,
      goldWeightLine,
      goldKaratLine,
      diamondsTotalLabel: "Centre stone",
      diamondsTotalLine: gemstone.weightLine,
      diamondsPiecesLine: gemstone.detailLine,
      centrePieceLabel: hasAccentDiamonds ? "Accent diamonds" : null,
      centrePieceLine: hasAccentDiamonds
        ? formatCaratWeight(quote.diamondTotalCarat)
        : null,
      centrePieceDetail: hasAccentDiamonds
        ? formatDiamondsDetail(
            quote.diamondPieces,
            quote.diamondClarity,
            quote.diamondColor,
          )
        : null,
      priceGstNote: "GST 3% extra · not included in price",
    };
  }

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
    diamondsTotalLabel: "Diamonds total",
    diamondsTotalLine,
    diamondsPiecesLine,
    centrePieceLabel: centrePieceLine ? "Centre piece" : null,
    centrePieceLine,
    centrePieceDetail: null,
    priceGstNote: "GST 3% extra · not included in price",
  };
}
