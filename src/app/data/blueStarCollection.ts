import {
  ATELIER_PIECES,
  type AtelierPiece,
} from "./fineJewelleryCollections";
import { BLUE_STAR_EARRING_PIECES, BLUE_STAR_RING_IDS } from "./blueDiamond";

/** Resolve Blue Star rings from the atelier catalogue — drawer-only import. */
export function getBlueStarCollectionPieces(): AtelierPiece[] {
  const byId = new Map(ATELIER_PIECES.map((piece) => [piece.id, piece]));
  const rings = BLUE_STAR_RING_IDS.map((id) => byId.get(id)).filter(
    (piece): piece is AtelierPiece => Boolean(piece),
  );
  return [...rings, ...BLUE_STAR_EARRING_PIECES];
}
