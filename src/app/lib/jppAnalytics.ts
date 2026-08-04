import { track } from "@vercel/analytics";

export type JppAnalyticsEvent =
  | "jpp_page_view"
  | "jpp_registration_started"
  | "jpp_registration_completed"
  | "jpp_registration_duplicate"
  | "jpp_call_bianca_clicked"
  | "jpp_whatsapp_clicked"
  | "jpp_bank_account_copied"
  | "jpp_ifsc_copied";

export function trackJppEvent(
  event: JppAnalyticsEvent,
  data?: Record<string, string | number | boolean>,
) {
  try {
    track(event, data);
  } catch {
    /* analytics must never break the experience */
  }
}
