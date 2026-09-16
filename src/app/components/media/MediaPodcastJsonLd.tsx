import {
  MEDIA_PODCAST_VIDEO_ID,
  MEDIA_PODCAST_VIDEO_SEO,
} from "../../data/mediaPodcast";
import JsonLd from "../seo/JsonLd";

/** VideoObject for the dedicated /podcast watch page. No YouTube watch contentUrl. */
export default function MediaPodcastJsonLd() {
  const watchUrl = MEDIA_PODCAST_VIDEO_SEO.pageUrl;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "@id": `${watchUrl}#video`,
        name: MEDIA_PODCAST_VIDEO_SEO.name,
        description: MEDIA_PODCAST_VIDEO_SEO.description,
        thumbnailUrl: [
          MEDIA_PODCAST_VIDEO_SEO.thumbnailUrlMax,
          MEDIA_PODCAST_VIDEO_SEO.thumbnailUrl,
        ],
        embedUrl: MEDIA_PODCAST_VIDEO_SEO.embedUrl,
        url: watchUrl,
        publisher: {
          "@type": "Organization",
          name: MEDIA_PODCAST_VIDEO_SEO.publisherName,
        },
        isPartOf: {
          "@id": "https://www.biancadiamonds.com/#website",
        },
        inLanguage: "en-IN",
        mainEntityOfPage: watchUrl,
        identifier: MEDIA_PODCAST_VIDEO_ID,
      }}
    />
  );
}
