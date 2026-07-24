import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import Group6Logo from "../../imports/Group6";
import { BiancaHouseLogo } from "./BiancaLogo";
import ProtectedImage from "./protection/ProtectedImage";

const HERO_STILL = "/bianca-diamonds-blue-diamond-editorial.jpg";
/** Full-quality landscape film for desktop. */
const HERO_VIDEO_DESKTOP = "/bianca-diamonds-lab-grown-jewellery-hero.mp4";
/**
 * Same 16:9 framing as desktop, compressed for mobile (~1.4MB vs ~10MB).
 * Avoids the portrait hero crop that cuts the trio's outer edges.
 */
const HERO_VIDEO_MOBILE = "/bianca-diamonds-lab-grown-jewellery-hero-mobile.mp4";
const HERO_VIDEO_POSTER = "/bianca-diamonds-lab-grown-jewellery-hero-poster.jpg";
/** Safety net if `ended` never fires (autoplay block, decode stall). */
const VIDEO_FALLBACK_MS = 18_000;
const CROSSFADE_MS = 1400;
const DEFAULT_VOLUME = 0.85;

/** Matches MacBookPro artboard hero card geometry */
export const HERO_CARD_HEIGHT = 673;
export const HERO_CARD_WIDTH = 1434;
export const HERO_CARD_LEFT = 39;
export const HERO_CARD_TOP = 203;
const HERO_IMAGE_WIDTH = 760;

type Layout = "desktop" | "mobile";

type Props = {
  layout?: Layout;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function useHeroSequence(reduceMotion: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<number | null>(null);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const mutedRef = useRef(false);
  const [phase, setPhase] = useState<"video" | "still">(
    reduceMotion ? "still" : "video",
  );
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [muted, setMutedState] = useState(false);
  const settledRef = useRef(reduceMotion);
  const hasAutoplayedRef = useRef(false);

  const clearFallback = useCallback(() => {
    if (fallbackRef.current != null) {
      window.clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  }, []);

  const applyAudio = useCallback((nextMuted: boolean, nextVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = Math.min(1, Math.max(0, nextVolume));
    video.muted = nextMuted || nextVolume === 0;
  }, []);

  const setVolume = useCallback(
    (next: number) => {
      const clamped = Math.min(1, Math.max(0, next));
      volumeRef.current = clamped;
      setVolumeState(clamped);
      const nextMuted = clamped === 0;
      mutedRef.current = nextMuted;
      setMutedState(nextMuted);
      applyAudio(nextMuted, clamped);
    },
    [applyAudio],
  );

  const setMuted = useCallback(
    (next: boolean) => {
      mutedRef.current = next;
      setMutedState(next);
      if (!next && volumeRef.current === 0) {
        volumeRef.current = DEFAULT_VOLUME;
        setVolumeState(DEFAULT_VOLUME);
        applyAudio(false, DEFAULT_VOLUME);
        return;
      }
      applyAudio(next, volumeRef.current);
    },
    [applyAudio],
  );

  const toggleMute = useCallback(() => {
    setMuted(!mutedRef.current);
  }, [setMuted]);

  const settleToStill = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;
    clearFallback();
    setProgress(1);
    setPhase("still");
    const video = videoRef.current;
    if (video) video.pause();
  }, [clearFallback]);

  const playFilm = useCallback(
    async (opts?: { userInitiated?: boolean }) => {
      settledRef.current = false;
      setProgress(0);
      setPhase("video");
      clearFallback();
      fallbackRef.current = window.setTimeout(
        settleToStill,
        VIDEO_FALLBACK_MS,
      );

      const video = videoRef.current;
      if (!video) {
        settleToStill();
        return;
      }

      // Replay / watch is a user gesture — prefer audible playback.
      if (opts?.userInitiated) {
        mutedRef.current = false;
        setMutedState(false);
        if (volumeRef.current === 0) {
          volumeRef.current = DEFAULT_VOLUME;
          setVolumeState(DEFAULT_VOLUME);
        }
      }

      applyAudio(mutedRef.current, volumeRef.current);

      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        // Browsers block unmuted autoplay — fall back to muted, keep UI for unmute.
        if (!video.muted) {
          mutedRef.current = true;
          setMutedState(true);
          applyAudio(true, volumeRef.current);
          try {
            video.currentTime = 0;
            await video.play();
            return;
          } catch {
            settleToStill();
            return;
          }
        }
        settleToStill();
      }
    },
    [applyAudio, clearFallback, settleToStill],
  );

  useEffect(() => {
    if (reduceMotion || hasAutoplayedRef.current) {
      if (reduceMotion) settleToStill();
      return;
    }

    hasAutoplayedRef.current = true;
    void playFilm();

    return () => clearFallback();
  }, [reduceMotion, playFilm, settleToStill, clearFallback]);

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || settledRef.current) return;
    setProgress(Math.min(1, video.currentTime / video.duration));
  };

  const replayFilm = useCallback(() => {
    void playFilm({ userInitiated: true });
  }, [playFilm]);

  return {
    videoRef,
    isStill: phase === "still",
    progress,
    volume,
    muted,
    settleToStill,
    playFilm: replayFilm,
    setVolume,
    toggleMute,
    onTimeUpdate,
  };
}

