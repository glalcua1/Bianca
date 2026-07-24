import EditorialEyebrow from "../editorial/EditorialEyebrow";
import ProtectedImage from "../protection/ProtectedImage";
import BespokeButterflyMark from "./BespokeButterflyMark";

type Props = {
  onStartJourney: () => void;
  onBookConsultation: () => void;
};

const HERO_IMAGE = "/bianca-diamonds-bespoke-necklace.png";

export default function BespokeHero({
  onStartJourney,
  onBookConsultation,
}: Props) {
  return (
    <header className="relative overflow-hidden bg-[#1d3c34]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(220,203,123,0.1),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Copy — left */}
        <div className="max-w-xl animate-[bespokeHeroFade_1.1s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none lg:pr-4">
          <EditorialEyebrow tone="gold" className="mb-5">
            Bespoke Jewellery
          </EditorialEyebrow>
          <p className="mb-5 font-editorial text-[clamp(0.8rem,1.8vw,0.95rem)] tracking-[0.28em] text-gold-on-forest uppercase">
            Orchid · White · Butterfly
          </p>
          <h1 className="font-editorial text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.12] tracking-[0.05em] text-[#f9f9f9]">
            Designed Around
            <br />
            Your Story
          </h1>
          <p className="mt-6 max-w-md text-house-body leading-relaxed text-on-forest-body">
            A private commission — from first conversation to final handcraft.
            Indian artistry and lab-grown brilliance, composed for the world.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStartJourney}
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9] bg-[#f9f9f9] px-10 py-3.5 text-house-cta text-[#1d3c34] transition duration-300 ease-out hover:bg-transparent hover:text-[#f9f9f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dccb7b]/60"
            >
              Start Your Bespoke Journey
            </button>
            <button
              type="button"
              onClick={onBookConsultation}
              className="inline-flex min-w-[220px] justify-center border border-[#f9f9f9]/35 px-10 py-3.5 text-house-cta text-[#f9f9f9] transition duration-300 ease-out hover:border-[#f9f9f9] hover:bg-[#f9f9f9]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dccb7b]/60"
            >
              Book a Private Consultation
            </button>
          </div>
          <BespokeButterflyMark
            tone="gold"
            className="mt-10 size-8 opacity-35 motion-reduce:opacity-25"
          />
        </div>

        {/* Image — right, full piece visible */}
        <div className="relative flex items-center justify-center animate-[bespokeHeroFade_1.3s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none lg:justify-end">
          <div className="relative w-full max-w-lg lg:max-w-none">
            <ProtectedImage
              priority
              src={HERO_IMAGE}
              alt="Bespoke emerald and diamond suite with white orchids — Bianca Diamonds"
              wrapperClassName="relative flex aspect-[4/5] w-full items-center justify-center sm:aspect-square lg:aspect-[4/5] lg:max-h-[min(72vh,640px)]"
              className="max-h-full max-w-full object-contain object-center transition duration-700 ease-out hover:scale-[1.01] motion-reduce:transition-none"
            />
          </div>
        </div>
      </div>

      {/* Brand symbols — forest green strip */}
      <div className="relative border-t border-[#766d42]/35">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-[#766d42]/35 px-6 py-5 md:px-10">
          {[
            { label: "White Orchid", sub: "Rare beauty" },
            { label: "Butterfly", sub: "Transformation" },
            { label: "Heirloom", sub: "Forever yours" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center px-2 text-center first:pl-0 last:pr-0"
            >
              <span className="font-editorial text-[11px] uppercase tracking-[0.2em] text-gold-on-forest md:text-[12px]">
                {item.label}
              </span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.16em] text-on-forest-muted">
                {item.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
