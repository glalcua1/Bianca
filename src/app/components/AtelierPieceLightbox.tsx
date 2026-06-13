import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AtelierSalonPanel from "./AtelierSalonPanel";
import BrandImageWatermark from "./BrandImageWatermark";
import ProtectedImage from "./protection/ProtectedImage";
import type { AtelierPiece } from "../data/fineJewelleryCollections";
import { PHI_INV } from "../lib/goldenRatioLayout";
import { consultationSourcePage } from "../data/siteContact";
import { openAtelierPiecePriceEnquiry } from "../lib/atelierEnquiry";

type Props = {
  pieces: AtelierPiece[];
  activeIndex: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActiveIndexChange: (index: number) => void;
};

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
  const total = pieces.length;
  const safeIndex =
    total === 0 ? 0 : Math.min(Math.max(activeIndex, 0), total - 1);
  const piece = pieces[safeIndex] ?? null;
  const hasPrev = safeIndex > 0;
  const hasNext = safeIndex < total - 1;

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
        goPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, goPrev, goNext]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#0f1f1b]/94 backdrop-blur-[2px] transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none" />

        <Dialog.Content
          className="fixed inset-0 z-[61] flex flex-col outline-none pointer-events-none"
          aria-describedby={piece ? "atelier-lightbox-description" : undefined}
        >
          {piece && total > 0 && (
            <div className="pointer-events-auto flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col bg-[#1d3c34]">
              {/* Slim chrome bar */}
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

              {/*
                Golden-ratio split: image φ (61.8%) · details 1 (38.2%)
                Mobile: image top, details below
              */}
              <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(38vh,1fr)_auto] lg:grid-cols-[minmax(0,1.618fr)_minmax(0,1fr)] lg:grid-rows-1">
                {/* —— Image well (left / top) —— */}
                <div
                  className="relative flex min-h-0 flex-col border-b border-[#766d42]/30 lg:border-b-0 lg:border-r"
                  style={{ backgroundColor: pieceBackdrop(piece) }}
                >
                  {/* φ construction guides */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] opacity-[0.06]"
                    aria-hidden
                    style={{
                      backgroundImage: `
                        linear-gradient(90deg, transparent calc(${PHI_INV * 100}% - 1px), #766d42 calc(${PHI_INV * 100}% - 1px), #766d42 ${PHI_INV * 100}%, transparent ${PHI_INV * 100}%),
                        linear-gradient(0deg, transparent calc(${PHI_INV * 100}% - 1px), #766d42 calc(${PHI_INV * 100}% - 1px), #766d42 ${PHI_INV * 100}%, transparent ${PHI_INV * 100}%)
                      `,
                    }}
                  />

                  <div className="relative z-[2] flex min-h-0 flex-1 items-stretch p-3 sm:p-5 lg:p-6">
                    {/* Gilt salon frame */}
                    <div className="flex min-h-0 flex-1 flex-col border border-[#766d42]/55 bg-[#f4f0e6] p-[3px] shadow-[inset_0_0_0_1px_rgba(220,203,123,0.15)]">
                      <div className="flex min-h-0 flex-1 border border-[#766d42]/25 bg-[#faf8f5] p-3 sm:p-4 md:p-5">
                        <ProtectedImage
                          key={piece.id}
                          wrapperClassName="flex h-full min-h-[200px] w-full items-center justify-center"
                          src={piece.image}
                          alt={piece.alt}
                          loading="eager"
                          decoding="async"
                          priority
                          className="max-h-full max-w-full object-contain object-center transition-opacity duration-300 motion-reduce:transition-none"
                        />
                      </div>
                    </div>
                  </div>

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

                {/* —— Details column (right / bottom) —— */}
                <div className="flex min-h-0 flex-col overflow-hidden bg-[#f4f0e6] lg:max-h-full">
                  <AtelierSalonPanel
                    piece={piece}
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
