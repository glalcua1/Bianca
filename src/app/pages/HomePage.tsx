import { useEffect, useRef, useState, useCallback } from "react";
import SiteFooter from "../components/SiteFooter";
import InstagramFeedSection from "../components/InstagramFeedSection";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import HomePageMobile from "./HomePageMobile";
import MacBookPro from "../../imports/MacBookPro141-2-335";
import { BIANCA_INSTAGRAM_URL } from "../data/siteContact";

const DESIGN_W = 1512;
/** Scaled artboard height — matches founder forest block bottom (3774 + 619). */
const DESIGN_H = 4393;

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
      <InstagramFeedSection profileUrl={BIANCA_INSTAGRAM_URL} compactTop />
      <SiteFooter />
    </>
  );
}
