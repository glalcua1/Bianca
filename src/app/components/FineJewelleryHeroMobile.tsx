import { Link } from "react-router";
import Group6Logo from "../../imports/Group6";
import ProtectedImage from "./protection/ProtectedImage";

const CANNES_HERO_IMAGE = "/Cannes/Model_neck1.png";

export default function FineJewelleryHeroMobile() {
  return (
    <section className="bg-[#1d3c34] px-4 pb-10 pt-2">
      <div className="mx-auto max-w-lg rounded-[16px] border border-[#1d3c34]/40 bg-gradient-to-b from-[#edefed] via-white to-white p-5">
        <div className="relative mx-auto h-[52px] w-[min(72%,220px)]">
          <Group6Logo />
        </div>

        <p className="mt-6 text-center text-house-eyebrow text-gold-on-cream">
          Cannes Film Festival · 2026
        </p>

        <h1 className="mt-4 text-center text-house-display text-[clamp(1.35rem,5.5vw,1.85rem)] leading-snug tracking-[0.06em] text-[#1d3c34]">
          Exclusive Jewellery Showcase
        </h1>

        <p className="mt-4 text-center text-house-tagline text-[clamp(1rem,4vw,1.125rem)] leading-relaxed text-on-cream-body">
          A cinematic editorial on Bianca Diamonds&apos; debut at Cannes — on
          the world&apos;s most celebrated red carpet.
        </p>

        <div className="relative mx-auto mt-6 aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[12px] bg-black">
          <ProtectedImage
            wrapperClassName="absolute inset-0 flex items-end justify-center p-4"
            alt="Bianca Diamonds fine jewellery — Cannes Film Festival 2026"
            className="max-h-full max-w-full object-contain"
            src={CANNES_HERO_IMAGE}
          />
        </div>

        <Link
          to="/fine-jewellery/cannes-2026"
          className="mt-8 block text-center font-editorial text-[15px] uppercase tracking-[0.08em] text-gold-on-cream"
        >
          Discover the Collection →
        </Link>
      </div>
    </section>
  );
}
