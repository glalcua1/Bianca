import type { NavActiveItem } from "../context/NavActiveContext";

export const BIANCA_INSTAGRAM_URL =
  "https://www.instagram.com/bianca.diamonds?igsh=M3didm9lb2pidXBi";

export const BIANCA_EMAIL = "bianca.labdiamonds@gmail.com";

/** WhatsApp Business (+91 81304 95257) — no + or spaces for wa.me. */
export const BIANCA_WHATSAPP_NUMBER = "918130495257";

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
  if (pathname.startsWith("/media")) return "media";
  if (pathname.startsWith("/calculator")) return "calculator";
  if (pathname.startsWith("/golden-ratio-evaluation")) return "golden-ratio-evaluation";
  if (pathname.startsWith("/lab-grown-diamond-faq")) return "lab-grown-faq";
  if (pathname.startsWith("/contact")) return "contact";
  return "site";
}
