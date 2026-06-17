import {
  BIANCA_WHATSAPP_NUMBER,
} from "../data/siteContact";

export type BespokeEnquiryLead = {
  fullName: string;
  email: string;
  phone: string;
  consultationMethod: string;
  jewelleryType: string;
  occasion: string;
  budgetRange: string;
  diamondShape: string;
  vision: string;
  inspirationFileNames: string[];
  sourcePage?: string;
};

export function buildBespokeEnquiryWhatsAppMessage(
  lead: BespokeEnquiryLead,
): string {
  const lines = [
    "Bespoke Jewellery Enquiry — Bianca Diamonds",
    "",
    `Name: ${lead.fullName}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Consultation: ${lead.consultationMethod}`,
    `Jewellery type: ${lead.jewelleryType}`,
    `Occasion: ${lead.occasion}`,
    `Budget: ${lead.budgetRange}`,
    `Preferred diamond shape: ${lead.diamondShape}`,
  ];

  if (lead.vision.trim()) {
    lines.push("", "Vision:", lead.vision.trim());
  }

  if (lead.inspirationFileNames.length > 0) {
    lines.push(
      "",
      `Inspiration images (${lead.inspirationFileNames.length}):`,
      ...lead.inspirationFileNames.map((name) => `• ${name}`),
      "",
      "I will share the inspiration images in this chat.",
    );
  }

  if (lead.sourcePage) {
    lines.push("", `Page: ${lead.sourcePage}`);
  }

  return lines.join("\n");
}

export function buildBespokeEnquiryWhatsAppUrl(
  lead: BespokeEnquiryLead,
): string {
  const text = buildBespokeEnquiryWhatsAppMessage(lead);
  return `https://wa.me/${BIANCA_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
