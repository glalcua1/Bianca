import { useCallback, useEffect, useMemo, useState } from "react";
import AtelierPieceLightbox from "./AtelierPieceLightbox";
import AtelierPieceQuote from "./AtelierPieceQuote";
import AtelierSalonFilters from "./AtelierSalonFilters";
import AtelierSalonHint from "./AtelierSalonHint";
import CollectionPhotoFrame from "./CollectionPhotoFrame";
import {
  ATELIER_PIECES,
  FINE_JEWELLERY_CATEGORIES,
  atelierPieceEyebrow,
  resolveAtelierMetalVariant,
  sortAllAtelierPiecesByWellPerCategory,
  sortAtelierPiecesByWell,
  type AtelierPiece,
  type BraceletKind,
  type JewelleryCategoryId,
  type MetalVariantId,
} from "../data/fineJewelleryCollections";
import {
  FINE_JEWELLERY_EDITORIAL,
  getFunctionalCategories,
} from "../data/fineJewelleryMegaMenu";
import { getRingQuote } from "../data/ringQuotes";
import {
  getEarringQuote,
  getParureQuotesForNecklace,
} from "../data/necklaceQuotes";
import {
  buildCatalogEntry,
  clearSelectedFilters,
  getFilterGroups,
  pieceMatchesFilters,
  scoreNaturalLanguageSearch,
  type SelectedAtelierFilters,
} from "../lib/atelierCatalog";

const ATELIER_CATALOG = ATELIER_PIECES.map(buildCatalogEntry);
const CATALOG_BY_ID = new Map(
  ATELIER_CATALOG.map((entry) => [entry.piece.id, entry]),
);

function pieceHasSalonQuote(piece: AtelierPiece): boolean {
  if (piece.salonPriceInr) return true;
  if (piece.category === "rings") return Boolean(getRingQuote(piece.productCode));
  if (piece.category === "necklaces") {
    return Boolean(getParureQuotesForNecklace(piece.productCode));
  }
  if (piece.category === "earrings") {
    return Boolean(getEarringQuote(piece.productCode));
  }
  return false;
}

const BRACELET_SECTIONS: { kind: BraceletKind; title: string }[] = [
  { kind: "bracelet", title: "Bracelets" },
  { kind: "tennis", title: "Tennis Bracelets" },
];

function preferredMetalFromFilters(
  selectedFilters: SelectedAtelierFilters,
): MetalVariantId | undefined {
  const metals = selectedFilters.metal ?? [];
  if (metals.length !== 1) return undefined;
  const id = metals[0];
  if (id === "yellow-gold" || id === "white-gold" || id === "rose-gold") {
    return id;
  }
  return undefined;
}

function displayImageForPiece(
  piece: AtelierPiece,
  selectedFilters: SelectedAtelierFilters,
): string {
  const metalId = preferredMetalFromFilters(selectedFilters);
  if (!metalId) return piece.image;
  return resolveAtelierMetalVariant(piece, metalId)?.image ?? piece.image;
}

function renderPieceCard(
  piece: AtelierPiece,
  onOpenPiece: (piece: AtelierPiece) => void,
  imageSrc: string,
) {
  return (
    <li key={piece.id} className="flex w-full min-w-0 flex-col items-center">
      <button
        type="button"
        onClick={() => onOpenPiece(piece)}
        className="group relative mx-auto w-full min-w-0 max-w-[443px] cursor-zoom-in text-left outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#766d42]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] md:max-w-none"
        aria-label={`View ${piece.title} — enlarged salon presentation${piece.galleryImages?.length ? " — multiple views in salon" : ""}`}
      >
        <CollectionPhotoFrame
          fluid
          darkImageWell={piece.category === "necklaces" && !piece.imageWellColor}
          imageWellColor={piece.imageWellColor}
          video={piece.video}
          imageClassName={piece.frameImageClassName}
          imageWrapperClassName={piece.frameImageWrapperClassName}
          src={imageSrc}
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
          {piece.productCode}
          {piece.video ? (
            <>
              <span className="text-on-cream-muted"> · salon film</span>
              {piece.salonPriceInr ? (
                <span className="text-on-cream-muted"> · tap to view salon price</span>
              ) : null}
            </>
          ) : pieceHasSalonQuote(piece) ? (
            <span className="text-on-cream-muted"> · tap to view salon price</span>
          ) : null}
        </p>
        {(piece.category === "rings" ||
          piece.category === "necklaces" ||
          piece.category === "earrings") &&
          pieceHasSalonQuote(piece) && (
          <AtelierPieceQuote
            piece={piece}
            variant="teaser"
            priceInr={piece.salonPriceInr}
          />
        )}
      </div>
    </li>
  );
}

type Props = {
  activeCategory: JewelleryCategoryId | "all";
};

