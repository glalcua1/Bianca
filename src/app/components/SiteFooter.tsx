import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Instagram, Mail } from "lucide-react";
import { BiancaForestNavLogo } from "./BiancaLogo";
import SiteCopyright from "./SiteCopyright";
import ConsultationDrawer from "./consultation/ConsultationDrawer";
import FaqDrawer from "./faq/FaqDrawer";
import {
  BIANCA_EMAIL,
  BIANCA_INSTAGRAM_URL,
  SITE_NAV_ITEMS,
  consultationSourcePage,
} from "../data/siteContact";

export default function SiteFooter() {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(false);
  const { pathname } = useLocation();
  const sourcePage = consultationSourcePage(pathname);

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
                <button
                  type="button"
                  onClick={() => setFaqOpen(true)}
                  className="block w-full font-editorial text-[13px] uppercase tracking-[0.14em] text-on-forest-body transition-colors hover:text-on-forest md:text-[14px] md:tracking-[0.16em]"
                >
                  Lab-Grown Diamond FAQs
                </button>
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

      <ConsultationDrawer
        open={consultationOpen}
        onOpenChange={setConsultationOpen}
        sourcePage={sourcePage}
      />

      <FaqDrawer open={faqOpen} onOpenChange={setFaqOpen} />
    </>
  );
}
