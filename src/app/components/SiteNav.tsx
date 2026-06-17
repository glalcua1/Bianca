import { useCallback, useEffect, useRef, useState } from "react";
import { HomepageHeaderChrome } from "../../imports/MacBookPro141-2-335";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import {
  clearSiteNavOffset,
  lerpNavOffset,
  setSiteNavOffsetPx,
  useScrollCompactNav,
} from "../hooks/useScrollCompactNav";
import { CompactSiteNavBar } from "./CompactSiteNav";
import MobileSiteNav from "./MobileSiteNav";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";

const DESIGN_W = 1512;
const DESIGN_H = 130;
/** Room above logo mark so script letterforms aren't clipped at viewport top */
const NAV_TOP_PADDING = 12;
const COMPACT_HEIGHT_FALLBACK = 52;

type Props = {
  activeItem?: NavActiveItem;
  /** Desktop only — transparent bar that reveals forest green on hover/focus */
  variant?: "solid" | "overlay";
};

function MobileNavShell({
  activeItem,
  progress,
  compact,
}: {
  activeItem?: NavActiveItem;
  progress: number;
  compact: boolean;
}) {
  const headerRef = useRef<HTMLElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const publish = () => {
      const height = header.offsetHeight;
      setSpacerHeight(height);
      setSiteNavOffsetPx(height);
    };

    publish();
    const ro = new ResizeObserver(publish);
    ro.observe(header);
    return () => ro.disconnect();
  }, [progress, compact]);

  return (
    <>
      <div aria-hidden style={{ height: spacerHeight || undefined }} />
      <MobileSiteNav
        ref={headerRef}
        activeItem={activeItem}
        fixed
        scrollProgress={progress}
        compact={compact}
      />
    </>
  );
}

function DesktopNavShell({
  activeItem,
  variant,
  progress,
}: {
  activeItem?: NavActiveItem;
  variant: "solid" | "overlay";
  progress: number;
}) {
  const isOverlay = variant === "overlay";
  const compactHeaderRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);
  const [compactHeight, setCompactHeight] = useState(COMPACT_HEIGHT_FALLBACK);

  const fullHeight = Math.ceil(DESIGN_H * scale) + NAV_TOP_PADDING;
  const spacerHeight = lerpNavOffset(fullHeight, compactHeight, progress);
  const fullOpacity = 1 - progress;
  const compactOpacity = progress;
  const fullInteractive = progress < 0.55;
  const compactInteractive = progress > 0.45;

  const compute = useCallback(() => {
    const s = window.innerWidth / DESIGN_W;
    setScale(s);
  }, []);

  useEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  useEffect(() => {
    const header = compactHeaderRef.current;
    if (!header) return;

    const measure = () => setCompactHeight(header.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setSiteNavOffsetPx(lerpNavOffset(fullHeight, compactHeight, progress));
  }, [fullHeight, compactHeight, progress]);

  useEffect(() => {
    return () => clearSiteNavOffset();
  }, []);

  return (
    <NavActiveProvider value={activeItem}>
      <style>{`
        [class*="Times_New_Roman"] { font-family: 'Times New Roman', Times, serif !important; }
      `}</style>

      <div aria-hidden style={{ height: spacerHeight }} />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[100]">
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 overflow-visible ${
            isOverlay
              ? "bg-transparent group-hover/nav:bg-[#1d3c34] focus-within:bg-[#1d3c34]"
              : "bg-[#1d3c34]"
          }`}
          style={{
            height: fullHeight,
            opacity: fullOpacity,
            transform: `translate3d(0, ${-progress * 14}px, 0)`,
            visibility: fullOpacity < 0.02 ? "hidden" : "visible",
            pointerEvents: fullInteractive ? "auto" : "none",
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
          aria-hidden={!fullInteractive}
        >
          <div
            className={`group/nav h-full w-full ${
              isOverlay ? "hover:bg-[#1d3c34] focus-within:bg-[#1d3c34]" : ""
            }`}
            style={{ paddingTop: NAV_TOP_PADDING }}
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
              }}
            >
              <HomepageHeaderChrome transparent={isOverlay} />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{
            opacity: compactOpacity,
            transform: `translate3d(0, ${(1 - progress) * -10}px, 0)`,
            visibility: compactOpacity < 0.02 ? "hidden" : "visible",
            pointerEvents: compactInteractive ? "auto" : "none",
            willChange: "transform, opacity",
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
          }}
          aria-hidden={!compactInteractive}
        >
          <CompactSiteNavBar
            activeItem={activeItem}
            headerRef={compactHeaderRef}
            elevation={progress}
          />
        </div>
      </div>
    </NavActiveProvider>
  );
}

export default function SiteNav({ activeItem, variant = "solid" }: Props) {
  const isDesktop = useMediaMinWidth();
  const { progress, compact } = useScrollCompactNav();

  if (!isDesktop) {
    return (
      <MobileNavShell
        activeItem={activeItem}
        progress={progress}
        compact={compact}
      />
    );
  }

  return (
    <DesktopNavShell
      activeItem={activeItem}
      variant={variant}
      progress={progress}
    />
  );
}
