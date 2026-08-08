import {
  ATELIER_PIECES,
  sortAllAtelierPiecesByWellPerCategory,
  type AtelierPiece,
} from "./fineJewelleryCollections";
import { getBlueStarCollectionPieces } from "./blueStarCollection";

export type HomeSectionCard = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  to: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  /** Product-shot backdrop for the image well */
  imageWellColor?: string;
  /** Alternate image well treatment for dark product photography */
  tone?: "cream" | "forest" | "ink";
};

export type HomeCardCarouselSlide = {
  image: string;
  imageAlt: string;
  imageClassName?: string;
  imageWellColor?: string;
};

function slidesFromPieces(
  pieces: AtelierPiece[],
  imageClassName: string,
): HomeCardCarouselSlide[] {
  return pieces.map((piece) => ({
    image: piece.image,
    imageAlt: piece.alt,
    imageClassName,
    imageWellColor: piece.imageWellColor,
  }));
}

/** Latest Fine Jewellery pieces for The House Fine Jewellery card carousel. */
export function getHomeFineJewelleryCarouselSlides(
  limit = 4,
): HomeCardCarouselSlide[] {
  const latest = sortAllAtelierPiecesByWellPerCategory(ATELIER_PIECES).slice(
    0,
    limit,
  );
  return slidesFromPieces(
    latest,
    "object-contain object-center p-3 sm:p-4 md:p-5 lg:p-6",
  );
}

/** Blue Star pieces for The House Blue Diamonds card carousel. */
export function getHomeBlueStarCarouselSlides(
  limit = 4,
): HomeCardCarouselSlide[] {
  return slidesFromPieces(
    getBlueStarCollectionPieces().slice(0, limit),
    "object-contain object-center p-3 sm:p-4 md:p-5 lg:p-6",
  );
}

/**
 * Primary homepage destinations — full-width horizontal editorial cards.
 * Order: Fine Jewellery → Bespoke → Butterfly → Cannes.
 */
export const HOME_SECTION_CARDS: HomeSectionCard[] = [
  {
    id: "fine-jewellery",
    eyebrow: "The Atelier",
    title: "Fine Jewellery",
    description:
      "Certified lab-grown diamonds set in BIS hallmarked gold — composed for everyday brilliance and life’s most luminous occasions.",
    cta: "Enter the salon",
    to: "/fine-jewellery",
    image: "/Rings/bianca-diamonds-oval-diamond-baguette-halo-ring.jpg",
    imageAlt: "Oval diamond ring with radial baguette halo in white gold",
    imageClassName: "object-contain object-center p-3 sm:p-4 md:p-5 lg:p-6",
    imageWellColor: "#abb1b5",
    tone: "cream",
  },
  {
    id: "bespoke",
    eyebrow: "Private Commission",
    title: "Bespoke",
    description:
      "A one-of-a-kind journey from private consultation and hand sketches to CAD and artisan craft — jewellery composed entirely around your story.",
    cta: "Begin a commission",
    to: "/bespoke-jewellery",
    image: "/bianca-diamonds-bespoke-necklace.png",
    imageAlt: "Bianca Diamonds bespoke necklace design",
    imageClassName: "object-cover object-[center_28%]",
    tone: "cream",
  },
  {
    id: "butterfly",
    eyebrow: "House Emblem",
    title: "Butterfly",
    description:
      "High jewellery where the Bianca B takes flight — sapphire and emerald suites in diamond pavé, born from the wings of the house emblem.",
    cta: "Discover the collection",
    to: "/butterfly-collection",
    image: "/bianca-diamonds-butterfly-sapphire-suite.png",
    imageAlt: "Bianca Butterfly Collection — sapphire butterfly suite",
    imageClassName: "object-cover object-center",
    tone: "ink",
  },
  {
    id: "cannes",
    eyebrow: "World Stage · 2026",
    title: "Cannes",
    description:
      "A cinematic editorial from the Croisette — Bianca’s debut on the world’s most celebrated red carpet, composed for light, camera, and presence.",
    cta: "View the showcase",
    to: "/fine-jewellery/cannes-2026",
    image: "/Cannes/bianca-diamonds-cannes-2026-red-carpet.png",
    imageAlt: "Bianca Diamonds at Cannes Film Festival 2026",
    imageClassName: "object-cover object-[center_18%]",
    tone: "forest",
  },
];
