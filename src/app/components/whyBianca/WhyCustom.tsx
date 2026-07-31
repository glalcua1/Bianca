import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import ProtectedImage from "../protection/ProtectedImage";
import WhyCtaButton from "./WhyCtaButton";
import { WHY_CUSTOM_STEPS } from "../../data/whyChooseBianca";

type Props = {
  onStartCustom: () => void;
};

export default function WhyCustom({ onStartCustom }: Props) {
  return (
    <section
      aria-labelledby="custom-heading"
      className="relative overflow-hidden px-6 py-20 md:px-10 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_0%_50%,rgba(244,240,230,0.85),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <EditorialReveal>
            <EditorialEyebrow className="mb-4">Custom Jewellery</EditorialEyebrow>
            <h2
              id="custom-heading"
              className="font-editorial text-[clamp(1.75rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]"
            >
              Designed Around You.
            </h2>
            <p className="mt-6 font-editorial text-[15px] tracking-[0.04em] text-gold-on-cream">
              Can I customise my jewellery?
            </p>
            <p className="mt-3 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
              Absolutely.
            </p>
            <div className="mt-5 space-y-4 text-house-body leading-relaxed text-on-cream-body">
              <p>
                We don&apos;t believe luxury should be limited to choosing
                between a few pieces that are already sitting in a catalogue.
              </p>
              <p>
                Tell us what you have in mind—a design you&apos;ve seen, a
                sketch, a reference image, a special occasion, or simply an idea
                in your head.
              </p>
              <p>
                Our team works with you to understand your requirements and then
                crafts a piece around your vision.
              </p>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={100}>
            <div className="relative aspect-[5/4] overflow-hidden bg-[#f4f0e6]">
              <ProtectedImage
                src="/bianca-diamonds-bespoke-necklace.png"
                alt="Custom designed diamond necklace — Bianca Diamonds"
                wrapperClassName="absolute inset-0"
                className="size-full object-contain object-center p-6"
                sizes="(max-width: 1024px) 90vw, 50vw"
                loading="lazy"
              />
            </div>
          </EditorialReveal>
        </div>

        <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CUSTOM_STEPS.map((step, index) => (
            <EditorialReveal key={step.id} delay={index * 70}>
              <li className="group h-full border border-[#1d3c34]/10 bg-[#faf8f5] px-5 py-6 transition-colors duration-500 hover:border-[#766d42]/40">
                <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                  {step.number}
                </p>
                <h3 className="mt-3 font-editorial text-lg tracking-[0.04em] text-[#1d3c34]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-on-cream-body">
                  {step.details}
                </p>
              </li>
            </EditorialReveal>
          ))}
        </ol>

        <EditorialReveal className="mt-12 text-center">
          <WhyCtaButton onClick={onStartCustom}>
            Start Your Custom Design
          </WhyCtaButton>
          <p className="mt-4">
            <Link
              to="/bespoke-jewellery"
              className="font-editorial text-[12px] uppercase tracking-[0.18em] text-gold-on-cream transition-colors hover:text-[#524a28]"
            >
              Or explore the bespoke journey →
            </Link>
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
