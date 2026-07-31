import EditorialReveal from "../editorial/EditorialReveal";
import WhyCtaButton from "./WhyCtaButton";

type Props = {
  onCustomDesign: () => void;
  onSpeakToExpert: () => void;
};

export default function WhyFinalCta({
  onCustomDesign,
  onSpeakToExpert,
}: Props) {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <EditorialReveal>
          <h2
            id="final-cta-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#f9f9f9]"
          >
            Your Diamond. Your Design. Your Bianca.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
            Luxury is not about owning what everyone else owns. It is about
            finding something that feels unmistakably yours.
          </p>
          <p className="mt-6 font-editorial text-[clamp(1.05rem,2.2vw,1.25rem)] italic tracking-[0.03em] text-gold-on-forest">
            Tell us what you&apos;re imagining. We&apos;ll help you create it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhyCtaButton variant="primary-light" onClick={onCustomDesign}>
              Start Your Custom Design
            </WhyCtaButton>
            <WhyCtaButton variant="ghost-light" onClick={onSpeakToExpert}>
              Speak to a Bianca Expert
            </WhyCtaButton>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
