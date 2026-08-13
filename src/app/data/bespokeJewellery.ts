import type { FaqItem } from "./labGrownDiamondFaq";

export const BESPOKE_JEWELLERY_PATH = "/bespoke-jewellery";

export const BESPOKE_JEWELLERY_SEO = {
  title:
    "Bespoke Jewellery Design | Custom Lab-Grown Diamond Jewellery | Bianca Diamonds",
  description:
    "Create one-of-a-kind bespoke jewellery with Bianca Diamonds. From consultation and sketches to CAD development and artisan craftsmanship, transform your vision into a timeless masterpiece.",
};

export type BespokeJourneyStep = {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  details: string[];
};

export const BESPOKE_JOURNEY_STEPS: BespokeJourneyStep[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover",
    subtitle: "Private Design Consultation",
    details: [
      "Occasion",
      "Inspiration",
      "Style preferences",
      "Budget",
      "Personal story",
    ],
  },
  {
    id: "imagine",
    step: "02",
    title: "Imagine",
    subtitle: "Creative Concept Development",
    details: [
      "Initial design directions",
      "Inspiration boards",
      "Tailored to your vision",
    ],
  },
  {
    id: "sketch",
    step: "03",
    title: "Sketch",
    subtitle: "Hand-Drawn Design Concepts",
    details: [
      "Beautiful hand sketches",
      "Visual concepts",
      "Refined proportions",
    ],
  },
  {
    id: "visualize",
    step: "04",
    title: "Visualize",
    subtitle: "3D CAD Rendering",
    details: [
      "View from every angle",
      "Precision before production",
      "Collaborative refinement",
    ],
  },
  {
    id: "select",
    step: "05",
    title: "Select",
    subtitle: "Diamond & Gemstone Curation",
    details: [
      "IGI-certified lab-grown diamonds",
      "Exceptional gemstones",
      "Personally curated stones",
    ],
  },
  {
    id: "create",
    step: "06",
    title: "Create",
    subtitle: "Artisan Craftsmanship",
    details: [
      "Master jewellers",
      "Precision handcraft",
      "House finishing standards",
    ],
  },
  {
    id: "reveal",
    step: "07",
    title: "Reveal",
    subtitle: "Your Exclusive Creation",
    details: [
      "One-of-a-kind piece",
      "Created solely for you",
      "Heirloom presentation",
    ],
  },
];

export const BESPOKE_WHY_CARDS = [
  {
    id: "personal",
    title: "Personal Design Experience",
    description:
      "Work directly with jewellery designers throughout the process.",
  },
  {
    id: "unique",
    title: "Unique To You",
    description:
      "Every design is created exclusively for its owner.",
  },
  {
    id: "ethical",
    title: "Ethical Luxury",
    description:
      "Responsible sourcing with modern sustainability values.",
  },
  {
    id: "craft",
    title: "Expert Craftsmanship",
    description:
      "Meticulously handcrafted by experienced artisans.",
  },
];

/** Full-bleed orchid editorial for the Why Bespoke section */
export const BESPOKE_WHY_ORCHID_IMAGE = "/media/bespoke/orchid-studio-light.jpg";

export type BespokeSalonPiece = {
  id: string;
  kind: "video" | "image";
  src: string;
  alt: string;
  /** Editorial label — e.g. Salon film, Atelier study */
  mediaEyebrow: string;
  title: string;
  subtitle: string;
  reference: string;
  gemstoneWeight: string;
  goldWeight: string;
  priceInr: number;
};

/** @deprecated Use BespokeSalonPiece */
export type BespokeSalonFilm = BespokeSalonPiece;

export const BESPOKE_SALON_PIECES: BespokeSalonPiece[] = [
  {
    id: "highlight-emerald-film",
    kind: "video",
    src: "/Rings/Green_ga.mp4",
    alt: "Emerald bespoke ring — salon film in sculpted gold",
    mediaEyebrow: "Salon film",
    title: "Emerald Garden",
    subtitle:
      "Green gemstone in sculpted gold — movement revealing depth, colour, and the house's proportion on the hand.",
    reference: "BD-G-RG-036",
    gemstoneWeight: "1 ct centre gemstone",
    goldWeight: "3.5 to 4 gm gold",
    priceInr: 98_000,
  },
  {
    id: "highlight-sapphire-study",
    kind: "image",
    src: "/Rings/Blue_new.png",
    alt: "Sapphire bespoke ring — oval centre stone in white gold with pavé split shoulders",
    mediaEyebrow: "Atelier study",
    title: "Sapphire Lumière",
    subtitle:
      "Oval sapphire in a split-shank white-gold mount — pavé brilliance and milgrain tracing the shoulders.",
    reference: "BD-G-RG-038",
    gemstoneWeight: "1 ct centre gemstone",
    goldWeight: "4 to 5 gm gold",
    priceInr: 188_000,
  },
];

/** @deprecated Use BESPOKE_SALON_PIECES */
export const BESPOKE_SALON_FILMS = BESPOKE_SALON_PIECES;

export type BespokeGalleryItem = {
  id: string;
  category: string;
  /** CMS-ready image path — empty uses editorial placeholder */
  image?: string;
  alt: string;
};

export const BESPOKE_GALLERY_CATEGORIES = [
  "Engagement Rings",
  "Bridal Jewellery",
  "Diamond Earrings",
  "Diamond Necklaces",
  "Tennis Bracelets",
  "Statement Jewellery",
] as const;

