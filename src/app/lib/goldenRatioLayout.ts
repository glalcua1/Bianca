/** φ layout tokens for salon proportions (1.618 : 1) */
export { PHI } from "./goldenRatio";

import { PHI } from "./goldenRatio";

export const PHI_INV = 1 / PHI;

/** Image column : detail column = φ : 1 → image ≈ 61.8% */
export const SALON_IMAGE_COLUMN = "minmax(0, 1.618fr)";
export const SALON_DETAIL_COLUMN = "minmax(0, 1fr)";

/** Golden-ratio two-column grid for salon / bespoke showcases */
export const SALON_GOLDEN_GRID_COLUMNS = `${SALON_IMAGE_COLUMN} ${SALON_DETAIL_COLUMN}`;

/** Canonical atelier collection frame (portrait salon mat) */
export const ATELIER_FRAME_WIDTH = 443;
export const ATELIER_FRAME_HEIGHT = 508;
export const ATELIER_FRAME_ASPECT_RATIO = `${ATELIER_FRAME_WIDTH} / ${ATELIER_FRAME_HEIGHT}`;

/** Vertical golden section — price band ≈ 38.2% on tall detail panels */
export const SALON_PRICE_SECTION = `${PHI_INV * 100}%`;
