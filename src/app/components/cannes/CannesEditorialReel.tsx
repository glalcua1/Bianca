import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import ProtectedVideo from "../protection/ProtectedVideo";

type Props = {
  src: string;
  label: string;
  ariaLabel: string;
};

export default function CannesEditorialReel({ src, label, ariaLabel }: Props) {
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
    <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[310px]">
      <div
        className="pointer-events-none absolute -inset-3 rounded-sm bg-[#dccb7b]/10 blur-2xl"
        aria-hidden
      />
      <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-black shadow-[0_32px_80px_rgba(0,0,0,0.45)] ring-1 ring-[#dccb7b]/25">
        <ProtectedVideo
          ref={videoRef}
          src={src}
          className="object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          aria-label={ariaLabel}
          controlsOverlay={
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="pointer-events-auto absolute bottom-14 right-4 inline-flex size-10 items-center justify-center rounded-full border border-[#f9f9f9]/25 bg-[#0f1f1b]/55 text-[#f9f9f9]/90 backdrop-blur-sm transition-colors duration-300 hover:border-[#dccb7b]/50 hover:text-[#dccb7b]"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0f1f1b]/80 via-[#0f1f1b]/20 to-transparent px-5 pb-5 pt-16"
          aria-hidden
        >
          <p className="font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.45em] text-[#dccb7b]/90">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
