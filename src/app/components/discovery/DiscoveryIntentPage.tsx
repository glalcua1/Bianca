import { useEffect, useState } from "react";
import { Link } from "react-router";
import SiteNav from "../SiteNav";
import SiteFooter from "../SiteFooter";
import ConsultationDrawer from "../consultation/ConsultationDrawer";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import FaqAccordion from "../faq/FaqAccordion";
import WhyCtaButton from "../whyBianca/WhyCtaButton";
import { usePageMeta } from "../../hooks/usePageMeta";
import { BIANCA_PUBLIC_ORIGIN } from "../../lib/atelierEnquiry";
import type { DiscoveryIntentConfig } from "../../data/discoveryIntentTypes";
import { BIANCA_PHONE_DISPLAY, BIANCA_PHONE_TEL } from "../../data/siteContact";

function DiscoveryJsonLd({ config }: { config: DiscoveryIntentConfig }) {
  useEffect(() => {
    const pageUrl = `${BIANCA_PUBLIC_ORIGIN}${config.path}`;
    const payloads = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: config.seo.title,
        description: config.seo.description,
        isPartOf: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#website` },
        about: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: config.faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BIANCA_PUBLIC_ORIGIN}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: config.breadcrumbName,
            item: pageUrl,
          },
        ],
      },
    ];

    const scripts = payloads.map((data, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = `${config.jsonLdPrefix}-${i}`;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, [config]);

  return null;
}

export default function DiscoveryIntentPage({
  config,
}: {
  config: DiscoveryIntentConfig;
}) {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(config.seo.title, config.seo.description, {
    canonical: `${BIANCA_PUBLIC_ORIGIN}${config.path}`,
  });

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <DiscoveryJsonLd config={config} />
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <header className="relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(220,203,123,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="mb-5">
            {config.eyebrow}
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[0.05em] text-[#f9f9f9]">
            {config.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
            {config.heroLead}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhyCtaButton
              variant="primary-light"
              onClick={() => setConsultationOpen(true)}
            >
              Book a consultation
            </WhyCtaButton>
            <WhyCtaButton variant="ghost-light" to="/fine-jewellery">
              Explore Fine Jewellery
            </WhyCtaButton>
          </div>
        </div>
      </header>

      <section
        aria-labelledby={`${config.jsonLdPrefix}-serve`}
        className="border-b border-[#1d3c34]/10 px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <EditorialReveal>
            <EditorialEyebrow className="mb-4">
              {config.sectionEyebrow}
            </EditorialEyebrow>
            <h2
              id={`${config.jsonLdPrefix}-serve`}
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              {config.sectionTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-house-body leading-relaxed text-on-cream-body">
              {config.sectionBody}
            </p>
            {config.chips && config.chips.length > 0 ? (
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {config.chips.map((chip) => (
                  <li
                    key={chip}
                    className="font-editorial text-[13px] uppercase tracking-[0.16em] text-[#1d3c34]"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
          </EditorialReveal>
        </div>
      </section>

      <section
        aria-labelledby={`${config.jsonLdPrefix}-why`}
        className="bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <EditorialReveal className="mx-auto max-w-2xl text-center">
            <EditorialEyebrow className="mb-4">The house</EditorialEyebrow>
            <h2
              id={`${config.jsonLdPrefix}-why`}
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              {config.pillarsTitle}
            </h2>
          </EditorialReveal>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {config.pillars.map((pillar) => (
              <li key={pillar.id} className="text-center md:text-left">
                <h3 className="font-editorial text-sm uppercase tracking-[0.14em] text-[#1d3c34]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-cream-body">
                  {pillar.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby={`${config.jsonLdPrefix}-paths`}
        className="px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <EditorialReveal>
            <h2
              id={`${config.jsonLdPrefix}-paths`}
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              {config.pathsTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-house-body leading-relaxed text-on-cream-body">
              {config.pathsBody}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {config.pathLinks.map((link, index) => (
                <WhyCtaButton
                  key={link.to}
                  to={link.to}
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {link.label}
                </WhyCtaButton>
              ))}
            </div>
          </EditorialReveal>
        </div>
      </section>

      <section
        aria-labelledby={`${config.jsonLdPrefix}-faq`}
        className="border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <EditorialReveal className="text-center">
            <EditorialEyebrow className="mb-4">Questions</EditorialEyebrow>
            <h2
              id={`${config.jsonLdPrefix}-faq`}
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              {config.faqTitle}
            </h2>
          </EditorialReveal>
          <div className="mt-10">
            <FaqAccordion items={config.faqItems} />
          </div>
          {config.afterFaq}
          <p className="mt-8 text-center text-sm text-on-cream-body">
            More on the house:{" "}
            <Link
              to="/why-bianca-diamonds"
              className="underline decoration-[#766d42]/40 underline-offset-4 transition hover:decoration-[#1d3c34]"
            >
              Why Choose Bianca
            </Link>
            {" · "}
            <Link
              to="/lab-grown-diamond-faq"
              className="underline decoration-[#766d42]/40 underline-offset-4 transition hover:decoration-[#1d3c34]"
            >
              FAQ
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[#1d3c34] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#f9f9f9]">
            {config.finalTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-house-body text-on-forest-body">
            {config.finalBody}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <WhyCtaButton
              variant="primary-light"
              onClick={() => setConsultationOpen(true)}
            >
              Book a consultation
            </WhyCtaButton>
            <a
              href={BIANCA_PHONE_TEL}
              className="inline-flex min-w-[200px] justify-center border border-[#f9f9f9]/35 px-8 py-3.5 text-house-cta text-[#f9f9f9] transition-colors duration-500 hover:border-[#f9f9f9] hover:bg-[#f9f9f9] hover:text-bianca-forest"
            >
              Call {BIANCA_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage={config.sourcePage}
      />
    </main>
  );
}
