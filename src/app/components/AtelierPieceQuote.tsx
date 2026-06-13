import { getRingQuote, formatRingPriceInr } from "../data/ringQuotes";
import { buildCustomerRingDetails } from "../lib/ringQuoteCopy";

type Props = {
  productCode: string;
  /** Salon lightbox — full customer-facing detail when a piece is opened */
  variant?: "salon" | "teaser";
  /** Fixed guide price when not in Excel catalogue */
  priceInr?: number;
};

export default function AtelierPieceQuote({
  productCode,
  variant = "salon",
  priceInr: fixedPriceInr,
}: Props) {
  const quote = getRingQuote(productCode);
  const priceInr = quote?.priceInr ?? fixedPriceInr;
  if (!priceInr) return null;

  const priceLabel = quote
    ? buildCustomerRingDetails(quote).priceLabel
    : formatRingPriceInr(priceInr);

  if (variant === "teaser") {
    return (
      <p className="mt-3 font-editorial text-base tabular-nums text-bianca-forest">
        From {priceLabel}
      </p>
    );
  }

  return null;
}
