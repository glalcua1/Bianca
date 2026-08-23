import {
  ATELIER_PIECES,
  FINE_JEWELLERY_CATEGORIES,
  type AtelierPiece,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";
import {
  fineJewelleryCategoryPath,
} from "../data/fineJewelleryMegaMenu";
import {
  buildCatalogEntry,
  scoreNaturalLanguageSearch,
  type AtelierCatalogEntry,
} from "./atelierCatalog";

export type SiteSearchPieceResult = {
  kind: "piece";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score: number;
  piece: AtelierPiece;
};

export type SiteSearchPageResult = {
  kind: "page";
  id: string;
  title: string;
  subtitle: string;
  href: string;
  score: number;
};

export type SiteSearchResult = SiteSearchPieceResult | SiteSearchPageResult;

const CATALOG: AtelierCatalogEntry[] = ATELIER_PIECES.map(buildCatalogEntry);

const SITE_PAGES: {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
}[] = [
  {
    id: "page-fine-jewellery",
    title: "Fine Jewellery",
    subtitle: "Atelier salon · rings, earrings, necklaces & more",
    href: "/fine-jewellery",
    keywords: "fine jewellery jewelry atelier salon collection diamonds",
  },
  ...FINE_JEWELLERY_CATEGORIES.map((category) => ({
    id: `page-${category.id}`,
    title: category.title,
    subtitle: "Fine Jewellery category",
    href: fineJewelleryCategoryPath(category.id),
    keywords: `${category.title} ${category.description} fine jewellery`,
  })),
  {
    id: "page-bespoke",
    title: "Bespoke Jewellery",
    subtitle: "Commission a piece with the house",
    href: "/bespoke-jewellery",
    keywords: "bespoke custom commission made to order atelier design",
  },
  {
    id: "page-butterfly",
    title: "Butterfly Collection",
    subtitle: "Signature butterfly jewellery",
    href: "/butterfly-collection",
    keywords: "butterfly collection emerald sapphire monarch",
  },
  {
    id: "page-cannes",
    title: "Cannes Collection",
    subtitle: "Cannes 2026 showcase",
    href: "/fine-jewellery/cannes-2026",
    keywords: "cannes collection red carpet showcase 2026",
  },
  {
    id: "page-media",
    title: "Media",
    subtitle: "Press, coverage, and gallery",
    href: "/media",
    keywords: "media press coverage news instagram gallery",
  },
  {
    id: "page-contact",
    title: "Contact",
    subtitle: "Book an appointment or reach the house",
    href: "/contact",
    keywords: "contact appointment book visit whatsapp email phone",
  },
  {
    id: "page-why",
    title: "Why Choose Bianca",
    subtitle: "The Bianca difference",
    href: "/why-bianca-diamonds",
    keywords: "why choose bianca lab grown igi sustainability",
  },
  {
    id: "page-faq",
    title: "Lab-Grown Diamond FAQs",
    subtitle: "Answers on quality, certification, and care",
    href: "/lab-grown-diamond-faq",
    keywords: "faq lab grown diamond questions igi certification",
  },
  {
    id: "page-jpp",
    title: "Jewellery Purchase Plan",
    subtitle: "Save toward your piece",
    href: "/jewellery-purchase-plan",
    keywords: "jpp jewellery purchase plan save installment",
  },
  {
    id: "page-bridal",
    title: "Modern Bride",
    subtitle: "Bridal jewellery edit",
    href: "/jewellery-for-modern-bride",
    keywords: "bride bridal wedding engagement modern",
  },
  {
    id: "page-delhi",
    title: "Delhi NCR",
    subtitle: "Lab-grown diamond jewellery in Delhi NCR",
    href: "/lab-grown-diamond-jewellery-delhi-ncr",
    keywords: "delhi ncr gurgaon noida salon visit",
  },
];

function categoryLabel(category: JewelleryCategoryId): string {
  return (
    FINE_JEWELLERY_CATEGORIES.find((item) => item.id === category)?.title ??
    category
  );
}

/** Build salon deep-link with optional query + piece id. */
export function buildAtelierSearchHref(
  query: string,
  options?: { category?: JewelleryCategoryId | "all"; pieceId?: string },
): string {
  const category = options?.category ?? "all";
  const path = fineJewelleryCategoryPath(category);
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);
  if (options?.pieceId) params.set("piece", options.pieceId);
  const qs = params.toString();
  return qs ? `${path}?${qs}#showcase` : `${path}#showcase`;
}

function scorePage(
  page: (typeof SITE_PAGES)[number],
  query: string,
): number {
  const q = query.toLowerCase().trim();
  if (!q) return 0;

  const haystack = `${page.title} ${page.subtitle} ${page.keywords}`.toLowerCase();
  let score = 0;

  if (page.title.toLowerCase() === q) score += 40;
  if (page.title.toLowerCase().includes(q)) score += 18;
  if (haystack.includes(q)) score += 10;

  for (const token of q.split(/\s+/).filter(Boolean)) {
    if (page.title.toLowerCase().includes(token)) score += 6;
    if (haystack.includes(token)) score += 3;
  }

  return score;
}

/**
 * Robust site search: atelier pieces (codes, titles, metals, stones) plus
 * key house pages. Returns ranked results for the nav dropdown.
 */
export function searchSite(query: string, limit = 8): SiteSearchResult[] {
  const trimmed = query.trim();
  if (trimmed.length < 1) return [];

  const pieceResults: SiteSearchPieceResult[] = [];
  for (const entry of CATALOG) {
    const score = scoreNaturalLanguageSearch(entry, trimmed);
    if (score <= 0) continue;
    pieceResults.push({
      kind: "piece",
      id: entry.piece.id,
      title: entry.piece.title,
      subtitle: `${categoryLabel(entry.piece.category)} · ${entry.piece.productCode}`,
      href: buildAtelierSearchHref(trimmed, {
        category: entry.piece.category,
        pieceId: entry.piece.id,
      }),
      score,
      piece: entry.piece,
    });
  }

  pieceResults.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const pageResults: SiteSearchPageResult[] = SITE_PAGES.map((page) => ({
    kind: "page" as const,
    id: page.id,
    title: page.title,
    subtitle: page.subtitle,
    href: page.href,
    score: scorePage(page, trimmed),
  }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  const merged: SiteSearchResult[] = [];
  const seen = new Set<string>();

  // Prefer jewellery hits, then pages — keep diversity in the first slots.
  for (const result of [...pieceResults.slice(0, limit), ...pageResults]) {
    if (merged.length >= limit) break;
    if (seen.has(result.id)) continue;
    seen.add(result.id);
    merged.push(result);
  }

  // If few pieces matched, fill remaining slots with pages.
  if (merged.length < limit) {
    for (const result of pageResults) {
      if (merged.length >= limit) break;
      if (seen.has(result.id)) continue;
      seen.add(result.id);
      merged.push(result);
    }
  }

  return merged;
}

export function countAtelierMatches(query: string): number {
  const trimmed = query.trim();
  if (!trimmed) return 0;
  return CATALOG.filter(
    (entry) => scoreNaturalLanguageSearch(entry, trimmed) > 0,
  ).length;
}
