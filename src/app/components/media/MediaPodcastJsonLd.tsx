import { useEffect } from "react";
import {
  MEDIA_PODCAST_VIDEO_ID,
  MEDIA_PODCAST_VIDEO_SEO,
} from "../../data/mediaPodcast";

/** VideoObject for the Media page featured podcast (extends existing schema pattern). */
export default function MediaPodcastJsonLd() {
  useEffect(() => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `https://www.biancadiamonds.com/media#featured-podcast-${MEDIA_PODCAST_VIDEO_ID}`,
      name: MEDIA_PODCAST_VIDEO_SEO.name,
      description: MEDIA_PODCAST_VIDEO_SEO.description,
      thumbnailUrl: [
        MEDIA_PODCAST_VIDEO_SEO.thumbnailUrlMax,
        MEDIA_PODCAST_VIDEO_SEO.thumbnailUrl,
      ],
      embedUrl: MEDIA_PODCAST_VIDEO_SEO.embedUrl,
      contentUrl: MEDIA_PODCAST_VIDEO_SEO.watchUrl,
      url: "https://www.biancadiamonds.com/media",
      publisher: {
        "@type": "Organization",
        name: MEDIA_PODCAST_VIDEO_SEO.publisherName,
      },
      isPartOf: {
        "@id": "https://www.biancadiamonds.com/#website",
      },
      inLanguage: "en-IN",
    };

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "media-podcast-video-jsonld";
    el.textContent = JSON.stringify(payload);
    document.head.appendChild(el);

    return () => {
      el.remove();
    };
  }, []);

  return null;
}
