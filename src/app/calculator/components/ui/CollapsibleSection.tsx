import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, type ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: ReactNode;
  badge?: string;
};

export default function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = true,
  children,
  badge,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_2px_24px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#faf8f5]"
      >
        <div>
          <div className="flex items-center gap-3">
            <h2 className="font-['Times_New_Roman',serif] text-lg tracking-wide text-[#1a1a1a]">
              {title}
            </h2>
            {badge && (
              <span className="rounded-full bg-[#C9A962]/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-[#8B7355]">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-0.5 font-['Arial',sans-serif] text-xs text-[#717182]">
              {subtitle}
            </p>
          )}
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-[#8B7355]" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/5 px-5 py-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
