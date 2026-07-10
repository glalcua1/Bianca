export type HomeDestination = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

/** Navigation destination snippets for the homepage — mirrors primary site nav. */
export const HOME_DESTINATIONS: HomeDestination[] = [
  {
    id: "fine-jewellery",
    eyebrow: "The Atelier",
    title: "Fine Jewellery",
    description:
      "Certified lab-grown diamonds in BIS hallmarked gold — curated for every chapter of modern life.",
    cta: "Enter the salon",
    to: "/fine-jewellery",
    image: "/Rings/IMG_5302.jpg",
    imageAlt: "Bianca Diamonds fine jewellery — diamond ring",
    imageClassName: "object-cover object-center",
  },
  {
    id: "bespoke",
    eyebrow: "Private Commission",
    title: "Bespoke",
    description:
      "From consultation to CAD and artisan craft — a one-of-a-kind piece composed around your story.",
    cta: "Begin a commission",
    to: "/bespoke-jewellery",
    image: "/Beskpoke_necklace.png",
    imageAlt: "Bianca Diamonds bespoke necklace design",
    imageClassName: "object-cover object-[center_30%]",
  },
  {
    id: "butterfly",
    eyebrow: "House Emblem",
    title: "Butterfly",
    description:
      "High jewellery where the Bianca B takes flight — sapphire and emerald suites in diamond pavé.",
    cta: "Discover the collection",
    to: "/butterfly-collection",
    image: "/Butterfly_s.png",
    imageAlt: "Bianca Butterfly Collection — sapphire butterfly suite",
    imageClassName: "object-cover object-center",
  },
  {
    id: "cannes",
    eyebrow: "World Stage",
    title: "Cannes",
    description:
      "A cinematic editorial from the Croisette — Bianca’s debut on the world’s most celebrated carpet.",
    cta: "View the showcase",
    to: "/fine-jewellery/cannes-2026",
    image: "/Cannes/Cannes_model.png",
    imageAlt: "Bianca Diamonds at Cannes Film Festival 2026",
    imageClassName: "object-cover object-[center_20%]",
  },
];
