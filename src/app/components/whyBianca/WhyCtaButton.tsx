import { Link } from "react-router";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost-light" | "primary-light";

const variants: Record<Variant, string> = {
  primary:
    "border border-[#1d3c34] bg-[#1d3c34] text-[#faf8f5] hover:bg-transparent hover:text-bianca-forest",
  secondary:
    "border border-[#1d3c34]/35 text-[#1d3c34] hover:border-[#1d3c34] hover:bg-[#1d3c34]/5",
  "ghost-light":
    "border border-[#f9f9f9]/35 text-[#f9f9f9] hover:border-[#f9f9f9] hover:bg-[#f9f9f9] hover:text-bianca-forest",
  "primary-light":
    "border border-[#f9f9f9] bg-[#f9f9f9] text-[#1d3c34] hover:bg-transparent hover:text-[#f9f9f9]",
};

const baseClass =
  "inline-flex min-w-[200px] justify-center px-8 py-3.5 text-house-cta transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#766d42]";

type Props = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function WhyCtaButton({
  children,
  variant = "primary",
  className = "",
  to,
  onClick,
  type = "button",
  disabled = false,
}: Props) {
  const classes = `${baseClass} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
