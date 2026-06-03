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

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export async function fetchAtelierPieceImageFile(
  piece: AtelierPiece,
  origin: string,
): Promise<File | null> {
  const imageUrl = absoluteAtelierImageUrl(piece.image, origin);
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const blob = await response.blob();
    const extension =
      piece.image.split(".").pop()?.split(/[?#]/)[0]?.toLowerCase() ?? "jpg";
    return new File([blob], `${piece.productCode}.${extension}`, {
      type: blob.type || "image/jpeg",
    });
  } catch {
    return null;
  }
}

/**
 * Opens WhatsApp to the Bianca line with piece details.
 * On touch devices, shares the product image file with the enquiry text when supported;
 * always opens wa.me so the chat targets +91 81304 95257.
 */
export async function openAtelierPiecePriceEnquiry(
  piece: AtelierPiece,
  sourcePage = "fine-jewellery",
): Promise<void> {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : BIANCA_PUBLIC_ORIGIN;
  const text = buildAtelierPiecePriceWhatsAppMessage(piece, { origin, sourcePage });
  const url = buildAtelierPiecePriceWhatsAppUrl(piece, { origin, sourcePage });

  const file = await fetchAtelierPieceImageFile(piece, origin);
  const canUseShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    isTouchDevice();

  window.open(url, "_blank", "noopener,noreferrer");

  if (canUseShare && file) {
    const shareData: ShareData = {
      title: `Bianca Diamonds — ${piece.title}`,
      text: `Reference image — ${piece.title} (${piece.productCode})\n\n${text}`,
      files: [file],
    };

    try {
      if (!navigator.canShare || navigator.canShare(shareData)) {
        await new Promise((resolve) => window.setTimeout(resolve, 500));
        await navigator.share(shareData);
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
    }
  }
}
