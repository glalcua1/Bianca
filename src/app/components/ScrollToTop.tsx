import { useEffect } from "react";
import { useLocation } from "react-router";

/** Scroll to top on route change; honour in-page hash targets when present. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const scrollPath = pathname.replace(
    /^(\/fine-jewellery\/[^/]+)\/[^/]+\/?$/,
    "$1",
  );

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [scrollPath, hash]);

  return null;
}
