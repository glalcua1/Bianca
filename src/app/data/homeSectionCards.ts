export type HomeSectionCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  /** Alternate image well treatment for dark product photography */
  tone?: "cream" | "forest" | "ink";
};

/**
 * Primary homepage destinations — full-width horizontal editorial cards.
 * Order: Fine Jewellery → Bespoke → Butterfly → Cannes.
 */
export const HOME_SECTION_CARDS: HomeSectionCard[] = [
  {
    id: "fine-jewellery",
    eyebrow: "The Atelier",
    title: "Fine Jewellery",
    description:
      "Certified lab-grown diamonds set in BIS hallmarked gold — composed for everyday brilliance and life’s most luminous occasions.",
    cta: "Enter the salon",
    to: "/fine-jewellery",
    image: "/Rings/IMG_5302.jpg",
    imageAlt: "Bianca Diamonds fine jewellery — diamond ring on soft light",
    imageClassName: "object-cover object-center",
    tone: "cream",
  },
  {
    id: "bespoke",
    eyebrow: "Private Commission",
    title: "Bespoke",
    description:
      "A one-of-a-kind journey from private consultation and hand sketches to CAD and artisan craft — jewellery composed entirely around your story.",
    cta: "Begin a commission",
    to: "/bespoke-jewellery",
    image: "/Beskpoke_necklace.png",
    imageAlt: "Bianca Diamonds bespoke necklace design",
    imageClassName: "object-cover object-[center_28%]",
    tone: "cream",
  },
  {
    id: "butterfly",
    eyebrow: "House Emblem",
    title: "Butterfly",
    description:
      "High jewellery where the Bianca B takes flight — sapphire and emerald suites in diamond pavé, born from the wings of the house emblem.",
    cta: "Discover the collection",
    to: "/butterfly-collection",
    image: "/Butterfly_s.png",
    imageAlt: "Bianca Butterfly Collection — sapphire butterfly suite",
    imageClassName: "object-cover object-center",
    tone: "ink",
  },
  {
    id: "cannes",
    eyebrow: "World Stage · 2026",
    title: "Cannes",
    description:
      "A cinematic editorial from the Croisette — Bianca’s debut on the world’s most celebrated red carpet, composed for light, camera, and presence.",
    cta: "View the showcase",
    to: "/fine-jewellery/cannes-2026",
    image: "/Cannes/Cannes_model.png",
    imageAlt: "Bianca Diamonds at Cannes Film Festival 2026",
    imageClassName: "object-cover object-[center_18%]",
    tone: "forest",
  },
];
