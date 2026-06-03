import { useEffect, useState, type RefObject } from "react";
import { useMediaMinWidth } from "./useMediaMinWidth";

const SHOWCASE_ID = "showcase";
const VIEWPORT_EDGE_INSET = 48;

function readPinState(sentinel: HTMLElement, showcase: HTMLElement, mobileOnly: boolean) {
  const sentinelTop = sentinel.getBoundingClientRect().top;
  const showcaseRect = showcase.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const scrolledPast = sentinelTop <= 0;
  const showcaseActive =
    showcaseRect.top < viewportHeight - VIEWPORT_EDGE_INSET &&
    showcaseRect.bottom > VIEWPORT_EDGE_INSET;

  if (mobileOnly) {
    return scrolledPast && showcaseActive;
  }
  return scrolledPast;
}

/**
 * Pins category filters once the user scrolls past the sentinel.
 * On mobile, pinning only applies while the showcase section is on screen
 * (avoids a fixed bar over the hero when the section is still below the fold).
 */
export function usePinnedFilters(
  sentinelRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
) {
  const isDesktop = useMediaMinWidth();
  const [pinned, setPinned] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const showcase = document.getElementById(SHOWCASE_ID);
    if (!sentinel || !showcase) return;

    const update = () => {
      setPinned(readPinState(sentinel, showcase, !isDesktop));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sentinelRef, isDesktop]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const measure = () => setBarHeight(bar.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [barRef, pinned]);

  return { pinned, barHeight, isDesktop };
}
