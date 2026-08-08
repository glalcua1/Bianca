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

export type MetalVariantId = "yellow-gold" | "white-gold" | "rose-gold";

export type MetalVariant = {
  id: MetalVariantId;
  label: string;
  image: string;
  galleryImages?: string[];
};

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
  /** Alternate metal finishes — one catalogue card, switchable in salon overlay */
  metalVariants?: MetalVariant[];
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

/** True for salon film assets served from public/ */
export function isSalonFilmPath(src: string): boolean {
  return /\.(mov|mp4|webm)$/i.test(src);
}

export function atelierPieceMetalVariants(piece: AtelierPiece): MetalVariant[] {
  if (piece.metalVariants?.length) return piece.metalVariants;
  return [];
}

export function atelierPieceHasMetalVariants(piece: AtelierPiece): boolean {
  return (piece.metalVariants?.length ?? 0) > 1;
}

export function resolveAtelierMetalVariant(
  piece: AtelierPiece,
  metalVariantId?: MetalVariantId,
): MetalVariant | null {
  const variants = piece.metalVariants;
  if (!variants?.length) return null;
  return variants.find((variant) => variant.id === metalVariantId) ?? variants[0];
}

/** Primary image plus salon views for the active metal finish. */
export function atelierPieceViews(
  piece: AtelierPiece,
  metalVariantId?: MetalVariantId,
): string[] {
  if (piece.video) {
    const extra = piece.galleryImages ?? [];
    if (extra.length === 0) return [piece.video];
    return [piece.video, ...extra];
  }

  const metalVariant = resolveAtelierMetalVariant(piece, metalVariantId);
  if (metalVariant) {
    const gallery = metalVariant.galleryImages ?? [];
    if (gallery.length === 0) return [metalVariant.image];
    return [metalVariant.image, ...gallery];
  }

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
    image: "/Rings/bianca-diamonds-atelier-portrait-diamond-ring.jpg",
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
    id: "ear-blush-cushion-studs",
    category: "earrings",
    productCode: "BD-K-ER-034",
    image: "/Earrings/bianca-diamonds-ear-blush-cushion-studs.jpg",
    imageWellColor: "#cccccc",
    alt: "Blush Cushion Studs — cushion pink diamond stud earrings in rose gold",
    title: "Blush Cushion Studs",
    description:
      "Cushion pink diamonds in four-prong rose gold with scalloped screw backs — soft colour and warm metal for everyday radiance.",
  },
  {
    id: "ear-pink-radiant-huggie-drop",
    category: "earrings",
    productCode: "BD-K-ER-035",
    image: "/Earrings/bianca-diamonds-ear-pink-radiant-huggie-drop.jpg",
    imageWellColor: "#cccad0",
    alt: "Pink Radiant Huggie Drop — radiant pink diamond halo drops on pavé huggies",
    title: "Pink Radiant Huggie Drop",
    description:
      "Radiant pink centres in rose-gold prongs sit within white-diamond halos, suspended from pavé huggies — colour, contrast, and refined movement.",
  },
  {
    id: "ear-pink-pear-rosette-studs",
    category: "earrings",
    productCode: "BD-K-ER-036",
    image: "/Earrings/bianca-diamonds-ear-pink-pear-rosette-studs.jpg",
    imageWellColor: "#898889",
    alt: "Pink Pear Rosette Studs — oval diamond centres with pear pink petal halos in rose gold",
    title: "Pink Pear Rosette Studs",
    description:
      "Oval brilliants bloom within pear pink petals and a pavé scalloped border in rose gold — floral colour composed for the ear.",
  },
  {
    id: "ear-blush-pear-halo-drop",
    category: "earrings",
    productCode: "BD-K-ER-037",
    image: "/Earrings/bianca-diamonds-ear-blush-pear-halo-drop.jpg",
    imageWellColor: "#a09fa5",
    alt: "Blush Pear Halo Drop — pear pink diamond halo drops with diamond tops",
    title: "Blush Pear Halo Drop",
    description:
      "Pear pink centres in rose-gold prongs hang beneath diamond halo tops and a round brilliant link — elongated colour with leverback poise.",
  },
  {
    id: "ear-pink-floral-cluster-studs",
    category: "earrings",
    productCode: "BD-K-ER-038",
    image: "/Earrings/bianca-diamonds-ear-pink-floral-cluster-studs.jpg",
    imageWellColor: "#9d9d9d",
    alt: "Pink Floral Cluster Studs — round diamond centres with pear and round pink petals in rose gold",
    title: "Pink Floral Cluster Studs",
    description:
      "Round brilliant centres bloom within alternating pear and round pink petals in rose gold — starburst colour with layered fire.",
  },
  {
    id: "ear-blue-vine-drop",
    category: "earrings",
    productCode: "BD-K-ER-039",
    image: "/Earrings/bianca-diamonds-ear-blue-vine-drop.jpg",
    imageWellColor: "#c7ccd3",
    alt: "Blue Vine Drop — round and pear blue diamond halo earrings with vine links in rose gold",
    title: "Blue Vine Drop",
    description:
      "Round and pear blue centres in diamond halos connect through rose-gold vine links — botanical movement with icy colour.",
  },
  {
    id: "ear-blue-lattice-hoops",
    category: "earrings",
    productCode: "BD-K-ER-040",
    image: "/Earrings/bianca-diamonds-ear-blue-lattice-hoops.jpg",
    imageWellColor: "#ababab",
    alt: "Blue Lattice Hoops — princess blue and diamond geometric hoop earrings in white gold",
    title: "Blue Lattice Hoops",
    description:
      "Princess-cut blue stones and round brilliants form a geometric lattice across polished white-gold hoops — saturated colour with architectural sparkle.",
  },
  {
    id: "ear-blue-floral-chandelier",
    category: "earrings",
    productCode: "BD-K-ER-041",
    image: "/Earrings/bianca-diamonds-ear-blue-floral-chandelier.jpg",
    imageWellColor: "#adb3bc",
    alt: "Blue Floral Chandelier — blue diamond floral chandelier earrings in rose gold",
    title: "Blue Floral Chandelier",
    description:
      "Marquise floral studs release pavé fringe above radiant blue centres in marquise halos — rose-gold high jewellery with cascading light.",
  },
  {
    id: "ear-pink-pear-milgrain-drop",
    category: "earrings",
    productCode: "BD-K-ER-042",
    image: "/Earrings/bianca-diamonds-ear-pink-pear-milgrain-drop.jpg",
    imageWellColor: "#cfd1d5",
    alt: "Pink Pear Milgrain Drop — pear pink diamond halo drops with milgrain rose-gold rims",
    title: "Pink Pear Milgrain Drop",
    description:
      "Pear pink centres rimmed in milgrain rose gold hang beneath diamond cluster tops — two-tone refinement with romantic colour.",
  },
  {
    id: "ear-golden-pear-riviere",
    category: "earrings",
    productCode: "BD-K-ER-026",
    image: "/Earrings/bianca-diamonds-ear-golden-pear-riviere.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Golden Pear Rivière — graduated pear diamond drop earrings in yellow gold",
    title: "Golden Pear Rivière",
    description:
      "Five pear brilliants descend in graduated yellow-gold links — warm metal, elongated light, and fluid movement composed for evening.",
  },
  {
    id: "ear-diamond-huggie-hoops",
    category: "earrings",
    productCode: "BD-K-ER-027",
    image: "/Earrings/bianca-diamonds-ear-diamond-huggie-hoops.jpg",
    imageWellColor: "#d6d6d4",
    alt: "Diamond Huggie Hoops — round diamond huggie earrings",
    title: "Diamond Huggie Hoops",
    description:
      "Round brilliants trace the front of polished huggie hoops — compact everyday fire, available in yellow or white gold.",
    metalVariants: [
      {
        id: "yellow-gold",
        label: "Yellow Gold",
        image: "/Earrings/bianca-diamonds-ear-diamond-huggie-hoops.jpg",
      },
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Earrings/bianca-diamonds-ear-diamond-huggie-hoops-white-gold.jpg",
      },
    ],
  },
  {
    id: "ear-floral-pear-cascade",
    category: "earrings",
    productCode: "BD-K-ER-029",
    image: "/Earrings/bianca-diamonds-ear-floral-pear-cascade.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Floral Pear Cascade — floral pear and round diamond drop earrings in yellow gold",
    title: "Floral Pear Cascade",
    description:
      "Pear diamond petals crown alternating pear and round drops in yellow gold — botanical rhythm with gala-length movement.",
  },
  {
    id: "ear-yellow-pear-line",
    category: "earrings",
    productCode: "BD-K-ER-030",
    image: "/Earrings/bianca-diamonds-ear-yellow-pear-line.jpg",
    imageWellColor: "#d9d9d7",
    alt: "Yellow Pear Line — five-stone pear diamond drop earrings in yellow gold",
    title: "Yellow Pear Line",
    description:
      "Five pear brilliants align in a vertical yellow-gold line — clean links, soft elongation, and uninterrupted salon brilliance.",
  },
  {
    id: "ear-maison-gold-hoops",
    category: "earrings",
    productCode: "BD-K-ER-031",
    image: "/Earrings/bianca-diamonds-ear-maison-gold-hoops.jpg",
    imageWellColor: "#e8e8e6",
    alt: "Maison Gold Hoops — polished yellow gold huggie hoop earrings",
    title: "Maison Gold Hoops",
    description:
      "Thick polished yellow-gold hoops with a secure click closure — sculptural minimalism and warm everyday presence.",
  },
  {
    id: "ear-pink-sapphire-huggie-drop",
    category: "earrings",
    productCode: "BD-K-ER-032",
    image: "/Earrings/bianca-diamonds-ear-pink-sapphire-huggie-drop.jpg",
    imageWellColor: "#d6d6d4",
    alt: "Pink Sapphire Huggie Drop — diamond huggie earrings with pink sapphire drops in yellow gold",
    title: "Pink Sapphire Huggie Drop",
    description:
      "Pavé huggies suspend a round brilliant and a vivid pink sapphire drop in yellow gold — colour, contrast, and refined movement.",
  },
  {
    id: "ear-rose-gold-huggie-hoops",
    category: "earrings",
    productCode: "BD-K-ER-033",
    image: "/Earrings/bianca-diamonds-ear-rose-gold-huggie-hoops.jpg",
    imageWellColor: "#d4d2d0",
    alt: "Rose Gold Huggie Hoops — round diamond huggie earrings in rose gold",
    title: "Rose Gold Huggie Hoops",
    description:
      "Round brilliants trace the front of polished rose-gold huggies — romantic warmth with shared-prong sparkle at the ear.",
  },
  {
    id: "ear-oval-line-drop",
    category: "earrings",
    productCode: "BD-K-ER-005",
    image: "/Earrings/bianca-diamonds-ear-oval-line-drop.png",
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
    image: "/Earrings/bianca-diamonds-ear-graduated-oval-riviere.png",
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
    image: "/Earrings/bianca-diamonds-ear-ruby-emerald-trilogy-drop.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-ruby-emerald-duet-drop.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-sapphire-hoop-drop.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-ruby-flower-studs.jpg",
    imageWellColor: "#f0f0ed",
    alt: "Ruby Flower Studs — ruby petal and diamond centre floral earrings",
    title: "Ruby Flower Studs",
    description:
      "Pear-shaped ruby petals bloom around a round brilliant centre — floral studs with crisp white-gold prongs and rich crimson fire.",
  },
  {
    id: "ear-emerald-octagon-studs",
    category: "earrings",
    productCode: "BD-K-ER-012",
    image: "/Earrings/bianca-diamonds-ear-emerald-octagon-studs.jpg",
    imageWellColor: "#d0d2d4",
    alt: "Emerald Octagon Studs — octagonal emerald and diamond halo earrings",
    title: "Emerald Octagon Studs",
    description:
      "Octagonal emerald centres sit within round-brilliant halos in white gold — architectural studs with deep green presence.",
  },
  {
    id: "ear-pear-halo-drop",
    category: "earrings",
    productCode: "BD-K-ER-013",
    image: "/Earrings/bianca-diamonds-ear-pear-halo-drop.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Pear Halo Drop — emerald-cut and pear diamond halo earrings",
    title: "Pear Halo Drop",
    description:
      "Emerald-cut diamond tops release pear halo drops — classic bridal geometry in yellow or white gold.",
    metalVariants: [
      {
        id: "yellow-gold",
        label: "Yellow Gold",
        image: "/Earrings/bianca-diamonds-ear-pear-halo-drop.jpg",
      },
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Earrings/bianca-diamonds-ear-pear-halo-drop-white-gold.jpg",
      },
    ],
  },
  {
    id: "ear-round-solitaire-studs",
    category: "earrings",
    productCode: "BD-K-ER-015",
    image: "/Earrings/bianca-diamonds-ear-round-solitaire-studs.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-princess-solitaire-studs.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-oval-solitaire-studs.jpg",
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
    image: "/Earrings/bianca-diamonds-ear-deco-link-drop.jpg",
    imageWellColor: "#b5b5b8",
    alt: "Deco Link Drop — emerald-cut diamond and pavé loop drop earrings",
    title: "Deco Link Drop",
    description:
      "Emerald-cut diamond tops suspend pavé-set interlocking loops in white gold — Art Deco rhythm with refined movement and mirror-bright finish.",
  },
  {
    id: "ear-marquise-laurel-cascade",
    category: "earrings",
    productCode: "BD-K-ER-019",
    image: "/Earrings/bianca-diamonds-ear-marquise-laurel-cascade.jpg",
    imageWellColor: "#dfe2e3",
    alt: "Marquise Laurel Cascade — marquise and pear diamond statement earrings in white gold",
    title: "Marquise Laurel Cascade",
    description:
      "Marquise and pear brilliants branch into an elongated laurel silhouette in white gold — airy, sculptural, and composed for gala light.",
  },
  {
    id: "ear-round-line-drop",
    category: "earrings",
    productCode: "BD-K-ER-020",
    image: "/Earrings/bianca-diamonds-ear-round-line-drop.jpg",
    imageWellColor: "#e6e8ea",
    alt: "Round Line Drop — straight round diamond drop earrings in white gold",
    title: "Round Line Drop",
    description:
      "Round brilliants form a clean vertical line in white gold — modern restraint with uninterrupted fire and a quietly dramatic drop.",
  },
  {
    id: "ear-sapphire-octagon-studs",
    category: "earrings",
    productCode: "BD-K-ER-023",
    image: "/Earrings/bianca-diamonds-ear-sapphire-octagon-studs.jpg",
    imageWellColor: "#d3d3d4",
    alt: "Sapphire Octagon Studs — blue sapphire and diamond halo earrings in white gold",
    title: "Sapphire Octagon Studs",
    description:
      "Octagonal blue sapphires sit within diamond halos in polished white gold — saturated colour and architectural clarity for the ear.",
  },
  {
    id: "ear-bypass-solitaire-studs",
    category: "earrings",
    productCode: "BD-K-ER-024",
    image: "/Earrings/bianca-diamonds-ear-bypass-solitaire-studs.jpg",
    imageWellColor: "#dedfe2",
    alt: "Bypass Solitaire Studs — round diamond bypass earrings in yellow gold",
    title: "Bypass Solitaire Studs",
    description:
      "Round brilliants nest inside crossing yellow-gold ribbons, one pavé-set for added fire — a sculptural everyday stud with motion.",
  },
  {
    id: "ear-emerald-openwork-drop",
    category: "earrings",
    productCode: "BD-K-ER-025",
    image: "/Earrings/bianca-diamonds-ear-emerald-openwork-drop.jpg",
    imageWellColor: "#d9dcdd",
    alt: "Emerald Openwork Drop — pear emerald and diamond openwork earrings in white gold",
    title: "Emerald Openwork Drop",
    description:
      "Pear emerald centres float within diamond halos and polished openwork frames — luminous white-gold drops with regal green depth.",
  },
  {
    id: "ring-blush-pave-solitaire",
    category: "rings",
    productCode: "BD-G-RG-058",
    image: "/Rings/bianca-diamonds-ring-blush-pave-solitaire.jpg",
    imageWellColor: "#cccdd1",
    alt: "Blush Pavé Solitaire — round pink diamond with pavé shoulders in white gold",
    title: "Blush Pavé Solitaire",
    description:
      "A round pink brilliant rises in white-gold prongs above pavé shoulders — soft colour and continuous fire for the modern hand.",
  },
  {
    id: "ring-blush-riviere-eternity",
    category: "rings",
    productCode: "BD-G-RG-059",
    image: "/Rings/bianca-diamonds-ring-blush-riviere-eternity.jpg",
    imageWellColor: "#cacbd0",
    alt: "Blush Rivière Eternity — pink and colourless diamond eternity band in white gold",
    title: "Blush Rivière Eternity",
    description:
      "Pink and colourless round brilliants alternate in a shared-prong white-gold eternity — a delicate rivière of colour and light.",
  },
  {
    id: "ring-blue-pear-pave",
    category: "rings",
    productCode: "BD-G-RG-060",
    image: "/Rings/bianca-diamonds-ring-blue-pear-pave.jpg",
    imageWellColor: "#c2c5cc",
    alt: "Blue Pear Pavé — pear blue diamond ring with pavé shoulders in white gold",
    title: "Blue Pear Pavé",
    description:
      "A pear-cut blue diamond in three-prong white gold, the shoulders pavé-set with round brilliants — rare colour with elongated poise.",
  },
  {
    id: "ring-blue-emerald-horizon",
    category: "rings",
    productCode: "BD-G-RG-061",
    image: "/Rings/bianca-diamonds-ring-blue-emerald-horizon.jpg",
    imageWellColor: "#aaadb5",
    alt: "Blue Emerald Horizon — east-west emerald-cut blue diamond ring with double pavé borders",
    title: "Blue Emerald Horizon",
    description:
      "An emerald-cut blue diamond set east-west between twin pavé borders on a wide white-gold band — architectural colour and quiet strength.",
  },
  {
    id: "ring-blue-emerald-trilogy",
    category: "rings",
    productCode: "BD-G-RG-062",
    image: "/Rings/bianca-diamonds-ring-blue-emerald-trilogy.jpg",
    imageWellColor: "#b1b0b5",
    alt: "Blue Emerald Trilogy — emerald-cut blue diamond flanked by colourless emerald-cut diamonds",
    title: "Blue Emerald Trilogy",
    description:
      "A vivid emerald-cut blue centre flanked by colourless emerald-cut brilliants on a polished white-gold band — three-stone colour and fire.",
  },
  {
    id: "ring-blue-emerald-solitaire",
    category: "rings",
    productCode: "BD-G-RG-063",
    image: "/Rings/bianca-diamonds-ring-blue-emerald-solitaire.jpg",
    imageWellColor: "#a3a3a3",
    alt: "Blue Emerald Solitaire — emerald-cut light blue diamond solitaire in white gold",
    title: "Blue Emerald Solitaire",
    description:
      "An icy emerald-cut blue diamond in double-claw white gold with milgrain refinement — pure colour and classic salon proportion.",
  },
  {
    id: "ring-blue-radiant-solitaire",
    category: "rings",
    productCode: "BD-G-RG-064",
    image: "/Rings/bianca-diamonds-ring-blue-radiant-solitaire.jpg",
    imageWellColor: "#9d9d9d",
    alt: "Blue Radiant Solitaire — radiant-cut vivid blue diamond solitaire in white gold",
    title: "Blue Radiant Solitaire",
    description:
      "A radiant-cut vivid blue diamond in four-prong white gold on a polished comfort band — concentrated colour with crushed-ice fire.",
  },
  {
    id: "ring-blue-oval-solitaire",
    category: "rings",
    productCode: "BD-G-RG-065",
    image: "/Rings/bianca-diamonds-ring-blue-oval-solitaire.jpg",
    imageWellColor: "#a5a3a3",
    alt: "Blue Oval Solitaire — oval-cut light blue diamond solitaire in white gold",
    title: "Blue Oval Solitaire",
    description:
      "An oval-cut light blue diamond in four-prong white gold — elongated brilliance and serene colour for everyday and occasion.",
  },
  {
    id: "ring-blue-cushion-double-halo",
    category: "rings",
    productCode: "BD-G-RG-073",
    image: "/Rings/bianca-diamonds-ring-blue-cushion-double-halo.jpg",
    imageWellColor: "#9a9a9c",
    alt: "Blue Cushion Diamond Double Halo — cushion blue diamond with white and pink diamond halos in rose gold",
    title: "Blue Cushion Diamond Double Halo",
    description:
      "A cushion-cut blue diamond framed by a white-diamond inner halo and a pink-diamond outer rim on a rose-gold pavé shank — Blue Star colour in romantic two-tone light.",
  },
  {
    id: "ring-blue-marquise-solitaire",
    category: "rings",
    productCode: "BD-G-RG-074",
    image: "/Rings/bianca-diamonds-ring-blue-marquise-solitaire.jpg",
    imageWellColor: "#a0a0a0",
    alt: "Blue Marquise Diamond Solitaire — marquise blue diamond solitaire in white gold",
    title: "Blue Marquise Diamond Solitaire",
    description:
      "A marquise-cut blue diamond in a six-prong white-gold setting with protective V tips — elongated Blue Star fire on a polished comfort band.",
  },
  {
    id: "ring-pink-marquise-baguette",
    category: "rings",
    productCode: "BD-G-RG-066",
    image: "/Rings/bianca-diamonds-ring-pink-marquise-baguette.jpg",
    imageWellColor: "#a09fa4",
    alt: "Pink Marquise Baguette — marquise pink diamond with tapered baguette side stones in white gold",
    title: "Pink Marquise Baguette",
    description:
      "A marquise pink diamond flanked by tapered baguette brilliants in white gold — elongated colour with Art Deco clarity.",
  },
  {
    id: "ring-blush-oval-halo",
    category: "rings",
    productCode: "BD-G-RG-067",
    image: "/Rings/bianca-diamonds-ring-blush-oval-halo.jpg",
    imageWellColor: "#9d9c9c",
    alt: "Blush Oval Halo — oval pink diamond halo ring with split pavé shank in rose gold",
    title: "Blush Oval Halo",
    description:
      "An oval pink centre in a white-diamond halo on a rose-gold split pavé shank — romantic colour with two-tone salon refinement.",
  },
  {
    id: "ring-pink-cushion-halo",
    category: "rings",
    productCode: "BD-G-RG-068",
    image: "/Rings/bianca-diamonds-ring-pink-cushion-halo.jpg",
    imageWellColor: "#d8d8da",
    alt: "Pink Cushion Halo — cushion pink diamond halo ring with pavé shoulders in white gold",
    title: "Pink Cushion Halo",
    description:
      "A cushion pink diamond crowned in a round-brilliant halo, the white-gold shoulders pavé-set to the band — soft colour and classic fire.",
  },
  {
    id: "ring-blush-oval-solitaire",
    category: "rings",
    productCode: "BD-G-RG-069",
    image: "/Rings/bianca-diamonds-ring-blush-oval-solitaire.jpg",
    imageWellColor: "#a1a1a1",
    alt: "Blush Oval Solitaire — oval pink diamond solitaire in rose gold",
    title: "Blush Oval Solitaire",
    description:
      "An oval pink brilliant in four-prong rose gold on a polished comfort band — warm metal and delicate colour in quiet balance.",
  },
  {
    id: "ring-pink-radiant-solitaire",
    category: "rings",
    productCode: "BD-G-RG-070",
    image: "/Rings/bianca-diamonds-ring-pink-radiant-solitaire.jpg",
    imageWellColor: "#d5d5d8",
    alt: "Pink Radiant Solitaire — radiant-cut pink diamond solitaire",
    title: "Pink Radiant Solitaire",
    description:
      "A radiant-cut pink diamond in four-prong solitaire poise — crushed-ice fire in white or rose gold.",
    metalVariants: [
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Rings/bianca-diamonds-ring-pink-radiant-solitaire.jpg",
      },
      {
        id: "rose-gold",
        label: "Rose Gold",
        image: "/Rings/bianca-diamonds-ring-pink-radiant-solitaire-rose-gold.jpg",
      },
    ],
  },
  {
    id: "ring-pink-heart-bezel",
    category: "rings",
    productCode: "BD-G-RG-071",
    image: "/Rings/bianca-diamonds-ring-pink-heart-bezel.jpg",
    imageWellColor: "#d7d7d9",
    alt: "Pink Heart Bezel — heart-cut pink diamond bezel ring in rose gold",
    title: "Pink Heart Bezel",
    description:
      "A heart-cut pink diamond held in a full rose-gold bezel on a slender polished band — romantic colour with modern restraint.",
  },
  {
    id: "ring-pink-marquise-halo",
    category: "rings",
    productCode: "BD-G-RG-072",
    image: "/Rings/bianca-diamonds-ring-pink-marquise-halo.jpg",
    imageWellColor: "#cbcacf",
    alt: "Pink Marquise Halo — marquise pink diamond halo ring in white gold",
    title: "Pink Marquise Halo",
    description:
      "A marquise pink diamond framed in a round-brilliant halo on polished white gold — elongated colour with luminous bridal presence.",
  },
  {
    id: "ring-wave-arch-pave",
    category: "rings",
    productCode: "BD-G-RG-055",
    image: "/Rings/bianca-diamonds-ring-wave-arch-pave.jpg",
    imageWellColor: "#d8d8d6",
    alt: "Wave Arch Pavé — round diamond ring with pavé wave arch",
    title: "Wave Arch Pavé",
    description:
      "A round brilliant rises beneath a pavé-set wave arch — sculptural negative space in yellow, white, or rose gold.",
    metalVariants: [
      {
        id: "yellow-gold",
        label: "Yellow Gold",
        image: "/Rings/bianca-diamonds-ring-wave-arch-pave.jpg",
      },
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Rings/bianca-diamonds-ring-wave-arch-pave-white-gold.jpg",
      },
      {
        id: "rose-gold",
        label: "Rose Gold",
        image: "/Rings/bianca-diamonds-ring-wave-arch-pave-rose-gold.jpg",
      },
    ],
  },
  {
    id: "ring-marquise-pear-collar",
    category: "rings",
    productCode: "BD-G-RG-056",
    image: "/Rings/bianca-diamonds-ring-marquise-pear-collar.jpg",
    imageWellColor: "#d8c8b0",
    alt: "Marquise Pear Collar — wide marquise and pear diamond band in yellow gold",
    title: "Marquise Pear Collar",
    description:
      "Marquise, pear, and round brilliants cluster across a wide yellow-gold band — collar-scale brilliance with organic rhythm.",
  },
  {
    id: "ring-canary-trilogy-maison",
    category: "rings",
    productCode: "BD-G-RG-057",
    image: "/Rings/bianca-diamonds-ring-canary-trilogy-maison.jpg",
    imageWellColor: "#d8d0c0",
    alt: "Canary Trilogy Maison — canary emerald-cut trilogy ring in white gold",
    title: "Canary Trilogy Maison",
    description:
      "A canary emerald-cut centre flanked by colourless emerald-cut brilliants on a polished white-gold band — three-stone colour and fire.",
  },
  {
    id: "ring-solitaire-bridal-duo",
    category: "rings",
    productCode: "BD-G-RG-048",
    image: "/Rings/bianca-diamonds-ring-solitaire-bridal-duo.jpg",
    imageWellColor: "#c8b8a8",
    alt: "Solitaire Bridal Duo — round diamond solitaire and eternity band",
    title: "Solitaire Bridal Duo",
    description:
      "A round brilliant solitaire beside a shared-prong eternity band — proposal-ready brilliance in yellow or white gold.",
    metalVariants: [
      {
        id: "yellow-gold",
        label: "Yellow Gold",
        image: "/Rings/bianca-diamonds-ring-solitaire-bridal-duo.jpg",
        galleryImages: ["/Rings/bianca-diamonds-ring-solitaire-bridal-duo-white-gold-2.jpg"],
      },
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Rings/bianca-diamonds-ring-solitaire-bridal-duo-white-gold-3.jpg",
        galleryImages: ["/Rings/bianca-diamonds-ring-solitaire-bridal-duo-white-gold.jpg"],
      },
    ],
  },
  {
    id: "ring-oval-maison-bridal",
    category: "rings",
    productCode: "BD-G-RG-050",
    image: "/Rings/bianca-diamonds-ring-oval-maison-bridal.jpg",
    imageWellColor: "#f8e8d8",
    alt: "Oval Maison Bridal — oval diamond solitaire and wide band in yellow gold",
    title: "Oval Maison Bridal",
    galleryImages: ["/Rings/bianca-diamonds-ring-oval-maison-bridal-gallery.jpg"],
    description:
      "An oval brilliant in four-prong yellow gold paired with a polished wide band — architectural proportion and warm salon light for everyday and occasion.",
  },
  {
    id: "ring-sapphire-riviere-eternity",
    category: "rings",
    productCode: "BD-G-RG-051",
    image: "/Rings/Ring24.mov",
    video: "/Rings/Ring24.mov",
    imageWellColor: "#a89878",
    alt: "Sapphire Rivière Eternity — princess sapphire and diamond eternity band in yellow gold",
    title: "Sapphire Rivière Eternity",
    galleryImages: ["/Rings/bianca-diamonds-ring-sapphire-riviere-eternity-gallery.jpg"],
    gemstoneSpec: "Princess sapphire and diamond eternity",
    goldSpec: "18K yellow gold · milgrain channel",
    salonPriceInr: 260_000,
    description:
      "Princess sapphires alternate with round brilliants in a milgrain channel eternity — hand-engraved yellow gold and regal colour captured in salon motion.",
  },
  {
    id: "ring-bypass-baguette-duo",
    category: "rings",
    productCode: "BD-G-RG-052",
    image: "/Rings/bianca-diamonds-ring-bypass-baguette-duo.jpg",
    imageWellColor: "#d8b8a8",
    alt: "Bypass Baguette Duo — twin round brilliant bypass ring with baguette channels in yellow gold",
    title: "Bypass Baguette Duo",
    description:
      "Twin round brilliants meet in bypass poise, each shoulder channel-set with baguette diamonds in yellow and white gold — sculptural asymmetry with continuous salon light.",
  },
  {
    id: "ring-toi-et-moi-eclat",
    category: "rings",
    productCode: "BD-G-RG-053",
    image: "/Rings/bianca-diamonds-ring-toi-et-moi-eclat.jpg",
    imageWellColor: "#d8c8b8",
    alt: "Toi et Moi Éclat — emerald-cut and round brilliant toi et moi ring in yellow gold",
    title: "Toi et Moi Éclat",
    description:
      "An emerald-cut brilliant and a round brilliant share one yellow-gold band in romantic toi et moi poise — two silhouettes, one assured salon gesture.",
  },
  {
    id: "ring-sapphire-pear-halo",
    category: "rings",
    productCode: "BD-G-RG-054",
    image: "/Rings/Ring23.MP4",
    video: "/Rings/Ring23.MP4",
    imageWellColor: "#a89878",
    alt: "Sapphire Pear Halo — pear sapphire and diamond halo ring in yellow gold",
    title: "Sapphire Pear Halo",
    galleryImages: ["/Rings/bianca-diamonds-ring-sapphire-pear-halo-gallery.jpg"],
    gemstoneSpec: "Pear sapphire centre with diamond halo",
    goldSpec: "18K yellow gold · milgrain pavé shank",
    description:
      "A pear sapphire crowned in a round-brilliant halo on a split pavé yellow-gold shank — regal colour and milgrain refinement captured in salon motion.",
  },
  {
    id: "ring-atelier-portrait",
    category: "rings",
    productCode: "BD-K-RG-003",
    image: "/Rings/bianca-diamonds-atelier-portrait-diamond-ring.jpg",
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
    image: "/Rings/bianca-diamonds-ring-halo-split-lumiere.png",
    imageWellColor: "#e6d6c3",
    alt: "Halo Split Lumière — round diamond halo ring with split pavé shank",
    title: "Halo Split Lumière",
    description:
      "A round brilliant crowned in a diamond halo on an open lattice basket, the split white-gold shank pavé-set to the shoulder — classic fire with architectural depth for the Kira line.",
  },
  {
    id: "ring-geometric-pear",
    category: "rings",
    productCode: "BD-G-RG-008",
    image: "/Rings/bianca-diamonds-ring-geometric-pear.jpg",
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
    image: "/Rings/bianca-diamonds-ring-emerald-starburst.jpg",
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
    image: "/Rings/bianca-diamonds-ring-pave-shoulder-classique.jpg",
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
    image: "/Rings/bianca-diamonds-ring-ruby-radiance.jpg",
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
    image: "/Rings/bianca-diamonds-ring-geometric-princess.jpg",
    imageWellColor: "#d9cdbd",
    alt: "Geometric Princess — princess-cut diamond ring in yellow gold",
    title: "Geometric Princess",
    description:
      "A princess-cut centre stone nested in a bevelled octagonal yellow-gold frame — crisp geometry and confident minimalism composed for everyday brilliance.",
  },
  {
    id: "ring-tri-tone-wave",
    category: "rings",
    productCode: "BD-G-RG-011",
    image: "/Rings/bianca-diamonds-ring-tri-tone-wave.jpg",
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
    image: "/Rings/bianca-diamonds-ring-sapphire-sovereign.jpg",
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
    image: "/Rings/bianca-diamonds-ring-knot-basket.jpg",
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
    image: "/Rings/bianca-diamonds-ring-pink-oval-halo.jpg",
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
    image: "/Rings/bianca-diamonds-ring-pave-split-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-emerald-petal.jpg",
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
    image: "/Rings/bianca-diamonds-ring-bypass-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-marquise-pave-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-cabochon-emerald.jpg",
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
    image: "/Rings/bianca-diamonds-ring-split-halo-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-sapphire-marquise-halo.jpg",
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
    image: "/Rings/bianca-diamonds-ring-emerald-sunburst.jpg",
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
    image: "/Rings/bianca-diamonds-ring-princess-halo-eclat.jpg",
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
    image: "/Rings/bianca-diamonds-ring-floral-arc.jpg",
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
    image: "/Rings/bianca-diamonds-ring-ruby-floral-sunburst.jpg",
    imageWellColor: "#ded1c4",
    alt: "Ruby Floral Sunburst — oval ruby cluster ring with pear and marquise diamonds in white gold",
    title: "Ruby Floral Sunburst",
    description:
      "An oval ruby anchors a tiered sunburst of pear and marquise brilliants on polished white gold — floral volume and red-carpet scale composed for evening celebration.",
  },
  {
    id: "ring-heart-oval-toi-et-moi",
    category: "rings",
    productCode: "BD-G-RG-031",
    image: "/Rings/bianca-diamonds-ring-heart-oval-toi-et-moi.jpg",
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
    image: "/Rings/bianca-diamonds-ring-emerald-halo-riviere.jpg",
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
    image: "/Rings/bianca-diamonds-ring-oval-riviere-maison.jpg",
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
    image: "/Rings/bianca-diamonds-ring-bypass-eclat.jpg",
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
    image: "/Rings/bianca-diamonds-ring-emerald-trilogy-halo.jpg",
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
    image: "/Rings/bianca-diamonds-ring-marquise-sunburst.jpg",
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
    image: "/Rings/bianca-diamonds-ring-red-emerald-split.jpg",
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
    image: "/Rings/bianca-diamonds-ring-triple-strand-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-marquise-halo-maison.jpg",
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
    image: "/Rings/bianca-diamonds-ring-ruby-pear-marquise-burst.jpg",
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
    image: "/Rings/bianca-diamonds-ring-rose-solitaire-scroll.jpg",
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
    image: "/Rings/bianca-diamonds-sapphire-maison-ring.jpg",
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
    image: "/Rings/bianca-diamonds-ring-eternity-lumiere.jpg",
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
    image: "/Rings/bianca-diamonds-ring-oval-eternity.jpg",
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
    image: "/Rings/bianca-diamonds-ring-golden-circle.jpg",
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
    image: "/Rings/bianca-diamonds-ring-baguette-solitaire.jpg",
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
    image: "/Rings/bianca-diamonds-ring-baguette-line.jpg",
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
    id: "brace-tennis-brilliant",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-003",
    image: "/Bracelet/bianca-diamonds-brace-tennis-brilliant.png",
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
    image: "/Bracelet/bianca-diamonds-brace-tennis-marquise.png",
    imageWellColor: "#05060b",
    alt: "Tennis Marquise — marquise diamond tennis bracelet",
    title: "Tennis Marquise",
    description:
      "Marquise brilliants set edge to edge in a continuous line — fluid fire around the wrist, composed to stack with the house's bangles and cuffs.",
  },
  {
    id: "brace-princesse-rosee",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-K-BR-008",
    image: "/Bracelet/bianca-diamonds-brace-princesse-rosee.png",
    imageWellColor: "#e4d3bc",
    alt: "Rose Princess — princess-cut diamond tennis bracelet in rose gold",
    title: "Rose Princess",
    description:
      "Princess-cut brilliants set edge to edge in warm rose gold — a softer tennis silhouette with the house's signature precision.",
  },
  {
    id: "brace-halo-emeraude-or",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-013",
    image: "/Bracelet/bianca-diamonds-brace-halo-emeraude-or.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-jardin-emeraude.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-halo-emeraude-maison.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-rivage-emeraude.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-floreal-emeraude.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-etoile-emeraude.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-art-deco-emeraude.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-ligne-halo-emeraude.jpg",
    imageWellColor: "#e1d8ce",
    alt: "Emerald Halo Line — round emerald and diamond halo link bracelet",
    title: "Emerald Halo Line",
    description:
      "Round emeralds crowned in diamond halos, linked in polished yellow gold — fluid salon elegance with secure box-clasp refinement.",
  },
  {
    id: "brace-sapphire-halo-bloom",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-K-BR-026",
    image: "/Bracelet/bianca-diamonds-brace-sapphire-halo-bloom.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-ruby-marquise-tennis.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-sapphire-five-row-cuff.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-ruby-triple-row.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-ruby-marquise-link.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-pear-ruby-three-row.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-ruby-emerald-cut-flex.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-sapphire-art-deco-line.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-emerald-column-bangle.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-grand-emerald-bangle.jpg",
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
    image: "/Bracelet/bianca-diamonds-brace-rose-woven-line.jpg",
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
    image: "/necklace/bianca-diamonds-neck-lumiere-cascade.png",
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
    image: "/necklace/bianca-diamonds-neck-riviere-nocturne.png",
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
    image: "/necklace/bianca-diamonds-neck-celestial-drop.png",
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
    image: "/necklace/bianca-diamonds-neck-atelier-classique.png",
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
    image: "/necklace/bianca-diamonds-neck-grace-eternelle.png",
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
    image: "/necklace/bianca-diamonds-neck-maison-rubis.png",
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
    image: "/necklace/bianca-diamonds-neck-jardin-serein.png",
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
    image: "/necklace/bianca-diamonds-neck-aurora-plume.png",
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
    image: "/necklace/bianca-diamonds-neck-tennis-classique.png",
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
    image: "/necklace/bianca-diamonds-neck-frange-poire.png",
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
    image: "/necklace/bianca-diamonds-neck-double-fil-or.png",
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
    image: "/necklace/bianca-diamonds-neck-riviere-ovale.png",
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
    image: "/necklace/bianca-diamonds-neck-lariat-etoile.png",
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
    image: "/necklace/bianca-diamonds-neck-double-rangee.png",
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
    image: "/necklace/bianca-diamonds-neck-maillon-eclat.png",
    imageWellColor: "#020202",
    alt: "Luminous Link — halo link station necklace with drop",
    title: "Luminous Link",
    description:
      "Pavé halo links trace the chain, centred on a graduated drop of round brilliants — station-set radiance with a softly articulated silhouette.",
  },
  {
    id: "pend-blue-star-pear-halo",
    category: "pendants",
    productCode: "BD-K-PD-001",
    image: "/Pendant/bianca-diamonds-pend-blue-star-pear-halo.jpg",
    imageWellColor: "#7a7a7a",
    alt: "Blue Star Pear Diamond Halo — pear blue diamond pendant with white diamond halo on yellow gold",
    title: "Blue Star Pear Diamond Halo",
    description:
      "A pear-cut blue diamond in a pavé halo of white diamonds on yellow gold — suspended from a beaded cable chain as a single point of Blue Star light.",
  },
  {
    id: "pend-canary-pear-halo",
    category: "pendants",
    productCode: "BD-K-PD-002",
    image: "/Pendant/bianca-diamonds-pend-canary-pear-halo.jpg",
    imageWellColor: "#8a8a8a",
    alt: "Canary Pear Diamond Halo — yellow diamond pear pendant with white diamond halo on white gold",
    title: "Canary Pear Diamond Halo",
    description:
      "A pear-cut canary diamond framed in a white diamond halo with a pavé diamond bail — composed in white gold for quiet radiance at the collarbone.",
  },
  {
    id: "pend-soleil-pear-halo",
    category: "pendants",
    productCode: "BD-K-PD-003",
    image: "/Pendant/bianca-diamonds-pend-soleil-pear-halo.jpg",
    imageWellColor: "#8f8f8f",
    alt: "Soleil Pear Diamond Halo — yellow diamond pear pendant with white diamond halo on yellow gold",
    title: "Soleil Pear Diamond Halo",
    description:
      "A pear-cut fancy yellow diamond in a pavé diamond halo on warm yellow gold — a luminous teardrop with a diamond-set bail on a fine cable chain.",
  },
  {
    id: "pend-classic-round-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-004",
    image: "/Pendant/bianca-diamonds-pend-classic-round-solitaire.jpg",
    imageWellColor: "#858585",
    alt: "Classic Round Diamond Solitaire — round brilliant diamond pendant on yellow gold chain",
    title: "Classic Round Diamond Solitaire",
    description:
      "A round brilliant diamond held in a six-prong yellow-gold setting — enduring simplicity, distilled to a single certified point of light.",
  },
  {
    id: "pend-canary-pear-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-005",
    image: "/Pendant/bianca-diamonds-pend-canary-pear-solitaire.jpg",
    imageWellColor: "#9a9a9a",
    alt: "Canary Pear Diamond Solitaire — yellow diamond pear pendant with diamond accent bail on white gold",
    title: "Canary Pear Diamond Solitaire",
    description:
      "A pear-cut canary diamond in a clean white-gold prong setting, crowned by a round accent diamond — colour without excess.",
  },
  {
    id: "pend-emerald-halo-milgrain",
    category: "pendants",
    productCode: "BD-K-PD-006",
    image: "/Pendant/bianca-diamonds-pend-emerald-halo-milgrain.jpg",
    imageWellColor: "#8c8c8c",
    alt: "Emerald-Cut Diamond Halo Milgrain — emerald-cut diamond pendant with pavé halo on yellow gold",
    title: "Emerald-Cut Diamond Halo Milgrain",
    description:
      "An emerald-cut diamond encircled by a milgrain pavé diamond halo in yellow gold — architectural geometry with a softly articulated profile.",
  },
  {
    id: "pend-canary-oval-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-007",
    image: "/Pendant/bianca-diamonds-pend-canary-oval-solitaire.jpg",
    imageWellColor: "#878787",
    alt: "Canary Oval Diamond Solitaire — oval yellow diamond pendant on white gold chain",
    title: "Canary Oval Diamond Solitaire",
    description:
      "An oval fancy yellow diamond in a four-prong white-gold basket — elongated brilliance on a delicate cable chain.",
  },
  {
    id: "pend-marquise-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-008",
    image: "/Pendant/bianca-diamonds-pend-marquise-solitaire.jpg",
    imageWellColor: "#7e7e7e",
    alt: "Marquise Diamond Solitaire — marquise diamond pendant on yellow gold chain",
    title: "Marquise Diamond Solitaire",
    description:
      "A marquise-cut diamond in a protective V-prong yellow-gold setting — elongated fire composed for the décolleté.",
  },
  {
    id: "pend-blue-star-radiant",
    category: "pendants",
    productCode: "BD-K-PD-009",
    image: "/Pendant/bianca-diamonds-pend-blue-star-radiant.jpg",
    imageWellColor: "#7a7a7a",
    alt: "Blue Star Radiant Diamond — radiant blue diamond pendant on white gold beaded chain",
    title: "Blue Star Radiant Diamond",
    description:
      "A radiant-cut blue diamond in a four-prong white-gold basket on a beaded cable chain — Blue Star depth, held with modern restraint.",
  },
  {
    id: "pend-blue-star-pear-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-010",
    image: "/Pendant/bianca-diamonds-pend-blue-star-pear-solitaire.jpg",
    imageWellColor: "#9a9a9a",
    alt: "Blue Star Pear Diamond Solitaire — pear blue diamond pendant on white gold chain",
    title: "Blue Star Pear Diamond Solitaire",
    description:
      "A pear-cut blue diamond in a three-prong white-gold setting with a protective V tip — elongated Blue Star colour on a fine cable chain.",
  },
  {
    id: "pend-blue-star-octagon-lattice",
    category: "pendants",
    productCode: "BD-K-PD-011",
    image: "/Pendant/bianca-diamonds-blue-star-octagon-lattice-pendant.jpg",
    imageWellColor: "#8e8e8e",
    alt: "Blue Star Octagon Diamond Lattice — square blue diamond in rose-gold geometric lattice pendant",
    title: "Blue Star Octagon Diamond Lattice",
    description:
      "A square blue diamond held in an open rose-gold octagon lattice with diamond nodes — architectural Blue Star geometry on a paperclip chain.",
  },
  {
    id: "pend-toi-et-moi-marquise",
    category: "pendants",
    productCode: "BD-K-PD-012",
    image: "/Pendant/bianca-diamonds-pend-toi-et-moi-marquise.jpg",
    imageWellColor: "#f0f0f0",
    alt: "Toi et Moi Marquise Diamonds — pink and yellow marquise diamond bypass pendant",
    title: "Toi et Moi Marquise Diamonds",
    description:
      "Pink and yellow marquise diamonds in a two-tone bypass — pavé diamonds bridge the curve for a modern toi-et-moi silhouette.",
  },
  {
    id: "pend-pink-cushion-double-halo",
    category: "pendants",
    productCode: "BD-K-PD-013",
    image: "/Pendant/bianca-diamonds-pend-pink-cushion-double-halo.jpg",
    imageWellColor: "#c8c8c8",
    alt: "Pink Cushion Diamond Double Halo — cushion pink diamond with yellow and white diamond halos",
    title: "Pink Cushion Diamond Double Halo",
    description:
      "A cushion-cut pink diamond framed by a yellow diamond inner halo and a white diamond outer rim — multi-tone radiance in rose, yellow, and white gold.",
  },
  {
    id: "pend-pink-marquise-solitaire",
    category: "pendants",
    productCode: "BD-K-PD-014",
    image: "/Pendant/bianca-diamonds-pend-pink-marquise-solitaire.jpg",
    imageWellColor: "#9c9c9c",
    alt: "Pink Marquise Diamond Solitaire — marquise pink diamond pendant on rose gold chain",
    title: "Pink Marquise Diamond Solitaire",
    description:
      "A marquise pink diamond in a six-prong rose-gold setting with protective V tips — elongated colour, distilled to a single point of diamond light.",
  },
  {
    id: "pend-blue-star-pear-pave-bail",
    category: "pendants",
    productCode: "BD-K-PD-015",
    image: "/Pendant/bianca-diamonds-pend-blue-star-pear-pave-bail.jpg",
    imageWellColor: "#9a9a9a",
    alt: "Blue Star Pear Diamond Pavé Bail — pear blue diamond pendant with pavé bail on white gold",
    title: "Blue Star Pear Diamond Pavé Bail",
    description:
      "A pear-cut blue diamond crowned by a pavé diamond bail in white gold — Blue Star brilliance with a quietly articulated collar of light.",
  },
  {
    id: "pend-blue-star-starburst",
    category: "pendants",
    productCode: "BD-K-PD-016",
    image: "/Pendant/bianca-diamonds-pend-blue-star-starburst.jpg",
    imageWellColor: "#b0b0b0",
    alt: "Blue Star Diamond Starburst — blue, pink, and white diamond starburst pendant in rose gold",
    title: "Blue Star Diamond Starburst",
    description:
      "Emerald, marquise, and round blue diamonds radiate from a round diamond centre with pink and white diamond accents in rose gold — a Blue Star motif in full bloom.",
  },
  {
    id: "for-him-signet-line",
    category: "for-him",
    productCode: "BD-K-MN-001",
    image: "/Mens/bianca-diamonds-for-him-signet-line.png",
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
    image: "/Rings/bianca-diamonds-for-him-maison-band.jpg",
    imageWellColor: "#4f4d4e",
    alt: "Maison Band — men's diamond band",
    title: "Maison Band",
    description:
      "A substantial band with channel-set brilliants — clean planes and weight on the hand in white or yellow gold.",
    metalVariants: [
      {
        id: "white-gold",
        label: "White Gold",
        image: "/Rings/bianca-diamonds-for-him-maison-band.jpg",
      },
      {
        id: "yellow-gold",
        label: "Yellow Gold",
        image: "/Rings/bianca-diamonds-for-him-maison-band-yellow-gold.jpg",
      },
    ],
  },
  {
    id: "for-him-architect-band",
    category: "for-him",
    productCode: "BD-K-MN-003",
    image: "/Rings/bianca-diamonds-for-him-architect-band.jpg",
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
    image: "/Rings/bianca-diamonds-for-him-gadroon-emerald.jpg",
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
    image: "/Rings/bianca-diamonds-for-him-eternity-line.jpg",
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
    image: "/Rings/bianca-diamonds-for-him-princess-solitaire.jpg",
    imageWellColor: "#0a0c11",
    alt: "Princess Solitaire — men's wide white-gold band with princess-cut diamond",
    title: "Princess Solitaire",
    description:
      "A substantial 18K white-gold band elevating a princess-cut brilliant in a four-prong setting — clean planes and singular salon light.",
  },
  {
    id: "ring-oval-blue-sapphire-milgrain",
    category: "rings",
    productCode: "BD-K-RG-NEW-001",
    image: "/Rings/bianca-diamonds-oval-blue-sapphire-milgrain-ring.png",
    imageWellColor: "#e8e6ea",
    alt: "Oval blue sapphire milgrain ring in white gold with diamond pavé shoulders",
    title: "Oval Sapphire Milgrain",
    description:
      "A vivid oval blue sapphire in white gold, framed by milgrain and diamond-set shoulders — vintage spirit with modern salon fire.",
  },
  {
    id: "ring-marquise-pink-toi-et-moi",
    category: "rings",
    productCode: "BD-K-RG-NEW-002",
    image:
      "/Rings/bianca-diamonds-marquise-pink-white-diamond-toi-et-moi-ring.png",
    imageWellColor: "#1a1a1a",
    alt: "Marquise white and pink diamond toi-et-moi multi-band ring in white gold",
    title: "Marquise Pink Toi et Moi",
    description:
      "Opposed marquise diamonds — white and blush — on interlocking white-gold bands — a contemporary toi-et-moi with editorial presence.",
  },
  {
    id: "ring-two-tone-bypass-baguette",
    category: "rings",
    productCode: "BD-K-RG-NEW-003",
    image: "/Rings/bianca-diamonds-two-tone-bypass-baguette-diamond-ring.jpg",
    imageWellColor: "#ebe6dc",
    alt: "Two-tone yellow and white gold bypass ring with round and baguette diamonds",
    title: "Two-Tone Bypass Baguette",
    description:
      "Round brilliants meet channel-set baguettes on a yellow-and-white-gold bypass — architectural rhythm for the modern hand.",
  },
  {
    id: "ring-radiant-pink-rose-solitaire",
    category: "rings",
    productCode: "BD-K-RG-NEW-004",
    image: "/Rings/bianca-diamonds-radiant-pink-diamond-rose-gold-solitaire.jpg",
    imageWellColor: "#cfcfcf",
    alt: "Radiant-cut fancy pink diamond solitaire in rose gold",
    title: "Radiant Pink Rose Solitaire",
    description:
      "A radiant fancy pink diamond held in rose-gold claws — pure colour, quiet band, unmistakable presence.",
  },
  {
    id: "ring-two-tone-princess-band",
    category: "rings",
    productCode: "BD-K-RG-NEW-005",
    image: "/Rings/bianca-diamonds-two-tone-princess-diamond-band.jpg",
    imageWellColor: "#2a2a2a",
    alt: "Two-tone yellow and white gold princess-cut diamond band",
    title: "Princess Two-Tone Band",
    description:
      "A princess-cut centre on a yellow-gold architectural band with white-gold accents — bold geometry and continuous brilliance.",
  },
  {
    id: "ear-pear-emerald-halo-drop",
    category: "earrings",
    productCode: "BD-K-ER-NEW-001",
    image: "/Earrings/bianca-diamonds-pear-emerald-halo-drop-earrings.png",
    imageWellColor: "#f4f0e6",
    alt: "Pear emerald halo drop earrings in white gold with diamond frames",
    title: "Pear Emerald Halo Drops",
    description:
      "Forest-green pear centres in diamond halos, suspended in white-gold openwork — evening colour with precise light.",
  },
  {
    id: "ear-pear-linear-yellow-drop",
    category: "earrings",
    productCode: "BD-K-ER-NEW-002",
    image:
      "/Earrings/bianca-diamonds-pear-diamond-linear-drop-earrings-yellow-gold.jpg",
    imageWellColor: "#d8d8d8",
    alt: "Five-stone pear diamond linear drop earrings in yellow gold",
    title: "Pear Linear Yellow Drops",
    description:
      "Five pear brilliants cascade in yellow gold — articulated movement and clean everyday-to-evening fire.",
  },
  {
    id: "neck-emerald-chandelier-set",
    category: "necklaces",
    productCode: "BD-K-NK-NEW-001",
    image:
      "/necklace/bianca-diamonds-emerald-diamond-chandelier-necklace-set.png",
    imageWellColor: "#0a0a0a",
    alt: "Emerald and diamond chandelier necklace with matching earrings in white gold",
    title: "Emerald Chandelier Parure",
    description:
      "Tiered emerald and diamond foliage in white gold — a grand collar with matching chandelier drops for the gala stage.",
  },
  {
    id: "neck-pear-fringe-parure",
    category: "necklaces",
    productCode: "BD-K-NK-NEW-002",
    image: "/necklace/bianca-diamonds-pear-fringe-diamond-necklace-parure.jpg",
    imageWellColor: "#0a0a0a",
    alt: "Pear fringe diamond necklace with matching chandelier earrings and halo ring in white gold",
    title: "Pear Fringe Parure",
    description:
      "Cascading pear and marquise diamonds in white gold — fringe necklace, chandelier earrings, and a double-halo ring as one luminous suite.",
  },
  {
    id: "brace-marquise-floral-link",
    category: "bracelets",
    productCode: "BD-K-BR-NEW-001",
    braceletKind: "bracelet",
    image: "/Bracelet/bianca-diamonds-marquise-floral-diamond-bracelet.png",
    imageWellColor: "#1a1a1a",
    alt: "Marquise floral diamond link bracelet in white gold",
    title: "Marquise Floral Link",
    description:
      "Marquise petals around round centres form a continuous floral ribbon in white gold — intricate light for the wrist.",
  },
  {
    id: "brace-pear-multi-row",
    category: "bracelets",
    productCode: "BD-K-BR-NEW-002",
    braceletKind: "bracelet",
    image: "/Bracelet/bianca-diamonds-pear-diamond-multi-row-bracelet.png",
    imageWellColor: "#1a1a1a",
    alt: "Multi-row pear diamond bracelet in white gold",
    title: "Pear Multi-Row Bracelet",
    description:
      "Overlapping pear brilliants in white gold create a wide, shimmering band — statement scale with refined scallop edges.",
  },
  {
    id: "for-him-two-tone-princess",
    category: "for-him",
    productCode: "BD-K-MN-NEW-001",
    image: "/Rings/bianca-diamonds-two-tone-princess-diamond-band.jpg",
    imageWellColor: "#2a2a2a",
    alt: "Men's two-tone princess-cut diamond band in yellow and white gold",
    title: "Two-Tone Princess",
    description:
      "Princess-cut fire on a yellow-gold architectural band with white-gold accents — masculine weight and precise geometry.",
  },
];
