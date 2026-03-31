import { useEffect, useRef, useState } from "react";

import menPoster from "../../../public/Mens/Men.png";
import menVideoUrl from "../../../public/Mens/Men_v.mov?url";

type Props = {
  /** Tighter spacing when placed inside the scaled home artboard */
  embedded?: boolean;
};

export default function MensCollectionSection({ embedded = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showMotion = active && !reduceMotion;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || reduceMotion) return;
    if (showMotion) {
      el.play().catch(() => {});
    } else {
      el.pause();
      el.currentTime = 0;
    }
  }, [showMotion, reduceMotion]);

  const prefersHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover)").matches;

  return (
    <section
      aria-labelledby="mens-collection-heading"
      className="relative w-full overflow-hidden bg-[#f7f4ee]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dccb7b]/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#1d3c34]/[0.04] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#dccb7b]/[0.08] blur-3xl"
        aria-hidden
      />

      <div
        className={`relative mx-auto max-w-6xl px-6 ${embedded ? "py-10 md:py-12" : "py-20 md:py-28"}`}
      >
        <header
          className={`text-center ${embedded ? "mb-8 md:mb-10" : "mb-12 md:mb-16"}`}
        >
          <p className="mb-3 font-['Arial',sans-serif] text-[11px] uppercase tracking-[0.38em] text-[#1d3c34]/55 md:text-xs">
            Bianca · For Him
          </p>
          <h2
            id="mens-collection-heading"
            className="font-['Times_New_Roman',serif] text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.14em] text-[#1d3c34]"
          >
            Men&apos;s
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-['Arial',sans-serif] text-sm leading-relaxed text-[#5a6b66] md:text-base">
            Understated weight, precise lines, and the same lab-grown brilliance
            — crafted for those who dress with intention.
          </p>
        </header>

        <div
          className="group relative mx-auto max-w-4xl cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#dccb7b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f4ee]"
          onMouseEnter={() => prefersHover() && setActive(true)}
          onMouseLeave={() => prefersHover() && setActive(false)}
          onClick={() => {
            if (!prefersHover()) setActive((v) => !v);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActive((v) => !v);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={
            reduceMotion
              ? "Men's collection still image"
              : prefersHover()
                ? "Men's collection — hover to play film"
                : "Men's collection — tap to play film"
          }
        >
          <div className="relative rounded-[2px] p-[1.5px] shadow-[0_28px_90px_rgba(29,60,52,0.14)] [background:linear-gradient(135deg,#e8dfbd_0%,#dccb7b_45%,#a89852_100%)]">
            <div className="relative overflow-hidden rounded-[1px] bg-[#1a332e]">
              <div className="relative aspect-[4/5] w-full md:aspect-[16/10]">
                <img
                  src={menPoster}
                  alt="Men's fine jewellery — still"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showMotion
                      ? "scale-[1.02] opacity-0"
                      : "scale-100 opacity-100"
                  }`}
                  draggable={false}
                />
                <video
                  ref={videoRef}
                  src={menVideoUrl}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showMotion ? "opacity-100" : "opacity-0"
                  }`}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />
              </div>

              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/35 via-transparent to-[#1d3c34]/10"
                aria-hidden
              />

              {!reduceMotion && (
                <div className="pointer-events-none absolute bottom-6 left-0 right-0 flex justify-center md:bottom-8">
                  <span
                    className={`rounded-full border border-[#f9f9f9]/25 bg-[#1d3c34]/35 px-5 py-2 font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.28em] text-[#f9f9f9] backdrop-blur-sm transition-opacity duration-500 md:text-[11px] ${
                      showMotion ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {prefersHover() ? "Hover to reveal" : "Tap to reveal"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
