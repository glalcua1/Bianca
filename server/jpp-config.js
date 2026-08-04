/**
 * Server-side Bianca JPP configuration.
 * Never import this from the browser bundle.
 */

function env(name, fallback = "") {
  const value = process.env[name];
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

export function getJppServerConfig() {
  const phone =
    env("BIANCA_PHONE_NUMBER") ||
    env("VITE_BIANCA_PHONE_NUMBER") ||
    "+918130495257";

  const whatsapp =
    env("BIANCA_WHATSAPP_NUMBER") ||
    env("VITE_BIANCA_WHATSAPP_NUMBER") ||
    "918800995921";

  return {
    phoneDisplay: phone.startsWith("+") ? phone : `+${phone.replace(/\D/g, "")}`,
    phoneTel: `tel:+${phone.replace(/\D/g, "")}`,
    whatsappDigits: whatsapp.replace(/\D/g, ""),
    bank: {
      name: env("BIANCA_JPP_BANK_NAME", "HDFC Bank"),
      accountNumber: env("BIANCA_JPP_ACCOUNT_NUMBER", "5278800615257"),
      ifsc: env("BIANCA_JPP_IFSC", ""),
      accountType: env("BIANCA_JPP_ACCOUNT_TYPE", "Current"),
    },
    adminEmail: env("JPP_ADMIN_EMAIL"),
    adminPassword: env("JPP_ADMIN_PASSWORD"),
    sessionSecret:
      env("JPP_ADMIN_SESSION_SECRET") ||
      env("JPP_ADMIN_PASSWORD") ||
      "dev-only-jpp-session-secret",
    supabaseUrl: env("SUPABASE_URL") || env("VITE_SUPABASE_URL"),
    supabaseServiceRoleKey: env("SUPABASE_SERVICE_ROLE_KEY"),
    jppNumberPrefix: env("BIANCA_JPP_NUMBER_PREFIX", "BIANCA-JPP"),
  };
}

export function hasSupabaseConfig(config = getJppServerConfig()) {
  return Boolean(config.supabaseUrl && config.supabaseServiceRoleKey);
}

export function hasAdminCredentials(config = getJppServerConfig()) {
  return Boolean(config.adminEmail && config.adminPassword);
}
