import { Link } from "react-router";
import { Instagram } from "lucide-react";
import InstagramFeedSection from "../components/InstagramFeedSection";

const BIANCA_INSTAGRAM_URL =
  "https://www.instagram.com/bianca.diamonds?igsh=M3didm9lb2pidXBi";

export default function FineJewelleryPage() {
  return (
    <div className="min-h-screen bg-[#0f1f1b]">
      {/* Hero — editorial */}
      <header
        className="relative overflow-hidden border-b border-[#dccb7b]/15"
        style={{
          background:
            "linear-gradient(165deg, #1d3c34 0%, #152e28 45%, #1a332e 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#dccb7b]/[0.06] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-[#dccb7b]/[0.04] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dccb7b]/40 to-transparent"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-8 pb-20 pt-28 text-center md:pb-24 md:pt-32">
          <Link
            to="/"
            className="absolute left-8 top-8 font-['Times_New_Roman',serif] text-xs tracking-[0.35em] uppercase text-[#f9f9f9]/80 transition-opacity hover:text-[#dccb7b]"
          >
            ← The House
          </Link>

          <p className="mb-5 font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.45em] text-[#dccb7b]/90 md:text-[11px]">
            Bianca Diamonds
          </p>
          <h1 className="mb-5 font-['Times_New_Roman',serif] text-[clamp(2rem,5vw,3.25rem)] font-normal leading-tight tracking-[0.08em] text-[#f9f9f9]">
            Fine Jewellery
          </h1>
          <p className="mx-auto max-w-md font-['Arial',sans-serif] text-sm leading-relaxed text-[#f9f9f9]/75 md:text-[15px]">
            Discover campaigns, craftsmanship, and new pieces — told through
            our reels and stories on Instagram.
          </p>
          <a
            href={BIANCA_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 border border-[#dccb7b]/40 bg-[#dccb7b]/5 px-6 py-2.5 font-['Arial',sans-serif] text-xs uppercase tracking-[0.2em] text-[#dccb7b] transition-colors hover:border-[#dccb7b]/70 hover:bg-[#dccb7b]/10"
          >
            <Instagram className="size-4 shrink-0 opacity-90" aria-hidden />
            @bianca.diamonds
          </a>
        </div>
      </header>

      <InstagramFeedSection profileUrl={BIANCA_INSTAGRAM_URL} />

      <footer
        className="border-t border-[#dccb7b]/10 px-8 py-12 text-center"
        style={{ backgroundColor: "#1d3c34" }}
      >
        <p className="mb-6 font-['Arial',sans-serif] text-sm text-[#f9f9f9]/70">
          Return to the house or follow the atelier online.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href={BIANCA_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-['Arial',sans-serif] text-sm tracking-wide text-[#dccb7b] transition-opacity hover:opacity-90"
          >
            <Instagram className="size-5 shrink-0" aria-hidden />
            Instagram
          </a>
          <span className="hidden text-[#dccb7b]/30 sm:inline" aria-hidden>
            |
          </span>
          <Link
            to="/"
            className="inline-block border border-[#dccb7b]/50 px-8 py-2.5 font-['Times_New_Roman',serif] text-xs tracking-[0.25em] uppercase text-[#dccb7b] transition-colors hover:bg-[#dccb7b] hover:text-[#1d3c34]"
          >
            Return Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
