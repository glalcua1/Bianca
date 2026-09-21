import { useEffect, useState } from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import EditorialEyebrow from "../components/editorial/EditorialEyebrow";
import EditorialReveal from "../components/editorial/EditorialReveal";
import ConsultationDrawer from "../components/consultation/ConsultationDrawer";
import { usePageMeta } from "../hooks/usePageMeta";
import {
  BIANCA_EMAIL,
  BIANCA_INSTAGRAM_URL,
  BIANCA_PHONE_DISPLAY,
  BIANCA_PHONE_TEL,
  BIANCA_WHATSAPP_CONTACT_DISPLAY,
  BIANCA_WHATSAPP_CONTACT_NUMBER,
} from "../data/siteContact";
import { buildWhatsAppChatUrl } from "../lib/whatsappContact";

const CONTACT_SEO = {
  title: "Contact Bianca Diamonds | Private Consultation Delhi NCR",
  description:
    "Book a private consultation with Bianca Diamonds — Delhi NCR lab-grown diamond jewellers. Call, WhatsApp, or email for IGI-certified fine jewellery and bespoke enquiries.",
};

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState(() =>
    buildWhatsAppChatUrl(BIANCA_WHATSAPP_CONTACT_NUMBER, { forceMobile: true }),
  );

  usePageMeta(CONTACT_SEO.title, CONTACT_SEO.description);

  useEffect(() => {
    setWhatsappHref(buildWhatsAppChatUrl(BIANCA_WHATSAPP_CONTACT_NUMBER));
  }, []);

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
            Arrange a private consultation for Delhi NCR and beyond — call,
            WhatsApp, or book online for IGI-certified lab-grown diamond fine
            jewellery.
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
            href={BIANCA_PHONE_TEL}
            className="inline-flex w-full items-center justify-center gap-2.5 border border-[#766d42]/30 bg-[#f4f0e6]/50 px-8 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#1d3c34] transition hover:border-[#766d42]/50"
          >
            <Phone className="size-4 text-gold-on-cream" aria-hidden />
            Call us {BIANCA_PHONE_DISPLAY}
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2.5 border border-[#766d42]/30 bg-[#f4f0e6]/50 px-8 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#1d3c34] transition hover:border-[#766d42]/50"
          >
            <WhatsAppGlyph className="size-4 text-gold-on-cream" />
            WhatsApp us {BIANCA_WHATSAPP_CONTACT_DISPLAY}
            <span className="sr-only"> (opens in new tab)</span>
          </a>

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
