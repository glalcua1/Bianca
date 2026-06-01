import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import FineJewelleryHeroMobile from "./FineJewelleryHeroMobile";
import ProtectedImage from "./protection/ProtectedImage";
import BrandImageWatermark from "./BrandImageWatermark";

const DESIGN_W = 1512;
const CARD_TOP = 93;
const CARD_HEIGHT = 693;
const CARD_LEFT = 39;
const CARD_WIDTH = 1434;
const CARD_BOTTOM = CARD_TOP + CARD_HEIGHT;
const BOTTOM_SPACING = 96;
const DESIGN_H = CARD_BOTTOM + BOTTOM_SPACING;
/** Align with The House hero copy — 135px inset from card inner edge */
const CONTENT_LEFT = 174;
const CONTENT_WIDTH = 508;
const CANNES_HERO_IMAGE = "/Cannes/Model_neck1.png";
const HERO_FOREST_BG = "#1d3c34";
/** Darker than page fill so the left of the gradient stroke reads on forest */
const HERO_STROKE_GREEN = "#071410";
/** Right-side editorial frame — inset within the white card */
const IMAGE_PANEL = {
  left: 819,
  top: 130,
  width: 600,
  height: 620,
};

export default function FineJewelleryHero() {
  const isDesktop = useMediaMinWidth();
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(DESIGN_H);

  const compute = useCallback(() => {
    const s = window.innerWidth / DESIGN_W;
    setScale(s);
    setHeight(Math.ceil(DESIGN_H * s));
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute, isDesktop]);

  if (!isDesktop) {
    return <FineJewelleryHeroMobile />;
  }

  return (
    <div
      className="relative z-10 w-full overflow-hidden bg-[#1d3c34]"
      style={{ height: `${height}px` }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${DESIGN_W}px`,
          height: `${DESIGN_H}px`,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          willChange: "transform",
        }}
      >
        <div className="relative bg-[#1d3c34]" style={{ width: DESIGN_W, height: DESIGN_H }}>
          <div
            className={`absolute rounded-[20px] border border-solid border-transparent [background:linear-gradient(${HERO_FOREST_BG},${HERO_FOREST_BG})_padding-box,linear-gradient(to_right,${HERO_STROKE_GREEN},#766d42,#dccb7b)_border-box]`}
            style={{
              left: CARD_LEFT,
              top: CARD_TOP,
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
            }}
          />

          <div
            className="absolute overflow-hidden rounded-[16px] bg-black"
            style={{
              left: IMAGE_PANEL.left,
              top: IMAGE_PANEL.top,
              width: IMAGE_PANEL.width,
              height: IMAGE_PANEL.height,
            }}
            data-name="Hero portrait frame"
          >
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden px-8 pb-6 pt-10">
              <ProtectedImage
                wrapperClassName="relative max-h-full max-w-full"
                alt="Bianca Diamonds fine jewellery — Cannes Film Festival 2026"
                className="max-h-full max-w-full object-contain"
                src={CANNES_HERO_IMAGE}
              />
              <BrandImageWatermark className="bottom-5 right-5 w-[clamp(56px,14%,92px)] md:bottom-6 md:right-6" />
            </div>
          </div>

          {/* Left editorial column — optical alignment with The House hero */}
          <div
            className="absolute flex flex-col justify-center"
            style={{
              left: CONTENT_LEFT,
              top: CARD_TOP,
              width: CONTENT_WIDTH,
              height: CARD_HEIGHT,
            }}
          >
            <p className="m-0 text-house-eyebrow text-gold-on-forest">
              Cannes Film Festival · 2026
            </p>

            <h1 className="m-0 mt-6 max-w-[508px] text-house-display text-[36px] leading-[1.2] tracking-[1.2px] text-on-forest">
              Exclusive Jewellery Showcase
            </h1>

            <p className="m-0 mt-7 max-w-[508px] text-house-tagline text-[24px] leading-[1.45] tracking-[0.04em] text-on-forest-body">
              A cinematic editorial on Bianca Diamonds&apos; debut at Cannes — on
              the world&apos;s most celebrated red carpet.
            </p>

            <Link
              to="/fine-jewellery/cannes-2026"
              className="mt-9 w-fit font-editorial text-[15px] uppercase tracking-[0.8px] text-gold-on-forest transition-colors hover:text-on-forest"
            >
              Discover the Collection →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
