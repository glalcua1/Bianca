import type { ReactNode } from "react";

type Props = {
  designWidth: number;
  designHeight: number;
  maxWidth: number;
  children: ReactNode;
  className?: string;
};

/**
 * Renders a fixed-size Figma artboard and scales it uniformly to maxWidth.
 */
export default function ScaledArtboard({
  designWidth,
  designHeight,
  maxWidth,
  children,
  className = "",
}: Props) {
  const scale = maxWidth / designWidth;
  const height = designHeight * scale;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: maxWidth, height }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
