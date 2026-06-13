export type ExchangeRatesResponse = {
  ok: boolean;
  base: string;
  date: string;
  updatedAt: string | null;
  rates: Record<string, number>;
  currencies: string[];
  attribution: {
    primary: string;
    aed: string;
  };
  stale?: boolean;
};

export const SALON_FOREIGN_CURRENCIES = ["USD", "EUR", "GBP", "AED"] as const;

const LOCALE_BY_CURRENCY: Record<(typeof SALON_FOREIGN_CURRENCIES)[number], string> = {
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "en-AE",
};

let clientCache: { data: ExchangeRatesResponse; fetchedAt: number } | null = null;
let inflight: Promise<ExchangeRatesResponse | null> | null = null;
const CLIENT_CACHE_MS = 30 * 60 * 1000;

async function fetchFromPublicProviders(): Promise<ExchangeRatesResponse> {
  const [frankfurterRes, aedRes] = await Promise.all([
    fetch("https://api.frankfurter.app/latest?from=INR&to=USD,EUR,GBP"),
    fetch("https://open.er-api.com/v6/latest/INR"),
  ]);

  if (!frankfurterRes.ok) {
    throw new Error(`frankfurter_http_${frankfurterRes.status}`);
  }

  const frankfurter = (await frankfurterRes.json()) as {
    date: string;
    rates: Record<string, number>;
  };

  let aedRate: number | undefined;
  let updatedAt: string | null = null;

  if (aedRes.ok) {
    const aedData = (await aedRes.json()) as {
      result?: string;
      rates?: Record<string, number>;
      time_last_update_utc?: string;
    };
    if (aedData.result === "success" && typeof aedData.rates?.AED === "number") {
      aedRate = aedData.rates.AED;
      updatedAt = aedData.time_last_update_utc ?? null;
    }
  }

  return {
    ok: true,
    base: "INR",
    date: frankfurter.date,
    updatedAt,
    rates: {
      ...frankfurter.rates,
      ...(aedRate ? { AED: aedRate } : {}),
    },
    currencies: [...SALON_FOREIGN_CURRENCIES],
    attribution: {
      primary: "European Central Bank reference rates (Frankfurter)",
      aed: "ExchangeRate-API (open.er-api.com)",
    },
  };
}

async function fetchFromSalonApi(): Promise<ExchangeRatesResponse | null> {
  const response = await fetch("/api/exchange-rates");
  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.includes("application/json")) {
    return null;
  }

  const data = (await response.json()) as ExchangeRatesResponse;
  return data.ok ? data : null;
}

export async function fetchExchangeRates(): Promise<ExchangeRatesResponse | null> {
  if (clientCache && Date.now() - clientCache.fetchedAt < CLIENT_CACHE_MS) {
    return clientCache.data;
  }

  if (inflight) return inflight;

  inflight = (async () => {
    try {
      const fromApi = await fetchFromSalonApi();
      if (fromApi) {
        clientCache = { data: fromApi, fetchedAt: Date.now() };
        return fromApi;
      }
    } catch {
      // fall through to public providers
    }

    try {
      const fromProviders = await fetchFromPublicProviders();
      clientCache = { data: fromProviders, fetchedAt: Date.now() };
      return fromProviders;
    } catch {
      return clientCache?.data ?? null;
    } finally {
      inflight = null;
    }
  })();

  return inflight;
}

export function convertInrToForeign(priceInr: number, rate: number): number {
  return Math.round(priceInr * rate);
}

export function formatForeignPrice(
  amount: number,
  currency: (typeof SALON_FOREIGN_CURRENCIES)[number],
): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildSalonCurrencyEquivalents(
  priceInr: number,
  rates: Record<string, number>,
): { currency: (typeof SALON_FOREIGN_CURRENCIES)[number]; label: string }[] {
  return SALON_FOREIGN_CURRENCIES.flatMap((currency) => {
    const rate = rates[currency];
    if (!rate) return [];
    const converted = convertInrToForeign(priceInr, rate);
    return [{ currency, label: formatForeignPrice(converted, currency) }];
  });
}

export function formatRatesDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}
