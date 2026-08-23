import type { NavActiveItem } from "../context/NavActiveContext";

export const BIANCA_INSTAGRAM_URL =
  "https://www.instagram.com/bianca.diamonds?igsh=M3didm9lb2pidXBi";

export const BIANCA_YOUTUBE_URL = "https://www.youtube.com/@BiancaDiamonds";

export const BIANCA_LINKEDIN_URL =
  "https://www.linkedin.com/in/shwetalal-bianca/";

export const BIANCA_EMAIL = "bianca.labdiamonds@gmail.com";

/** Display and tel: link — +918130495257 */
export const BIANCA_PHONE_DISPLAY = "+918130495257";
export const BIANCA_PHONE_TEL = "tel:+918130495257";

/**
 * Consultation / enquiry WhatsApp (+91 81304 95257) — no + or spaces for wa.me.
 * Used by appointment forms and piece enquiries.
 */
export const BIANCA_WHATSAPP_NUMBER = "918130495257";

/**
 * Footer “WhatsApp us” line (+91 88009 95921) — digits only for wa.me /
 * web.whatsapp.com. Separate from consultation WhatsApp.
 */
export const BIANCA_WHATSAPP_CONTACT_DISPLAY = "+918800995921";
export const BIANCA_WHATSAPP_CONTACT_NUMBER = "918800995921";

export function buildConsultationWhatsAppUrl(lead: {
  clientName: string;
  phone: string;
  city: string;
  sourcePage: string;
}) {
  const text = [
    "New consultation request — Bianca Diamonds",
    "",
    `Name: ${lead.clientName}`,
    `Phone: ${lead.phone}`,
    `City: ${lead.city}`,
    `Page: ${lead.sourcePage}`,
  ].join("\n");

  return `https://wa.me/${BIANCA_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const SITE_NAV_ITEMS: {
  id: NavActiveItem;
  label: string;
  /** Optional shorter label for desktop header artboard */
  desktopLabel?: string;
  to: string;
}[] = [
  { id: "the-house", label: "The House", to: "/" },
  { id: "fine-jewellery", label: "Fine Jewelry", to: "/fine-jewellery" },
  {
    id: "bespoke-jewellery",
    label: "Bespoke Jewellery",
    desktopLabel: "Bespoke",
    to: "/bespoke-jewellery",
  },
  {
    id: "butterfly-collection",
    label: "Butterfly Collection",
    desktopLabel: "Butterfly",
    to: "/butterfly-collection",
  },
  {
    id: "cannes-collection",
    label: "Cannes Collection",
    desktopLabel: "Cannes",
    to: "/fine-jewellery/cannes-2026",
  },
  { id: "media", label: "Media", to: "/media" },
];

export function consultationSourcePage(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/fine-jewellery/cannes-2026")) return "cannes-2026";
  if (pathname.startsWith("/fine-jewellery")) return "fine-jewellery";
  if (pathname.startsWith("/bespoke-jewellery")) return "bespoke-jewellery";
  if (pathname.startsWith("/butterfly-collection")) return "butterfly-collection";
  if (pathname.startsWith("/media")) return "media";
  if (pathname.startsWith("/calculator")) return "calculator";
  if (pathname.startsWith("/golden-ratio-evaluation")) return "golden-ratio-evaluation";
  if (pathname.startsWith("/lab-grown-diamond-faq")) return "lab-grown-faq";
  if (pathname.startsWith("/why-bianca-diamonds")) return "why-choose-bianca";
  if (pathname.startsWith("/lab-grown-diamond-jewellery-delhi-ncr")) {
    return "delhi-ncr";
  }
  if (pathname.startsWith("/lab-grown-diamond-jewellery-india")) {
    return "india-lab-grown";
  }
  if (pathname.startsWith("/jewellery-for-modern-bride")) {
    return "modern-bride";
  }
  if (pathname.startsWith("/jewellery-purchase-plan")) {
    return "jewellery-purchase-plan";
  }
  if (pathname.startsWith("/contact")) return "contact";
  return "site";
}
