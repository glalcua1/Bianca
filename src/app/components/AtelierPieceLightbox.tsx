import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AtelierSalonPanel from "./AtelierSalonPanel";
import BrandImageWatermark from "./BrandImageWatermark";
import ProtectedImage from "./protection/ProtectedImage";
import SalonJewelVideo from "./SalonJewelVideo";
import type { AtelierPiece, MetalVariantId } from "../data/fineJewelleryCollections";
import {
  atelierPieceHasMetalVariants,
  atelierPieceMetalVariants,
  atelierPieceViews,
  isSalonFilmPath,
  resolveAtelierMetalVariant,
} from "../data/fineJewelleryCollections";
import { consultationSourcePage } from "../data/siteContact";
import { openAtelierPiecePriceEnquiry } from "../lib/atelierEnquiry";

type Props = {
  pieces: AtelierPiece[];
  activeIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActiveIndexChange: (index: number) => void;
};

/** Shared well — fills the available media cell so every piece is the same size. */
const SALON_MEDIA_FRAME =
  "relative mx-auto flex size-full max-h-full max-w-full items-center justify-center overflow-hidden [&_img]:max-h-full [&_img]:max-w-full [&_img]:object-contain [&_picture]:flex [&_picture]:size-full [&_picture]:items-center [&_picture]:justify-center [&_video]:max-h-full [&_video]:max-w-full [&_video]:object-contain";

const SALON_IMAGE_CLASS =
  "max-h-full max-w-full object-contain object-center transition-opacity duration-300 motion-reduce:transition-none";

function pieceBackdrop(piece: AtelierPiece): string {
  if (piece.imageWellColor) return piece.imageWellColor;
  if (piece.category === "necklaces") return "#0a0a0a";
  return "#faf8f5";
}

