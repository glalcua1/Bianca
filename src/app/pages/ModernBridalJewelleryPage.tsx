import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import FaqAccordion from "../components/faq/FaqAccordion";
import WhyCtaButton from "../components/whyBianca/WhyCtaButton";
import CollectionPhotoFrame from "../components/CollectionPhotoFrame";
import ProtectedImage from "../components/protection/ProtectedImage";
import AtelierPieceLightbox from "../components/AtelierPieceLightbox";
import { usePageMeta } from "../hooks/usePageMeta";
import { BIANCA_PUBLIC_ORIGIN } from "../lib/atelierEnquiry";
import { ATELIER_PIECES } from "../data/fineJewelleryCollections";
import {
  MODERN_BRIDAL_CURATED_IDS,
  MODERN_BRIDAL_FAQ_ITEMS,
  MODERN_BRIDAL_PATH,
  MODERN_BRIDAL_SEO,
  MODERN_BRIDE_EDITORIAL,
} from "../data/modernBridalJewellery";
import { BIANCA_IGI_CERTIFICATION_POLICY } from "../data/labGrownDiamondFaq";
import { fineJewelleryCategoryPath } from "../data/fineJewelleryMegaMenu";
import { BIANCA_PHONE_DISPLAY, BIANCA_PHONE_TEL } from "../data/siteContact";

