import { Suspense, lazy, useEffect, useRef, useState, useCallback } from "react";
import SiteFooter from "../components/SiteFooter";
import InstagramFeedSection from "../components/InstagramFeedSection";
import HomeSectionCards from "../components/HomeSectionCards";
import HomeBiancaStoryMobile from "../components/HomeBiancaStoryMobile";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import {
  clearSiteNavOffset,
  setSiteNavOffsetPx,
} from "../hooks/useScrollCompactNav";
import { NavActiveProvider } from "../context/NavActiveContext";
import HomePageMobile from "./HomePageMobile";
import { BIANCA_INSTAGRAM_URL } from "../data/siteContact";

const MacBookPro = lazy(() => import("../../imports/MacBookPro141-2-335"));

const DESIGN_W = 1512;
/** Hero + manifesto only — collections replaced by fluid section cards below. */
const DESIGN_H = 1780;
/** Matches HOMEPAGE_HEADER_DESIGN_H — keep literal to avoid eager-loading the artboard chunk. */
const HEADER_DESIGN_H = 130;

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

function DesktopHomeHero() {
  const { scale, scrollH } = useDesignScale();
  const containerRef = useRef<HTMLDivElement>(null);

  // Publish nav offset so the Fine Jewellery mega menu can sit below the
  // artboard header even before the lazy MacBookPro measure band mounts.
  useEffect(() => {
    setSiteNavOffsetPx(Math.ceil(HEADER_DESIGN_H * scale));
    return () => clearSiteNavOffset();
  }, [scale]);

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
        <NavActiveProvider value="the-house">
          <Suspense
            fallback={
              <div
                className="flex h-full min-h-[100svh] w-full items-center justify-center bg-[#faf8f5]"
                role="status"
                aria-live="polite"
              >
                <span className="font-editorial text-[11px] uppercase tracking-[0.22em] text-[#1d3c34]/70">
                  Bianca Diamonds
                </span>
              </div>
            }
          >
            <MacBookPro />
          </Suspense>
        </NavActiveProvider>
      </div>
    </div>
  );
}

export default function HomePage() {
  const isDesktop = useMediaMinWidth();

  return (
    <>
      {isDesktop ? (
        <>
          <DesktopHomeHero />
          <HomeSectionCards />
          <HomeBiancaStoryMobile />
        </>
      ) : (
        <HomePageMobile />
      )}
      <InstagramFeedSection profileUrl={BIANCA_INSTAGRAM_URL} compactTop />
      <SiteFooter />
    </>
  );
}
