import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";
import { WHY_CHOOSE_BIANCA_PATH } from "../data/whyChooseBianca";

const SUPPORTING = [
  {
    src: "/bianca-diamonds-presentation-box.png",
    alt: "Bianca Diamonds presentation box",
    className: "object-cover object-center",
    wellClass: "bg-white",
  },
  {
    src: "/bianca-diamonds-packaging-bag.png",
    alt: "Bianca Diamonds packaging",
    className: "object-cover object-center",
    wellClass: "bg-white",
  },
  {
    src: "/bianca-diamonds-atelier-atmosphere.png",
    alt: "Bianca Diamonds atelier atmosphere",
    className: "object-cover object-[center_40%]",
    wellClass: "bg-[#ebe6dc]",
  },
] as const;

export default function HomeBiancaStoryMobile() {
  return (
    <>
      {/* Brand story — copy left, all imagery composed in the right column */}
      <section
        aria-labelledby="brand-story-heading"
        className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-4 py-12 md:px-8 md:py-16 lg:px-10 lg:py-20"
      >
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2px] border border-[#1d3c34]/10 bg-white shadow-[0_12px_48px_rgba(29,60,52,0.06)]">
          <div
            className="pointer-events-none absolute inset-0 opacity-90"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 55% 45% at 0% 0%, rgba(244,240,230,0.9) 0%, transparent 50%), linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)",
            }}
          />

          <div className="relative grid lg:grid-cols-12 lg:items-stretch">
            {/* Editorial copy — left */}
            <EditorialReveal className="flex flex-col justify-center px-7 py-12 sm:px-10 md:px-12 lg:col-span-5 lg:px-14 lg:py-16 xl:px-16">
              <p className="text-house-eyebrow text-gold-on-cream">The House</p>
              <h2
                id="brand-story-heading"
                className="mt-4 font-editorial text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[0.04em] text-[#1d3c34]"
              >
                Bianca Diamonds
              </h2>
              <div
                className="mt-6 h-px w-14 bg-gradient-to-r from-[#766d42]/70 to-transparent"
                aria-hidden
              />

              <p className="mt-8 font-display text-[20px] leading-[1.45] text-[#1d3c34] md:text-[22px] md:leading-[1.5]">
                <span className="font-emphasis not-italic">
                  Luxury, made personal.
                </span>
              </p>

              <div className="mt-7 space-y-5 font-display text-[15px] leading-[1.75] text-on-cream-body sm:text-[16px]">
                <p>
                  Choosing a diamond is about trust, craftsmanship, and finding
                  something uniquely yours—not simply selecting from what
                  happens to be available.
                </p>
                <p>
                  Bianca combines{" "}
                  <span className="font-emphasis not-italic text-[#1d3c34]">
                    certified lab-grown diamonds
                  </span>
                  , contemporary design and personalised craftsmanship in{" "}
                  <span className="font-emphasis not-italic text-[#1d3c34]">
                    BIS hallmarked gold
                  </span>
                  —backed by over 80 years of family jewellery expertise.
                </p>
                <p className="font-display text-[#1d3c34]">
                  Personal. Transparent. Uncompromising on quality.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  to={WHY_CHOOSE_BIANCA_PATH}
                  className="group inline-flex items-center gap-3 font-editorial text-[12px] uppercase tracking-[0.2em] text-gold-on-cream transition-colors hover:text-[#524a28]"
                >
                  <span className="relative">
                    Why Choose Bianca Diamonds?
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
                </Link>
              </div>
            </EditorialReveal>

            {/* All imagery — right column composition */}
            <EditorialReveal
              delay={120}
              className="border-t border-[#1d3c34]/8 bg-[#f4f0e6] p-3 sm:p-4 lg:col-span-7 lg:border-l lg:border-t-0 lg:p-5"
            >
              <div className="flex h-full flex-col gap-3 sm:gap-4">
                {/* Dominant hero — full-bleed product plate, no letterbox pillars */}
                <div className="relative min-h-[280px] flex-[1.6] overflow-hidden bg-[#c4c4c4] sm:min-h-[360px] lg:min-h-0">
                  <ProtectedImage
                    wrapperClassName="absolute inset-0 size-full"
                    src="/Pendant/bianca-diamonds-blue-star-octagon-lattice-pendant.jpg"
                    alt="Blue Star Octagon Diamond Lattice — square blue diamond pendant in rose gold"
                    className="size-full object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>

                {/* Supporting plates — same column, equal rhythm */}
                <ul className="grid list-none grid-cols-3 gap-3 sm:gap-4">
                  {SUPPORTING.map((item) => (
                    <li
                      key={item.alt}
                      className={`relative aspect-[3/4] overflow-hidden sm:aspect-[4/5] ${item.wellClass}`}
                    >
                      <ProtectedImage
                        wrapperClassName="absolute inset-0 size-full"
                        src={item.src}
                        alt={item.alt}
                        className={`size-full ${item.className}`}
                        sizes="(max-width: 1024px) 33vw, 18vw"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* Founder's message — editorial portrait + voice */}
      <section
        aria-labelledby="founder-note-heading"
        className="relative overflow-hidden bg-[#1d3c34]"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_15%,rgba(220,203,123,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_10%_90%,rgba(118,109,66,0.12),transparent_50%)]"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-[1400px] lg:grid-cols-12 lg:items-stretch">
          {/* Portrait — full-bleed on mobile; tall editorial plate on desktop */}
          <EditorialReveal className="relative lg:col-span-5 xl:col-span-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-auto lg:h-full lg:min-h-[640px]">
              <ProtectedImage
                wrapperClassName="absolute inset-0 size-full"
                src="/shweta-lal-bianca-diamonds-founder.jpg"
                alt="Shweta Lal, Founder of Bianca Diamonds"
                className="size-full object-cover object-[center_18%]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1d3c34]/55 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#1d3c34]/35"
                aria-hidden
              />
            </div>
          </EditorialReveal>

          {/* Message */}
          <EditorialReveal
            delay={140}
            className="flex flex-col justify-center px-6 py-14 sm:px-10 md:px-12 lg:col-span-7 lg:px-14 lg:py-20 xl:col-span-8 xl:px-20 xl:py-24"
          >
            <p className="text-house-eyebrow text-gold-on-forest">
              A note from the founder
            </p>
            <h2
              id="founder-note-heading"
              className="mt-5 max-w-xl font-editorial text-[clamp(1.65rem,3.4vw,2.55rem)] leading-[1.2] tracking-[0.04em] text-[#f9f9f9]"
            >
              Jewellery should feel like her — confident, graceful, and
              unmistakably her own.
            </h2>
            <div
              className="mt-7 h-px w-14 bg-gradient-to-r from-[#dccb7b]/80 to-transparent"
              aria-hidden
            />

            <div className="mt-8 max-w-xl space-y-5 font-display text-[15px] leading-[1.8] tracking-[0.02em] text-on-forest-body sm:text-[16px]">
              <p>
                Jewellery has always held a special place in the way a woman
                expresses herself. A thoughtfully chosen piece can elevate not
                only how she looks, but how she feels.
              </p>
              <p>
                My journey began in fashion styling and personal jewellery
                curation — working closely with clients to create pieces that
                reflected their individuality. That passion became a vision: a
                house that celebrates beauty while embracing the changing values
                of our time.
              </p>
              <p>
                That vision is{" "}
                <span className="font-emphasis text-on-forest">
                  Bianca Diamonds
                </span>
                .
              </p>
              <p>
                We believe luxury should evolve with the modern woman —
                intelligent, conscious, and confident in her choices. Through
                certified lab-grown diamonds, we offer the brilliance of fine
                jewellery with a more responsible, forward-looking approach.
              </p>
              <p>
                Bianca is more than jewellery. It is modern brilliance,
                thoughtfully chosen — pieces meant not only for occasions, but
                as an expression of identity and style.
              </p>
            </div>

            <footer className="mt-10 max-w-xl border-t border-[#dccb7b]/25 pt-7">
              <a
                href="https://www.linkedin.com/in/shwetalal-bianca/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col"
              >
                <span className="font-editorial text-[18px] tracking-[0.06em] text-[#f9f9f9] transition-colors group-hover:text-[#dccb7b]">
                  Shweta Lal
                </span>
                <span className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-gold-on-forest">
                  Founder, Bianca Diamonds
                </span>
              </a>
            </footer>
          </EditorialReveal>
        </div>
      </section>
    </>
  );
}
