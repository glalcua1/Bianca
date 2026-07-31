import EditorialEyebrow from "../editorial/EditorialEyebrow";
import ProtectedImage from "../protection/ProtectedImage";
import WhyCtaButton from "./WhyCtaButton";

type Props = {
  onCustomDesign: () => void;
};

export default function WhyHero({ onCustomDesign }: Props) {
  return (
    <header className="relative min-h-[min(92vh,860px)] overflow-hidden bg-[#1d3c34]">
      <ProtectedImage
        priority
        src="/bianca-diamonds-lab-grown-jewellery-hero-poster.jpg"
        alt="Luxury lab-grown diamond jewellery — Bianca Diamonds"
        wrapperClassName="absolute inset-0"
        className="size-full object-cover object-center scale-105 motion-reduce:scale-100 animate-[bespokeHeroFade_1.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1d3c34]/95 via-[#1d3c34]/78 to-[#1d3c34]/40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/88 via-[#1d3c34]/25 to-[#1d3c34]/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_20%_40%,rgba(220,203,123,0.12),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[min(92vh,860px)] max-w-7xl items-end px-6 py-16 md:items-center md:px-10 md:py-24">
        <div className="max-w-xl animate-[bespokeHeroFade_1.1s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none">
          <EditorialEyebrow tone="gold" className="mb-5">
            Bianca Diamonds
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2.25rem,6vw,4rem)] font-normal leading-[1.05] tracking-[0.05em] text-[#f9f9f9]">
            Luxury, made personal.
          </h1>
          <p className="mt-6 max-w-lg text-house-body leading-relaxed text-on-forest-body">
            Choosing a diamond is about more than the stone itself. It is about
            trust, craftsmanship, design—and finding something that feels
            uniquely yours.
          </p>
          <p className="mt-4 max-w-lg text-house-body leading-relaxed text-on-forest-muted">
            At Bianca Diamonds, we combine exceptional lab-grown diamonds,
            contemporary design and personalised craftsmanship to create
            jewellery made around you—not simply selected from what happens to
            be available.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <WhyCtaButton variant="primary-light" onClick={onCustomDesign}>
              Create Your Custom Jewellery
            </WhyCtaButton>
            <WhyCtaButton variant="ghost-light" to="/fine-jewellery">
              Explore Our Diamonds
            </WhyCtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
