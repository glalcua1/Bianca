import imgOccasionElegance from "figma:asset/791d0a8cf2d96d0d481c05ccdd58d68bc023a7a9.png";
import imgBridalEdit from "figma:asset/581d41c78850052909c92d619a846a456fb23495.png";

export type JewelleryCategoryId =
  | "rings"
  | "earrings"
  | "necklaces"
  | "bracelets"
  | "for-him";

export type FineJewelleryCollection = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

export type FineJewelleryCategory = {
  id: JewelleryCategoryId;
  title: string;
  description: string;
};

export type AtelierPiece = {
  id: string;
  category: JewelleryCategoryId;
  productCode: string;
  image: string;
  alt: string;
  title: string;
  description: string;
};

export const FINE_JEWELLERY_COLLECTIONS: FineJewelleryCollection[] = [
  {
    id: "modern-essentials",
    title: "Modern Essentials",
    description:
      "Discover diamonds designed for modern living — effortless pieces that bring refined sparkle to every moment of your day.",
    image: "/Rings/IMG_5302.jpg",
    imageAlt: "Modern Essentials — diamond ring",
  },
  {
    id: "occasion-elegance",
    title: "Occasion Elegance",
    description:
      "Statement diamonds crafted to elevate life's most memorable celebrations with brilliance, beauty, and presence.",
    image: imgOccasionElegance,
    imageAlt: "Occasion Elegance — celebration diamond rings",
    imageClassName: "object-contain p-8",
  },
  {
    id: "bridal-edit",
    title: "The Bridal Edit",
    description:
      "Timeless diamonds created to honour the beauty, promise, and joy of your wedding journey.",
    image: imgBridalEdit,
    imageAlt: "The Bridal Edit — wedding and bridal diamond jewellery",
    imageClassName: "object-cover object-[center_22%]",
  },
];

export const FINE_JEWELLERY_CATEGORIES: FineJewelleryCategory[] = [
  {
    id: "rings",
    title: "Rings",
    description: "Solitaires, bands, and stackable designs for every hand.",
  },
  {
    id: "earrings",
    title: "Earrings",
    description: "Studs, hoops, and drops with certified lab-grown brilliance.",
  },
  {
    id: "necklaces",
    title: "Necklaces",
    description: "Pendants and chains designed for layered or solo wear.",
  },
  {
    id: "bracelets",
    title: "Bracelets",
    description: "Tennis styles and delicate cuffs for wrist-level sparkle.",
  },
  {
    id: "for-him",
    title: "For Him",
    description: "Refined bands and signet-inspired pieces for modern men.",
  },
];

/**
 * Atelier showcase order: under "All", earrings and rings precede necklaces.
 * Category tabs filter this list without re-sorting.
 */
