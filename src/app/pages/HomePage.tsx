import { useEffect, useRef, useState, useCallback } from "react";
import HomeSeoSection from "../components/HomeSeoSection";
import SiteCopyright from "../components/SiteCopyright";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import HomePageMobile from "./HomePageMobile";
import MacBookPro from "../../imports/MacBookPro141-2-335";

const DESIGN_W = 1512;
/** Scaled artboard height (design px at 1512 width) */
const DESIGN_H = 4860;

function useDesignScale() {
  const [scale, setScale] = useState(1);
  const [scrollH, setScrollH] = useState(DESIGN_H);

  const compute = useCallback(() => {
    const vw = window.innerWidth;
    const s = vw / DESIGN_W;
    setScale(s);
    setScrollH(Math.ceil(DESIGN_H * s));
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  return { scale, scrollH };
}

function DesktopHomeArtboard() {
  const { scale, scrollH } = useDesignScale();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: `${scrollH}px`,
        overflow: "hidden",
      }}
      data-protected-page
      ref={containerRef}
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
        <MacBookPro />
      </div>
    </div>
  );
}

export default function HomePage() {
  const isDesktop = useMediaMinWidth();

  return (
    <>
      {isDesktop ? <DesktopHomeArtboard /> : <HomePageMobile />}
      <HomeSeoSection />
      <footer className="border-t border-[#1d3c34]/10 bg-[#faf8f5] px-8 py-8 text-center">
        <SiteCopyright />
      </footer>
    </>
  );
}
