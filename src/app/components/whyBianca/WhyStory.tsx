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
            Luxury should feel chosen—not chosen for you.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-cream-body">
            Many houses ask you to pick from what they already have. We begin
            with what you want the jewellery to say—then design and craft toward
            that.
          </p>
        </EditorialReveal>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {WHY_DIFFERENCE_PILLARS.map((pillar, index) => (
            <EditorialReveal key={pillar.id} delay={index * 60}>
              <li className="border-t border-[#766d42]/30 pt-5">
                <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                  {pillar.number}
                </p>
                <h3 className="mt-2 font-editorial text-lg tracking-[0.04em] text-[#1d3c34] md:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-house-body text-sm leading-relaxed text-on-cream-body md:text-[15px]">
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