export default function AtelierPieceLightbox({
  pieces,
  activeIndex,
  open,
  onOpenChange,
  onActiveIndexChange,
}: Props) {
  const location = useLocation();
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [viewIndex, setViewIndex] = useState(0);
  const [metalVariantId, setMetalVariantId] = useState<MetalVariantId | undefined>();
  const total = pieces.length;
  const safeIndex =
    total === 0 ? 0 : Math.min(Math.max(activeIndex, 0), total - 1);
  const piece = pieces[safeIndex] ?? null;
  const metalVariants = piece ? atelierPieceMetalVariants(piece) : [];
  const hasMetalVariants = piece ? atelierPieceHasMetalVariants(piece) : false;
  const activeMetalVariant = piece
    ? resolveAtelierMetalVariant(piece, metalVariantId)
    : null;
  const views = piece ? atelierPieceViews(piece, activeMetalVariant?.id) : [];
  const safeViewIndex =
    views.length === 0 ? 0 : Math.min(Math.max(viewIndex, 0), views.length - 1);
  const activeView = views[safeViewIndex] ?? piece?.image ?? "";
  const activeIsVideo = isSalonFilmPath(activeView);
  const hasMultipleViews = views.length > 1;
  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < total - 1;
  const hasPrevView = safeViewIndex > 0;
  const hasNextView = safeViewIndex < views.length - 1;

  useEffect(() => {
    setViewIndex(0);
    setMetalVariantId(undefined);
  }, [piece?.id]);

  useEffect(() => {
    setViewIndex(0);
  }, [activeMetalVariant?.id]);

  const goPrevView = useCallback(() => {
    if (hasPrevView) setViewIndex((index) => index - 1);
  }, [hasPrevView]);

  const goNextView = useCallback(() => {
    if (hasNextView) setViewIndex((index) => index + 1);
  }, [hasNextView]);

  const goPrev = useCallback(() => {
    if (hasPrev) onActiveIndexChange(safeIndex - 1);
  }, [safeIndex, hasPrev, onActiveIndexChange]);

  const goNext = useCallback(() => {
    if (hasNext) onActiveIndexChange(safeIndex + 1);
  }, [safeIndex, hasNext, onActiveIndexChange]);

  const handlePriceEnquiry = useCallback(async () => {
    if (!piece || enquiryLoading) return;
    setEnquiryLoading(true);
    try {
      await openAtelierPiecePriceEnquiry(
        piece,
        consultationSourcePage(location.pathname),
      );
    } finally {
      setEnquiryLoading(false);
    }
  }, [piece, enquiryLoading, location.pathname]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        if (hasPrevView) goPrevView();
        else goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        if (hasNextView) goNextView();
        else goNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext, goPrevView, goNextView, hasPrevView, hasNextView]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-[#0f1f1b]/94 backdrop-blur-[2px] transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none" />

        <Dialog.Content
          className="pointer-events-none fixed inset-0 z-[110] flex flex-col outline-none"
          aria-describedby={piece ? "atelier-lightbox-description" : undefined}
          onOpenAutoFocus={(event) => {
            // Keep the overlay pinned to the top; avoid focus scrolling mid-panel.
            event.preventDefault();
          }}
        >
          {piece && total > 0 && (
            <div className="pointer-events-auto flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col bg-[#1d3c34] pt-[env(safe-area-inset-top)]">
              <header className="flex shrink-0 items-center justify-between gap-3 border-b border-[#766d42]/35 px-3 py-2 sm:px-5">
                <Dialog.Title className="text-[10px] uppercase tracking-[0.2em] text-[#dccb7b]">
                  Salon view
                  <span className="text-[#faf8f5]/50"> · </span>
                  <span className="text-[#faf8f5]/75 tabular-nums">
                    {safeIndex + 1} / {total}
                  </span>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex size-9 items-center justify-center border border-[#dccb7b]/40 text-[#f4f0e6] transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] motion-reduce:transition-none"
                    aria-label="Close"
                  >
                    <X className="size-4" strokeWidth={1.25} />
                  </button>
                </Dialog.Close>
              </header>

              {/* Mobile: capped image well + remaining space for details/CTA. Desktop: side-by-side. */}
              <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,36dvh)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1.618fr)_minmax(0,1fr)] lg:grid-rows-1">
                <div
                  className="relative flex min-h-0 flex-col overflow-hidden border-b border-[#766d42]/30 lg:border-b-0 lg:border-r"
                  style={{ backgroundColor: pieceBackdrop(piece) }}
                >
                  <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-2 sm:p-5 lg:p-6">
                    {activeIsVideo ? (
                      <div className={SALON_MEDIA_FRAME}>
                        <SalonJewelVideo
                          key={`${piece.id}-${safeViewIndex}`}
                          src={activeView}
                          ariaLabel={piece.alt}
                          objectFit="contain"
                          autoPlay={false}
                          controlPosition="bottom-center"
                        />
                      </div>
                    ) : (
                      <ProtectedImage
                        key={`${piece.id}-${activeMetalVariant?.id ?? "default"}-${safeViewIndex}`}
                        wrapperClassName={SALON_MEDIA_FRAME}
                        src={activeView}
                        alt={
                          hasMultipleViews
                            ? `${piece.alt} — view ${safeViewIndex + 1} of ${views.length}`
                            : piece.alt
                        }
                        sizes="(max-width: 1024px) 95vw, 62vw"
                        loading="eager"
                        decoding="async"
                        priority
                        className={SALON_IMAGE_CLASS}
                      />
                    )}
                  </div>

                  {(hasMetalVariants || hasMultipleViews) && (
                    <div className="relative z-20 flex shrink-0 flex-col items-center gap-2 border-t border-[#766d42]/20 px-3 py-2 sm:gap-2.5 sm:px-5 sm:py-3">
                      {hasMetalVariants ? (
                        <div
                          className="flex flex-wrap items-center justify-center gap-1.5"
                          role="tablist"
                          aria-label="Metal finish"
                        >
                          {metalVariants.map((variant) => {
                            const isActive = activeMetalVariant?.id === variant.id;
                            return (
                              <button
                                key={variant.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                className={`border px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] transition duration-150 motion-reduce:transition-none ${
                                  isActive
                                    ? "border-[#dccb7b] bg-[#1d3c34]/70 text-[#faf8f5]"
                                    : "border-[#766d42]/35 bg-transparent text-[#faf8f5]/72 hover:border-[#dccb7b]/55 hover:text-[#faf8f5]"
                                }`}
                                onClick={() => setMetalVariantId(variant.id)}
                              >
                                {variant.label}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {hasMultipleViews ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={goPrevView}
                            disabled={!hasPrevView}
                            className="inline-flex size-8 items-center justify-center border border-[#dccb7b]/35 text-[#f4f0e6] transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
                            aria-label="Previous view"
                          >
                            <ChevronLeft className="size-4" strokeWidth={1.25} />
                          </button>
                          <p className="min-w-[5.5rem] text-center text-[9px] uppercase tracking-[0.2em] text-[#dccb7b]/85 tabular-nums">
                            View {safeViewIndex + 1} / {views.length}
                          </p>
                          <button
                            type="button"
                            onClick={goNextView}
                            disabled={!hasNextView}
                            className="inline-flex size-8 items-center justify-center border border-[#dccb7b]/35 text-[#f4f0e6] transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none"
                            aria-label="Next view"
                          >
                            <ChevronRight className="size-4" strokeWidth={1.25} />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {hasPrev && (
                    <button
                      type="button"
                      onClick={goPrev}
                      className="absolute left-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center border border-[#dccb7b]/45 bg-[#1d3c34]/80 text-[#f4f0e6] backdrop-blur-sm transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] motion-reduce:transition-none sm:left-5 sm:size-11"
                      aria-label="Previous piece"
                    >
                      <ChevronLeft className="size-5" strokeWidth={1.25} />
                    </button>
                  )}

                  {hasNext && (
                    <button
                      type="button"
                      onClick={goNext}
                      className="absolute right-3 top-1/2 z-20 inline-flex size-10 -translate-y-1/2 items-center justify-center border border-[#dccb7b]/45 bg-[#1d3c34]/80 text-[#f4f0e6] backdrop-blur-sm transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] motion-reduce:transition-none sm:right-5 sm:size-11 lg:right-4"
                      aria-label="Next piece"
                    >
                      <ChevronRight className="size-5" strokeWidth={1.25} />
                    </button>
                  )}

                  <BrandImageWatermark className="bottom-5 right-5 z-20 sm:bottom-6 sm:right-6" />
                </div>

                <div className="flex min-h-0 flex-col overflow-hidden bg-[#f4f0e6]">
                  <AtelierSalonPanel
                    piece={piece}
                    selectedMetalLabel={activeMetalVariant?.label}
                    onEnquire={handlePriceEnquiry}
                    enquiryLoading={enquiryLoading}
                  />
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
