import { useState, type CSSProperties } from "react";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import CollectionPhotoFrame from "../CollectionPhotoFrame";
import BespokeSectionHeader from "./BespokeSectionHeader";
import {
  BESPOKE_SALON_PIECES,
  type BespokeSalonPiece,
} from "../../data/bespokeJewellery";
import { formatRingPriceInr } from "../../data/ringQuotes";
import {
  ATELIER_FRAME_ASPECT_RATIO,
  PHI_INV,
  SALON_GOLDEN_GRID_COLUMNS,
  SALON_PRICE_SECTION,
} from "../../lib/goldenRatioLayout";

function PieceThumbnail({
  piece,
  index,
  isActive,
  onSelect,
}: {
  piece: BespokeSalonPiece;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isActive ? "true" : undefined}
      aria-label={`View ${piece.title} — ${piece.mediaEyebrow.toLowerCase()}`}
      className={`group flex min-w-0 flex-col text-left transition duration-300 motion-reduce:transition-none ${
        isActive ? "opacity-100" : "opacity-72 hover:opacity-90"
      }`}
    >
      <div
        className={`relative w-full border bg-[#f4f0e6] p-[2px] shadow-[0_10px_32px_rgba(0,0,0,0.2)] transition duration-300 motion-reduce:transition-none ${
          isActive
            ? "border-[#dccb7b]/75 ring-1 ring-[#dccb7b]/40"
            : "border-[#766d42]/35 group-hover:border-[#766d42]/55"
        }`}
        style={{ aspectRatio: ATELIER_FRAME_ASPECT_RATIO }}
      >
        <div className="flex size-full flex-col border border-[#766d42]/18 bg-[#faf8f5] p-[1px]">
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#faf8f5]">
            {piece.kind === "video" ? (
              <video
                src={piece.src}
                muted
                playsInline
                preload="metadata"
                aria-hidden
                className="pointer-events-none size-full object-contain object-center"
              />
            ) : (
              <ProtectedImage
                src={piece.src}
                alt=""
                aria-hidden
                wrapperClassName="absolute inset-0 flex items-center justify-center"
                className="max-h-full max-w-full object-contain object-center"
              />
            )}
            <div
              className={`pointer-events-none absolute inset-0 transition duration-300 ${
                isActive ? "bg-[#dccb7b]/[0.07]" : "bg-[#1d3c34]/14"
              }`}
            />
          </div>
        </div>
        <span
          className={`pointer-events-none absolute left-1.5 top-1.5 bg-[#1d3c34]/60 px-1.5 py-0.5 text-[7px] uppercase tracking-[0.2em] backdrop-blur-[1px] ${
            isActive ? "text-[#dccb7b]" : "text-[#faf8f5]/90"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p
        className={`mt-2 truncate font-editorial text-[0.78rem] tracking-[0.04em] sm:text-[0.82rem] ${
          isActive ? "text-[#f9f9f9]" : "text-[#f9f9f9]/70"
        }`}
      >
        {piece.title}
      </p>
      <p className="mt-0.5 truncate text-[8px] uppercase tracking-[0.16em] text-[#dccb7b]/55">
        {piece.mediaEyebrow}
      </p>
    </button>
  );
}

function PieceDetailPanel({
  piece,
  index,
}: {
  piece: BespokeSalonPiece;
  index: number;
}) {
  return (
    <div className="flex min-h-0 flex-col justify-center lg:h-full">
      <div className="shrink-0" style={{ flexBasis: `${(1 - PHI_INV) * 100}%` }}>
        <p className="text-[9px] uppercase tracking-[0.28em] text-[#dccb7b]/85">
          {piece.mediaEyebrow} · {String(index + 1).padStart(2, "0")} of{" "}
          {String(BESPOKE_SALON_PIECES.length).padStart(2, "0")}
        </p>
        <h3 className="mt-4 font-editorial text-[clamp(1.5rem,2.8vw,2rem)] leading-[1.12] tracking-[0.04em] text-[#f9f9f9]">
          {piece.title}
        </h3>
        <p className="mt-4 text-house-body leading-relaxed text-on-forest-body">
          {piece.subtitle}
        </p>
      </div>

      <div
        className="mt-8 min-h-0 border-t border-[#766d42]/25 pt-6"
        style={{ flexBasis: SALON_PRICE_SECTION }}
      >
        <dl className="space-y-4">
          <div className="flex items-baseline justify-between gap-6">
            <dt className="text-[9px] uppercase tracking-[0.22em] text-[#dccb7b]/70">
              Centre stone
            </dt>
            <dd className="font-editorial text-[1rem] tracking-[0.02em] text-[#f9f9f9]">
              {piece.gemstoneWeight}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-6">
            <dt className="text-[9px] uppercase tracking-[0.22em] text-[#dccb7b]/70">
              Gold
            </dt>
            <dd className="font-editorial text-[1rem] tracking-[0.02em] text-[#f9f9f9]">
              {piece.goldWeight}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-6 border-t border-[#766d42]/20 pt-4">
            <dt className="text-[9px] uppercase tracking-[0.22em] text-[#dccb7b]/70">
              Salon guide
            </dt>
            <dd className="font-editorial text-[1.125rem] tabular-nums tracking-[0.02em] text-[#f9f9f9]">
              {formatRingPriceInr(piece.priceInr)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 shrink-0 lg:mt-8">
        <p className="border-l border-[#dccb7b]/50 pl-5 text-house-body leading-relaxed text-on-forest-body">
          Available with your choice of{" "}
          <span className="text-[#f9f9f9]">lab-grown gemstones</span> or{" "}
          <span className="text-[#f9f9f9]">lab-grown diamonds</span> — composed
          to your specification in a private salon consultation.
        </p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#dccb7b]/55">
          Ref. {piece.reference}
        </p>
      </div>
    </div>
  );
}

export default function BespokeSalonFilms() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePiece = BESPOKE_SALON_PIECES[activeIndex] ?? BESPOKE_SALON_PIECES[0];

  const goldenGridStyle = {
    "--salon-grid": SALON_GOLDEN_GRID_COLUMNS,
  } as CSSProperties;

  return (
    <section
      aria-labelledby="bespoke-salon-films-heading"
      className="relative overflow-hidden border-y border-[#766d42]/20 bg-[#1d3c34] px-4 py-20 sm:px-6 md:px-10 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(220,203,123,0.12),transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dccb7b]/35 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <BespokeSectionHeader
          id="bespoke-salon-films-heading"
          tone="dark"
          eyebrow="Featured Compositions"
          title="Where Craft Meets Light"
          subtitle="Two rings from the atelier — one captured in salon motion, one composed in still light. Select a piece to study stone, gold, and proportion."
        />

        <EditorialReveal className="mt-14 md:mt-16">
          <div
            className="grid grid-cols-1 items-stretch gap-10 max-lg:grid-cols-1 lg:gap-12 lg:[grid-template-columns:var(--salon-grid)] xl:gap-16"
            style={goldenGridStyle}
          >
            {/* φ — frame column (61.8%) */}
            <div className="flex min-w-0 flex-col">
              <div className="relative min-w-0">
                <div
                  className="pointer-events-none absolute -inset-3 rounded-sm bg-[#dccb7b]/[0.06] blur-2xl sm:-inset-4"
                  aria-hidden
                />
                <div className="relative">
                  <CollectionPhotoFrame
                    key={activePiece.id}
                    fluid
                    imageWellColor="#faf8f5"
                    src={activePiece.src}
                    video={
                      activePiece.kind === "video" ? activePiece.src : undefined
                    }
                    videoObjectFit="contain"
                    alt={activePiece.alt}
                    data-name={activePiece.id}
                  />
                  <div
                    className="pointer-events-none absolute left-5 top-5 z-10 border border-[#766d42]/30 bg-[#1d3c34]/55 px-2.5 py-1 text-[8px] uppercase tracking-[0.22em] text-[#dccb7b] backdrop-blur-[2px] md:left-7 md:top-7"
                    aria-hidden
                  >
                    {activePiece.mediaEyebrow}
                  </div>
                </div>
              </div>

              <div
                className="mx-auto mt-5 grid w-full max-w-[11rem] grid-cols-2 gap-2.5 sm:max-w-[12.5rem] sm:gap-3 lg:mx-0"
                role="tablist"
                aria-label="Featured bespoke rings"
              >
                {BESPOKE_SALON_PIECES.map((piece, index) => (
                  <PieceThumbnail
                    key={piece.id}
                    piece={piece}
                    index={index}
                    isActive={index === activeIndex}
                    onSelect={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* 1 — detail column (38.2%) */}
            <div className="flex min-w-0 flex-col lg:min-h-0 lg:justify-center">
              <PieceDetailPanel piece={activePiece} index={activeIndex} />
            </div>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
