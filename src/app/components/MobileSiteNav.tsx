import { useState } from "react";
import { Link } from "react-router";
import { BiancaForestNavLogo } from "./BiancaLogo";
import {
  NavActiveProvider,
  type NavActiveItem,
} from "../context/NavActiveContext";
import { SITE_NAV_ITEMS } from "../data/siteContact";

type Props = {
  activeItem?: NavActiveItem;
};

export default function MobileSiteNav({ activeItem }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <NavActiveProvider value={activeItem}>
      <header className="relative z-20 bg-[#1d3c34] px-4 pb-3 pt-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="relative block shrink-0"
            aria-label="Bianca Diamonds — home"
            onClick={() => setOpen(false)}
          >
            <BiancaForestNavLogo maxWidth={132} />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#dccb7b]/35 text-[#f9f9f9]"
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
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
          aria-hidden={!open}
        >
          <ul className="mt-4 space-y-1 border-t border-[#766d42]/40 pt-4">
            {SITE_NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={`block py-2.5 text-center font-editorial text-[15px] uppercase tracking-[0.12em] ${
                      isActive
                        ? "font-bold text-white"
                        : "text-[#f9f9f9] hover:text-white"
                    }`}
                    onClick={() => setOpen(false)}
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
}
