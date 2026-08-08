import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import { WHY_TESTIMONIALS } from "../../data/whyChooseBianca";

export default function WhyTestimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <EditorialReveal className="mx-auto max-w-2xl text-center">
          <EditorialEyebrow className="mb-4">Client voices</EditorialEyebrow>
          <h2
            id="testimonials-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Chosen—and worn—with confidence.
          </h2>
          <p className="mt-5 text-house-body leading-relaxed text-on-cream-body">
            From everyday pieces in the USA to considered commissions in India,
            clients trust Bianca for design and the experience around it.
          </p>
        </EditorialReveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2">
          {WHY_TESTIMONIALS.map((item, index) => (
            <EditorialReveal key={item.id} delay={index * 70}>
              <li className="flex h-full flex-col border-t border-[#766d42]/35 pt-6">
                <blockquote className="flex flex-1 flex-col">
                  <p className="font-editorial text-[1.05rem] italic leading-relaxed tracking-[0.02em] text-[#1d3c34] md:text-[1.125rem]">
                    “{item.quote}”
                  </p>
                  <footer className="mt-6">
                    <p className="font-editorial text-[12px] uppercase tracking-[0.18em] text-[#1d3c34]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-gold-on-cream">
                      {item.locale}
                    </p>
                  </footer>
                </blockquote>
              </li>
            </EditorialReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