function ModernBridalJsonLd() {
  useEffect(() => {
    const pageUrl = `${BIANCA_PUBLIC_ORIGIN}${MODERN_BRIDAL_PATH}`;
    const payloads = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: MODERN_BRIDAL_SEO.title,
        description: MODERN_BRIDAL_SEO.description,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${BIANCA_PUBLIC_ORIGIN}${MODERN_BRIDE_EDITORIAL.src}`,
        },
        isPartOf: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#website` },
        about: { "@id": `${BIANCA_PUBLIC_ORIGIN}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: MODERN_BRIDAL_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
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
            name: "Jewellery for the Modern Bride",
            item: pageUrl,
          },
        ],
      },
    ];

    const scripts = payloads.map((data, i) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = `modern-bridal-jsonld-${i}`;
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

export default function ModernBridalJewelleryPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  usePageMeta(MODERN_BRIDAL_SEO.title, MODERN_BRIDAL_SEO.description, {
    canonical: `${BIANCA_PUBLIC_ORIGIN}${MODERN_BRIDAL_PATH}`,
    ogImage: `${BIANCA_PUBLIC_ORIGIN}${MODERN_BRIDE_EDITORIAL.src}`,
  });

  const curated = useMemo(() => {
    const byId = new Map(ATELIER_PIECES.map((p) => [p.id, p]));
    return MODERN_BRIDAL_CURATED_IDS.map((id) => byId.get(id)).filter(
      (p): p is NonNullable<typeof p> => Boolean(p),
    );
  }, []);

  function openPiece(pieceId: string) {
    const index = curated.findIndex((p) => p.id === pieceId);
    if (index < 0) return;
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <ModernBridalJsonLd />
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      {/* Full-bleed editorial hero — brand first, one composition */}
      <header className="relative isolate min-h-[100svh] overflow-hidden bg-[#1d3c34]">
        <div className="absolute inset-0">
          <ProtectedImage
            src={MODERN_BRIDE_EDITORIAL.src}
            alt={MODERN_BRIDE_EDITORIAL.alt}
            className="size-full object-cover object-[center_top]"
            priority
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(105deg,rgba(29,60,52,0.92)_0%,rgba(29,60,52,0.72)_38%,rgba(29,60,52,0.28)_62%,rgba(29,60,52,0.12)_100%)] md:bg-[linear-gradient(100deg,rgba(29,60,52,0.94)_0%,rgba(29,60,52,0.78)_34%,rgba(29,60,52,0.22)_58%,transparent_78%)]"
            aria-hidden
          />
        </div>

        <div className="relative z-[1] mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28 md:justify-center md:px-10 md:pb-24 md:pt-32">
          <div className="max-w-xl">
            <EditorialEyebrow tone="gold" className="mb-5">
              Bianca Diamonds
            </EditorialEyebrow>
            <h1 className="font-editorial text-[clamp(2.5rem,6vw,4.25rem)] font-normal leading-[1.05] tracking-[0.04em] text-[#f9f9f9]">
              The Modern Bride
            </h1>
            <p className="mt-6 max-w-md text-house-body leading-relaxed text-on-forest-body">
              Quiet luxury for the aisle and after — IGI-certified lab-grown
              diamonds, composed with restraint and light.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhyCtaButton
                variant="primary-light"
                onClick={() => setConsultationOpen(true)}
              >
                Book a bridal consultation
              </WhyCtaButton>
              <WhyCtaButton variant="ghost-light" to="#bridal-edit">
                View the bridal edit
              </WhyCtaButton>
            </div>
          </div>
        </div>
      </header>

      {/* Manifesto */}
      <section
        aria-labelledby="bridal-manifesto"
        className="border-b border-[#1d3c34]/10 px-6 py-16 md:px-10 md:py-24"
      >
        <EditorialReveal className="mx-auto max-w-2xl text-center">
          <EditorialEyebrow className="mb-4">The edit</EditorialEyebrow>
          <h2
            id="bridal-manifesto"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Less noise. More light.
          </h2>
          <p className="mt-6 text-house-body leading-relaxed text-on-cream-body">
            A modern bridal wardrobe begins with pieces she will wear beyond the
            wedding day — a solitaire that reads as promise, studs that hold
            every hour, a pendant that rests close to the throat.{" "}
            {BIANCA_IGI_CERTIFICATION_POLICY}
          </p>
        </EditorialReveal>
      </section>

      {/* Curated bridal jewellery */}
      <section
        id="bridal-edit"
        aria-labelledby="bridal-edit-heading"
        className="bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <EditorialReveal className="mx-auto max-w-2xl text-center">
            <EditorialEyebrow className="mb-4">Curated from the atelier</EditorialEyebrow>
            <h2
              id="bridal-edit-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Bridal jewellery, chosen with care
            </h2>
            <p className="mt-5 text-house-body leading-relaxed text-on-cream-body">
              A salon selection — bridal rings and blue diamond colour for the
              proposal, earrings for the aisle, and necklaces from tennis to
              fringe for the throat, the reception, and every night after.
            </p>
          </EditorialReveal>

          <ul className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {curated.map((piece, index) => (
              <li key={piece.id}>
                <EditorialReveal>
                  <button
                    type="button"
                    onClick={() => openPiece(piece.id)}
                    className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d3c34]/40"
                    aria-label={`View ${piece.title} in the salon`}
                  >
                    <CollectionPhotoFrame
                      fluid
                      src={piece.image}
                      alt={piece.alt}
                      imageWellColor={piece.imageWellColor}
                      data-name={`modern-bride-${piece.id}`}
                    />
                    <p className="mt-5 font-editorial text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
                      {String(index + 1).padStart(2, "0")} · {piece.category}
                    </p>
                    <h3 className="mt-2 font-editorial text-[clamp(1.05rem,2vw,1.2rem)] tracking-[0.04em] text-[#1d3c34] transition-colors group-hover:text-[#1d3c34]/80">
                      {piece.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-on-cream-body">
                      {piece.description}
                    </p>
                  </button>
                </EditorialReveal>
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhyCtaButton to="/fine-jewellery/rings">Explore rings</WhyCtaButton>
            <WhyCtaButton variant="secondary" to="/fine-jewellery">
              Enter the full salon
            </WhyCtaButton>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section
        aria-labelledby="bridal-paths"
        className="px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:gap-16">
          <EditorialReveal>
            <EditorialEyebrow className="mb-4">The Bridal Edit</EditorialEyebrow>
            <h2
              id="bridal-paths"
              className="font-editorial text-[clamp(1.5rem,3vw,2.1rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              For the vow
            </h2>
            <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
              Solitaires, bridal duos, and luminous drops — pieces that hold
              the ceremony and photograph with quiet confidence.
            </p>
            <Link
              to="/fine-jewellery#collections"
              className="mt-6 inline-block font-editorial text-[13px] uppercase tracking-[0.16em] text-[#1d3c34] underline decoration-[#766d42]/35 underline-offset-8 transition hover:decoration-[#1d3c34]"
            >
              Discover The Bridal Edit
            </Link>
          </EditorialReveal>
          <EditorialReveal>
            <EditorialEyebrow className="mb-4">Modern Essentials</EditorialEyebrow>
            <h2 className="font-editorial text-[clamp(1.5rem,3vw,2.1rem)] tracking-[0.05em] text-[#1d3c34]">
              For every day after
            </h2>
            <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
              Studs, tennis lines, and refined bands designed for modern living —
              the jewellery she reaches for when the celebrations settle into
              life.
            </p>
            <Link
              to={fineJewelleryCategoryPath("earrings")}
              className="mt-6 inline-block font-editorial text-[13px] uppercase tracking-[0.16em] text-[#1d3c34] underline decoration-[#766d42]/35 underline-offset-8 transition hover:decoration-[#1d3c34]"
            >
              Browse Modern Essentials
            </Link>
          </EditorialReveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="bridal-faq"
        className="border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <EditorialReveal className="text-center">
            <EditorialEyebrow className="mb-4">Questions</EditorialEyebrow>
            <h2
              id="bridal-faq"
              className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Modern bride — frequently asked
            </h2>
          </EditorialReveal>
          <div className="mt-10">
            <FaqAccordion items={MODERN_BRIDAL_FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1d3c34] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#f9f9f9]">
            Compose your bridal edit
          </h2>
          <p className="mx-auto mt-5 max-w-md text-house-body text-on-forest-body">
            Private consultation for modern brides — across Delhi NCR and India.
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

      <AtelierPieceLightbox
        pieces={curated}
        activeIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onActiveIndexChange={setLightboxIndex}
      />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="modern-bride"
      />
    </main>
  );
}
