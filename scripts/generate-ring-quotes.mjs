#!/usr/bin/env node
/**
 * Regenerate src/app/data/ringQuotes.ts from the Bianca ring quote workbook.
 * Usage: node scripts/generate-ring-quotes.mjs "/path/to/quote.xlsx"
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const defaultXlsx = path.resolve(
  process.env.HOME,
  "Downloads/75 Pcs Ring Quote for Bianca Jewels (12.06.26).xlsx",
);
const xlsxPath = process.argv[2] || defaultXlsx;

const PY = `import zipfile, xml.etree.ElementTree as ET, re, json, sys
from collections import defaultdict
path = sys.argv[1]
z = zipfile.ZipFile(path)
ss=[]
root=ET.fromstring(z.read('xl/sharedStrings.xml'))
for si in root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
    ss.append(''.join((t.text or '') for t in si.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t')))

def col_idx(col):
    n=0
    for c in col: n=n*26+ord(c)-64
    return n-1

rows_dict=defaultdict(dict)
sheet=ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
for row in sheet.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
    for c in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
        ref=c.get('r')
        m=re.match(r'([A-Z]+)(\\d+)',ref)
        ci,ri=col_idx(m.group(1)),int(m.group(2))-1
        v=c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
        if v is None or not v.text: val=''
        elif c.get('t')=='s': val=ss[int(v.text)]
        else: val=v.text
        rows_dict[ri][ci]=val

AMT_COL=31

def norm_code(c):
    c=c.upper().strip()
    return c.replace('GLRA','A') if c.startswith('GLRA') else c

pieces={}
current=None
for ri in sorted(rows_dict):
    r=rows_dict[ri]
    g=lambda i: str(r.get(i,'')).strip()
    raw=g(2)
    if raw and raw!='StyleCode':
        current=norm_code(raw)
        if current not in pieces:
            pieces[current]={
                'styleCode':current,'metalQuality':g(5),'netWeightG':float(g(7) or 0),
                'priceInr':0.0,'ringSizes':[],'diamondLines':[],'colourStones':[],
            }
    if not current: continue
    p=pieces[current]
    if g(AMT_COL):
        try: p['priceInr']=float(g(AMT_COL))
        except: pass
    design=g(4)
    if design.startswith('Size'):
        p['ringSizes'].append(design.replace('Size :','').replace('Size:','').strip())
    shape=g(10)
    if shape and shape not in ('Shape','Total :',''):
        p['diamondLines'].append({
            'shape':shape,'clarity':g(11),'color':g(12),'sizeName':g(14),
            'pieces':int(float(g(17) or 0)),'totalCarat':float(g(18) or 0),
        })
    sc=g(22)
    if sc and sc not in ('Code',''):
        p['colourStones'].append(sc)

PRODUCT_STYLE_MAP = {
  'BD-G-RG-008':'BA13203','BD-G-RG-009':'BA13205','BD-G-RG-011':'GLR1026',
  'BD-G-RG-013':'GLR1028','BD-G-RG-014':'GLR1025A','BD-G-RG-015':'GLR1020',
  'BD-G-RG-017':'A29626','BD-G-RG-018':'GLR1011','BD-G-RG-020':'GLR1043',
  'BD-G-RG-021':'GLR1037','BD-G-RG-022':'GLR1001',
  'BD-G-RG-010':'GLR1013','BD-G-RG-012':'GLR1008','BD-G-RG-016':'GLR1029',
  'BD-G-RG-019':'GLR1046',
  'BD-G-RG-023':'GLR1080','BD-G-RG-024':'GLR1104','BD-G-RG-025':'GLR1110',
  'BD-G-RG-026':'GLR1482A','BD-G-RG-027':'GLR1212A',
  'BD-G-RG-028':'GLR1435','BD-G-RG-029':'GLR1226D','BD-G-RG-030':'GLR2181',
  'BD-G-RG-031':'GLR1514B','BD-G-RG-032':'A42906','BD-G-RG-033':'GLR3094',
  'BD-G-RG-034':'GLR3936','BD-G-RG-035':'GLR3953',
}

METAL={'GK18Y':'18K yellow gold','GK18W':'18K white gold','GK18R':'18K rose gold','GPLT':'Platinum'}
SHAPE={'RND':'Round brilliant','PE':'Pear','EMR':'Emerald cut','CUS':'Cushion','PRI':'Princess','MQS':'Marquise','OVL':'Oval'}

quotes={}
for pc, sc in PRODUCT_STYLE_MAP.items():
    q=pieces.get(sc)
    if not q or not q['priceInr']: continue
    lines=q['diamondLines']
    total_ct=round(sum(d['totalCarat'] for d in lines),3)
    total_pcs=sum(d['pieces'] for d in lines)
    centre=max(lines, key=lambda d:d['totalCarat'], default=None)
    centre_desc=None
    if centre and centre['totalCarat']>=0.1:
        sh=SHAPE.get(centre['shape'], centre['shape'])
        centre_desc=f"{sh} {centre['totalCarat']}ct · {centre['clarity']} · {centre['color']} · {centre['sizeName']}"
    quotes[pc]={
        'styleCode':sc,
        'priceInr':int(round(q['priceInr'])),
        'metal':METAL.get(q['metalQuality'], q['metalQuality']),
        'metalNetWeightG':q['netWeightG'],
        'diamondTotalCarat':total_ct,
        'diamondPieces':total_pcs,
        'diamondClarity':' / '.join(sorted({d['clarity'] for d in lines if d['clarity']})),
        'diamondColor':' / '.join(sorted({d['color'] for d in lines if d['color']})),
        'diamondShapes':', '.join(sorted({SHAPE.get(d['shape'], d['shape']) for d in lines})),
        'centreStone':centre_desc,
        'ringSize':q['ringSizes'][0] if q['ringSizes'] else None,
        'colourStones':q['colourStones'] or None,
    }
print(json.dumps(quotes))
`;

const result = spawnSync("python3", ["-c", PY, xlsxPath], { encoding: "utf-8" });
if (result.status !== 0) {
  console.error(result.stderr);
  process.exit(1);
}

const quotes = JSON.parse(result.stdout);

/** Salon metal per product — workbook often lists GK18Y for all styles */
const PRODUCT_METAL_OVERRIDES = {
  "BD-G-RG-008": "18K yellow gold",
  "BD-G-RG-009": "18K yellow gold",
  "BD-G-RG-010": "18K white gold",
  "BD-G-RG-011": "18K yellow, white & rose gold",
  "BD-G-RG-012": "18K yellow gold",
  "BD-G-RG-013": "18K white gold",
  "BD-G-RG-014": "18K yellow gold",
  "BD-G-RG-015": "18K white gold",
  "BD-G-RG-016": "18K white gold",
  "BD-G-RG-017": "18K rose gold",
  "BD-G-RG-018": "18K yellow gold",
  "BD-G-RG-019": "18K white gold",
  "BD-G-RG-020": "18K white gold",
  "BD-G-RG-021": "18K white gold",
  "BD-G-RG-022": "18K rose gold",
  "BD-G-RG-023": "18K white gold",
  "BD-G-RG-024": "18K white gold",
  "BD-G-RG-025": "18K white gold",
  "BD-G-RG-026": "18K white gold",
  "BD-G-RG-027": "18K white gold",
  "BD-G-RG-028": "18K yellow gold",
  "BD-G-RG-029": "18K white gold",
  "BD-G-RG-030": "18K white gold",
  "BD-G-RG-031": "18K white gold",
  "BD-G-RG-032": "18K yellow gold",
  "BD-G-RG-033": "18K white gold",
  "BD-G-RG-034": "18K white gold",
  "BD-G-RG-035": "18K white gold",
};

