import { useEffect, useRef, useState, useCallback } from "react";
import MacBookPro from "../imports/MacBookPro141-2-335";

// ─── Design constants ────────────────────────────────────────────────────────
const DESIGN_W = 1512;   // Figma canvas width (px)
const DESIGN_H = 4500;   // Figma canvas height (px)

// ─── Hook: watch viewport width and return scale + scrollable height ─────────
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

export default function App() {
  const { scale, scrollH } = useDesignScale();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Global resets + font overrides ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          padding: 0;
          /* Prevent iOS bounce from causing layout flicker */
          overscroll-behavior: none;
        }
        /* Figma font family overrides */
        [class*="Tiro_Bangla"]       { font-family: 'Tiro Bangla', 'Times New Roman', serif !important; }
        [class*="Times_New_Roman"]   { font-family: 'Times New Roman', Times, serif !important; }
        [class*="Arial"]             { font-family: Arial, Helvetica, sans-serif !important; }
        [class*="ABeeZee"]           { font-family: 'ABeeZee', sans-serif !important; }
      `}</style>

      {/*
        ── Responsive scaler ──────────────────────────────────────────────────
        How it works:
          • The outer div is 100vw wide and reserves the exact scroll height
            produced by the scaled design (DESIGN_H × scale).  This makes the
            browser's native scrollbar and touch-scroll work perfectly.
          • The inner ".design-canvas" div is exactly DESIGN_W × DESIGN_H.
            It is pinned to top-left with position:absolute, then scaled by
            the JS-computed scale around its top-left corner.
          • Because transform doesn't affect layout, the outer div's padded
            height is the only thing driving the document scroll height.
      */}
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
            /* GPU-accelerate the transform layer */
            willChange: "transform",
          }}
        >
          <MacBookPro />
        </div>
      </div>
    </>
  );
}
