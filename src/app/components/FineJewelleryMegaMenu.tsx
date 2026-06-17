import { useState } from "react";
import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import { ATELIER_IMAGE_SIZES } from "../lib/optimizedImage";
import {
  FINE_JEWELLERY_EDITORIAL,
  getMegaMenuCategories,
  megaMenuPieceWell,
  previewPiecesForCategory,
  type MegaMenuCategoryId,
} from "../data/fineJewelleryMegaMenu";

type PanelProps = {
  onNavigate?: () => void;
  layout?: "horizontal" | "stacked";
  className?: string;
};

export function FineJewelleryMegaMenuPanel({
  onNavigate,
  layout = "horizontal",
  className = "",
}: PanelProps) {
  const stacked = layout === "stacked";
  const categories = getMegaMenuCategories();
  const [activeCategory, setActiveCategory] = useState<MegaMenuCategoryId>(
    categories[0]?.id ?? "all",
  );
  const previewPieces = previewPiecesForCategory(activeCategory, 4);

  return (
    <div
      className={`${stacked ? "flex flex-col gap-8" : "grid grid-cols-[minmax(240px,340px)_minmax(200px,280px)] items-start gap-10 lg:gap-14"} ${className}`}
      role="region"
      aria-label="Fine jewellery collections"
    >
      <div>
        <p className="text-[9px] uppercase tracking-[0.32em] text-[#766d42]">
          {FINE_JEWELLERY_EDITORIAL.eyebrow}
        </p>
        <h2 className="mt-3 font-editorial text-[clamp(1.35rem,2.5vw,1.75rem)] leading-snug tracking-[0.06em] text-[#1d3c34]">
          {FINE_JEWELLERY_EDITORIAL.title}
        </h2>
        <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-on-cream-body">
          {FINE_JEWELLERY_EDITORIAL.description}
        </p>

        <nav aria-label="Jewellery categories" className="mt-8">
          <ul className="space-y-0.5">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <li key={category.id}>
                  <Link
                    to={category.href}
                    onMouseEnter={() => setActiveCategory(category.id)}
                    onFocus={() => setActiveCategory(category.id)}
                    onClick={onNavigate}
                    className={`group block border-l-2 py-2 pl-4 pr-2 transition duration-300 ${
                      isActive
                        ? "border-[#766d42] bg-[#f4f0e6]/90"
                        : "border-transparent hover:border-[#766d42]/50 hover:bg-[#f4f0e6]/50"
                    }`}
                  >
                    <span className="font-editorial text-[14px] tracking-[0.08em] text-[#1d3c34]">
                      {category.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <ul className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {previewPieces.map((piece) => (
          <li key={piece.id}>
            <Link
              to={
                activeCategory === "all"
                  ? `/fine-jewellery#${piece.category}`
                  : `/fine-jewellery#${activeCategory}`
              }
              onClick={onNavigate}
              className="group block aspect-square overflow-hidden transition duration-300 hover:opacity-95"
              style={{ backgroundColor: megaMenuPieceWell(piece) }}
              aria-label={piece.title}
            >
              <ProtectedImage
                wrapperClassName="flex h-full w-full items-center justify-center p-2"
                src={piece.image}
                alt=""
                sizes={ATELIER_IMAGE_SIZES}
                className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type FloatingProps = {
  open: boolean;
  onClose: () => void;
};

/** Full-width panel anchored beneath the site header. */
export function FineJewelleryMegaMenuFloating({ open, onClose }: FloatingProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[54] cursor-default bg-[#0f1f1b]/20 backdrop-blur-[1px]"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 z-[55] border-b border-[#766d42]/20 bg-[#faf8f5] shadow-[0_24px_64px_rgba(13,28,24,0.14)] transition duration-300"
        style={{ top: "var(--site-nav-offset, 0px)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-9">
          <FineJewelleryMegaMenuPanel onNavigate={onClose} />
        </div>
      </div>
    </>
  );
}
