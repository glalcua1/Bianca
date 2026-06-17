import {
  DEFAULT_RATE_14KT,
  DEFAULT_RATE_18KT,
} from "../constants";
import type { GoldRateSource, GoldRatesState } from "../types";

const TROY_OZ_GRAMS = 31.1035;
const PURITY_18K = 0.75;
const PURITY_14K = 0.585;

interface GoldApiResponse {
  items?: Array<{
    curr?: string;
    xauPrice?: number;
  }>;
}

function ratesFrom24K(price24KPerGram: number) {
  return {
    rate18KT: Math.round(price24KPerGram * PURITY_18K),
    rate14KT: Math.round(price24KPerGram * PURITY_14K),
  };
}

function fallbackRates() {
  return {
    rate18KT: DEFAULT_RATE_18KT,
    rate14KT: DEFAULT_RATE_14KT,
    source: "fallback" as GoldRateSource,
  };
}

export async function fetchLiveGoldRates(): Promise<{
  rate18KT: number;
  rate14KT: number;
  source: GoldRateSource;
  lastUpdated: string;
  error?: string;
}> {
  const now = new Date().toISOString();

  try {
    const response = await fetch(
      "https://data-asg.goldprice.org/dbXRates/INR",
      { signal: AbortSignal.timeout(8000) },
    );

    if (!response.ok) throw new Error("Gold rate API unavailable");

    const data = (await response.json()) as GoldApiResponse;
    const inrItem = data.items?.find((item) => item.curr === "INR");

    if (!inrItem?.xauPrice || inrItem.xauPrice <= 0) {
      throw new Error("Invalid gold rate data");
    }

    const price24KPerGram = inrItem.xauPrice / TROY_OZ_GRAMS;
    const rates = ratesFrom24K(price24KPerGram);

    return {
      ...rates,
      source: "live",
      lastUpdated: now,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch gold rates";
    return {
      ...fallbackRates(),
      lastUpdated: now,
      error: message,
    };
  }
}

export function createInitialGoldRatesState(): GoldRatesState {
  return {
    rate18KT: DEFAULT_RATE_18KT,
    rate14KT: DEFAULT_RATE_14KT,
    lastUpdated: null,
    source: "fallback",
    loading: true,
    error: null,
    manualOverride: false,
  };
}
