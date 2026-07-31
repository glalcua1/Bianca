import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyCtaButton from "./WhyCtaButton";
import WhyJourneyRail from "./WhyJourneyRail";
import { WHY_EXCHANGE_JOURNEY } from "../../data/whyChooseBianca";

type Props = {
  onSpeakToExpert: () => void;
};

export default function WhyExchange({ onSpeakToExpert }: Props) {
  return (
    <section
      aria-labelledby="exchange-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <EditorialReveal>
          <EditorialEyebrow className="mb-4">Exchange & Upgrade</EditorialEyebrow>
          <h2
            id="exchange-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Jewellery That Can Evolve With You.
          </h2>
          <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
            Does Bianca offer a buyback or exchange policy?
          </p>
          <div className="mx-auto mt-5 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              Yes. We offer an exchange option towards a higher-value Bianca
              jewellery piece, subject to our applicable exchange terms and
              conditions.
            </p>
            <p>We believe your jewellery should be able to evolve with your life.</p>
          </div>
        </EditorialReveal>

        <EditorialReveal delay={80} className="mt-12">
          <WhyJourneyRail steps={WHY_EXCHANGE_JOURNEY} />
        </EditorialReveal>

        <EditorialReveal delay={120} className="mt-10">
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-on-cream-muted">
            For complete details on our exchange policy, please refer to our
            terms or speak with our team before purchasing.
          </p>
          <div className="mt-8">
            <WhyCtaButton onClick={onSpeakToExpert}>
              Speak to a Bianca Expert
            </WhyCtaButton>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
