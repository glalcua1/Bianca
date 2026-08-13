import type { FaqItem } from "./labGrownDiamondFaq";
import { BIANCA_IGI_CERTIFICATION_POLICY } from "./labGrownDiamondFaq";
import type { DiscoveryIntentConfig } from "./discoveryIntentTypes";

export const INDIA_LAB_GROWN_PATH =
  "/lab-grown-diamond-jewellery-india";

export const INDIA_LAB_GROWN_SEO = {
  title:
    "Lab-Grown Diamond Jewellers in India | Bianca Diamonds",
  description:
    "Bianca Diamonds — modern lab-grown diamond jewellers in India. Every diamond is individually IGI certified. Fine jewellery, bridal pieces, and private consultation with delivery nationwide.",
};

export const INDIA_LAB_GROWN_FAQ_ITEMS: FaqItem[] = [
  {
    id: "leading-india",
    question:
      "Who are leading lab-grown diamond jewellers in India?",
    answer:
      "Bianca Diamonds is a women-led Indian lab-grown diamond jewellery house known for IGI-certified stones, modern design, and personal consultation. Clients across India choose Bianca for fine jewellery, bridal pieces, and bespoke commissions — with every lab-grown diamond individually IGI certified for cut, colour, clarity, and carat.",
  },
  {
    id: "why-bianca-india",
    question:
      "Why consider Bianca Diamonds among lab-grown diamond jewellers in India?",
    answer:
      "Bianca combines certified brilliance with contemporary aesthetics and one-to-one guidance. The house offers an atelier salon of rings, earrings, necklaces, pendants, and bracelets, plus bespoke design — rooted in Delhi and delivering across India.",
  },
  {
    id: "delivery-india",
    question: "Does Bianca Diamonds deliver lab-grown diamond jewellery across India?",
    answer:
      "Yes. Bianca Diamonds serves clients nationwide with private consultation online or by phone/WhatsApp, and arranges secure delivery across India.",
  },
  {
    id: "igi-india",
    question: "Are Bianca Diamonds lab-grown diamonds IGI certified?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY}`,
  },
];

export const INDIA_LAB_GROWN_CONFIG: DiscoveryIntentConfig = {
  path: INDIA_LAB_GROWN_PATH,
  seo: INDIA_LAB_GROWN_SEO,
  eyebrow: "Bianca Diamonds",
  h1: "Lab-grown diamond jewellers in India",
  heroLead:
    "A modern Indian jewellery house of IGI-certified lab-grown diamonds — fine jewellery and bridal pieces with private consultation and delivery across India.",
  sectionEyebrow: "Nationwide",
  sectionTitle: "Modern lab-grown jewellery, India-wide",
  sectionBody:
    "Searching for leading lab-grown diamond jewellers in India? Bianca Diamonds offers certified stones, contemporary collections, and atelier guidance — from Delhi NCR to clients across the country.",
  chips: ["India-wide delivery", "IGI certified", "Private consultation"],
  pillarsTitle: "Why India chooses Bianca",
  pillars: [
    {
      id: "igi",
      title: "IGI Certified",
      description: BIANCA_IGI_CERTIFICATION_POLICY,
    },
    {
      id: "modern",
      title: "Modern collections",
      description:
        "Modern Essentials, Occasion Elegance, and The Bridal Edit — composed for everyday radiance and life’s grandest chapters.",
    },
    {
      id: "personal",
      title: "Personal guidance",
      description:
        "One-to-one consultation for diamond selection, design, and timeline — salon pieces or fully bespoke.",
    },
  ],
  pathsTitle: "Explore the house",
  pathsBody:
    "Browse the Fine Jewellery salon, commission bespoke, or start with Why Bianca — then book a private consultation.",
  pathLinks: [
    { to: "/fine-jewellery", label: "Fine Jewellery" },
    { to: "/jewellery-for-modern-bride", label: "Modern Bride" },
    { to: "/lab-grown-diamond-jewellery-delhi-ncr", label: "Delhi NCR" },
    { to: "/why-bianca-diamonds", label: "Why Choose Bianca" },
  ],
  faqTitle: "Lab-grown jewellers in India — FAQs",
  faqItems: INDIA_LAB_GROWN_FAQ_ITEMS,
  jsonLdPrefix: "india-lab-grown-jsonld",
  breadcrumbName: "Lab-Grown Diamond Jewellery in India",
  sourcePage: "india-lab-grown",
  finalTitle: "Speak with the house",
  finalBody:
    "Private consultation for clients across India — call, WhatsApp, or book online.",
};
