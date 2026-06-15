import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedVideo from "../protection/ProtectedVideo";
import BespokeButterflyMark from "../bespoke/BespokeButterflyMark";
import { BUTTERFLY_MORPH_VIDEO } from "../../data/butterflyCollection";

export default function ButterflyCinemaHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const syncPlayingState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(!video.paused);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", syncPlayingState);
    video.addEventListener("pause", syncPlayingState);
    void video.play().catch(() => setIsPlaying(false));

    return () => {
      video.removeEventListener("play", syncPlayingState);
      video.removeEventListener("pause", syncPlayingState);
    };
  }, [syncPlayingState]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  return (
    <header className="relative overflow-hidden bg-[#0f1f1b]">
      <div className="relative min-h-[min(50vh,22rem)] w-full sm:min-h-[min(54vh,26rem)] md:min-h-[min(58vh,30rem)]">
        <ProtectedVideo
          ref={videoRef}
          src={BUTTERFLY_MORPH_VIDEO}
          wrapperClassName="absolute inset-0 z-0"
          className="size-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Butterfly metamorphosis — Bianca house emblem in motion"
          controlsOverlay={
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause film" : "Play film"}
              className="pointer-events-auto absolute bottom-4 right-4 z-30 inline-flex size-10 items-center justify-center border border-[#f9f9f9]/25 bg-[#1d3c34]/55 text-[#f9f9f9] shadow-[0_8px_28px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition duration-200 hover:border-[#dccb7b]/50 hover:text-[#dccb7b] sm:bottom-5 sm:right-5"
            >
              {isPlaying ? (
                <Pause className="size-4" strokeWidth={1.25} fill="currentColor" />
              ) : (
                <Play className="ml-0.5 size-4" strokeWidth={1.25} fill="currentColor" />
              )}
            </button>
          }
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#dccb7b]/35 to-transparent"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-end">
          <EditorialReveal className="pointer-events-auto w-full px-6 pb-8 pt-14 md:px-10 md:pb-10 md:pt-16 lg:px-14">
            <div className="mx-auto max-w-6xl">
              <BespokeButterflyMark
                tone="gold"
                className="mb-4 size-8 opacity-85 md:size-9"
              />
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#dccb7b]/90 [text-shadow:0_1px_12px_rgba(15,31,27,0.6)]">
                Bianca High Jewellery
              </p>
              <h1
                id="butterfly-collection-heading"
                className="mt-2 max-w-3xl font-editorial text-[clamp(1.85rem,4.5vw,3rem)] leading-[1.1] tracking-[0.05em] text-[#f9f9f9] [text-shadow:0_2px_24px_rgba(15,31,27,0.65)]"
              >
                Butterfly Collection
              </h1>
              <p className="mt-3 max-w-lg text-house-body leading-relaxed text-on-forest-body [text-shadow:0_1px_16px_rgba(15,31,27,0.7)]">
                The wings of the house emblem, composed in sapphire, emerald, and
                light — where the <span className="text-[#f9f9f9]">B</span> of
                Bianca takes flight.
              </p>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </header>
  );
}
