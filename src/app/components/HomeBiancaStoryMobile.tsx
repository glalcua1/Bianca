import imgPackagingBox from "figma:asset/200f28676d6a2eae898fcdcd9f13ebcd75250299.png";
import imgPackagingBag from "figma:asset/75d88e2bc003dea111ea5784491167b05e57ecdf.png";
import imgImage1 from "figma:asset/ffad195494173b3c37c4aa05d64af9f2620a7643.png";
import ProtectedImage from "./protection/ProtectedImage";
import EditorialReveal from "./editorial/EditorialReveal";

const SUPPORTING = [
  {
    src: imgPackagingBox,
    alt: "Bianca Diamonds presentation box",
    className: "object-cover object-center",
    wellClass: "bg-white",
  },
  {
    src: imgPackagingBag,
    alt: "Bianca Diamonds packaging",
    className: "object-cover object-center",
    wellClass: "bg-white",
  },
  {
    src: imgImage1,
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
                  Bianca Diamonds represents a new era of diamond luxury
                </span>
                .
              </p>

              <div className="mt-7 space-y-5 font-display text-[15px] leading-[1.75] text-on-cream-body sm:text-[16px]">
                <p>
                  Created for the modern woman, Bianca brings together timeless
                  elegance and conscious innovation through{" "}
                  <span className="font-emphasis not-italic text-[#1d3c34]">
                    certified lab-grown diamonds
                  </span>{" "}
                  — real diamonds with the same brilliance and beauty as mined
                  diamonds, created using advanced technology with a more
                  thoughtful impact on the world.
                </p>
                <p>
                  Each piece is crafted in{" "}
                  <span className="font-emphasis not-italic text-[#1d3c34]">
                    BIS hallmarked gold
                  </span>{" "}
                  and certified diamonds, designed to celebrate both everyday
                  elegance and life&apos;s most meaningful moments.
                </p>
                <p>
                  Behind Bianca stands over 80 years of family jewellery
                  expertise, built on trust, craftsmanship, and a deep
                  understanding of diamonds.
                </p>
                <p className="font-display text-[#1d3c34]">
                  Bianca Diamonds is where modern brilliance meets timeless
                  luxury.
                </p>
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
                    src="/Pendant/P11.jpg"
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

      {/* Founder's note — portrait left, wide copy right */}
      <section
        aria-labelledby="founder-note-heading"
        className="relative overflow-hidden bg-[#1d3c34] px-4 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20"
      >
        <div
          className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rotate-[5.64deg] opacity-40 md:h-[420px] md:w-[420px]"
          style={{
            backgroundImage:
              "linear-gradient(104.979deg, rgb(118, 109, 66) 2.7164%, rgb(220, 203, 123) 86.291%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-start md:gap-14 lg:gap-16">
          <h2 id="founder-note-heading" className="sr-only">
            Founder&apos;s note
          </h2>

          <div
            className="relative mx-auto w-[min(78%,248px)] shrink-0 overflow-hidden rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.28)] md:mx-0 md:w-[280px] lg:w-[320px]"
            style={{ aspectRatio: "248 / 360" }}
          >
            <ProtectedImage
              wrapperClassName="absolute inset-0 size-full"
              src="/founder.jpg"
              alt="Shweta Lal, Founder of Bianca Diamonds"
              className="size-full object-cover object-top"
            />
          </div>

          <div className="min-w-0 flex-1 space-y-5 font-display text-[16px] leading-[1.65] tracking-[0.5px] text-on-forest md:pt-2 lg:text-[17px]">
            <p>
              Jewellery has always held a special place in the way a woman
              expresses herself. A thoughtfully chosen piece can elevate not only
              how she looks, but how she feels — confident, graceful, and
              unmistakably herself.
            </p>
            <p>
              My journey began with a deep interest in fashion styling and
              personal jewellery curation, where I worked closely with clients to
              create pieces that reflected their individuality and sense of
              elegance. Over time, this passion evolved into a vision: to create a
              brand that celebrates beauty while embracing the changing values of
              our time.
            </p>
            <p>
              This vision became{" "}
              <span className="font-emphasis">Bianca Diamonds</span>.
            </p>
            <p>
              At Bianca, we believe that luxury should evolve with the modern
              woman — intelligent, conscious, and confident in her choices.
              Through certified lab-grown diamonds, we bring the same
              extraordinary brilliance of traditional diamonds while embracing a
              more responsible and forward-looking approach to fine jewellery.
            </p>
            <p>
              Our goal is to create pieces that women can wear not just for
              occasions, but as an expression of their identity and style. Bianca
              is more than jewellery. It is modern brilliance, thoughtfully
              chosen.
            </p>
            <p>
              <span className="font-emphasis">Shweta Lal</span>
              <br />
              Founder, Bianca Diamonds
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
