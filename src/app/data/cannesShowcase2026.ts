export const CANNES_SEO = {
  title:
    "Bianca Diamonds at Cannes Film Festival 2026 | Exclusive Jewellery Showcase",
  description:
    "Explore Bianca Diamonds' exclusive jewellery showcase from Cannes Film Festival 2026.",
};

export type CannesJewelleryPiece = {
  id: string;
  collection: string;
  type: string;
  inspiration: string;
  description: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  layout: "portrait" | "landscape";
};

export const CANNES_JEWELLERY_PIECES: CannesJewelleryPiece[] = [
  {
    id: "cannes-emerald-parure",
    collection: "Fine Jewellery",
    type: "Emerald & Diamond Parure",
    inspiration: "Cannes debut",
    description:
      "A three-tiered necklace with matching chandelier drops — emerald-cut stones in diamond halos, composed for the world stage and finished in the atelier.",
    image: "/Cannes/Necklace1.jpg",
    imageAlt:
      "Emerald and diamond necklace and earrings from the Bianca Diamonds Cannes showcase",
    imageClassName: "object-contain p-8 md:p-12",
    layout: "portrait",
  },
  {
    id: "sapphire-cascade-parure",
    collection: "Occasion Elegance",
    type: "Sapphire & Diamond Necklace",
    inspiration: "Cannes afterglow",
    description:
      "A sculptural V-form bib centred on a lozenge-set sapphire — diamond rows bloom into a tapering fringe of pear drops, with matching earrings echoing the same cascade of Mediterranean light.",
    image: "/Cannes/Necklace3.jpg",
    imageAlt:
      "Sapphire and diamond statement necklace with matching drop earrings from the Cannes showcase",
    imageClassName: "object-contain p-8 md:p-12",
    layout: "portrait",
  },
  {
    id: "lumiere-necklace",
    collection: "Modern Essentials",
    type: "Emerald Pendant Necklace",
    inspiration: "Midnight premiere",
    description:
      "A double strand of certified diamonds suspends a rectangular emerald crowned with pavé brilliance — finished in a dramatic fringe of pear drops that catch every flash along the Croisette.",
    image: "/Cannes/Necklace2.jpg",
    imageAlt:
      "Emerald and diamond pendant necklace with matching earrings from the Cannes showcase",
    imageClassName: "object-contain p-6 md:p-10",
    layout: "landscape",
  },
  {
    id: "verdant-laurel-parure",
    collection: "Fine Jewellery",
    type: "Diamond & Emerald Parure",
    inspiration: "Laurel on the Croisette",
    description:
      "A botanical collar of marquise-cut diamonds arranged in laurel leaves, centred on three round brilliant stones — paired with drop earrings crowned by emerald-cut green gems in pavé halos, composed for the spotlight and finished in the atelier.",
    image: "/Cannes/nacklace4.jpg",
    imageAlt:
      "Diamond laurel necklace with emerald drop earrings from the Bianca Diamonds Cannes showcase",
    imageClassName: "object-contain p-8 md:p-12",
    layout: "portrait",
  },
  {
    id: "riviera-bracelet",
    collection: "Fine Jewellery",
    type: "Peacock Bracelet",
    inspiration: "Continuous light",
    description:
      "An emerald-bodied peacock in pavé diamond plumage — sculptural haute joaillerie that wraps the wrist in movement, colour, and unbroken brilliance.",
    image: "/Cannes/IMG_7177.jpg",
    imageAlt: "Emerald and diamond peacock bracelet from the Cannes showcase",
    imageClassName: "object-contain p-6 md:p-10",
    layout: "portrait",
  },
];

export type CannesShowcaseImage = {
  src: string;
  alt: string;
  label: string;
};

export const CANNES_SHOWCASE_ROW: CannesShowcaseImage[] = [
  {
    src: "/Cannes/earrings.jpeg",
    alt: "Ruby and diamond chandelier drop earrings from the Bianca Diamonds Cannes collection",
    label: "Chandelier Drops",
  },
  {
    src: "/Cannes/ring.jpeg",
    alt: "Green gemstone and diamond halo cocktail ring from the Cannes showcase",
    label: "Cocktail Ring",
  },
  {
    src: "/Cannes/bracelet2.jpeg",
    alt: "Sapphire and diamond pavé cuff bracelet from the Cannes showcase",
    label: "Sapphire Cuff",
  },
  {
    src: "/Cannes/ring2.jpeg",
    alt: "Round brilliant diamond halo ring from the Bianca Diamonds Cannes collection",
    label: "Brilliant Halo",
  },
];

export const CANNES_CRAFT_VALUES = [
  {
    title: "Lab-Grown Brilliance",
    description:
      "IGI-certified stones with the same fire and permanence as mined diamonds — chosen for their beauty, not their origin story alone.",
  },
  {
    title: "Ethical Luxury",
    description:
      "A women-led Indian house building modern luxury on transparency, responsibility, and the conviction that elegance need not cost the earth.",
  },
  {
    title: "Modern Indian Elegance",
    description:
      "Craft rooted in heritage atelier discipline, expressed through silhouettes that speak to a global, contemporary woman.",
  },
];

export const CANNES_EDITORIAL = {
  primaryVideo: "/Cannes/day-1-reel.mp4",
  primaryVideoAlt:
    "Bianca Diamonds at Cannes Film Festival 2026 — editorial film",
  manyaPortrait: "/Cannes/Model_neck1.png",
  manyaVideo: "/Cannes/B_Cannes.mp4",
  manyaAlt:
    "Bianca Diamonds on the Cannes Film Festival 2026 red carpet",
};

export type CannesSketch = {
  src: string;
  alt: string;
};

export const CANNES_SKETCHES: CannesSketch[] = [
  {
    src: "/Cannes/Sketches/IMG_6727.PNG",
    alt: "Atelier sketch — emerald-cut parure with three-tiered cascading necklace",
  },
  {
    src: "/Cannes/Sketches/IMG_6729.PNG",
    alt: "Atelier sketch — Cannes fine jewellery design study",
  },
  {
    src: "/Cannes/Sketches/IMG_6732.jpg",
    alt: "Atelier sketch — solitaire ring with interwoven pavé band",
  },
  {
    src: "/Cannes/Sketches/IMG_6733.jpg",
    alt: "Atelier sketch — Cannes collection design drawing",
  },
  {
    src: "/Cannes/Sketches/IMG_6735.PNG",
    alt: "Atelier sketch — fine jewellery concept for Cannes",
  },
  {
    src: "/Cannes/Sketches/IMG_6758.jpg",
    alt: "Atelier sketch — Miami Cuban link chain, alternating metals",
  },
  {
    src: "/Cannes/Sketches/IMG_6774.jpg",
    alt: "Atelier sketch — Cannes showcase design detail",
  },
  {
    src: "/Cannes/Sketches/IMG_6828.PNG",
    alt: "Atelier sketch — haute joaillerie design study",
  },
  {
    src: "/Cannes/Sketches/IMG_6829.PNG",
    alt: "Atelier sketch — Cannes collection technical drawing",
  },
];

export { BIANCA_INSTAGRAM_URL } from "./siteContact";
