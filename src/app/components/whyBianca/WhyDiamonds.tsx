import { Link } from "react-router";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import EditorialReveal from "../editorial/EditorialReveal";
import {
  WHY_DIAMOND_SHAPES,
  WHY_FANCY_COLOURS,
  WHY_FOUR_CS,
} from "../../data/whyChooseBianca";
import {
  IconCarat,
  IconClarity,
  IconColour,
  IconCut,
  IconFancyDiamond,
  IconShapeEmerald,
  IconShapeMarquise,
  IconShapeOval,
  IconShapeRound,
} from "./WhyIcons";

const FOUR_C_ICONS = {
  carat: IconCarat,
  cut: IconCut,
  colour: IconColour,
  clarity: IconClarity,
} as const;

const SHAPE_ICONS = {
  round: IconShapeRound,
  oval: IconShapeOval,
  marquise: IconShapeMarquise,
  emerald: IconShapeEmerald,
} as const;

export default function WhyDiamonds() {
  return (
    <section
      aria-labelledby="diamonds-heading"
      className="border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <EditorialReveal className="mx-auto max-w-2xl text-center">
          <EditorialEyebrow className="mb-4">The Diamond</EditorialEyebrow>
          <h2
            id="diamonds-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Clarity you can verify.
          </h2>
          <p className="mt-6 text-house-body leading-relaxed text-on-cream-body">
            Every Bianca Diamonds lab-grown diamond is individually IGI
            certified—so cut, colour, clarity, and carat are independently
            graded before the piece is yours.
          </p>
        </EditorialReveal>

        <EditorialReveal className="mt-14">
          <ul className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_FOUR_CS.map((item) => {
              const Icon = FOUR_C_ICONS[item.id as keyof typeof FOUR_C_ICONS];
              return (
                <li key={item.id} className="text-center">
                  <div className="mx-auto flex size-14 items-center justify-center text-gold-on-cream">
                    <Icon className="size-10" />
                  </div>
                  <p className="mt-3 font-editorial text-sm tracking-[0.14em] uppercase text-[#1d3c34]">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-cream-body">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-8 max-w-lg text-center text-sm leading-relaxed text-on-cream-muted">
            We often suggest E–F colour and VVS2 clarity as a strong balance of
            beauty and value—then refine with you.
          </p>
        </EditorialReveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <EditorialReveal>
            <h3 className="text-center font-editorial text-lg tracking-[0.08em] text-[#1d3c34] md:text-left">
              Popular shapes
            </h3>
            <ul className="mx-auto mt-6 grid max-w-sm grid-cols-4 gap-4 md:mx-0">
              {WHY_DIAMOND_SHAPES.map((shape) => {
                const Icon = SHAPE_ICONS[shape.id as keyof typeof SHAPE_ICONS];
                return (
                  <li key={shape.id} className="text-center">
                    <div className="mx-auto flex size-12 items-center justify-center text-[#1d3c34]">
                      <Icon className="size-10" />
                    </div>
                    <p className="mt-2 font-editorial text-[10px] uppercase tracking-[0.14em] text-[#1d3c34]">
                      {shape.title}
                    </p>
                  </li>
                );
              })}
            </ul>
          </EditorialReveal>

          <EditorialReveal>
            <h3 className="text-center font-editorial text-lg tracking-[0.08em] text-[#1d3c34] md:text-left">
              Fancy colours
            </h3>
            <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-on-cream-body md:mx-0 md:text-left">
              Blue, pink, and yellow lab-grown diamonds for pieces with a
              distinct point of colour.
            </p>
            <ul className="mx-auto mt-6 flex max-w-xs items-end justify-center gap-8 md:mx-0 md:justify-start">
              {WHY_FANCY_COLOURS.map((colour) => (
                <li key={colour.id} className="text-center">
                  <IconFancyDiamond
                    className="mx-auto size-11"
                    tone={colour.tone}
                  />
                  <p className="mt-2 font-editorial text-[10px] uppercase tracking-[0.14em] text-[#1d3c34]">
                    {colour.title}
                  </p>
                </li>
              ))}
            </ul>
          </EditorialReveal>
        </div>

        <EditorialReveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-house-body text-sm leading-relaxed text-on-cream-body">
            We source from leading laboratory growers, including Greenlab and
            Kira—so you can choose across sizes and colours while we hold Bianca
            quality standards.
          </p>
          <p className="mt-8">
            <Link
              to="/fine-jewellery"
              className="font-editorial text-[12px] uppercase tracking-[0.18em] text-gold-on-cream transition-colors hover:text-[#524a28]"
            >
              Browse Fine Jewellery →
            </Link>
          </p>
        </EditorialReveal>
      </div>
    </section>
  );
}
