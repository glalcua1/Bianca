import imgRectangle11 from "figma:asset/5ba4358549f78481bb5595ef12a37c5f59d7d33d.png";
import imgPackagingBox from "figma:asset/200f28676d6a2eae898fcdcd9f13ebcd75250299.png";
import imgPackagingBag from "figma:asset/75d88e2bc003dea111ea5784491167b05e57ecdf.png";
import imgPackagingPouch from "figma:asset/e5c39fcf4ff37608e7feb29dff2a18144e8108fe.png";
import imgImage1 from "figma:asset/ffad195494173b3c37c4aa05d64af9f2620a7643.png";
import ProtectedImage from "./protection/ProtectedImage";

const ORCHID_ACCENT =
  "/elegant-white-orchid-with-delicate-details-showcasing-beauty-sophistication-perfect-home-decor-floral-arrangements.jpg";

const BRAND_COPY = [
  {
    lead: true,
    text: (
      <>
        <span className="font-emphasis not-italic">
          Bianca Diamonds represents a new era of diamond luxury
        </span>
        .
      </>
    ),
  },
  {
    text: (
      <>
        Created for the modern woman, Bianca brings together timeless elegance
        and conscious innovation through{" "}
        <span className="font-emphasis not-italic">certified lab-grown diamonds</span>{" "}
        — real diamonds with the same brilliance and beauty as mined diamonds,
        created using advanced technology with a more thoughtful impact on the
        world.
      </>
    ),
  },
  {
    text: (
      <>
        Each piece is crafted in{" "}
        <span className="font-emphasis not-italic">BIS hallmarked gold</span> and
        certified diamonds, designed to celebrate both everyday elegance and
        life&apos;s most meaningful moments.
      </>
    ),
  },
  {
    text: (
      <>
        Behind Bianca stands over 80 years of family jewellery expertise, built
        on trust, craftsmanship, and a deep understanding of diamonds.
      </>
    ),
  },
  {
    text: <>Bianca Diamonds is where modern brilliance meets timeless luxury.</>,
  },
] as const;

export default function HomeBiancaStoryMobile() {
  return (
    <>
      {/* Brand story — mirrors desktop white card + editorial imagery */}
      <section
        aria-labelledby="brand-story-heading"
        className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-4 py-12"
      >
        <div className="relative mx-auto max-w-lg overflow-hidden rounded-[20px] border border-[#1d3c34]/10 bg-white px-5 py-10 shadow-[0_8px_32px_rgba(29,60,52,0.06)]">
          <h2
            id="brand-story-heading"
            className="text-center font-editorial text-[clamp(1.65rem,5vw,2.075rem)] tracking-[-0.01em] text-[#1d3c34]"
          >
            Bianca Diamonds
          </h2>

          <div className="mt-8 space-y-6 font-display text-[17px] leading-[27px] text-[#1d3c34]">
            {BRAND_COPY.map((block, index) => (
              <p
                key={index}
                className={block.lead ? "text-[20px] leading-[30px]" : undefined}
              >
                {block.text}
              </p>
            ))}
          </div>

          <div className="relative mt-10 aspect-[407/372] w-full overflow-hidden rounded-[8px]">
            <ProtectedImage
              wrapperClassName="absolute inset-0 size-full"
              src={imgRectangle11}
              alt="Bianca Diamonds fine jewellery"
              className="size-full object-cover object-center"
            />
          </div>

          <div className="mt-8 grid grid-cols-12 gap-3">
            <div
              className="relative col-span-7 aspect-[231/247] overflow-hidden rounded-[4px]"
              data-name="packaging-box"
            >
              <ProtectedImage
                wrapperClassName="absolute inset-0 size-full"
                src={imgPackagingBox}
                alt=""
                className="size-full object-cover object-center"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-3">
              <div
                className="relative aspect-[131/127] overflow-hidden rounded-[4px]"
                data-name="packaging-bag"
              >
                <ProtectedImage
                  wrapperClassName="absolute inset-0 size-full"
                  src={imgPackagingBag}
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
              <div
                className="relative aspect-[81/78] overflow-hidden rounded-[4px]"
                data-name="packaging-pouch"
              >
                <ProtectedImage
                  wrapperClassName="absolute inset-0 size-full"
                  src={imgPackagingPouch}
                  alt=""
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
            <div
              className="relative col-span-12 aspect-[427/273] overflow-hidden rounded-[4px]"
              data-name="image 1"
            >
              <ProtectedImage
                wrapperClassName="absolute inset-0 size-full"
                src={imgImage1}
                alt=""
                className="size-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex w-[44%] max-w-[156px] items-end justify-end pb-2 pr-2"
                aria-hidden
              >
                <ProtectedImage
                  wrapperClassName="block max-h-full w-full"
                  src={ORCHID_ACCENT}
                  alt=""
                  className="max-h-full w-full object-contain object-right-bottom mix-blend-multiply"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 22%, black 30%)",
                    maskImage:
                      "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 22%, black 30%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder&apos;s note — forest panel + portrait (desktop Frame5) */}
      <section
        aria-labelledby="founder-note-heading"
        className="relative overflow-hidden bg-[#1d3c34] px-4 py-14"
      >
        <div
          className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rotate-[5.64deg] opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(104.979deg, rgb(118, 109, 66) 2.7164%, rgb(220, 203, 123) 86.291%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-lg">
          <h2 id="founder-note-heading" className="sr-only">
            Founder&apos;s note
          </h2>

          <div
            className="relative mx-auto w-[min(78%,248px)] max-w-[280px] overflow-hidden rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.28)]"
            style={{ height: 360 }}
          >
            <ProtectedImage
              wrapperClassName="absolute inset-0 size-full"
              src="/founder.jpg"
              alt="Shweta Lal, Founder of Bianca Diamonds"
              className="size-full object-cover object-top"
            />
          </div>

          <div className="mt-10 space-y-5 font-display text-[16px] leading-[1.65] tracking-[0.5px] text-on-forest">
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
              Through certified lab-grown diamonds, we bring the same extraordinary
              brilliance of traditional diamonds while embracing a more
              responsible and forward-looking approach to fine jewellery.
            </p>
            <p>
              Our goal is to create pieces that women can wear not just for
              occasions, but as an expression of their identity and style. Bianca is
              more than jewellery. It is modern brilliance, thoughtfully chosen.
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
