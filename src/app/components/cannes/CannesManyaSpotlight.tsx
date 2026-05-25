import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedVideo from "../protection/ProtectedVideo";
import { CANNES_EDITORIAL } from "../../data/cannesShowcase2026";

export default function CannesManyaSpotlight() {
  return (
    <section
      aria-labelledby="cannes-motion-heading"
      className="border-t border-[#1d3c34]/8 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <EditorialReveal className="order-2 lg:order-1">
            <EditorialEyebrow className="mb-5">On the Croisette</EditorialEyebrow>
            <h2
              id="cannes-motion-heading"
              className="font-['Times_New_Roman',serif] text-[clamp(1.65rem,3.2vw,2.35rem)] leading-[1.2] tracking-[0.06em] text-[#1d3c34]"
            >
              Cannes in Motion
            </h2>
            <div className="my-7 h-px w-12 bg-[#766d42]/30" aria-hidden />
            <div className="max-w-md space-y-5 font-['Arial',sans-serif] text-sm leading-[1.85] text-[#5a6b66] md:text-[15px]">
              <p>
                Bianca Diamonds arrived on the Cannes red carpet with the kind
                of ease that cannot be styled into existence — only understood.
                A presence defined not by spectacle, but by alignment: modern
                Indian grace meeting craft and camera on the world&apos;s most
                celebrated stage.
              </p>
              <p>
                The showcase was conceived with restraint. Jewellery as an
                extension of character — not a costume layered upon it. On the
                steps of the Palais, the pieces moved with deliberate, luminous
                poise.
              </p>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={150} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[min(100%,360px)] lg:ml-auto lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-2 rounded-sm bg-[#1d3c34]/5 blur-xl"
                aria-hidden
              />
              <div className="relative aspect-[9/16] overflow-hidden rounded-sm bg-[#1d3c34] shadow-[0_24px_60px_rgba(29,60,52,0.15)] ring-1 ring-[#1d3c34]/10">
                <ProtectedVideo
                  src={CANNES_EDITORIAL.manyaVideo}
                  className="object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={CANNES_EDITORIAL.manyaAlt}
                />
              </div>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
