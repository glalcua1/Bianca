/** φ layout tokens for salon proportions (1.618 : 1) */
export const PHI = (1 + Math.sqrt(5)) / 2;
export const PHI_INV = 1 / PHI;

/** Image column : detail column = φ : 1 → image ≈ 61.8% */
export const SALON_IMAGE_COLUMN = "minmax(0, 1.618fr)";
export const SALON_DETAIL_COLUMN = "minmax(0, 1fr)";

/** Vertical golden section — price band ≈ 38.2% on tall detail panels */
export const SALON_PRICE_SECTION = `${PHI_INV * 100}%`;
