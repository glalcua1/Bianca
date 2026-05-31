import { useCallback, useEffect, useState } from "react";
import { HomepageHeaderChrome } from "../../imports/MacBookPro141-2-335";
import { useMediaMinWidth } from "../hooks/useMediaMinWidth";
import MobileSiteNav from "./MobileSiteNav";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";

const DESIGN_W = 1512;
const DESIGN_H = 130;
/** Room above logo mark so script letterforms aren't clipped at viewport top */
const NAV_TOP_PADDING = 12;

type Props = {
  activeItem?: NavActiveItem;
};

export default function SiteNav({ activeItem }: Props) {
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
    return <MobileSiteNav activeItem={activeItem} />;
  }

  return (
    <NavActiveProvider value={activeItem}>
      <style>{`
        [class*="Times_New_Roman"] { font-family: 'Times New Roman', Times, serif !important; }
      `}</style>
      <div
        className="relative z-20 w-full bg-[#1d3c34]"
        style={{
          height: `${height + NAV_TOP_PADDING}px`,
          paddingTop: NAV_TOP_PADDING,
        }}
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
          <HomepageHeaderChrome />
        </div>
      </div>
    </NavActiveProvider>
  );
}
