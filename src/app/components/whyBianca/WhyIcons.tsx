type IconProps = {
  className?: string;
};

/** GIA-style educational line marks for the 4Cs */
export function IconCarat({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Size comparison: small + large diamond */}
      <path d="M14 22 L20 28 L14 38 L8 28 Z" opacity="0.4" />
      <path d="M28 12 L40 22 L28 40 L16 22 Z" />
      <path d="M16 22 H40" />
      <path d="M22 16 L28 22 L34 16" />
    </svg>
  );
}

export function IconCut({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M24 14 L34 22 L24 40 L14 22 Z" />
      <path d="M14 22 H34" />
      <path d="M19 17 L24 22 L29 17" />
      {/* Brilliance rays */}
      <path d="M24 6 V10" />
      <path d="M35 11 L32 14" />
      <path d="M13 11 L16 14" />
      <path d="M42 24 H38" />
      <path d="M6 24 H10" />
      <path d="M35 37 L32 34" />
      <path d="M13 37 L16 34" />
    </svg>
  );
}

export function IconColour({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M24 8 L36 20 L24 40 L12 20 Z" />
      <path d="M12 20 H36" />
      <path d="M18 14 L24 20 L30 14" />
      {/* Colour scale marks */}
      <path d="M10 44 H38" opacity="0.5" />
      <path d="M10 42 V44" />
      <path d="M24 42 V44" opacity="0.6" />
      <path d="M38 42 V44" />
    </svg>
  );
}

export function IconClarity({ className = "size-10" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8 L28 18 L16 38 L4 18 Z" />
      <path d="M4 18 H28" />
      <path d="M10 12 L16 18 L22 12" />
      {/* Loupe */}
      <circle cx="34" cy="30" r="9" />
      <path d="M40.5 36.5 L45 41" />
      {/* Tiny inclusion mark inside loupe */}
      <circle cx="34" cy="30" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShapeRound({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <circle cx="24" cy="24" r="14" />
      <path d="M24 10 V38 M10 24 H38" opacity="0.35" />
      <path d="M14 14 L34 34 M34 14 L14 34" opacity="0.25" />
    </svg>
  );
}

export function IconShapeOval({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden
    >
      <ellipse cx="24" cy="24" rx="11" ry="16" />
      <path d="M24 8 V40" opacity="0.3" />
      <path d="M13 24 H35" opacity="0.3" />
    </svg>
  );
}

export function IconShapeMarquise({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M24 6 C32 16 32 32 24 42 C16 32 16 16 24 6 Z" />
      <path d="M24 6 V42" opacity="0.3" />
      <path d="M17 24 H31" opacity="0.3" />
    </svg>
  );
}

export function IconShapeEmerald({ className = "size-12" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 12 H34 L38 18 V30 L34 36 H14 L10 30 V18 Z" />
      <rect x="16" y="18" width="16" height="12" opacity="0.45" />
    </svg>
  );
}

type FancyProps = IconProps & { tone: string };

export function IconFancyDiamond({ className = "size-14", tone }: FancyProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M24 6 L38 18 L24 42 L10 18 Z"
        fill={tone}
        fillOpacity={0.16}
        stroke={tone}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
      <path
        d="M10 18 H38"
        fill="none"
        stroke={tone}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <path
        d="M16 12 L24 18 L32 12"
        fill="none"
        stroke={tone}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.75}
      />
    </svg>
  );
}
