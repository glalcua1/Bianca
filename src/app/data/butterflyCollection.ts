export const BUTTERFLY_COLLECTION_PATH = "/butterfly-collection";

export const BUTTERFLY_COLLECTION_SEO = {
  title: "Butterfly Collection | Bianca Diamonds",
  description:
    "The Bianca Butterfly Collection — high jewellery where the house emblem takes flight. Sapphire and emerald suites composed in diamond pavé, born from the wings of the B.",
};

export const BUTTERFLY_MORPH_VIDEO = "/Butterfly_morph.mp4";

export const BUTTERFLY_PILLARS = [
  {
    id: "metamorphosis",
    title: "Metamorphosis",
    description:
      "Like the butterfly, each piece begins in quiet intention and emerges in full radiance — a passage from vision to heirloom.",
  },
  {
    id: "symmetry",
    title: "Symmetry",
    description:
      "The wings of the B mirror the balance in every mount — proportion, negative space, and harmony between stone and gold.",
  },
  {
    id: "flight",
    title: "Flight",
    description:
      "Jewellery composed not to weigh upon you, but to lift the moment it adorns — lightness carried through craft.",
  },
] as const;

export type ButterflySalonPiece = {
  id: string;
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
};

export const BUTTERFLY_SALON_PIECES: ButterflySalonPiece[] = [
  {
    id: "sapphire-parure",
    src: "/Butterfly.png",
    alt: "Sapphire butterfly brooch and matching earring suite on royal velvet — Bianca Butterfly Collection",
    eyebrow: "Salon parure",
    title: "Sapphire Monarch",
    description:
      "A commanding butterfly brooch and matching earring suite — pavé diamond wings framing pear and marquise brilliants, with an oval sapphire at the heart.",
    details: [
      "Oval sapphire centre stone",
      "Pavé diamond wings",
      "Brooch & earring suite",
    ],
  },
  {
    id: "emerald-parure",
    src: "/Butterfly_s.png",
    alt: "Emerald and diamond butterfly brooch with matching earrings — Bianca Butterfly Collection",
    eyebrow: "Salon parure",
    title: "Emerald Flight",
    description:
      "A butterfly brooch and matching earring suite — iridescent wing inlays, emerald bodies, and pavé diamond wings composed in the house emblem motif.",
    details: [
      "Emerald centre accents",
      "Pear & princess diamond wings",
      "Brooch & earring suite",
    ],
  },
];
