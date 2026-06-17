import { useEffect, useState } from "react";

/** Scroll distance (px) over which the header morphs from full → compact. */
const PROGRESS_RANGE = 112;
/** Scroll past this to enter compact interaction mode (hysteresis). */
const COMPACT_ENTER = 64;
/** Scroll above this to leave compact interaction mode (hysteresis). */
const COMPACT_EXIT = 20;

export type ScrollCompactNavState = {
  /** 0 at page top, 1 when fully compact. */
  progress: number;
  /** Hysteresis-gated compact mode — drives pointer events and reduced-motion snap. */
  compact: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function readScrollState(lastCompact: boolean): ScrollCompactNavState {
  const y = window.scrollY;
  const progress = clamp(y / PROGRESS_RANGE, 0, 1);

  let compact = lastCompact;
  if (!lastCompact && y > COMPACT_ENTER) compact = true;
  else if (lastCompact && y < COMPACT_EXIT) compact = false;

  return { progress, compact };
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduce;
}

/**
 * Scroll-driven header compact state with rAF throttling and enter/exit hysteresis.
 */
export function useScrollCompactNav(): ScrollCompactNavState {
  const [state, setState] = useState<ScrollCompactNavState>({
    progress: 0,
    compact: false,
  });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    let raf = 0;
    let lastCompact = false;

    const update = () => {
      raf = 0;
      const next = readScrollState(lastCompact);
      lastCompact = next.compact;
      setState((prev) =>
        prev.progress === next.progress && prev.compact === next.compact
          ? prev
          : next,
      );
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  if (reduceMotion) {
    return {
      progress: state.compact ? 1 : 0,
      compact: state.compact,
    };
  }

  return state;
}

/** Publishes nav height for sibling sticky bars (atelier filters, mega menu). */
export function setSiteNavOffsetPx(px: number) {
  document.documentElement.style.setProperty(
    "--site-nav-offset",
    `${Math.round(px)}px`,
  );
}

export function clearSiteNavOffset() {
  document.documentElement.style.setProperty("--site-nav-offset", "0px");
}

/** Linear interpolation helper for header height / offset. */
export function lerpNavOffset(
  fullPx: number,
  compactPx: number,
  progress: number,
): number {
  return fullPx + (compactPx - fullPx) * clamp(progress, 0, 1);
}
