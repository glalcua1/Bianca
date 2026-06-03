import { useEffect, useState } from "react";

const SHOWCASE_ID = "showcase";

/**
 * True while the atelier showcase section overlaps the viewport.
 * Scroll-based (not IntersectionObserver) so it works on mobile where
 * overflow-x on html/body can break observer + fixed positioning.
 */
export function useShowcaseInView() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const showcase = document.getElementById(SHOWCASE_ID);
    if (!showcase) return;

    const update = () => {
      const rect = showcase.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const edgeInset = 48;
      setInView(
        rect.top < viewportHeight - edgeInset && rect.bottom > edgeInset,
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return inView;
}
