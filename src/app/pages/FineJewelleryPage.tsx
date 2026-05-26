import { useEffect } from "react";
import { Link } from "react-router";
import { Instagram } from "lucide-react";
import InstagramFeedSection from "../components/InstagramFeedSection";
import FineJewelleryCollections from "../components/FineJewelleryCollections";
import SiteNav from "../components/SiteNav";
import FineJewelleryHero from "../components/FineJewelleryHero";
import ProtectedImage from "../components/protection/ProtectedImage";
import {
  FINE_JEWELLERY_CATEGORIES,
  SHOWCASE_PIECES,
} from "../data/fineJewelleryCollections";

const BIANCA_INSTAGRAM_URL =
  "https://www.instagram.com/bianca.diamonds?igsh=M3didm9lb2pidXBi";

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

export default function FineJewelleryPage() {
  useEffect(() => {
    document.title = "Fine Jewellery | Bianca Diamonds";
    return () => {
      document.title = "Bianca Diamonds | Lab-Grown Diamond Fine Jewellery";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav activeItem="fine-jewellery" />
        <FineJewelleryHero />
      </div>

      <section
        aria-labelledby="intro-heading"
        className="border-b border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-14 md:px-10 md:py-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="intro-heading" className="sr-only">
            About Bianca fine jewellery
          </h2>
          <p className="font-editorial text-[clamp(1.25rem,3vw,1.65rem)] leading-snug tracking-[0.04em] text-[#1d3c34]">
            A new era of fine jewellery — certified brilliance, transparent
            pricing, and handcrafted designs for every moment.
          </p>
          <p className="mt-6 text-house-body text-on-cream-body">
            From solitaire pendants and tennis bracelets to engagement rings and
            wedding bands, each piece is responsibly sourced and made to suit
            the rhythm of your life. Explore our collections below, or connect
            with us for a personalised fitting and custom design.
          </p>
        </div>
      </section>

      <FineJewelleryCollections />

      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="border-t border-[#1d3c34]/10 bg-[#1d3c34] px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-4 text-house-eyebrow text-gold-on-forest">
              Shop by category
            </p>
            <h2
              id="categories-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#f9f9f9]"
            >
              Every Form of Brilliance
            </h2>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
            {FINE_JEWELLERY_CATEGORIES.map((category) => (
              <li
                key={category.title}
                className="group border border-[#dccb7b]/20 bg-[#dccb7b]/[0.04] p-6 transition duration-300 hover:border-[#dccb7b]/45 hover:bg-[#dccb7b]/[0.08] md:p-7"
              >
                <h3 className="font-editorial text-lg tracking-[0.06em] text-[#f9f9f9]">
                  {category.title}
                </h3>
                <p className="mt-3 text-house-body text-on-forest-body">
                  {category.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="showcase"
        aria-labelledby="showcase-heading"
        className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-16 md:px-10 md:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-4 text-house-eyebrow text-gold-on-cream">
              From the atelier
            </p>
            <h2
              id="showcase-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.08em] text-[#1d3c34]"
            >
              Selected Pieces
            </h2>
          </div>

          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:gap-6">
            {SHOWCASE_PIECES.map((piece, index) => (
              <li
                key={piece.src}
                className={index === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1" : ""}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f0e6] ring-1 ring-[#1d3c34]/10 md:aspect-square">
                  <ProtectedImage
                    wrapperClassName="size-full"
                    src={piece.src}
                    alt={piece.alt}
                    className="size-full object-cover transition duration-700 hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

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

      <footer
        className="border-t border-[#dccb7b]/10 px-8 py-12 text-center"
        style={{ backgroundColor: "#1d3c34" }}
      >
        <p className="mb-6 font-body text-sm text-on-forest-muted">
          Return to the house or follow the atelier online.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={BIANCA_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-gold-on-forest transition-opacity hover:opacity-90"
          >
            <Instagram className="size-5 shrink-0" aria-hidden />
            Instagram
          </a>
          <span className="hidden text-[#dccb7b]/30 sm:inline" aria-hidden>
            |
          </span>
          <Link
            to="/"
            className="inline-block border border-[#dccb7b]/50 px-8 py-2.5 text-house-cta text-gold-on-forest transition-colors hover:bg-[#dccb7b] hover:text-bianca-forest"
          >
            Return Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
