import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyJourneyRail from "./WhyJourneyRail";
import { WHY_TIMELINE_STEPS } from "../../data/whyChooseBianca";

export default function WhyTimeline() {
  return (
    <section
      aria-labelledby="timeline-heading"
      className="px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <EditorialReveal>
          <EditorialEyebrow className="mb-4">Custom Timeline</EditorialEyebrow>
          <h2
            id="timeline-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Made Especially for You.
          </h2>
          <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
            How long does custom jewellery take?
          </p>
          <p className="mt-8 font-editorial text-[clamp(3rem,10vw,5.5rem)] leading-none tracking-[0.04em] text-[#1d3c34]">
            15–30
          </p>
          <p className="mt-2 font-editorial text-xl tracking-[0.2em] uppercase text-gold-on-cream">
            Days
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-house-body leading-relaxed text-on-cream-body">
            Custom jewellery typically takes approximately 15 days to one month,
            depending on the complexity of the design, diamond availability and
            the quantity required.
          </p>
        </EditorialReveal>

        <EditorialReveal delay={80} className="mt-12">
          <WhyJourneyRail steps={WHY_TIMELINE_STEPS} />
        </EditorialReveal>

        <EditorialReveal delay={120} className="mt-10">
          <p className="text-house-body leading-relaxed text-on-cream-muted">
            For a more accurate timeline, our team will discuss the design and
            requirements with you before we begin.
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
