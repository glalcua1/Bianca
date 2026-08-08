import EditorialReveal from "../editorial/EditorialReveal";
import WhyCtaButton from "./WhyCtaButton";

type Props = {
  onCustomDesign: () => void;
};

export default function WhyFinalCta({ onCustomDesign }: Props) {
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
            Ready when you are.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-house-body leading-relaxed text-on-forest-body">
            Tell us what you&apos;re imagining. We&apos;ll help you choose the
            diamond and shape the design—with calm, clear guidance.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhyCtaButton variant="primary-light" onClick={onCustomDesign}>
              Speak with a consultant
            </WhyCtaButton>
            <WhyCtaButton variant="ghost-light" to="/fine-jewellery">
              Explore the salon
            </WhyCtaButton>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
