import { HOME_HERO_VIDEO_SEO } from "../data/homeHeroVideo";
import JsonLd from "./seo/JsonLd";

/** VideoObject for the dedicated /film watch page. */
export default function HomeHeroVideoJsonLd() {
  const watchUrl = HOME_HERO_VIDEO_SEO.watchUrl;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${watchUrl}#video`,
        name: HOME_HERO_VIDEO_SEO.name,
        description: HOME_HERO_VIDEO_SEO.description,
        thumbnailUrl: [
          HOME_HERO_VIDEO_SEO.thumbnailUrl,
          HOME_HERO_VIDEO_SEO.thumbnailUrlWebp,
        ],
        uploadDate: HOME_HERO_VIDEO_SEO.uploadDate,
        duration: HOME_HERO_VIDEO_SEO.durationIso,
        contentUrl: HOME_HERO_VIDEO_SEO.contentUrl,
        embedUrl: watchUrl,
        url: watchUrl,
        encodingFormat: "video/mp4",
        width: 1920,
        height: 1080,
        publisher: {
          "@id": "https://www.biancadiamonds.com/#organization",
        },
        isPartOf: {
          "@id": "https://www.biancadiamonds.com/#website",
        },
        inLanguage: "en-IN",
        mainEntityOfPage: watchUrl,
      }}
    />
  );
}
