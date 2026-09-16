import { BIANCA_PUBLIC_ORIGIN } from "../lib/atelierEnquiry";

/** Desktop / default homepage hero film. */
export const HOME_HERO_VIDEO_DESKTOP =
  "/bianca-diamonds-lab-grown-jewellery-hero.mp4";

/**
 * Same 16:9 framing as desktop, compressed for mobile.
 * Avoids the portrait hero crop that cuts the trio's outer edges.
 */
export const HOME_HERO_VIDEO_MOBILE =
  "/bianca-diamonds-lab-grown-jewellery-hero-mobile.mp4";

export const HOME_HERO_VIDEO_POSTER =
  "/bianca-diamonds-lab-grown-jewellery-hero-poster.jpg";

export const HOME_HERO_VIDEO_POSTER_WEBP =
  "/bianca-diamonds-lab-grown-jewellery-hero-poster.webp";

export const HOME_HERO_STILL = "/bianca-diamonds-blue-diamond-editorial.jpg";

/** Dedicated watch page — homepage is not eligible as a Google video watch page. */
export const HOME_HERO_FILM_PATH = "/film";

/** Absolute URLs for schema, Open Graph, and video sitemap. */
export const HOME_HERO_VIDEO_SEO = {
  name: "Bianca Diamonds — Lab-Grown Diamond Fine Jewellery Hero Film",
  description:
    "Watch the Bianca Diamonds hero film: IGI-certified lab-grown diamond fine jewellery composed for modern living, bridal moments, and occasion dressing.",
  contentUrl: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_VIDEO_DESKTOP}`,
  contentUrlMobile: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_VIDEO_MOBILE}`,
  thumbnailUrl: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_VIDEO_POSTER}`,
  thumbnailUrlWebp: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_VIDEO_POSTER_WEBP}`,
  watchPath: HOME_HERO_FILM_PATH,
  watchUrl: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_FILM_PATH}`,
  embedUrl: `${BIANCA_PUBLIC_ORIGIN}${HOME_HERO_FILM_PATH}`,
  uploadDate: "2026-07-17",
  /** ffprobe duration of the desktop hero encode */
  durationIso: "PT15S",
  durationSeconds: 15,
  pageTitle: "Hero Film | Bianca Diamonds",
  pageDescription:
    "Watch the Bianca Diamonds hero film — IGI-certified lab-grown diamond fine jewellery composed for modern living, bridal moments, and occasion dressing.",
} as const;
