import { ATELIER_PIECES, type AtelierPiece } from "../data/fineJewelleryCollections";
import { fineJewelleryCategoryPath } from "../data/fineJewelleryMegaMenu";
import { BIANCA_PUBLIC_ORIGIN } from "./atelierEnquiry";

export const ATELIER_PIECE_PARAM = "piece";

/** Resolve a salon piece from a URL id or product code. */
export function findAtelierPiece(ref: string | null | undefined): AtelierPiece | undefined {
  const key = ref?.trim().toLowerCase();
  if (!key) return undefined;
  return ATELIER_PIECES.find(
    (piece) =>
      piece.id.toLowerCase() === key ||
      piece.productCode.toLowerCase() === key,
  );
}

/** Canonical path for ads and guest sharing — category page + piece id. */
export function atelierPieceSharePath(piece: AtelierPiece): string {
  const params = new URLSearchParams();
  params.set(ATELIER_PIECE_PARAM, piece.id);
  return `${fineJewelleryCategoryPath(piece.category)}?${params.toString()}`;
}

export function atelierPieceShareUrl(
  piece: AtelierPiece,
  origin: string = typeof window !== "undefined"
    ? window.location.origin
    : BIANCA_PUBLIC_ORIGIN,
): string {
  return `${origin}${atelierPieceSharePath(piece)}`;
}

export async function copyTextToClipboard(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const el = document.createElement("textarea");
      el.value = value;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      const ok = document.execCommand("copy");
      el.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
