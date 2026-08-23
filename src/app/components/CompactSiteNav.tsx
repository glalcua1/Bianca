import type { RefObject } from "react";
import { Link } from "react-router";
import { BiancaForestNavLogo } from "./BiancaLogo";
import FineJewelleryNavTrigger from "./FineJewelleryNavTrigger";
import SiteNavSearch from "./SiteNavSearch";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";
import { SITE_NAV_ITEMS } from "../data/siteContact";

type Props = {
  activeItem?: NavActiveItem;
  /** Shorter labels for the compact scrolled bar */
  dense?: boolean;
};

export default function CompactNavLinks({ activeItem, dense = true }: Props) {
  return (
    <NavActiveProvider value={activeItem}>
      {SITE_NAV_ITEMS.map((item) => {
        const isActive = activeItem === item.id;
        const label =
          dense && item.desktopLabel ? item.desktopLabel : item.label;

        if (item.id === "fine-jewellery") {
          return (
            <FineJewelleryNavTrigger
              key={item.id}
              label={label}
              isActive={isActive}
              variant="compact"
            />
          );
        }

        return (
          <Link
            key={item.id}
            to={item.to}
            className="relative block shrink-0 whitespace-nowrap"
          >
            <span
              className={`block px-2 py-1 font-editorial text-[10px] uppercase tracking-[0.14em] text-[#f9f9f9] transition-colors hover:text-white sm:px-2.5 sm:text-[11px] md:px-3 md:text-[12px] ${
                isActive ? "font-bold text-white" : ""
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </NavActiveProvider>
  );
}

type BarProps = {
  activeItem?: NavActiveItem;
  fixed?: boolean;
  headerRef?: RefObject<HTMLElement | null>;
  /** 0–1 scroll progress — fades border, shadow, and backdrop in smoothly. */
  elevation?: number;
};

export function CompactSiteNavBar({
  activeItem,
  fixed = false,
  headerRef,
  elevation = 1,
}: BarProps) {
  const showChrome = elevation > 0.04;

  return (
    <NavActiveProvider value={activeItem}>
      <header
        ref={headerRef}
        className={`bg-[#1d3c34] px-3 pb-2.5 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4 md:px-5 ${
          fixed ? "fixed inset-x-0 top-0 z-[100]" : "relative z-20"
        }`}
        style={{
          borderBottomWidth: showChrome ? "1px" : "0px",
          borderBottomStyle: "solid",
          borderBottomColor: `rgba(118, 109, 66, ${0.3 * elevation})`,
          boxShadow: showChrome
            ? `0 6px 28px rgba(8, 20, 16, ${0.38 * elevation})`
            : "none",
          backdropFilter: elevation > 0.35 ? "blur(4px)" : "none",
          WebkitBackdropFilter: elevation > 0.35 ? "blur(4px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[100rem] items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            to="/"
            className="relative block shrink-0 transition-opacity duration-300 hover:opacity-90"
            aria-label="Bianca Diamonds — home"
          >
            <BiancaForestNavLogo maxWidth={88} />
          </Link>

          <div
            className="mx-1 hidden h-6 w-px shrink-0 sm:block"
            style={{ backgroundColor: `rgba(118, 109, 66, ${0.35 * elevation})` }}
            aria-hidden
          />

          <nav
            aria-label="Main navigation"
            className="flex min-w-0 flex-1 items-center justify-end gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1 [&::-webkit-scrollbar]:hidden"
          >
            <CompactNavLinks activeItem={activeItem} />
          </nav>

          <SiteNavSearch variant="compact" />
        </div>
      </header>
    </NavActiveProvider>
  );
}
