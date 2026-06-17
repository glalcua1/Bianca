import { Capacitor } from "@capacitor/core";
import { PrivacyScreen } from "@capgo/capacitor-privacy-screen";

/** Blocks physical-button screenshots in the native iOS/Android app shell. */
export async function enableNativeScreenshotProtection() {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await PrivacyScreen.enable();
  } catch {
    // Native plugin unavailable in web builds.
  }
}

export function isNativeAppShell() {
  return Capacitor.isNativePlatform();
}
