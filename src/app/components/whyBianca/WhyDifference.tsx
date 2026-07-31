import { useEffect, useState } from "react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import { WHY_DIFFERENCE_PILLARS } from "../../data/whyChooseBianca";

export default function WhyDifference() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % WHY_DIFFERENCE_PILLARS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const current = WHY_DIFFERENCE_PILLARS[active];

  return (
    <section
      aria-labelledby="difference-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialReveal className="mb-12 text-center md:mb-16">
          <EditorialEyebrow className="mb-4">Why Bianca</EditorialEyebrow>
          <h2
            id="difference-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            The Bianca Difference
          </h2>
        </EditorialReveal>

        {/* Desktop: sticky visual + numbered list */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-2 lg:items-start">
          <div className="sticky top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#1d3c34]">
              {WHY_DIFFERENCE_PILLARS.map((pillar, index) => (
                <ProtectedImage
                  key={pillar.id}
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  wrapperClassName={`absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                  className="size-full object-cover object-center"
                  sizes="50vw"
                  loading="lazy"
                />
              ))}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/50 via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-editorial text-5xl tracking-[0.08em] text-[#f9f9f9]/30">
                  {current.number}
                </p>
                <p className="mt-2 font-editorial text-2xl tracking-[0.06em] text-[#f9f9f9]">
                  {current.title}
                </p>
              </div>
            </div>
          </div>

          <ul className="space-y-2" aria-label="Bianca difference pillars">
            {WHY_DIFFERENCE_PILLARS.map((pillar, index) => {
              const isActive = index === active;
              return (
                <li key={pillar.id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    className={`w-full border-l-2 px-6 py-7 text-left transition-colors duration-500 ${
                      isActive
                        ? "border-[#766d42] bg-[#faf8f5]"
                        : "border-transparent hover:border-[#766d42]/30 hover:bg-[#faf8f5]/60"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                      {pillar.number}
                    </p>
                    <h3 className="mt-2 font-editorial text-[clamp(1.35rem,2.2vw,1.75rem)] tracking-[0.04em] text-[#1d3c34]">
                      {pillar.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-house-body leading-relaxed text-on-cream-body transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile / tablet stack */}
        <ul className="space-y-8 lg:hidden" aria-label="Bianca difference pillars">
          {WHY_DIFFERENCE_PILLARS.map((pillar, index) => (
            <EditorialReveal key={pillar.id} delay={index * 80}>
              <li className="overflow-hidden bg-[#faf8f5]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProtectedImage
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    wrapperClassName="absolute inset-0"
                    className="size-full object-cover object-center"
                    sizes="100vw"
                    loading="lazy"
                  />
                </div>
                <div className="px-6 py-7">
                  <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                    {pillar.number}
                  </p>
                  <h3 className="mt-2 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-house-body leading-relaxed text-on-cream-body">
                    {pillar.description}
                  </p>
                </div>
              </li>
            </EditorialReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
