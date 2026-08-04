import { ShieldCheck } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import { JPP_TERMS } from "../../data/jppConfig";

export default function JppTerms() {
  return (
    <section
      id="terms"
      className="scroll-mt-24 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4">
          <ShieldCheck
            className="mt-1 size-6 shrink-0 text-[#766d42]"
            strokeWidth={1.25}
            aria-hidden
          />
          <div>
            <EditorialEyebrow>Terms & conditions</EditorialEyebrow>
            <h2 className="mt-3 font-editorial text-[clamp(1.55rem,3vw,2.1rem)] tracking-[0.05em] text-[#1d3c34]">
              Clear, considered, and jewellery-only.
            </h2>
          </div>
        </div>

        <ul className="mt-10 space-y-5">
          {JPP_TERMS.map((term) => (
            <li
              key={term}
              className="border-l border-[#1d3c34]/15 pl-5 text-[14px] leading-relaxed text-on-cream-body"
            >
              {term}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
