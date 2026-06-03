import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import BrandImageWatermark from "./BrandImageWatermark";
import ProtectedImage from "./protection/ProtectedImage";
import {
  atelierPieceEyebrow,
  type AtelierPiece,
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
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-[#0f1f1b]/94 backdrop-blur-[2px] transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />

        <Dialog.Content
          className="fixed inset-0 z-[61] flex flex-col outline-none pointer-events-none"
          aria-describedby={piece ? "atelier-lightbox-description" : undefined}
        >
          {piece && total > 0 && (
            <div className="pointer-events-auto flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col">
              {/* Compact salon bar */}
              <header className="flex shrink-0 items-center gap-3 border-b border-[#766d42]/35 bg-[#1d3c34] px-3 py-2 sm:px-5 sm:py-2.5">
                <div className="min-w-0 flex-1">
                  <Dialog.Title className="truncate font-editorial text-[0.95rem] tracking-[0.06em] text-[#faf8f5] sm:text-base">
                    {piece.title}
                  </Dialog.Title>
                  <p className="mt-0.5 truncate text-[9px] uppercase tracking-[0.18em] text-[#dccb7b] sm:text-[10px]">
                    {atelierPieceEyebrow(piece)}
                    <span className="text-[#faf8f5]/45"> · </span>
                    <span className="text-[#faf8f5]/70">
                      {safeIndex + 1} / {total}
                    </span>
                  </p>
                </div>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="inline-flex size-9 shrink-0 items-center justify-center border border-[#dccb7b]/40 text-[#f4f0e6] transition duration-300 hover:border-[#dccb7b] hover:text-[#dccb7b]"
                    aria-label="Close"
                  >
                    <X className="size-4" strokeWidth={1.25} />
                  </button>
                </Dialog.Close>
              </header>

              {/* Hero — flex-1 fills space between header and footer; image must stay inside */}
              <div
                className="relative flex min-h-0 flex-1 overflow-hidden"
                style={{ backgroundColor: pieceBackdrop(piece) }}
              >
                {hasPrev && (
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-[#dccb7b]/45 bg-[#1d3c34]/75 text-[#f4f0e6] backdrop-blur-sm transition duration-300 hover:border-[#dccb7b] hover:bg-[#1d3c34] hover:text-[#dccb7b] sm:left-4 sm:size-12"
                    aria-label="Previous piece"
                  >
                    <ChevronLeft className="size-6" strokeWidth={1.25} />
                  </button>
                )}

                <ProtectedImage
                  key={piece.id}
                  wrapperClassName="flex h-full min-h-0 w-full items-center justify-center overflow-hidden px-12 py-3 sm:px-16 sm:py-4 md:px-20"
                  src={piece.image}
                  alt={piece.alt}
                  loading="eager"
                  decoding="async"
                  priority
                  className="h-full w-full object-contain object-center"
                />

                {hasNext && (
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center border border-[#dccb7b]/45 bg-[#1d3c34]/75 text-[#f4f0e6] backdrop-blur-sm transition duration-300 hover:border-[#dccb7b] hover:bg-[#1d3c34] hover:text-[#dccb7b] sm:right-4 sm:size-12"
                    aria-label="Next piece"
                  >
                    <ChevronRight className="size-6" strokeWidth={1.25} />
                  </button>
                )}

                <BrandImageWatermark className="bottom-6 right-6 md:bottom-8 md:right-8" />
              </div>

              {/* Caption — always reserved; hero image cannot overlap */}
              <footer className="relative z-10 max-h-[min(32dvh,280px)] shrink-0 overflow-y-auto border-t border-[#766d42]/35 bg-[#f4f0e6] px-4 py-3 sm:px-6 sm:py-4">
                <p
                  id="atelier-lightbox-description"
                  className="text-center text-[0.8125rem] leading-[1.65] tracking-[0.02em] text-[#2d4039] sm:text-[14px]"
                >
                  {piece.description}
                </p>
                <p className="mt-2 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-[#524a28] sm:mt-2.5">
                  {piece.productCode}
                </p>
                <div className="mt-4 flex justify-center sm:mt-5">
                  <button
                    type="button"
                    onClick={handlePriceEnquiry}
                    disabled={enquiryLoading}
                    className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#766d42]/50 bg-[#1d3c34] px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#faf8f5] transition duration-300 hover:border-[#766d42] hover:bg-[#1d3c34]/95 hover:text-[#e8d88a] disabled:opacity-60 sm:px-6 sm:text-[11px]"
                  >
                    <MessageCircle
                      className="size-4 shrink-0 text-[#dccb7b]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    {enquiryLoading
                      ? "Opening WhatsApp…"
                      : "Chat to know the price"}
                  </button>
                </div>
                <p className="mt-3 text-center text-[9px] leading-relaxed tracking-[0.04em] text-[#4a5c56]">
                  Your piece details and reference image will be included in
                  WhatsApp.
                </p>
              </footer>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
