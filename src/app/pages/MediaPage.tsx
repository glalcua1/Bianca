import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import MediaPressCard from "../components/media/MediaPressCard";
import InstagramFeedSection from "../components/InstagramFeedSection";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  MEDIA_BRAND_STATEMENT,
  MEDIA_PRESS_ITEMS,
  MEDIA_SEO,
} from "../data/mediaCoverage";
import { BIANCA_INSTAGRAM_URL } from "../data/siteContact";

export default function MediaPage() {
  usePageMeta(MEDIA_SEO.title, MEDIA_SEO.description);

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="media" />
      </div>

      <header className="relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(220,203,123,0.1),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <EditorialEyebrow tone="gold" className="mb-6">
            Media & Press
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[0.06em] text-[#f9f9f9]">
            Bianca Diamonds in the Spotlight
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-house-body text-on-forest-body">
            A luxury media archive celebrating the house — lab-grown brilliance,
            women-led craft, and milestones from Delhi to Cannes and beyond.
          </p>
        </div>
      </header>

      <section
        aria-labelledby="brand-media-heading"
        className="border-b border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <EditorialReveal>
            <h2
              id="brand-media-heading"
              className="font-editorial text-[clamp(1.35rem,3vw,1.85rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              {MEDIA_BRAND_STATEMENT.headline}
            </h2>
            <p className="mt-5 text-house-body leading-relaxed text-on-cream-body">
              {MEDIA_BRAND_STATEMENT.subhead}
            </p>
          </EditorialReveal>
        </div>
        <ul className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3 md:gap-6">
          {MEDIA_BRAND_STATEMENT.pillars.map((pillar, i) => (
            <li key={pillar.title}>
              <EditorialReveal delay={i * 80}>
                <div className="h-full border border-[#766d42]/20 bg-[#faf8f5] px-6 py-8 text-center shadow-[inset_0_0_0_1px_rgba(220,203,123,0.12)]">
                  <h3 className="font-editorial text-lg tracking-[0.04em] text-[#1d3c34]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-house-body text-sm leading-relaxed text-on-cream-body">
                    {pillar.description}
                  </p>
                </div>
              </EditorialReveal>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="coverage"
        aria-labelledby="coverage-heading"
        className="px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <EditorialReveal className="mb-14 text-center md:mb-16">
            <EditorialEyebrow className="mb-4">Featured Coverage</EditorialEyebrow>
            <h2
              id="coverage-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.06em] text-[#1d3c34]"
            >
              Press & Editorial
            </h2>
          </EditorialReveal>

          {MEDIA_PRESS_ITEMS.map((item, index) => (
            <MediaPressCard
              key={item.id}
              item={item}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <InstagramFeedSection profileUrl={BIANCA_INSTAGRAM_URL} />

      <SiteFooter />
    </main>
  );
}
