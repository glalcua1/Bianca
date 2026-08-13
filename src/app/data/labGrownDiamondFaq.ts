export const LAB_GROWN_FAQ_PATH = "/lab-grown-diamond-faq";

export const LAB_GROWN_FAQ_SEO = {
  title:
    "Lab-Grown Diamond FAQs | Everything You Need to Know | Bianca Diamonds",
  description:
    "Every Bianca Diamonds lab-grown diamond is individually IGI certified. Answers on certification, quality, sustainability, value, and how to choose lab-grown jewellery.",
};

/** House policy — keep wording consistent across FAQ, Why Bianca, and llms.txt. */
export const BIANCA_IGI_CERTIFICATION_POLICY =
  "Every Bianca Diamonds lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat.";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  referenceUrl?: string;
  referenceLabel?: string;
};

export const LAB_GROWN_FAQ_TRUST_PILLARS = [
  {
    id: "certified",
    title: "Certified",
    description: "Every diamond IGI certified",
    icon: "award" as const,
  },
  {
    id: "ethical",
    title: "Ethical",
    description: "Responsibly Created",
    icon: "leaf" as const,
  },
  {
    id: "luxury",
    title: "Luxury",
    description: "Fine Jewellery Craftsmanship",
    icon: "gem" as const,
  },
  {
    id: "transparency",
    title: "Transparency",
    description: "100% Quality Disclosure",
    icon: "eye" as const,
  },
];

export const LAB_GROWN_FAQ_ITEMS: FaqItem[] = [
  {
    id: "real-diamonds",
    question: "Are lab-grown diamonds real diamonds?",
    answer:
      "Yes. Lab-grown diamonds are real diamonds with the same chemical, physical, and optical properties as mined diamonds. The only difference is their origin.",
    referenceUrl: "https://www.igi.org/are-lab-grown-diamonds-real/",
    referenceLabel: "IGI — Are lab-grown diamonds real?",
  },
  {
    id: "tell-difference",
    question:
      "Can you tell the difference between a lab-grown and natural diamond?",
    answer:
      "Not with the naked eye. Both appear identical and require specialized gemological equipment for identification.",
    referenceUrl: "https://www.igi.org/are-lab-grown-diamonds-real/",
    referenceLabel: "IGI — Identification guidance",
  },
  {
    id: "bianca-igi",
    question: "Are Bianca Diamonds lab-grown diamonds IGI certified?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY} You receive independent grading documentation with your piece.`,
    referenceUrl: "https://www.igi.org/reports/lab-grown-diamond-report/",
    referenceLabel: "IGI — Lab-grown diamond reports",
  },
  {
    id: "certified",
    question: "Are lab-grown diamonds certified?",
    answer: `Yes. Lab-grown diamonds can be independently graded by laboratories such as IGI. At Bianca Diamonds, ${BIANCA_IGI_CERTIFICATION_POLICY}`,
    referenceUrl: "https://www.igi.org/reports/lab-grown-diamond-report/",
    referenceLabel: "IGI — Lab-grown diamond reports",
  },
  {
    id: "igi-meaning",
    question: "What does IGI certification mean?",
    answer:
      "An IGI certificate independently verifies a diamond's cut, colour, clarity, carat weight, and lab-grown origin. Bianca Diamonds uses IGI grading for every lab-grown diamond we set.",
    referenceUrl: "https://www.igi.org/reports/verify-your-report/",
    referenceLabel: "IGI — Verify your report",
  },
  {
    id: "affordable",
    question: "Are lab-grown diamonds more affordable?",
    answer:
      "Yes. Lab-grown diamonds typically offer greater value compared to mined diamonds while maintaining the same beauty and durability.",
  },
  {
    id: "ethical",
    question: "Are lab-grown diamonds ethical?",
    answer:
      "Many buyers choose lab-grown diamonds because they avoid traditional mining and provide greater supply chain transparency.",
    referenceUrl:
      "https://www.igi.org/lab-grown-diamonds/lab-created-diamonds/",
    referenceLabel: "IGI — Lab-created diamonds",
  },
  {
    id: "sparkle",
    question: "Do lab-grown diamonds sparkle like natural diamonds?",
    answer:
      "Absolutely. They possess the same brilliance, fire, and sparkle because they share the same crystal structure.",
    referenceUrl:
      "https://www.igi.org/lab-grown-diamonds/lab-created-diamonds/",
    referenceLabel: "IGI — Brilliance & structure",
  },
  {
    id: "durable",
    question:
      "Are lab-grown diamonds durable enough for everyday wear?",
    answer:
      "Yes. Lab-grown diamonds rank 10 on the Mohs hardness scale, making them ideal for daily wear.",
  },
  {
    id: "created",
    question: "How are lab-grown diamonds created?",
    answer:
      "Most are created using Chemical Vapor Deposition (CVD) or High Pressure High Temperature (HPHT). Both methods produce genuine diamonds.",
    referenceUrl:
      "https://www.igi.org/lab-grown-diamonds/lab-created-diamonds/",
    referenceLabel: "IGI — Creation methods",
  },
  {
    id: "choosing",
    question: "Why are more people choosing lab-grown diamonds?",
    answer:
      "Modern consumers appreciate their value, sustainability, certification, and ability to access larger diamonds without compromise.",
  },
  {
    id: "bianca-certification",
    question: "Do Bianca Diamonds pieces come with certification?",
    answer: `Yes. ${BIANCA_IGI_CERTIFICATION_POLICY} Each piece is delivered with clear quality specifications and the corresponding IGI documentation.`,
  },
  {
    id: "delhi-ncr",
    question:
      "Does Bianca Diamonds serve Delhi NCR for lab-grown diamond jewellery?",
    answer:
      "Yes. Bianca Diamonds is a Delhi-rooted lab-grown diamond jewellery house serving clients across Delhi NCR — including Delhi, Gurugram, Noida, Faridabad, and Ghaziabad — with private consultations and delivery across India.",
  },
];

export const LAB_GROWN_FOUR_CS = [
  {
    id: "cut",
    title: "Cut",
    description: "Determines sparkle and brilliance.",
    icon: "sparkles" as const,
  },
  {
    id: "color",
    title: "Color",
    description: "Measures whiteness and tint.",
    icon: "palette" as const,
  },
  {
    id: "clarity",
    title: "Clarity",
    description: "Measures internal inclusions.",
    icon: "scan" as const,
  },
  {
    id: "carat",
    title: "Carat",
    description: "Measures diamond weight.",
    icon: "scale" as const,
  },
];

export const LAB_GROWN_CERTIFICATION_LINKS = [
  {
    name: "IGI",
    url: "https://www.igi.org/",
    description: "International Gemological Institute",
  },
  {
    name: "GIA",
    url: "https://www.gia.edu/",
    description: "Gemological Institute of America",
  },
];

export const ORGANIZATION_SCHEMA = {
  name: "Bianca Diamonds",
  url: "https://www.biancadiamonds.com",
  email: "bianca.labdiamonds@gmail.com",
  description:
    "Delhi-rooted lab-grown diamond jewellers serving Delhi NCR. Every Bianca Diamonds lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat.",
};
