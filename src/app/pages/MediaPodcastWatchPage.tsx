import { Link } from "react-router";
import { ExternalLink } from "lucide-react";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import IndexableYouTubeEmbed from "../components/media/IndexableYouTubeEmbed";
import MediaPodcastJsonLd from "../components/media/MediaPodcastJsonLd";
import VideoWatchLayout from "../components/media/VideoWatchLayout";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  MEDIA_PODCAST,
  MEDIA_PODCAST_VIDEO_ID,
  MEDIA_PODCAST_VIDEO_SEO,
} from "../data/mediaPodcast";

export default function MediaPodcastWatchPage() {
  usePageMeta(
    MEDIA_PODCAST_VIDEO_SEO.pageTitle,
    MEDIA_PODCAST_VIDEO_SEO.pageDescription,
    {
      canonical: MEDIA_PODCAST_VIDEO_SEO.pageUrl,
      ogImage: MEDIA_PODCAST_VIDEO_SEO.thumbnailUrlMax,
    },
  );

  return (
    <VideoWatchLayout activeItem="media">
      <MediaPodcastJsonLd />
      <article className="px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-8">
        <div className="mx-auto max-w-5xl">
          <EditorialEyebrow className="mb-4">
            {MEDIA_PODCAST.eyebrow}
          </EditorialEyebrow>
          <IndexableYouTubeEmbed
            videoId={MEDIA_PODCAST_VIDEO_ID}
            title={MEDIA_PODCAST_VIDEO_SEO.iframeTitle}
          />
          <h1 className="mt-8 font-editorial text-[clamp(1.55rem,3.4vw,2.35rem)] leading-[1.15] tracking-[0.05em] text-[#1d3c34]">
            {MEDIA_PODCAST.heading}
          </h1>
          <p className="mt-3 font-editorial text-[1.05rem] leading-snug tracking-[0.02em] text-[#766d42]">
            {MEDIA_PODCAST_VIDEO_SEO.name}
          </p>
          <p className="mt-5 max-w-3xl text-house-body leading-relaxed text-on-cream-body">
            {MEDIA_PODCAST.description}
          </p>
          <p className="mt-4 max-w-3xl text-house-body leading-relaxed text-on-cream-muted">
            {MEDIA_PODCAST.supporting}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/media"
              className="inline-flex items-center justify-center border border-[#766d42]/40 bg-[#f4f0e6] px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#766d42]"
            >
              Media & Press
            </Link>
            <a
              href={MEDIA_PODCAST.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#1d3c34]/20 px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#1d3c34]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#766d42]"
            >
              Watch on YouTube
              <ExternalLink
                className="size-4 shrink-0 text-on-cream-muted"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </article>
    </VideoWatchLayout>
  );
}
