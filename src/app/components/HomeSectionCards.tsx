import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";
import {
  HOME_SECTION_CARDS,
  type HomeSectionCard,
} from "../data/homeSectionCards";

function toneClasses(tone: HomeSectionCard["tone"]) {
  switch (tone) {
    case "forest":
      return {
        well: "bg-[#1d3c34]",
        panel: "bg-[#faf8f5]",
      };
    case "ink":
      return {
        well: "bg-[#0c0b0a]",
        panel: "bg-[#faf8f5]",
      };
    default:
      return {
        well: "bg-[#f4f0e6]",
        panel: "bg-[#faf8f5]",
      };
  }
}

function SectionCard({
  card,
  index,
}: {
  card: HomeSectionCard;
  index: number;
}) {
  const tones = toneClasses(card.tone);
  const imageOnRight = index % 2 === 0;

  return (
    <EditorialReveal delay={index * 80}>
      <Link
        to={card.to}
        className={`group relative grid overflow-hidden border border-[#1d3c34]/10 bg-[#faf8f5] transition-[border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#766d42]/40 hover:shadow-[0_24px_64px_rgba(29,60,52,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42] motion-reduce:transition-none md:min-h-[420px] md:grid-cols-2 lg:min-h-[480px]`}
        aria-label={`${card.title} — ${card.cta}`}
      >
        {/* Copy — always first in DOM for a11y; visually left on even rows */}
        <div
          className={`relative flex flex-col justify-center ${tones.panel} px-7 py-10 sm:px-10 sm:py-12 md:px-12 lg:px-16 lg:py-14 ${
            imageOnRight ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-[#766d42]/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 md:inset-y-12"
            aria-hidden
          />

          <p className="font-editorial text-[11px] uppercase tracking-[0.28em] text-gold-on-cream">
            {card.eyebrow}
          </p>

          <h3 className="mt-4 font-editorial text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[0.04em] text-[#1d3c34] transition-colors duration-500 group-hover:text-[#524a28]">
            {card.title}
          </h3>

          <div
            className="mt-5 h-px w-12 origin-left bg-[#766d42]/55 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-150"
            aria-hidden
          />

          <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-on-cream-body sm:text-[16px]">
            {card.description}
          </p>

          <span className="mt-8 inline-flex items-center gap-3 font-editorial text-[12px] uppercase tracking-[0.2em] text-gold-on-cream sm:mt-10">
            <span className="relative">
              {card.cta}
              <span
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#766d42]/70 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:scale-x-100"
                aria-hidden
              />
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
            >
              →
            </span>
          </span>
        </div>

        {/* Hero jewellery image */}
        <div
          className={`relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:min-h-full ${tones.well} ${
            imageOnRight ? "md:order-2" : "md:order-1"
          }`}
        >
          <ProtectedImage
            wrapperClassName="absolute inset-0 size-full"
            src={card.image}
            alt={card.imageAlt}
            className={`size-full transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${card.imageClassName ?? "object-cover object-center"}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10"
            aria-hidden
          />
          {/* Gold edge line that draws on hover */}
          <div
            className={`pointer-events-none absolute inset-y-0 w-[2px] origin-top scale-y-0 bg-gradient-to-b from-[#dccb7b] via-[#766d42] to-[#dccb7b] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 motion-reduce:scale-y-100 ${
              imageOnRight ? "left-0" : "right-0"
            }`}
            aria-hidden
          />
        </div>
      </Link>
    </EditorialReveal>
  );
}

export default function HomeSectionCards() {
  return (
    <section
      aria-labelledby="home-sections-heading"
      className="relative overflow-hidden bg-[#faf8f5]"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(244,240,230,0.9) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:px-10">
        <EditorialReveal className="mx-auto max-w-2xl text-center">
          <p className="text-house-eyebrow text-gold-on-cream">The House</p>
          <h2
            id="home-sections-heading"
            className="mt-3 font-editorial text-[clamp(1.65rem,3.8vw,2.35rem)] tracking-[0.06em] text-[#1d3c34]"
          >
            Enter Bianca
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-house-body leading-relaxed text-on-cream-body">
            Four chapters of the house — fine jewellery, private commissions,
            the butterfly emblem, and the Cannes stage.
          </p>
          <div
            className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-[#766d42]/70 to-transparent"
            aria-hidden
          />
        </EditorialReveal>

        <div className="mt-10 flex flex-col gap-6 md:mt-14 md:gap-8 lg:gap-10">
          {HOME_SECTION_CARDS.map((card, index) => (
            <SectionCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
