import {
  ATELIER_PIECES,
  FINE_JEWELLERY_CATEGORIES,
  sortAtelierPiecesByWell,
  type AtelierPiece,
  type JewelleryCategoryId,
} from "./fineJewelleryCollections";

export type MegaMenuCategoryId = JewelleryCategoryId | "all";

export const FINE_JEWELLERY_EDITORIAL = {
  eyebrow: "Fine Jewelry",
  title: "Certified brilliance, atelier composed",
  description:
    "IGI-graded lab-grown diamonds in BIS hallmarked gold — rings, earrings, necklaces, and wrist pieces crafted for everyday radiance and life's grandest chapters.",
};

/** Crawlable path for a fine-jewellery category (or the atelier overview). */
export function fineJewelleryCategoryPath(
  categoryId: MegaMenuCategoryId,
): string {
  if (categoryId === "all") return "/fine-jewellery";
  return `/fine-jewellery/${categoryId}`;
}

/** Categories that have at least one piece in the atelier catalogue. */
export function getFunctionalCategories() {
  return FINE_JEWELLERY_CATEGORIES.filter((category) =>
    ATELIER_PIECES.some((piece) => piece.category === category.id),
  );
}

export function getMegaMenuCategories() {
  const functional = getFunctionalCategories();
  if (functional.length <= 1) return functional;

  return [
    {
      id: "all" as const,
      title: "All Pieces",
      description: FINE_JEWELLERY_EDITORIAL.description,
      href: "/fine-jewellery",
    },
    ...functional.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      href: fineJewelleryCategoryPath(category.id),
    })),
  ];
}

export function previewPiecesForCategory(
  categoryId: MegaMenuCategoryId,
  count = 4,
): AtelierPiece[] {
  if (categoryId === "all") {
    const order: JewelleryCategoryId[] = [
      "rings",
      "earrings",
      "necklaces",
      "bracelets",
      "pendants",
      "for-him",
    ];
    const picked: AtelierPiece[] = [];
    for (const id of order) {
      if (picked.length >= count) break;
      const piece = sortAtelierPiecesByWell(
        ATELIER_PIECES.filter((p) => p.category === id),
      )[0];
      if (piece) picked.push(piece);
    }
    return picked.slice(0, count);
  }

  return sortAtelierPiecesByWell(
    ATELIER_PIECES.filter((piece) => piece.category === categoryId),
  ).slice(0, count);
}

export function megaMenuPieceWell(piece: AtelierPiece): string {
  if (piece.imageWellColor) return piece.imageWellColor;
  if (piece.category === "necklaces") return "#0a0a0a";
  return "#f4f0e6";
}

function resolveCategoryId(id: string): MegaMenuCategoryId {
  const normalized = id.trim().toLowerCase();
  if (!normalized || normalized === "collections" || normalized === "all") {
    return "all";
  }
  if (normalized === "cannes-2026") return "all";

  const functional = getFunctionalCategories();
  if (functional.some((category) => category.id === normalized)) {
    return normalized as JewelleryCategoryId;
  }
  return "all";
}

export function parseFineJewelleryCategoryFromPath(
  pathname: string,
): MegaMenuCategoryId {
  const match = pathname.match(/^\/fine-jewellery(?:\/([^/]+))?\/?$/i);
  if (!match) return "all";
  return resolveCategoryId(match[1] ?? "");
}

export function parseFineJewelleryCategoryFromHash(
  hash: string,
): MegaMenuCategoryId {
  return resolveCategoryId(hash.replace(/^#/, ""));
}
