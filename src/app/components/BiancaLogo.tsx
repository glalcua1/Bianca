import Group6Logo from "../../imports/Group6";
import { HeaderNavLogo } from "../../imports/MacBookPro141-2-335";
import ScaledArtboard from "./ScaledArtboard";

/** The House wordmark on cream / white cards (Figma Group6). */
const HOUSE_LOGO_WIDTH = 304;
const HOUSE_LOGO_HEIGHT = 245;

/** Gold wordmark on forest header chrome (Figma Frame3). */
const FOREST_NAV_LOGO_WIDTH = 176.533;
const FOREST_NAV_LOGO_HEIGHT = 142.347;

type HouseProps = {
  maxWidth?: number;
  className?: string;
};

export function BiancaHouseLogo({ maxWidth = 200, className }: HouseProps) {
  return (
    <ScaledArtboard
      designWidth={HOUSE_LOGO_WIDTH}
      designHeight={HOUSE_LOGO_HEIGHT}
      maxWidth={maxWidth}
      className={className}
    >
      <Group6Logo />
    </ScaledArtboard>
  );
}

type ForestProps = {
  maxWidth?: number;
  className?: string;
};

export function BiancaForestNavLogo({ maxWidth = 132, className }: ForestProps) {
  return (
    <ScaledArtboard
      designWidth={FOREST_NAV_LOGO_WIDTH}
      designHeight={FOREST_NAV_LOGO_HEIGHT}
      maxWidth={maxWidth}
      className={className}
    >
      <HeaderNavLogo />
    </ScaledArtboard>
  );
}
