import imgOccasionElegance from "figma:asset/791d0a8cf2d96d0d481c05ccdd58d68bc023a7a9.png";
import imgBridalEdit from "figma:asset/581d41c78850052909c92d619a846a456fb23495.png";

export type JewelleryCategoryId =
  | "rings"
  | "earrings"
  | "necklaces"
  | "pendants"
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

export type BraceletKind = "tennis" | "bracelet";

export type AtelierPiece = {
  id: string;
  category: JewelleryCategoryId;
  productCode: string;
  image: string;
  alt: string;
  title: string;
  description: string;
  /** Tennis line vs bangle, cuff, and statement wrist pieces */
  braceletKind?: BraceletKind;
  /** Match product photography backdrop instead of default black/cream well */
  imageWellColor?: string;
  /** Per-piece frame tuning for tall or unusually cropped product photography. */
  frameImageClassName?: string;
  frameImageWrapperClassName?: string;
  /** Salon film — loops in catalogue; typically without Excel pricing */
  video?: string;
  /** Additional still views of the same piece (salon lightbox) */
  galleryImages?: string[];
  /** Fixed salon guide price when not in Excel catalogue */
  salonPriceInr?: number;
  gemstoneSpec?: string;
  goldSpec?: string;
};

export function atelierPieceEyebrow(piece: AtelierPiece): string {
  if (piece.category === "bracelets" && piece.braceletKind) {
    return piece.braceletKind === "tennis" ? "Tennis Bracelet" : "Bracelet";
  }
  return (
    FINE_JEWELLERY_CATEGORIES.find((c) => c.id === piece.category)?.title ??
    piece.category
  );
}

/** Matches CollectionPhotoFrame — cream/beige wells vs black product backdrops. */
export function atelierPieceUsesDarkWell(piece: AtelierPiece): boolean {
  if (piece.imageWellColor) {
    return piece.imageWellColor.toLowerCase() === "#0a0a0a";
  }
  return piece.category === "necklaces";
}

/** Primary image plus any extra salon views for the same piece */
export function atelierPieceViews(piece: AtelierPiece): string[] {
  if (piece.video) return [];
  const extra = piece.galleryImages ?? [];
  if (extra.length === 0) return [piece.image];
  return [piece.image, ...extra];
}

/** Beige/cream photography first, black-background pieces after — stable within each group. */
export function sortAtelierPiecesByWell(pieces: AtelierPiece[]): AtelierPiece[] {
  const light: AtelierPiece[] = [];
  const dark: AtelierPiece[] = [];
  for (const piece of pieces) {
    (atelierPieceUsesDarkWell(piece) ? dark : light).push(piece);
  }
  return [...light, ...dark];
}

/** For the All tab — sort by well within each category while preserving category order. */
export function sortAllAtelierPiecesByWellPerCategory(
  pieces: AtelierPiece[],
): AtelierPiece[] {
  const categoryOrder: JewelleryCategoryId[] = [];
  const groups = new Map<JewelleryCategoryId, AtelierPiece[]>();

  for (const piece of pieces) {
    if (!groups.has(piece.category)) {
      categoryOrder.push(piece.category);
      groups.set(piece.category, []);
    }
    groups.get(piece.category)!.push(piece);
  }

  return categoryOrder.flatMap((category) =>
    sortAtelierPiecesByWell(groups.get(category)!),
  );
}

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
    description:
      "Collars, rivières, and statement neck pieces — composed for layered brilliance.",
  },
  {
    id: "pendants",
    title: "Pendants",
    description:
      "Pendant and chain designs — refined points of light for everyday and evening.",
  },
  {
    id: "bracelets",
    title: "Bracelets",
    description:
      "Bangles, cuffs, and statement wrist pieces — plus continuous-line tennis styles in round, marquise, and pear.",
  },
  {
    id: "for-him",
    title: "For Him",
    description: "Refined bands and signet-inspired pieces for modern men.",
  },
];

/**
 * Atelier showcase order: under "All", earrings and rings precede bracelets, necklaces, then pendants.
 * Category tabs filter this list without re-sorting.
 */
