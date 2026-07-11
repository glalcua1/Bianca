import {
  ATELIER_PIECES,
  type AtelierPiece,
} from "./fineJewelleryCollections";

export const BLUE_DIAMOND_PDF_PATH =
  "/BlueDiamond/Blue-Star-Collection.pdf";

export const BLUE_DIAMOND_RING_IMAGE =
  "/BlueDiamond/blue-star-ring.jpg";

/** Blue Star atelier rings — resolved from the main catalogue. */
export const BLUE_STAR_RING_IDS = [
  "ring-blue-pear-pave",
  "ring-blue-emerald-horizon",
  "ring-blue-emerald-trilogy",
  "ring-blue-emerald-solitaire",
  "ring-blue-radiant-solitaire",
  "ring-blue-oval-solitaire",
] as const;

/** Blue Star earrings shown in the View collection drawer. */
export const BLUE_STAR_EARRING_PIECES: AtelierPiece[] = [
  {
    id: "ear-blue-star-vine-drop",
    category: "earrings",
    productCode: "BD-K-ER-BL-001",
    image: "/Earrings/ER6.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Blue Star Vine Drop — pear and round blue diamond halo earrings in rose gold",
    title: "Blue Star Vine Drop",
    description:
      "Round and pear blue diamonds in diamond halos, linked by a rose-gold vine — soft colour and botanical movement for the Blue Star edit.",
  },
  {
    id: "ear-blue-star-chandelier",
    category: "earrings",
    productCode: "BD-K-ER-BL-002",
    image: "/Earrings/ER8.jpg",
    imageWellColor: "#d6d6d4",
    alt: "Blue Star Chandelier — emerald-cut blue diamond chandelier earrings in rose gold",
    title: "Blue Star Chandelier",
    description:
      "An emerald-cut blue diamond drop beneath cascading rose-gold strands and a floral blue-and-white diamond crest — gala-scale Blue Star brilliance.",
  },
];

export const BLUE_DIAMOND_CARD = {
  id: "blue-diamond",
  eyebrow: "Exclusive · Blue Star",
  title: "Blue Diamonds",
  description:
    "Blue diamonds are among the most mesmerizing and coveted gemstones in the world, prized for both their rarity and their extraordinary depth of color — ranging from delicate sky-blue hues to deep, saturated tones. Bianca holds them exclusively.",
  storyCta: "Read about the Blue Star Story",
  collectionCta: "View collection",
  image: BLUE_DIAMOND_RING_IMAGE,
  imageAlt:
    "Bianca Blue Star — emerald-cut lab-grown blue diamond ring in white gold",
  imageClassName: "object-contain object-center p-8 md:p-12",
  imageWellColor: "#0a1628",
  pdfSrc: BLUE_DIAMOND_PDF_PATH,
} as const;

export function getBlueStarCollectionPieces(): AtelierPiece[] {
  const byId = new Map(ATELIER_PIECES.map((piece) => [piece.id, piece]));
  const rings = BLUE_STAR_RING_IDS.map((id) => byId.get(id)).filter(
    (piece): piece is AtelierPiece => Boolean(piece),
  );
  return [...rings, ...BLUE_STAR_EARRING_PIECES];
}
