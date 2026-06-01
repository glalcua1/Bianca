import { Link } from "react-router";
import ProtectedImage from "./protection/ProtectedImage";

const CANNES_HERO_IMAGE = "/Cannes/Model_neck1.png";
const HERO_FOREST_BG = "#1d3c34";
const HERO_STROKE_GREEN = "#071410";

export default function FineJewelleryHeroMobile() {
  return (
    <section className="overflow-x-hidden bg-[#1d3c34] px-4 pb-10 pt-2">
      <div
        className={`mx-auto w-full max-w-lg rounded-[16px] border border-solid border-transparent p-5 [background:linear-gradient(${HERO_FOREST_BG},${HERO_FOREST_BG})_padding-box,linear-gradient(to_right,${HERO_STROKE_GREEN},#766d42,#dccb7b)_border-box]`}
      >
        <p className="m-0 text-center text-house-eyebrow text-gold-on-forest">
          Cannes Film Festival · 2026
        </p>

        <h1 className="m-0 mt-4 text-center text-house-display text-[clamp(1.35rem,5.5vw,1.85rem)] leading-snug tracking-[0.06em] text-on-forest">
          Exclusive Jewellery Showcase
        </h1>

        <p className="m-0 mt-4 text-center text-house-tagline text-[clamp(1rem,4vw,1.125rem)] leading-relaxed text-on-forest-body">
          A cinematic editorial on Bianca Diamonds&apos; debut at Cannes — on
          the world&apos;s most celebrated red carpet.
        </p>

        <div className="relative mx-auto mt-6 w-full max-w-full overflow-hidden rounded-[12px] bg-black">
          <ProtectedImage
            priority
            wrapperClassName="relative block w-full max-w-full"
            alt="Bianca Diamonds fine jewellery — Cannes Film Festival 2026"
            className="mx-auto block h-auto w-full max-w-full max-h-[min(70vh,480px)] object-contain object-bottom"
            src={CANNES_HERO_IMAGE}
          />
        </div>

        <Link
          to="/fine-jewellery/cannes-2026"
          className="mt-8 block text-center font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-forest"
        >
          Discover the Collection →
        </Link>
      </div>
    </section>
  );
}
