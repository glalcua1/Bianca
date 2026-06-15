import { getRingQuote, formatRingPriceInr } from "../data/ringQuotes";
import {
  getEarringQuote,
  getParureQuotesForNecklace,
} from "../data/necklaceQuotes";
import { buildCustomerRingDetails } from "../lib/ringQuoteCopy";
import { parureTeaserPriceLabel } from "../lib/necklaceQuoteCopy";
import type { AtelierPiece } from "../data/fineJewelleryCollections";

type Props = {
  piece: AtelierPiece;
  /** Salon lightbox — full customer-facing detail when a piece is opened */
  variant?: "salon" | "teaser";
  /** Fixed guide price when not in Excel catalogue */
  priceInr?: number;
};

export default function AtelierPieceQuote({
  piece,
  variant = "salon",
  priceInr: fixedPriceInr,
}: Props) {
  const ringQuote =
    piece.category === "rings" ? getRingQuote(piece.productCode) : undefined;
  const parureQuotes =
    piece.category === "necklaces"
      ? getParureQuotesForNecklace(piece.productCode)
      : undefined;
  const earringQuote =
    piece.category === "earrings"
      ? getEarringQuote(piece.productCode)
      : undefined;

  const priceInr =
    ringQuote?.priceInr ??
    (parureQuotes
      ? parureQuotes.necklace.priceInr + (parureQuotes.earrings?.priceInr ?? 0)
      : undefined) ??
    earringQuote?.priceInr ??
    fixedPriceInr;

  if (!priceInr) return null;

  const priceLabel = ringQuote
    ? buildCustomerRingDetails(ringQuote).priceLabel
    : parureQuotes
      ? parureTeaserPriceLabel(parureQuotes.necklace, parureQuotes.earrings)
      : formatRingPriceInr(priceInr);

  if (variant === "teaser") {
    const parureHint =
      parureQuotes?.earrings && piece.category === "necklaces"
        ? " · parure guide"
        : "";

    return (
      <p className="mt-3 font-editorial text-base tabular-nums text-bianca-forest">
        From {priceLabel}
        {parureQuotes?.earrings ? (
          <span className="mt-1 block text-[10px] font-sans uppercase tracking-[0.14em] text-on-cream-muted">
            Necklace & earrings{parureHint}
          </span>
        ) : null}
      </p>
    );
  }

  return null;
}