export const ATELIER_PIECES: AtelierPiece[] = [
  {
    id: "ear-oval-line-drop",
    category: "earrings",
    productCode: "BD-K-ER-005",
    image: "/Earrings/Earrings10.png",
    imageWellColor: "#d8d7d4",
    alt: "Oval Line Drop — graduated oval diamond drop earrings in white gold",
    title: "Oval Line Drop",
    description:
      "Five oval brilliants descend in a clean white-gold line — elongated light, precise prong work, and effortless evening movement.",
  },
  {
    id: "ear-graduated-oval-riviere",
    category: "earrings",
    productCode: "BD-K-ER-006",
    image: "/Earrings/Earrings11.png",
    imageWellColor: "#dce0df",
    alt: "Graduated Oval Riviere — oval diamond drop earrings",
    title: "Graduated Oval Riviere",
    description:
      "A tapered rivière of oval brilliants builds from delicate sparkle to statement scale — refined verticality for ceremony and black-tie dressing.",
  },
  {
    id: "ear-ruby-emerald-trilogy-drop",
    category: "earrings",
    productCode: "BD-K-ER-007",
    image: "/Earrings/IMG_7662.jpg",
    imageWellColor: "#dedede",
    alt: "Ruby Emerald Trilogy Drop — ruby, emerald, and diamond earrings in yellow gold",
    title: "Ruby Emerald Trilogy Drop",
    description:
      "Round brilliants, oval emeralds, and vivid ruby drops stack in warm yellow gold — a jewel-toned composition with playful, modern grandeur.",
  },
  {
    id: "ear-ruby-emerald-duet-drop",
    category: "earrings",
    productCode: "BD-K-ER-008",
    image: "/Earrings/IMG_7664.jpg",
    imageWellColor: "#e5e5e7",
    alt: "Ruby Emerald Duet Drop — ruby and emerald two-stone earrings in yellow gold",
    title: "Ruby Emerald Duet Drop",
    description:
      "A round ruby suspends an oval emerald in polished yellow gold — saturated colour, minimal lines, and an easy day-to-evening silhouette.",
  },
  {
    id: "ear-sapphire-hoop-drop",
    category: "earrings",
    productCode: "BD-K-ER-009",
    image: "/Earrings/IMG_7665.jpg",
    imageWellColor: "#d7d7d5",
    alt: "Sapphire Hoop Drop — diamond huggie earrings with blue sapphire drops",
    title: "Sapphire Hoop Drop",
    description:
      "Pavé huggies release round blue sapphire drops in white gold — compact, luminous, and composed for everyday colour.",
  },
  {
    id: "ear-ruby-flower-studs",
    category: "earrings",
    productCode: "BD-K-ER-010",
    image: "/Earrings/IMG_7668.jpg",
    imageWellColor: "#f0f0ed",
    alt: "Ruby Flower Studs — ruby petal and diamond centre floral earrings",
    title: "Ruby Flower Studs",
    description:
      "Pear-shaped ruby petals bloom around a round brilliant centre — floral studs with crisp white-gold prongs and rich crimson fire.",
  },
  {
    id: "ear-sapphire-chandelier-drop",
    category: "earrings",
    productCode: "BD-K-ER-011",
    image: "/Earrings/IMG_7669.jpg",
    imageWellColor: "#bfc0bf",
    alt: "Sapphire Chandelier Drop — sapphire and diamond pear chandelier earrings",
    title: "Sapphire Chandelier Drop",
    frameImageWrapperClassName:
      "absolute inset-0 flex items-center justify-center p-8 sm:p-10 md:p-12",
    frameImageClassName: "max-h-full max-w-full object-contain object-center",
    description:
      "Pear diamond halos, brilliant links, and deep blue sapphire drops articulate in white gold — a formal chandelier with regal colour and movement.",
  },
  {
    id: "ear-emerald-octagon-studs",
    category: "earrings",
    productCode: "BD-K-ER-012",
    image: "/Earrings/IMG_7712.jpg",
    imageWellColor: "#d0d2d4",
    alt: "Emerald Octagon Studs — octagonal emerald and diamond halo earrings",
    title: "Emerald Octagon Studs",
    description:
      "Octagonal emerald centres sit within round-brilliant halos in white gold — architectural studs with deep green presence.",
  },
  {
    id: "ear-golden-pear-halo-drop",
    category: "earrings",
    productCode: "BD-K-ER-013",
    image: "/Earrings/IMG_7715.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Golden Pear Halo Drop — emerald-cut and pear diamond halo earrings in yellow gold",
    title: "Golden Pear Halo Drop",
    description:
      "Emerald-cut diamond tops release pear halo drops in yellow gold — classic bridal geometry warmed with polished gold detail.",
  },
  {
    id: "ear-white-pear-halo-drop",
    category: "earrings",
    productCode: "BD-K-ER-014",
    image: "/Earrings/IMG_7716.jpg",
    imageWellColor: "#d6d6d8",
    alt: "White Pear Halo Drop — emerald-cut and pear diamond halo earrings in white gold",
    title: "White Pear Halo Drop",
    description:
      "Emerald-cut tops and pear-shaped diamond halos align in white gold — icy brilliance with a graceful, elongated evening profile.",
  },
  {
    id: "ear-round-solitaire-studs",
    category: "earrings",
    productCode: "BD-K-ER-015",
    image: "/Earrings/IMG_7718.jpg",
    imageWellColor: "#dfddda",
    alt: "Round Solitaire Studs — round brilliant diamond studs in yellow gold",
    title: "Round Solitaire Studs",
    description:
      "Round brilliants are held in yellow-gold baskets with white-gold claw accents — a timeless stud refined with two-tone detail.",
  },
  {
    id: "ear-princess-solitaire-studs",
    category: "earrings",
    productCode: "BD-K-ER-016",
    image: "/Earrings/IMG_7719.jpg",
    imageWellColor: "#dedbd8",
    alt: "Princess Solitaire Studs — princess-cut diamond studs in yellow gold",
    title: "Princess Solitaire Studs",
    description:
      "Princess-cut brilliants sit in squared yellow-gold baskets with white claw tips — crisp geometry for a polished everyday signature.",
  },
  {
    id: "ear-oval-solitaire-studs",
    category: "earrings",
    productCode: "BD-K-ER-017",
    image: "/Earrings/IMG_7720.jpg",
    imageWellColor: "#dedbd6",
    alt: "Oval Solitaire Studs — oval diamond studs in yellow gold",
    title: "Oval Solitaire Studs",
    description:
      "Oval brilliants are framed in yellow-gold gallery baskets with white prong detail — soft elongation and classic wearable fire.",
  },
  {
    id: "ear-deco-link-drop",
    category: "earrings",
    productCode: "BD-K-ER-018",
    image: "/Earrings/IMG_7721.jpg",
    imageWellColor: "#b5b5b8",
    alt: "Deco Link Drop — emerald-cut diamond and pavé loop drop earrings",
    title: "Deco Link Drop",
    description:
      "Emerald-cut diamond tops suspend pavé-set interlocking loops in white gold — Art Deco rhythm with refined movement and mirror-bright finish.",
  },
  {
    id: "ring-atelier-portrait",
    category: "rings",
    productCode: "BD-K-RG-003",
    image: "/Rings/IMG_5302.jpg",
    imageWellColor: "#d2cdc8",
    alt: "Atelier Portrait — diamond ring worn on hand",
    title: "Atelier Portrait",
    description:
      "Sculptural proportions and a elevated centre stone — a ring composed for presence, from proposal to every day after.",
  },
  {
    id: "ring-halo-split-lumiere",
    category: "rings",
    productCode: "BD-K-RG-008",
    image: "/Rings/Ring3.png",
    imageWellColor: "#e6d6c3",
    alt: "Halo Split Lumière — round diamond halo ring with split pavé shank",
    title: "Halo Split Lumière",
    description:
      "A round brilliant crowned in a diamond halo on an open lattice basket, the split white-gold shank pavé-set to the shoulder — classic fire with architectural depth for the Kira line.",
  },
  {
    id: "ring-maison-embrace",
    category: "rings",
    productCode: "BD-K-RG-004",
    image: "/Rings/Women_ring.png",
    imageWellColor: "#767674",
    alt: "Signature Embrace — women's diamond ring",
    title: "Signature Embrace",
    description:
      "An elegant silhouette with a certified centre brilliant — feminine, assured, and made to be worn without occasion.",
  },
  {
    id: "ring-geometric-pear",
    category: "rings",
    productCode: "BD-G-RG-008",
    image: "/Rings/IMG_7434.jpg",
    imageWellColor: "#dbcebb",
    alt: "Geometric Pear — pear-cut diamond ring in yellow gold",
    title: "Geometric Pear",
    description:
      "A pear brilliant suspended in a faceted octagonal gold frame on a polished flat band — architectural lines and modern proportion for the contemporary hand.",
  },
  {
    id: "ring-emerald-starburst",
    category: "rings",
    productCode: "BD-K-RG-005",
    image: "/Rings/IMG_7416.jpg",
    imageWellColor: "#d0c1ac",
    alt: "Emerald Starburst — square emerald and diamond halo ring",
    title: "Emerald Starburst",
    description:
      "A square emerald-cut centre framed in marquise, pear, and round brilliants on a pavé split shank in white gold — high-jewellery presence composed for the hand.",
  },
  {
    id: "ring-pave-shoulder-classique",
    category: "rings",
    productCode: "BD-G-RG-013",
    image: "/Rings/IMG_7447.jpg",
    imageWellColor: "#d4c0a7",
    alt: "Pavé Shoulder Classic — round diamond solitaire with pavé shoulders",
    title: "Pavé Shoulder Classic",
    description:
      "A round brilliant in a four-prong white-gold setting, flanked by pavé-set shoulders — timeless solitaire poise with added luminosity at the band.",
  },
  {
    id: "ring-ruby-radiance",
    category: "rings",
    productCode: "BD-G-RG-039",
    image: "/Rings/Women1.jpg",
    imageWellColor: "#c5b095",
    alt: "Ruby Radiance — emerald-cut ruby double halo ring in white gold",
    title: "Ruby Radiance",
    description:
      "An emerald-cut ruby crowned in a double halo of round brilliants on a pavé split shank — regal colour and salon-scale fire for the statement hand.",
  },
  {
    id: "ring-geometric-princess",
    category: "rings",
    productCode: "BD-G-RG-009",
    image: "/Rings/IMG_7435.jpg",
    imageWellColor: "#d9cdbd",
    alt: "Geometric Princess — princess-cut diamond ring in yellow gold",
    title: "Geometric Princess",
    description:
      "A princess-cut centre stone nested in a bevelled octagonal yellow-gold frame — crisp geometry and confident minimalism composed for everyday brilliance.",
  },
  {
    id: "ring-canary-trilogy",
    category: "rings",
    productCode: "BD-G-RG-026",
    image: "/Rings/IMG_7528.jpg",
    imageWellColor: "#f3f3ef",
    alt: "Canary Trilogy — yellow radiant and emerald-cut trilogy ring in white gold",
    title: "Canary Trilogy",
    description:
      "A canary radiant centre flanked by emerald-cut brilliants on a polished white-gold band — three-stone poise with colour, fire, and salon-refined proportion.",
  },
  {
    id: "ring-tri-tone-wave",
    category: "rings",
    productCode: "BD-G-RG-011",
    image: "/Rings/IMG_7445.jpg",
    imageWellColor: "#d8c7b1",
    alt: "Tri-Tone Wave — round diamond ring in yellow, white, and rose gold",
    title: "Tri-Tone Wave",
    description:
      "Yellow, white, and rose gold bands curve in fluid waves beneath a round brilliant — three tones of warmth composed for a singular, modern statement.",
  },
  {
    id: "ring-sapphire-sovereign",
    category: "rings",
    productCode: "BD-G-RG-041",
    image: "/Rings/Women3.jpg",
    imageWellColor: "#c3a98c",
    alt: "Sapphire Sovereign — emerald-cut sapphire double halo ring",
    title: "Sapphire Sovereign",
    description:
      "An emerald-cut blue sapphire framed in twin diamond halos on a pavé split shank — deep colour and architectural brilliance in white gold.",
  },
  {
    id: "ring-knot-basket",
    category: "rings",
    productCode: "BD-G-RG-014",
    image: "/Rings/IMG_7449.jpg",
    imageWellColor: "#ece6d6",
    alt: "Knot Basket — round diamond solitaire with knot basket in yellow gold",
    title: "Knot Basket",
    description:
      "A six-prong round brilliant rests above an interlocking knot basket on a slender yellow-gold band — romantic detail with the house's signature precision.",
  },
  {
    id: "ring-pink-oval-halo",
    category: "rings",
    productCode: "BD-G-RG-030",
    image: "/Rings/IMG_7569.jpg",
    imageWellColor: "#e5dccd",
    alt: "Pink Oval Halo — pink sapphire oval halo ring with rose-gold prongs and pavé shoulders in white gold",
    title: "Pink Oval Halo",
    description:
      "An oval pink sapphire held in rose-gold prongs within a round-brilliant halo, the white-gold shoulders pavé-set to the band — colour, contrast, and romantic salon refinement.",
  },
  {
    id: "ring-pave-split-solitaire",
    category: "rings",
    productCode: "BD-G-RG-012",
    image: "/Rings/IMG_7446.jpg",
    imageWellColor: "#decdb5",
    alt: "Pavé Split Solitaire — round diamond ring with pavé split shank",
    title: "Pavé Split Solitaire",
    description:
      "A round brilliant rises from an overlapping split shank pavé-set in micro brilliants — yellow gold architecture with continuous fire at the finger.",
  },
  {
    id: "ring-emerald-petal",
    category: "rings",
    productCode: "BD-G-RG-042",
    image: "/Rings/Women4.jpg",
    imageWellColor: "#dbc3a9",
    alt: "Emerald Petal — oval emerald marquise petal burst ring",
    title: "Emerald Petal",
    description:
      "An oval emerald centre blooming in marquise diamond petals on a polished white-gold shank — floral high jewellery with gala-ready presence.",
  },
  {
    id: "ring-bypass-solitaire",
    category: "rings",
    productCode: "BD-G-RG-015",
    image: "/Rings/IMG_7450.jpg",
    imageWellColor: "#ded5c4",
    alt: "Bypass Solitaire — round diamond ring with bypass shank in white gold",
    title: "Bypass Solitaire",
    description:
      "Curving white-gold shoulders embrace a round brilliant in a fluid bypass silhouette — asymmetry and grace composed for the modern proposal.",
  },
  {
    id: "ring-marquise-pave-solitaire",
    category: "rings",
    productCode: "BD-G-RG-027",
    image: "/Rings/IMG_7551.jpg",
    imageWellColor: "#c7b7a4",
    alt: "Marquise Pavé Solitaire — marquise diamond ring with pavé shoulders in white gold",
    title: "Marquise Pavé Solitaire",
    description:
      "A marquise brilliant held in twin-prong poise, the white-gold shoulders pavé-set with round brilliants — elongated elegance and continuous fire at the finger.",
  },
  {
    id: "ring-cabochon-emerald",
    category: "rings",
    productCode: "BD-K-RG-006",
    image: "/Rings/IMG_7417.jpg",
    imageWellColor: "#cfbfb0",
    alt: "Cabochon Emerald — oval emerald and diamond statement ring",
    title: "Cabochon Emerald",
    description:
      "An oval cabochon emerald crowned in a milgrain diamond halo on a wide, graduating pavé band in platinum-toned white gold — regal colour with vintage-inspired refinement.",
  },
  {
    id: "ring-split-halo-solitaire",
    category: "rings",
    productCode: "BD-G-RG-018",
    image: "/Rings/IMG_7480.jpg",
    imageWellColor: "#ded0bd",
    alt: "Split Halo Solitaire — round diamond halo ring with split shank in yellow gold",
    title: "Split Halo Solitaire",
    description:
      "A round brilliant crowned in a diamond halo, the yellow-gold shank splitting into pavé-set loops — classic fire with sculptural, house-refined proportion.",
  },
  {
    id: "ring-sapphire-marquise-halo",
    category: "rings",
    productCode: "BD-G-RG-033",
    image: "/Rings/IMG_7572.jpg",
    imageWellColor: "#e3d8c9",
    alt: "Sapphire Marquise Halo — blue sapphire marquise halo ring with pavé band in white gold",
    title: "Sapphire Marquise Halo",
    description:
      "A marquise blue sapphire crowned in a scalloped round-brilliant halo, the white-gold band pavé-set to the shoulder — deep colour and continuous fire in elongated elegance.",
  },
  {
    id: "ring-emerald-sunburst",
    category: "rings",
    productCode: "BD-K-RG-007",
    image: "/Rings/IMG_7418.jpg",
    imageWellColor: "#d9c6b3",
    alt: "Emerald Sunburst — oval emerald and marquise diamond cocktail ring",
    title: "Emerald Sunburst",
    description:
      "An oval emerald centre radiates marquise and round diamond starbursts in white gold — bold cocktail-scale brilliance for evening and celebration.",
  },
  {
    id: "ring-princess-halo-eclat",
    category: "rings",
    productCode: "BD-G-RG-024",
    image: "/Rings/IMG_7546.jpg",
    imageWellColor: "#f9f9f8",
    alt: "Princess Halo Éclat — princess-cut diamond halo ring with split pavé shank in white gold",
    title: "Princess Halo Éclat",
    description:
      "A princess-cut centre stone crowned in a round-brilliant halo, the split white-gold shank pavé-set to the shoulder — crisp geometry with continuous luminosity.",
  },
  {
    id: "ring-floral-arc",
    category: "rings",
    productCode: "BD-G-RG-017",
    image: "/Rings/IMG_7433.jpg",
    imageWellColor: "#d1c2ab",
    alt: "Floral Arc — rose gold diamond cluster ring with pavé arc",
    title: "Floral Arc",
    description:
      "A floral diamond cluster suspended beneath a pavé-set arc on polished rose gold — architectural negative space and soft bloom composed for the modern hand.",
  },
  {
    id: "ring-ruby-floral-sunburst",
    category: "rings",
    productCode: "BD-G-RG-034",
    image: "/Rings/IMG_7573.jpg",
    imageWellColor: "#ded1c4",
    alt: "Ruby Floral Sunburst — oval ruby cluster ring with pear and marquise diamonds in white gold",
    title: "Ruby Floral Sunburst",
    description:
      "An oval ruby anchors a tiered sunburst of pear and marquise brilliants on polished white gold — floral volume and red-carpet scale composed for evening celebration.",
  },
  {
    id: "ring-cushion-pave-classique",
    category: "rings",
    productCode: "BD-G-RG-019",
    image: "/Rings/IMG_7481.jpg",
    imageWellColor: "#dccdb9",
    alt: "Cushion Pavé Classic — cushion-cut diamond solitaire with pavé band in white gold",
    title: "Cushion Pavé Classic",
    description:
      "A cushion brilliant in a four-prong white-gold setting with a hidden halo and pavé shoulders — soft geometry and continuous luminosity at the finger.",
  },
  {
    id: "ring-heart-oval-toi-et-moi",
    category: "rings",
    productCode: "BD-G-RG-031",
    image: "/Rings/IMG_7570.jpg",
    imageWellColor: "#e5dbd1",
    alt: "Heart & Oval Toi et Moi — heart and oval diamond bypass ring in white gold",
    title: "Heart & Oval Toi et Moi",
    description:
      "A heart brilliant and an oval brilliant meet in bypass poise on a polished white-gold band — two silhouettes, one romantic gesture composed for proposal and celebration.",
  },
  {
    id: "ring-emerald-halo-riviere",
    category: "rings",
    productCode: "BD-G-RG-020",
    image: "/Rings/IMG_7482.jpg",
    imageWellColor: "#e2d4c4",
    alt: "Emerald Halo Rivière — emerald-cut diamond halo ring with pavé band",
    title: "Emerald Halo Rivière",
    description:
      "An emerald-cut centre stone framed in a round-brilliant halo on a pavé white-gold band — step-cut poise with the fire of a continuous diamond line.",
  },
  {
    id: "ring-oval-riviere-maison",
    category: "rings",
    productCode: "BD-G-RG-025",
    image: "/Rings/IMG_7547.jpg",
    imageWellColor: "#dcd0c3",
    alt: "Oval Rivière Maison — oval diamond statement ring with pavé band in white gold",
    title: "Oval Rivière Maison",
    description:
      "An oval brilliant anchors a wide white-gold band pavé-set with round brilliants and milgrain refinement — salon breadth and uninterrupted fire for evening and celebration.",
  },
  {
    id: "ring-bypass-eclat",
    category: "rings",
    productCode: "BD-G-RG-016",
    image: "/Rings/IMG_7451.jpg",
    imageWellColor: "#d6cdbd",
    alt: "Bypass Radiance — round diamond bypass ring in white gold",
    title: "Bypass Radiance",
    description:
      "A round brilliant held in a four-prong setting as the band sweeps upward in a polished bypass line — clean curves and uninterrupted brilliance for every day.",
  },
  {
    id: "ring-emerald-trilogy-halo",
    category: "rings",
    productCode: "BD-G-RG-028",
    image: "/Rings/IMG_7567.jpg",
    imageWellColor: "#e1d9cd",
    alt: "Emerald Trilogy Halo — emerald-cut diamond trilogy ring with pear sides and split pavé shank in yellow gold",
    title: "Emerald Trilogy Halo",
    description:
      "An emerald-cut centre stone flanked by pear brilliants, each crowned in a micro-brilliant halo on a split yellow-gold shank pavé-set to the shoulder — three-stone grandeur with salon-refined fire.",
  },
  {
    id: "ring-marquise-sunburst",
    category: "rings",
    productCode: "BD-G-RG-023",
    image: "/Rings/IMG_7545.jpg",
    imageWellColor: "#e5dbd0",
    alt: "Marquise Sunburst — round diamond and marquise cluster ring in white gold",
    title: "Marquise Sunburst",
    description:
      "A round brilliant radiates within a marquise and micro-brilliant sunburst on a split white-gold shank — architectural bloom and gala-scale fire composed for the hand.",
  },
  {
    id: "ring-red-emerald-split",
    category: "rings",
    productCode: "BD-G-RG-032",
    image: "/Rings/IMG_7571.jpg",
    imageWellColor: "#e3d6c6",
    alt: "Red Emerald Split — emerald-cut red gemstone ring with split shank in yellow gold",
    title: "Red Emerald Split",
    description:
      "An emerald-cut red gemstone rises from a sculptural split yellow-gold shank — step-cut colour and architectural negative space composed as a modern salon statement.",
  },
  {
    id: "ring-triple-strand-solitaire",
    category: "rings",
    productCode: "BD-G-RG-021",
    image: "/Rings/IMG_7483.jpg",
    imageWellColor: "#e7decf",
    alt: "Triple Strand Solitaire — round diamond ring with triple split shank in white gold",
    title: "Triple Strand Solitaire",
    description:
      "Three polished white-gold strands curve from a rope-detail basket to cradle a round brilliant — fluid architecture with timeless solitaire brilliance.",
  },
  {
    id: "ring-marquise-halo-maison",
    category: "rings",
    productCode: "BD-G-RG-029",
    image: "/Rings/IMG_7568.jpg",
    imageWellColor: "#e1d9ce",
    alt: "Marquise Halo Maison — marquise diamond halo ring with pavé band in white gold",
    title: "Marquise Halo Maison",
    description:
      "A marquise brilliant encircled in a round-brilliant halo, the white-gold band pavé-set in continuous line — elongated poise and gala-scale luminosity composed for the hand.",
  },
  {
    id: "ring-ruby-pear-marquise-burst",
    category: "rings",
    productCode: "BD-G-RG-035",
    image: "/Rings/IMG_7574.jpg",
    imageWellColor: "#ddcfc0",
    alt: "Ruby Pear Marquise Burst — pear ruby and marquise diamond burst ring with pavé swirl in white gold",
    title: "Ruby Pear Marquise Burst",
    description:
      "A pear ruby meets an asymmetrical marquise and pear diamond burst, pavé swirls tracing the white-gold shank — sculptural drama and salon-scale fire for the statement hand.",
  },
  {
    id: "ring-rose-solitaire-scroll",
    category: "rings",
    productCode: "BD-G-RG-022",
    image: "/Rings/IMG_7484.jpg",
    imageWellColor: "#fbfbfa",
    alt: "Rose Solitaire Scroll — round diamond solitaire with scroll basket in rose gold",
    title: "Rose Solitaire Scroll",
    description:
      "A round brilliant in a four-prong rose-gold setting with scrollwork at the basket — warm metal and romantic detail composed for proposal and every day after.",
  },
  {
    id: "ring-sapphire-maison",
    category: "rings",
    productCode: "BD-G-RG-045",
    image: "/Rings/Women7.jpg",
    imageWellColor: "#c8ac8d",
    alt: "Sapphire Maison — oval sapphire split-shank ring in yellow gold",
    title: "Sapphire Maison",
    description:
      "An oval blue sapphire in yellow-gold prongs, the split shank pavé-set with milgrain refinement — colour, contrast, and atelier craft in one silhouette.",
  },
  {
    id: "ring-emerald-salon-film",
    category: "rings",
    productCode: "BD-G-RG-036",
    image: "/Rings/Green_g.mp4",
    video: "/Rings/Green_g.mp4",
    imageWellColor: "#faf8f5",
    alt: "Emerald Garden — green gemstone ring salon film",
    title: "Emerald Garden",
    gemstoneSpec: "1 ct centre gemstone",
    goldSpec: "3.5 to 4 gm gold",
    salonPriceInr: 98_000,
    description:
      "An emerald-toned centre stone (~1 ct) in 3.5 to 4 gm refined gold — captured in salon motion, the facets turning with light as the piece is composed for the hand.",
  },
  {
    id: "ring-ruby-salon-film",
    category: "rings",
    productCode: "BD-G-RG-037",
    image: "/Rings/Red_g.mp4",
    video: "/Rings/Red_g.mp4",
    imageWellColor: "#faf8f5",
    alt: "Ruby Éclat — ruby ring salon film",
    title: "Ruby Éclat",
    gemstoneSpec: "1 ct centre gemstone",
    goldSpec: "3.5 to 4 gm gold",
    salonPriceInr: 98_000,
    description:
      "Deep ruby fire (~1 ct centre gemstone) held in 3.5 to 4 gm polished gold — a salon film revealing depth, colour, and the house's precision from every angle.",
  },
  {
    id: "ring-sapphire-salon-film",
    category: "rings",
    productCode: "BD-G-RG-038",
    image: "/Rings/Blue_W.mp4",
    video: "/Rings/Blue_W.mp4",
    imageWellColor: "#faf8f5",
    alt: "Sapphire Lumière — blue sapphire ring salon film in white gold",
    title: "Sapphire Lumière",
    gemstoneSpec: "1 ct centre gemstone",
    goldSpec: "3.5 to 4 gm gold",
    salonPriceInr: 98_000,
    description:
      "A blue sapphire (~1 ct) radiant in 3.5 to 4 gm white gold — salon motion tracing the stone's fire and the continuous brilliance of the band.",
  },
  {
    id: "ring-eternity-lumiere",
    category: "rings",
    productCode: "BD-G-RG-040",
    image: "/Rings/Women2.jpg",
    imageWellColor: "#be9d77",
    alt: "Eternity Lumière — round diamond eternity band in white gold",
    title: "Eternity Lumière",
    description:
      "Round brilliants in continuous shared-prong line around a polished white-gold band — uninterrupted light composed for everyday radiance.",
  },
  {
    id: "ring-oval-eternity",
    category: "rings",
    productCode: "BD-G-RG-043",
    image: "/Rings/Women5.jpg",
    imageWellColor: "#6d5138",
    alt: "Oval Eternity — oval diamond eternity band in white gold",
    title: "Oval Eternity",
    description:
      "Oval brilliants set in an unbroken circle on white gold — elongated fire and refined proportion for the modern hand.",
  },
  {
    id: "ring-golden-circle",
    category: "rings",
    productCode: "BD-G-RG-044",
    image: "/Rings/Women6.jpg",
    imageWellColor: "#b1936c",
    alt: "Golden Circle — round diamond eternity band in yellow gold",
    title: "Golden Circle",
    description:
      "Round brilliants in shared-prong eternity around a warm yellow-gold band — continuous brilliance with the house's golden warmth.",
  },
  {
    id: "ring-baguette-solitaire",
    category: "rings",
    productCode: "BD-G-RG-046",
    image: "/Rings/Women8.jpg",
    imageWellColor: "#b5ab9d",
    alt: "Baguette Solitaire — round brilliant with baguette double-band ring",
    title: "Baguette Solitaire",
    description:
      "A round brilliant elevated above twin channel-set baguette rows on a wide yellow-gold band — architectural lines and uninterrupted salon light.",
  },
  {
    id: "ring-baguette-line",
    category: "rings",
    productCode: "BD-G-RG-047",
    image: "/Rings/Women9.jpg",
    imageWellColor: "#ddd5ca",
    alt: "Baguette Line — baguette diamond eternity band in yellow gold",
    title: "Baguette Line",
    description:
      "Vertical baguette diamonds channel-set in continuous line around a polished yellow-gold band — sleek geometry and modern eternity brilliance.",
  },
  {
    id: "brace-feuille-douce",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-001",
    image: "/Bracelet2.png",
    imageWellColor: "#d3bea3",
    alt: "Soft Leaf — marquise diamond bangle bracelets",
    title: "Soft Leaf",
    description:
      "Twin yellow-gold bangles set with marquise diamonds in a laurel-leaf motif — layered wrist brilliance with sculptural, house-refined proportion.",
  },
  {
    id: "brace-jardin-floreal",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-004",
    image: "/Bracelet/Bracelet3.png",
    imageWellColor: "#0a0a0a",
    alt: "Floral Garden — floral cluster diamond bracelet",
    title: "Floral Garden",
    description:
      "Twin rows of marquise and round brilliants bloom in repeating floral clusters — a wide, flexible collar for the wrist with high-jewellery presence and continuous light.",
  },
  {
    id: "brace-tennis-brilliant",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-003",
    image: "/Bracelet/tennis1.png",
    imageWellColor: "#e5d2ba",
    alt: "Tennis Brilliant — round diamond tennis bracelet",
    title: "Tennis Brilliant",
    description:
      "A classic tennis line of round IGI-certified brilliants in four-prong settings — uninterrupted sparkle for the wrist, refined enough to wear alone or layered.",
  },
  {
    id: "brace-tennis-marquise",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-002",
    image: "/Bracelet/necklace12.png",
    imageWellColor: "#05060b",
    alt: "Tennis Marquise — marquise diamond tennis bracelet",
    title: "Tennis Marquise",
    description:
      "Marquise brilliants set edge to edge in a continuous line — fluid fire around the wrist, composed to stack with the house's bangles and cuffs.",
  },
  {
    id: "brace-tennis-poire",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-005",
    image: "/Bracelet/Bracelet4.png",
    imageWellColor: "#131313",
    alt: "Tennis Pear — three-row pear and round diamond tennis bracelet",
    title: "Tennis Pear",
    description:
      "Three articulated rows of pear and round brilliants in a scalloped tennis line — wider wrist fire with the same fluid, stackable elegance as the house's classic tennis styles.",
  },
  {
    id: "brace-coeur-lumiere",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-006",
    image: "/Bracelet/IMG_7375.JPG",
    imageWellColor: "#000000",
    alt: "Heartlight — heart-cut diamond tennis bracelet in rose gold",
    title: "Heartlight",
    description:
      "A continuous line of heart-cut IGI-certified brilliants in warm rose gold — romantic geometry and uninterrupted fire around the wrist.",
  },
  {
    id: "brace-princesse-rosee",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-008",
    image: "/Bracelet/BR1.png",
    imageWellColor: "#e4d3bc",
    alt: "Rose Princess — princess-cut diamond tennis bracelet in rose gold",
    title: "Rose Princess",
    description:
      "Princess-cut brilliants set edge to edge in warm rose gold — a softer tennis silhouette with the house's signature precision.",
  },
  {
    id: "brace-motif-papillon",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-009",
    image: "/Bracelet/IMG_7368-2.jpg",
    imageWellColor: "#ffffff",
    alt: "Butterfly Link — pear and princess diamond bracelet in rose gold",
    title: "Butterfly Link",
    description:
      "Alternating pear and princess diamonds in rose gold form a continuous butterfly motif — sculptural links with gala-ready brilliance.",
  },
  {
    id: "brace-rosee-classique",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-011",
    image: "/Bracelet/IMG_7374.JPG",
    imageWellColor: "#ffffff",
    alt: "Classic Rose Tennis — round diamond tennis bracelet in rose gold",
    title: "Classic Rose Tennis",
    description:
      "Round IGI-certified brilliants in a classic four-prong tennis line on rose gold — timeless wrist brilliance with a warm golden glow.",
  },
  {
    id: "brace-emeraude-alternee",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-012",
    image: "/Bracelet/IMG_7376.JPG",
    imageWellColor: "#ffffff",
    alt: "Alternating Emerald — emerald and diamond tennis bracelet",
    title: "Alternating Emerald",
    description:
      "Round emeralds and brilliants alternate in a yellow-gold tennis line — rhythmic colour and light for day-to-evening wear.",
  },
  {
    id: "brace-halo-emeraude-or",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-013",
    image: "/Bracelet/jcyvoyjcyvoyjcyv.jpg",
    imageWellColor: "#ece4dc",
    alt: "Emerald Radiance — emerald-cut and marquise diamond cluster bracelet",
    title: "Emerald Radiance",
    description:
      "Emerald-cut centres framed in marquise and round diamond halos on white gold — a continuous line of colour and brilliance with pavé-set clasp refinement.",
  },
  {
    id: "brace-jardin-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-014",
    image: "/Bracelet/iih2ksiih2ksiih2-2.jpg",
    imageWellColor: "#bdaf9e",
    alt: "Emerald Garden — oval emerald and diamond floral link bracelet",
    title: "Emerald Garden",
    description:
      "Oval emeralds in diamond halos join floral diamond links on yellow gold — botanical grace articulated for the wrist.",
  },
  {
    id: "brace-halo-emeraude-maison",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-015",
    image: "/Bracelet/iih2ksiih2ksiih2-1.jpg",
    imageWellColor: "#dfd7ce",
    alt: "Cushion Emerald Halo — cushion emerald and diamond link bracelet",
    title: "Cushion Emerald Halo",
    description:
      "Cushion emeralds framed in pavé halos alternate with round brilliants in white gold — colour, symmetry, and high-jewellery poise.",
  },
  {
    id: "brace-rivage-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-016",
    image: "/Bracelet/iih2ksiih2ksiih2.jpg",
    imageWellColor: "#c1b4a4",
    alt: "Emerald Shore — oval emerald and diamond halo bracelet",
    title: "Emerald Shore",
    description:
      "A rivière of oval emeralds, each encircled by round brilliants in white gold — fluid links composed for layered luminosity.",
  },
  {
    id: "brace-floreal-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-017",
    image: "/Bracelet/iih2ksiih2ksiih2-5.jpg",
    imageWellColor: "#dfd7cd",
    alt: "Floral Emerald — square emerald and marquise diamond cluster bracelet",
    title: "Floral Emerald",
    description:
      "Square emeralds bloom in marquise and round diamond clusters on white and yellow gold — ornate wrist artistry for the collector.",
  },
  {
    id: "brace-etoile-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-018",
    image: "/Bracelet/iih2ksiih2ksiih2-4.jpg",
    imageWellColor: "#e5dbd0",
    alt: "Emerald Starburst — emerald-cut diamond starburst bracelet",
    title: "Emerald Starburst",
    description:
      "Emerald-cut centres radiate marquise diamond starbursts in white gold — bold geometry and evening-scale presence.",
  },
  {
    id: "brace-art-deco-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-019",
    image: "/Bracelet/jcyvoyjcyvoyjcyv-1.jpg",
    imageWellColor: "#b7ab9b",
    alt: "Art Deco Emerald — wide emerald and diamond bracelet",
    title: "Art Deco Emerald",
    description:
      "Cushion emeralds anchor an Art Deco lattice of round and pear brilliants in white gold — architectural width and red-carpet drama.",
  },
  {
    id: "brace-ligne-halo-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-020",
    image: "/Bracelet/iih2ksiih2ksiih2-3.jpg",
    imageWellColor: "#e1d8ce",
    alt: "Emerald Halo Line — round emerald and diamond halo link bracelet",
    title: "Emerald Halo Line",
    description:
      "Round emeralds crowned in diamond halos, linked in polished yellow gold — fluid salon elegance with secure box-clasp refinement.",
  },
  {
    id: "brace-cuff-floreal-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-022",
    image: "/Bracelet/IMG_7385.JPG",
    imageWellColor: "#5a5758",
    alt: "Floral Emerald Cuff — three-row emerald and diamond cuff bracelet",
    title: "Floral Emerald Cuff",
    description:
      "Three rows of emerald-cut stones bloom in marquise diamond garlands on white gold — a wide flexible cuff with haute joaillerie depth.",
  },
  {
    id: "brace-rubis-alterne",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-021",
    image: "/Bracelet/IMG_7386.JPG",
    imageWellColor: "#ffffff",
    alt: "Alternating Ruby — ruby and diamond tennis bracelet",
    title: "Alternating Ruby",
    description:
      "Emerald-cut rubies alternate with princess-cut diamond pairs in white gold — vivid colour in a refined tennis silhouette.",
  },
  {
    id: "brace-heart-tennis-platinum",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-023",
    image: "/Bracelet/IMG_7364.jpg",
    imageWellColor: "#030507",
    alt: "Platinum Heart Tennis — heart-cut diamond tennis bracelet",
    title: "Platinum Heart Tennis",
    description:
      "Heart-cut IGI-certified brilliants in a continuous four-prong tennis line on white gold — romantic silhouette with uninterrupted fire around the wrist.",
  },
  {
    id: "brace-rose-gold-tennis-line",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-024",
    image: "/Bracelet/IMG_7373.JPG",
    imageWellColor: "#ffffff",
    alt: "Rose Gold Line Tennis — round diamond tennis bracelet in rose gold",
    title: "Rose Gold Line Tennis",
    description:
      "Round brilliants in a classic four-prong tennis line on warm rose gold — everyday brilliance with the house's signature precision and secure box clasp.",
  },
  {
    id: "brace-sapphire-halo-bloom",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-026",
    image: "/Bracelet/IMG_7407.jpg",
    imageWellColor: "#e1d9ce",
    alt: "Sapphire Halo Bloom — oval sapphire and diamond floral link bracelet",
    title: "Sapphire Halo Bloom",
    description:
      "Oval sapphires in round diamond halos alternate with quatrefoil diamond links on white gold — regal colour in a fluid, salon-composed line.",
  },
  {
    id: "brace-ruby-marquise-tennis",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-027",
    image: "/Bracelet/IMG_7408.jpg",
    imageWellColor: "#e7d9c8",
    alt: "Ruby Marquise Tennis — oval ruby and marquise diamond tennis bracelet",
    title: "Ruby Marquise Tennis",
    description:
      "Oval rubies with pavé-set ends alternate with marquise diamonds in white gold — rhythmic crimson and light in a refined tennis silhouette.",
  },
  {
    id: "brace-sapphire-five-row-cuff",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-028",
    image: "/Bracelet/IMG_7409-2.jpg",
    imageWellColor: "#c9c3b7",
    alt: "Sapphire Five Row Cuff — wide sapphire and diamond cuff bracelet",
    title: "Sapphire Five Row Cuff",
    description:
      "Five alternating rows of oval sapphires and round brilliants in scalloped bezel settings on white gold — architectural width with secure box-clasp refinement.",
  },
  {
    id: "brace-ruby-triple-row",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-029",
    image: "/Bracelet/IMG_7410.jpg",
    imageWellColor: "#e0d9cf",
    alt: "Ruby Triple Row — three-row ruby and diamond bracelet",
    title: "Ruby Triple Row",
    description:
      "Three articulated rows of round rubies and brilliants in white gold — the centre line alternates crimson and white fire for opulent, flexible wrist coverage.",
  },
  {
    id: "brace-ruby-marquise-link",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-030",
    image: "/Bracelet/IMG_7411.jpg",
    imageWellColor: "#e7d7c5",
    alt: "Ruby Marquise Link — oval ruby and marquise diamond link bracelet",
    title: "Ruby Marquise Link",
    description:
      "Paired oval rubies and vertical marquise diamonds in polished white gold — sculptural links with gala-ready brilliance and secure closure.",
  },
  {
    id: "brace-pear-ruby-three-row",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-031",
    image: "/Bracelet/IMG_7412.jpg",
    imageWellColor: "#e2dcce",
    alt: "Pear Ruby Three Row — pear-cut ruby and diamond three-row bracelet",
    title: "Pear Ruby Three Row",
    description:
      "Pear-cut rubies form serrated outer rows around a centre line of round brilliants on white gold — bold geometry and evening-scale presence.",
  },
  {
    id: "brace-ruby-emerald-cut-flex",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-032",
    image: "/Bracelet/IMG_7413.jpg",
    imageWellColor: "#dfceb9",
    alt: "Ruby Emerald Cut Flex — emerald-cut ruby and diamond flex bangle",
    title: "Ruby Emerald Cut Flex",
    description:
      "A centre row of emerald-cut rubies flanked by round diamond borders in a flexible white-gold band — classic opulence designed for comfortable, clasp-free wear.",
  },
  {
    id: "brace-sapphire-art-deco-line",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-033",
    image: "/Bracelet/IMG_7414.jpg",
    imageWellColor: "#e8dfd5",
    alt: "Sapphire Art Deco Line — princess diamond and sapphire line bracelet",
    title: "Sapphire Art Deco Line",
    description:
      "Square brilliants in an Art Deco line bordered by calibré sapphires on white gold — geometric links with vintage-inspired refinement and a secure box clasp.",
  },
  {
    id: "brace-emerald-column-bangle",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-034",
    image: "/Bracelet/IMG_7491.jpg",
    imageWellColor: "#d7c8b0",
    alt: "Emerald Column Bangle — emerald-cut and baguette diamond bangle",
    title: "Emerald Column Bangle",
    description:
      "A central emerald-cut brilliant anchors vertical columns of baguette and round diamonds in white gold — Art Deco geometry with cuff-scale presence and secure hinged closure.",
  },
  {
    id: "brace-grand-emerald-bangle",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-035",
    image: "/Bracelet/IMG_7492.jpg",
    imageWellColor: "#dbcdbd",
    alt: "Grand Emerald Bangle — wide emerald and baguette diamond bangle",
    title: "Grand Emerald Bangle",
    description:
      "A wide hinged bangle with a centre emerald-cut stone flanked by baguette lines and round-brilliant borders — architectural width and salon-composed brilliance.",
  },
  {
    id: "brace-rose-woven-line",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-036",
    image: "/Bracelet/IMG_7493.jpg",
    imageWellColor: "#e7dacb",
    alt: "Rose Woven Line — baguette diamond woven bracelet in rose gold",
    title: "Rose Woven Line",
    description:
      "Interlocking baguette diamonds in a woven rose-gold line, bordered by round brilliants — fluid texture and warm luminosity composed for evening wear.",
  },
  {
    id: "neck-saphir-majeste",
    category: "necklaces",
    productCode: "BD-K-NK-011",
    image: "/Necklace_s1.png",
    imageWellColor: "#d1b9a0",
    alt: "Sapphire Majesty — sapphire and diamond collar necklace",
    title: "Sapphire Majesty",
    description:
      "Cushion and oval sapphires framed in double diamond halos, joined by marquise floral motifs — a collar of depth, colour, and high-jewellery composition.",
  },
  {
    id: "neck-lumiere-cascade",
    category: "necklaces",
    productCode: "BD-K-NK-001",
    image: "/necklace/Neck1.png",
    imageWellColor: "#010101",
    alt: "Cascade of Light — graduated diamond fringe necklace",
    title: "Cascade of Light",
    description:
      "A sweeping fringe of IGI-certified brilliants, each stone hand-set to catch light with every movement — red-carpet presence, distilled.",
  },
  {
    id: "neck-riviere-nocturne",
    category: "necklaces",
    productCode: "BD-K-NK-002",
    image: "/necklace/Neck2.png",
    imageWellColor: "#0d0d0d",
    alt: "Evening River — diamond collar necklace",
    title: "Evening River",
    description:
      "An uninterrupted river of lab-grown diamonds in a refined collar silhouette — evening elegance, composed and unmistakable.",
  },
  {
    id: "neck-celestial-drop",
    category: "necklaces",
    productCode: "BD-K-NK-003",
    image: "/necklace/Neck3.png",
    imageWellColor: "#111214",
    alt: "Celestial Drop — pendant necklace with pear diamond",
    title: "Celestial Drop",
    description:
      "A singular pear-cut centre stone suspended from a delicate line of micro-pavé — quiet brilliance for the woman who needs no introduction.",
  },
  {
    id: "neck-atelier-classique",
    category: "necklaces",
    productCode: "BD-K-NK-004",
    image: "/necklace/Neck4.png",
    imageWellColor: "#0b0b0d",
    alt: "Atelier Classic — diamond station necklace",
    title: "Atelier Classic",
    description:
      "Evenly spaced round brilliants along a fine chain — the house signature of proportion, balance, and everyday refinement.",
  },
  {
    id: "neck-grace-eternelle",
    category: "necklaces",
    productCode: "BD-K-NK-006",
    image: "/necklace/Neck6.png",
    imageWellColor: "#030304",
    alt: "Eternal Grace — diamond halo pendant necklace",
    title: "Eternal Grace",
    description:
      "A halo of pavé diamonds encircling a radiant centre — soft luminosity designed to rest beautifully against the collarbone.",
  },
  {
    id: "neck-maison-rubis",
    category: "necklaces",
    productCode: "BD-K-NK-007",
    image: "/necklace/Neck7.png",
    imageWellColor: "#0c0c0c",
    alt: "Ruby Heritage — ruby and diamond fringe necklace with matching earrings",
    title: "Ruby Heritage",
    description:
      "A cushion-cut ruby crowned in diamonds, with cascading pear and marquise drops — matched with chandelier earrings for an unmistakable statement of house high jewellery.",
  },
  {
    id: "neck-jardin-serein",
    category: "necklaces",
    productCode: "BD-K-NK-008",
    image: "/necklace/Nacklace9.png",
    imageWellColor: "#060709",
    alt: "Serene Garden — floral diamond collar necklace",
    title: "Serene Garden",
    description:
      "Floral motifs in pavé and baguette stones bloom along a sculpted collar — botanical grace rendered in IGI-certified brilliants for the woman who wears art at the throat.",
  },
  {
    id: "neck-aurora-plume",
    category: "necklaces",
    productCode: "BD-K-NK-009",
    image: "/necklace/Necklace10.png",
    imageWellColor: "#10100e",
    alt: "Aurora Plume — feathered diamond fringe necklace",
    title: "Aurora Plume",
    description:
      "Layered plumes of pear and marquise drops fan outward from a diamond-set centre — movement, depth, and gala-ready luminosity in a single atelier composition.",
  },
  {
    id: "neck-tennis-classique",
    category: "necklaces",
    productCode: "BD-K-NK-014",
    image: "/necklace/Necklace13.png",
    imageWellColor: "#050608",
    alt: "Classic Tennis — round brilliant tennis necklace",
    title: "Classic Tennis",
    description:
      "A continuous collar of IGI-certified round brilliants in a refined four-prong line — timeless tennis brilliance, composed for the modern neckline.",
  },
  {
    id: "neck-frange-poire",
    category: "necklaces",
    productCode: "BD-K-NK-015",
    image: "/necklace/Necklace14.png",
    imageWellColor: "#060706",
    alt: "Pear Fringe — pear diamond fringe necklace",
    title: "Pear Fringe",
    description:
      "Graduated pear drops suspended from a pavé strand — a fringe of movement and light designed for gala evenings and red-carpet presence.",
  },
  {
    id: "neck-double-fil-or",
    category: "necklaces",
    productCode: "BD-K-NK-016",
    image: "/necklace/Necklace15.png",
    imageWellColor: "#010101",
    alt: "Double Gold Strand — gold and diamond multi-strand necklace",
    title: "Double Gold Strand",
    description:
      "Twin diamond strands framed in polished yellow gold, converging on a pear and round-brilliant cascade — layered luxury with architectural proportion.",
  },
  {
    id: "neck-riviere-ovale",
    category: "necklaces",
    productCode: "BD-K-NK-017",
    image: "/necklace/Necklace16.png",
    imageWellColor: "#000000",
    alt: "Oval River — graduated oval diamond necklace",
    title: "Oval River",
    description:
      "Oval brilliants graduate from centre to clasp in a continuous rivière — elongated fire and even luminosity around the collarbone.",
  },
  {
    id: "neck-lariat-etoile",
    category: "necklaces",
    productCode: "BD-K-NK-018",
    image: "/necklace/Necklace17.png",
    imageWellColor: "#050507",
    alt: "Star Lariat — Y-necklace with pear diamond drop",
    title: "Star Lariat",
    description:
      "Round brilliants ascend to a central star stone, finishing in a pear drop — a Y-shaped lariat composed for décolletage and evening drama.",
  },
  {
    id: "neck-double-rangee",
    category: "necklaces",
    productCode: "BD-K-NK-019",
    image: "/necklace/Necklace18.png",
    imageWellColor: "#000000",
    alt: "Double Row — two-strand pear and marquise necklace",
    title: "Double Row",
    description:
      "Twin rows of pear and marquise diamonds in warm gold — a double-strand collar with sculptural symmetry and layered wrist-level brilliance at the throat.",
  },
  {
    id: "neck-maillon-eclat",
    category: "necklaces",
    productCode: "BD-K-NK-020",
    image: "/necklace/Necklace19.png",
    imageWellColor: "#020202",
    alt: "Luminous Link — halo link station necklace with drop",
    title: "Luminous Link",
    description:
      "Pavé halo links trace the chain, centred on a graduated drop of round brilliants — station-set radiance with a softly articulated silhouette.",
  },
  {
    id: "pend-emerald-halo",
    category: "pendants",
    productCode: "BD-K-PD-001",
    image: "/Pendant/necklace_s.png",
    imageWellColor: "#cab79f",
    alt: "Emerald Halo Pendant — emerald-cut diamond pendant with pavé halo",
    title: "Emerald Halo Pendant",
    description:
      "An emerald-cut centre brilliant encircled by a pavé halo on a delicate cable chain — precision geometry and warm gold, distilled to a single luminous point.",
  },
  {
    id: "pend-emerald-classic",
    category: "pendants",
    productCode: "BD-K-PD-002",
    image: "/Pendant/Necklace1a.jpg",
    imageWellColor: "#967c66",
    alt: "Classic Emerald Pendant — emerald and diamond halo on gold chain",
    title: "Classic Emerald Pendant",
    description:
      "A rectangular emerald-cut centre in a double diamond halo on yellow gold — a refined everyday pendant on a polished cable chain.",
  },
  {
    id: "pend-ruby-teardrop",
    category: "pendants",
    productCode: "BD-K-PD-003",
    image: "/Pendant/Necklace2b.jpg",
    imageWellColor: "#d7ccc0",
    alt: "Ruby Teardrop — ruby and diamond pendant on chain",
    title: "Ruby Teardrop",
    description:
      "A round ruby in a two-tone teardrop frame with pavé diamonds on white gold — understated colour for day-to-evening wear.",
  },
  {
    id: "pend-canary-pear-drop",
    category: "pendants",
    productCode: "BD-K-PD-004",
    image: "/Pendant/Necklace2c.jpg",
    imageWellColor: "#cebdae",
    alt: "Canary Pear Drop — yellow diamond pear pendant on chain",
    title: "Canary Pear Drop",
    description:
      "A pear-cut canary diamond suspended with round and pear accent stones on a fine white-gold chain — quiet radiance at the collarbone.",
  },
  {
    id: "for-him-signet-line",
    category: "for-him",
    productCode: "BD-K-MN-001",
    image: "/Mens/Men.png",
    imageWellColor: "#393939",
    alt: "Signet Line — men's diamond band",
    title: "Signet Line",
    description:
      "A bold band with inset brilliants — masculine restraint meets the house standard of cut, clarity, and craft.",
  },
  {
    id: "for-him-maison-band",
    category: "for-him",
    productCode: "BD-K-MN-002",
    image: "/Rings/Mens1.JPG",
    galleryImages: ["/Rings/Mens1a.JPG"],
    imageWellColor: "#4f4d4e",
    alt: "Maison Band — men's diamond band in white gold, salon view",
    title: "Maison Band",
    description:
      "A substantial white-gold band with channel-set brilliants — clean planes and weight on the hand, composed for everyday presence.",
  },
  {
    id: "for-him-architect-band",
    category: "for-him",
    productCode: "BD-K-MN-003",
    image: "/Rings/Mens2.JPG",
    imageWellColor: "#383838",
    alt: "Architect Band — men's geometric diamond band",
    title: "Architect Band",
    description:
      "Geometric links and pavé accents in polished gold — architectural rhythm and salon-scale brilliance for the modern gentleman.",
  },
  {
    id: "for-him-gadroon-emerald",
    category: "for-him",
    productCode: "BD-K-MN-004",
    image: "/Rings/men3.jpg",
    imageWellColor: "#141016",
    alt: "Gadroon Emerald — men's ribbed yellow-gold band with emerald-cut green gemstone",
    title: "Gadroon Emerald",
    description:
      "A gadrooned yellow-gold band crowned with an emerald-cut green gemstone — sculptural texture and deep colour for the statement hand.",
  },
  {
    id: "for-him-eternity-line",
    category: "for-him",
    productCode: "BD-K-MN-005",
    image: "/Rings/men4.jpg",
    imageWellColor: "#525054",
    alt: "Eternity Line — men's yellow-gold band with full round diamond circle",
    title: "Eternity Line",
    description:
      "Round brilliants set in continuous line around a polished yellow-gold band — uninterrupted fire and masculine proportion.",
  },
  {
    id: "for-him-princess-solitaire",
    category: "for-him",
    productCode: "BD-K-MN-006",
    image: "/Rings/men5.jpg",
    imageWellColor: "#0a0c11",
    alt: "Princess Solitaire — men's wide white-gold band with princess-cut diamond",
    title: "Princess Solitaire",
    description:
      "A substantial 18K white-gold band elevating a princess-cut brilliant in a four-prong setting — clean planes and singular salon light.",
  },
];