for (const [productCode, metal] of Object.entries(PRODUCT_METAL_OVERRIDES)) {
  if (quotes[productCode]) quotes[productCode].metal = metal;
}

/** Manual salon spec overrides — applied after workbook import */
const PRODUCT_QUOTE_OVERRIDES = {
  "BD-G-RG-032": {
    priceInr: 85_000,
    metalNetWeightG: 5,
    diamondTotalCarat: 0,
    diamondPieces: 0,
    centreStone: "Emerald cut 5ct · red emerald",
    colourStones: ["CSREDEMERALD"],
  },
};

for (const [productCode, overrides] of Object.entries(PRODUCT_QUOTE_OVERRIDES)) {
  if (quotes[productCode]) Object.assign(quotes[productCode], overrides);
}

const out = `/** Auto-generated from ring quote workbook — run \`node scripts/generate-ring-quotes.mjs\` to refresh */\n\nexport type RingQuote = {\n  styleCode: string;\n  priceInr: number;\n  metal: string;\n  metalNetWeightG: number;\n  diamondTotalCarat: number;\n  diamondPieces: number;\n  diamondClarity: string;\n  diamondColor: string;\n  diamondShapes: string;\n  centreStone: string | null;\n  ringSize: string | null;\n  colourStones: string[] | null;\n};\n\nexport const RING_QUOTES: Record<string, RingQuote> = ${JSON.stringify(quotes, null, 2)} as const;\n\n/** Atelier salon markup applied to workbook base prices */\nexport const SALON_MARKUP_INR = 25_000;\n\nexport function applySalonMarkup(basePriceInr: number): number {\n  return basePriceInr + SALON_MARKUP_INR;\n}\n\nexport function formatRingPriceInr(priceInr: number): string {\n  return new Intl.NumberFormat("en-IN", {\n    style: "currency",\n    currency: "INR",\n    maximumFractionDigits: 0,\n  }).format(priceInr);\n}\n\nexport function getRingQuote(productCode: string): RingQuote | undefined {\n  const base = RING_QUOTES[productCode];\n  if (!base) return undefined;\n  return { ...base, priceInr: applySalonMarkup(base.priceInr) };\n}\n`;

fs.writeFileSync(path.join(ROOT, "src/app/data/ringQuotes.ts"), out);
console.log(`Wrote ${Object.keys(quotes).length} ring quotes to src/app/data/ringQuotes.ts`);
