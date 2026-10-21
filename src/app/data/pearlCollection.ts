import {
  ATELIER_PIECES,
  type AtelierPiece,
} from "./fineJewelleryCollections";

/** Pearl Collection suites resolved from the atelier catalogue for homepage + drawer. */
export const PEARL_COLLECTION_PIECE_IDS = [
  "neck-pearl-four-strand-sapphire-choker",
  "neck-pearl-triple-strand-sapphire",
  "neck-pearl-emerald-cut-sapphire",
  "neck-pearl-triple-strand-stud-set",
  "brace-pearl-sapphire-double-strand",
] as const;

export function getPearlCollectionPieces(): AtelierPiece[] {
  const byId = new Map(ATELIER_PIECES.map((piece) => [piece.id, piece]));
  return PEARL_COLLECTION_PIECE_IDS.map((id) => byId.get(id)).filter(
    (piece): piece is AtelierPiece => Boolean(piece),
  );
}

export const PEARL_COLLECTION_CARD = {
  id: "pearl-collection",
  eyebrow: "The House · Pearl",
  title: "Pearl Collection",
  description:
    "All pearls are certified. Each suite can be composed in coloured gemstones or certified lab-grown diamonds — luminous strands and maison-set centres for day-to-evening light.",
  collectionCta: "View collection",
  atelierCta: "Explore fine jewellery",
  atelierTo: "/fine-jewellery",
  image:
    "/bianca-pearl-collection/bianca-diamonds-four-strand-pearl-sapphire-choker-earrings.png",
  imageAlt:
    "Pearl Sapphire Choker Suite — four-strand certified pearl choker with oval sapphire diamond halo and matching pearl drop earrings",
  imageClassName: "object-contain object-center p-3 sm:p-4 md:p-5 lg:p-6",
  imageWellColor: "#cdcdd3",
} as const;
