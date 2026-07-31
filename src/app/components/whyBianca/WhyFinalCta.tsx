import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
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
      className="relative overflow-hidden bg-[#1d3c34]"
    >
      <ProtectedImage
        src="/bianca-diamonds-editorial-portrait.jpg"
        alt="Editorial portrait with Bianca Diamonds jewellery"
        wrapperClassName="absolute inset-0"
        className="size-full object-cover object-center opacity-35"
        sizes="100vw"
        loading="lazy"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1d3c34]/70 via-[#1d3c34]/85 to-[#1d3c34]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(220,203,123,0.12),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:px-10 md:py-32">
        <EditorialReveal>
          <h2
            id="final-cta-heading"
            className="font-editorial text-[clamp(1.85rem,4.5vw,3rem)] tracking-[0.05em] text-[#f9f9f9]"
          >
            Your Diamond. Your Design. Your Bianca.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-forest-body">
            <p>
              Luxury is not about owning what everyone else owns.
            </p>
            <p>It is about finding something that feels unmistakably yours.</p>
            <p>
              Whether you are looking for an engagement ring, a gift for someone
              special, a statement piece or a completely bespoke creation,
              Bianca Diamonds brings together exceptional lab-grown diamonds,
              modern design and personalised craftsmanship to create jewellery
              that is made for your story.
            </p>
          </div>
          <p className="mt-10 font-editorial text-[clamp(1.15rem,2.4vw,1.4rem)] italic tracking-[0.03em] text-gold-on-forest">
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
