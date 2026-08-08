import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Search, X } from "lucide-react";
import type { JewelleryCategoryId } from "../data/fineJewelleryCollections";
import {
  clearSelectedFilters,
  getFilterGroups,
  hasActiveSalonFilters,
  type AtelierFilterGroup,
  type SelectedAtelierFilters,
} from "../lib/atelierCatalog";

type Props = {
  category: JewelleryCategoryId | "all";
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  selectedFilters: SelectedAtelierFilters;
  onSelectedFiltersChange: (value: SelectedAtelierFilters) => void;
  resultCount: number;
  totalCount: number;
};

const SEARCH_PLACEHOLDERS: Partial<Record<JewelleryCategoryId | "all", string>> = {
  all: "Search — e.g. white diamond rose gold",
  rings: "Search rings — e.g. pink sapphire yellow gold",
  earrings: "Search earrings — e.g. emerald drop white gold",
  necklaces: "Search necklaces — e.g. pear fringe",
  bracelets: "Search bracelets — e.g. tennis white diamond",
  pendants: "Search pendants — e.g. canary oval",
  "for-him": "Search for him — e.g. white gold band",
};

function FilterDropdown({
  group,
  selectedIds,
  onToggle,
}: {
  group: AtelierFilterGroup;
  selectedIds: string[];
  onToggle: (optionId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = selectedIds.length;

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={`inline-flex min-h-11 min-w-0 items-center gap-1.5 border px-3 py-2.5 text-[10px] uppercase tracking-[0.14em] transition duration-200 sm:min-h-0 sm:py-2 ${
            activeCount > 0
              ? "border-[#766d42]/55 bg-[#1d3c34] text-[#faf8f5]"
              : "border-[#766d42]/22 bg-white/70 text-[#524a28] hover:border-[#766d42]/40 hover:bg-[#f4f0e6]"
          }`}
          aria-label={`${group.label} filter${activeCount ? `, ${activeCount} selected` : ""}`}
        >
          <span className="truncate">{group.label}</span>
          {activeCount > 0 ? (
            <span className="tabular-nums text-[#dccb7b]">({activeCount})</span>
          ) : null}
          <ChevronDown
            className={`size-3 shrink-0 opacity-70 transition duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={1.25}
            aria-hidden
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="start"
          collisionPadding={12}
          className="z-[70] w-[min(18rem,calc(100vw-2rem))] border border-[#766d42]/22 bg-[#faf8f5] p-2 shadow-[0_12px_40px_rgba(29,60,52,0.12)] outline-none sm:w-auto sm:min-w-[11.5rem]"
        >
          <ul className="max-h-[min(16rem,50vh)] overflow-y-auto overscroll-contain">
            {group.options.map((option) => {
              const checked = selectedIds.includes(option.id);
              return (
                <li key={option.id}>
                  <label className="flex min-h-11 cursor-pointer items-center gap-3 px-2 py-2 text-[12px] tracking-[0.04em] text-[#1d3c34] transition hover:bg-[#f4f0e6] sm:min-h-0 sm:gap-2.5 sm:py-1.5 sm:text-[11px]">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(option.id)}
                      className="size-4 shrink-0 accent-[#1d3c34] sm:size-3.5"
                    />
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default function AtelierSalonFilters({
  category,
  searchQuery,
  onSearchQueryChange,
  selectedFilters,
  onSelectedFiltersChange,
  resultCount,
  totalCount,
}: Props) {
  const filterGroups = getFilterGroups(category);
  const filtersActive = hasActiveSalonFilters(searchQuery, selectedFilters);
  const placeholder =
    SEARCH_PLACEHOLDERS[category] ?? SEARCH_PLACEHOLDERS.all ?? "Search the atelier";

  function toggleFilter(groupId: string, optionId: string) {
    const current = selectedFilters[groupId] ?? [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    onSelectedFiltersChange({ ...selectedFilters, [groupId]: next });
  }

  function clearAll() {
    onSearchQueryChange("");
    onSelectedFiltersChange(clearSelectedFilters(filterGroups));
  }

  const countLabel =
    resultCount === totalCount
      ? `${resultCount} piece${totalCount === 1 ? "" : "s"} in view`
      : `${resultCount} of ${totalCount} piece${totalCount === 1 ? "" : "s"}`;

  return (
    <div className="border-t border-[#766d42]/15 pt-3 md:pt-3.5">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 md:gap-5">
        <div className="relative min-w-0 w-full sm:flex-1 md:max-w-[min(22rem,42%)] lg:max-w-[24rem]">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#766d42]/55 sm:size-3.5"
            strokeWidth={1.25}
            aria-hidden
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder={placeholder}
            aria-label="Search atelier pieces"
            className="w-full border border-[#766d42]/22 bg-white/60 py-2.5 pl-10 pr-10 text-base tracking-[0.02em] text-[#1d3c34] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition duration-200 placeholder:font-editorial placeholder:text-[#766d42]/45 placeholder:italic focus:border-[#766d42]/45 focus:bg-white focus:ring-2 focus:ring-[#766d42]/12 sm:py-2 sm:pl-9 sm:pr-9 sm:font-editorial sm:text-[0.875rem]"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute right-1 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center text-[#766d42]/60 transition hover:text-[#1d3c34] sm:right-2 sm:size-7"
              aria-label="Clear search"
            >
              <X className="size-4 sm:size-3.5" strokeWidth={1.25} />
            </button>
          ) : null}
        </div>

        {filterGroups.length > 0 ? (
          <div
            className="flex min-w-0 w-full items-center gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scroll-padding-inline:0.25rem] [scrollbar-width:none] sm:w-auto sm:shrink-0 sm:justify-end sm:gap-1.5 sm:pb-0 md:gap-2 [&::-webkit-scrollbar]:hidden"
            aria-label="Salon filters"
          >
            {filterGroups.map((group) => (
              <FilterDropdown
                key={group.id}
                group={group}
                selectedIds={selectedFilters[group.id] ?? []}
                onToggle={(optionId) => toggleFilter(group.id, optionId)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p
          className="text-[9px] uppercase tracking-[0.18em] text-on-cream-muted"
          aria-live="polite"
        >
          <span className="tabular-nums text-[#524a28]">{countLabel}</span>
        </p>
        {filtersActive ? (
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto text-[9px] uppercase tracking-[0.16em] text-[#766d42] underline-offset-4 transition hover:text-[#1d3c34] hover:underline"
          >
            Clear salon filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