const fade: CSSProperties = {
  transitionProperty: "opacity, transform, filter",
  transitionDuration: `${CROSSFADE_MS}ms`,
  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
};

function FilmProgress({
  progress,
  visible,
}: {
  progress: number;
  visible: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[2px] overflow-hidden bg-black/20"
      style={{ ...fade, opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#766d42] via-[#dccb7b] to-[#f4e9b0]"
        style={{
          transform: `scaleX(${progress})`,
          transition:
            progress === 1
              ? `transform ${CROSSFADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "transform 80ms linear",
        }}
      />
    </div>
  );
}

function FilmAudioControl({
  visible,
  muted,
  volume,
  onToggleMute,
  onVolumeChange,
}: {
  visible: boolean;
  muted: boolean;
  volume: number;
  onToggleMute: () => void;
  onVolumeChange: (value: number) => void;
}) {
  const silent = muted || volume === 0;
  const sliderValue = silent ? 0 : volume;

  return (
    <div
      className="absolute bottom-5 left-4 z-[4] flex items-center gap-2.5 sm:left-5 sm:gap-3"
      style={{
        ...fade,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
      role="group"
      aria-label="Film volume"
    >
      <button
        type="button"
        onClick={onToggleMute}
        className="flex size-9 shrink-0 items-center justify-center border border-white/35 bg-black/40 text-[#faf8f5] backdrop-blur-[2px] transition duration-300 hover:border-[#dccb7b]/80 hover:text-[#dccb7b]"
        aria-label={silent ? "Unmute film" : "Mute film"}
        aria-pressed={!silent}
      >
        {silent ? (
          <VolumeX className="size-4" strokeWidth={1.6} aria-hidden />
        ) : (
          <Volume2 className="size-4" strokeWidth={1.6} aria-hidden />
        )}
      </button>
      <label className="sr-only" htmlFor="hero-film-volume">
        Volume
      </label>
      <input
        id="hero-film-volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={sliderValue}
        onChange={(event) => onVolumeChange(Number(event.target.value))}
        className="hero-film-volume h-1 w-[88px] cursor-pointer appearance-none bg-transparent sm:w-[120px]"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderValue * 100)}
        aria-valuetext={`${Math.round(sliderValue * 100)} percent`}
      />
      <style>{`
        .hero-film-volume {
          --hero-vol: ${sliderValue * 100}%;
        }
        .hero-film-volume::-webkit-slider-runnable-track {
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(
            to right,
            #dccb7b var(--hero-vol),
            rgba(255, 255, 255, 0.28) var(--hero-vol)
          );
        }
        .hero-film-volume::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          margin-top: -5px;
          border-radius: 999px;
          border: 1px solid rgba(220, 203, 123, 0.85);
          background: #faf8f5;
          box-shadow: 0 0 0 1px rgba(29, 60, 52, 0.25);
        }
        .hero-film-volume::-moz-range-track {
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.28);
        }
        .hero-film-volume::-moz-range-progress {
          height: 2px;
          border-radius: 999px;
          background: #dccb7b;
        }
        .hero-film-volume::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          border: 1px solid rgba(220, 203, 123, 0.85);
          background: #faf8f5;
        }
      `}</style>
    </div>
  );
}

function ReplayFilmButton({
  onClick,
  label,
  className = "",
}: {
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-3 text-left transition duration-300 motion-reduce:transition-none ${className}`}
      aria-label={label}
    >
      <span className="relative flex size-9 shrink-0 items-center justify-center border border-[#766d42]/45 bg-[#faf8f5] text-[#1d3c34] transition duration-300 group-hover:scale-[1.04] group-hover:border-[#766d42] group-hover:bg-white motion-reduce:group-hover:scale-100">
        <Play className="size-3.5 fill-current" strokeWidth={1.5} aria-hidden />
      </span>
      <span className="font-editorial text-[11px] uppercase tracking-[0.22em] text-[#1d3c34]/75 group-hover:text-[#1d3c34]">
        {label}
      </span>
    </button>
  );
}

