import type { NavActiveItem } from "../context/NavActiveContext";

export const BIANCA_INSTAGRAM_URL =
  "https://www.instagram.com/bianca.diamonds?igsh=M3didm9lb2pidXBi";

export const BIANCA_EMAIL = "bianca.labdiamonds@gmail.com";

export const SITE_NAV_ITEMS: {
  id: NavActiveItem;
  label: string;
  to: string;
}[] = [
  { id: "the-house", label: "The House", to: "/" },
  { id: "fine-jewellery", label: "Fine Jewelry", to: "/fine-jewellery" },
  {
    id: "cannes-collection",
    label: "Cannes Collection",
    to: "/fine-jewellery/cannes-2026",
  },
  { id: "media", label: "Media", to: "/media" },
];

export function consultationSourcePage(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/fine-jewellery/cannes-2026")) return "cannes-2026";
  if (pathname.startsWith("/fine-jewellery")) return "fine-jewellery";
  if (pathname.startsWith("/media")) return "media";
  if (pathname.startsWith("/calculator")) return "calculator";
  if (pathname.startsWith("/lab-grown-diamond-faq")) return "lab-grown-faq";
  if (pathname.startsWith("/contact")) return "contact";
  return "site";
}
