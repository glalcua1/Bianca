import { useEffect, useState } from "react";

/** Tailwind `md` — desktop artboard scaling starts here. */
export const MD_BREAKPOINT = 768;

export const DESKTOP_MEDIA_QUERY = `(min-width: ${MD_BREAKPOINT}px)`;

export function isDesktopViewport() {
  if (typeof window === "undefined") return true;
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export function useMediaMinWidth(minWidth: number = MD_BREAKPOINT) {
  const query = `(min-width: ${minWidth}px)`;

  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
