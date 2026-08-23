import { HeaderNavLogo } from "./HeaderNavLogo";
import MainSiteNavLinks from "../app/components/MainSiteNavLinks";
import SiteNavSearch from "../app/components/SiteNavSearch";

/** Design-px height of the homepage header chrome (logo + nav band). */
export const HOMEPAGE_HEADER_DESIGN_H = 130;

function NavDividerBand() {
  return (
    <div
      className="absolute content-stretch flex flex-col items-start left-[238px] max-h-[80px] overflow-clip top-[76px] w-[1131px]"
      data-name="Container"
    >
      <div className="h-[155.7px] shrink-0 w-full" data-name="Container" />
      <div
        className="-translate-y-1/2 absolute bg-[#766d42] h-px left-[-10px] top-[calc(50%-0.03px)] w-[940px]"
        data-name="Horizontal Divider"
      />
      <div
        className="-translate-y-1/2 absolute bg-[#766d42] h-px right-[-10px] top-[calc(50%-0.03px)] w-[940px]"
        data-name="Horizontal Divider"
      />
    </div>
  );
}

function NavList() {
  return (
    <nav
      aria-label="Main navigation"
      className="absolute left-[180px] right-[140px] top-[76px] flex h-[23px] items-start justify-center"
      data-name="Nav → List"
    >
      <MainSiteNavLinks compact />
    </nav>
  );
}

/** Logo + nav chrome from the homepage Figma artboard (1512px design width). */
export function HomepageHeaderChrome({
  transparent = false,
}: {
  transparent?: boolean;
}) {
  return (
    <div
      className={`relative transition-colors duration-500 ease-out ${
        transparent
          ? "bg-transparent group-hover/nav:bg-[#1d3c34] group-focus-within/nav:bg-[#1d3c34]"
          : "bg-[#1d3c34]"
      }`}
      style={{ width: 1512, height: HOMEPAGE_HEADER_DESIGN_H }}
    >
      <div
        className="absolute content-stretch flex items-center left-[39px] top-[38.29px]"
        data-name="Frame"
      >
        <HeaderNavLogo />
      </div>
      <div className="absolute contents left-[238px] top-[76px]">
        <NavDividerBand />
        <NavList />
      </div>
      <div className="absolute right-[36px] top-[72px] z-10">
        <SiteNavSearch variant="desktop" />
      </div>
    </div>
  );
}
