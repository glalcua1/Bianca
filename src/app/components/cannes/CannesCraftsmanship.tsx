import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import { CANNES_CRAFT_VALUES } from "../../data/cannesShowcase2026";

export default function CannesCraftsmanship() {
  return (
    <section
      aria-labelledby="cannes-craft-heading"
      className="border-t border-[#1d3c34]/8 bg-[#faf8f5] px-6 py-20 md:px-10 md:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialReveal className="mb-16 text-center md:mb-20">
          <EditorialEyebrow className="mb-5">The Atelier</EditorialEyebrow>
          <h2
            id="cannes-craft-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            The Art Behind Every Sparkle
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-house-body text-on-cream-body">
            What the world saw at Cannes is the result of countless hours at
            the bench — where science, ethics, and Indian artisan tradition
            converge.
          </p>
        </EditorialReveal>

        <ul className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
          {CANNES_CRAFT_VALUES.map((value, index) => (
            <li key={value.title}>
              <EditorialReveal delay={index * 100}>
                <div className="text-center md:text-left">
                  <div
                    className="mx-auto mb-6 flex h-px w-10 bg-[#1d3c34]/20 md:mx-0"
                    aria-hidden
                  />
                  <h3 className="font-editorial text-xl tracking-[0.06em] text-[#1d3c34] md:text-[1.35rem]">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-house-body text-on-cream-body">
                    {value.description}
                  </p>
                </div>
              </EditorialReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
