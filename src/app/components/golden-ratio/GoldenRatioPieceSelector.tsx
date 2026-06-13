import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  ATELIER_PIECES,
  type AtelierPiece,
  atelierPieceEyebrow,
  atelierPieceUsesDarkWell,
} from "../../data/fineJewelleryCollections";
import type { GoldenRatioCategoryFilter } from "../../data/goldenRatioEvaluation";
import { GOLDEN_RATIO_CATEGORY_FILTERS } from "../../data/goldenRatioEvaluation";
import ProtectedImage from "../protection/ProtectedImage";

type Props = {
  selectedId: string | null;
  onSelect: (piece: AtelierPiece) => void;
};

export default function GoldenRatioPieceSelector({ selectedId, onSelect }: Props) {
  const [filter, setFilter] = useState<GoldenRatioCategoryFilter>("all");
  const [query, setQuery] = useState("");

  const pieces = useMemo(() => {
    let list = ATELIER_PIECES.filter((p) => !p.video);
    if (filter !== "all") {
      list = list.filter((p) => p.category === filter);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.productCode.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filter, query]);

  return (
    <div className="flex h-full flex-col rounded-sm border border-[#766d42]/25 bg-white shadow-[0_8px_32px_rgba(29,60,52,0.06)]">
      <div className="border-b border-[#766d42]/15 p-4 md:p-5">
        <p className="text-house-eyebrow text-gold-on-cream">Atelier catalogue</p>
        <h2 className="mt-1 font-editorial text-lg text-bianca-forest">Select a piece</h2>
        <div className="relative mt-4">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-cream-muted"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or code…"
            className="w-full rounded-sm border border-[#766d42]/20 bg-[#faf8f5] py-2.5 pl-10 pr-3 text-sm text-bianca-forest outline-none ring-[#766d42]/30 focus:ring-2"
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {GOLDEN_RATIO_CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-sm px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] transition-colors ${
                filter === cat.id
                  ? "bg-[#1d3c34] text-[#f9f9f9]"
                  : "bg-[#f4f0e6] text-on-cream-muted hover:bg-[#ebe6da]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="min-h-0 flex-1 overflow-y-auto p-2 md:p-3" role="listbox" aria-label="Jewellery pieces">
        {pieces.map((piece) => {
          const selected = piece.id === selectedId;
          return (
            <li key={piece.id}>
              <button
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onSelect(piece)}
                className={`mb-2 flex w-full items-center gap-3 rounded-sm border p-2 text-left transition-colors ${
                  selected
                    ? "border-[#766d42] bg-[#f4f0e6]"
                    : "border-transparent hover:border-[#766d42]/20 hover:bg-[#faf8f5]"
                }`}
              >
                <div
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-sm border border-[#766d42]/15 ${
                    atelierPieceUsesDarkWell(piece) ? "bg-black" : "bg-[#faf8f5]"
                  }`}
                  style={
                    piece.imageWellColor ? { backgroundColor: piece.imageWellColor } : undefined
                  }
                >
                  <ProtectedImage
                    src={piece.image}
                    alt=""
                    className="h-full w-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] uppercase tracking-[0.14em] text-gold-on-cream">
                    {atelierPieceEyebrow(piece)}
                  </p>
                  <p className="truncate font-editorial text-sm text-bianca-forest">{piece.title}</p>
                  <p className="truncate text-xs text-on-cream-muted">{piece.productCode}</p>
                </div>
              </button>
            </li>
          );
        })}
        {pieces.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-on-cream-muted">No pieces match your search.</li>
        )}
      </ul>
    </div>
  );
}
