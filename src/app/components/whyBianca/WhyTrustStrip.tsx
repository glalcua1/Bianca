import EditorialReveal from "../editorial/EditorialReveal";
import { WHY_TRUST_PILLARS } from "../../data/whyChooseBianca";

export default function WhyTrustStrip() {
  return (
    <section
      aria-label="Trust pillars"
      className="border-b border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-12 md:px-10 md:py-14"
    >
      <EditorialReveal>
        <ul className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WHY_TRUST_PILLARS.map((pillar, index) => (
            <li key={pillar.id} className="text-center">
              <p className="font-editorial text-[10px] tracking-[0.28em] text-gold-on-cream">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-editorial text-[14px] tracking-[0.08em] uppercase text-[#1d3c34] md:text-[15px]">
                {pillar.title}
              </p>
              <p className="mt-2 text-house-body text-sm text-on-cream-body">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </EditorialReveal>
    </section>
  );
}
