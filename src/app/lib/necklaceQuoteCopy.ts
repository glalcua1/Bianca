import type { ParurePieceQuote } from "../data/necklaceQuotes";
import { formatParurePriceInr } from "../data/necklaceQuotes";
import { formatGoldKarat } from "./ringQuoteCopy";

function formatCaratWeight(carat: number): string {
  if (carat === 1) return "1 carat";
  return `${carat} carats`;
}

function formatDiamondPieces(count: number): string {
  return count === 1 ? "1 stone" : `${count} stones`;
}

function formatDiamondShapes(shapes: string): string {
  if (!shapes) return "IGI-certified lab-grown diamonds";
  return `${shapes} · IGI-certified lab-grown diamonds`;
}

function formatDiamondsDetail(pieces: number, shapes: string): string {
  return `${formatDiamondPieces(pieces)}, ${formatDiamondShapes(shapes)}`;
}

function formatCentrePiece(centre: string): string {
  return centre.replace(/(\d+\.?\d*)ct/gi, "$1 carat");
}

export type CustomerParureDetails = {
  pieceLabel: string;
  biancaCode: string | null;
  priceLabel: string;
  reference: string;
  goldWeightLine: string;
  goldKaratLine: string;
  diamondsTotalLabel: string;
  diamondsTotalLine: string;
  diamondsPiecesLine: string;
  centrePieceLabel: string | null;
  centrePieceLine: string | null;
  priceGstNote: string;
};

export function buildCustomerParureDetails(
  quote: ParurePieceQuote,
  pieceLabel: "Necklace" | "Earrings",
  biancaCode: string | null = quote.biancaProductCode ?? null,
): CustomerParureDetails {
  const priceLabel = formatParurePriceInr(quote.priceInr);
  const reference = quote.styleCode;
  const goldWeightLine = `${quote.metalNetWeightG} g`;
  const goldKaratLine = formatGoldKarat(quote.metal);
  const diamondsTotalLine = formatCaratWeight(quote.diamondTotalCarat);
  const diamondsPiecesLine = formatDiamondsDetail(
    quote.diamondPieces,
    quote.diamondShapes,
  );
  const centrePieceLine =
    quote.centreStone && quote.diamondPieces > 1
      ? formatCentrePiece(quote.centreStone)
      : null;

  return {
    pieceLabel,
    biancaCode,
    priceLabel,
    reference,
    goldWeightLine,
    goldKaratLine,
    diamondsTotalLabel: "Diamonds total",
    diamondsTotalLine,
    diamondsPiecesLine,
    centrePieceLabel: centrePieceLine ? "Centre stone" : null,
    centrePieceLine,
    priceGstNote: "GST 3% extra · not included in price",
  };
}

export function parureTeaserPriceLabel(
  necklace: ParurePieceQuote,
  earrings: ParurePieceQuote | null,
): string {
  const total = necklace.priceInr + (earrings?.priceInr ?? 0);
  return formatParurePriceInr(total);
}
