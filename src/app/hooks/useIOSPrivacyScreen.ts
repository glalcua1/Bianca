import { useEffect } from "react";
import { DESKTOP_MEDIA_QUERY } from "./useMediaMinWidth";

/**
 * Desktop-only privacy layer for iOS Safari. Mobile viewports are unrestricted
 * so users can scroll, zoom, and save images normally.
 */
export function useIOSPrivacyScreen(onCaptureAttempt?: () => void) {
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let teardown: (() => void) | undefined;

    const activate = () => {
      document.documentElement.classList.add("ios-privacy-active");

      let hideTimer: number | undefined;

      const showPrivacyOverlay = () => {
        document.documentElement.classList.add("ios-privacy-overlay-visible");
        onCaptureAttempt?.();
      };

      const hidePrivacyOverlay = () => {
        window.clearTimeout(hideTimer);
        hideTimer = window.setTimeout(() => {
          document.documentElement.classList.remove("ios-privacy-overlay-visible");
        }, 80);
      };

      const handleVisibility = () => {
        if (document.visibilityState === "hidden") {
          showPrivacyOverlay();
          return;
        }
        hidePrivacyOverlay();
      };

      const handlePageHide = () => {
        showPrivacyOverlay();
      };

      const handleBlur = () => {
        showPrivacyOverlay();
      };

      const handleFocus = () => {
        hidePrivacyOverlay();
      };

      document.addEventListener("visibilitychange", handleVisibility);
      window.addEventListener("pagehide", handlePageHide);
      window.addEventListener("blur", handleBlur);
      window.addEventListener("focus", handleFocus);

      return () => {
        window.clearTimeout(hideTimer);
        document.documentElement.classList.remove("ios-privacy-active");
        document.documentElement.classList.remove("ios-privacy-overlay-visible");
        document.removeEventListener("visibilitychange", handleVisibility);
        window.removeEventListener("pagehide", handlePageHide);
        window.removeEventListener("blur", handleBlur);
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
  }, [onCaptureAttempt]);
}
