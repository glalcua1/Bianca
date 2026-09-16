import { useCallback, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  videoId: string;
  title: string;
  /** Prefer maxres; falls back via onError to hqdefault */
  posterUrl: string;
  posterFallbackUrl: string;
  className?: string;
};

/**
 * Thumbnail + click-to-load YouTube embed — avoids pulling the player until play.
 */
export default function YouTubeClickToPlay({
  videoId,
  title,
  posterUrl,
  posterFallbackUrl,
  className = "",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [poster, setPoster] = useState(posterUrl);

  const start = useCallback(() => setPlaying(true), []);

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden bg-[#1d3c34] ${className}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={start}
          className="group absolute inset-0 size-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#dccb7b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5]"
          aria-label={`Play video: ${title}`}
        >
          <img
            src={poster}
            alt=""
            width={1280}
            height={720}
            decoding="async"
            loading="lazy"
            className="size-full object-cover object-center transition duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            onError={() => {
              if (poster !== posterFallbackUrl) setPoster(posterFallbackUrl);
            }}
          />
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/45 via-transparent to-[#1d3c34]/15"
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-14 items-center justify-center border border-[#dccb7b]/55 bg-[#1d3c34]/70 text-[#f9f9f9] shadow-[0_12px_40px_rgba(8,20,16,0.35)] transition duration-300 group-hover:border-[#dccb7b]/85 group-hover:bg-[#1d3c34]/85 sm:size-16">
              <Play
                className="ml-0.5 size-6 text-[#dccb7b] sm:size-7"
                strokeWidth={1.25}
                fill="currentColor"
                aria-hidden
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
