type Props = {
  className?: string;
  /** Gilt line art — Bianca bespoke symbol */
  tone?: "gold" | "white" | "forest";
};

const toneMap = {
  gold: "#dccb7b",
  white: "#f9f9f9",
  forest: "#766d42",
};

/** Delicate butterfly mark — orchid, white & butterfly brand trio */
export default function BespokeButterflyMark({
  className = "",
  tone = "gold",
}: Props) {
  const stroke = toneMap[tone];

  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M24 20C24 20 20 8 12 8C6 8 4 14 8 18C12 22 20 20 24 20Z"
        stroke={stroke}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M24 20C24 20 28 8 36 8C42 8 44 14 40 18C36 22 28 20 24 20Z"
        stroke={stroke}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M24 20C24 20 18 28 14 32C10 36 8 34 10 30C12 26 20 22 24 20Z"
        stroke={stroke}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M24 20C24 20 30 28 34 32C38 36 40 34 38 30C36 26 28 22 24 20Z"
        stroke={stroke}
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M24 8V32"
        stroke={stroke}
        strokeWidth="0.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="20" r="1.2" fill={stroke} />
    </svg>
  );
}