export default function FineJewelleryAtelier({ activeCategory }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<SelectedAtelierFilters>(
    () => clearSelectedFilters(getFilterGroups("all")),
  );

  useEffect(() => {
    setLightboxOpen(false);
    setSearchQuery("");
    setSelectedFilters(clearSelectedFilters(getFilterGroups(activeCategory)));
  }, [activeCategory]);

  const categoryBasePieces = useMemo(() => {
    if (activeCategory === "all") return ATELIER_PIECES;
    return ATELIER_PIECES.filter((piece) => piece.category === activeCategory);
  }, [activeCategory]);

  const categoryPieces = useMemo(() => {
    const query = searchQuery.trim();
    const matched = categoryBasePieces.filter((piece) => {
      const entry = CATALOG_BY_ID.get(piece.id);
      if (!entry) return false;
      if (!pieceMatchesFilters(entry, selectedFilters)) return false;
      if (query && scoreNaturalLanguageSearch(entry, query) <= 0) return false;
      return true;
    });

    if (query) {
      return [...matched].sort((a, b) => {
        const scoreA = scoreNaturalLanguageSearch(CATALOG_BY_ID.get(a.id)!, query);
        const scoreB = scoreNaturalLanguageSearch(CATALOG_BY_ID.get(b.id)!, query);
        return scoreB - scoreA;
      });
    }

    if (activeCategory === "all") {
      return sortAllAtelierPiecesByWellPerCategory(matched);
    }
    if (activeCategory === "bracelets") {
      return matched;
    }
    return sortAtelierPiecesByWell(matched);
  }, [activeCategory, categoryBasePieces, searchQuery, selectedFilters]);

  const lightboxPieces = useMemo(() => {
    if (activeCategory === "bracelets") {
      return BRACELET_SECTIONS.flatMap(({ kind }) =>
        sortAtelierPiecesByWell(
          categoryPieces.filter((piece) => piece.braceletKind === kind),
        ),
      );
    }
    return categoryPieces;
  }, [activeCategory, categoryPieces]);

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

  const activeDescription =
    activeCategory === "all"
      ? FINE_JEWELLERY_EDITORIAL.description
      : FINE_JEWELLERY_CATEGORIES.find((c) => c.id === activeCategory)
          ?.description ?? "";

  const pieceCountLabel =
    categoryPieces.length === 1 ? "1 piece" : `${categoryPieces.length} pieces`;

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="scroll-mt-[calc(var(--site-nav-offset,0px)+1.5rem)] border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:px-10 md:py-20 md:pb-[calc(6rem+env(safe-area-inset-bottom))] lg:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <div className={`text-center ${activeCategory === "rings" ? "mb-8 md:mb-10" : "mb-10 md:mb-14"}`}>
          {activeCategory !== "rings" && (
            <p className="mb-4 text-house-eyebrow text-gold-on-cream">
              {FINE_JEWELLERY_EDITORIAL.eyebrow}
            </p>
          )}
          <h2
            id="showcase-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#1d3c34]"
          >
            {activeCategory === "all"
              ? "Selected Pieces"
              : activeCategory === "rings"
                ? "The Collection"
                : activeLabel}
          </h2>
          {activeCategory !== "rings" && (
            <p className="mx-auto mt-4 max-w-xl text-house-body text-on-cream-body">
              {activeDescription}
            </p>
          )}
          <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-on-cream-muted">
            <span className="tabular-nums text-[#524a28]">{pieceCountLabel}</span>
            {activeCategory === "all" && (
              <>
                {" · "}
                {getFunctionalCategories().length} categories
              </>
            )}
          </p>
        </div>

        <div className="mb-10 md:mb-12">
          <AtelierSalonFilters
            category={activeCategory}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedFilters={selectedFilters}
            onSelectedFiltersChange={setSelectedFilters}
            resultCount={categoryPieces.length}
            totalCount={categoryBasePieces.length}
          />
        </div>

        {categoryBasePieces.length === 0 ? (
          <div className="mx-auto max-w-md text-center">
            <p className="font-editorial text-[1.125rem] tracking-[0.04em] text-[#1d3c34]">
              Pieces in this category are being prepared
            </p>
            <p className="mt-3 text-house-body text-on-cream-body">
              Enquire for availability or explore another category from the Fine
              Jewelry menu above.
            </p>
          </div>
        ) : categoryPieces.length === 0 ? (
          <div className="mx-auto max-w-md text-center">
            <p className="font-editorial text-[1.125rem] tracking-[0.04em] text-[#1d3c34]">
              No pieces match these salon filters
            </p>
            <p className="mt-3 text-house-body text-on-cream-body">
              Clear search or filters to see the full selection in this category.
            </p>
          </div>
        ) : activeCategory === "bracelets" ? (
          <div className="flex flex-col gap-16 md:gap-20">
            {BRACELET_SECTIONS.map(({ kind, title }) => {
              const sectionPieces = sortAtelierPiecesByWell(
                categoryPieces.filter((piece) => piece.braceletKind === kind),
              );
              if (sectionPieces.length === 0) return null;
              return (
                <div key={kind}>
                  <h3 className="mb-10 text-center font-editorial text-[clamp(1.15rem,2.5vw,1.5rem)] tracking-[0.1em] text-[#1d3c34] md:mb-12">
                    {title}
                  </h3>
                  <ul className="grid w-full min-w-0 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {sectionPieces.map((piece) =>
                      renderPieceCard(
                        piece,
                        openPiece,
                        displayImageForPiece(piece, selectedFilters),
                      ),
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <ul className="grid w-full min-w-0 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {categoryPieces.map((piece) =>
              renderPieceCard(
                piece,
                openPiece,
                displayImageForPiece(piece, selectedFilters),
              ),
            )}
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

      <AtelierSalonHint hidden={lightboxOpen} />
    </section>
  );
}
