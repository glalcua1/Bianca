import type { AtelierPiece, JewelleryCategoryId } from "../data/fineJewelleryCollections";
import {
  getEarringQuote,
  getParureQuotesForNecklace,
} from "../data/necklaceQuotes";
import { getRingQuote } from "../data/ringQuotes";

export type AtelierFilterOption = {
  id: string;
  label: string;
};

export type AtelierFilterGroup = {
  id: string;
  label: string;
  options: AtelierFilterOption[];
};

export type AtelierCatalogEntry = {
  piece: AtelierPiece;
  tags: Set<string>;
  searchText: string;
  salonPriceInr: number | null;
};

const KEYWORD_TAGS: { tag: string; patterns: RegExp[] }[] = [
  { tag: "yellow-gold", patterns: [/yellow gold/i, /yellow-gold/i] },
  { tag: "white-gold", patterns: [/white gold/i, /white-gold/i, /platinum/i] },
  { tag: "rose-gold", patterns: [/rose gold/i, /rose-gold/i] },
  { tag: "tri-tone", patterns: [/tri-tone/i, /three tone/i, /yellow, white, and rose/i] },
  { tag: "emerald", patterns: [/emerald/i] },
  { tag: "sapphire", patterns: [/sapphire/i] },
  { tag: "ruby", patterns: [/ruby|rubies/i] },
  { tag: "marquise", patterns: [/marquise/i] },
  { tag: "pear", patterns: [/pear/i] },
  { tag: "princess", patterns: [/princess/i] },
  { tag: "oval", patterns: [/oval/i] },
  { tag: "cushion", patterns: [/cushion/i] },
  { tag: "canary", patterns: [/canary/i, /yellow diamond/i, /fancy yellow/i] },
  { tag: "solitaire", patterns: [/solitaire/i] },
  { tag: "halo", patterns: [/halo/i] },
  { tag: "bypass", patterns: [/bypass/i] },
  { tag: "trilogy", patterns: [/trilogy/i, /three-stone/i, /three stone/i] },
  { tag: "geometric", patterns: [/geometric/i, /octagonal/i, /architectural/i] },
  { tag: "cluster", patterns: [/cluster/i, /sunburst/i, /starburst/i] },
  { tag: "statement", patterns: [/statement/i, /cocktail/i, /gala/i, /red-carpet/i] },
  { tag: "pave", patterns: [/pav[eé]/i, /micro-pavé/i] },
  { tag: "drop", patterns: [/drop/i, /fringe/i, /cascade/i] },
  { tag: "chandelier", patterns: [/chandelier/i] },
  { tag: "stud", patterns: [/stud/i, /station/i] },
  { tag: "collar", patterns: [/collar/i] },
  { tag: "riviere", patterns: [/rivière|riviere|river/i] },
  { tag: "pendant-line", patterns: [/pendant/i, /suspended/i] },
  { tag: "tennis", patterns: [/tennis/i] },
  { tag: "bangle", patterns: [/bangle/i, /cuff/i] },
  { tag: "art-deco", patterns: [/art deco/i] },
  { tag: "bridal", patterns: [/bridal/i, /wedding/i, /proposal/i, /engagement/i] },
  { tag: "everyday", patterns: [/every day/i, /everyday/i, /daily/i] },
  { tag: "evening", patterns: [/evening/i, /celebration/i] },
  { tag: "stone-colour-pink", patterns: [/pink diamond/i, /pink sapphire/i, /\bpink\b/i] },
];

const STONE_COLOUR_FROM_TYPE: Record<string, string> = {
  emerald: "stone-colour-emerald",
  sapphire: "stone-colour-sapphire",
  ruby: "stone-colour-ruby",
  canary: "stone-colour-canary",
};