export const BESPOKE_GALLERY_ITEMS: BespokeGalleryItem[] = [
  {
    id: "gallery-engagement-1",
    category: "Engagement Rings",
    image: "/Rings/IMG_7434.jpg",
    alt: "Bespoke engagement ring — pear diamond in geometric gold setting",
  },
  {
    id: "gallery-engagement-2",
    category: "Engagement Rings",
    image: "/Rings/IMG_7447.jpg",
    alt: "Bespoke engagement ring — round solitaire with pavé shoulders",
  },
  {
    id: "gallery-bridal-1",
    category: "Bridal Jewellery",
    image: "/Cannes/Necklace1_editorial.png",
    alt: "Bespoke bridal necklace — editorial high jewellery",
  },
  {
    id: "gallery-bridal-2",
    category: "Bridal Jewellery",
    image: "/Cannes/earrings.jpeg",
    alt: "Bespoke bridal earrings",
  },
  {
    id: "gallery-earrings-1",
    category: "Diamond Earrings",
    image: "/Earrings.png",
    alt: "Bespoke diamond drop earrings",
  },
  {
    id: "gallery-earrings-2",
    category: "Diamond Earrings",
    image: "/bianca-diamonds-lab-grown-diamond-earrings.png",
    alt: "Bespoke chandelier diamond earrings",
  },
  {
    id: "gallery-necklaces-1",
    category: "Diamond Necklaces",
    image: "/necklace/Necklace10.png",
    alt: "Bespoke diamond fringe necklace",
  },
  {
    id: "gallery-necklaces-2",
    category: "Diamond Necklaces",
    image: "/Necklace_s1.png",
    alt: "Bespoke sapphire and diamond collar",
  },
  {
    id: "gallery-tennis-1",
    category: "Tennis Bracelets",
    image: "/Bracelet/necklace11.png",
    alt: "Bespoke round diamond tennis bracelet",
  },
  {
    id: "gallery-tennis-2",
    category: "Tennis Bracelets",
    image: "/Bracelet/IMG_7375.JPG",
    alt: "Bespoke heart-cut diamond tennis bracelet",
  },
  {
    id: "gallery-statement-1",
    category: "Statement Jewellery",
    image: "/Rings/IMG_7418.jpg",
    alt: "Bespoke emerald cocktail ring",
  },
  {
    id: "gallery-statement-2",
    category: "Statement Jewellery",
    image: "/Bracelet/IMG_7385.JPG",
    alt: "Bespoke emerald floral cuff bracelet",
  },
];

export const BESPOKE_LAB_GROWN_COMPARISON = [
  {
    id: "composition",
    label: "Composition",
    value: "Identical carbon crystal structure",
  },
  {
    id: "brilliance",
    label: "Brilliance",
    value: "Same optical properties as mined diamonds",
  },
  {
    id: "certification",
    label: "Certification",
    value: "IGI-graded cut, colour, clarity & carat",
  },
  {
    id: "value",
    label: "Value",
    value: "Remarkable beauty at exceptional value",
  },
  {
    id: "sustainability",
    label: "Sustainability",
    value: "Modern, responsible luxury choice",
  },
];

export const BESPOKE_FAQ_ITEMS: FaqItem[] = [
  {
    id: "bespoke-timeline",
    question: "How long does a bespoke piece take?",
    answer:
      "Most bespoke creations require four to eight weeks from final design approval to completion, depending on complexity, stone selection, and craftsmanship details. Your design specialist will provide a personalised timeline during your consultation.",
  },
  {
    id: "bespoke-changes",
    question: "Can I make changes during the design process?",
    answer:
      "Absolutely. Bespoke design is collaborative. You may refine sketches, CAD renderings, and stone selections until every detail reflects your vision — before production begins.",
  },
  {
    id: "bespoke-cad",
    question: "Do you provide CAD previews?",
    answer:
      "Yes. Advanced 3D CAD rendering allows you to view your jewellery from every angle, assess proportions, and approve the design with confidence before our artisans begin crafting.",
  },
  {
    id: "bespoke-reference",
    question: "Can I use reference images?",
    answer:
      "We welcome inspiration images, heirloom references, and mood boards. Our designers translate your references into an original creation that is uniquely yours.",
  },
  {
    id: "bespoke-certified",
    question: "Are your diamonds certified?",
    answer:
      "Yes. Every Bianca Diamonds lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat — including centre stones and the diamonds set in bespoke commissions.",
  },
  {
    id: "bespoke-shipping",
    question: "Do you ship internationally?",
    answer:
      "Yes. We arrange secure, insured delivery for bespoke pieces worldwide. Your design specialist will discuss shipping, insurance, and any customs considerations during your consultation.",
  },
  {
    id: "bespoke-redesign",
    question: "Can you redesign existing jewellery?",
    answer:
      "We frequently reimagine heirloom pieces — resetting stones, refining proportions, or creating entirely new designs while honouring the sentiment of the original jewellery.",
  },
];

export const BESPOKE_CONSULTATION_METHODS = [
  "Virtual",
  "In Person",
  "Phone",
] as const;

export const BESPOKE_JEWELLERY_TYPES = [
  "Ring",
  "Necklace",
  "Earrings",
  "Bracelet",
  "Bridal Set",
  "Other",
] as const;

export const BESPOKE_OCCASIONS = [
  "Engagement",
  "Wedding",
  "Anniversary",
  "Birthday",
  "Personal Milestone",
  "Gift",
  "Other",
] as const;

export const BESPOKE_BUDGET_RANGES = [
  "₹50K–₹1L",
  "₹1L–₹2L",
  "₹2L–₹5L",
  "₹5L+",
] as const;

export const BESPOKE_DIAMOND_SHAPES = [
  "Round",
  "Oval",
  "Emerald",
  "Cushion",
  "Pear",
  "Princess",
  "Marquise",
  "Unsure",
] as const;
