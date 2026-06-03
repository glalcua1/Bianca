import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AtelierPieceLightbox from "./AtelierPieceLightbox";
import CollectionPhotoFrame from "./CollectionPhotoFrame";
import {
  ATELIER_PIECES,
  FINE_JEWELLERY_CATEGORIES,
  atelierPieceEyebrow,
  type AtelierPiece,
  type BraceletKind,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";

const BRACELET_SECTIONS: { kind: BraceletKind; title: string }[] = [
  { kind: "bracelet", title: "Bracelets" },
  { kind: "tennis", title: "Tennis Bracelets" },
];

function renderPieceCard(
  piece: AtelierPiece,
  onOpenPiece: (piece: AtelierPiece) => void,
) {
  return (
    <li key={piece.id} className="flex w-full min-w-0 flex-col items-center">
      <button
        type="button"
        onClick={() => onOpenPiece(piece)}
        className="group relative mx-auto w-full min-w-0 max-w-[443px] cursor-zoom-in text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#766d42]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] md:max-w-none"
        aria-label={`View ${piece.title} — enlarged salon presentation`}
      >
        <CollectionPhotoFrame
          fluid
          darkImageWell={piece.category === "necklaces" && !piece.imageWellColor}
          imageWellColor={piece.imageWellColor}
          src={piece.image}
          alt={piece.alt}
          data-name={piece.id}
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center opacity-80 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:bottom-4 md:opacity-0 md:group-hover:opacity-100">
          <span className="border border-[#766d42]/40 bg-[#f4f0e6]/95 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#1d3c34] shadow-sm backdrop-blur-[2px]">
            View in salon
          </span>
        </span>
      </button>
      <div className="mt-8 w-full max-w-[22rem] text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold-on-cream">
          {atelierPieceEyebrow(piece)}
        </p>
        <h3 className="mt-3 font-editorial text-[1.35rem] tracking-[0.05em] text-[#1d3c34] md:text-2xl">
          {piece.title}
        </h3>
        <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
          {piece.description}
        </p>
        <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-gold-on-cream">
          Product code: {piece.productCode}
        </p>
      </div>
    </li>
  );
}

type Props = {
  activeCategory: JewelleryCategoryId | "all";
  onCategoryChange: (category: JewelleryCategoryId | "all") => void;
};

export default function FineJewelleryAtelier({
  activeCategory,
  onCategoryChange,
}: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    setLightboxOpen(false);
  }, [activeCategory]);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    if (activeCategory === "all") {
      container.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    const activeTab = container.querySelector<HTMLElement>('[aria-selected="true"]');
    activeTab?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, [activeCategory]);

  const filteredPieces = useMemo(
    () =>
      activeCategory === "all"
        ? ATELIER_PIECES
        : ATELIER_PIECES.filter((piece) => piece.category === activeCategory),
    [activeCategory],
  );

  /** Same order as the grid — used for prev/next in the salon viewer */
  const lightboxPieces = useMemo(() => {
    if (activeCategory === "bracelets") {
      return BRACELET_SECTIONS.flatMap(({ kind }) =>
        filteredPieces.filter((piece) => piece.braceletKind === kind),
      );
    }
    return filteredPieces;
  }, [activeCategory, filteredPieces]);

  const openPiece = useCallback(
    (piece: AtelierPiece) => {
      const index = lightboxPieces.findIndex((p) => p.id === piece.id);
      setLightboxIndex(index >= 0 ? index : 0);
      setLightboxOpen(true);
    },
    [lightboxPieces],
  );

  const handleLightboxOpenChange = useCallback((open: boolean) => {
    setLightboxOpen(open);
  }, []);

  const activeLabel =
    activeCategory === "all"
      ? "All pieces"
      : FINE_JEWELLERY_CATEGORIES.find((c) => c.id === activeCategory)?.title ??
        "";

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="overflow-x-hidden border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-4 text-house-eyebrow text-gold-on-cream">
            From the atelier
          </p>
          <h2
            id="showcase-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#1d3c34]"
          >
            Selected Pieces
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-house-body text-on-cream-body">
            Every form of brilliance — curate the collection by category.
          </p>
        </div>

        <div
          ref={tabsRef}
          id="categories"
          className="-mx-6 mb-12 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:mb-14 md:justify-center md:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-padding-inline:24px] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Jewellery categories"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            onClick={() => onCategoryChange("all")}
            className={`shrink-0 border px-4 py-2 transition duration-300 ${
              activeCategory === "all"
                ? "border-[#766d42]/50 bg-[#f4f0e6] shadow-[inset_0_0_0_1px_rgba(118,109,66,0.2)]"
                : "border-[#1d3c34]/12 bg-white hover:border-[#766d42]/35 hover:bg-[#f4f0e6]/60"
            }`}
          >
            <span className="whitespace-nowrap font-editorial text-[13px] tracking-[0.08em] text-[#1d3c34]">
              All
            </span>
          </button>

          {FINE_JEWELLERY_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(category.id)}
                className={`shrink-0 border px-4 py-2 transition duration-300 ${
                  isActive
                    ? "border-[#766d42]/50 bg-[#f4f0e6] shadow-[inset_0_0_0_1px_rgba(118,109,66,0.2)]"
                    : "border-[#1d3c34]/12 bg-white hover:border-[#766d42]/35 hover:bg-[#f4f0e6]/60"
                }`}
              >
                <span className="whitespace-nowrap font-editorial text-[13px] tracking-[0.08em] text-[#1d3c34]">
                  {category.title}
                </span>
              </button>
            );
          })}
        </div>

        {activeCategory !== "all" && (
          <p className="mb-10 text-center text-house-body text-on-cream-muted">
            Viewing {activeLabel.toLowerCase()}
            {" · "}
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className="text-gold-on-cream underline-offset-4 transition hover:underline"
            >
              Show all
            </button>
          </p>
        )}

        {filteredPieces.length === 0 ? (
          <p className="mx-auto max-w-md text-center text-house-body text-on-cream-body">
            Pieces in this category are being prepared in the atelier. Enquire
            for availability or select another category above.
          </p>
        ) : activeCategory === "bracelets" ? (
          <div className="flex flex-col gap-16 md:gap-20">
            {BRACELET_SECTIONS.map(({ kind, title }) => {
              const sectionPieces = filteredPieces.filter(
                (piece) => piece.braceletKind === kind,
              );
              if (sectionPieces.length === 0) return null;
              return (
                <div key={kind}>
                  <h3 className="mb-10 text-center font-editorial text-[clamp(1.15rem,2.5vw,1.5rem)] tracking-[0.1em] text-[#1d3c34] md:mb-12">
                    {title}
                  </h3>
                  <ul className="grid w-full min-w-0 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {sectionPieces.map((piece) =>
                      renderPieceCard(piece, openPiece),
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="grid w-full min-w-0 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {filteredPieces.map((piece) => renderPieceCard(piece, openPiece))}
          </ul>
        )}
      </div>

      <AtelierPieceLightbox
        pieces={lightboxPieces}
        activeIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={handleLightboxOpenChange}
        onActiveIndexChange={setLightboxIndex}
      />
    </section>
  );
}
