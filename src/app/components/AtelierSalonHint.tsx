import { createPortal } from "react-dom";
import { ZoomIn } from "lucide-react";
import { useShowcaseInView } from "../hooks/useShowcaseInView";

type Props = {
  /** Hide while the salon lightbox is open */
  hidden?: boolean;
};

/**
 * Fixed guidance strip while the showcase is on screen.
 * Portaled to document.body so mobile overflow rules do not clip it.
 */
export default function AtelierSalonHint({ hidden = false }: Props) {
  const showcaseInView = useShowcaseInView();

  if (hidden || !showcaseInView) return null;

  return createPortal(
    <div
      role="note"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:px-6"
    >
      <p className="pointer-events-auto flex max-w-2xl items-center gap-2.5 border border-[#766d42]/45 bg-[#f4f0e6]/97 px-3.5 py-2.5 shadow-[0_-4px_24px_rgba(29,60,52,0.12)] backdrop-blur-sm sm:gap-3 sm:px-5 sm:py-3">
        <ZoomIn
          className="size-4 shrink-0 text-[#766d42] sm:size-[18px]"
          strokeWidth={1.25}
          aria-hidden
        />
        <span className="text-left text-[10px] leading-snug tracking-[0.06em] text-[#2d4039] sm:text-[11px] sm:leading-relaxed md:text-center md:tracking-[0.08em]">
          <span className="font-medium uppercase text-[#1d3c34] md:hidden">
            Tap any piece
          </span>
          <span className="hidden font-medium uppercase text-[#1d3c34] md:inline">
            Select any piece
          </span>
          {" · "}
          <span className="text-[#4a5c56]">
            View enlarged in the salon, then send a price enquiry on WhatsApp
          </span>
        </span>
      </p>
    </div>,
    document.body,
  );
}
