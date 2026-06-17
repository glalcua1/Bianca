#!/usr/bin/env node
/**
 * Regenerate src/app/data/necklaceQuotes.ts from the Bianca order packing list.
 * Usage: node scripts/generate-necklace-quotes.mjs "/path/to/packing-list.xlsx"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const defaultXlsx = path.resolve(
  process.env.HOME,
  "Downloads/Bianca QO-26-27-0768 Order Packing List Sizecode.xlsx",
);
const xlsxPath = process.argv[2] || defaultXlsx;

const PY = `import json, sys
try:
    import openpyxl
except ImportError:
    import subprocess, sys as _s
    subprocess.check_call([_s.executable, '-m', 'pip', 'install', 'openpyxl', '-q'])
    import openpyxl

path = sys.argv[1]
wb = openpyxl.load_workbook(path, data_only=True)
ws = wb.active

items = {}
current = None

def process_row(row):
    global current
    if not current:
        return
    code = current
    if row[11] == 'G18KT':
        items[code]['metal'] = {
            'grWt': float(row[12] or 0),
            'netWt': float(row[13] or 0),
            'pueWt': float(row[15] or 0),
            'amount': float(row[18] or 0),
        }
    shape = row[3]
    if shape and row[7] is not None and row[8] is not None:
        try:
            pcs = int(row[7])
            wts = float(row[8])
            if pcs > 0 and wts > 0:
                items[code]['diamonds'].append({
                    'shape': shape,
                    'size': str(row[4] or '').strip(),
                    'pcs': pcs,
                    'wts': wts,
                })
        except (TypeError, ValueError):
            pass
    label = row[1]
    if label == 'Total':
        return
    if row[7] is not None and row[29] is not None:
        try:
            total_pcs = int(row[7])
            total_amt = float(row[29])
            if total_pcs >= 2 and 10_000 < total_amt < 10_000_000:
                items[code]['summary'] = {
                    'totalPcs': total_pcs,
                    'totalWts': float(row[8] or 0),
                    'totalAmt': total_amt,
                }
        except (TypeError, ValueError):
            pass

for row in ws.iter_rows(values_only=True):
    item_no = row[1]
    if item_no and isinstance(item_no, str) and item_no.startswith(('NL', 'NLE')):
        code = item_no.strip()
        items[code] = {'diamonds': [], 'metal': None, 'summary': None}
        current = code
        process_row(row)
        continue
    process_row(row)

SHAPE = {
    'MQ': 'Marquise',
    'OV': 'Oval',
    'RB': 'Round brilliant',
    'PE': 'Pear',
    'EM': 'Emerald cut',
}

quotes = {}
for code, it in items.items():
    s = it.get('summary') or {}
    m = it.get('metal') or {}
    diamonds = it['diamonds']
    if not s.get('totalAmt') and not diamonds:
        continue
    total_pcs = s.get('totalPcs') or sum(d['pcs'] for d in diamonds)
    total_wts = round(s.get('totalWts') or sum(d['wts'] for d in diamonds), 3)
    shapes = sorted({SHAPE.get(d['shape'], d['shape']) for d in diamonds})
    centre = max(diamonds, key=lambda d: d['wts'], default=None)
    centre_desc = None
    if centre and centre['wts'] >= 0.1:
        sh = SHAPE.get(centre['shape'], centre['shape'])
        size = centre['size']
        centre_desc = f"{sh} {centre['wts']}ct · {size}" if size else f"{sh} {centre['wts']}ct"
    quotes[code] = {
        'styleCode': code,
        'priceInr': int(round(s.get('totalAmt') or 0)),
        'metal': '18K yellow gold',
        'metalNetWeightG': round(float(m.get('netWt') or 0), 3),
        'metalPueWeightG': round(float(m.get('pueWt') or 0), 3),
        'diamondTotalCarat': total_wts,
        'diamondPieces': total_pcs,
        'diamondShapes': ', '.join(shapes),
        'centreStone': centre_desc,
    }

print(json.dumps(quotes))
`;

const result = spawnSync("python3", ["-c", PY, xlsxPath], { encoding: "utf-8" });
if (result.status !== 0) {
  console.error(result.stderr);
  process.exit(1);
}

const workbookQuotes = JSON.parse(result.stdout);

/** Bianca product code → Kira workbook necklace style (NL…) — confirmed mappings only */
const NECKLACE_STYLE_MAP = {
  "BD-K-NK-001": "NL00428",
  "BD-K-NK-003": "NL00418",
  "BD-K-NK-006": "NL00083",
  "BD-K-NK-008": "NL00474",
  "BD-K-NK-015": "NL00456",
  "BD-K-NK-016": "NL00208",
  "BD-K-NK-017": "NL00052",
};

/** Bianca product code → Kira workbook earring style (NLE…) — extend when earring SKUs are assigned */
const EARRING_STYLE_MAP = {};

function earringStyleForNecklaceStyle(necklaceStyle) {
  if (!necklaceStyle.startsWith("NL") || necklaceStyle.startsWith("NLE")) return null;
  return `NLE${necklaceStyle.slice(2)}`;
}

