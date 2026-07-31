import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyJourneyRail from "./WhyJourneyRail";
import { WHY_SOURCING_FLOW } from "../../data/whyChooseBianca";

export default function WhySourcing() {
  return (
    <section
      aria-labelledby="sourcing-heading"
      className="border-y border-[#1d3c34]/10 bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow tone="gold" className="mb-4">
            Our Diamond Sourcing
          </EditorialEyebrow>
          <h2
            id="sourcing-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#f9f9f9]"
          >
            Exceptional Diamonds, Sourced From Leading Growers.
          </h2>
          <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-forest">
            Where do Bianca&apos;s diamonds come from?
          </p>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-forest-body">
            <p>
              We source our diamonds from leading global laboratory-grown
              diamond manufacturers, including Greenlab and Kira.
            </p>
            <p>
              Our approach is simple: we work with trusted sources so that we
              can offer our customers access to diamonds across a wide range of
              sizes, shapes, colours and clarities, while maintaining the
              quality standards we expect at Bianca.
            </p>
          </div>
        </EditorialReveal>

        <EditorialReveal delay={80} className="mt-14">
          <WhyJourneyRail
            steps={WHY_SOURCING_FLOW}
            tone="forest"
            className="mx-auto max-w-3xl"
          />
        </EditorialReveal>

        <EditorialReveal delay={120} className="mx-auto mt-14 max-w-2xl">
          <blockquote className="border border-[#766d42]/30 bg-[#163029] px-6 py-8 md:px-10 md:py-10">
            <p className="text-house-body leading-relaxed text-on-forest-body">
              One of the most notable examples of India&apos;s growing expertise
              in laboratory-grown diamonds is the 7.50-carat lab-grown diamond
              gifted by Prime Minister Narendra Modi to Jill Biden in 2023.
              According to the International Gemological Institute (IGI), the
              diamond was manufactured by Surat-based Greenlab and graded F
              colour, VVS2 clarity and Ideal cut.
            </p>
            <p className="mt-6 text-house-body leading-relaxed text-on-forest-muted">
              At Bianca, we bring this new generation of diamond craftsmanship
              into jewellery designed for you.
            </p>
          </blockquote>
        </EditorialReveal>
      </div>
    </section>
  );
}
