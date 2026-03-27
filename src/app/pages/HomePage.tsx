import { useEffect, useRef, useState, useCallback } from "react";
import MacBookPro from "../../imports/MacBookPro141-2-335";

const DESIGN_W = 1512;
const DESIGN_H = 4500;

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

export default function HomePage() {
  const { scale, scrollH } = useDesignScale();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { margin: 0; padding: 0; overscroll-behavior: none; }
        [class*="Tiro_Bangla"] { font-family: 'Tiro Bangla', 'Times New Roman', serif !important; }
        [class*="Times_New_Roman"] { font-family: 'Times New Roman', Times, serif !important; }
        [class*="Arial"] { font-family: Arial, Helvetica, sans-serif !important; }
        [class*="ABeeZee"] { font-family: 'ABeeZee', sans-serif !important; }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: `${scrollH}px`,
          overflow: "hidden",
        }}
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
    </>
  );
}
