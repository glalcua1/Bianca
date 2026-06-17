import { useId } from "react";
// This is the actual diamond ring PNG (golden ring on black background)
import ringPng from "figma:asset/6b26ef4fc22c5dab0298c677db3a48579b696098.png";

interface RingMarkProps {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Bianca Diamonds ring-mark – golden ring, black background removed.
 *
 * Technique (identical to Bianca_Logo.svg):
 *   1. The ring PNG goes into a <mask> with a luminance→alpha filter applied:
 *        black pixels  → luma ≈ 0 → alpha = 0  (invisible in mask → hole)
 *        golden pixels → luma > 0 → alpha > 0  (visible in mask → shows through)
 *   2. The SAME ring PNG (full colour, no filter) is drawn as the visible layer
 *      and clipped by that mask.
 *
 * Result: real golden ring, genuine reflections & shading, zero black background.
 * No flat colour overlay, no blend-mode hacks, no sprite-sheet offsets.
 */
export function RingMark({ width = "100%", height = "100%", style, className }: RingMarkProps) {
  // useId() gives ":r0:" – sanitise colons for SVG id/url()
  const raw = useId().replace(/:/g, "");
  const filterId = `bd-luma-${raw}`;
  const maskId   = `bd-mask-${raw}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
      className={className}
    >
      <defs>
        {/*
         * feColorMatrix – luminance → alpha, RGB → white.
         * Row R: [0 0 0 0 1]              force red   = 1
         * Row G: [0 0 0 0 1]              force green = 1
         * Row B: [0 0 0 0 1]              force blue  = 1
         * Row A: [0.2126 0.7152 0.0722 0 0]  alpha = luma(source pixel)
         *
         * Inside <mask>, SVG uses luminance of the mask content as opacity.
         * White pixels (luma=1) → fully opaque mask → shows through.
         * Black pixels (luma=0) → fully transparent mask → hidden.
         */}
        <filter
          id={filterId}
          x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    0.2126 0.7152 0.0722 0 0"
          />
        </filter>

        {/* Mask built from the filtered ring: black bg → transparent, ring → opaque */}
        <mask id={maskId}>
          <image
            x="0" y="0" width="1" height="1"
            href={ringPng}
            preserveAspectRatio="none"
            filter={`url(#${filterId})`}
          />
        </mask>
      </defs>

      {/*
       * The REAL ring PNG drawn at full colour, clipped to the mask above.
       * Black background is cut away; actual golden metal & gems remain.
       */}
      <image
        x="0" y="0" width="1" height="1"
        href={ringPng}
        preserveAspectRatio="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
