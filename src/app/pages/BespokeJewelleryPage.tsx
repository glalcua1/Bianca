import { useState } from "react";
import { MessageCircle } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialReveal from "../components/editorial/EditorialReveal";
import ProtectedImage from "../components/protection/ProtectedImage";
import FaqAccordion from "../components/faq/FaqAccordion";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import BespokeEnquiryForm from "../components/bespoke/BespokeEnquiryForm";
import BespokeHero from "../components/bespoke/BespokeHero";
import BespokeSectionHeader from "../components/bespoke/BespokeSectionHeader";
import BespokeSalonPlate from "../components/bespoke/BespokeSalonPlate";
import BespokeJourneyTimeline from "../components/bespoke/BespokeJourneyTimeline";
import BespokeSalonFilms from "../components/bespoke/BespokeSalonFilms";
import BespokeWhySection from "../components/bespoke/BespokeWhySection";
import BespokeOrchidBackdrop from "../components/bespoke/BespokeOrchidBackdrop";
import BespokeButterflyMark from "../components/bespoke/BespokeButterflyMark";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  BESPOKE_FAQ_ITEMS,
  BESPOKE_JEWELLERY_SEO,
  BESPOKE_LAB_GROWN_COMPARISON,
} from "../data/bespokeJewellery";
import { BIANCA_WHATSAPP_NUMBER } from "../data/siteContact";

function scrollToEnquiry() {
  document
    .getElementById("bespoke-enquiry")
    ?.scrollIntoView({ behavior: "smooth" });
}

