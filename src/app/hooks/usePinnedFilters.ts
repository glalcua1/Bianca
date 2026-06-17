import { useEffect, useState, type RefObject } from "react";

const SHOWCASE_ID = "showcase";
const VIEWPORT_EDGE_INSET = 48;

function readPinState(sentinel: HTMLElement, showcase: HTMLElement) {
  const sentinelTop = sentinel.getBoundingClientRect().top;
  const showcaseRect = showcase.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const scrolledPast = sentinelTop <= 0;
  const showcaseActive =
    showcaseRect.top < viewportHeight - VIEWPORT_EDGE_INSET &&
    showcaseRect.bottom > VIEWPORT_EDGE_INSET;

  return scrolledPast && showcaseActive;
}

/**
 * Pins category filters below the compact site nav while the showcase is on screen.
 */
export function usePinnedFilters(
  sentinelRef: RefObject<HTMLElement | null>,
  barRef: RefObject<HTMLElement | null>,
) {
  const [pinned, setPinned] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    const showcase = document.getElementById(SHOWCASE_ID);
    if (!sentinel || !showcase) return;

    const update = () => {
      setPinned(readPinState(sentinel, showcase));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sentinelRef]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const measure = () => setBarHeight(bar.offsetHeight);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [barRef, pinned]);

  return { pinned, barHeight };
}
