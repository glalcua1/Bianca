import {
  atelierPieceEyebrow,
  type AtelierPiece,
} from "../data/fineJewelleryCollections";
import { BIANCA_WHATSAPP_NUMBER } from "../data/siteContact";

/** Canonical origin for image links in WhatsApp (previews when deployed). */
export const BIANCA_PUBLIC_ORIGIN = "https://biancadiamonds.com";

export function absoluteAtelierImageUrl(
  imagePath: string,
  origin: string = typeof window !== "undefined"
    ? window.location.origin
    : BIANCA_PUBLIC_ORIGIN,
): string {
  return new URL(imagePath, origin).href;
}

export function buildAtelierPiecePriceWhatsAppMessage(
  piece: AtelierPiece,
  options?: { origin?: string; sourcePage?: string },
): string {
  const origin =
    options?.origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : BIANCA_PUBLIC_ORIGIN);
  const imageUrl = absoluteAtelierImageUrl(piece.image, origin);
  const page = options?.sourcePage ?? "fine-jewellery";

  return [
    "Price enquiry — Bianca Diamonds",
    "",
    `Piece: ${piece.title}`,
    `Product code: ${piece.productCode}`,
    `Category: ${atelierPieceEyebrow(piece)}`,
    "",
    piece.description,
    "",
    `Reference image: ${imageUrl}`,
    "",
    `Page: ${page}`,
    "",
    "I would like to know the price and availability for this piece. Thank you.",
  ].join("\n");
}

export function buildAtelierPiecePriceWhatsAppUrl(
  piece: AtelierPiece,
  options?: { origin?: string; sourcePage?: string },
): string {
  const text = buildAtelierPiecePriceWhatsAppMessage(piece, options);
  return `https://wa.me/${BIANCA_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Opens WhatsApp to BIANCA_WHATSAPP_NUMBER with piece details and image URL.
 * Always uses wa.me so the chat targets the atelier line, not a generic share sheet.
 */
export async function openAtelierPiecePriceEnquiry(
  piece: AtelierPiece,
  sourcePage = "fine-jewellery",
): Promise<void> {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : BIANCA_PUBLIC_ORIGIN;
  const url = buildAtelierPiecePriceWhatsAppUrl(piece, { origin, sourcePage });
  window.open(url, "_blank", "noopener,noreferrer");
}
