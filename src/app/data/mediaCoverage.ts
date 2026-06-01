export const MEDIA_SEO = {
  title: "Media | Bianca Diamonds",
  description:
    "Press and editorial coverage celebrating Bianca Diamonds — India's women-led lab-grown diamond jewellery house on the global stage.",
};

export type MediaPressItem = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  linkLabel: string;
  source: string;
  date?: string;
};

export const MEDIA_PRESS_ITEMS: MediaPressItem[] = [
  {
    id: "manya-instagram",
    eyebrow: "Instagram · Global Exposure",
    title: "Manya on the World Stage",
    body: "Manya adorned exquisite jewellery by Bianca Diamonds, a woman-led startup just three months old. Her appearance provided the emerging brand with valuable international exposure, highlighting the rise of women-driven entrepreneurship on global platforms.",
    image: "/media/manya-instagram.jpg",
    imageAlt:
      "Manya wearing Bianca Diamonds lab-grown diamond jewellery — Instagram post",
    href: "https://www.instagram.com/p/DY9Wi9YkSKq/",
    linkLabel: "View on Instagram",
    source: "Instagram",
    date: "2026",
  },
  {
    id: "hindustan-cannes",
    eyebrow: "Live Hindustan · Press",
    title: "Cannes 2026 — A Journey of Inspiration",
    body: "Moradabad's Shweta Lal brought her startup Bianca Diamonds to the Cannes Film Festival 2026 red carpet within just three months — with actress Manya Pathak presenting the house's diamond necklaces, earrings, and bracelets to global acclaim. The coverage celebrates women-led Indian luxury and lab-grown brilliance reaching an international audience.",
    image: "/media/hindustan-cannes-2026.jpg",
    imageAlt:
      "Live Hindustan feature on Shweta Lal and Bianca Diamonds at Cannes 2026",
    href: "https://livehindustan.com/uttar-pradesh/moradabad/story-shweta-lal-s-diamond-jewelry-shines-at-cannes-2026-a-journey-of-inspiration-201779865299861.html",
    linkLabel: "Read full article on Live Hindustan",
    source: "Live Hindustan",
    date: "27 May 2026",
  },
];

export const MEDIA_BRAND_STATEMENT = {
  headline: "In the Press",
  subhead:
    "Bianca Diamonds is defining a new chapter for lab-grown fine jewellery — IGI-certified stones, atelier craft, and a women-led house recognised on red carpets and in national media.",
  pillars: [
    {
      title: "Best in Lab-Grown Brilliance",
      description:
        "The same fire, clarity, and permanence as mined diamonds — responsibly grown and finished by hand.",
    },
    {
      title: "Women-Led Luxury",
      description:
        "Founded and led from Moradabad to Cannes — proof that modern Indian maisons belong on the world stage.",
    },
    {
      title: "Global Recognition",
      description:
        "From the Croisette to national press — coverage that mirrors the house ambition: quiet craft, visible impact.",
    },
  ],
};
