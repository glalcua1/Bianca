import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyCtaButton from "./WhyCtaButton";

type Props = {
  onSpeakToExpert: () => void;
};

export default function WhyPractical({ onSpeakToExpert }: Props) {
  return (
    <section
      aria-labelledby="practical-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow className="mb-4">Working With Bianca</EditorialEyebrow>
          <h2
            id="practical-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Personal. Transparent. Thoughtful.
          </h2>
        </EditorialReveal>

        <div className="mt-12 space-y-10">
          <EditorialReveal>
            <h3 className="font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              Personal service
            </h3>
            <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
              From first conversation to delivery, you have one-to-one guidance.
              No pressure. No unnecessary upselling—just thoughtful help choosing
              a diamond, refining a design, or creating something bespoke.
            </p>
          </EditorialReveal>

          <EditorialReveal>
            <h3 className="font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              Better value, by design
            </h3>
            <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
              Because Bianca operates primarily digital-first rather than through
              a network of expensive retail stores, more of your investment can
              go into the diamond, the craftsmanship and the design.
            </p>
          </EditorialReveal>

          <EditorialReveal>
            <h3 className="font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              Jewellery that can evolve with you
            </h3>
            <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
              We offer an exchange option towards a higher-value Bianca piece,
              subject to applicable terms. For details, speak with our team
              before purchasing.
            </p>
            <div className="mt-6">
              <WhyCtaButton variant="secondary" onClick={onSpeakToExpert}>
                Speak to a Bianca Expert
              </WhyCtaButton>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
