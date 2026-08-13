import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Instagram, Mail, Phone } from "lucide-react";
import { BiancaForestNavLogo } from "./BiancaLogo";
import SiteCopyright from "./SiteCopyright";
import {
  BIANCA_EMAIL,
  BIANCA_INSTAGRAM_URL,
  BIANCA_PHONE_DISPLAY,
  BIANCA_PHONE_TEL,
  BIANCA_WHATSAPP_CONTACT_DISPLAY,
  BIANCA_WHATSAPP_CONTACT_NUMBER,
  SITE_NAV_ITEMS,
  consultationSourcePage,
} from "../data/siteContact";
import { buildWhatsAppChatUrl } from "../lib/whatsappContact";

const ConsultationDrawer = lazy(
  () => import("./consultation/ConsultationDrawer"),
);

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

export default function SiteFooter() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState(() =>
    buildWhatsAppChatUrl(BIANCA_WHATSAPP_CONTACT_NUMBER, { forceMobile: true }),
  );
  const { pathname } = useLocation();
  const sourcePage = consultationSourcePage(pathname);

  useEffect(() => {
    setWhatsappHref(buildWhatsAppChatUrl(BIANCA_WHATSAPP_CONTACT_NUMBER));
  }, []);

  return (
    <>
      <footer
        className="border-t border-[#766d42]/25 bg-[#1d3c34]"
        aria-label="Site footer"
      >
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16 lg:py-20">
          <div className="flex flex-col items-center text-center">
            <Link
              to="/"
              className="mb-8 block shrink-0 transition-opacity hover:opacity-90"
              aria-label="Bianca Diamonds — home"
            >
              <BiancaForestNavLogo maxWidth={112} />
            </Link>
          </div>

          <nav
            aria-label="Site navigation"
            className="border-y border-[#766d42]/20 py-8 md:py-10"
          >
            <ul className="grid grid-cols-2 gap-x-6 gap-y-4 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-10 md:gap-y-3">
              {SITE_NAV_ITEMS.map((item) => {
                const isActive =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.to);
                return (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                        isActive
                          ? "text-gold-on-forest"
                          : "text-on-forest-body hover:text-on-forest"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/lab-grown-diamond-faq"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/lab-grown-diamond-faq")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Lab-Grown Diamond FAQs
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/why-bianca-diamonds"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/why-bianca-diamonds")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Why Choose Bianca
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/lab-grown-diamond-jewellery-delhi-ncr"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith(
                      "/lab-grown-diamond-jewellery-delhi-ncr",
                    )
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Delhi NCR
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/lab-grown-diamond-jewellery-india"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/lab-grown-diamond-jewellery-india")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  India
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/jewellery-for-modern-bride"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/jewellery-for-modern-bride")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Modern Bride
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/jewellery-purchase-plan"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/jewellery-purchase-plan")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Jewellery Purchase Plan
                </Link>
              </li>
              <li className="col-span-2 md:col-span-1">
                <Link
                  to="/contact"
                  className={`block font-editorial text-[13px] uppercase tracking-[0.14em] transition-colors md:text-[14px] md:tracking-[0.16em] ${
                    pathname.startsWith("/contact")
                      ? "text-gold-on-forest"
                      : "text-on-forest-body hover:text-on-forest"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-10 flex flex-col items-center gap-5 md:mt-12 md:gap-6">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold-on-forest">
              Connect with the house
            </p>

            <div className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              <a
                href={BIANCA_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-[#766d42]/40 bg-[#f4f0e6]/5 px-6 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#f9f9f9] transition hover:border-[#dccb7b]/50 hover:bg-[#f4f0e6]/10"
              >
                <Instagram className="size-4 shrink-0 text-[#dccb7b]" aria-hidden />
                Instagram
              </a>

              <button
                type="button"
                onClick={() => setConsultationOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 border border-[#dccb7b]/45 bg-[#dccb7b]/10 px-6 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#f9f9f9] transition hover:border-[#dccb7b]/70 hover:bg-[#dccb7b]/20"
              >
                Book an Appointment
              </button>

              <a
                href={`mailto:${BIANCA_EMAIL}`}
                className="inline-flex items-center justify-center gap-2.5 border border-[#766d42]/40 bg-[#f4f0e6]/5 px-6 py-3.5 font-body text-[13px] tracking-[0.04em] text-[#f9f9f9] transition hover:border-[#dccb7b]/50 hover:bg-[#f4f0e6]/10 sm:text-[14px]"
              >
                <Mail className="size-4 shrink-0 text-[#dccb7b]" aria-hidden />
                <span className="break-all sm:break-normal">{BIANCA_EMAIL}</span>
              </a>

              <a
                href={BIANCA_PHONE_TEL}
                className="inline-flex items-center justify-center gap-2.5 border border-[#766d42]/40 bg-[#f4f0e6]/5 px-6 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#f9f9f9] transition hover:border-[#dccb7b]/50 hover:bg-[#f4f0e6]/10"
              >
                <Phone className="size-4 shrink-0 text-[#dccb7b]" aria-hidden />
                Call us {BIANCA_PHONE_DISPLAY}
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 border border-[#766d42]/40 bg-[#f4f0e6]/5 px-6 py-3.5 font-editorial text-[13px] uppercase tracking-[0.12em] text-[#f9f9f9] transition hover:border-[#dccb7b]/50 hover:bg-[#f4f0e6]/10"
              >
                <WhatsAppGlyph className="size-4 shrink-0 text-[#dccb7b]" />
                WhatsApp us {BIANCA_WHATSAPP_CONTACT_DISPLAY}
              </a>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 md:mt-14">
            <div
              className="h-px w-12 bg-[#766d42]/35"
              aria-hidden
            />
            <SiteCopyright className="text-on-forest-muted" />
          </div>
        </div>
      </footer>

      {consultationOpen && (
        <Suspense fallback={null}>
          <ConsultationDrawer
            open={consultationOpen}
            onOpenChange={setConsultationOpen}
            sourcePage={sourcePage}
          />
        </Suspense>
      )}
    </>
  );
}
