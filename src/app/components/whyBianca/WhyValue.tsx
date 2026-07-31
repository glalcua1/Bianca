import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";

const VALUE_POINTS = [
  "The diamond.",
  "The craftsmanship.",
  "The design.",
] as const;

export default function WhyValue() {
  return (
    <section
      aria-labelledby="value-heading"
      className="px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow className="mb-4">Better Value</EditorialEyebrow>
          <h2
            id="value-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Better Value, By Design.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-house-body leading-relaxed text-on-cream-body">
            Because Bianca operates primarily through a digital-first model
            rather than maintaining a traditional network of expensive physical
            retail stores, we can keep our operating costs more focused and pass
            more value on to the customer.
          </p>
          <p className="mt-8 font-editorial text-[15px] tracking-[0.06em] text-gold-on-cream">
            That means you can invest more in the things that matter:
          </p>
        </EditorialReveal>

        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          {VALUE_POINTS.map((point, index) => (
            <EditorialReveal key={point} delay={index * 80}>
              <li className="border border-[#1d3c34]/10 bg-[#faf8f5] px-6 py-8 text-center">
                <p className="font-editorial text-[10px] tracking-[0.28em] text-gold-on-cream">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
                  {point}
                </p>
              </li>
            </EditorialReveal>
          ))}
        </ul>

        <EditorialReveal className="mt-10 text-center">
          <p className="text-house-body leading-relaxed text-on-cream-muted">
            Not the overhead of a traditional retail experience.
          </p>
          <p className="mt-6 font-editorial text-[clamp(1.15rem,2.4vw,1.4rem)] tracking-[0.04em] text-[#1d3c34]">
            More of your investment goes into the jewellery itself.
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
