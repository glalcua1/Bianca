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

/** White diamonds vs fancy diamonds / coloured gemstones — used by salon filters. */
function addStoneToneTags(tags: Set<string>, prose: string): void {
  const hasFancy =
    tags.has("stone-colour-pink") ||
    tags.has("stone-colour-canary") ||
    tags.has("canary") ||
    tags.has("stone-colour-sapphire") ||
    tags.has("stone-colour-ruby") ||
    // Prefer prose over the "emerald" keyword tag — that also matches emerald-cut diamonds.
    /\bemerald(?!\s*-?\s*cut)\b/i.test(prose) ||
    /\bsapphire\b/i.test(prose) ||
    /\bruby\b|\brubies\b/i.test(prose) ||
    /\bpink\s+(diamond|sapphire)/i.test(prose) ||
    /\b(yellow|blue|green|fancy)\s+diamond/i.test(prose) ||
    /\bcanary\b/i.test(prose) ||
    /\b(coloured|colored)\s+diamond/i.test(prose);

  tags.add(hasFancy ? "stone-tone-fancy" : "stone-tone-white");
}

function addMetalTags(tags: Set<string>, piece: AtelierPiece, prose: string): void {
  if (piece.metalVariants?.length) {
    for (const variant of piece.metalVariants) {
      tags.add(variant.id);
    }
  }

  if (
    !tags.has("yellow-gold") &&
    !tags.has("white-gold") &&
    !tags.has("rose-gold") &&
    /\bgold\b/i.test(prose)
  ) {
    // Maison default when colour is unspecified
    tags.add("yellow-gold");
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
  white: ["white-gold", "platinum", "stone-tone-white", "white diamond"],
  yellow: ["yellow-gold", "canary"],
  rose: ["rose-gold"],
  fancy: ["stone-tone-fancy", "canary", "pink", "sapphire", "ruby", "emerald"],
  gemstone: ["stone-tone-fancy", "emerald", "sapphire", "ruby"],
  diamond: ["brilliant", "igi", "lab-grown", "stone-tone-white"],
  green: ["emerald", "stone-colour-emerald", "stone-tone-fancy"],
  blue: ["sapphire", "stone-colour-sapphire", "stone-tone-fancy"],
  red: ["ruby", "stone-colour-ruby", "stone-tone-fancy"],
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
  addStoneToneTags(tags, prose);
  addMetalTags(tags, piece, prose);

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

/** Same two groups for every category — stone tone and metal. */
export function getFilterGroups(
  _category: JewelleryCategoryId | "all",
): AtelierFilterGroup[] {
  return [
    {
      id: "stone",
      label: "Stone",
      options: [
        { id: "stone-tone-white", label: "White diamonds" },
        { id: "stone-tone-fancy", label: "Fancy diamonds & gemstones" },
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
  ];
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
    // Product codes typed with spaces/hyphens: "BD G RG 054" → also match compact forms
    const compact = token.replace(/-/g, "");
    if (compact !== token && compact.length > 2) expanded.add(compact);
  }

  // Whole-query compact product code (e.g. "bd-g-rg-054" / "BDGRG054")
  const codeCompact = normalized.replace(/[\s-]/g, "");
  if (codeCompact.length >= 4) expanded.add(codeCompact);

  return [...expanded];
}

function normalizeProductCode(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function scoreNaturalLanguageSearch(
  entry: AtelierCatalogEntry,
  query: string,
): number {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return 1;

  const title = entry.piece.title.toLowerCase();
  const code = entry.piece.productCode.toLowerCase();
  const codeCompact = normalizeProductCode(entry.piece.productCode);
  const queryCompact = normalizeProductCode(query);
  let score = 0;

  if (queryCompact.length >= 4 && codeCompact.includes(queryCompact)) {
    score += 24;
  }
  if (queryCompact.length >= 6 && codeCompact === queryCompact) {
    score += 40;
  }

  for (const token of tokens) {
    if (title.includes(token)) score += 6;
    if (entry.searchText.includes(token)) score += 3;
    if (entry.tags.has(token)) score += 4;
    if (code.includes(token) || codeCompact.includes(token.replace(/-/g, ""))) {
      score += 8;
    }
  }

  const phrase = query.toLowerCase().trim();
  if (phrase.length > 2 && entry.searchText.includes(phrase)) {
    score += 10;
  }

  // Multi-word queries: boost when every raw word hits (more precise ranking)
  const rawWords = phrase.split(/\s+/).filter((word) => word.length > 1);
  if (rawWords.length > 1) {
    const allHit = rawWords.every(
      (word) =>
        title.includes(word) ||
        entry.searchText.includes(word) ||
        code.includes(word) ||
        codeCompact.includes(word.replace(/-/g, "")),
    );
    if (allHit) score += 16;
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