function addStoneColourTags(
  tags: Set<string>,
  prose: string,
  quote?: { colourStones: string[] | null },
): void {
  for (const [typeTag, colourTag] of Object.entries(STONE_COLOUR_FROM_TYPE)) {
    if (tags.has(typeTag)) tags.add(colourTag);
  }
  if (
    /pink/i.test(prose) ||
    quote?.colourStones?.some((code) => /pink/i.test(code))
  ) {
    tags.add("stone-colour-pink");
  }

  const hasGemColour = [
    "stone-colour-emerald",
    "stone-colour-sapphire",
    "stone-colour-ruby",
    "stone-colour-canary",
    "stone-colour-pink",
  ].some((tag) => tags.has(tag));

  if (!hasGemColour && /diamond|brilliant/i.test(prose)) {
    tags.add("stone-colour-white");
  }
}

const SEARCH_SYNONYMS: Record<string, string[]> = {
  engagement: ["solitaire", "proposal", "bridal", "wedding", "ring"],
  wedding: ["bridal", "solitaire", "band"],
  proposal: ["solitaire", "bridal", "engagement"],
  gala: ["evening", "statement", "chandelier", "cocktail"],
  party: ["evening", "statement", "cocktail"],
  everyday: ["classic", "station", "minimal"],
  minimal: ["geometric", "solitaire", "classic"],
  gold: ["yellow-gold", "white-gold", "rose-gold", "18k", "18kt"],
  white: ["white-gold", "platinum"],
  yellow: ["yellow-gold", "canary"],
  rose: ["rose-gold"],
  diamond: ["brilliant", "igi", "lab-grown"],
  green: ["emerald", "stone-colour-emerald"],
  blue: ["sapphire", "stone-colour-sapphire"],
  red: ["ruby", "stone-colour-ruby"],
  teardrop: ["pear", "drop"],
  round: ["brilliant", "solitaire"],
  square: ["princess", "emerald cut"],
  expensive: ["statement", "haute"],
  affordable: ["entry", "everyday"],
  under: ["entry"],
  luxury: ["statement", "haute", "high-jewellery"],
};

function addKeywordTags(text: string, tags: Set<string>): void {
  for (const { tag, patterns } of KEYWORD_TAGS) {
    if (patterns.some((pattern) => pattern.test(text))) {
      tags.add(tag);
    }
  }
}

function ringPriceBand(salonPriceInr: number): string {
  if (salonPriceInr <= 75_000) return "price-entry";
  if (salonPriceInr <= 125_000) return "price-maison";
  return "price-haute";
}

