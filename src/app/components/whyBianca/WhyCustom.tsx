import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import WhyCtaButton from "./WhyCtaButton";
import {
  WHY_CUSTOM_STEPS,
  WHY_TIMELINE_STEPS,
} from "../../data/whyChooseBianca";

type Props = {
  onStartCustom: () => void;
};

export default function WhyCustom({ onStartCustom }: Props) {
  return (
    <section
      aria-labelledby="custom-heading"
      className="px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <EditorialReveal className="text-center">
          <EditorialEyebrow className="mb-4">Custom Jewellery</EditorialEyebrow>
          <h2
            id="custom-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Designed Around You.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-cream-body">
            Tell us what you have in mind—a design, a sketch, a reference, an
            occasion, or simply an idea. We craft the piece around your vision.
          </p>
        </EditorialReveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2">
          {WHY_CUSTOM_STEPS.map((step, index) => (
            <EditorialReveal key={step.id} delay={index * 50}>
              <li className="border-t border-[#1d3c34]/10 pt-5">
                <p className="font-editorial text-[12px] tracking-[0.22em] text-gold-on-cream">
                  {step.number}
                </p>
                <h3 className="mt-2 font-editorial text-lg tracking-[0.04em] text-[#1d3c34]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-on-cream-body">{step.details}</p>
              </li>
            </EditorialReveal>
          ))}
        </ol>

        <EditorialReveal className="mt-14 text-center">
          <p className="font-editorial text-[clamp(2.5rem,8vw,3.75rem)] leading-none tracking-[0.04em] text-[#1d3c34]">
            15–30
          </p>
          <p className="mt-2 font-editorial text-sm tracking-[0.22em] uppercase text-gold-on-cream">
            Days typical timeline
          </p>
          <ol className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
            {WHY_TIMELINE_STEPS.map((step, index) => (
              <li key={step.id} className="inline-flex items-center gap-3">
                <span>{step.label}</span>
                {index < WHY_TIMELINE_STEPS.length - 1 ? (
                  <span aria-hidden className="text-gold-on-cream">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-5 max-w-md text-house-body text-sm text-on-cream-muted">
            Exact timing depends on design complexity and diamond availability.
          </p>
          <div className="mt-10">
            <WhyCtaButton onClick={onStartCustom}>
              Start Your Custom Design
            </WhyCtaButton>
          </div>
          <p className="mt-4">
            <Link
              to="/bespoke-jewellery"
              className="font-editorial text-[12px] uppercase tracking-[0.18em] text-gold-on-cream transition-colors hover:text-[#524a28]"
            >
              Explore the bespoke journey →
            </Link>
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
