import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import { WHY_FOUR_CS } from "../../data/whyChooseBianca";

export default function WhyCertified() {
  return (
    <section
      aria-labelledby="certified-heading"
      className="px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <EditorialReveal>
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f0e6]">
              <ProtectedImage
                src="/Rings/bianca-diamonds-atelier-portrait-diamond-ring.jpg"
                alt="IGI-certified lab-grown diamond ring — Bianca Diamonds"
                wrapperClassName="absolute inset-0"
                className="size-full object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 50vw"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-2 max-w-[70%] border border-[#766d42]/25 bg-[#faf8f5] px-5 py-4 shadow-[0_18px_40px_rgba(29,60,52,0.1)] md:-right-6 md:px-7 md:py-5">
              <p className="font-editorial text-[11px] uppercase tracking-[0.2em] text-gold-on-cream">
                Assurance
              </p>
              <p className="mt-2 font-editorial text-lg tracking-[0.04em] text-[#1d3c34] md:text-xl">
                Your diamond. Your certificate. Your confidence.
              </p>
            </div>
          </div>
        </EditorialReveal>

        <EditorialReveal delay={100}>
          <EditorialEyebrow className="mb-4">Certified Diamonds</EditorialEyebrow>
          <h2
            id="certified-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Certified Diamonds. Complete Confidence.
          </h2>
          <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
            Are Bianca&apos;s diamonds certified?
          </p>
          <div className="mt-4 space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              Yes. Our diamonds are IGI certified, giving you independent
              verification of the diamond&apos;s key characteristics, including
              its 4Cs—Cut, Colour, Clarity and Carat.
            </p>
            <p>
              For us, certification is not simply a document. It is part of the
              confidence you should have when investing in a piece of jewellery.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4" aria-label="The 4Cs">
            {WHY_FOUR_CS.map((item) => (
              <li
                key={item.id}
                className="border-t border-[#766d42]/30 pt-4"
              >
                <p className="font-editorial text-sm tracking-[0.12em] uppercase text-[#1d3c34]">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-on-cream-body">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </EditorialReveal>
      </div>
    </section>
  );
}
