import type { NavActiveItem } from "../../context/NavActiveContext";

export type NavLinkConfig = {
  id: NavActiveItem;
  label: string;
  to?: string;
};

export const SITE_NAV_LINKS: NavLinkConfig[] = [
  { id: "the-house", label: "The House", to: "/" },
  { id: "fine-jewellery", label: "Fine Jewelry", to: "/fine-jewellery" },
  {
    id: "cannes-collection",
    label: "Cannes Collection",
    to: "/fine-jewellery/cannes-2026",
  },
  { id: "services", label: "Services" },
];
