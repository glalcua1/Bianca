type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** GIA-style educational marks for the 4Cs */
export function IconCarat({ className = "size-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 8 L36 20 L24 40 L12 20 Z" />
      <path {...stroke} d="M12 20 H36" />
      <path {...stroke} d="M18 14 L24 20 L30 14" />
      <text
        x="24"
        y="33"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7"
        fontFamily="Times New Roman, serif"
      >
        ct
      </text>
    </svg>
  );
}

export function IconCut({ className = "size-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 10 L34 18 L24 38 L14 18 Z" />
      <path {...stroke} d="M14 18 H34" />
      <path {...stroke} d="M19 14 L24 18 L29 14" />
      <path {...stroke} d="M24 8 V4" />
      <path {...stroke} d="M33 12 L36 9" />
      <path {...stroke} d="M15 12 L12 9" />
      <path {...stroke} d="M36 24 L40 24" />
      <path {...stroke} d="M8 24 L12 24" />
    </svg>
  );
}

export function IconColour({ className = "size-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 8 L36 20 L24 40 L12 20 Z" />
      <path {...stroke} d="M12 20 H36" />
      <path {...stroke} opacity={0.35} d="M24 20 L30 28 L24 36 L18 28 Z" />
      <text
        x="10"
        y="44"
        fill="currentColor"
        fontSize="6"
        fontFamily="Times New Roman, serif"
      >
        D
      </text>
      <text
        x="35"
        y="44"
        fill="currentColor"
        fontSize="6"
        fontFamily="Times New Roman, serif"
      >
        Z
      </text>
      <path {...stroke} d="M14 40 H34" opacity={0.45} />
    </svg>
  );
}

export function IconClarity({ className = "size-10" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M18 10 L28 18 L18 36 L8 18 Z" />
      <path {...stroke} d="M8 18 H28" />
      <circle {...stroke} cx="33" cy="28" r="8" />
      <path {...stroke} d="M38.5 33.5 L43 38" />
    </svg>
  );
}

export function IconShapeRound({ className = "size-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle {...stroke} cx="24" cy="24" r="14" />
      <path {...stroke} d="M24 10 V38 M10 24 H38" opacity={0.35} />
      <path {...stroke} d="M14 14 L34 34 M34 14 L14 34" opacity={0.25} />
    </svg>
  );
}

export function IconShapeOval({ className = "size-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <ellipse {...stroke} cx="24" cy="24" rx="11" ry="16" />
      <path {...stroke} d="M24 8 V40" opacity={0.3} />
      <path {...stroke} d="M13 24 H35" opacity={0.3} />
    </svg>
  );
}

export function IconShapeMarquise({ className = "size-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path {...stroke} d="M24 6 C32 16 32 32 24 42 C16 32 16 16 24 6 Z" />
      <path {...stroke} d="M24 6 V42" opacity={0.3} />
      <path {...stroke} d="M17 24 H31" opacity={0.3} />
    </svg>
  );
}

export function IconShapeEmerald({ className = "size-12" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        {...stroke}
        d="M14 12 H34 L38 18 V30 L34 36 H14 L10 30 V18 Z"
      />
      <rect
        {...stroke}
        x="16"
        y="18"
        width="16"
        height="12"
        opacity={0.45}
      />
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
        fillOpacity={0.18}
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
        opacity={0.7}
      />
    </svg>
  );
}