export const ATELIER_PIECES: AtelierPiece[] = [
  {
    id: "ear-petale-lumiere",
    category: "earrings",
    productCode: "BD-ER-001",
    image: "/Earrings.png",
    alt: "Pétale Lumière — lab-grown diamond drop earrings",
    title: "Pétale Lumière",
    description:
      "Graduated pear and marquise drops trace the jawline in a soft cascade of IGI-certified brilliants — movement, light, and evening poise in perfect proportion.",
  },
  {
    id: "ear-chandelier-maison",
    category: "earrings",
    productCode: "BD-ER-002",
    image: "/Earrings_2.png",
    alt: "Chandelier Maison — statement diamond earrings",
    title: "Chandelier Maison",
    description:
      "A sculptural chandelier silhouette with layered pavé and baguette accents — high-jewellery presence composed for celebrations, galas, and the house's most luminous moments.",
  },
  {
    id: "ring-solitaire-classique",
    category: "rings",
    productCode: "BD-RG-001",
    image: "/Rings/IMG_5298.jpg",
    alt: "Solitaire Classique — lab-grown diamond ring",
    title: "Solitaire Classique",
    description:
      "A timeless round brilliant in a refined four-prong setting — the essential expression of commitment, crafted for the modern hand.",
  },
  {
    id: "ring-pave-band",
    category: "rings",
    productCode: "BD-RG-002",
    image: "/Rings/IMG_5299.jpg",
    alt: "Pavé Band — diamond ring detail",
    title: "Pavé Band",
    description:
      "Micro-set stones trace the band in continuous fire — designed to stack, pair, or stand alone with quiet confidence.",
  },
  {
    id: "ring-atelier-portrait",
    category: "rings",
    productCode: "BD-RG-003",
    image: "/Rings/IMG_5302.jpg",
    alt: "Atelier Portrait — diamond ring worn on hand",
    title: "Atelier Portrait",
    description:
      "Sculptural proportions and a elevated centre stone — a ring composed for presence, from proposal to every day after.",
  },
  {
    id: "ring-maison-embrace",
    category: "rings",
    productCode: "BD-RG-004",
    image: "/Rings/Women_ring.png",
    alt: "Maison Embrace — women's diamond ring",
    title: "Maison Embrace",
    description:
      "An elegant silhouette with a certified centre brilliant — feminine, assured, and made to be worn without occasion.",
  },
  {
    id: "neck-lumiere-cascade",
    category: "necklaces",
    productCode: "BD-NK-001",
    image: "/necklace/Neck1.png",
    alt: "Lumière Cascade — graduated diamond fringe necklace",
    title: "Lumière Cascade",
    description:
      "A sweeping fringe of IGI-certified brilliants, each stone hand-set to catch light with every movement — red-carpet presence, distilled.",
  },
  {
    id: "neck-riviere-nocturne",
    category: "necklaces",
    productCode: "BD-NK-002",
    image: "/necklace/Neck2.png",
    alt: "Rivière Nocturne — diamond collar necklace",
    title: "Rivière Nocturne",
    description:
      "An uninterrupted river of lab-grown diamonds in a refined collar silhouette — evening elegance, composed and unmistakable.",
  },
  {
    id: "neck-celestial-drop",
    category: "necklaces",
    productCode: "BD-NK-003",
    image: "/necklace/Neck3.png",
    alt: "Celestial Drop — pendant necklace with pear diamond",
    title: "Celestial Drop",
    description:
      "A singular pear-cut centre stone suspended from a delicate line of micro-pavé — quiet brilliance for the woman who needs no introduction.",
  },
  {
    id: "neck-atelier-classique",
    category: "necklaces",
    productCode: "BD-NK-004",
    image: "/necklace/Neck4.png",
    alt: "Atelier Classique — diamond station necklace",
    title: "Atelier Classique",
    description:
      "Evenly spaced round brilliants along a fine chain — the house signature of proportion, balance, and everyday refinement.",
  },
  {
    id: "neck-grace-eternelle",
    category: "necklaces",
    productCode: "BD-NK-006",
    image: "/necklace/Neck6.png",
    alt: "Grâce Éternelle — diamond halo pendant necklace",
    title: "Grâce Éternelle",
    description:
      "A halo of pavé diamonds encircling a radiant centre — soft luminosity designed to rest beautifully against the collarbone.",
  },
  {
    id: "neck-maison-rubis",
    category: "necklaces",
    productCode: "BD-NK-007",
    image: "/necklace/Neck7.png",
    alt: "Maison Rubis — ruby and diamond fringe necklace with matching earrings",
    title: "Maison Rubis",
    description:
      "A cushion-cut ruby crowned in diamonds, with cascading pear and marquise drops — matched with chandelier earrings for an unmistakable statement of house high jewellery.",
  },
  {
    id: "neck-jardin-serein",
    category: "necklaces",
    productCode: "BD-NK-008",
    image: "/necklace/Nacklace9.png",
    alt: "Jardin Serein — floral diamond collar necklace",
    title: "Jardin Serein",
    description:
      "Floral motifs in pavé and baguette stones bloom along a sculpted collar — botanical grace rendered in IGI-certified brilliants for the woman who wears art at the throat.",
  },
  {
    id: "neck-aurora-plume",
    category: "necklaces",
    productCode: "BD-NK-009",
    image: "/necklace/Necklace10.png",
    alt: "Aurora Plume — feathered diamond fringe necklace",
    title: "Aurora Plume",
    description:
      "Layered plumes of pear and marquise drops fan outward from a diamond-set centre — movement, depth, and gala-ready luminosity in a single atelier composition.",
  },
  {
    id: "for-him-signet-line",
    category: "for-him",
    productCode: "BD-MN-001",
    image: "/Mens/Men.png",
    alt: "Signet Line — men's diamond band",
    title: "Signet Line",
    description:
      "A bold band with inset brilliants — masculine restraint meets the house standard of cut, clarity, and craft.",
  },
];
