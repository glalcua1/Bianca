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

function searchWithoutPiece(search: string): URLSearchParams {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  params.delete(ATELIER_PIECE_PARAM);
  return params;
}

function withSearch(path: string, params: URLSearchParams): string {
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/** Stable comparison key — ignores trailing slash and legacy ?piece=. */
export function atelierHrefKey(pathnameOrHref: string, search = ""): string {
  let pathname = pathnameOrHref;
  let qs = search;
  const queryAt = pathnameOrHref.indexOf("?");
  if (queryAt >= 0 && !search) {
    pathname = pathnameOrHref.slice(0, queryAt);
    qs = pathnameOrHref.slice(queryAt);
  }
  const path = pathname.replace(/\/$/, "") || "/";
  return withSearch(path, searchWithoutPiece(qs));
}

/** Path segment after /fine-jewellery/{category}/… */
export function parseAtelierPieceRefFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/fine-jewellery\/[^/]+\/([^/]+)\/?$/i);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function parseAtelierPieceRefFromHash(hash: string): string | null {
  const raw = hash.replace(/^#/, "").trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  if (lower === "showcase" || lower === "collections" || lower === "all") {
    return null;
  }
  if (lower.startsWith(`${ATELIER_PIECE_PARAM}=`)) {
    return raw.slice(ATELIER_PIECE_PARAM.length + 1);
  }
  return findAtelierPiece(raw) ? raw : null;
}

/** Resolve a salon piece from path, ?piece=, or #piece= / piece id hash. */
export function resolveAtelierPieceFromLocation(
  pathname: string,
  search: string,
  hash = "",
): AtelierPiece | undefined {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  return (
    findAtelierPiece(parseAtelierPieceRefFromPath(pathname)) ??
    findAtelierPiece(params.get(ATELIER_PIECE_PARAM)) ??
    findAtelierPiece(parseAtelierPieceRefFromHash(hash))
  );
}

/** Canonical path for ads and guest sharing — category page + piece id. */
export function atelierPieceSharePath(piece: AtelierPiece): string {
  return `${fineJewelleryCategoryPath(piece.category)}/${encodeURIComponent(piece.id)}`;
}

/** In-app href that keeps search/UTM params and drops legacy ?piece=. */
export function atelierPieceHref(piece: AtelierPiece, search = ""): string {
  return withSearch(atelierPieceSharePath(piece), searchWithoutPiece(search));
}

export function atelierCategoryHref(
  category: Parameters<typeof fineJewelleryCategoryPath>[0],
  search = "",
): string {
  return withSearch(fineJewelleryCategoryPath(category), searchWithoutPiece(search));
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
