const RESERVED_SEGMENTS = new Set([
  "p",
  "reel",
  "reels",
  "stories",
  "explore",
  "accounts",
  "about",
  "legal",
  "directory",
]);

/** Extract @bianca.diamonds from a profile URL, handle, or bare username. */
export function parseInstagramUsername(profileUrl?: string): string {
  const fallback = "bianca.diamonds";
  if (!profileUrl?.trim()) return fallback;

  const trimmed = profileUrl.trim();
  if (!trimmed.includes("instagram.com")) {
    return trimmed.replace(/^@/, "") || fallback;
  }

  try {
    const { pathname } = new URL(trimmed);
    const segment = pathname.split("/").filter(Boolean)[0];
    if (!segment || RESERVED_SEGMENTS.has(segment.toLowerCase())) {
      return fallback;
    }
    return segment;
  } catch {
    return fallback;
  }
}
