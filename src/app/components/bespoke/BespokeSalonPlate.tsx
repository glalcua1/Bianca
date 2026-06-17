import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Circular marble disc vs rounded salon rectangle */
  variant?: "disc" | "salon";
  className?: string;
};

/**
 * HW-inspired marble salon surface — adapted for Bianca parchment & gilt palette.
 */
export default function BespokeSalonPlate({
  children,
  variant = "disc",
  className = "",
}: Props) {
  const shape =
    variant === "disc"
      ? "aspect-square rounded-full"
      : "aspect-[4/5] rounded-sm";

  return (
    <div
      className={`group relative ${shape} ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 30%, #ffffff 0%, #f4f0e6 45%, #e8e0d4 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />
      <div
        className={`absolute inset-[6%] overflow-hidden shadow-[0_24px_80px_rgba(29,60,52,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[#766d42]/12 ${
          variant === "disc" ? "rounded-full" : "rounded-sm"
        }`}
      >
        {children}
      </div>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full bg-[#dccb7b]/[0.06] blur-2xl transition duration-700 group-hover:bg-[#dccb7b]/10 motion-reduce:transition-none"
        aria-hidden
      />
    </div>
  );
}
