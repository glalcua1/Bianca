import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import { WHY_DIFFERENCE_PILLARS } from "../../data/whyChooseBianca";

export default function WhyStory() {
  return (
    <section
      aria-labelledby="story-heading"
      className="px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow className="mb-4">The Bianca Approach</EditorialEyebrow>
          <h2
            id="story-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            We don&apos;t believe luxury should be one-size-fits-all.
          </h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              Many jewellery brands start with what they already have and ask
              you to choose from it. At Bianca, we start with what you want.
            </p>
            <p>
              Bring an idea, a reference, a sketch—or simply the occasion and
              the feeling you want the jewellery to capture. We work with you to
              create something that feels personal.
            </p>
          </div>
        </EditorialReveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2">
          {WHY_DIFFERENCE_PILLARS.map((pillar, index) => (
            <EditorialReveal key={pillar.id} delay={index * 60}>
              <li className="border-t border-[#766d42]/30 pt-5">
                <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                  {pillar.number}
                </p>
                <h3 className="mt-2 font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
                  {pillar.description}
                </p>
              </li>
            </EditorialReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
