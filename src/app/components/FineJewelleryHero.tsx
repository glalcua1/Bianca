import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import Group6Logo from "../../imports/Group6";
import ProtectedImage from "./protection/ProtectedImage";

const DESIGN_W = 1512;
const CARD_TOP = 93;
const CARD_HEIGHT = 693;
const CARD_LEFT = 39;
const CARD_WIDTH = 1434;
const CARD_BOTTOM = CARD_TOP + CARD_HEIGHT;
const BOTTOM_SPACING = 96;
const DESIGN_H = CARD_BOTTOM + BOTTOM_SPACING;
const CONTENT_LEFT = 194;
const CANNES_HERO_IMAGE = "/Cannes/Model_neck1.png";

/** Right-side editorial frame — inset within the white card */
const IMAGE_PANEL = {
  left: 819,
  top: 130,
  width: 600,
  height: 620,
};

export default function FineJewelleryHero() {
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(DESIGN_H);

  const compute = useCallback(() => {
    const s = window.innerWidth / DESIGN_W;
    setScale(s);
    setHeight(Math.ceil(DESIGN_H * s));
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  return (
    <>
      <style>{`
        [class*="SangBleuOGSans"] { font-family: 'SangBleuOGSans-Light', sans-serif !important; }
        [class*="Tiro_Bangla"] { font-family: 'Tiro Bangla', 'Times New Roman', serif !important; }
      `}</style>
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
            {/* White card — left content area only gradient */}
            <div
              className="absolute rounded-[20px] border-[0.4px] border-solid border-[#1d3c34] bg-gradient-to-r from-[#edefed] via-white to-white"
              style={{
                left: CARD_LEFT,
                top: CARD_TOP,
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
              }}
            />

            {/* Black editorial frame — right side */}
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
              <div className="absolute inset-0 flex items-end justify-center px-8 pb-6 pt-10">
                <ProtectedImage
                  wrapperClassName="max-h-full max-w-full"
                  alt="Bianca Diamonds fine jewellery — Cannes Film Festival 2026"
                  className="max-h-full max-w-full object-contain"
                  src={CANNES_HERO_IMAGE}
                />
              </div>
            </div>

            {/* Left column — vertically balanced within card */}
            <div
              className="absolute h-[245px] w-[304px]"
              style={{ left: CONTENT_LEFT, top: 175 }}
            >
              <Group6Logo />
            </div>

            <div
              className="absolute w-[560px] font-['SangBleuOGSans-Light',sans-serif] text-[32px] uppercase leading-[1.22] tracking-[1.5px] text-[#1d3c34]"
              style={{ left: CONTENT_LEFT, top: 475 }}
            >
              <h1 className="m-0 font-normal leading-[normal]">
                Exclusive Jewellery Showcase from Cannes Film Festival 2026
              </h1>
            </div>

            <div
              className="absolute w-[560px] font-['Tiro_Bangla:Regular',serif] text-[21px] leading-[1.5] tracking-[0.5px] text-black"
              style={{ left: CONTENT_LEFT, top: 595 }}
            >
              <p className="m-0">
                A cinematic editorial on Bianca Diamonds&apos; debut at Cannes —
                on the world&apos;s most celebrated red carpet.
              </p>
            </div>

            <Link
              to="/fine-jewellery/cannes-2026"
              className="absolute font-['Times_New_Roman',serif] text-[15px] uppercase tracking-[0.8px] text-[#766d42] transition-opacity hover:opacity-75"
              style={{ left: CONTENT_LEFT, top: 715 }}
            >
              Read the Story →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
