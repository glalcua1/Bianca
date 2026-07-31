/** Blocks physical-button screenshots in the native iOS/Android app shell. */
export async function enableNativeScreenshotProtection() {
  // Keep Capacitor off the web critical path — load only in a native shell.
  const capacitor = (
    window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }
  ).Capacitor;
  if (!capacitor?.isNativePlatform?.()) return;

  try {
    const [{ Capacitor }, { PrivacyScreen }] = await Promise.all([
      import("@capacitor/core"),
      import("@capgo/capacitor-privacy-screen"),
    ]);
    if (!Capacitor.isNativePlatform()) return;
    await PrivacyScreen.enable();
  } catch {
    // Native plugin unavailable in web builds.
  }
}

export async function isNativeAppShell() {
  try {
    const { Capacitor } = await import("@capacitor/core");
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}
