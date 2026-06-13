import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MessageCircle } from "lucide-react";
import type { AtelierPiece } from "../data/fineJewelleryCollections";
import { atelierPieceEyebrow } from "../data/fineJewelleryCollections";
import { getRingQuote, formatRingPriceInr } from "../data/ringQuotes";
import { buildCustomerRingDetails } from "../lib/ringQuoteCopy";

type Props = {
  piece: AtelierPiece;
  onEnquire: () => void;
  enquiryLoading: boolean;
};

function SalonSpec({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-8 border-b border-[#766d42]/12 py-[1.125rem] last:border-0">
      <p className="shrink-0 pt-0.5 text-[9px] uppercase tracking-[0.22em] text-gold-on-cream">
        {label}
      </p>
      <div className="min-w-0 text-right">
        <p className="font-editorial text-[1.0625rem] leading-snug tracking-[0.02em] text-bianca-forest sm:text-[1.125rem]">
          {value}
        </p>
        {detail ? (
          <p className="mt-1 text-[10px] leading-relaxed tracking-[0.08em] text-on-cream-muted normal-case">
            {detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function OrnamentalRule({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#766d42]/25" />
      <span className="size-1 rotate-45 bg-[#dccb7b]/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#766d42]/25" />
    </div>
  );
}

export default function AtelierSalonPanel({
  piece,
  onEnquire,
  enquiryLoading,
}: Props) {
  const reduceMotion = useReducedMotion();
  const quote = piece.category === "rings" ? getRingQuote(piece.productCode) : undefined;
  const details = quote ? buildCustomerRingDetails(quote) : null;
  const guidePriceInr = quote?.priceInr ?? piece.salonPriceInr;
  const guidePriceLabel = guidePriceInr ? formatRingPriceInr(guidePriceInr) : null;
  const hasFilmSpecs = Boolean(piece.gemstoneSpec || piece.goldSpec);

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 }, exit: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -12 },
        transition: { duration: 0.28, ease: [0, 0, 0.2, 1] as const },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={piece.id}
        {...motionProps}
        className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#f4f0e6] via-[#f7f3ec] to-[#faf8f5]"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Title */}
        <div className="shrink-0 px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
          <p className="text-[9px] uppercase tracking-[0.28em] text-gold-on-cream">
            {atelierPieceEyebrow(piece)}
          </p>
          <h2 className="mt-3 font-editorial text-[clamp(1.35rem,3.2vw,1.875rem)] leading-[1.12] tracking-[0.03em] text-bianca-forest">
            {piece.title}
          </h2>
          <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-[#766d42]/65">
            {piece.productCode}
          </p>
        </div>

        {details ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Salon valuation — discreet catalogue strip */}
            <div className="shrink-0 px-6 sm:px-8">
              <div className="border border-[#766d42]/18 bg-white/50 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.28em] text-gold-on-cream">
                      Salon valuation
                    </p>
                    <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-on-cream-muted">
                      Indicative guide
                      <span className="mx-1.5 text-[#766d42]/35">·</span>
                      Ref. {details.reference}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-editorial text-[1.2rem] leading-none tracking-[0.02em] text-bianca-forest sm:text-[1.3125rem]">
                      <span className="tabular-nums">{details.priceLabel}</span>
                    </p>
                    <p className="mt-1.5 text-[8px] leading-relaxed tracking-[0.06em] text-on-cream-muted normal-case">
                      {details.priceGstNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Composition */}
            <div
              id="atelier-lightbox-description"
              className="min-h-0 flex-1 overflow-y-auto px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-7"
            >
              <OrnamentalRule />
              <p className="mt-5 text-center text-[9px] uppercase tracking-[0.26em] text-gold-on-cream">
                Composition
              </p>
              <div className="mt-5 border-t border-[#766d42]/18">
                <SalonSpec
                  label="Gold weight"
                  value={details.goldWeightLine}
                  detail={details.goldKaratLine}
                />
                <SalonSpec
                  label={details.diamondsTotalLabel}
                  value={details.diamondsTotalLine}
                  detail={details.diamondsPiecesLine}
                />
                {details.centrePieceLine ? (
                  <SalonSpec
                    label={details.centrePieceLabel ?? "Centre piece"}
                    value={details.centrePieceLine}
                    detail={details.centrePieceDetail ?? undefined}
                  />
                ) : null}
              </div>
              <OrnamentalRule className="mt-6" />
            </div>
          </div>
        ) : guidePriceLabel && hasFilmSpecs ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0 px-6 sm:px-8">
              <div className="border border-[#766d42]/18 bg-white/50 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.28em] text-gold-on-cream">
                      Salon valuation
                    </p>
                    <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-on-cream-muted">
                      Indicative guide
                      <span className="mx-1.5 text-[#766d42]/35">·</span>
                      Ref. {piece.productCode}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-editorial text-[1.2rem] leading-none tracking-[0.02em] text-bianca-forest sm:text-[1.3125rem]">
                      <span className="tabular-nums">{guidePriceLabel}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="atelier-lightbox-description"
              className="min-h-0 flex-1 overflow-y-auto px-6 pt-5 pb-6 sm:px-8 sm:pt-6 sm:pb-7"
            >
              <OrnamentalRule />
              <p className="mt-5 text-center text-[9px] uppercase tracking-[0.26em] text-gold-on-cream">
                Composition
              </p>
              <div className="mt-5 border-t border-[#766d42]/18">
                {piece.gemstoneSpec ? (
                  <SalonSpec label="Centre stone" value={piece.gemstoneSpec} />
                ) : null}
                {piece.goldSpec ? (
                  <SalonSpec label="Gold" value={piece.goldSpec} />
                ) : null}
              </div>
              <OrnamentalRule className="mt-6" />
              <p className="mt-6 font-editorial text-[1rem] leading-[1.7] text-on-cream-body sm:text-[1.0625rem]">
                {piece.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <OrnamentalRule />
            <p
              id="atelier-lightbox-description"
              className="mt-6 font-editorial text-[1rem] leading-[1.7] text-on-cream-body sm:text-[1.0625rem]"
            >
              {piece.description}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="shrink-0 border-t border-[#766d42]/15 bg-[#f4f0e6]/90 px-6 py-5 backdrop-blur-[1px] sm:px-8">
          <button
            type="button"
            onClick={onEnquire}
            disabled={enquiryLoading}
            className="group flex w-full min-h-12 items-center justify-center gap-2.5 border border-[#766d42]/40 bg-[#1d3c34] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#faf8f5] shadow-[inset_0_1px_0_rgba(220,203,123,0.12)] transition duration-200 hover:border-[#dccb7b]/55 hover:bg-[#162e28] hover:text-[#e8d88a] disabled:opacity-60 motion-reduce:transition-none"
          >
            <MessageCircle
              className="size-4 shrink-0 text-[#dccb7b] transition duration-200 group-hover:text-[#e8d88a] motion-reduce:transition-none"
              strokeWidth={1.25}
            />
            {enquiryLoading ? "Opening WhatsApp…" : "Request salon consultation"}
          </button>
          <p className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-on-cream-muted">
            +91 81304 95257
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
