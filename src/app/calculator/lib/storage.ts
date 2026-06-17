import { STORAGE_KEY } from "../constants";
import type { CalculatorPersistedState } from "../types";

export function loadPersistedState(): CalculatorPersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorPersistedState;
  } catch {
    return null;
  }
}

export function savePersistedState(state: CalculatorPersistedState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}
