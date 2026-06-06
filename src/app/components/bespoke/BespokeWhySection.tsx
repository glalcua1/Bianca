import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import BespokeSectionHeader from "./BespokeSectionHeader";
import {
  BESPOKE_WHY_CARDS,
  BESPOKE_WHY_ORCHID_IMAGE,
} from "../../data/bespokeJewellery";

export default function BespokeWhySection() {
  return (
    <section
      aria-labelledby="why-bespoke-heading"
      className="relative border-t border-[#766d42]/12 bg-[#f4f0e6] px-6 py-24 md:px-10 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        <BespokeSectionHeader
          id="why-bespoke-heading"
          eyebrow="Why Bianca Bespoke"
          title="Created Without Compromise"
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
          {/* Full clear orchid card */}
          <EditorialReveal className="min-h-[320px] lg:min-h-0">
            <div className="relative h-full min-h-[320px] overflow-hidden ring-1 ring-[#766d42]/25 lg:min-h-[520px]">
              <ProtectedImage
                src={BESPOKE_WHY_ORCHID_IMAGE}
                alt="White orchids in dramatic salon light — Bianca bespoke"
                wrapperClassName="absolute inset-0"
                className="size-full object-cover object-center"
              />
            </div>
          </EditorialReveal>

          {/* Four promise cards — frosted glass over orchid wash */}
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <div className="absolute inset-0 overflow-hidden" aria-hidden>
              <ProtectedImage
                src={BESPOKE_WHY_ORCHID_IMAGE}
                alt=""
                wrapperClassName="size-full"
                className="size-full scale-105 object-cover object-center blur-[2px] brightness-[0.97]"
              />
              <div className="absolute inset-0 bg-[#faf8f5]/25" />
            </div>

            <ul className="relative grid h-full gap-4 sm:grid-cols-2 sm:gap-5">
              {BESPOKE_WHY_CARDS.map((card, index) => (
                <li key={card.id} className="h-full">
                  <EditorialReveal delay={index * 60} className="h-full">
                    <div className="bespoke-glass-card group flex h-full min-h-[148px] flex-col border border-white/60 p-6 shadow-[0_8px_32px_rgba(29,60,52,0.1)] transition duration-300 ease-out hover:border-[#dccb7b]/50 hover:shadow-[0_12px_40px_rgba(29,60,52,0.14)] motion-reduce:transition-none md:min-h-[160px] md:p-7">
                      <div className="mb-4 h-px w-8 bg-[#766d42]/50 transition-all duration-300 group-hover:w-11 group-hover:bg-[#dccb7b]" />
                      <h3 className="font-editorial text-[clamp(1.05rem,2.2vw,1.2rem)] leading-snug tracking-[0.05em] text-[#1d3c34]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-house-body text-[14px] leading-relaxed text-[#1d3c34]/85">
                        {card.description}
                      </p>
                    </div>
                  </EditorialReveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
