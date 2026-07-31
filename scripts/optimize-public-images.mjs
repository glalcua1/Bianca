/**
 * Build-time WebP derivatives for URL-path images under public/.
 * Outputs to public/media/opt/ and writes src/app/generated/optimizedImageManifest.json
 *
 * Skip logic uses content hashes (not mtimes). Git clones reset mtimes on Vercel,
 * so mtime checks re-encoded every image on every deploy and delayed production.
 *
 * Encoded bytes are also stored under node_modules/.cache/bianca-image-opt keyed by
 * source hash so Vercel’s restored build cache can skip Sharp on unchanged assets.
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outRoot = path.join(publicDir, "media", "opt");
const hashCacheRoot = path.join(root, "node_modules/.cache/bianca-image-opt");
const manifestPath = path.join(root, "src/app/generated/optimizedImageManifest.json");
const dataFile = path.join(root, "src/app/data/fineJewelleryCollections.ts");
const CONCURRENCY = 4;

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

/** Editorial / hero assets — wider breakpoints */
const EDITORIAL_PATHS = new Set([
  "vase-with-flowers-vase-with-words-orchid-it.jpg",
  "Sketch.png",
  "elegant-pattern-white-orchids-intricate-silver-designs-soft-pastel-backdrop.jpg",
  "shweta-lal-bianca-diamonds-founder.jpg",
  "Cannes/bianca-diamonds-cannes-2026-red-carpet.png",
  "Cannes/IMG_7239.jpg",
  "media/bespoke/orchid-studio-light.jpg",
  "bianca-diamonds-bespoke-necklace.png",
  "butter.png",
  "Pendant/P1.jpg",
  "bianca-diamonds-blue-diamond-editorial.jpg",
  "bianca-diamonds-butterfly-sapphire-suite.png",
  "bianca-diamonds-emerald-butterfly-pendant-lifestyle.png",
  "bianca-diamonds-lab-grown-jewellery-hero-poster.jpg",
  "bianca-diamonds-presentation-box.png",
  "bianca-diamonds-packaging-bag.png",
  "bianca-diamonds-atelier-atmosphere.png",
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

function variantMeta(relPath, widths) {
  const stem = path.basename(relPath, path.extname(relPath));
  const dir = path.dirname(relPath);
  const optDir = dir === "." ? "media/opt" : `media/opt/${dir}`;
  return widths.map((width) => {
    const destRel = `${optDir}/${stem}-${width}.webp`.replace(/\\/g, "/");
    return {
      width,
      destRel,
      destPath: path.join(publicDir, destRel),
    };
  });
}

function hashCachePath(sourceHash, width) {
  return path.join(hashCacheRoot, sourceHash, `${width}.webp`);
}

function ensureCopied(fromPath, toPath) {
  fs.mkdirSync(path.dirname(toPath), { recursive: true });
  fs.copyFileSync(fromPath, toPath);
}

async function optimizeOne(relPath, previousEntry) {
  const srcPath = path.join(publicDir, relPath);
  const widths = widthsFor(relPath);
  const sourceHash = hashFile(srcPath);
  const variantsMeta = variantMeta(relPath, widths);
  const original = `/${relPath.replace(/\\/g, "/")}`;
  const variants = {};
  let encoded = 0;
  let reused = 0;

  for (const { width, destRel, destPath } of variantsMeta) {
    const cachedPath = hashCachePath(sourceHash, width);
    const publicUrl = `/${destRel}`;

    if (fs.existsSync(cachedPath)) {
      ensureCopied(cachedPath, destPath);
      variants[String(width)] = publicUrl;
      reused += 1;
      continue;
    }

    if (
      previousEntry?.sourceHash === sourceHash &&
      fs.existsSync(destPath)
    ) {
      fs.mkdirSync(path.dirname(cachedPath), { recursive: true });
      fs.copyFileSync(destPath, cachedPath);
      variants[String(width)] = publicUrl;
      reused += 1;
      continue;
    }

    fs.mkdirSync(path.dirname(cachedPath), { recursive: true });
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(cachedPath);

    ensureCopied(cachedPath, destPath);
    variants[String(width)] = publicUrl;
    encoded += 1;
  }

  return {
    original,
    sourceHash,
    webp: variants,
    sizes: sizesFor(relPath),
    encoded,
    reused,
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
  let skippedImages = 0;
  let encodedImages = 0;
  let encodedVariants = 0;
  let reusedVariants = 0;

  fs.mkdirSync(hashCacheRoot, { recursive: true });

  console.log(
    `Optimizing ${paths.length} images (hash-cached via node_modules/.cache, concurrency ${CONCURRENCY})…`,
  );

  const entries = await mapPool(paths, CONCURRENCY, async (relPath) => {
    const key = `/${relPath.replace(/\\/g, "/")}`;
    try {
      const entry = await optimizeOne(relPath, previous[key]);
      encodedVariants += entry.encoded;
      reusedVariants += entry.reused;
      if (entry.encoded === 0) {
        skippedImages += 1;
        process.stdout.write(".");
      } else {
        encodedImages += 1;
        process.stdout.write("+");
      }
      const { encoded: _e, reused: _r, ...manifestEntry } = entry;
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
    `\nWrote manifest (${Object.keys(manifest).length} entries) — images reused ${skippedImages}, images encoded ${encodedImages}; variants reused ${reusedVariants}, encoded ${encodedVariants}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
