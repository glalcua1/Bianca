import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BespokeSectionHeader from "./BespokeSectionHeader";
import BespokeButterflyMark from "./BespokeButterflyMark";
import ProtectedImage from "../protection/ProtectedImage";
import { BESPOKE_JOURNEY_STEPS } from "../../data/bespokeJewellery";

export default function BespokeJourneyTimeline() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByDir(dir: -1 | 1) {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("li");
    const amount = card ? card.offsetWidth + 16 : 300;
    node.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      aria-labelledby="journey-heading"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20"
    >
      <BespokeButterflyMark
        tone="forest"
        className="pointer-events-none absolute right-6 top-20 size-8 opacity-20 md:right-10 md:size-10"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <BespokeSectionHeader
            id="journey-heading"
            align="left"
            eyebrow="The Bianca Bespoke Journey"
            title="From Inspiration To Heirloom"
            subtitle="Seven stages — scroll horizontally to explore your path."
            className="mb-0 md:mb-0"
          />
          <div className="relative hidden shrink-0 md:block">
            <div
              className="pointer-events-none absolute bottom-[calc(100%-14px)] left-[calc(50%-6px)] z-20 w-[98px] -translate-x-1/2"
              aria-hidden
            >
              <ProtectedImage
                src="/butter.png"
                alt=""
                wrapperClassName="block w-full"
                className="w-full h-auto object-contain mix-blend-screen drop-shadow-[0_3px_10px_rgba(29,60,52,0.14)]"
              />
            </div>
            <div className="relative z-10 flex gap-2">
              <button
                type="button"
                onClick={() => scrollByDir(-1)}
                aria-label="Previous step"
                className="flex size-10 items-center justify-center border border-[#766d42]/30 text-[#1d3c34] transition duration-200 hover:border-[#766d42] hover:bg-[#f4f0e6]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDir(1)}
                aria-label="Next step"
                className="flex size-10 items-center justify-center border border-[#766d42]/30 text-[#1d3c34] transition duration-200 hover:border-[#766d42] hover:bg-[#f4f0e6]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="bespoke-journey-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:gap-5 md:pb-4"
        >
          <ol className="flex min-w-min gap-4 md:gap-5">
            {BESPOKE_JOURNEY_STEPS.map((step) => (
              <li
                key={step.id}
                className="group w-[min(78vw,260px)] shrink-0 snap-start border border-[#766d42]/18 bg-[#faf8f5] p-5 transition duration-300 ease-out hover:border-[#dccb7b]/45 hover:shadow-[0_12px_40px_rgba(29,60,52,0.07)] motion-reduce:transition-none md:w-[240px] md:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center border border-[#dccb7b]/50 font-editorial text-[12px] tracking-[0.06em] text-[#766d42]">
                    {step.step}
                  </span>
                  <BespokeButterflyMark
                    tone="gold"
                    className="size-5 opacity-0 transition duration-300 group-hover:opacity-35 motion-reduce:opacity-25"
                  />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-gold-on-cream">
                  {step.subtitle}
                </p>
                <h3 className="mt-1 font-editorial text-lg tracking-[0.04em] text-[#1d3c34]">
                  {step.title}
                </h3>
                <p className="mt-3 text-house-body text-[13px] leading-relaxed text-on-cream-body">
                  {step.details.join(" · ")}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-on-cream-muted md:text-left">
          Scroll to explore all seven stages
        </p>
      </div>
    </section>
  );
}
