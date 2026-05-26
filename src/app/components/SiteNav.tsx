import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { BiancaHeaderLogo } from "../../imports/MacBookPro141-2-335";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";
import { SITE_NAV_LINKS } from "./nav/navConfig";

type Props = {
  activeItem?: NavActiveItem;
};

function NavItem({
  id,
  label,
  to,
  activeItem,
  variant,
  onNavigate,
}: {
  id: NavActiveItem;
  label: string;
  to?: string;
  activeItem?: NavActiveItem;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const isActive = activeItem === id;
  const className = clsx(
    "font-editorial uppercase tracking-[0.12em] transition-colors",
    variant === "desktop"
      ? "px-4 py-2 text-[15px] lg:px-5"
      : "block w-full px-1 py-4 text-[17px]",
    isActive
      ? "font-bold text-white"
      : "text-[#f9f9f9] hover:text-white",
    !to && "cursor-default opacity-90",
  );

  if (!to) {
    return <span className={className}>{label}</span>;
  }

  return (
    <Link to={to} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

export default function SiteNav({ activeItem }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <NavActiveProvider value={activeItem}>
      <header className="sticky top-0 z-50 w-full bg-[#1d3c34]">
        <div className="mx-auto flex max-w-[1512px] items-center justify-between gap-4 px-4 pb-3 pt-5 sm:px-6 lg:h-[88px] lg:px-10 lg:py-0">
          <Link
            to="/"
            className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#dccb7b]"
            aria-label="Bianca Diamonds — home"
            onClick={closeMenu}
          >
            <BiancaHeaderLogo />
          </Link>

          <nav
            className="relative hidden items-center lg:flex"
            aria-label="Main navigation"
          >
            <div
              className="pointer-events-none absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-[#766d42]/80"
              aria-hidden
            />
            <ul className="relative flex items-center">
              {SITE_NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <NavItem
                    id={link.id}
                    label={link.label}
                    to={link.to}
                    activeItem={activeItem}
                    variant="desktop"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-[#f9f9f9]/20 text-[#f9f9f9] transition-colors hover:border-[#f9f9f9]/50 hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-nav-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {menuOpen ? (
          <nav
            id="site-nav-mobile-menu"
            className="border-t border-[#766d42]/40 bg-[#1d3c34] px-4 pb-8 pt-2 lg:hidden"
            aria-label="Main navigation"
          >
            <ul>
              {SITE_NAV_LINKS.map((link, index) => (
                <li
                  key={link.id}
                  className={clsx(
                    index > 0 && "border-t border-[#766d42]/25",
                  )}
                >
                  <NavItem
                    id={link.id}
                    label={link.label}
                    to={link.to}
                    activeItem={activeItem}
                    variant="mobile"
                    onNavigate={closeMenu}
                  />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </NavActiveProvider>
  );
}
