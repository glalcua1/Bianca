import manifest from "../generated/optimizedImageManifest.json";

export const ATELIER_IMAGE_SIZES = "(max-width: 768px) 90vw, 443px";

type ManifestEntry = {
  original: string;
  webp: Record<string, string>;
  sizes: string;
};

const entries = manifest as Record<string, ManifestEntry>;

export function getOptimizedPicture(
  src: string,
  sizes?: string,
): { srcSet: string; sizes: string } | null {
  const entry = entries[src];
  if (!entry?.webp) return null;

  const srcSet = Object.entries(entry.webp)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([width, url]) => `${url} ${width}w`)
    .join(", ");

  if (!srcSet) return null;

  return {
    srcSet,
    sizes: sizes ?? entry.sizes,
  };
}
