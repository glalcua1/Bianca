import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { createEmptyDesign, cloneDesign } from "../data/sampleDesigns";
import { calculatePricing } from "../lib/calculations";
import {
  createInitialGoldRatesState,
  fetchLiveGoldRates,
} from "../lib/goldRates";
import { loadPersistedState, savePersistedState } from "../lib/storage";
import type {
  CalculatorPersistedState,
  GoldRatesState,
  HistoryEntry,
  JewelleryDesign,
  QuoteMode,
  SavedVariant,
} from "../types";

type Action =
  | { type: "SET_DESIGN"; design: JewelleryDesign }
  | { type: "UPDATE_DESIGN"; patch: Partial<JewelleryDesign> }
  | { type: "SET_GOLD_RATES"; rates: Partial<GoldRatesState> }
  | { type: "SET_QUOTE_MODE"; mode: QuoteMode }
  | { type: "SAVE_VARIANT"; name?: string }
  | { type: "LOAD_VARIANT"; variantId: string }
  | { type: "DELETE_VARIANT"; variantId: string }
  | { type: "RENAME_VARIANT"; variantId: string; name: string }
  | { type: "DUPLICATE_VARIANT"; variantId: string }
  | { type: "SET_COMPARE"; slot: 0 | 1; variantId: string | null }
  | { type: "LOAD_SAMPLE"; design: JewelleryDesign }
  | { type: "SAVE_HISTORY" }
  | { type: "LOAD_HISTORY"; entryId: string }
  | { type: "DELETE_HISTORY"; entryId: string }
  | { type: "NEW_DESIGN" };

interface CalculatorState {
  currentDesign: JewelleryDesign;
  goldRates: GoldRatesState;
  variants: SavedVariant[];
  history: HistoryEntry[];
  quoteMode: QuoteMode;
  compareVariantIds: [string | null, string | null];
}

function initState(): CalculatorState {
  const persisted = loadPersistedState();
  return {
    currentDesign: persisted?.currentDesign ?? createEmptyDesign(),
    goldRates: createInitialGoldRatesState(),
    variants: persisted?.variants ?? [],
    history: persisted?.history ?? [],
    quoteMode: persisted?.quoteMode ?? "internal",
    compareVariantIds: persisted?.compareVariantIds ?? [null, null],
  };
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case "SET_DESIGN":
      return { ...state, currentDesign: action.design };
    case "UPDATE_DESIGN":
      return {
        ...state,
        currentDesign: {
          ...state.currentDesign,
          ...action.patch,
          updatedAt: new Date().toISOString(),
        },
      };
    case "SET_GOLD_RATES":
      return {
        ...state,
        goldRates: { ...state.goldRates, ...action.rates },
      };
    case "SET_QUOTE_MODE":
      return { ...state, quoteMode: action.mode };
    case "SAVE_VARIANT": {
      const variant: SavedVariant = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        name: action.name ?? state.currentDesign.name,
        design: structuredClone(state.currentDesign),
        savedAt: new Date().toISOString(),
      };
      return { ...state, variants: [...state.variants, variant] };
    }
    case "LOAD_VARIANT": {
      const v = state.variants.find((x) => x.id === action.variantId);
      if (!v) return state;
      return { ...state, currentDesign: structuredClone(v.design) };
    }
    case "DELETE_VARIANT":
      return {
        ...state,
        variants: state.variants.filter((v) => v.id !== action.variantId),
        compareVariantIds: state.compareVariantIds.map((id) =>
          id === action.variantId ? null : id,
        ) as [string | null, string | null],
      };
    case "RENAME_VARIANT":
      return {
        ...state,
        variants: state.variants.map((v) =>
          v.id === action.variantId ? { ...v, name: action.name } : v,
        ),
      };
    case "DUPLICATE_VARIANT": {
      const v = state.variants.find((x) => x.id === action.variantId);
      if (!v) return state;
      const copy = cloneDesign(v.design, `${v.name} (Copy)`);
      const variant: SavedVariant = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        name: copy.name,
        design: copy,
        savedAt: new Date().toISOString(),
      };
      return { ...state, variants: [...state.variants, variant] };
    }
    case "SET_COMPARE": {
      const next = [...state.compareVariantIds] as [string | null, string | null];
      next[action.slot] = action.variantId;
      return { ...state, compareVariantIds: next };
    }
    case "LOAD_SAMPLE":
      return { ...state, currentDesign: cloneDesign(action.design, action.design.name) };
    case "SAVE_HISTORY": {
      const result = calculatePricing(
        state.currentDesign,
        state.goldRates.rate18KT,
        state.goldRates.rate14KT,
      );
      const entry: HistoryEntry = {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        name: state.currentDesign.name,
        design: structuredClone(state.currentDesign),
        result,
        goldRates: {
          rate18KT: state.goldRates.rate18KT,
          rate14KT: state.goldRates.rate14KT,
        },
        savedAt: new Date().toISOString(),
      };
      const history = [entry, ...state.history.filter((h) => h.id !== entry.id)].slice(0, 20);
      return { ...state, history };
    }
    case "LOAD_HISTORY": {
      const h = state.history.find((x) => x.id === action.entryId);
      if (!h) return state;
      return {
        ...state,
        currentDesign: structuredClone(h.design),
        goldRates: {
          ...state.goldRates,
          rate18KT: h.goldRates.rate18KT,
          rate14KT: h.goldRates.rate14KT,
          manualOverride: true,
          source: "manual",
        },
      };
    }
    case "DELETE_HISTORY":
      return {
        ...state,
        history: state.history.filter((h) => h.id !== action.entryId),
      };
    case "NEW_DESIGN":
      return { ...state, currentDesign: createEmptyDesign() };
    default:
      return state;
  }
}

