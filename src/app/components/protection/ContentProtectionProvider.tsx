import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useContentProtection } from "../../hooks/useContentProtection";
import { useIOSPrivacyScreen } from "../../hooks/useIOSPrivacyScreen";
import { enableNativeScreenshotProtection } from "../../lib/nativeScreenshotProtection";

type Props = {
  children: ReactNode;
};

export default function ContentProtectionProvider({ children }: Props) {
  const [shieldVisible, setShieldVisible] = useState(false);

  const showShield = useCallback(() => {
    setShieldVisible(true);
    window.setTimeout(() => setShieldVisible(false), 1200);
  }, []);

  useContentProtection({ onCaptureAttempt: showShield });
  useIOSPrivacyScreen(showShield);

  useEffect(() => {
    void enableNativeScreenshotProtection();
  }, []);

  return (
    <>
      {children}
      <div
        aria-hidden
        className={`content-protection-shield ${shieldVisible ? "content-protection-shield--visible" : ""}`}
      />
      <div aria-hidden className="ios-privacy-overlay" />
    </>
  );
}
