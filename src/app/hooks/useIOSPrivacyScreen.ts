import { useEffect } from "react";
import { isAppleMobile } from "../lib/isAppleMobile";

/**
 * iOS-specific privacy layer. Mobile Safari cannot block OS screenshots while
 * the page is visible, but we can hide/blur content when the app backgrounds
 * and keep a persistent watermark over protected media.
 */
export function useIOSPrivacyScreen(onCaptureAttempt?: () => void) {
  useEffect(() => {
    if (!isAppleMobile()) return;

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
  }, [onCaptureAttempt]);
}