interface CalculatorContextValue {
  state: CalculatorState;
  result: ReturnType<typeof calculatePricing>;
  dispatch: React.Dispatch<Action>;
  refreshGoldRates: () => Promise<void>;
  setManualGoldRate: (purity: "18KT" | "14KT", value: number) => void;
  persistDesign: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  const result = useMemo(
    () =>
      calculatePricing(
        state.currentDesign,
        state.goldRates.rate18KT,
        state.goldRates.rate14KT,
      ),
    [state.currentDesign, state.goldRates.rate18KT, state.goldRates.rate14KT],
  );

  const refreshGoldRates = useCallback(async () => {
    if (state.goldRates.manualOverride) return;
    dispatch({
      type: "SET_GOLD_RATES",
      rates: { loading: true, error: null },
    });
    const data = await fetchLiveGoldRates();
    dispatch({
      type: "SET_GOLD_RATES",
      rates: {
        rate18KT: data.rate18KT,
        rate14KT: data.rate14KT,
        lastUpdated: data.lastUpdated,
        source: data.source,
        loading: false,
        error: data.error ?? null,
      },
    });
  }, [state.goldRates.manualOverride]);

  const setManualGoldRate = useCallback(
    (purity: "18KT" | "14KT", value: number) => {
      dispatch({
        type: "SET_GOLD_RATES",
        rates: {
          ...(purity === "18KT" ? { rate18KT: value } : { rate14KT: value }),
          manualOverride: true,
          source: "manual",
          lastUpdated: new Date().toISOString(),
        },
      });
    },
    [],
  );

  useEffect(() => {
    refreshGoldRates();
  }, []);

  useEffect(() => {
    const persisted: CalculatorPersistedState = {
      currentDesign: state.currentDesign,
      variants: state.variants,
      history: state.history,
      quoteMode: state.quoteMode,
      compareVariantIds: state.compareVariantIds,
    };
    savePersistedState(persisted);
  }, [
    state.currentDesign,
    state.variants,
    state.history,
    state.quoteMode,
    state.compareVariantIds,
  ]);

  const persistDesign = useCallback(() => {
    dispatch({ type: "SAVE_HISTORY" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      result,
      dispatch,
      refreshGoldRates,
      setManualGoldRate,
      persistDesign,
    }),
    [state, result, refreshGoldRates, setManualGoldRate, persistDesign],
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext);
  if (!ctx) throw new Error("useCalculator must be used within CalculatorProvider");
  return ctx;
}
