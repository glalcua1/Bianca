import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyJourneyRail from "./WhyJourneyRail";
import { WHY_SERVICE_JOURNEY } from "../../data/whyChooseBianca";

export default function WhyService() {
  return (
    <section
      aria-labelledby="service-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <EditorialReveal>
          <EditorialEyebrow className="mb-4">Personal Service</EditorialEyebrow>
          <h2
            id="service-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Personal Service, From Start to Finish.
          </h2>
          <div className="mx-auto mt-6 space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              We don&apos;t believe buying a diamond should feel transactional.
            </p>
            <p>
              From the moment you begin exploring options to the moment your
              jewellery arrives, you have a team that understands your
              requirements and guides you through the process.
            </p>
            <p>
              Whether you need help choosing a diamond, refining a design or
              creating something completely bespoke, our approach is personal
              and one-to-one.
            </p>
          </div>
          <p className="mt-10 font-editorial text-[clamp(1.2rem,2.5vw,1.5rem)] italic tracking-[0.03em] text-[#1d3c34]">
            No pressure. No unnecessary upselling. Just thoughtful guidance.
          </p>
        </EditorialReveal>

        <EditorialReveal delay={100} className="mt-14">
          <WhyJourneyRail steps={WHY_SERVICE_JOURNEY} />
        </EditorialReveal>
      </div>
    </section>
  );
}