function buildSalonQuotes(styleMap, withBianca = false) {
  const out = {};
  for (const [productCode, styleCode] of Object.entries(styleMap)) {
    const q = workbookQuotes[styleCode];
    if (!q?.priceInr) continue;
    out[productCode] = {
      ...q,
      styleCode,
      ...(withBianca ? { biancaProductCode: productCode } : {}),
    };
  }
  return out;
}

const necklaceQuotes = buildSalonQuotes(NECKLACE_STYLE_MAP, true);
const earringQuotes = buildSalonQuotes(EARRING_STYLE_MAP);

const parureMap = Object.entries(NECKLACE_STYLE_MAP).map(([bianca, kiraNecklace]) => ({
  bianca,
  kiraNecklace,
  kiraEarring: earringStyleForNecklaceStyle(kiraNecklace),
}));

const earringStyleQuotes = {};
for (const [styleCode, q] of Object.entries(workbookQuotes)) {
  if (styleCode.startsWith("NLE") && q?.priceInr) {
    earringStyleQuotes[styleCode] = { ...q, styleCode };
  }
}

const out = `/** Auto-generated from order packing list — run \`node scripts/generate-necklace-quotes.mjs\` to refresh */

export type ParurePieceQuote = {
  styleCode: string;
  biancaProductCode?: string;
  priceInr: number;
  metal: string;
  metalNetWeightG: number;
  metalPueWeightG: number;
  diamondTotalCarat: number;
  diamondPieces: number;
  diamondShapes: string;
  centreStone: string | null;
};

export type ParureCatalogEntry = {
  bianca: string;
  kiraNecklace: string;
  kiraEarring: string | null;
};

export const PARURE_MAP: ParureCatalogEntry[] = ${JSON.stringify(parureMap, null, 2)};

export const NECKLACE_SALON_MARKUP_INR = 250_000;
export const EARRING_SALON_MARKUP_INR = 50_000;

export const NECKLACE_QUOTES: Record<string, ParurePieceQuote> = ${JSON.stringify(necklaceQuotes, null, 2)} as const;

export const EARRING_QUOTES: Record<string, ParurePieceQuote> = ${JSON.stringify(earringQuotes, null, 2)} as const;

/** Kira workbook earring styles (NLE…) — used to pair with mapped necklaces */
export const EARRING_STYLE_QUOTES: Record<string, ParurePieceQuote> = ${JSON.stringify(earringStyleQuotes, null, 2)} as const;

/** NL00428 → NLE00428 for parure pairing */
export function earringStyleForNecklaceStyle(necklaceStyle: string): string | null {
  if (!necklaceStyle.startsWith("NL") || necklaceStyle.startsWith("NLE")) return null;
  return \`NLE\${necklaceStyle.slice(2)}\`;
}

export function formatParurePriceInr(priceInr: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInr);
}

function withNecklaceMarkup(base: ParurePieceQuote): ParurePieceQuote {
  return { ...base, priceInr: base.priceInr + NECKLACE_SALON_MARKUP_INR };
}

function withEarringMarkup(base: ParurePieceQuote): ParurePieceQuote {
  return { ...base, priceInr: base.priceInr + EARRING_SALON_MARKUP_INR };
}

export function getNecklaceQuote(productCode: string): ParurePieceQuote | undefined {
  const base = NECKLACE_QUOTES[productCode];
  return base ? withNecklaceMarkup(base) : undefined;
}

export function getEarringQuote(productCode: string): ParurePieceQuote | undefined {
  const base = EARRING_QUOTES[productCode];
  return base ? withEarringMarkup(base) : undefined;
}

export function getEarringQuoteByStyle(styleCode: string): ParurePieceQuote | undefined {
  const base = EARRING_STYLE_QUOTES[styleCode];
  return base ? withEarringMarkup(base) : undefined;
}

export type ParureSalonQuotes = {
  suffix: string;
  necklace: ParurePieceQuote;
  earrings: ParurePieceQuote | null;
};

export function getParureQuotesForNecklace(productCode: string): ParureSalonQuotes | undefined {
  const necklace = getNecklaceQuote(productCode);
  if (!necklace) return undefined;
  const earringStyle = earringStyleForNecklaceStyle(necklace.styleCode);
  const earrings = earringStyle ? getEarringQuoteByStyle(earringStyle) ?? null : null;
  return { suffix: necklace.styleCode.slice(2), necklace, earrings };
}

export function getMatchingEarringQuote(necklaceProductCode: string): ParurePieceQuote | undefined {
  const necklace = getNecklaceQuote(necklaceProductCode);
  if (!necklace) return undefined;
  const earringStyle = earringStyleForNecklaceStyle(necklace.styleCode);
  return earringStyle ? getEarringQuoteByStyle(earringStyle) : undefined;
}
`;

fs.writeFileSync(path.join(ROOT, "src/app/data/necklaceQuotes.ts"), out);
console.log(
  `Wrote ${Object.keys(necklaceQuotes).length} necklace + ${Object.keys(earringQuotes).length} earring quotes to src/app/data/necklaceQuotes.ts`,
);
