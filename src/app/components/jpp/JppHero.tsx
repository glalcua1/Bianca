import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  JPP_COPY,
  JPP_HERO_VIDEO,
  getJppPublicConfig,
} from "../../data/jppConfig";

type Props = {
  onRegister: () => void;
  onHowItWorks: () => void;
};

export default function JppHero({ onRegister, onHowItWorks }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const config = getJppPublicConfig();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = video.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => {
        /* autoplay may be blocked */
      });
    }
  }, []);

  return (
    <header className="relative overflow-hidden bg-[#f4f0e6]">
      {/* Desktop: absolute right video = true edge-to-edge, full hero height */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={JPP_HERO_VIDEO}
          poster="/bianca-diamonds-lab-grown-jewellery-hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      </div>

      <div className="relative grid min-h-[min(92vh,920px)] lg:grid-cols-2">
        {/* Mobile video — full bleed, no side padding */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1d3c34] sm:aspect-[16/10] lg:hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={JPP_HERO_VIDEO}
            poster="/bianca-diamonds-lab-grown-jewellery-hero-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Bianca Diamonds jewellery film"
          />
        </div>

        {/* Left — editorial copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 lg:col-start-1 lg:px-14 xl:px-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_40%,rgba(220,203,123,0.16),transparent_55%)]"
            aria-hidden
          />
          <motion.div
            className="relative max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-house-eyebrow text-gold-on-cream">
              {JPP_COPY.eyebrow}
            </p>
            <h1 className="mt-5 font-editorial text-[clamp(2.35rem,5.2vw,3.85rem)] font-normal leading-[1.05] tracking-[0.04em] text-[#1d3c34]">
              {JPP_COPY.headline}
            </h1>
            <p className="mt-6 max-w-md text-house-body leading-relaxed text-on-cream-body">
              {JPP_COPY.support}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onRegister}
                className="inline-flex min-w-[220px] items-center justify-center border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
              >
                {JPP_COPY.primaryCta}
              </button>
              <button
                type="button"
                onClick={onHowItWorks}
                className="inline-flex min-w-[200px] justify-center border border-[#1d3c34]/30 px-8 py-3.5 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:border-[#1d3c34] hover:bg-[#1d3c34]/5"
              >
                {JPP_COPY.secondaryCta}
              </button>
            </div>

            <p className="mt-8 font-editorial text-[13px] tracking-[0.04em] text-on-cream-muted">
              Personal guidance · {config.phoneDisplay}
            </p>
          </motion.div>
        </div>

        {/* Desktop spacer column so grid height includes right half */}
        <div className="relative hidden lg:block" aria-hidden />
      </div>
    </header>
  );
}
