import { getRingQuote } from "../data/ringQuotes";
import { buildCustomerRingDetails } from "../lib/ringQuoteCopy";

type Props = {
  productCode: string;
  /** Salon lightbox — full customer-facing detail when a piece is opened */
  variant?: "salon" | "teaser";
};

export default function AtelierPieceQuote({
  productCode,
  variant = "salon",
}: Props) {
  const quote = getRingQuote(productCode);
  if (!quote) return null;

  const details = buildCustomerRingDetails(quote);

  if (variant === "teaser") {
    return (
      <p className="mt-3 font-editorial text-base tabular-nums text-bianca-forest">
        From {details.priceLabel}
      </p>
    );
  }

  return null;
}
