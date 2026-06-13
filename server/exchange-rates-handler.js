/** Salon display currencies — major international markets for fine jewellery */
export const SALON_FOREIGN_CURRENCIES = ["USD", "EUR", "GBP", "AED"];

const FRANKFURTER_CURRENCIES = ["USD", "EUR", "GBP"];
const CACHE_TTL_MS = 60 * 60 * 1000;

let cache = {
  body: null,
  fetchedAt: 0,
};

async function fetchFrankfurterRates() {
  const symbols = FRANKFURTER_CURRENCIES.join(",");
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=INR&to=${symbols}`,
    { headers: { Accept: "application/json" } },
  );
  if (!response.ok) {
    throw new Error(`frankfurter_http_${response.status}`);
  }
  const data = await response.json();
  return {
    date: data.date,
    rates: data.rates ?? {},
    source: "European Central Bank reference rates (Frankfurter)",
  };
}

async function fetchAedRate() {
  const response = await fetch("https://open.er-api.com/v6/latest/INR", {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`er_api_http_${response.status}`);
  }
  const data = await response.json();
  if (data.result !== "success" || typeof data.rates?.AED !== "number") {
    throw new Error("er_api_aed_unavailable");
  }
  return {
    rate: data.rates.AED,
    updatedAt: data.time_last_update_utc ?? null,
    source: "ExchangeRate-API (open.er-api.com)",
  };
}

export async function handleExchangeRatesRequest() {
  const now = Date.now();
  if (cache.body && now - cache.fetchedAt < CACHE_TTL_MS) {
    return { status: 200, body: cache.body };
  }

  try {
    const [frankfurter, aed] = await Promise.all([
      fetchFrankfurterRates(),
      fetchAedRate(),
    ]);

    const rates = {
      ...frankfurter.rates,
      AED: aed.rate,
    };

    const body = {
      ok: true,
      base: "INR",
      date: frankfurter.date,
      updatedAt: aed.updatedAt,
      rates,
      currencies: SALON_FOREIGN_CURRENCIES,
      attribution: {
        primary: frankfurter.source,
        aed: aed.source,
      },
    };

    cache = { body, fetchedAt: now };
    return { status: 200, body };
  } catch (error) {
    if (cache.body) {
      return {
        status: 200,
        body: { ...cache.body, stale: true },
      };
    }

    return {
      status: 503,
      body: {
        ok: false,
        error: "rates_unavailable",
        message:
          error instanceof Error ? error.message : "Failed to fetch exchange rates",
      },
    };
  }
}
