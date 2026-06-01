import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export default function FieldInput({ label, hint, className, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-house-caption tracking-widest text-on-cream-muted">
        {label}
      </span>
      <input
        className={clsx(
          "w-full rounded-lg border border-black/10 bg-[#faf8f5] px-3 py-2.5 font-body text-sm text-bianca-forest outline-none transition focus:border-gold-accent focus:ring-2 focus:ring-gold-accent/20",
          className,
        )}
        {...props}
      />
      {hint && (
        <span className="mt-1 block text-[11px] text-on-cream-subtle">{hint}</span>
      )}
    </label>
  );
}
