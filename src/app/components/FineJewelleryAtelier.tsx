import { useMemo } from "react";
import CollectionPhotoFrame from "./CollectionPhotoFrame";
import {
  ATELIER_PIECES,
  FINE_JEWELLERY_CATEGORIES,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";

type Props = {
  activeCategory: JewelleryCategoryId | "all";
  onCategoryChange: (category: JewelleryCategoryId | "all") => void;
};

export default function FineJewelleryAtelier({
  activeCategory,
  onCategoryChange,
}: Props) {
  const filteredPieces = useMemo(
    () =>
      activeCategory === "all"
        ? ATELIER_PIECES
        : ATELIER_PIECES.filter((piece) => piece.category === activeCategory),
    [activeCategory],
  );

  const activeLabel =
    activeCategory === "all"
      ? "All pieces"
      : FINE_JEWELLERY_CATEGORIES.find((c) => c.id === activeCategory)?.title ??
        "";

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
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
          id="categories"
          className="mb-12 flex flex-nowrap items-center justify-center gap-2 overflow-x-auto pb-1 md:mb-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
        ) : (
          <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {filteredPieces.map((piece) => (
              <li key={piece.id} className="flex flex-col items-center">
                <CollectionPhotoFrame
                  fluid
                  darkImageWell={piece.category === "necklaces"}
                  src={piece.image}
                  alt={piece.alt}
                  data-name={piece.id}
                />
                <div className="mt-8 w-full max-w-[22rem] text-center">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold-on-cream">
                    {FINE_JEWELLERY_CATEGORIES.find(
                      (c) => c.id === piece.category,
                    )?.title ?? piece.category}
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
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
