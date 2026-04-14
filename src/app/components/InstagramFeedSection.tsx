import { useEffect, useId, useState } from "react";
import { Instagram } from "lucide-react";
import { INSTAGRAM_EMBED_FALLBACK_URLS } from "../data/instagramEmbedFallbacks";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export type InstagramMediaItem = {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  children?: { data?: { media_url?: string; media_type?: string }[] };
};

function pickThumbnail(m: InstagramMediaItem): string | undefined {
  if (m.media_type === "CAROUSEL_ALBUM" && m.children?.data?.[0]?.media_url) {
    return m.children.data[0].media_url;
  }
  return m.thumbnail_url || m.media_url;
}

function labelForType(mediaType: string): string {
  if (mediaType === "VIDEO") return "Reel";
  if (mediaType === "CAROUSEL_ALBUM") return "Gallery";
  return "Post";
}

type Props = {
  profileUrl: string;
};

export default function InstagramFeedSection({ profileUrl }: Props) {
  const headingId = useId();
  const [apiMedia, setApiMedia] = useState<InstagramMediaItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram-feed")
      .then((r) => r.json())
      .then((data: { media?: InstagramMediaItem[] }) => {
        if (cancelled) return;
        setApiMedia(Array.isArray(data.media) ? data.media : []);
      })
      .catch(() => {
        if (cancelled) return;
        setApiMedia([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (apiMedia === null) return;
    if (apiMedia.length > 0) return;
    if (INSTAGRAM_EMBED_FALLBACK_URLS.length === 0) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(script);
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };
    return () => {
      script.remove();
    };
  }, [apiMedia]);

  const showApiGrid = apiMedia !== null && apiMedia.length > 0;
  const showEmbeds =
    apiMedia !== null &&
    apiMedia.length === 0 &&
    INSTAGRAM_EMBED_FALLBACK_URLS.length > 0;
  const showPlaceholder =
    apiMedia !== null &&
    apiMedia.length === 0 &&
    INSTAGRAM_EMBED_FALLBACK_URLS.length === 0;

  return (
    <section
      className="relative overflow-hidden px-5 py-16 md:px-10 md:py-24"
      aria-labelledby={headingId}
      style={{
        background:
          "linear-gradient(180deg, #f4f0e6 0%, #ebe4d4 38%, #e5dcc8 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d3c34]/12 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-14 text-center md:mb-20">
          <p className="mb-4 font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.5em] text-[#1d3c34]/55 md:text-[11px]">
            Social
          </p>
          <h2
            id={headingId}
            className="font-['Times_New_Roman',serif] text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.12em] text-[#1d3c34]"
          >
            The Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-['Arial',sans-serif] text-sm leading-relaxed text-[#5a6b66] md:text-[15px]">
            A curated view of reels, campaigns, and moments from the Bianca
            studio — tap any frame to open on Instagram.
          </p>
        </div>

        {apiMedia === null && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <li
                key={i}
                className="aspect-[4/5] animate-pulse rounded-sm bg-[#1d3c34]/[0.08] ring-1 ring-[#1d3c34]/[0.06]"
              />
            ))}
          </ul>
        )}

        {showApiGrid && (
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {apiMedia!.map((m) => {
              const thumb = pickThumbnail(m);
              return (
                <li key={m.id}>
                  <a
                    href={m.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-sm bg-[#1d3c34]/[0.04] shadow-[0_24px_60px_rgba(29,60,52,0.12)] ring-1 ring-[#1d3c34]/10 transition duration-500 hover:shadow-[0_32px_80px_rgba(29,60,52,0.18)] hover:ring-[#dccb7b]/45"
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt=""
                        className="aspect-[4/5] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#e8e0d0]">
                        <Instagram
                          className="size-12 text-[#1d3c34]/25"
                          aria-hidden
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/55 via-[#1d3c34]/10 to-transparent opacity-90 transition group-hover:from-[#1d3c34]/65" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <span className="inline-block border border-[#f9f9f9]/25 bg-[#1d3c34]/40 px-3 py-1 font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#f9f9f9] backdrop-blur-sm">
                        {labelForType(m.media_type)}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {showEmbeds && (
          <div className="mx-auto flex max-w-lg flex-col items-stretch gap-10 md:max-w-2xl md:gap-14">
            {INSTAGRAM_EMBED_FALLBACK_URLS.map((href) => (
              <div
                key={href}
                className="rounded-sm p-[1px] shadow-[0_28px_70px_rgba(29,60,52,0.15)] [background:linear-gradient(135deg,#e8dfbd_0%,#dccb7b_42%,#a89852_100%)]"
              >
                <blockquote
                  className="instagram-media m-0 min-w-0 overflow-hidden rounded-[1px] bg-white"
                  data-instgrm-permalink={href}
                  data-instgrm-version="14"
                  style={{
                    background: "#FFF",
                    border: 0,
                    margin: 0,
                    maxWidth: "100%",
                    minWidth: 0,
                    padding: 0,
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {showPlaceholder && (
          <div className="mx-auto max-w-lg rounded-sm border border-[#1d3c34]/15 bg-[#faf8f3]/90 p-10 text-center shadow-[0_20px_50px_rgba(29,60,52,0.08)] backdrop-blur-sm md:p-14">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#dccb7b]/40 bg-[#1d3c34]/[0.03]">
              <Instagram className="size-7 text-[#1d3c34]/50" aria-hidden />
            </div>
            <p className="font-['Times_New_Roman',serif] text-xl tracking-[0.06em] text-[#1d3c34]">
              Follow the atelier
            </p>
            <p className="mt-3 font-['Arial',sans-serif] text-sm leading-relaxed text-[#5a6b66]">
              Our latest reels and stories will appear here as soon as the
              gallery is connected — until then, visit us on Instagram.
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#1d3c34]/30 pb-0.5 font-['Arial',sans-serif] text-sm font-medium tracking-wide text-[#1d3c34] transition hover:border-[#dccb7b] hover:text-[#766d42]"
            >
              <Instagram className="size-4 shrink-0" aria-hidden />
              Open Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
