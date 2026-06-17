import {
  buildSalonCurrencyEquivalents,
  formatRatesDate,
} from "../lib/exchangeRates";
import { useExchangeRates } from "../hooks/useExchangeRates";

type Props = {
  priceInr: number;
};

export default function AtelierSalonCurrency({ priceInr }: Props) {
  const ratesState = useExchangeRates(true);

  if (ratesState.status === "loading") {
    return (
      <div className="mt-2 text-right">
        <p className="text-[8px] uppercase tracking-[0.14em] text-on-cream-muted">
          Indicative equivalents
        </p>
        <p className="mt-1 text-[9px] tracking-[0.06em] text-on-cream-muted normal-case">
          Loading live rates…
        </p>
      </div>
    );
  }

  if (ratesState.status === "error") {
    return (
      <div className="mt-2 text-right">
        <p className="text-[8px] uppercase tracking-[0.14em] text-on-cream-muted">
          Indicative equivalents
        </p>
        <p className="mt-1 text-[9px] tracking-[0.06em] text-on-cream-muted normal-case">
          Rates temporarily unavailable
        </p>
      </div>
    );
  }

  const equivalents = buildSalonCurrencyEquivalents(
    priceInr,
    ratesState.data.rates,
  );
  if (equivalents.length === 0) {
    return (
      <div className="mt-2 text-right">
        <p className="text-[8px] uppercase tracking-[0.14em] text-on-cream-muted">
          Indicative equivalents
        </p>
        <p className="mt-1 text-[9px] tracking-[0.06em] text-on-cream-muted normal-case">
          Rates temporarily unavailable
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 text-right">
      <p className="text-[8px] uppercase tracking-[0.14em] text-on-cream-muted">
        Indicative equivalents
      </p>
      <p className="mt-1 font-editorial text-[0.8125rem] leading-snug tracking-[0.02em] text-bianca-forest/85">
        {equivalents.map((item, index) => (
          <span key={item.currency}>
            {index > 0 ? (
              <span className="mx-1.5 text-[#766d42]/30" aria-hidden>
                ·
              </span>
            ) : null}
            <span className="tabular-nums">{item.label}</span>
          </span>
        ))}
      </p>
      <p className="mt-1 text-[7px] leading-relaxed tracking-[0.04em] text-on-cream-muted normal-case">
        ECB reference rates · {formatRatesDate(ratesState.data.date)}
      </p>
    </div>
  );
}
