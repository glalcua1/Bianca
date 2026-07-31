/** Prefer native app on phones; WhatsApp Web on desktop browsers. */
export function isMobileWhatsAppClient(): boolean {
  if (typeof navigator === "undefined") return false;
  if (typeof window !== "undefined") {
    try {
      if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
        return true;
      }
    } catch {
      /* ignore */
    }
  }
  return /Android|iPhone|iPod|Windows Phone|Mobile/i.test(navigator.userAgent);
}

/** Digits only (no +) for wa.me / web.whatsapp.com send URLs. */
export function buildWhatsAppChatUrl(
  numberDigits: string,
  options?: { text?: string; forceMobile?: boolean },
): string {
  const phone = numberDigits.replace(/\D/g, "");
  const text = options?.text?.trim();
  const mobile =
    options?.forceMobile ??
    (typeof window === "undefined" ? true : isMobileWhatsAppClient());

  if (mobile) {
    const base = `https://wa.me/${phone}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  }

  const params = new URLSearchParams({ phone });
  if (text) params.set("text", text);
  return `https://web.whatsapp.com/send?${params.toString()}`;
}
