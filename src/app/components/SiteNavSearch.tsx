import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router";
import { Search, X } from "lucide-react";
import {
  buildAtelierSearchHref,
  countAtelierMatches,
  searchSite,
  type SiteSearchResult,
} from "../lib/siteSearch";

type Variant = "mobile" | "compact" | "desktop";

type Props = {
  variant?: Variant;
  /** Called when the panel closes or a result is chosen (e.g. close mobile menu). */
  onNavigate?: () => void;
};

const PLACEHOLDER = "Search jewellery, codes, pages…";

export default function SiteNavSearch({
  variant = "compact",
  onNavigate,
}: Props) {
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<SiteSearchResult[]>([]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  }, []);

  const expand = useCallback(() => {
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!open || trimmed.length < 1) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const handle = window.setTimeout(() => {
      setResults(searchSite(trimmed, 8));
      setActiveIndex(-1);
    }, 120);

    return () => window.clearTimeout(handle);
  }, [query, open]);

  const goToAtelier = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;
      const href = buildAtelierSearchHref(trimmed);
      close();
      onNavigate?.();
      navigate(href);
    },
    [close, navigate, onNavigate],
  );

  const selectResult = useCallback(
    (result: SiteSearchResult) => {
      close();
      onNavigate?.();
      navigate(result.href);
    },
    [close, navigate, onNavigate],
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (activeIndex >= 0 && results[activeIndex]) {
      selectResult(results[activeIndex]);
      return;
    }
    goToAtelier(query);
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((index) => (index + 1) % results.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
      return;
    }
  };

  const matchCount = query.trim() ? countAtelierMatches(query) : 0;
  const showPanel = open && query.trim().length > 0;

  const iconButtonClass =
    variant === "mobile"
      ? "inline-flex size-10 shrink-0 items-center justify-center border border-[#dccb7b]/45 text-[#f9f9f9] transition hover:border-[#dccb7b]/70 hover:bg-[#766d42]/10"
      : variant === "desktop"
        ? "inline-flex size-9 shrink-0 items-center justify-center border border-[#dccb7b]/40 text-[#f9f9f9] transition hover:border-[#dccb7b]/70 hover:text-[#dccb7b]"
        : "inline-flex size-9 shrink-0 items-center justify-center border border-[#dccb7b]/40 text-[#f9f9f9] transition hover:border-[#dccb7b]/65 hover:bg-[#766d42]/10 sm:size-8";

  const fieldShellClass =
    variant === "mobile"
      ? "flex min-w-0 flex-1 items-center gap-1.5"
      : variant === "desktop"
        ? "flex items-center"
        : "flex items-center";

  const inputClass =
    variant === "mobile"
      ? "h-10 w-full min-w-0 border border-[#dccb7b]/45 bg-[#162e28] px-3 font-editorial text-[14px] tracking-[0.04em] text-[#f9f9f9] outline-none placeholder:text-[#f9f9f9]/45 focus:border-[#dccb7b]/75"
      : variant === "desktop"
        ? "h-9 w-[min(16rem,28vw)] border border-[#dccb7b]/45 bg-[#162e28]/95 px-3 font-editorial text-[12px] uppercase tracking-[0.12em] text-[#f9f9f9] outline-none placeholder:normal-case placeholder:tracking-[0.04em] placeholder:text-[#f9f9f9]/45 focus:border-[#dccb7b]/75"
        : "h-9 w-[min(14rem,42vw)] border border-[#dccb7b]/45 bg-[#162e28] px-3 font-editorial text-[12px] tracking-[0.04em] text-[#f9f9f9] outline-none placeholder:text-[#f9f9f9]/45 focus:border-[#dccb7b]/75 sm:w-[16rem]";

  return (
    <div
      ref={rootRef}
      className={`relative ${variant === "mobile" && open ? "min-w-0 flex-1" : "shrink-0"}`}
    >
      {!open ? (
        <button
          type="button"
          className={iconButtonClass}
          aria-label="Open search"
          aria-expanded={false}
          onClick={expand}
        >
          <Search className="size-4" strokeWidth={1.4} aria-hidden />
        </button>
      ) : (
        <form
          role="search"
          className={fieldShellClass}
          onSubmit={onSubmit}
          aria-label="Site search"
        >
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#dccb7b]/80"
              strokeWidth={1.4}
              aria-hidden
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder={PLACEHOLDER}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-autocomplete="list"
              aria-controls={showPanel ? listId : undefined}
              aria-expanded={showPanel}
              aria-activedescendant={
                activeIndex >= 0 ? `${listId}-option-${activeIndex}` : undefined
              }
              className={`${inputClass} pl-8 pr-9`}
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center text-[#f9f9f9]/70 transition hover:text-[#dccb7b]"
              aria-label="Close search"
              onClick={close}
            >
              <X className="size-3.5" strokeWidth={1.4} />
            </button>
          </div>
        </form>
      )}

      {showPanel ? (
        <div
          id={listId}
          role="listbox"
          aria-label="Search results"
          className={`absolute z-[120] mt-2 max-h-[min(70vh,24rem)] overflow-y-auto overscroll-contain border border-[#766d42]/35 bg-[#faf8f5] shadow-[0_16px_48px_rgba(8,20,16,0.35)] ${
            variant === "mobile"
              ? "inset-x-0"
              : "right-0 w-[min(22rem,calc(100vw-1.5rem))]"
          }`}
        >
          {results.length === 0 ? (
            <p className="px-4 py-4 font-editorial text-[13px] tracking-[0.04em] text-[#524a28]">
              No matches for “{query.trim()}”
            </p>
          ) : (
            <ul className="py-1">
              {results.map((result, index) => {
                const active = index === activeIndex;
                return (
                  <li key={result.id} role="option" aria-selected={active}>
                    <Link
                      id={`${listId}-option-${index}`}
                      to={result.href}
                      className={`block px-4 py-3 transition ${
                        active ? "bg-[#1d3c34]/08" : "hover:bg-[#1d3c34]/06"
                      }`}
                      onClick={() => {
                        close();
                        onNavigate?.();
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <span className="block font-editorial text-[14px] tracking-[0.04em] text-[#1d3c34]">
                        {result.title}
                      </span>
                      <span className="mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-[#766d42]">
                        {result.kind === "piece" ? "Piece" : "Page"}
                        <span className="mx-1.5 text-[#766d42]/40">·</span>
                        {result.subtitle}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {matchCount > 0 ? (
            <button
              type="button"
              className="flex w-full items-center justify-between border-t border-[#766d42]/20 px-4 py-3 text-left transition hover:bg-[#1d3c34]/06"
              onClick={() => goToAtelier(query)}
            >
              <span className="font-editorial text-[12px] uppercase tracking-[0.14em] text-[#1d3c34]">
                View all in salon
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#766d42] tabular-nums">
                {matchCount} piece{matchCount === 1 ? "" : "s"}
              </span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
