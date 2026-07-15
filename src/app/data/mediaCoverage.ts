export const MEDIA_SEO = {
  title: "Media | Bianca Diamonds",
  description:
    "Press and editorial coverage celebrating Bianca Diamonds — India's women-led lab-grown diamond jewellery house on the global stage.",
};

export type MediaPressImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Carousel slide frame — defaults to portrait */
  frame?: "portrait" | "wide" | "square";
  /** Centre the slide within the gilt card (wide article screenshots) */
  centerInCard?: boolean;
};

export type MediaPressLink = {
  href: string;
  label: string;
};

export type MediaPressItem = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Carousel slides — original first, then alternate views */
  images: MediaPressImage[];
  source: string;
  date?: string;
  primaryLink: MediaPressLink;
  secondaryLink?: MediaPressLink;
  /** Centre the image carousel within the press card column */
  centerCarousel?: boolean;
};

export const MEDIA_PRESS_ITEMS: MediaPressItem[] = [
  {
    id: "dainik-jagran-moradabad",
    eyebrow: "Dainik Jagran · Moradabad",
    title: "Shweta’s Bianca Brings Sparkle to the Film Festival",
    body: "Dainik Jagran Moradabad celebrated Shweta Lal of Madhubani Colony — who took her women-led house, Bianca Diamonds, to the Cannes Film Festival 2026 red carpet within ninety days of launch. Actress Manya Pathak wore the brand’s lab-grown diamond jewellery on the Croisette, framing Indian design, modern luxury, and sustainable craft for a national audience.",
    images: [
      {
        src: "/media/dainik-jagran-moradabad-2026.jpg",
        alt: "Dainik Jagran Moradabad press clipping — Shweta Lal and Bianca Diamonds at Cannes 2026",
        caption: "Dainik Jagran — Moradabad edition",
        frame: "portrait",
      },
    ],
    source: "Dainik Jagran Moradabad",
    date: "8 June 2026",
    primaryLink: {
      href: "https://www.instagram.com/p/DZUcXlwg7Yg/",
      label: "View on Instagram",
    },
  },
  {
    id: "news-india-11-manya",
    eyebrow: "News India 11 · Instagram",
    title: "Manya on the World Stage",
    body: "Manya adorned exquisite jewellery by Bianca Diamonds, a woman-led startup just three months old. Her appearance provided the emerging brand with valuable international exposure, highlighting the rise of women-driven entrepreneurship on global platforms.",
    images: [
      {
        src: "/media/manya-instagram.jpg",
        alt: "Manya wearing Bianca Diamonds lab-grown diamond jewellery — News India 11",
        caption: "Original post",
        frame: "portrait",
      },
    ],
    source: "News India 11",
    date: "2026",
    primaryLink: {
      href: "https://www.instagram.com/news_india_11/p/DY9Wi9YkSKq/",
      label: "View on Instagram",
    },
  },
  {
    id: "ipopdiaries-cannes",
    eyebrow: "iPop Diaries · Instagram",
    title: "Cannes Red Carpet — Editorial Feature",
    body: "iPop Diaries spotlighted Bianca Diamonds on the Cannes red carpet — framing the house's high jewellery against premiere lights and global press. A distinct editorial voice celebrating Indian luxury on one of the world's most watched stages.",
    images: [
      {
        src: "/media/ipop.jpg",
        alt: "Manya in Bianca Diamonds at Cannes — iPop Diaries editorial feature",
        caption: "Carousel feature",
        frame: "portrait",
      },
    ],
    source: "iPop Diaries",
    date: "2026",
    primaryLink: {
      href: "https://www.instagram.com/ipopdiaries/p/DYpRgAqia4L/?img_index=3",
      label: "View on Instagram",
    },
  },
  {
    id: "hindustan-cannes",
    eyebrow: "Live Hindustan · Press",
    title: "Cannes 2026 — A Journey of Inspiration",
    body: "Shweta Lal brought her startup Bianca Diamonds to the Cannes Film Festival 2026 red carpet within just three months — with actress Manya Pathak presenting the house's diamond necklaces, earrings, and bracelets to global acclaim. The coverage celebrates women-led Indian luxury and lab-grown brilliance reaching an international audience.",
    images: [
      {
        src: "/media/hindustan-cannes-2026.jpg",
        alt: "Live Hindustan article on Shweta Lal and Bianca Diamonds at Cannes 2026",
        caption: "Live Hindustan article",
        frame: "wide",
        centerInCard: true,
      },
      {
        src: "/media/hindustan.JPG",
        alt: "Live Hindustan coverage — Shweta Lal and Bianca Diamonds at Cannes 2026",
        caption: "Live Hindustan — full coverage",
        frame: "wide",
      },
    ],
    centerCarousel: true,
    source: "Live Hindustan",
    date: "27 May 2026",
    primaryLink: {
      href: "https://livehindustan.com/uttar-pradesh/moradabad/story-shweta-lal-s-diamond-jewelry-shines-at-cannes-2026-a-journey-of-inspiration-201779865299861.html",
      label: "Read full article on Live Hindustan",
    },
    secondaryLink: {
      href: "https://www.instagram.com/bianca.diamonds/p/DY2BvywAfdl/",
      label: "View on @bianca.diamonds",
    },
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
        "Founded and led from Delhi to Cannes — proof that modern Indian maisons belong on the world stage.",
    },
    {
      title: "Global Recognition",
      description:
        "From the Croisette to national press — coverage that mirrors the house ambition: quiet craft, visible impact.",
    },
  ],
};
