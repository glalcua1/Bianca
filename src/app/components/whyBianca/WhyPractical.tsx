import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";

/**
 * Only the practical differentiators that are not already covered above
 * (service is in the approach pillars; certification is in Diamonds).
 */
export default function WhyPractical() {
  return (
    <section
      aria-labelledby="practical-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow className="mb-4">The practical side</EditorialEyebrow>
          <h2
            id="practical-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            More into the jewellery. Less into the showroom.
          </h2>
        </EditorialReveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <EditorialReveal>
            <h3 className="font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              Better value, by design
            </h3>
            <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
              We operate digital-first—so more of what you invest can go into the
              diamond, the gold, and the craftsmanship.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={60}>
            <h3 className="font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              Jewellery that can evolve
            </h3>
            <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
              Exchange toward a higher-value Bianca piece is available, subject
              to terms. Ask your consultant before you buy if this matters to
              you.
            </p>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
