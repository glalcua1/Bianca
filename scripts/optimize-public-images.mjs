/**
 * Build-time WebP derivatives for URL-path images under public/.
 * Outputs to public/media/opt/ and writes src/app/generated/optimizedImageManifest.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outRoot = path.join(publicDir, "media", "opt");
const manifestPath = path.join(root, "src/app/generated/optimizedImageManifest.json");
const dataFile = path.join(root, "src/app/data/fineJewelleryCollections.ts");

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

async function optimizeOne(relPath) {
  const srcPath = path.join(publicDir, relPath);
  const widths = widthsFor(relPath);
  const stem = path.basename(relPath, path.extname(relPath));
  const destDir = path.join(outRoot, path.dirname(relPath));
  fs.mkdirSync(destDir, { recursive: true });

  const srcMtime = fs.statSync(srcPath).mtimeMs;
  const variants = {};

  for (const width of widths) {
    const destRel = `media/opt/${path.dirname(relPath)}/${stem}-${width}.webp`.replace(
      /^\.\//,
      "",
    );
    const destPath = path.join(publicDir, destRel);

    if (
      fs.existsSync(destPath) &&
      fs.statSync(destPath).mtimeMs >= srcMtime
    ) {
      variants[String(width)] = `/${destRel.replace(/\\/g, "/")}`;
      continue;
    }

    await sharp(srcPath)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 4 })
      .toFile(destPath);

    variants[String(width)] = `/${destRel.replace(/\\/g, "/")}`;
  }

  return {
    original: `/${relPath.replace(/\\/g, "/")}`,
    webp: variants,
    sizes: sizesFor(relPath),
  };
}

async function main() {
  const paths = collectPaths();
  const manifest = {};

  console.log(`Optimizing ${paths.length} images…`);

  for (const relPath of paths) {
    try {
      manifest[`/${relPath.replace(/\\/g, "/")}`] = await optimizeOne(relPath);
      process.stdout.write(".");
    } catch (error) {
      console.warn(`\nSkip ${relPath}:`, error.message);
    }
  }

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nWrote manifest (${Object.keys(manifest).length} entries)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
