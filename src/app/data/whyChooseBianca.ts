export const WHY_CHOOSE_BIANCA_PATH = "/why-bianca-diamonds";

export const WHY_CHOOSE_BIANCA_SEO = {
  title:
    "Why Choose Bianca Diamonds? | Luxury Lab Grown Diamond Jewellery",
  description:
    "Every Bianca Diamonds lab-grown diamond is individually IGI certified. Modern design, personal consultation, and clients across India and the USA.",
};

/** Scannable proof — keep short; do not restate these in later section body copy. */
export const WHY_TRUST_PILLARS = [
  {
    id: "igi",
    title: "IGI Certified",
    description: "Every diamond individually graded",
  },
  {
    id: "gold",
    title: "14KT & 18KT Gold",
    description: "BIS hallmarked",
  },
  {
    id: "custom",
    title: "Made Around You",
    description: "Salon pieces or fully bespoke",
  },
  {
    id: "timeline",
    title: "15–30 Days",
    description: "Typical custom timeline",
  },
] as const;

/**
 * Distinct reasons — not a restatement of the trust strip.
 * Each pillar should advance a different idea: vision, aesthetic, guidance.
 */
export const WHY_DIFFERENCE_PILLARS = [
  {
    id: "vision",
    number: "01",
    title: "We start with your vision",
    description:
      "Bring a reference, a sketch, or simply the occasion. We shape the piece around what you want—not a fixed inventory list.",
  },
  {
    id: "aesthetics",
    number: "02",
    title: "Designs that feel current",
    description:
      "Contemporary silhouettes and considered proportions—jewellery that reads as elegant now, and still yours years on.",
  },
  {
    id: "guidance",
    number: "03",
    title: "Guidance without pressure",
    description:
      "One consultant walks you through diamond, design, and finish—clear options, no upselling theatre.",
  },
] as const;

export const WHY_CUSTOM_STEPS = [
  {
    id: "diamond",
    number: "01",
    title: "Choose Your Diamond",
    details: "Shape · Size · Colour · Clarity",
  },
  {
    id: "design",
    number: "02",
    title: "Define Your Design",
    details: "Setting · Gold · Details",
  },
  {
    id: "refine",
    number: "03",
    title: "Refine Your Piece",
    details: "Proportions · Finish · Personalisation",
  },
  {
    id: "craft",
    number: "04",
    title: "We Craft It",
    details: "Your finished Bianca piece",
  },
] as const;

export const WHY_FOUR_CS = [
  {
    id: "carat",
    title: "Carat",
    description: "Size and presence",
  },
  {
    id: "cut",
    title: "Cut",
    description: "Proportions and fire",
  },
  {
    id: "colour",
    title: "Colour",
    description: "Colourless to fancy hues",
  },
  {
    id: "clarity",
    title: "Clarity",
    description: "Purity of the stone",
  },
] as const;

export const WHY_DIAMOND_SHAPES = [
  { id: "round", title: "Round" },
  { id: "oval", title: "Oval" },
  { id: "marquise", title: "Marquise" },
  { id: "emerald", title: "Emerald" },
] as const;

export const WHY_FANCY_COLOURS = [
  { id: "blue", title: "Blue", tone: "#5b7ea6" },
  { id: "pink", title: "Pink", tone: "#c4879a" },
  { id: "yellow", title: "Yellow", tone: "#c9b06a" },
] as const;

export const WHY_TIMELINE_STEPS = [
  { id: "design", label: "Design" },
  { id: "approval", label: "Approval" },
  { id: "crafting", label: "Crafting" },
  { id: "qc", label: "Quality Check" },
  { id: "delivery", label: "Delivery" },
] as const;

export type WhyTestimonial = {
  id: string;
  quote: string;
  name: string;
  locale: string;
};

/** Client voices — place after proof, before the final ask. */
export const WHY_TESTIMONIALS: WhyTestimonial[] = [
  {
    id: "usa-everyday",
    quote:
      "My Bianca piece arrived exactly as we planned—and I wear it every day. It still feels special each morning.",
    name: "Sarah M.",
    locale: "New York, USA",
  },
  {
    id: "india-brands",
    quote:
      "I looked at several big jewellery brands before deciding. Bianca won for the designs—and for a consultant who actually listened.",
    name: "Ananya R.",
    locale: "Mumbai, India",
  },
  {
    id: "usa-gift",
    quote:
      "We wanted something beautiful we could gift with confidence. The quality and finish are what she reaches for most days.",
    name: "Emily T.",
    locale: "California, USA",
  },
  {
    id: "india-bespoke",
    quote:
      "From first call to final piece, the experience felt personal. I never felt rushed—only guided toward something that felt like me.",
    name: "Priya K.",
    locale: "Bengaluru, India",
  },
] as const;

export const WHY_DRAWER_HIGHLIGHTS = [
  {
    id: "certified",
    title: "IGI Certified Diamonds",
    description:
      "Every Bianca Diamonds lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat—so you buy with confidence.",
  },
  {
    id: "personal",
    title: "Made Around You",
    description:
      "From diamond selection to completely custom pieces, jewellery designed for your story.",
  },
  {
    id: "modern",
    title: "Modern Luxury",
    description:
      "Contemporary design, personal service, and a digital-first model that puts more into the jewellery itself.",
  },
  {
    id: "timeline",
    title: "15–30 Day Crafting",
    description:
      "A clear custom jewellery timeline, guided one-to-one from first idea to delivery.",
  },
] as const;
