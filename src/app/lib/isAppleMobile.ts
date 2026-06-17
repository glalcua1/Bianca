/** iPhone, iPad, and iPod — mobile Safari and in-app browsers. */
export function isAppleMobile() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent;
  const isClassicIOS = /iPad|iPhone|iPod/.test(ua);
  const isIpadOs =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  return isClassicIOS || isIpadOs;
}
