import type { FaqItem } from "./labGrownDiamondFaq";
import { BIANCA_IGI_CERTIFICATION_POLICY } from "./labGrownDiamondFaq";
import type { DiscoveryIntentConfig } from "./discoveryIntentTypes";

export const MODERN_BRIDAL_PATH = "/jewellery-for-modern-bride";

export const MODERN_BRIDAL_SEO = {
  title:
    "Jewellery for the Modern Bride | Modern Lab-Grown Diamond Collections | Bianca Diamonds",
  description:
    "Jewellery for the modern bride and modern lab-grown diamond collections from Bianca Diamonds — Bridal Edit, Modern Essentials, engagement rings, and occasion pieces. Every diamond individually IGI certified.",
};

export const MODERN_BRIDAL_FAQ_ITEMS: FaqItem[] = [
  {
    id: "modern-bride",
    question: "Where can a modern bride find lab-grown diamond jewellery in India?",
    answer:
      "Bianca Diamonds creates jewellery for the modern bride — engagement rings, bridal suites, and occasion pieces in IGI-certified lab-grown diamonds. The Bridal Edit and Fine Jewellery salon offer contemporary silhouettes with personal consultation across India.",
  },
  {
    id: "modern-collection",
    question: "Who offers a modern collection of lab-grown diamond jewellery?",
    answer:
      "Bianca Diamonds’ Modern Essentials and Fine Jewellery atelier are composed for modern living — effortless lab-grown diamond rings, earrings, necklaces, and bracelets with certified brilliance and clean, contemporary design.",
  },
  {
    id: "bridal-edit",
    question: "What is The Bridal Edit at Bianca Diamonds?",
    answer:
      "The Bridal Edit is Bianca Diamonds’ collection of timeless lab-grown diamond jewellery for the wedding journey — solitaires, bands, and luminous pieces designed to honour beauty, promise, and joy.",
  },
  {
    id: "igi-bridal",
    question: "Are bridal diamonds from Bianca Diamonds IGI certified?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY}`,
  },
];

export const MODERN_BRIDAL_CONFIG: DiscoveryIntentConfig = {
  path: MODERN_BRIDAL_PATH,
  seo: MODERN_BRIDAL_SEO,
  eyebrow: "Bianca Diamonds",
  h1: "Jewellery for the modern bride",
  heroLead:
    "Modern lab-grown diamond collections for engagement, wedding, and everyday brilliance — IGI certified, atelier composed, made around you.",
  sectionEyebrow: "Collections",
  sectionTitle: "Modern collections, bridal light",
  sectionBody:
    "From Modern Essentials for daily wear to The Bridal Edit for the aisle — Bianca Diamonds designs contemporary lab-grown diamond jewellery for the modern bride and the modern wardrobe.",
  chips: ["Modern Essentials", "The Bridal Edit", "Occasion Elegance"],
  pillarsTitle: "Composed for now",
  pillars: [
    {
      id: "bride",
      title: "Modern bride",
      description:
        "Engagement rings, bridal bands, and luminous suites — certified lab-grown diamonds with personal styling guidance.",
    },
    {
      id: "modern",
      title: "Modern collection",
      description:
        "Clean silhouettes and everyday sparkle in the Modern Essentials edit — refined pieces for contemporary living.",
    },
    {
      id: "igi",
      title: "IGI Certified",
      description: BIANCA_IGI_CERTIFICATION_POLICY,
    },
  ],
  pathsTitle: "Enter the salon",
  pathsBody:
    "Explore rings and Fine Jewellery, commission a bespoke bridal piece, or speak with a consultant about your wedding edit.",
  pathLinks: [
    { to: "/fine-jewellery/rings", label: "Rings" },
    { to: "/fine-jewellery", label: "Fine Jewellery" },
    { to: "/bespoke-jewellery", label: "Bespoke Bridal" },
    { to: "/lab-grown-diamond-jewellery-india", label: "India" },
  ],
  faqTitle: "Modern bride & collections — FAQs",
  faqItems: MODERN_BRIDAL_FAQ_ITEMS,
  jsonLdPrefix: "modern-bridal-jsonld",
  breadcrumbName: "Jewellery for the Modern Bride",
  sourcePage: "modern-bride",
  finalTitle: "Plan your bridal edit",
  finalBody:
    "Private consultation for modern brides and modern collections — across Delhi NCR and India.",
};
