import { useEffect, useState } from "react";
import {
  fetchExchangeRates,
  type ExchangeRatesResponse,
} from "../lib/exchangeRates";

type State =
  | { status: "loading" }
  | { status: "ready"; data: ExchangeRatesResponse }
  | { status: "error" };

export function useExchangeRates(enabled = true): State {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;

    fetchExchangeRates().then((data) => {
      if (cancelled) return;
      if (data) {
        setState({ status: "ready", data });
      } else {
        setState({ status: "error" });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return state;
}
