import EditorialEyebrow from "../editorial/EditorialEyebrow";
import WhyCtaButton from "./WhyCtaButton";

type Props = {
  onCustomDesign: () => void;
};

export default function WhyHero({ onCustomDesign }: Props) {
  return (
    <header className="relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(220,203,123,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <EditorialEyebrow tone="gold" className="mb-5">
          Why Choose Bianca Diamonds?
        </EditorialEyebrow>
        <h1 className="font-editorial text-[clamp(2.25rem,5.5vw,3.75rem)] font-normal leading-[1.08] tracking-[0.05em] text-[#f9f9f9]">
          Luxury, made personal.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
          Choosing a diamond is about more than the stone itself. It is about
          trust, craftsmanship, design—and finding something that feels uniquely
          yours.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <WhyCtaButton variant="primary-light" onClick={onCustomDesign}>
            Create Your Custom Jewellery
          </WhyCtaButton>
          <WhyCtaButton variant="ghost-light" to="/fine-jewellery">
            Explore Our Diamonds
          </WhyCtaButton>
        </div>
      </div>
    </header>
  );
}
