import { Link } from "react-router";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import HomeHeroVideoJsonLd from "../components/HomeHeroVideoJsonLd";
import IndexableHeroFilmPlayer from "../components/media/IndexableHeroFilmPlayer";
import VideoWatchLayout from "../components/media/VideoWatchLayout";
import { usePageMeta } from "../hooks/usePageMeta";
import { HOME_HERO_VIDEO_SEO } from "../data/homeHeroVideo";

export default function HeroFilmWatchPage() {
  usePageMeta(HOME_HERO_VIDEO_SEO.pageTitle, HOME_HERO_VIDEO_SEO.pageDescription, {
    canonical: HOME_HERO_VIDEO_SEO.watchUrl,
    ogImage: HOME_HERO_VIDEO_SEO.thumbnailUrl,
  });

  return (
    <VideoWatchLayout>
      <HomeHeroVideoJsonLd />
      <article className="px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-8">
        <div className="mx-auto max-w-5xl">
          <EditorialEyebrow className="mb-4">The Film</EditorialEyebrow>
          <IndexableHeroFilmPlayer />
          <h1 className="mt-8 font-editorial text-[clamp(1.55rem,3.4vw,2.35rem)] leading-[1.15] tracking-[0.05em] text-[#1d3c34]">
            {HOME_HERO_VIDEO_SEO.name}
          </h1>
          <p className="mt-5 max-w-3xl text-house-body leading-relaxed text-on-cream-body">
            {HOME_HERO_VIDEO_SEO.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center border border-[#766d42]/40 bg-[#f4f0e6] px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#766d42]/70 hover:bg-[#f4f0e6]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#766d42]"
            >
              The House
            </Link>
            <Link
              to="/fine-jewellery"
              className="inline-flex items-center justify-center border border-[#1d3c34]/20 px-6 py-3 text-house-cta text-[#1d3c34] transition hover:border-[#1d3c34]/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#766d42]"
            >
              Fine Jewellery
            </Link>
          </div>
        </div>
      </article>
    </VideoWatchLayout>
  );
}
