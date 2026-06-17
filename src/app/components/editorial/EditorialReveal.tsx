import type { ReactNode, CSSProperties } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function EditorialReveal({
  children,
  className = "",
  delay = 0,
}: Props) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
