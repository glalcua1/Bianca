import { useState } from "react";
import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import {
  WHY_DIAMOND_SHAPES,
  WHY_FANCY_COLOURS,
  WHY_FOUR_CS,
} from "../../data/whyChooseBianca";

export default function WhyFourCsSection() {
  const [activeC, setActiveC] = useState(0);

  return (
    <section
      aria-labelledby="choose-diamond-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialReveal className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow className="mb-4">The 4Cs</EditorialEyebrow>
          <h2
            id="choose-diamond-heading"
            className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Choose the Diamond That Feels Right.
          </h2>
          <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
            Can I choose my own diamond?
          </p>
          <p className="mt-3 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
            Yes. And we believe you should.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-house-body leading-relaxed text-on-cream-body">
            Every diamond is different. The right choice depends on your desired
            look, budget and the piece of jewellery you are creating.
          </p>
        </EditorialReveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_FOUR_CS.map((item, index) => {
            const isActive = index === activeC;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveC(index)}
                onMouseEnter={() => setActiveC(index)}
                className={`border px-5 py-6 text-left transition-colors duration-500 ${
                  isActive
                    ? "border-[#1d3c34] bg-[#1d3c34] text-[#f9f9f9]"
                    : "border-[#1d3c34]/12 bg-[#faf8f5] text-[#1d3c34] hover:border-[#766d42]/40"
                }`}
                aria-pressed={isActive}
              >
                <p
                  className={`font-editorial text-[11px] uppercase tracking-[0.2em] ${
                    isActive ? "text-gold-on-forest" : "text-gold-on-cream"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-editorial text-xl tracking-[0.06em]">
                  {item.title}
                </h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isActive ? "text-on-forest-body" : "text-on-cream-body"
                  }`}
                >
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <EditorialReveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-house-body leading-relaxed text-on-cream-body">
            For many of our designs, we recommend{" "}
            <span className="text-[#1d3c34]">E–F colour</span> and{" "}
            <span className="text-[#1d3c34]">VVS2 clarity</span> as an excellent
            balance of exceptional visual quality and value.
          </p>
          <p className="mt-4 text-house-body leading-relaxed text-on-cream-muted">
            However, there is no single &ldquo;perfect&rdquo; diamond. We help
            you select the combination that works best for you.
          </p>
        </EditorialReveal>

        <EditorialReveal className="mt-16">
          <h3 className="text-center font-editorial text-[clamp(1.35rem,3vw,1.75rem)] tracking-[0.06em] text-[#1d3c34]">
            Popular Shapes
          </h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_DIAMOND_SHAPES.map((shape) => (
              <li key={shape.id} className="group overflow-hidden bg-[#faf8f5]">
                <div className="relative aspect-square overflow-hidden">
                  <ProtectedImage
                    src={shape.image}
                    alt={shape.imageAlt}
                    wrapperClassName="absolute inset-0"
                    className="size-full object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 640px) 90vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <p className="px-4 py-4 font-editorial text-sm uppercase tracking-[0.18em] text-[#1d3c34]">
                  {shape.title}
                </p>
              </li>
            ))}
          </ul>
        </EditorialReveal>

        <EditorialReveal className="mt-20">
          <div className="text-center">
            <p className="font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
              Something a little more extraordinary?
            </p>
            <h3 className="mt-3 font-editorial text-[clamp(1.5rem,3.5vw,2.25rem)] tracking-[0.05em] text-[#1d3c34]">
              Blue · Pink · Yellow
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-house-body leading-relaxed text-on-cream-body">
              Bianca also offers fancy-colour lab-grown diamonds—distinctive
              stones for jewellery that feels unmistakably yours.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {WHY_FANCY_COLOURS.map((colour) => (
              <li key={colour.id} className="group relative overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1d3c34]">
                  <ProtectedImage
                    src={colour.image}
                    alt={colour.imageAlt}
                    wrapperClassName="absolute inset-0"
                    className="size-full object-cover object-center transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 768px) 90vw, 33vw"
                    loading="lazy"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/70 via-transparent to-transparent"
                    aria-hidden
                  />
                  <p className="absolute inset-x-0 bottom-0 p-6 font-editorial text-2xl tracking-[0.12em] text-[#f9f9f9]">
                    {colour.title}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link
              to="/fine-jewellery"
              className="font-editorial text-[12px] uppercase tracking-[0.18em] text-gold-on-cream transition-colors hover:text-[#524a28]"
            >
              Find Your Diamond →
            </Link>
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
