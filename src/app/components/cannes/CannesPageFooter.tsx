import { Link } from "react-router";
import { Instagram } from "lucide-react";
import { BIANCA_INSTAGRAM_URL } from "../../data/cannesShowcase2026";
import SiteCopyright from "../SiteCopyright";

export default function CannesPageFooter() {
  return (
    <footer className="border-t border-[#f9f9f9]/10 bg-[#0f1f1b] px-8 py-12 text-center">
      <p className="mb-6 font-body text-sm text-on-forest-muted">
        Return to fine jewellery or follow the atelier online.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <a
          href={BIANCA_INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-on-forest-muted transition-opacity hover:text-[#f9f9f9]"
        >
          <Instagram className="size-5 shrink-0" aria-hidden />
          Instagram
        </a>
        <span className="hidden text-[#f9f9f9]/20 sm:inline" aria-hidden>
          |
        </span>
        <Link
          to="/fine-jewellery"
          className="font-body text-sm tracking-wide text-on-forest-muted transition-opacity hover:text-[#f9f9f9]"
        >
          Fine Jewellery
        </Link>
        <span className="hidden text-[#f9f9f9]/20 sm:inline" aria-hidden>
          |
        </span>
        <Link
          to="/"
          className="inline-block border border-[#f9f9f9]/25 px-8 py-2.5 text-house-cta text-on-forest transition-colors hover:border-[#f9f9f9]/60 hover:text-[#f9f9f9]"
        >
          The House
        </Link>
      </div>
      <SiteCopyright className="mt-8 text-on-forest-muted" />
    </footer>
  );
}
