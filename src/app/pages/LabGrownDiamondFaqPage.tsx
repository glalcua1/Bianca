import { Link } from "react-router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import FaqAccordion from "../components/faq/FaqAccordion";
import FaqFourCsCards from "../components/faq/FaqFourCsCards";
import FaqJsonLd from "../components/faq/FaqJsonLd";
import FaqTrustPillars from "../components/faq/FaqTrustPillars";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  LAB_GROWN_CERTIFICATION_LINKS,
  LAB_GROWN_FAQ_ITEMS,
  LAB_GROWN_FAQ_SEO,
  LAB_GROWN_FAQ_TRUST_PILLARS,
  LAB_GROWN_FOUR_CS,
} from "../data/labGrownDiamondFaq";

export default function LabGrownDiamondFaqPage() {
  usePageMeta(LAB_GROWN_FAQ_SEO.title, LAB_GROWN_FAQ_SEO.description);

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <FaqJsonLd />

      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <header className="relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28 lg:py-36">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(220,203,123,0.14),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 40%, rgba(249,249,249,0.15) 50%, transparent 60%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[url('/media/ipop_bianca.png')] bg-cover bg-center opacity-[0.04] mix-blend-screen"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <EditorialEyebrow tone="gold" className="mb-6">
            Knowledge Centre
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.08] tracking-[0.06em] text-[#f9f9f9]">
            Lab-Grown Diamond FAQs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-house-body text-on-forest-body">
            Everything you need to know about certified lab-grown diamonds,
            their quality, value, sustainability, and craftsmanship.
          </p>
          <div className="mt-10">
            <Link
              to="/fine-jewellery"
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/35 px-10 py-3 text-house-cta text-[#f9f9f9] transition-colors duration-500 hover:border-[#f9f9f9] hover:bg-[#f9f9f9] hover:text-bianca-forest"
            >
              Explore Fine Jewellery
            </Link>
          </div>
        </div>
      </header>

      <section
        aria-label="Trust pillars"
        className="border-b border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-12 md:px-10 md:py-16"
      >
        <FaqTrustPillars pillars={LAB_GROWN_FAQ_TRUST_PILLARS} />
      </section>

      <section
        aria-labelledby="faq-heading"
        className="px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <EditorialReveal className="mb-10 text-center md:mb-14">
            <EditorialEyebrow className="mb-4">Your Questions</EditorialEyebrow>
            <h2
              id="faq-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.5rem)] tracking-[0.06em] text-[#1d3c34]"
            >
              Frequently Asked Questions
            </h2>
          </EditorialReveal>

          <EditorialReveal>
            <FaqAccordion items={LAB_GROWN_FAQ_ITEMS} />
          </EditorialReveal>
        </div>
      </section>

      <section
        aria-labelledby="four-cs-heading"
        className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <EditorialReveal className="mb-12 text-center md:mb-14">
            <EditorialEyebrow className="mb-4">Education</EditorialEyebrow>
            <h2
              id="four-cs-heading"
              className="font-editorial text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-[0.06em] text-[#1d3c34]"
            >
              Understanding the 4Cs of Diamonds
            </h2>
          </EditorialReveal>
          <FaqFourCsCards cards={LAB_GROWN_FOUR_CS} />
        </div>
      </section>

      <section
        aria-labelledby="certification-heading"
        className="px-6 py-16 md:px-10 md:py-24"
      >
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow className="mb-4">Assurance</EditorialEyebrow>
          <h2
            id="certification-heading"
            className="font-editorial text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Why Certification Matters
          </h2>
          <p className="mt-6 text-house-body leading-relaxed text-on-cream-body">
            Bianca Diamonds works with internationally recognized grading
            laboratories to ensure every stone is documented with transparency.
            Independent certification verifies cut, color, clarity, carat
            weight, and origin — giving you confidence in what you wear and
            cherish for generations.
          </p>
          <ul className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            {LAB_GROWN_CERTIFICATION_LINKS.map((lab) => (
              <li key={lab.name}>
                <a
                  href={lab.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col items-center border border-[#766d42]/25 px-8 py-5 transition-colors hover:border-[#766d42]/50 hover:bg-[#f4f0e6]/80"
                >
                  <span className="font-editorial text-lg tracking-[0.12em] uppercase text-[#1d3c34] group-hover:text-gold-on-cream">
                    {lab.name}
                  </span>
                  <span className="mt-1 text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
                    {lab.description}
                  </span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </EditorialReveal>
      </section>

      <section
        aria-labelledby="sustainability-heading"
        className="border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-24"
      >
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow className="mb-4">Philosophy</EditorialEyebrow>
          <h2
            id="sustainability-heading"
            className="font-editorial text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Luxury with Purpose
          </h2>
          <p className="mt-6 text-house-body leading-relaxed text-on-cream-body">
            Modern luxury is defined by intention — exceptional craft, honest
            disclosure, and innovation that respects both artistry and the world
            we share. Lab-grown diamonds represent a conscious evolution: the
            same enduring beauty, shaped through advanced science and the hands
            of master jewellers. At Bianca Diamonds, we invite you to choose
            brilliance with clarity, not compromise.
          </p>
        </EditorialReveal>
      </section>

      <section
        aria-labelledby="faq-cta-heading"
        className="bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
      >
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="mb-6">
            The Atelier
          </EditorialEyebrow>
          <h2
            id="faq-cta-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.06em] text-[#f9f9f9]"
          >
            Discover the Future of Fine Jewellery
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-house-body text-on-forest-body">
            Explore certified lab-grown diamond jewellery crafted for modern
            luxury.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link
              to="/fine-jewellery"
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/35 px-10 py-3 text-house-cta text-[#f9f9f9] transition-colors duration-500 hover:border-[#f9f9f9] hover:bg-[#f9f9f9] hover:text-bianca-forest"
            >
              Shop Fine Jewellery
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/20 px-10 py-3 text-house-cta text-on-forest transition-colors duration-500 hover:border-[#f9f9f9]/50 hover:text-[#f9f9f9]"
            >
              Book a Consultation
            </Link>
          </div>
        </EditorialReveal>
      </section>

      <SiteFooter />
    </main>
  );
}
