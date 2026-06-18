import { forwardRef, useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import { BiancaForestNavLogo } from "./BiancaLogo";
import { FineJewelleryMegaMenuPanel } from "./FineJewelleryMegaMenu";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";
import { SITE_NAV_ITEMS } from "../data/siteContact";
import { clearSiteNavOffset } from "../hooks/useScrollCompactNav";

type Props = {
  activeItem?: NavActiveItem;
  fixed?: boolean;
  scrollProgress?: number;
  compact?: boolean;
};

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

const MobileSiteNav = forwardRef<HTMLElement, Props>(function MobileSiteNav(
  { activeItem, fixed = false, scrollProgress = 0, compact = false },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [fineMenuOpen, setFineMenuOpen] = useState(false);

  useEffect(() => {
    if (compact) setOpen(false);
  }, [compact]);

  useEffect(() => {
    return () => clearSiteNavOffset();
  }, []);

  const closeAll = useCallback(() => {
    setOpen(false);
    setFineMenuOpen(false);
  }, []);

  const progress = scrollProgress;
  const logoWidth = Math.round(lerp(132, 118, progress));
  const menuButtonSize = Math.round(lerp(40, 36, progress));
  const paddingBottom = lerp(12, 10, progress);
  const showChrome = progress > 0.04;

  return (
    <NavActiveProvider value={activeItem}>
      <header
        ref={ref}
        className={`z-[60] bg-[#1d3c34] px-4 pt-[max(0.75rem,env(safe-area-inset-top))] ${
          fixed ? "fixed inset-x-0 top-0" : "relative z-20"
        }`}
        style={{
          paddingBottom: `${paddingBottom}px`,
          borderBottomWidth: showChrome ? "1px" : "0px",
          borderBottomStyle: "solid",
          borderBottomColor: `rgba(118, 109, 66, ${0.3 * progress})`,
          boxShadow: showChrome
            ? `0 6px 28px rgba(8, 20, 16, ${0.38 * progress})`
            : "none",
          backdropFilter: progress > 0.35 ? "blur(4px)" : "none",
          WebkitBackdropFilter: progress > 0.35 ? "blur(4px)" : "none",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="relative block shrink-0 transition-opacity duration-300 hover:opacity-90"
            aria-label="Bianca Diamonds — home"
            onClick={closeAll}
          >
            <BiancaForestNavLogo maxWidth={logoWidth} />
          </Link>
          <button
            type="button"
            className="flex shrink-0 items-center justify-center rounded border text-[#f9f9f9] transition-colors duration-300 hover:border-[#dccb7b]/55 hover:bg-[#766d42]/10"
            style={{
              width: menuButtonSize,
              height: menuButtonSize,
              borderColor: `rgba(220, 203, 123, ${0.35 + progress * 0.2})`,
            }}
            aria-expanded={open}
            aria-controls="mobile-site-nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span
                className={`block h-px w-5 bg-[#f9f9f9] transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[#f9f9f9] transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-[#f9f9f9] transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>

        <nav
          id="mobile-site-nav-menu"
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!open}
        >
          <ul className="mt-4 space-y-1 border-t border-[#766d42]/40 pt-4">
            {SITE_NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.id;

              if (item.id === "fine-jewellery") {
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`grid w-full grid-cols-[1fr_auto_1fr] items-center py-2.5 font-editorial text-[15px] uppercase tracking-[0.12em] transition-colors ${
                        isActive || fineMenuOpen
                          ? "font-bold text-white"
                          : "text-[#f9f9f9] hover:text-white"
                      }`}
                      aria-expanded={fineMenuOpen}
                      onClick={() => setFineMenuOpen((v) => !v)}
                    >
                      <span aria-hidden />
                      <span className="justify-self-center">{item.label}</span>
                      <span className="justify-self-end text-[#dccb7b]" aria-hidden>
                        {fineMenuOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                        fineMenuOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="border-t border-[#766d42]/25 bg-[#faf8f5] px-3 py-5">
                        <FineJewelleryMegaMenuPanel
                          layout="stacked"
                          onNavigate={closeAll}
                        />
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={`block py-2.5 text-center font-editorial text-[15px] uppercase tracking-[0.12em] transition-colors ${
                      isActive
                        ? "font-bold text-white"
                        : "text-[#f9f9f9] hover:text-white"
                    }`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </NavActiveProvider>
  );
});

export default MobileSiteNav;
