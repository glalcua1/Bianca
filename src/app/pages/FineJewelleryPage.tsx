import { useEffect } from "react";
import { useLocation } from "react-router";
import InstagramFeedSection from "../components/InstagramFeedSection";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import FineJewelleryAtelier from "../components/FineJewelleryAtelier";
import FineJewelleryCategoryHero from "../components/FineJewelleryCategoryHero";
import type { JewelleryCategoryId } from "../data/fineJewelleryCollections";
import {
  fineJewelleryPageSeo,
  parseFineJewelleryCategoryFromHash,
  parseFineJewelleryCategoryFromPath,
} from "../data/fineJewelleryMegaMenu";
import { BIANCA_INSTAGRAM_URL } from "../data/siteContact";
import { usePageMeta } from "../hooks/usePageMeta";
import { BIANCA_PUBLIC_ORIGIN } from "../lib/atelierEnquiry";
import {
  atelierPieceShareUrl,
  findAtelierPiece,
  resolveAtelierPieceFromLocation,
} from "../lib/atelierShare";

const CRAFT_VALUES = [
  {
    title: "IGI Certified",
    description:
      "Every Bianca Diamonds lab-grown diamond is individually IGI certified for cut, colour, clarity, and carat.",
  },
  {
    title: "Lab-Grown Brilliance",
    description:
      "The same optical and physical properties as mined diamonds — with a lighter footprint.",
  },
  {
    title: "Bespoke Design",
    description:
      "Personal fittings, custom creations, and styling guidance from our atelier team.",
  },
];

export default function FineJewelleryPage() {
  const location = useLocation();
  const fromPath = parseFineJewelleryCategoryFromPath(location.pathname);
  const fromHash = parseFineJewelleryCategoryFromHash(location.hash);
  const activeCategory: JewelleryCategoryId | "all" =
    fromPath !== "all" ? fromPath : fromHash;

  const sharedPiece = resolveAtelierPieceFromLocation(
    location.pathname,
    location.search,
    location.hash,
  );
  const pageSeo = sharedPiece
    ? {
        title: `${sharedPiece.title} | Bianca Diamonds`,
        description: sharedPiece.description,
      }
    : fineJewelleryPageSeo(activeCategory);

  usePageMeta(pageSeo.title, pageSeo.description, {
    canonical: sharedPiece
      ? atelierPieceShareUrl(sharedPiece, BIANCA_PUBLIC_ORIGIN)
      : undefined,
    ogImage: sharedPiece
      ? `${BIANCA_PUBLIC_ORIGIN}${sharedPiece.image}`
      : undefined,
  });

  useEffect(() => {
    const raw = location.hash.replace(/^#/, "").trim().toLowerCase();
    if (!raw || raw === "all" || raw === "collections" || raw === "showcase") {
      return;
    }
    if (raw.startsWith("piece=")) return;
    if (findAtelierPiece(raw)) return;
    if (parseFineJewelleryCategoryFromHash(location.hash) !== "all") return;
    window.history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}`,
    );
  }, [location.hash, location.pathname, location.search]);

  useEffect(() => {
    if (location.hash.replace(/^#/, "") === "collections") {
      requestAnimationFrame(() => {
        document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="fine-jewellery" />
      </div>

      {activeCategory !== "all" && (
        <FineJewelleryCategoryHero categoryId={activeCategory} />
      )}

      <FineJewelleryAtelier activeCategory={activeCategory} />

      <section
        aria-labelledby="craft-heading"
        className="border-t border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-16 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-5xl">
          <h2
            id="craft-heading"
            className="mb-12 text-center font-editorial text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-[0.08em] text-[#1d3c34] md:mb-14"
          >
            The Bianca Promise
          </h2>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
            {CRAFT_VALUES.map((value) => (
              <li key={value.title} className="text-center">
                <h3 className="font-editorial text-xl tracking-[0.06em] text-[#1d3c34]">
                  {value.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-house-body text-on-cream-body">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InstagramFeedSection profileUrl={BIANCA_INSTAGRAM_URL} />

      <SiteFooter />
    </div>
  );
}
