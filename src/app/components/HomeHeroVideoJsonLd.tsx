import { useEffect } from "react";
import { HOME_HERO_VIDEO_SEO } from "../data/homeHeroVideo";

/** Injects VideoObject schema so Google can index the homepage hero film. */
export default function HomeHeroVideoJsonLd() {
  useEffect(() => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${HOME_HERO_VIDEO_SEO.embedUrl}#homepage-hero-video`,
      name: HOME_HERO_VIDEO_SEO.name,
      description: HOME_HERO_VIDEO_SEO.description,
      thumbnailUrl: [
        HOME_HERO_VIDEO_SEO.thumbnailUrl,
        HOME_HERO_VIDEO_SEO.thumbnailUrlWebp,
      ],
      uploadDate: HOME_HERO_VIDEO_SEO.uploadDate,
      duration: HOME_HERO_VIDEO_SEO.durationIso,
      contentUrl: HOME_HERO_VIDEO_SEO.contentUrl,
      embedUrl: HOME_HERO_VIDEO_SEO.embedUrl,
      encodingFormat: "video/mp4",
      publisher: {
        "@id": "https://www.biancadiamonds.com/#organization",
      },
      isPartOf: {
        "@id": "https://www.biancadiamonds.com/#website",
      },
      inLanguage: "en-IN",
    };

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = "homepage-hero-video-jsonld";
    el.textContent = JSON.stringify(payload);
    document.head.appendChild(el);

    return () => {
      el.remove();
    };
  }, []);

  return null;
}
