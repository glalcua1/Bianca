import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import CannesEditorialReel from "./CannesEditorialReel";
import CannesSketchCarousel from "./CannesSketchCarousel";
import { CANNES_EDITORIAL, CANNES_SKETCHES } from "../../data/cannesShowcase2026";

export default function CannesEditorialStory() {
  const reelSrc = encodeURI(CANNES_EDITORIAL.primaryVideo);

  return (
    <section
      aria-labelledby="cannes-story-heading"
      className="relative overflow-hidden bg-[#1d3c34] px-6 py-24 md:px-10 md:py-32 lg:px-16 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(220,203,123,0.08),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1f1b]/40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <EditorialReveal className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <EditorialEyebrow tone="gold" className="mb-6">
            The Editorial
          </EditorialEyebrow>
          <h2
            id="cannes-story-heading"
            className="font-editorial text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.12] tracking-[0.06em] text-[#f9f9f9]"
          >
            A Moment of Global Elegance
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-house-body text-on-forest-body">
            At Cannes — where a young Indian founder met the world&apos;s most
            celebrated red carpet.
          </p>
        </EditorialReveal>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <EditorialReveal
            delay={100}
            className="lg:col-span-5 lg:flex lg:justify-end lg:pr-6 xl:pr-10"
          >
            <CannesEditorialReel
              src={reelSrc}
              label="Cannes — Editorial Reel"
              ariaLabel={CANNES_EDITORIAL.primaryVideoAlt}
            />
          </EditorialReveal>

          <EditorialReveal
            delay={180}
            className="lg:col-span-7 lg:flex lg:items-center lg:pl-2 xl:pl-6"
          >
            <div className="max-w-xl">
            <p className="font-editorial text-[clamp(1.2rem,2.2vw,1.55rem)] leading-[1.5] tracking-[0.03em] text-[#f9f9f9]">
              In an industry where heritage is often measured in decades,
              Bianca Diamonds arrived with something rarer still: the clarity
              of a young luxury house devoted to the rigour of fine jewellery
              craft.
            </p>

            <div className="my-8 h-px w-14 bg-[#dccb7b]/40" aria-hidden />

            <div className="space-y-5 text-house-body text-on-forest-body">
              <p>
                On the Croisette, beneath the flash of premiere lights, our
                pieces did not announce themselves. They completed a silhouette
                — translating the quiet ambition of a women-led atelier into a
                language the world already understands.
              </p>
              <p>
                Cannes was never a destination in itself. It was a mirror:
                proof that modern Indian luxury, rooted in ethical lab-grown
                brilliance and meticulous hand-finishing, belongs on the same
                stage as the century-old maisons.
              </p>
            </div>

            <blockquote className="mt-10 border-l border-[#dccb7b]/50 pl-6 md:pl-8">
              <p className="font-editorial text-[clamp(1.05rem,1.8vw,1.25rem)] italic leading-[1.55] tracking-[0.03em] text-gold-on-forest">
                &ldquo;Each piece was chosen with editorial intent — not to
                overwhelm the red carpet, but to inhabit it.&rdquo;
              </p>
            </blockquote>
            </div>
          </EditorialReveal>
        </div>

        <EditorialReveal className="mt-20 md:mt-28" delay={140}>
          <div className="border-t border-[#f9f9f9]/10 pt-14 md:pt-20">
            <div className="mb-10 text-center md:mb-14">
              <EditorialEyebrow tone="gold" className="mb-5">
                From the Sketchbook
              </EditorialEyebrow>
              <h3 className="font-editorial text-[clamp(1.4rem,2.8vw,2rem)] tracking-[0.06em] text-[#f9f9f9]">
                Where Design Begins
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-house-body text-on-forest-body">
                Hand-drawn studies from the atelier — the first whisper of a
                silhouette before stone meets gold.
              </p>
            </div>

            <CannesSketchCarousel sketches={CANNES_SKETCHES} />
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
