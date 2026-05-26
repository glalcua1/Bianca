import { clsx } from "clsx";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "default" | "hero" | "accent";
  className?: string;
};

export default function LuxuryCard({
  children,
  variant = "default",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "rounded-xl border p-5 transition-shadow",
        variant === "default" &&
          "border-black/8 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)]",
        variant === "hero" &&
          "border-[#C9A962]/40 bg-gradient-to-br from-[#faf8f5] to-white shadow-[0_8px_40px_rgba(201,169,98,0.15)]",
        variant === "accent" &&
          "border-[#1d3c34]/20 bg-[#1d3c34] text-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
