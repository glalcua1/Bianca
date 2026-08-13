import type { FaqItem } from "./labGrownDiamondFaq";
import { BIANCA_IGI_CERTIFICATION_POLICY } from "./labGrownDiamondFaq";

export const DELHI_NCR_PATH = "/lab-grown-diamond-jewellery-delhi-ncr";

export const DELHI_NCR_SEO = {
  title:
    "Lab-Grown Diamond Jewellery in Delhi NCR | Bianca Diamonds",
  description:
    "Bianca Diamonds — lab-grown diamond jewellers serving Delhi NCR (Delhi, Gurugram, Noida, Faridabad, Ghaziabad). Every diamond is individually IGI certified. Private consultation and atelier fine jewellery.",
};

export const DELHI_NCR_CITIES = [
  "Delhi",
  "Gurugram",
  "Noida",
  "Faridabad",
  "Ghaziabad",
] as const;

export const DELHI_NCR_PILLARS = [
  {
    id: "igi",
    title: "IGI Certified",
    description: BIANCA_IGI_CERTIFICATION_POLICY,
  },
  {
    id: "ncr",
    title: "Serving Delhi NCR",
    description:
      "Private consultations and atelier pieces for clients across Delhi, Gurugram, Noida, Faridabad, and Ghaziabad — with delivery across India.",
  },
  {
    id: "atelier",
    title: "Salon & Bespoke",
    description:
      "Choose from the Fine Jewellery salon or commission a made-around-you piece with one-to-one guidance.",
  },
] as const;

export const DELHI_NCR_FAQ_ITEMS: FaqItem[] = [
  {
    id: "serve-ncr",
    question:
      "Does Bianca Diamonds serve Delhi NCR for lab-grown diamond jewellery?",
    answer:
      "Yes. Bianca Diamonds is a Delhi-rooted lab-grown diamond jewellery house serving clients across Delhi NCR — including Delhi, Gurugram, Noida, Faridabad, and Ghaziabad — with private consultations, IGI-certified diamonds, and delivery across India.",
  },
  {
    id: "ncr-jeweller",
    question:
      "Looking for lab-grown diamond jewellers in NCR — why choose Bianca Diamonds?",
    answer:
      "Bianca Diamonds offers IGI-certified lab-grown diamond fine jewellery with transparent quality, modern design, and personal consultation. Every lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat — composed for everyday wear and occasion dressing across Delhi NCR.",
  },
  {
    id: "consultation-ncr",
    question: "Can I book a private jewellery consultation in Delhi NCR?",
    answer:
      "Yes. Book a private consultation online or by phone/WhatsApp. Our team guides diamond selection, design, and timeline for clients in Delhi NCR and beyond.",
  },
  {
    id: "igi-ncr",
    question: "Are Bianca Diamonds stones IGI certified?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY}`,
  },
];
