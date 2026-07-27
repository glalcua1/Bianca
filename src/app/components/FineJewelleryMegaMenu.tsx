import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { X } from "lucide-react";
import ProtectedImage from "./protection/ProtectedImage";
import { ATELIER_IMAGE_SIZES } from "../lib/optimizedImage";
import {
  fineJewelleryCategoryPath,
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
      className={`${stacked ? "flex flex-col gap-5" : "grid grid-cols-[minmax(200px,260px)_minmax(180px,240px)] items-start gap-6 lg:gap-8"} ${className}`}
      role="region"
      aria-label="Fine jewellery collections"
    >
      <nav aria-label="Jewellery categories">
        <ul className="space-y-0">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <li key={category.id}>
                <Link
                  to={category.href}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onFocus={() => setActiveCategory(category.id)}
                  onClick={onNavigate}
                  className={`group block border-l-2 py-1.5 pl-3.5 pr-2 transition duration-300 ${
                    isActive
                      ? "border-[#766d42] bg-[#f4f0e6]/90"
                      : "border-transparent hover:border-[#766d42]/50 hover:bg-[#f4f0e6]/50"
                  }`}
                >
                  <span className="font-editorial text-[13px] tracking-[0.08em] text-[#1d3c34]">
                    {category.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <ul className="grid grid-cols-2 gap-1.5 sm:gap-2">
        {previewPieces.map((piece) => (
          <li key={piece.id}>
            <Link
              to={
                activeCategory === "all"
                  ? fineJewelleryCategoryPath(piece.category)
                  : fineJewelleryCategoryPath(activeCategory)
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
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

/**
 * Bottom edge of the visible site header in viewport px.
 * Prefers live geometry so The House artboard nav (CSS-scaled, no fixed
 * shell) and SiteNav pages share one anchor for the mega menu.
 */
function readSiteNavBottom(): number {
  if (typeof document === "undefined") return 0;

  const shellBottom =
    document
      .querySelector<HTMLElement>("[data-site-nav-shell]")
      ?.getBoundingClientRect().bottom ?? 0;

  // Homepage MacBook artboard header band (transform-aware).
  const bandBottom =
    document
      .querySelector<HTMLElement>("[data-site-nav-band]")
      ?.getBoundingClientRect().bottom ?? 0;

  const liveBottom = Math.max(shellBottom, bandBottom);
  if (liveBottom > 1) return liveBottom;

  const cssOffset = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      "--site-nav-offset",
    ),
  );

  return Math.max(0, Number.isFinite(cssOffset) ? cssOffset : 0);
}

/** Full-width panel anchored beneath the site header (portaled — escapes scaled nav transforms). */
export function FineJewelleryMegaMenuFloating({
  open,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: FloatingProps) {
  const [panelTop, setPanelTop] = useState(0);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    let raf = 0;
    const update = () => {
      raf = 0;
      setPanelTop(readSiteNavBottom());
    };
    const scheduleUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const roundedTop = Math.round(panelTop);
  const panelTopStyle =
    roundedTop > 0 ? `${roundedTop}px` : "var(--site-nav-offset, 0px)";
  const panelMaxHeight =
    roundedTop > 0
      ? `calc(100dvh - ${roundedTop}px)`
      : "calc(100dvh - var(--site-nav-offset, 0px))";

  return createPortal(
    <>
      {/* Backdrop starts below the header so nav/logo are never dimmed or blurred */}
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 z-[90] cursor-default bg-[#0f1f1b]/25 backdrop-blur-[2px]"
        style={{ top: panelTopStyle }}
        aria-label="Close menu"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 z-[95] overflow-y-auto border-b border-[#766d42]/20 bg-[#faf8f5] shadow-[0_24px_64px_rgba(13,28,24,0.14)]"
        style={{ top: panelTopStyle, maxHeight: panelMaxHeight }}
        role="dialog"
        aria-label="Fine jewellery collections"
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
      >
        <div className="relative mx-auto max-w-4xl px-6 py-5 pr-14 md:px-8 md:py-6 md:pr-14">
          <button
            type="button"
            className="absolute right-4 top-4 inline-flex size-9 items-center justify-center border border-[#766d42]/35 text-[#1d3c34] transition duration-150 hover:border-[#766d42] hover:bg-[#f4f0e6] hover:text-[#766d42] motion-reduce:transition-none md:right-6 md:top-6"
            aria-label="Close fine jewellery menu"
            onClick={onClose}
          >
            <X className="size-4" strokeWidth={1.35} />
          </button>
          <FineJewelleryMegaMenuPanel onNavigate={onClose} />
        </div>
      </div>
    </>,
    document.body,
  );
}