/**
 * Homepage hero card: full-bleed film first, then dissolve into the salon
 * still layout (logo + copy + editorial portrait). Guests can replay the film
 * with sound and volume control.
 */
export default function HomeHeroCard({ layout = "desktop" }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const {
    videoRef,
    isStill,
    progress,
    volume,
    muted,
    settleToStill,
    playFilm,
    setVolume,
    toggleMute,
    onTimeUpdate,
  } = useHeroSequence(reduceMotion);

  const replayLabel = reduceMotion ? "Watch the film" : "Replay film";

  if (layout === "mobile") {
    return (
      <MobileHeroCard
        videoRef={videoRef}
        isStill={isStill}
        progress={progress}
        volume={volume}
        muted={muted}
        settleToStill={settleToStill}
        playFilm={playFilm}
        setVolume={setVolume}
        toggleMute={toggleMute}
        onTimeUpdate={onTimeUpdate}
        replayLabel={replayLabel}
      />
    );
  }

  return (
    <div
      className="absolute overflow-hidden rounded-[20px] border-[0.4px] border-solid border-[#1d3c34]"
      style={{
        left: HERO_CARD_LEFT,
        top: HERO_CARD_TOP,
        width: HERO_CARD_WIDTH,
        height: HERO_CARD_HEIGHT,
      }}
      data-name="home-hero-card"
      aria-label={
        isStill
          ? "Bianca Diamonds editorial portrait"
          : "Bianca Diamonds hero film"
      }
    >
      {/* Still salon layout — revealed after the film */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-r from-[#edefed] via-white via-[48%] to-white"
        style={{
          ...fade,
          opacity: isStill ? 1 : 0,
          transform: isStill ? "scale(1)" : "scale(1.02)",
          pointerEvents: isStill ? "auto" : "none",
        }}
        aria-hidden={!isStill}
      >
        <div
          className="absolute inset-y-0 right-0 overflow-hidden"
          style={{ width: HERO_IMAGE_WIDTH }}
        >
          <ProtectedImage
            priority
            wrapperClassName="absolute inset-0 size-full [&_picture]:absolute [&_picture]:inset-0 [&_picture]:block [&_picture]:h-full [&_picture]:w-full"
            alt="Bianca Diamonds — Blue Star editorial portrait with lab-grown blue diamond earrings"
            className="absolute inset-0 size-full object-cover object-right-top"
            src={HERO_STILL}
            sizes="(max-width: 1512px) 50vw, 760px"
          />
        </div>

        <div
          className="absolute"
          style={{ left: 135, top: 91, width: 304, height: 245 }}
        >
          <Group6Logo />
        </div>

        <div
          className="absolute flex flex-col justify-center font-display text-[40px] uppercase leading-none tracking-[1.5px] text-[#1d3c34]"
          style={{ left: 135, top: 394, width: 508, height: 109 }}
        >
          <p className="leading-[normal]">Modern Sparkle. Timeless Impact.</p>
        </div>
        <div
          className="absolute flex flex-col justify-center font-tagline text-[24px] capitalize leading-none tracking-[1.5px] text-on-cream-body"
          style={{ left: 135, top: 516, width: 564, height: 49 }}
        >
          <p className="leading-[normal]">100% Certified Lab Grown Diamonds</p>
        </div>

        <div
          className="absolute"
          style={{
            ...fade,
            left: 135,
            top: 590,
            opacity: isStill ? 1 : 0,
            transitionDelay: isStill ? "400ms" : "0ms",
          }}
        >
          <ReplayFilmButton onClick={playFilm} label={replayLabel} />
        </div>
      </div>

      {/* Full-card video — edge-to-edge */}
      <div
        className="absolute inset-0 z-[1] bg-black"
        style={{
          ...fade,
          opacity: isStill ? 0 : 1,
          transform: isStill ? "scale(1.03)" : "scale(1)",
          pointerEvents: isStill ? "none" : "auto",
        }}
        aria-hidden={isStill}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-cover object-center"
          src={HERO_VIDEO_DESKTOP}
          poster={HERO_VIDEO_POSTER}
          muted={muted}
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          onTimeUpdate={onTimeUpdate}
          onEnded={settleToStill}
          onError={settleToStill}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(29,60,52,0.12)_0%,transparent_28%,transparent_70%,rgba(29,60,52,0.28)_100%)]"
          aria-hidden
        />
        <FilmAudioControl
          visible={!isStill}
          muted={muted}
          volume={volume}
          onToggleMute={toggleMute}
          onVolumeChange={setVolume}
        />
        <FilmProgress progress={progress} visible={!isStill} />
      </div>
    </div>
  );
}

type MobileProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  isStill: boolean;
  progress: number;
  volume: number;
  muted: boolean;
  settleToStill: () => void;
  playFilm: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
  onTimeUpdate: () => void;
  replayLabel: string;
};

function MobileHeroCard({
  videoRef,
  isStill,
  progress,
  volume,
  muted,
  settleToStill,
  playFilm,
  setVolume,
  toggleMute,
  onTimeUpdate,
  replayLabel,
}: MobileProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[16px] border border-[#1d3c34]/40 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
      data-name="home-hero-card-mobile"
      aria-label={
        isStill
          ? "Bianca Diamonds editorial portrait"
          : "Bianca Diamonds hero film"
      }
    >
      {/*
        Keep 16:9 framing on mobile (the portrait hero encode crops the trio).
        Serve a compressed landscape encode + poster so mobile does not pull
        the ~10MB desktop master on first paint.
      */}
      <div
        className={
          isStill
            ? "absolute inset-0 z-[1] bg-black"
            : "relative z-[1] aspect-video w-full bg-black"
        }
        style={{
          ...fade,
          opacity: isStill ? 0 : 1,
          transform: isStill ? "scale(1.03)" : "scale(1)",
          pointerEvents: isStill ? "none" : "auto",
        }}
        aria-hidden={isStill}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 size-full object-contain object-center"
          src={HERO_VIDEO_MOBILE}
          poster={HERO_VIDEO_POSTER}
          muted={muted}
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          onTimeUpdate={onTimeUpdate}
          onEnded={settleToStill}
          onError={settleToStill}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(29,60,52,0.1)_0%,transparent_30%,transparent_65%,rgba(29,60,52,0.35)_100%)]"
          aria-hidden
        />
        <FilmAudioControl
          visible={!isStill}
          muted={muted}
          volume={volume}
          onToggleMute={toggleMute}
          onVolumeChange={setVolume}
        />
        <FilmProgress progress={progress} visible={!isStill} />
      </div>

      <div
        className={
          isStill
            ? "relative z-0 min-h-[min(78svh,640px)] p-5"
            : "absolute inset-0 z-0 overflow-hidden p-5"
        }
        style={{
          ...fade,
          opacity: isStill ? 1 : 0,
          transform: isStill ? "scale(1)" : "scale(1.02)",
          pointerEvents: isStill ? "auto" : "none",
        }}
        aria-hidden={!isStill}
      >
        <BiancaHouseLogo maxWidth={200} className="mx-auto" />
        <div className="relative -mr-5 mt-6 ml-auto aspect-[4/5] w-[min(100%,420px)] overflow-hidden bg-[#fafafa]">
          <ProtectedImage
            priority
            wrapperClassName="absolute inset-0 size-full [&_picture]:absolute [&_picture]:inset-0 [&_picture]:block [&_picture]:h-full [&_picture]:w-full"
            alt="Bianca Diamonds — Blue Star editorial portrait with lab-grown blue diamond earrings"
            className="absolute inset-0 size-full object-cover object-right-top"
            src={HERO_STILL}
            sizes="(max-width: 768px) 100vw, 420px"
          />
        </div>
        <h1 className="mt-6 text-center text-house-display text-[clamp(1.35rem,5.5vw,1.75rem)] uppercase leading-snug tracking-[0.06em] text-[#1d3c34]">
          Modern Sparkle. Timeless Impact.
        </h1>
        <p className="mt-3 text-center text-house-tagline text-[clamp(1rem,4vw,1.125rem)] capitalize tracking-[0.06em] text-on-cream-body">
          100% Certified Lab Grown Diamonds
        </p>
        <div
          className="mt-6 flex justify-center"
          style={{
            ...fade,
            opacity: isStill ? 1 : 0,
            transitionDelay: isStill ? "400ms" : "0ms",
          }}
        >
          <ReplayFilmButton onClick={playFilm} label={replayLabel} />
        </div>
      </div>
    </div>
  );
}
