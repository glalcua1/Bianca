import { useEffect } from "react";
import { isAppleMobile } from "../lib/isAppleMobile";
import { DESKTOP_MEDIA_QUERY } from "./useMediaMinWidth";

/**
 * iPad / large-viewport iOS only: blank the page in the app switcher so
 * multitasking previews do not reveal jewellery photography.
 *
 * Must not run on desktop browsers — former `window` blur/focus handlers fired
 * for DevTools, alt-tab, and clicking outside the document, which looked like
 * a permanent blank page until refresh.
 */
export function useIOSPrivacyScreen() {
  useEffect(() => {
    if (!isAppleMobile()) return;

    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let teardown: (() => void) | undefined;

    const activate = () => {
      document.documentElement.classList.add("ios-privacy-active");

      let hideTimer: number | undefined;

      const showPrivacyOverlay = () => {
        window.clearTimeout(hideTimer);
        document.documentElement.classList.add("ios-privacy-overlay-visible");
      };

      const hidePrivacyOverlay = (immediate = false) => {
        window.clearTimeout(hideTimer);
        if (immediate) {
          document.documentElement.classList.remove(
            "ios-privacy-overlay-visible",
          );
          return;
        }
        // Brief delay avoids flicker when iOS briefly toggles visibility.
        hideTimer = window.setTimeout(() => {
          document.documentElement.classList.remove(
            "ios-privacy-overlay-visible",
          );
        }, 80);
      };

      const syncToVisibility = () => {
        if (document.visibilityState === "hidden") {
          showPrivacyOverlay();
        } else {
          // Clear immediately when the tab is visible again — never leave a
          // stuck cream blank screen after app-switcher / in-app browsers.
          hidePrivacyOverlay(true);
        }
      };

      const handlePageHide = () => {
        showPrivacyOverlay();
      };

      const handlePageShow = () => {
        hidePrivacyOverlay(true);
      };

      const handleFocus = () => {
        hidePrivacyOverlay(true);
      };

      document.addEventListener("visibilitychange", syncToVisibility);
      window.addEventListener("pagehide", handlePageHide);
      window.addEventListener("pageshow", handlePageShow);
      window.addEventListener("focus", handleFocus);

      // Match current state (e.g. tab already backgrounded when effect runs).
      syncToVisibility();

      return () => {
        window.clearTimeout(hideTimer);
        document.documentElement.classList.remove("ios-privacy-active");
        document.documentElement.classList.remove(
          "ios-privacy-overlay-visible",
        );
        document.removeEventListener("visibilitychange", syncToVisibility);
        window.removeEventListener("pagehide", handlePageHide);
        window.removeEventListener("pageshow", handlePageShow);
        window.removeEventListener("focus", handleFocus);
      };
    };

    const sync = () => {
      teardown?.();
      teardown = undefined;
      document.documentElement.classList.remove("ios-privacy-active");
      document.documentElement.classList.remove("ios-privacy-overlay-visible");

      if (mq.matches) {
        teardown = activate();
      }
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      teardown?.();
      document.documentElement.classList.remove("ios-privacy-active");
      document.documentElement.classList.remove("ios-privacy-overlay-visible");
    };
  }, []);
}
