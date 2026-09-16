import { useCallback, useState } from "react";
import { Check, Share2 } from "lucide-react";
import type { AtelierPiece } from "../data/fineJewelleryCollections";
import {
  atelierPieceShareUrl,
  copyTextToClipboard,
} from "../lib/atelierShare";

type Variant = "header" | "panel";

type Props = {
  piece: AtelierPiece;
  variant: Variant;
};

export default function AtelierPieceShareControl({ piece, variant }: Props) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const share = useCallback(async () => {
    const url = atelierPieceShareUrl(piece);
    const title = `${piece.title} | Bianca Diamonds`;
    const text = `${piece.title} — ${piece.productCode}\n${url}`;

    const copiedOk = await copyTextToClipboard(url);

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          /* native share unavailable; clipboard is the fallback */
        }
      }
    }

    if (copiedOk) {
      setFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
      return;
    }
    setFailed(true);
    window.setTimeout(() => setFailed(false), 2800);
  }, [piece]);

  if (variant === "header") {
    return (
      <button
        type="button"
        onClick={() => void share()}
        className="inline-flex size-9 items-center justify-center border border-[#dccb7b]/40 text-[#f4f0e6] transition duration-150 hover:border-[#dccb7b] hover:text-[#dccb7b] motion-reduce:transition-none"
        aria-label={
          copied ? "Salon link copied" : failed ? "Could not copy link" : "Share salon link"
        }
      >
        {copied ? (
          <Check className="size-4 text-[#dccb7b]" strokeWidth={1.25} />
        ) : (
          <Share2 className="size-4" strokeWidth={1.25} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void share()}
      className="mt-3 flex w-full min-h-11 items-center justify-center gap-2 border border-[#766d42]/35 bg-transparent px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1d3c34] transition duration-200 hover:border-[#766d42]/70 hover:bg-[#faf8f5] disabled:opacity-60 motion-reduce:transition-none"
    >
      {copied ? (
        <Check className="size-3.5 text-[#766d42]" strokeWidth={1.5} />
      ) : (
        <Share2 className="size-3.5 text-[#766d42]" strokeWidth={1.5} />
      )}
      {copied ? "Link copied" : failed ? "Copy failed — try again" : "Share salon link"}
    </button>
  );
}
