import {
  BIANCA_PHONE_DISPLAY,
  BIANCA_PHONE_TEL,
  BIANCA_WHATSAPP_CONTACT_NUMBER,
} from "./siteContact";

function env(name: string, fallback = ""): string {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

/** Public Jewellery Purchase Plan campaign configuration (safe for the browser). */
export const JPP_PATH = "/jewellery-purchase-plan";

/** One-line Fine Jewellery hero invite — keep short; do not expand into a second sentence. */
export const FINE_JEWELLERY_JPP_CTA = {
  href: JPP_PATH,
  label: "Own yours with ease — Jewellery Purchase Plan →",
} as const;

export const JPP_HERO_VIDEO =
  "/hf_20260717_034508_b9a6d8dc-5d27-497c-989f-45c42255784d.mp4";

export const JPP_SEO = {
  title: "Bianca Jewellery Purchase Plan | Bianca Diamonds",
  description:
    "Enrol in the Bianca Jewellery Purchase Plan. Set a monthly installment from ₹5,000 to ₹3,00,000, receive a personal plan ID, and call Bianca to begin.",
  canonical: "https://www.biancadiamonds.com/jewellery-purchase-plan",
  ogImage: "https://www.biancadiamonds.com/og-image.png",
};

export const JPP_COPY = {
  eyebrow: "Bianca Diamonds",
  headline: "Your Dream Jewellery, Made Easier.",
  support:
    "The Bianca Jewellery Purchase Plan helps you build towards the piece you love — with personal guidance, a dedicated plan ID, and a clear path to ownership.",
  primaryCta: "Call Now to Enrol",
  secondaryCta: "Explore the Plans",
  calculatorEyebrow: "Plan calculator",
  calculatorTitle: "See what your monthly installment becomes.",
  calculatorSupport:
    "Enter a monthly amount. We multiply your contribution by eleven, add one month from Bianca Diamonds, and show your total jewellery value.",
};

/** Plan 1 commercial rules */
export const JPP_PLAN_ONE = {
  id: "fixed",
  label: "Plan 01",
  title: "Fixed Monthly Installment",
  summary:
    "Choose a monthly installment from ₹5,000 to ₹3,00,000. Pay for eleven months; Bianca contributes the twelfth. In the thirteenth month, purchase your jewellery.",
  points: [
    "Monthly installment from ₹5,000 to ₹3,00,000",
    "You pay for 11 months",
    "12th month installment from Bianca Diamonds",
    "Purchase in the 13th month",
    "A unique plan ID tracks every installment",
  ],
  cta: "Call Now",
} as const;

/** Plan 2 commercial rules */
export const JPP_PLAN_TWO = {
  id: "flexible",
  label: "Plan 02",
  title: "Flexible Monthly Amount",
  summary:
    "Not sure of a fixed amount? Contribute as you please across twelve months. At the end, buy jewellery for the accumulated amount.",
  points: [
    "Contribute any amount, month to month",
    "Continue for 12 months",
    "Buy jewellery for the total accumulated",
    "A unique plan ID tracks every transfer",
  ],
  cta: "Call Now",
} as const;

export const JPP_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Choose Your Plan",
    body: "Select a fixed monthly installment or a flexible contribution journey.",
  },
  {
    step: "02",
    title: "Call Bianca",
    body: "Speak with our team to enrol. We create your personal Jewellery Purchase Plan ID.",
  },
  {
    step: "03",
    title: "Begin Installments",
    body: "Transfer each month against your plan ID. Every payment is recorded against your journey.",
  },
  {
    step: "04",
    title: "Own Your Jewellery",
    body: "At maturity, choose jewellery or loose diamonds for your plan value — never cash.",
  },
] as const;

export const JPP_TERMS = [
  "The Bianca Jewellery Purchase Plan may only be redeemed against jewellery or loose diamonds from Bianca Diamonds.",
  "This plan cannot be redeemed in cash under any circumstances.",
  "A unique plan ID is issued upon enrolment and must be referenced for all installments.",
  "For Plan 01, monthly installments range from ₹5,000 to ₹3,00,000 for eleven months, with the twelfth month contributed by Bianca Diamonds; jewellery may be purchased in the thirteenth month.",
  "For Plan 02, contributions may vary month to month across twelve months; jewellery may be purchased for the accumulated amount at the end of the plan.",
  "Please call Bianca Diamonds before making your first transfer so we can activate your plan and guide you.",
] as const;

export const JPP_CALCULATOR = {
  minMonthly: 5_000,
  maxMonthly: 300_000,
  customerMonths: 11,
  biancaMonths: 1,
  purchaseMonth: 13,
} as const;

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getJppPublicConfig() {
  const phone =
    env("VITE_BIANCA_PHONE_NUMBER") || BIANCA_PHONE_DISPLAY;
  const whatsapp =
    env("VITE_BIANCA_WHATSAPP_NUMBER") || BIANCA_WHATSAPP_CONTACT_NUMBER;
  const ifsc = env("VITE_BIANCA_JPP_IFSC");

  return {
    phoneDisplay: phone.startsWith("+")
      ? phone
      : `+${phone.replace(/\D/g, "")}`,
    phoneTel:
      env("VITE_BIANCA_PHONE_TEL") ||
      (phone.includes("tel:")
        ? phone
        : phone
          ? `tel:+${phone.replace(/\D/g, "")}`
          : BIANCA_PHONE_TEL),
    whatsappDigits: whatsapp.replace(/\D/g, ""),
    bank: {
      name: env("VITE_BIANCA_JPP_BANK_NAME", "HDFC Bank"),
      accountNumber: env(
        "VITE_BIANCA_JPP_ACCOUNT_NUMBER",
        "5278800615257",
      ),
      ifsc,
      ifscConfigured: Boolean(ifsc),
      accountType: env("VITE_BIANCA_JPP_ACCOUNT_TYPE", "Current"),
    },
  };
}

/** Types retained for admin / API clients */
export type JppPublicCustomer = {
  fullName: string;
  mobileNumber: string;
  email: string | null;
  jppNumber: string;
  status: string;
  createdAt: string;
};

export type JppPaymentDetails = {
  bankName: string;
  accountNumber: string;
  ifsc: string | null;
  ifscConfigured: boolean;
  accountType: string;
};
