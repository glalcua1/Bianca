import { motion } from "motion/react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import WhyCtaButton from "../whyBianca/WhyCtaButton";
import { JPP_COPY } from "../../data/jppConfig";

type Props = {
  onRegister: () => void;
  onHowItWorks: () => void;
};

export default function JppHero({ onRegister, onHowItWorks }: Props) {
  return (
    <header className="relative min-h-[88vh] overflow-hidden bg-[#1d3c34] md:min-h-[92vh]">
      <img
        src="/bianca-diamonds-blue-diamond-editorial.jpg"
        alt="Bianca Diamonds jewellery"
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#1d3c34] via-[#1d3c34]/72 to-[#1d3c34]/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_20%,rgba(220,203,123,0.14),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col items-center justify-end px-6 pb-16 pt-28 text-center md:min-h-[92vh] md:justify-center md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <EditorialEyebrow tone="gold" className="mb-5">
            {JPP_COPY.eyebrow}
          </EditorialEyebrow>
          <h1 className="font-editorial text-[clamp(2.4rem,6vw,4.25rem)] font-normal leading-[1.05] tracking-[0.04em] text-[#f9f9f9]">
            {JPP_COPY.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-house-body leading-relaxed text-on-forest-body">
            {JPP_COPY.support}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhyCtaButton variant="primary-light" onClick={onRegister}>
              {JPP_COPY.primaryCta}
            </WhyCtaButton>
            <WhyCtaButton variant="ghost-light" onClick={onHowItWorks}>
              {JPP_COPY.secondaryCta}
            </WhyCtaButton>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
