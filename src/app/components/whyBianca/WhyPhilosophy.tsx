import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import { WHY_PHILOSOPHY_STEPS } from "../../data/whyChooseBianca";

export default function WhyPhilosophy() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_10%,rgba(244,240,230,0.9),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow className="mb-4">The Bianca Philosophy</EditorialEyebrow>
          <h2
            id="philosophy-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            We don&apos;t believe luxury should be one-size-fits-all.
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-house-body leading-relaxed text-on-cream-body">
            <p>
              Many jewellery brands start with what they already have and ask
              you to choose from it.
            </p>
            <p>At Bianca, we start with what you want.</p>
            <p>
              You can bring us an idea, a reference, a sketch—or simply tell us
              the occasion and the feeling you want the jewellery to capture.
            </p>
            <p>
              We then work with you to create something that feels personal.
            </p>
          </div>
        </EditorialReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {WHY_PHILOSOPHY_STEPS.map((step, index) => (
            <EditorialReveal key={step.id} delay={index * 100}>
              <article className="group relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f0e6]">
                  <ProtectedImage
                    src={step.image}
                    alt={step.imageAlt}
                    wrapperClassName="absolute inset-0"
                    className="size-full object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 90vw, 33vw"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/55 via-transparent to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-editorial text-[11px] uppercase tracking-[0.22em] text-gold-on-forest">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-editorial text-xl tracking-[0.06em] text-[#f9f9f9]">
                      {step.label}
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-house-body text-sm leading-relaxed text-on-cream-body">
                  {step.description}
                </p>
                {index < WHY_PHILOSOPHY_STEPS.length - 1 ? (
                  <p
                    className="mt-3 hidden font-editorial text-gold-on-cream md:absolute md:-right-3 md:top-[42%] md:mt-0 md:block md:translate-x-1/2"
                    aria-hidden
                  >
                    →
                  </p>
                ) : null}
              </article>
            </EditorialReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
