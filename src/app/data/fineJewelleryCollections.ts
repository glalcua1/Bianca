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
    id: "ear-petale-lumiere",
    category: "earrings",
    productCode: "BD-ER-001",
    image: "/Earrings.png",
    alt: "Petal Light — lab-grown diamond drop earrings",
    title: "Petal Light",
    description:
      "Graduated pear and marquise drops trace the jawline in a soft cascade of IGI-certified brilliants — movement, light, and evening poise in perfect proportion.",
  },
  {
    id: "ear-chandelier-maison",
    category: "earrings",
    productCode: "BD-ER-002",
    image: "/Earrings_2.png",
    alt: "Evening Chandelier — statement diamond earrings",
    title: "Evening Chandelier",
    description:
      "A sculptural chandelier silhouette with layered pavé and baguette accents — high-jewellery presence composed for celebrations, galas, and the house's most luminous moments.",
  },
  {
    id: "ear-aile-saphir",
    category: "earrings",
    productCode: "BD-ER-003",
    image: "/Earrings4.png",
    alt: "Sapphire Wing — cushion sapphire and marquise diamond drop earrings",
    title: "Sapphire Wing",
    description:
      "Cushion-cut sapphires crowned with round brilliants, finished in marquise diamond wings — a mirrored pair composed for evening light and unapologetic colour.",
  },
  {
    id: "ring-solitaire-classique",
    category: "rings",
    productCode: "BD-RG-001",
    image: "/Rings/IMG_5298.jpg",
    alt: "Classic Solitaire — lab-grown diamond ring",
    title: "Classic Solitaire",
    description:
      "A timeless round brilliant in a refined four-prong setting — the essential expression of commitment, crafted for the modern hand.",
  },
  {
    id: "ring-pave-band",
    category: "rings",
    productCode: "BD-RG-002",
    image: "/Rings/IMG_5299.jpg",
    alt: "Pave Band — diamond ring detail",
    title: "Pave Band",
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
    alt: "Signature Embrace — women's diamond ring",
    title: "Signature Embrace",
    description:
      "An elegant silhouette with a certified centre brilliant — feminine, assured, and made to be worn without occasion.",
  },
  {
    id: "ring-emerald-starburst",
    category: "rings",
    productCode: "BD-RG-005",
    image: "/Rings/IMG_7416.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Starburst — square emerald and diamond halo ring",
    title: "Emerald Starburst",
    description:
      "A square emerald-cut centre framed in marquise, pear, and round brilliants on a pavé split shank in white gold — high-jewellery presence composed for the hand.",
  },
  {
    id: "ring-cabochon-emerald",
    category: "rings",
    productCode: "BD-RG-006",
    image: "/Rings/IMG_7417.jpg",
    imageWellColor: "#faf8f5",
    alt: "Cabochon Emerald — oval emerald and diamond statement ring",
    title: "Cabochon Emerald",
    description:
      "An oval cabochon emerald crowned in a milgrain diamond halo on a wide, graduating pavé band in platinum-toned white gold — regal colour with vintage-inspired refinement.",
  },
  {
    id: "ring-emerald-sunburst",
    category: "rings",
    productCode: "BD-RG-007",
    image: "/Rings/IMG_7418.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Sunburst — oval emerald and marquise diamond cocktail ring",
    title: "Emerald Sunburst",
    description:
      "An oval emerald centre radiates marquise and round diamond starbursts in white gold — bold cocktail-scale brilliance for evening and celebration.",
  },
  {
    id: "brace-feuille-douce",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-001",
    image: "/Bracelet2.png",
    alt: "Soft Leaf — marquise diamond bangle bracelets",
    title: "Soft Leaf",
    description:
      "Twin yellow-gold bangles set with marquise diamonds in a laurel-leaf motif — layered wrist brilliance with sculptural, house-refined proportion.",
  },
  {
    id: "brace-jardin-floreal",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-004",
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
    productCode: "BD-BR-003",
    image: "/Bracelet/necklace11.png",
    imageWellColor: "#0a0a0a",
    alt: "Tennis Brilliant — round diamond tennis bracelet",
    title: "Tennis Brilliant",
    description:
      "A classic tennis line of round IGI-certified brilliants in four-prong settings — uninterrupted sparkle for the wrist, refined enough to wear alone or layered.",
  },
  {
    id: "brace-tennis-marquise",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-002",
    image: "/Bracelet/necklace12.png",
    imageWellColor: "#0a0a0a",
    alt: "Tennis Marquise — marquise diamond tennis bracelet",
    title: "Tennis Marquise",
    description:
      "Marquise brilliants set edge to edge in a continuous line — fluid fire around the wrist, composed to stack with the house's bangles and cuffs.",
  },
  {
    id: "brace-tennis-poire",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-005",
    image: "/Bracelet/Bracelet4.png",
    imageWellColor: "#0a0a0a",
    alt: "Tennis Pear — three-row pear and round diamond tennis bracelet",
    title: "Tennis Pear",
    description:
      "Three articulated rows of pear and round brilliants in a scalloped tennis line — wider wrist fire with the same fluid, stackable elegance as the house's classic tennis styles.",
  },
  {
    id: "brace-coeur-lumiere",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-006",
    image: "/Bracelet/IMG_7375.JPG",
    imageWellColor: "#0a0a0a",
    alt: "Heartlight — heart-cut diamond tennis bracelet in rose gold",
    title: "Heartlight",
    description:
      "A continuous line of heart-cut IGI-certified brilliants in warm rose gold — romantic geometry and uninterrupted fire around the wrist.",
  },
  {
    id: "brace-princesse-classique",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-007",
    image: "/Bracelet/ddi9foddi9foddi9.jpg",
    imageWellColor: "#faf8f5",
    alt: "Princess Classic — princess-cut diamond tennis bracelet",
    title: "Princess Classic",
    description:
      "Square princess-cut diamonds in a seamless tennis line on white gold — crisp facets and even luminosity for the modern wrist.",
  },
  {
    id: "brace-princesse-rosee",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-008",
    image: "/Bracelet/IMG_7367.JPG",
    imageWellColor: "#0a0a0a",
    alt: "Rose Princess — princess-cut diamond tennis bracelet in rose gold",
    title: "Rose Princess",
    description:
      "Princess-cut brilliants set edge to edge in warm rose gold — a softer tennis silhouette with the house's signature precision.",
  },
  {
    id: "brace-motif-papillon",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-009",
    image: "/Bracelet/IMG_7368-2.jpg",
    imageWellColor: "#faf8f5",
    alt: "Butterfly Link — pear and princess diamond bracelet in rose gold",
    title: "Butterfly Link",
    description:
      "Alternating pear and princess diamonds in rose gold form a continuous butterfly motif — sculptural links with gala-ready brilliance.",
  },
  {
    id: "brace-quatre-rangees",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-010",
    image: "/Bracelet/IMG_7372.JPG",
    imageWellColor: "#0a0a0a",
    alt: "Four Row — four-row emerald and round diamond bracelet",
    title: "Four Row",
    description:
      "Four parallel rows of emerald and round brilliants in white gold — architectural width and continuous fire for statement evenings.",
  },
  {
    id: "brace-rosee-classique",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-011",
    image: "/Bracelet/IMG_7374.JPG",
    imageWellColor: "#faf8f5",
    alt: "Classic Rose Tennis — round diamond tennis bracelet in rose gold",
    title: "Classic Rose Tennis",
    description:
      "Round IGI-certified brilliants in a classic four-prong tennis line on rose gold — timeless wrist brilliance with a warm golden glow.",
  },
  {
    id: "brace-emeraude-alternee",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-012",
    image: "/Bracelet/IMG_7376.JPG",
    imageWellColor: "#faf8f5",
    alt: "Alternating Emerald — emerald and diamond tennis bracelet",
    title: "Alternating Emerald",
    description:
      "Round emeralds and brilliants alternate in a yellow-gold tennis line — rhythmic colour and light for day-to-evening wear.",
  },
  {
    id: "brace-halo-emeraude-or",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-013",
    image: "/Bracelet/jcyvoyjcyvoyjcyv.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Radiance — emerald-cut and marquise diamond cluster bracelet",
    title: "Emerald Radiance",
    description:
      "Emerald-cut centres framed in marquise and round diamond halos on white gold — a continuous line of colour and brilliance with pavé-set clasp refinement.",
  },
  {
    id: "brace-jardin-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-014",
    image: "/Bracelet/iih2ksiih2ksiih2-2.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Garden — oval emerald and diamond floral link bracelet",
    title: "Emerald Garden",
    description:
      "Oval emeralds in diamond halos join floral diamond links on yellow gold — botanical grace articulated for the wrist.",
  },
  {
    id: "brace-halo-emeraude-maison",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-015",
    image: "/Bracelet/iih2ksiih2ksiih2-1.jpg",
    imageWellColor: "#faf8f5",
    alt: "Cushion Emerald Halo — cushion emerald and diamond link bracelet",
    title: "Cushion Emerald Halo",
    description:
      "Cushion emeralds framed in pavé halos alternate with round brilliants in white gold — colour, symmetry, and high-jewellery poise.",
  },
  {
    id: "brace-rivage-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-016",
    image: "/Bracelet/iih2ksiih2ksiih2.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Shore — oval emerald and diamond halo bracelet",
    title: "Emerald Shore",
    description:
      "A rivière of oval emeralds, each encircled by round brilliants in white gold — fluid links composed for layered luminosity.",
  },
  {
    id: "brace-floreal-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-017",
    image: "/Bracelet/iih2ksiih2ksiih2-5.jpg",
    imageWellColor: "#faf8f5",
    alt: "Floral Emerald — square emerald and marquise diamond cluster bracelet",
    title: "Floral Emerald",
    description:
      "Square emeralds bloom in marquise and round diamond clusters on white and yellow gold — ornate wrist artistry for the collector.",
  },
  {
    id: "brace-etoile-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-018",
    image: "/Bracelet/iih2ksiih2ksiih2-4.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Starburst — emerald-cut diamond starburst bracelet",
    title: "Emerald Starburst",
    description:
      "Emerald-cut centres radiate marquise diamond starbursts in white gold — bold geometry and evening-scale presence.",
  },
  {
    id: "brace-art-deco-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-019",
    image: "/Bracelet/jcyvoyjcyvoyjcyv-1.jpg",
    imageWellColor: "#faf8f5",
    alt: "Art Deco Emerald — wide emerald and diamond bracelet",
    title: "Art Deco Emerald",
    description:
      "Cushion emeralds anchor an Art Deco lattice of round and pear brilliants in white gold — architectural width and red-carpet drama.",
  },
  {
    id: "brace-ligne-halo-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-020",
    image: "/Bracelet/iih2ksiih2ksiih2-3.jpg",
    imageWellColor: "#faf8f5",
    alt: "Emerald Halo Line — round emerald and diamond halo link bracelet",
    title: "Emerald Halo Line",
    description:
      "Round emeralds crowned in diamond halos, linked in polished yellow gold — fluid salon elegance with secure box-clasp refinement.",
  },
  {
    id: "brace-cuff-floreal-emeraude",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-022",
    image: "/Bracelet/IMG_7385.JPG",
    imageWellColor: "#0a0a0a",
    alt: "Floral Emerald Cuff — three-row emerald and diamond cuff bracelet",
    title: "Floral Emerald Cuff",
    description:
      "Three rows of emerald-cut stones bloom in marquise diamond garlands on white gold — a wide flexible cuff with haute joaillerie depth.",
  },
  {
    id: "brace-rubis-alterne",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-021",
    image: "/Bracelet/IMG_7386.JPG",
    imageWellColor: "#faf8f5",
    alt: "Alternating Ruby — ruby and diamond tennis bracelet",
    title: "Alternating Ruby",
    description:
      "Emerald-cut rubies alternate with princess-cut diamond pairs in white gold — vivid colour in a refined tennis silhouette.",
  },
  {
    id: "brace-heart-tennis-platinum",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-023",
    image: "/Bracelet/IMG_7364.jpg",
    imageWellColor: "#0a0a0a",
    alt: "Platinum Heart Tennis — heart-cut diamond tennis bracelet",
    title: "Platinum Heart Tennis",
    description:
      "Heart-cut IGI-certified brilliants in a continuous four-prong tennis line on white gold — romantic silhouette with uninterrupted fire around the wrist.",
  },
  {
    id: "brace-rose-gold-tennis-line",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-024",
    image: "/Bracelet/IMG_7373.JPG",
    imageWellColor: "#faf8f5",
    alt: "Rose Gold Line Tennis — round diamond tennis bracelet in rose gold",
    title: "Rose Gold Line Tennis",
    description:
      "Round brilliants in a classic four-prong tennis line on warm rose gold — everyday brilliance with the house's signature precision and secure box clasp.",
  },
  {
    id: "brace-sapphire-halo-bloom",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-026",
    image: "/Bracelet/IMG_7407.jpg",
    imageWellColor: "#faf8f5",
    alt: "Sapphire Halo Bloom — oval sapphire and diamond floral link bracelet",
    title: "Sapphire Halo Bloom",
    description:
      "Oval sapphires in round diamond halos alternate with quatrefoil diamond links on white gold — regal colour in a fluid, salon-composed line.",
  },
  {
    id: "brace-ruby-marquise-tennis",
    category: "bracelets",
    braceletKind: "tennis",
    productCode: "BD-BR-027",
    image: "/Bracelet/IMG_7408.jpg",
    imageWellColor: "#faf8f5",
    alt: "Ruby Marquise Tennis — oval ruby and marquise diamond tennis bracelet",
    title: "Ruby Marquise Tennis",
    description:
      "Oval rubies with pavé-set ends alternate with marquise diamonds in white gold — rhythmic crimson and light in a refined tennis silhouette.",
  },
  {
    id: "brace-sapphire-five-row-cuff",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-028",
    image: "/Bracelet/IMG_7409-2.jpg",
    imageWellColor: "#faf8f5",
    alt: "Sapphire Five Row Cuff — wide sapphire and diamond cuff bracelet",
    title: "Sapphire Five Row Cuff",
    description:
      "Five alternating rows of oval sapphires and round brilliants in scalloped bezel settings on white gold — architectural width with secure box-clasp refinement.",
  },
  {
    id: "brace-ruby-triple-row",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-029",
    image: "/Bracelet/IMG_7410.jpg",
    imageWellColor: "#faf8f5",
    alt: "Ruby Triple Row — three-row ruby and diamond bracelet",
    title: "Ruby Triple Row",
    description:
      "Three articulated rows of round rubies and brilliants in white gold — the centre line alternates crimson and white fire for opulent, flexible wrist coverage.",
  },
  {
    id: "brace-ruby-marquise-link",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-030",
    image: "/Bracelet/IMG_7411.jpg",
    imageWellColor: "#faf8f5",
    alt: "Ruby Marquise Link — oval ruby and marquise diamond link bracelet",
    title: "Ruby Marquise Link",
    description:
      "Paired oval rubies and vertical marquise diamonds in polished white gold — sculptural links with gala-ready brilliance and secure closure.",
  },
  {
    id: "brace-pear-ruby-three-row",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-031",
    image: "/Bracelet/IMG_7412.jpg",
    imageWellColor: "#faf8f5",
    alt: "Pear Ruby Three Row — pear-cut ruby and diamond three-row bracelet",
    title: "Pear Ruby Three Row",
    description:
      "Pear-cut rubies form serrated outer rows around a centre line of round brilliants on white gold — bold geometry and evening-scale presence.",
  },
  {
    id: "brace-ruby-emerald-cut-flex",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-032",
    image: "/Bracelet/IMG_7413.jpg",
    imageWellColor: "#faf8f5",
    alt: "Ruby Emerald Cut Flex — emerald-cut ruby and diamond flex bangle",
    title: "Ruby Emerald Cut Flex",
    description:
      "A centre row of emerald-cut rubies flanked by round diamond borders in a flexible white-gold band — classic opulence designed for comfortable, clasp-free wear.",
  },
  {
    id: "brace-sapphire-art-deco-line",
    category: "bracelets",
    braceletKind: "bracelet",
    productCode: "BD-BR-033",
    image: "/Bracelet/IMG_7414.jpg",
    imageWellColor: "#faf8f5",
    alt: "Sapphire Art Deco Line — princess diamond and sapphire line bracelet",
    title: "Sapphire Art Deco Line",
    description:
      "Square brilliants in an Art Deco line bordered by calibré sapphires on white gold — geometric links with vintage-inspired refinement and a secure box clasp.",
  },
  {
    id: "neck-saphir-majeste",
    category: "necklaces",
    productCode: "BD-NK-011",
    image: "/Necklace_s1.png",
    alt: "Sapphire Majesty — sapphire and diamond collar necklace",
    title: "Sapphire Majesty",
    description:
      "Cushion and oval sapphires framed in double diamond halos, joined by marquise floral motifs — a collar of depth, colour, and high-jewellery composition.",
  },
  {
    id: "neck-lumiere-cascade",
    category: "necklaces",
    productCode: "BD-NK-001",
    image: "/necklace/Neck1.png",
    alt: "Cascade of Light — graduated diamond fringe necklace",
    title: "Cascade of Light",
    description:
      "A sweeping fringe of IGI-certified brilliants, each stone hand-set to catch light with every movement — red-carpet presence, distilled.",
  },
  {
    id: "neck-riviere-nocturne",
    category: "necklaces",
    productCode: "BD-NK-002",
    image: "/necklace/Neck2.png",
    alt: "Evening River — diamond collar necklace",
    title: "Evening River",
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
    alt: "Atelier Classic — diamond station necklace",
    title: "Atelier Classic",
    description:
      "Evenly spaced round brilliants along a fine chain — the house signature of proportion, balance, and everyday refinement.",
  },
  {
    id: "neck-grace-eternelle",
    category: "necklaces",
    productCode: "BD-NK-006",
    image: "/necklace/Neck6.png",
    alt: "Eternal Grace — diamond halo pendant necklace",
    title: "Eternal Grace",
    description:
      "A halo of pavé diamonds encircling a radiant centre — soft luminosity designed to rest beautifully against the collarbone.",
  },
  {
    id: "neck-maison-rubis",
    category: "necklaces",
    productCode: "BD-NK-007",
    image: "/necklace/Neck7.png",
    alt: "Ruby Heritage — ruby and diamond fringe necklace with matching earrings",
    title: "Ruby Heritage",
    description:
      "A cushion-cut ruby crowned in diamonds, with cascading pear and marquise drops — matched with chandelier earrings for an unmistakable statement of house high jewellery.",
  },
  {
    id: "neck-jardin-serein",
    category: "necklaces",
    productCode: "BD-NK-008",
    image: "/necklace/Nacklace9.png",
    alt: "Serene Garden — floral diamond collar necklace",
    title: "Serene Garden",
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
    id: "neck-tennis-classique",
    category: "necklaces",
    productCode: "BD-NK-014",
    image: "/necklace/Necklace13.png",
    alt: "Classic Tennis — round brilliant tennis necklace",
    title: "Classic Tennis",
    description:
      "A continuous collar of IGI-certified round brilliants in a refined four-prong line — timeless tennis brilliance, composed for the modern neckline.",
  },
  {
    id: "neck-frange-poire",
    category: "necklaces",
    productCode: "BD-NK-015",
    image: "/necklace/Necklace14.png",
    alt: "Pear Fringe — pear diamond fringe necklace",
    title: "Pear Fringe",
    description:
      "Graduated pear drops suspended from a pavé strand — a fringe of movement and light designed for gala evenings and red-carpet presence.",
  },
  {
    id: "neck-double-fil-or",
    category: "necklaces",
    productCode: "BD-NK-016",
    image: "/necklace/Necklace15.png",
    alt: "Double Gold Strand — gold and diamond multi-strand necklace",
    title: "Double Gold Strand",
    description:
      "Twin diamond strands framed in polished yellow gold, converging on a pear and round-brilliant cascade — layered luxury with architectural proportion.",
  },
  {
    id: "neck-riviere-ovale",
    category: "necklaces",
    productCode: "BD-NK-017",
    image: "/necklace/Necklace16.png",
    alt: "Oval River — graduated oval diamond necklace",
    title: "Oval River",
    description:
      "Oval brilliants graduate from centre to clasp in a continuous rivière — elongated fire and even luminosity around the collarbone.",
  },
  {
    id: "neck-lariat-etoile",
    category: "necklaces",
    productCode: "BD-NK-018",
    image: "/necklace/Necklace17.png",
    alt: "Star Lariat — Y-necklace with pear diamond drop",
    title: "Star Lariat",
    description:
      "Round brilliants ascend to a central star stone, finishing in a pear drop — a Y-shaped lariat composed for décolletage and evening drama.",
  },
  {
    id: "neck-double-rangee",
    category: "necklaces",
    productCode: "BD-NK-019",
    image: "/necklace/Necklace18.png",
    alt: "Double Row — two-strand pear and marquise necklace",
    title: "Double Row",
    description:
      "Twin rows of pear and marquise diamonds in warm gold — a double-strand collar with sculptural symmetry and layered wrist-level brilliance at the throat.",
  },
  {
    id: "neck-maillon-eclat",
    category: "necklaces",
    productCode: "BD-NK-020",
    image: "/necklace/Necklace19.png",
    alt: "Luminous Link — halo link station necklace with drop",
    title: "Luminous Link",
    description:
      "Pavé halo links trace the chain, centred on a graduated drop of round brilliants — station-set radiance with a softly articulated silhouette.",
  },
  {
    id: "pend-emerald-halo",
    category: "pendants",
    productCode: "BD-PD-001",
    image: "/Pendant/necklace_s.png",
    imageWellColor: "#cbb79f",
    alt: "Emerald Halo Pendant — emerald-cut diamond pendant with pavé halo",
    title: "Emerald Halo Pendant",
    description:
      "An emerald-cut centre brilliant encircled by a pavé halo on a delicate cable chain — precision geometry and warm gold, distilled to a single luminous point.",
  },
  {
    id: "pend-emerald-classic",
    category: "pendants",
    productCode: "BD-PD-002",
    image: "/Pendant/Necklace1a.jpg",
    imageWellColor: "#f4f0e6",
    alt: "Classic Emerald Pendant — emerald and diamond halo on gold chain",
    title: "Classic Emerald Pendant",
    description:
      "A rectangular emerald-cut centre in a double diamond halo on yellow gold — a refined everyday pendant on a polished cable chain.",
  },
  {
    id: "pend-ruby-teardrop",
    category: "pendants",
    productCode: "BD-PD-003",
    image: "/Pendant/Necklace2b.jpg",
    imageWellColor: "#f4f0e6",
    alt: "Ruby Teardrop — ruby and diamond pendant on chain",
    title: "Ruby Teardrop",
    description:
      "A round ruby in a two-tone teardrop frame with pavé diamonds on white gold — understated colour for day-to-evening wear.",
  },
  {
    id: "pend-canary-pear-drop",
    category: "pendants",
    productCode: "BD-PD-004",
    image: "/Pendant/Necklace2c.jpg",
    imageWellColor: "#f4f0e6",
    alt: "Canary Pear Drop — yellow diamond pear pendant on chain",
    title: "Canary Pear Drop",
    description:
      "A pear-cut canary diamond suspended with round and pear accent stones on a fine white-gold chain — quiet radiance at the collarbone.",
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
