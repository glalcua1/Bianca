import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FineJewelleryMegaMenuFloating } from "./FineJewelleryMegaMenu";

type Props = {
  label: string;
  isActive: boolean;
  variant?: "default" | "compact";
};

export default function FineJewelleryNavTrigger({
  label,
  isActive,
  variant = "default",
}: Props) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const compact = variant === "compact";

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  }, [clearCloseTimer]);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const triggerClassName = compact
    ? "block whitespace-nowrap px-2 py-1 font-editorial text-[10px] uppercase tracking-[0.14em] text-[#f9f9f9] transition-colors hover:text-white sm:px-2.5 sm:text-[11px] md:px-3 md:text-[12px]"
    : "block whitespace-nowrap px-[12px] py-[5px] font-editorial text-[14px] uppercase tracking-[1.5px] text-[#f9f9f9] transition-colors hover:text-white lg:px-[16px] lg:text-[15px]";

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <Link
        to="/fine-jewellery"
        className="relative block"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(false)}
      >
        <span
          className={`${triggerClassName} ${
            isActive || open ? "font-bold text-white" : ""
          }`}
        >
          {label}
        </span>
        {!compact && (
          <span
            className={`mx-auto mt-1 block h-px bg-[#dccb7b] transition-all duration-300 ${
              open ? "w-full" : "w-0"
            }`}
            aria-hidden
          />
        )}
      </Link>

      <FineJewelleryMegaMenuFloating
        open={open}
        onClose={() => setOpen(false)}
        onPointerEnter={clearCloseTimer}
        onPointerLeave={scheduleClose}
      />
    </div>
  );
}