export default function BespokeJewelleryPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(BESPOKE_JEWELLERY_SEO.title, BESPOKE_JEWELLERY_SEO.description);

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="bespoke-jewellery" />
      </div>

      <BespokeHero
        onStartJourney={scrollToEnquiry}
        onBookConsultation={() => setConsultationOpen(true)}
      />

      {/* The Art of Bespoke */}
      <section
        aria-labelledby="art-of-bespoke-heading"
        className="relative border-t border-[#766d42]/12 px-6 py-24 md:px-10 md:py-32"
      >
        <BespokeOrchidBackdrop variant="wash" />
        <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <EditorialReveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-[#766d42]/20">
                <ProtectedImage
                  src="/vase-with-flowers-vase-with-words-orchid-it.jpg"
                  alt="White orchids in glass vase — Bianca bespoke salon"
                  wrapperClassName="size-full"
                  className="size-full object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 480px"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 w-[55%] max-w-[220px] ring-1 ring-[#766d42]/25 shadow-[0_20px_50px_rgba(29,60,52,0.12)] md:-right-8">
                <ProtectedImage
                  src="/Pendant/Necklace2c.jpg"
                  alt="Bespoke pear diamond pendant necklace — Bianca Diamonds"
                  wrapperClassName="aspect-[4/5] w-full bg-[#faf8f5]"
                  className="size-full object-cover object-center"
                />
              </div>
              <BespokeButterflyMark
                tone="gold"
                className="absolute -left-2 top-8 size-8 opacity-35 md:-left-4 md:size-10"
              />
            </div>
          </EditorialReveal>

          <EditorialReveal delay={120}>
            <BespokeSectionHeader
              id="art-of-bespoke-heading"
              align="left"
              eyebrow="The Art of Bespoke"
              title="What Makes Bespoke Jewellery Extraordinary?"
              className="mb-0 md:mb-0"
            />
            <div className="mt-8 space-y-5 text-house-body leading-relaxed text-on-cream-body">
              <p>
                True luxury is not choosing from a collection. It is creating
                something that exists nowhere else in the world.
              </p>
              <p>
                A bespoke piece is designed around your story, your milestones,
                and your aspirations — rooted in Indian craft tradition, composed
                for a global audience.
              </p>
              <p>
                Whether an engagement, anniversary, family legacy, or personal
                milestone, our atelier transforms your vision into a timeless
                creation crafted exclusively for you.
              </p>
            </div>
            <blockquote className="mt-12 border-l border-[#dccb7b] pl-8">
              <p className="font-editorial text-[clamp(1.2rem,2.5vw,1.5rem)] italic leading-snug tracking-[0.03em] text-[#1d3c34]">
                &ldquo;The most meaningful jewellery is the piece that tells your
                story.&rdquo;
              </p>
            </blockquote>
          </EditorialReveal>
        </div>
      </section>

      <BespokeJourneyTimeline />

      <BespokeSalonFilms />

      <BespokeWhySection />

      {/* Lab-Grown */}
      <section
        aria-labelledby="lab-grown-heading"
        className="border-y border-[#766d42]/15 bg-[#1d3c34] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <BespokeSectionHeader
            tone="dark"
            eyebrow="Modern Luxury"
            title="Modern Luxury For A New Generation"
            subtitle="Exceptional jewellery should unite beauty, innovation, and responsibility — IGI-certified lab-grown diamonds with the same brilliance as mined stones, and a more conscious choice for the world."
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {BESPOKE_LAB_GROWN_COMPARISON.map((item, index) => (
              <EditorialReveal key={item.id} delay={index * 60}>
                <li className="border border-[#766d42]/25 bg-[#1d3c34] p-6 text-center transition duration-300 ease-out hover:border-[#dccb7b]/50 hover:bg-[#243f38] motion-reduce:transition-none">
                  <p className="text-house-eyebrow text-gold-on-forest">
                    {item.label}
                  </p>
                  <p className="mt-3 font-editorial text-[15px] leading-snug tracking-[0.03em] text-[#f9f9f9]">
                    {item.value}
                  </p>
                </li>
              </EditorialReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Meet Your Designer */}
      <section
        aria-labelledby="designer-heading"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          <EditorialReveal>
            <BespokeSalonPlate variant="salon" className="mx-auto w-full max-w-md lg:max-w-none">
              <ProtectedImage
                src="/founder.jpg"
                alt="Bianca Diamonds design team"
                wrapperClassName="absolute inset-0"
                className="size-full object-cover object-center"
              />
            </BespokeSalonPlate>
          </EditorialReveal>

          <EditorialReveal delay={120}>
            <BespokeSectionHeader
              align="left"
              eyebrow="Meet Your Designer"
              title="A Personal Design Experience"
              className="mb-0"
            />
            <div className="mt-8 space-y-5 text-house-body leading-relaxed text-on-cream-body">
              <p>
                Every bespoke journey deserves personal attention. Our design
                team works closely with you to understand your vision, guide
                creative decisions, and ensure every detail reflects your story.
              </p>
              <p>
                From the first sketch to the final polish, you are welcomed into
                the atelier — not as a customer, but as a collaborator in the
                creation of something truly yours.
              </p>
            </div>
          </EditorialReveal>
        </div>
      </section>

      {/* Enquiry */}
      <section
        id="bespoke-enquiry"
        aria-labelledby="enquiry-heading"
        className="relative overflow-hidden border-t border-[#766d42]/15 bg-[#f4f0e6] px-6 py-24 md:px-10 md:py-32"
      >
        <div className="relative mx-auto max-w-6xl">
          <BespokeSectionHeader
            id="enquiry-heading"
            eyebrow="Begin"
            title="Begin Your Bespoke Journey"
            subtitle="Share your vision with our design team — every detail helps us craft a creation as unique as your story."
          />

          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[420px_minmax(0,640px)] xl:justify-center xl:gap-20">
            <EditorialReveal className="mx-auto w-full max-w-[320px] lg:sticky lg:top-24 lg:mx-0 lg:max-w-none">
              <div className="pointer-events-none" aria-hidden>
                <ProtectedImage
                  src="/Sketch.png"
                  alt=""
                  wrapperClassName="block w-full"
                  className="w-full h-auto object-contain drop-shadow-[0_28px_56px_rgba(29,60,52,0.11)]"
                  sizes="(max-width: 1024px) 80vw, 420px"
                  loading="lazy"
                />
              </div>
              <p className="mt-6 text-center font-editorial text-[13px] italic leading-relaxed tracking-[0.05em] text-[#1d3c34]/75 lg:text-left">
                From first sketch to finished masterpiece.
              </p>
            </EditorialReveal>

            <div className="min-w-0">
              <BespokeEnquiryForm sourcePage="bespoke-jewellery" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="bespoke-faq-heading"
        className="px-6 py-24 md:px-10 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <BespokeSectionHeader eyebrow="Questions" title="Frequently Asked Questions" />

          <EditorialReveal>
            <FaqAccordion items={BESPOKE_FAQ_ITEMS} />
          </EditorialReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="final-cta-heading"
        className="relative overflow-hidden bg-[#1d3c34] px-6 py-28 md:px-10 md:py-36"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(220,203,123,0.1),transparent_60%)]"
          aria-hidden
        />
        <EditorialReveal className="relative mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="font-editorial text-[clamp(1.85rem,4.5vw,3rem)] tracking-[0.06em] text-[#f9f9f9]"
          >
            Create Something That Exists Nowhere Else
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
            Your story deserves a creation as unique as the moments that inspire
            it.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => setConsultationOpen(true)}
              className="inline-flex min-w-[240px] justify-center border border-[#f9f9f9] bg-[#f9f9f9] px-10 py-3.5 text-house-cta text-[#1d3c34] transition duration-300 ease-out hover:bg-transparent hover:text-[#f9f9f9]"
            >
              Book A Private Consultation
            </button>
            <a
              href={`https://wa.me/${BIANCA_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[240px] items-center justify-center gap-2 border border-[#f9f9f9]/35 px-10 py-3.5 text-house-cta text-[#f9f9f9] transition duration-300 ease-out hover:border-[#f9f9f9] hover:bg-[#f9f9f9]/10"
            >
              <MessageCircle className="size-4" aria-hidden />
              Speak With A Jewellery Designer
              <span className="sr-only"> (opens WhatsApp in new tab)</span>
            </a>
          </div>
        </EditorialReveal>
      </section>

      <SiteFooter />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="bespoke-jewellery"
      />
    </main>
  );
}
