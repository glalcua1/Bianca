import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router";
import InstagramFeedSection from "../components/InstagramFeedSection";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import FineJewelleryAtelier from "../components/FineJewelleryAtelier";
import FineJewelleryCategoryHero from "../components/FineJewelleryCategoryHero";
import {
  FINE_JEWELLERY_CATEGORIES,
  type JewelleryCategoryId,
} from "../data/fineJewelleryCollections";
import {
  fineJewelleryCategoryPath,
  isFineJewelleryCategorySlug,
  parseFineJewelleryCategoryFromHash,
  parseFineJewelleryCategoryFromPath,
} from "../data/fineJewelleryMegaMenu";
import { BIANCA_INSTAGRAM_URL } from "../data/siteContact";
import { usePageMeta } from "../hooks/usePageMeta";

const CRAFT_VALUES = [
  {
    title: "IGI Certified",
    description:
      "Every stone is independently graded for cut, colour, clarity, and carat weight.",
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

const DEFAULT_DESCRIPTION =
  "IGI-certified lab-grown diamond fine jewellery — rings, earrings, necklaces, bracelets, and pendants from Bianca Diamonds.";

function categoryMeta(categoryId: JewelleryCategoryId | "all") {
  if (categoryId === "all") {
    return {
      title: "Fine Jewellery | Bianca Diamonds",
      description: DEFAULT_DESCRIPTION,
    };
  }

  const category = FINE_JEWELLERY_CATEGORIES.find((c) => c.id === categoryId);
  const label = category?.title ?? categoryId;
  return {
    title: `${label} | Fine Jewellery | Bianca Diamonds`,
    description:
      category?.description ??
      `Explore ${label.toLowerCase()} in the Bianca Diamonds fine jewellery atelier.`,
  };
}

export default function FineJewelleryPage() {
  const location = useLocation();
  const { category: categorySlug } = useParams<{ category?: string }>();

  const hashCategory = parseFineJewelleryCategoryFromHash(location.hash);
  const rawHash = location.hash.replace(/^#/, "").trim().toLowerCase();

  const legacyHashRedirect =
    rawHash &&
    rawHash !== "showcase" &&
    hashCategory !== "all"
      ? fineJewelleryCategoryPath(hashCategory)
      : rawHash &&
          hashCategory === "all" &&
          rawHash !== "all" &&
          rawHash !== "collections" &&
          rawHash !== "showcase"
        ? "/fine-jewellery"
        : null;

  const unknownCategoryRedirect =
    categorySlug &&
    !isFineJewelleryCategorySlug(categorySlug) &&
    categorySlug.toLowerCase() !== "all"
      ? "/fine-jewellery"
      : null;

  const activeCategory: JewelleryCategoryId | "all" =
    parseFineJewelleryCategoryFromPath(location.pathname);

  const meta = categoryMeta(activeCategory);
  usePageMeta(meta.title, meta.description);

  useEffect(() => {
    if (legacyHashRedirect || unknownCategoryRedirect) return;
    if (rawHash === "collections" || rawHash === "showcase") {
      requestAnimationFrame(() => {
        document
          .getElementById("showcase")
          ?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [rawHash, legacyHashRedirect, unknownCategoryRedirect]);

  if (legacyHashRedirect) {
    return <Navigate to={legacyHashRedirect} replace />;
  }

  if (unknownCategoryRedirect) {
    return <Navigate to={unknownCategoryRedirect} replace />;
  }

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