export function buildCatalogEntry(piece: AtelierPiece): AtelierCatalogEntry {
  const tags = new Set<string>([piece.category]);
  if (piece.braceletKind) tags.add(piece.braceletKind);

  const prose = `${piece.title} ${piece.description} ${piece.alt} ${piece.productCode}`;
  addKeywordTags(prose, tags);

  let salonPriceInr: number | null = null;
  const ringQuote =
    piece.category === "rings" ? getRingQuote(piece.productCode) : undefined;
  const parureQuotes =
    piece.category === "necklaces"
      ? getParureQuotesForNecklace(piece.productCode)
      : undefined;
  const earringQuote =
    piece.category === "earrings"
      ? getEarringQuote(piece.productCode)
      : undefined;

  if (ringQuote) {
    salonPriceInr = ringQuote.priceInr;
    tags.add(ringPriceBand(salonPriceInr));
    addKeywordTags(
      `${ringQuote.metal} ${ringQuote.diamondShapes} ${ringQuote.centreStone ?? ""}`,
      tags,
    );
    if (ringQuote.metal.includes("white")) tags.add("white-gold");
    if (ringQuote.metal.includes("yellow")) tags.add("yellow-gold");
    if (ringQuote.metal.includes("rose")) tags.add("rose-gold");
    if (ringQuote.metal.includes("tri-tone") || ringQuote.metal.includes("&")) {
      tags.add("tri-tone");
    }
  } else if (parureQuotes) {
    salonPriceInr =
      parureQuotes.necklace.priceInr + (parureQuotes.earrings?.priceInr ?? 0);
    tags.add(ringPriceBand(salonPriceInr));
    addKeywordTags(
      `${parureQuotes.necklace.metal} ${parureQuotes.necklace.diamondShapes} ${parureQuotes.necklace.centreStone ?? ""}`,
      tags,
    );
    if (parureQuotes.necklace.metal.includes("yellow")) tags.add("yellow-gold");
    if (parureQuotes.earrings) tags.add("parure");
  } else if (earringQuote) {
    salonPriceInr = earringQuote.priceInr;
    tags.add(ringPriceBand(salonPriceInr));
    addKeywordTags(
      `${earringQuote.metal} ${earringQuote.diamondShapes} ${earringQuote.centreStone ?? ""}`,
      tags,
    );
    if (earringQuote.metal.includes("yellow")) tags.add("yellow-gold");
  } else if (piece.salonPriceInr) {
    salonPriceInr = piece.salonPriceInr;
    tags.add(ringPriceBand(salonPriceInr));
  }

  addStoneColourTags(tags, prose, ringQuote);

  const searchText = [
    prose,
    ringQuote?.metal,
    ringQuote?.diamondShapes,
    ringQuote?.centreStone,
    parureQuotes?.necklace.metal,
    parureQuotes?.necklace.diamondShapes,
    parureQuotes?.necklace.centreStone,
    parureQuotes?.necklace.styleCode,
    parureQuotes?.earrings?.styleCode,
    earringQuote?.metal,
    earringQuote?.diamondShapes,
    earringQuote?.centreStone,
    ringQuote?.styleCode,
    salonPriceInr ? `₹${salonPriceInr}` : null,
    [...tags].join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return { piece, tags, searchText, salonPriceInr };
}

export function getFilterGroups(
  category: JewelleryCategoryId | "all",
): AtelierFilterGroup[] {
  const stoneColour: AtelierFilterGroup = {
    id: "stone-colour",
    label: "Stone colour",
    options: [
      { id: "stone-colour-white", label: "White diamond" },
      { id: "stone-colour-canary", label: "Canary" },
      { id: "stone-colour-emerald", label: "Emerald" },
      { id: "stone-colour-sapphire", label: "Sapphire" },
      { id: "stone-colour-ruby", label: "Ruby" },
      { id: "stone-colour-pink", label: "Pink" },
    ],
  };

  const sharedStone: AtelierFilterGroup = {
    id: "stone",
    label: "Stone",
    options: [
      { id: "emerald", label: "Emerald" },
      { id: "sapphire", label: "Sapphire" },
      { id: "ruby", label: "Ruby" },
      { id: "marquise", label: "Marquise" },
      { id: "pear", label: "Pear" },
      { id: "canary", label: "Canary" },
    ],
  };

  switch (category) {
    case "rings":
      return [
        {
          id: "metal",
          label: "Metal",
          options: [
            { id: "yellow-gold", label: "Yellow gold" },
            { id: "white-gold", label: "White gold" },
            { id: "rose-gold", label: "Rose gold" },
            { id: "tri-tone", label: "Tri-tone" },
          ],
        },
        {
          id: "style",
          label: "Silhouette",
          options: [
            { id: "solitaire", label: "Solitaire" },
            { id: "halo", label: "Halo" },
            { id: "bypass", label: "Bypass" },
            { id: "trilogy", label: "Trilogy" },
            { id: "geometric", label: "Geometric" },
            { id: "cluster", label: "Cluster" },
            { id: "statement", label: "Statement" },
          ],
        },
        {
          id: "price",
          label: "Salon guide",
          options: [
            { id: "price-entry", label: "Up to ₹75k" },
            { id: "price-maison", label: "₹75k – ₹1.25L" },
            { id: "price-haute", label: "Above ₹1.25L" },
          ],
        },
        {
          id: "stone",
          label: "Centre stone",
          options: [
            { id: "emerald", label: "Emerald" },
            { id: "marquise", label: "Marquise" },
            { id: "pear", label: "Pear" },
            { id: "princess", label: "Princess" },
            { id: "oval", label: "Oval" },
            { id: "cushion", label: "Cushion" },
            { id: "canary", label: "Canary" },
          ],
        },
        stoneColour,
      ];
    case "earrings":
      return [
        {
          id: "silhouette",
          label: "Silhouette",
          options: [
            { id: "drop", label: "Drop" },
            { id: "chandelier", label: "Chandelier" },
            { id: "stud", label: "Stud & line" },
          ],
        },
        sharedStone,
        stoneColour,
        {
          id: "moment",
          label: "Occasion",
          options: [
            { id: "evening", label: "Evening" },
            { id: "bridal", label: "Bridal" },
            { id: "everyday", label: "Every day" },
          ],
        },
      ];
    case "necklaces":
      return [
        {
          id: "silhouette",
          label: "Silhouette",
          options: [
            { id: "collar", label: "Collar" },
            { id: "riviere", label: "Rivière" },
            { id: "drop", label: "Fringe & drop" },
            { id: "pendant-line", label: "Pendant" },
            { id: "stud", label: "Station" },
          ],
        },
        sharedStone,
        stoneColour,
        {
          id: "moment",
          label: "Occasion",
          options: [
            { id: "evening", label: "Evening" },
            { id: "statement", label: "Statement" },
            { id: "everyday", label: "Every day" },
          ],
        },
      ];
    case "bracelets":
      return [
        {
          id: "form",
          label: "Form",
          options: [
            { id: "tennis", label: "Tennis line" },
            { id: "bracelet", label: "Bangle & cuff" },
            { id: "bangle", label: "Wide bangle" },
          ],
        },
        {
          id: "metal",
          label: "Metal",
          options: [
            { id: "yellow-gold", label: "Yellow gold" },
            { id: "white-gold", label: "White gold" },
            { id: "rose-gold", label: "Rose gold" },
          ],
        },
        sharedStone,
        stoneColour,
      ];
    case "pendants":
      return [
        sharedStone,
        stoneColour,
        {
          id: "moment",
          label: "Occasion",
          options: [
            { id: "everyday", label: "Every day" },
            { id: "evening", label: "Evening" },
            { id: "bridal", label: "Bridal" },
          ],
        },
      ];
    case "for-him":
      return [
        {
          id: "metal",
          label: "Metal",
          options: [
            { id: "yellow-gold", label: "Yellow gold" },
            { id: "white-gold", label: "White gold" },
          ],
        },
        {
          id: "moment",
          label: "Occasion",
          options: [
            { id: "everyday", label: "Every day" },
            { id: "statement", label: "Statement" },
          ],
        },
      ];
    default:
      return [];
  }
}

function tokenizeQuery(query: string): string[] {
  const normalized = query
    .toLowerCase()
    .replace(/[₹,]/g, " ")
    .replace(/[^\w\s-]/g, " ")
    .trim();

  if (!normalized) return [];

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set<string>(tokens);

  for (const token of tokens) {
    for (const synonym of SEARCH_SYNONYMS[token] ?? []) {
      expanded.add(synonym.toLowerCase());
    }
    if (token.endsWith("s") && token.length > 3) {
      expanded.add(token.slice(0, -1));
    }
  }

  return [...expanded];
}

export function scoreNaturalLanguageSearch(
  entry: AtelierCatalogEntry,
  query: string,
): number {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return 1;

  const title = entry.piece.title.toLowerCase();
  let score = 0;

  for (const token of tokens) {
    if (title.includes(token)) score += 6;
    if (entry.searchText.includes(token)) score += 3;
    if (entry.tags.has(token)) score += 4;
    if (entry.piece.productCode.toLowerCase().includes(token)) score += 8;
  }

  const phrase = query.toLowerCase().trim();
  if (phrase.length > 2 && entry.searchText.includes(phrase)) {
    score += 10;
  }

  return score;
}

export type SelectedAtelierFilters = Record<string, string[]>;

export function pieceMatchesFilters(
  entry: AtelierCatalogEntry,
  selected: SelectedAtelierFilters,
): boolean {
  for (const optionIds of Object.values(selected)) {
    if (optionIds.length === 0) continue;
    if (!optionIds.some((id) => entry.tags.has(id))) return false;
  }
  return true;
}

export function hasActiveSalonFilters(
  query: string,
  selected: SelectedAtelierFilters,
): boolean {
  if (query.trim()) return true;
  return Object.values(selected).some((ids) => ids.length > 0);
}

export function clearSelectedFilters(
  groups: AtelierFilterGroup[],
): SelectedAtelierFilters {
  return Object.fromEntries(groups.map((group) => [group.id, []]));
}
