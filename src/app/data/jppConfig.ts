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

/** Public Bianca JPP campaign configuration (safe for the browser). */
export const JPP_PATH = "/jewellery-purchase-plan";

export const JPP_SEO = {
  title: "Bianca Jewellery Purchase Plan | Bianca Diamonds",
  description:
    "Start your Jewellery Purchase Plan with Bianca Diamonds and take a simple step towards owning your dream jewellery.",
  canonical: "https://www.biancadiamonds.com/jewellery-purchase-plan",
  ogImage: "https://www.biancadiamonds.com/og-image.png",
};

export const JPP_COPY = {
  eyebrow: "Bianca Jewellery Purchase Plan",
  headline: "Your Dream Jewellery, Made Easier.",
  support:
    "Start your Bianca Jewellery Purchase Plan and take a simple step towards owning the jewellery you've always wanted.",
  primaryCta: "Register for Bianca JPP",
  secondaryCta: "How It Works",
  successHeadline: "Welcome to Your Bianca JPP Journey.",
  successMessage:
    "Your Bianca Jewellery Purchase Plan registration is complete.",
  activateMessage:
    "Please call Bianca Diamonds to activate your plan and begin your monthly installment journey.",
  jppRevealLead: "Your Bianca JPP Number is",
  jppRevealNote:
    "Save this number. You'll need it when you contact Bianca.",
  paymentSafety:
    "Important: Please verify the bank details displayed on this page and contact Bianca Diamonds before making your first payment.",
  paymentGuide:
    "Please call Bianca Diamonds before making your first transfer so we can activate your Bianca JPP account and guide you through the process.",
  paymentReference:
    "Please use your Bianca JPP number as your payment reference wherever possible.",
  duplicateMessage:
    "It looks like you already have a Bianca JPP account.",
};

export const JPP_STEPS = [
  {
    step: "01",
    title: "Register",
    body: "Enter your name and mobile number to create your Bianca JPP account.",
  },
  {
    step: "02",
    title: "Get Your Bianca JPP Number",
    body: "Receive a unique JPP number instantly after registration.",
  },
  {
    step: "03",
    title: "Call Bianca",
    body: "Contact the Bianca team to activate your plan and receive guidance on starting your monthly installment.",
  },
  {
    step: "04",
    title: "Start Your Journey",
    body: "Transfer your monthly installment to the designated Bianca bank account and keep your JPP number as your reference.",
  },
] as const;

/** Plan terms placeholders — replace when Bianca finalises commercial rules. */
export const JPP_PLAN_PLACEHOLDERS = {
  minimumInstallment: "[Minimum monthly installment — to be confirmed]",
  duration: "[Plan duration — to be confirmed]",
  redemptionNote:
    "[Redemption benefit / bonus — to be confirmed by Bianca Diamonds]",
};

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
