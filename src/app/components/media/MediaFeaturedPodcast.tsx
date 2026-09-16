import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import YouTubeClickToPlay from "./YouTubeClickToPlay";
import {
  MEDIA_PODCAST,
  MEDIA_PODCAST_VIDEO_ID,
  MEDIA_PODCAST_VIDEO_SEO,
} from "../../data/mediaPodcast";

/**
 * Featured podcast editorial block for /media — quiet luxury, placed above
 * the existing “In the Press” section.
 */
export default function MediaFeaturedPodcast() {
  return (
    <section
      id="featured-podcast"
      aria-labelledby="featured-podcast-heading"
      className="scroll-mt-[calc(var(--site-nav-offset,0px)+1.5rem)] border-b border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14 xl:gap-20">
          <EditorialReveal className="order-1 lg:order-1">
            <EditorialEyebrow className="mb-5">
              {MEDIA_PODCAST.eyebrow}
            </EditorialEyebrow>
            <h2
              id="featured-podcast-heading"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.55rem)] leading-[1.15] tracking-[0.05em] text-[#1d3c34]"
            >
              {MEDIA_PODCAST.heading}
            </h2>

            {/* Mobile: video sits between heading and body copy */}
            <div className="mt-8 lg:hidden">
              <YouTubeClickToPlay
                videoId={MEDIA_PODCAST_VIDEO_ID}
                title={MEDIA_PODCAST_VIDEO_SEO.iframeTitle}
                posterUrl={MEDIA_PODCAST_VIDEO_SEO.thumbnailUrlMax}
                posterFallbackUrl={MEDIA_PODCAST_VIDEO_SEO.thumbnailUrl}
              />
            </div>

            <p className="mt-8 max-w-xl text-house-body leading-relaxed text-on-cream-body">
              {MEDIA_PODCAST.description}
            </p>
            <p className="mt-5 max-w-xl text-house-body leading-relaxed text-on-cream-muted">
              {MEDIA_PODCAST.supporting}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to={MEDIA_PODCAST_VIDEO_SEO.pagePath}
                className="inline-flex items-center justify-center border border-[#766d42]/40 bg-[#f4f0e6] px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#766d42]"
              >
                {MEDIA_PODCAST.ctaLabel}
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
          </EditorialReveal>

          <EditorialReveal delay={100} className="order-2 hidden lg:order-2 lg:block">
            <YouTubeClickToPlay
              videoId={MEDIA_PODCAST_VIDEO_ID}
              title={MEDIA_PODCAST_VIDEO_SEO.iframeTitle}
              posterUrl={MEDIA_PODCAST_VIDEO_SEO.thumbnailUrlMax}
              posterFallbackUrl={MEDIA_PODCAST_VIDEO_SEO.thumbnailUrl}
            />
          </EditorialReveal>
        </div>

        <EditorialReveal
          delay={140}
          className="mt-16 border-t border-[#1d3c34]/8 pt-14 md:mt-20 md:pt-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow className="mb-4">
              {MEDIA_PODCAST.questionsEyebrow}
            </EditorialEyebrow>
            <h3 className="font-editorial text-[clamp(1.35rem,3vw,1.85rem)] tracking-[0.05em] text-[#1d3c34]">
              {MEDIA_PODCAST.questionsHeading}
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-house-body leading-relaxed text-on-cream-body">
              {MEDIA_PODCAST.questionsIntro}
            </p>
          </div>

          <ol className="mx-auto mt-12 grid max-w-5xl gap-x-12 gap-y-0 sm:grid-cols-2">
            {MEDIA_PODCAST.questions.map((question, index) => {
              const n = String(index + 1).padStart(2, "0");
              return (
                <li
                  key={question}
                  className="border-t border-[#1d3c34]/8 py-5"
                >
                  <div className="flex items-baseline gap-4 md:gap-5">
                    <span
                      className="shrink-0 font-editorial text-[11px] tabular-nums tracking-[0.18em] text-[#766d42]/70"
                      aria-hidden
                    >
                      {n}
                    </span>
                    <span className="font-editorial text-[1.05rem] leading-snug tracking-[0.03em] text-[#1d3c34] md:text-[1.125rem]">
                      {question}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </EditorialReveal>
      </div>
    </section>
  );
}
