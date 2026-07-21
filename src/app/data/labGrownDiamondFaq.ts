export const LAB_GROWN_FAQ_PATH = "/lab-grown-diamond-faq";

export const LAB_GROWN_FAQ_SEO = {
  title:
    "Lab-Grown Diamond FAQs | Everything You Need to Know | Bianca Diamonds",
  description:
    "Explore answers to the most common questions about lab-grown diamonds, certification, quality, sustainability, and value. Learn why modern luxury buyers choose Bianca Diamonds.",
};

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
    description: "IGI Certified Diamonds",
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
    id: "certified",
    question: "Are lab-grown diamonds certified?",
    answer:
      "Yes. Reputable lab-grown diamonds should be certified by recognized gemological laboratories such as IGI or GIA.",
    referenceUrl: "https://www.igi.org/reports/lab-grown-diamond-report/",
    referenceLabel: "IGI — Lab-grown diamond reports",
  },
  {
    id: "igi-meaning",
    question: "What does IGI certification mean?",
    answer:
      "An IGI certificate independently verifies a diamond's cut, color, clarity, carat weight, and origin.",
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
    answer:
      "Yes. Every Bianca Diamonds certified piece includes independent diamond certification where applicable and complete transparency regarding quality specifications.",
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
    "Ethically crafted lab-grown diamond fine jewellery — IGI-certified brilliance, handcrafted for the modern maison.",
};
