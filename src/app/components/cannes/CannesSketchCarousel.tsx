import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProtectedImage from "../protection/ProtectedImage";
import type { CannesSketch } from "../../data/cannesShowcase2026";

type Props = {
  sketches: CannesSketch[];
};

export default function CannesSketchCarousel({ sketches }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex touch-pan-y">
          {sketches.map((sketch) => (
            <li
              key={sketch.src}
              className="min-w-0 shrink-0 grow-0 basis-[78%] pr-4 sm:basis-[55%] md:basis-[42%] md:pr-5 lg:basis-[32%] lg:pr-6"
            >
              <div className="group overflow-hidden rounded-sm bg-[#faf8f5] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.2)] ring-1 ring-[#dccb7b]/15 md:p-5">
                <div className="flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#faf8f5]">
                  <ProtectedImage
                    src={sketch.src}
                    alt={sketch.alt}
                    wrapperClassName="flex size-full items-center justify-center"
                    className="max-h-full max-w-full object-contain transition duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        <p
          className="font-body text-[10px] uppercase tracking-[0.45em] text-on-forest-muted"
          aria-live="polite"
        >
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(sketches.length).padStart(2, "0")}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous sketch"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#f9f9f9]/20 text-on-forest-muted transition-colors duration-300 hover:border-[#dccb7b]/50 hover:text-[#dccb7b] disabled:pointer-events-none disabled:text-on-forest-muted"
          >
            <ChevronLeft className="size-4" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next sketch"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#f9f9f9]/20 text-on-forest-muted transition-colors duration-300 hover:border-[#dccb7b]/50 hover:text-[#dccb7b] disabled:pointer-events-none disabled:text-on-forest-muted"
          >
            <ChevronRight className="size-4" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
