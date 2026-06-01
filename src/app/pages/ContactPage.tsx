import { useState } from "react";
import { Instagram, Mail } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  BIANCA_EMAIL,
  BIANCA_INSTAGRAM_URL,
} from "../data/siteContact";

const CONTACT_SEO = {
  title: "Contact Bianca Diamonds | Private Consultation",
  description:
    "Reach the Bianca Diamonds atelier for private consultations, bespoke enquiries, and certified lab-grown diamond fine jewellery.",
};

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);

  usePageMeta(CONTACT_SEO.title, CONTACT_SEO.description);

  return (
    <main className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <header className="relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(220,203,123,0.1),transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="mb-6">
            The Atelier
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2rem,5vw,3.25rem)] tracking-[0.06em] text-[#f9f9f9]">
            Contact Bianca Diamonds
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-house-body text-on-forest-body">
            Arrange a private consultation or connect with our team — we
            welcome enquiries on certified lab-grown diamond fine jewellery.
          </p>
        </div>
      </header>

      <section className="px-6 py-16 md:px-10 md:py-24">
        <EditorialReveal className="mx-auto flex max-w-lg flex-col items-center gap-5">
          <button
            type="button"
            onClick={() => setConsultationOpen(true)}
            className="inline-flex w-full justify-center border border-[#1d3c34] bg-[#1d3c34] px-10 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
          >
            Book a Private Consultation
          </button>

          <a
            href={`mailto:${BIANCA_EMAIL}`}
            className="inline-flex w-full items-center justify-center gap-2.5 border border-[#766d42]/30 bg-[#f4f0e6]/50 px-8 py-3.5 font-body text-sm text-[#1d3c34] transition hover:border-[#766d42]/50"
          >
            <Mail className="size-4 text-gold-on-cream" aria-hidden />
            {BIANCA_EMAIL}
          </a>

          <a
            href={BIANCA_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 border border-[#766d42]/30 px-8 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#1d3c34] transition hover:border-[#766d42]/50"
          >
            <Instagram className="size-4 text-gold-on-cream" aria-hidden />
            Instagram
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </EditorialReveal>
      </section>

      <SiteFooter />

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage="contact"
      />
    </main>
  );
}
