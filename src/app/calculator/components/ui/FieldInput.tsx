import { clsx } from "clsx";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export default function FieldInput({ label, hint, className, ...props }: Props) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-['Arial',sans-serif] text-[11px] uppercase tracking-widest text-[#717182]">
        {label}
      </span>
      <input
        className={clsx(
          "w-full rounded-lg border border-black/10 bg-[#faf8f5] px-3 py-2.5 font-['Arial',sans-serif] text-sm text-[#1a1a1a] outline-none transition focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20",
          className,
        )}
        {...props}
      />
      {hint && (
        <span className="mt-1 block text-[11px] text-[#999]">{hint}</span>
      )}
    </label>
  );
}
