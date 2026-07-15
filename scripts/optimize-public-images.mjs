/**
 * Build-time WebP derivatives for URL-path images under public/.
 * Outputs to public/media/opt/ and writes src/app/generated/optimizedImageManifest.json
 *
 * Skip logic uses content hashes (not mtimes). Git clones reset mtimes on Vercel,
 * so mtime checks re-encode every image on every deploy and delay production.
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outRoot = path.join(publicDir, "media", "opt");
const manifestPath = path.join(root, "src/app/generated/optimizedImageManifest.json");
const dataFile = path.join(root, "src/app/data/fineJewelleryCollections.ts");
const CONCURRENCY = 4;

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

/** Editorial / hero assets — wider breakpoints */
const EDITORIAL_PATHS = new Set([
  "vase-with-flowers-vase-with-words-orchid-it.jpg",
  "Sketch.png",
  "elegant-pattern-white-orchids-intricate-silver-designs-soft-pastel-backdrop.jpg",
  "founder.jpg",
  "Cannes/Cannes_model.png",
  "media/bespoke/orchid-studio-light.jpg",
  "Beskpoke_necklace.png",
  "butter.png",
  "Pendant/P1.jpg",
]);

const WIDTHS = {
  atelier: [443, 886],
  editorial: [640, 1280, 1920],
};

function collectAtelierImagePaths() {
  const source = fs.readFileSync(dataFile, "utf8");
  return [
    ...source.matchAll(/image:\s*"(\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi),
  ].map((m) => m[1].slice(1));
}

function collectRingPaths() {
  const ringsDir = path.join(publicDir, "Rings");
  if (!fs.existsSync(ringsDir)) return [];
  return fs
    .readdirSync(ringsDir)
    .filter((name) => IMAGE_EXT.test(name))
    .map((name) => `Rings/${name}`);
}

function collectPaths() {
  const paths = new Set([
    ...collectAtelierImagePaths(),
    ...collectRingPaths(),
    ...EDITORIAL_PATHS,
  ]);
  return [...paths].filter((rel) => {
    const full = path.join(publicDir, rel);
    return fs.existsSync(full) && fs.statSync(full).isFile();
  });
}

function widthsFor(relPath) {
  if (relPath.startsWith("Rings/")) return WIDTHS.atelier;
  return WIDTHS.editorial;
}

function sizesFor(relPath) {
  if (relPath.startsWith("Rings/")) {
    return "(max-width: 768px) 90vw, 443px";
  }
  if (relPath.includes("vase-with-flowers") || relPath.includes("Sketch")) {
    return "(max-width: 1024px) 55vw, 380px";
  }
  return "(max-width: 768px) 100vw, 1280px";
}

function hashFile(filePath) {
  return crypto
    .createHash("sha1")
    .update(fs.readFileSync(filePath))
    .digest("hex")
    .slice(0, 16);
}

function loadPreviousManifest() {
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

function variantPaths(relPath, widths) {
  const stem = path.basename(relPath, path.extname(relPath));
  return widths.map((width) => {
    const destRel = `media/opt/${path.dirname(relPath)}/${stem}-${width}.webp`.replace(
      /^\.\//,
      "",
    );
    return {
      width,
      destRel: destRel.replace(/\\/g, "/"),
      destPath: path.join(publicDir, destRel),
    };
  });
}

async function optimizeOne(relPath, previousEntry) {
  const srcPath = path.join(publicDir, relPath);
  const widths = widthsFor(relPath);
  const sourceHash = hashFile(srcPath);
  const variantsMeta = variantPaths(relPath, widths);
  const original = `/${relPath.replace(/\\/g, "/")}`;

  const allVariantsExist = variantsMeta.every(({ destPath }) =>
    fs.existsSync(destPath),
  );
  if (
    previousEntry?.sourceHash === sourceHash &&
    previousEntry?.webp &&
    allVariantsExist
  ) {
    return {
      original,
      sourceHash,
      webp: previousEntry.webp,
      sizes: sizesFor(relPath),
      skipped: true,
    };
  }

  fs.mkdirSync(path.join(outRoot, path.dirname(relPath)), { recursive: true });

  const variants = {};
  for (const { width, destRel, destPath } of variantsMeta) {
    if (
      previousEntry?.sourceHash === sourceHash &&
      fs.existsSync(destPath)
    ) {
      variants[String(width)] = `/${destRel}`;
      continue;
    }

    await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(destPath);

    variants[String(width)] = `/${destRel}`;
  }

  return {
    original,
    sourceHash,
    webp: variants,
    sizes: sizesFor(relPath),
    skipped: false,
  };
}

async function mapPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let next = 0;

  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => run()),
  );
  return results;
}

async function main() {
  const paths = collectPaths();
  const previous = loadPreviousManifest();
  let skipped = 0;
  let encoded = 0;

  console.log(`Optimizing ${paths.length} images (hash-cached, concurrency ${CONCURRENCY})…`);

  const entries = await mapPool(paths, CONCURRENCY, async (relPath) => {
    const key = `/${relPath.replace(/\\/g, "/")}`;
    try {
      const entry = await optimizeOne(relPath, previous[key]);
      if (entry.skipped) {
        skipped += 1;
        process.stdout.write(".");
      } else {
        encoded += 1;
        process.stdout.write("+");
      }
      const { skipped: _skipped, ...manifestEntry } = entry;
      return [key, manifestEntry];
    } catch (error) {
      console.warn(`\nSkip ${relPath}:`, error.message);
      return null;
    }
  });

  const manifest = {};
  for (const row of entries) {
    if (row) manifest[row[0]] = row[1];
  }

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(
    `\nWrote manifest (${Object.keys(manifest).length} entries) — reused ${skipped}, encoded ${encoded}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
