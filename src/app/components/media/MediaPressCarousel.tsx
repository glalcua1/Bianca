import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProtectedImage from "../protection/ProtectedImage";
import type { MediaPressImage } from "../../data/mediaCoverage";

type Props = {
  images: MediaPressImage[];
  label: string;
  centerCarousel?: boolean;
};

const frameClasses: Record<
  NonNullable<MediaPressImage["frame"]>,
  string
> = {
  portrait: "aspect-[4/5] max-h-[min(620px,90vw)]",
  wide: "aspect-[16/10] max-h-[min(480px,75vw)]",
  square: "aspect-square max-h-[min(560px,85vw)]",
};

export default function MediaPressCarousel({
  images,
  label,
  centerCarousel = false,
}: Props) {
  const hasMultiple = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: hasMultiple,
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
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

  const active = images[selectedIndex];

  return (
    <div className={`relative ${centerCarousel ? "mx-auto w-full max-w-xl lg:max-w-2xl" : ""}`}>
      <div
        className="overflow-hidden rounded-sm bg-[#faf8f5] shadow-[0_20px_50px_rgba(29,60,52,0.12)] ring-1 ring-[#766d42]/25"
        ref={emblaRef}
      >
        <ul className="flex touch-pan-y">
          {images.map((image, index) => {
            const frame = image.frame ?? "portrait";
            return (
            <li
              key={image.src}
              className="min-w-0 shrink-0 grow-0 basis-full"
              aria-hidden={index !== selectedIndex}
            >
              <div
                className={`relative flex w-full items-center justify-center overflow-hidden bg-[#faf8f5] ${frameClasses[frame]} ${
                  image.centerInCard ? "mx-auto" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-[#dccb7b]/40"
                  aria-hidden
                />
                <ProtectedImage
                  src={image.src}
                  alt={image.alt}
                  wrapperClassName="flex size-full items-center justify-center p-3"
                  className={`max-h-full max-w-full object-contain object-center ${
                    image.centerInCard ? "mx-auto" : ""
                  }`}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </li>
            );
          })}
        </ul>
      </div>

      {hasMultiple ? (
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-center sm:text-left">
            {active?.caption ? (
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold-on-cream">
                {active.caption}
              </p>
            ) : null}
            <p
              className="mt-1 font-body text-[10px] uppercase tracking-[0.35em] text-on-cream-muted"
              aria-live="polite"
            >
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label={`Previous ${label} image`}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#766d42]/35 text-[#1d3c34] transition-colors duration-300 hover:border-[#766d42]/60 hover:bg-[#f4f0e6]"
            >
              <ChevronLeft className="size-4" strokeWidth={1.25} />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label={`${label} images`}
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={index === selectedIndex}
                  aria-label={`Show image ${index + 1}${image.caption ? `: ${image.caption}` : ""}`}
                  onClick={() => scrollTo(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-6 bg-[#766d42]"
                      : "w-1.5 bg-[#766d42]/30 hover:bg-[#766d42]/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label={`Next ${label} image`}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#766d42]/35 text-[#1d3c34] transition-colors duration-300 hover:border-[#766d42]/60 hover:bg-[#f4f0e6]"
            >
              <ChevronRight className="size-4" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      ) : active?.caption ? (
        <p className="mt-3 text-center text-[11px] uppercase tracking-[0.16em] text-gold-on-cream">
          {active.caption}
        </p>
      ) : null}
    </div>
  );
}
