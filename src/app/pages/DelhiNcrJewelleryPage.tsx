import { useEffect, useState } from "react";
import { Link } from "react-router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import FaqAccordion from "../components/faq/FaqAccordion";
import WhyCtaButton from "../components/whyBianca/WhyCtaButton";
import { usePageMeta } from "../hooks/usePageMeta";
import { BIANCA_PUBLIC_ORIGIN } from "../lib/atelierEnquiry";
import {
  DELHI_NCR_CITIES,
  DELHI_NCR_FAQ_ITEMS,
  DELHI_NCR_PATH,
  DELHI_NCR_PILLARS,
  DELHI_NCR_SEO,
} from "../data/delhiNcrJewellery";
import { BIANCA_PHONE_DISPLAY, BIANCA_PHONE_TEL } from "../data/siteContact";

function DelhiNcrJsonLd() {
  useEffect(() => {
    const pageUrl = `${BIANCA_PUBLIC_ORIGIN}${DELHI_NCR_PATH}`;

    const payloads = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: DELHI_NCR_SEO.title,
        description: DELHI_NCR_SEO.description,
        isPartOf: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#website` },
        about: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: DELHI_NCR_FAQ_ITEMS.map((item) => ({
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
            name: "Lab-Grown Diamond Jewellery in Delhi NCR",
            item: pageUrl,
          },
        ],
      },
    ];

    const scripts = payloads.map((data, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = `delhi-ncr-jsonld-${i}`;
      el.textContent = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      scripts.forEach((el) => el.remove());
    };
  }, []);

  return null;
}

export default function DelhiNcrJewelleryPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(DELHI_NCR_SEO.title, DELHI_NCR_SEO.description, {
    canonical: `${BIANCA_PUBLIC_ORIGIN}${DELHI_NCR_PATH}`,
  });

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <DelhiNcrJsonLd />
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
            Bianca Diamonds
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[0.05em] text-[#f9f9f9]">
            Lab-grown diamond jewellery in Delhi NCR
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
            A Delhi-rooted house of IGI-certified lab-grown diamonds — private
            consultation and atelier pieces for clients across Delhi, Gurugram,
            Noida, Faridabad, and Ghaziabad.
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
        aria-labelledby="ncr-serve-heading"
        className="border-b border-[#1d3c34]/10 px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <EditorialReveal>
            <EditorialEyebrow className="mb-4">Service area</EditorialEyebrow>
            <h2
              id="ncr-serve-heading"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Serving Delhi NCR
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-house-body leading-relaxed text-on-cream-body">
              Looking for lab-grown diamond jewellers in NCR? Bianca Diamonds
              serves the National Capital Region with certified stones, modern
              design, and one-to-one guidance — from first idea to delivery.
            </p>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {DELHI_NCR_CITIES.map((city) => (
                <li
                  key={city}
                  className="font-editorial text-[13px] uppercase tracking-[0.16em] text-[#1d3c34]"
                >
                  {city}
                </li>
              ))}
            </ul>
          </EditorialReveal>
        </div>
      </section>

      <section
        aria-labelledby="ncr-why-heading"
        className="bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <EditorialReveal className="mx-auto max-w-2xl text-center">
            <EditorialEyebrow className="mb-4">The house</EditorialEyebrow>
            <h2
              id="ncr-why-heading"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Why NCR clients choose Bianca
            </h2>
          </EditorialReveal>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {DELHI_NCR_PILLARS.map((pillar) => (
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
        aria-labelledby="ncr-paths-heading"
        className="px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <EditorialReveal>
            <h2
              id="ncr-paths-heading"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Start with the salon — or go bespoke
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-house-body leading-relaxed text-on-cream-body">
              Browse IGI-certified rings, earrings, necklaces, and bracelets, or
              commission a piece made around your vision.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhyCtaButton to="/fine-jewellery">Fine Jewellery</WhyCtaButton>
              <WhyCtaButton variant="secondary" to="/bespoke-jewellery">
                Bespoke Jewellery
              </WhyCtaButton>
              <WhyCtaButton variant="secondary" to="/why-bianca-diamonds">
                Why Choose Bianca
              </WhyCtaButton>
            </div>
          </EditorialReveal>
        </div>
      </section>

      <section
        aria-labelledby="ncr-faq-heading"
        className="border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <EditorialReveal className="text-center">
            <EditorialEyebrow className="mb-4">Questions</EditorialEyebrow>
            <h2
              id="ncr-faq-heading"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Delhi NCR — frequently asked
            </h2>
          </EditorialReveal>
          <div className="mt-10">
            <FaqAccordion items={DELHI_NCR_FAQ_ITEMS} />
          </div>
          <p className="mt-8 text-center text-sm text-on-cream-body">
            More on certification:{" "}
            <Link
              to="/lab-grown-diamond-faq"
              className="underline decoration-[#766d42]/40 underline-offset-4 transition hover:decoration-[#1d3c34]"
            >
              Lab-Grown Diamond FAQ
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-[#1d3c34] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#f9f9f9]">
            Speak with the house
          </h2>
          <p className="mx-auto mt-5 max-w-md text-house-body text-on-forest-body">
            Private consultation for Delhi NCR clients — call, WhatsApp, or book
            online.
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
        sourcePage="delhi-ncr"
      />
    </main>
  );
}
