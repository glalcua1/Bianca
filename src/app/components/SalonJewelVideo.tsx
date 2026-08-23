import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import ProtectedVideo from "./protection/ProtectedVideo";

type Props = {
  src: string;
  ariaLabel: string;
  className?: string;
  /** Still frame shown before playback (avoids blank wells while metadata loads) */
  poster?: string;
  /** Show play/pause control */
  showControl?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controlPosition?: "bottom-right" | "bottom-center";
  /** How the film fills its well — cover crops for salon frames */
  objectFit?: "contain" | "cover";
};

export default function SalonJewelVideo({
  src,
  ariaLabel,
  className,
  poster,
  showControl = true,
  autoPlay = false,
  loop = true,
  muted = true,
  controlPosition = "bottom-right",
  objectFit = "contain",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const fitClass =
    objectFit === "cover" ? "object-cover object-center" : "object-contain object-center";
  const videoClassName = className ?? `size-full ${fitClass}`;

  const syncPlayingState = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(!video.paused);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsPlaying(false);

    video.addEventListener("play", syncPlayingState);
    video.addEventListener("pause", syncPlayingState);

    if (autoPlay) {
      void video.play().catch(() => setIsPlaying(false));
    }

    return () => {
      video.removeEventListener("play", syncPlayingState);
      video.removeEventListener("pause", syncPlayingState);
    };
  }, [autoPlay, syncPlayingState, src]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  }, []);

  const controlPositionClass =
    controlPosition === "bottom-center"
      ? "bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4"
      : "bottom-3 right-3 sm:bottom-4 sm:right-4";

  return (
    <ProtectedVideo
      ref={videoRef}
      src={src}
      poster={poster}
      className={videoClassName}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      preload={poster ? "none" : "metadata"}
      aria-label={ariaLabel}
      controlsOverlay={
        showControl ? (
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className={`pointer-events-auto absolute ${controlPositionClass} inline-flex size-11 items-center justify-center border border-[#766d42]/35 bg-[#f4f0e6]/92 text-[#1d3c34] shadow-[0_8px_24px_rgba(29,60,52,0.12)] backdrop-blur-[2px] transition duration-200 hover:border-[#766d42]/55 hover:text-[#1d3c34] sm:size-10`}
          >
            {isPlaying ? (
              <Pause className="size-4" strokeWidth={1.25} fill="currentColor" />
            ) : (
              <Play className="ml-0.5 size-4" strokeWidth={1.25} fill="currentColor" />
            )}
          </button>
        ) : undefined
      }
    />
  );
}
