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
          <EditorialEyebrow className="mb-4">Diamonds</EditorialEyebrow>
          <h2
            id="diamonds-heading"
            className="font-editorial text-[clamp(1.65rem,3.8vw,2.5rem)] tracking-[0.05em] text-[#1d3c34]"
          >
            Certified Diamonds. Complete Confidence.
          </h2>
          <p className="mt-6 text-house-body leading-relaxed text-on-cream-body">
            Our diamonds are IGI certified—independent verification of the
            4Cs. Certification is part of the confidence you should have when
            investing in jewellery.
          </p>
          <p className="mt-4 font-editorial text-[15px] tracking-[0.04em] text-[#1d3c34]">
            Your diamond. Your certificate. Your confidence.
          </p>
        </EditorialReveal>

        <EditorialReveal className="mt-14">
          <h3 className="text-center font-editorial text-lg tracking-[0.08em] text-[#1d3c34]">
            The 4Cs
          </h3>
          <ul className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_FOUR_CS.map((item) => {
              const Icon = FOUR_C_ICONS[item.id as keyof typeof FOUR_C_ICONS];
              return (
                <li key={item.id} className="text-center">
                  <div className="mx-auto flex size-16 items-center justify-center text-gold-on-cream">
                    <Icon className="size-11" />
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
          <p className="mx-auto mt-8 max-w-xl text-center text-house-body text-sm leading-relaxed text-on-cream-muted">
            For many designs, we recommend E–F colour and VVS2 clarity as an
            excellent balance of visual quality and value. There is no single
            perfect diamond—we help you choose what works best for you.
          </p>
        </EditorialReveal>

        <EditorialReveal className="mt-16">
          <h3 className="text-center font-editorial text-lg tracking-[0.08em] text-[#1d3c34]">
            Popular Shapes
          </h3>
          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {WHY_DIAMOND_SHAPES.map((shape) => {
              const Icon = SHAPE_ICONS[shape.id as keyof typeof SHAPE_ICONS];
              return (
                <li key={shape.id} className="text-center">
                  <div className="mx-auto flex size-16 items-center justify-center text-[#1d3c34]">
                    <Icon className="size-12" />
                  </div>
                  <p className="mt-3 font-editorial text-[12px] uppercase tracking-[0.16em] text-[#1d3c34]">
                    {shape.title}
                  </p>
                </li>
              );
            })}
          </ul>
        </EditorialReveal>

        <EditorialReveal className="mt-16">
          <p className="text-center font-editorial text-[14px] tracking-[0.06em] text-gold-on-cream">
            Something a little more extraordinary?
          </p>
          <h3 className="mt-2 text-center font-editorial text-[clamp(1.35rem,3vw,1.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Fancy Colours
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-center text-house-body text-sm leading-relaxed text-on-cream-body">
            Bianca also offers fancy-colour lab-grown diamonds—blue, pink and
            yellow.
          </p>
          <ul className="mx-auto mt-8 flex max-w-md items-end justify-center gap-10">
            {WHY_FANCY_COLOURS.map((colour) => (
              <li key={colour.id} className="text-center">
                <IconFancyDiamond className="mx-auto size-14" tone={colour.tone} />
                <p className="mt-3 font-editorial text-[12px] uppercase tracking-[0.16em] text-[#1d3c34]">
                  {colour.title}
                </p>
              </li>
            ))}
          </ul>
        </EditorialReveal>

        <EditorialReveal className="mx-auto mt-16 max-w-2xl text-center">
          <h3 className="font-editorial text-lg tracking-[0.06em] text-[#1d3c34]">
            Sourced From Leading Growers
          </h3>
          <p className="mt-4 text-house-body text-sm leading-relaxed text-on-cream-body">
            We source from leading laboratory-grown diamond manufacturers,
            including Greenlab and Kira—so you can choose across sizes, shapes,
            colours and clarities while we maintain Bianca quality standards.
          </p>
          <p className="mt-6">
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
