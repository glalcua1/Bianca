import { useEffect, useId, useMemo, useState } from "react";
import { Instagram } from "lucide-react";
import { parseInstagramUsername } from "../utils/instagramUsername";
import { proxyInstagramImageUrl } from "../utils/instagramImageProxy";
import { INSTAGRAM_EMBED_FALLBACK_URLS } from "../data/instagramEmbedFallbacks";
import { INSTAGRAM_GALLERY_FALLBACK } from "../data/instagramGalleryFallback";

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

function galleryImageSrc(thumb: string): string {
  if (thumb.startsWith("/media/")) return thumb;
  return proxyInstagramImageUrl(thumb);
}

function labelForType(mediaType: string): string {
  if (mediaType === "VIDEO") return "Reel";
  if (mediaType === "CAROUSEL_ALBUM") return "Gallery";
  return "Post";
}

const GALLERY_MAX_ITEMS = 6;

type Props = {
  profileUrl: string;
  /** Tighter top spacing — homepage artboard sits directly above gallery. */
  compactTop?: boolean;
};

export default function InstagramFeedSection({ profileUrl, compactTop = false }: Props) {
  const headingId = useId();
  const [apiMedia, setApiMedia] = useState<InstagramMediaItem[] | null>(null);
  const username = useMemo(
    () => parseInstagramUsername(profileUrl),
    [profileUrl]
  );

  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!sectionEl || shouldLoad) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [sectionEl, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    const params = new URLSearchParams({
      username,
      limit: String(GALLERY_MAX_ITEMS),
    });
    fetch(`/api/instagram-feed?${params}`)
      .then((r) => r.json())
      .then((data: { media?: InstagramMediaItem[] }) => {
        if (cancelled) return;
        const items = Array.isArray(data.media) ? data.media : [];
        if (items.length > 0) {
          setApiMedia(items.slice(0, GALLERY_MAX_ITEMS));
          return;
        }
        setApiMedia(INSTAGRAM_GALLERY_FALLBACK.slice(0, GALLERY_MAX_ITEMS));
      })
      .catch(() => {
        if (cancelled) return;
        setApiMedia(INSTAGRAM_GALLERY_FALLBACK.slice(0, GALLERY_MAX_ITEMS));
      });
    return () => {
      cancelled = true;
    };
  }, [username, shouldLoad]);

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
      ref={setSectionEl}
      className={`relative overflow-hidden px-5 py-16 md:px-10 md:pb-20 ${
        compactTop ? "md:pt-10" : "md:pt-24"
      }`}
      aria-labelledby={headingId}
      data-protection-exempt
      style={{
        background:
          "linear-gradient(180deg, #f4f0e6 0%, #ebe4d4 38%, #e5dcc8 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1d3c34]/12 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className={`text-center ${compactTop ? "mb-10 md:mb-12" : "mb-14 md:mb-20"}`}>
          <p className="mb-4 text-house-eyebrow text-on-cream-muted">
            Social
          </p>
          <h2
            id={headingId}
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.12em] text-[#1d3c34]"
          >
            The Gallery
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-house-body text-on-cream-body">
            A curated view of reels, campaigns, and moments from the Bianca
            studio — tap any frame to open on Instagram.
          </p>
        </div>

        {apiMedia === null && (
          <ul className="mx-auto grid max-w-xl grid-cols-3 gap-2.5 sm:max-w-2xl sm:gap-3 md:gap-3.5">
            {Array.from({ length: GALLERY_MAX_ITEMS }).map((_, i) => (
              <li
                key={i}
                className="aspect-square animate-pulse rounded-sm bg-[#1d3c34]/[0.08] ring-1 ring-[#1d3c34]/[0.06]"
              />
            ))}
          </ul>
        )}

        {showApiGrid && (
          <ul className="mx-auto grid max-w-xl grid-cols-3 gap-2.5 sm:max-w-2xl sm:gap-3 md:gap-3.5">
            {apiMedia!.slice(0, GALLERY_MAX_ITEMS).map((m) => {
              const thumb = pickThumbnail(m);
              return (
                <li key={m.id}>
                  <a
                    href={m.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-sm bg-[#1d3c34]/[0.04] shadow-[0_8px_24px_rgba(29,60,52,0.1)] ring-1 ring-[#1d3c34]/10 transition duration-500 hover:shadow-[0_12px_32px_rgba(29,60,52,0.14)] hover:ring-[#dccb7b]/45"
                  >
                    {thumb ? (
                      <div className="relative aspect-square w-full overflow-hidden">
                        <img
                          src={galleryImageSrc(thumb)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          data-protection-exempt
                          className="size-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-square w-full items-center justify-center bg-[#e8e0d0]">
                        <Instagram
                          className="size-8 text-on-cream-subtle"
                          aria-hidden
                        />
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/50 via-transparent to-transparent opacity-85 transition group-hover:from-[#1d3c34]/60" />
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 sm:p-2">
                      <span className="inline-block border border-[#f9f9f9]/25 bg-[#1d3c34]/40 px-1.5 py-px font-body text-[8px] uppercase tracking-[0.28em] text-[#f9f9f9] backdrop-blur-sm sm:text-[9px]">
                        {labelForType(m.media_type)}
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {showApiGrid && (
          <p className="mt-10 text-center">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-[#1d3c34]/30 pb-0.5 font-body text-sm tracking-wide text-[#1d3c34] transition hover:border-[#dccb7b]"
            >
              <Instagram className="size-4 shrink-0" aria-hidden />
              @{username} on Instagram
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
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
              <Instagram className="size-7 text-on-cream-muted" aria-hidden />
            </div>
            <p className="font-editorial text-xl tracking-[0.06em] text-[#1d3c34]">
              Follow the atelier
            </p>
            <p className="mt-3 text-house-body text-on-cream-body">
              Our latest reels and stories will appear here as soon as the
              gallery is connected — until then, visit us on Instagram.
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-[#1d3c34]/30 pb-0.5 font-body text-sm font-medium tracking-wide text-[#1d3c34] transition hover:border-[#dccb7b] hover:text-gold-on-cream"
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
