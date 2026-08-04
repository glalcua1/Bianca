import crypto from "crypto";
import { getJppServerConfig, hasAdminCredentials } from "./jpp-config.js";

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function timingSafeEqualString(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) {
    crypto.timingSafeEqual(left, left);
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function signPayload(payload, secret) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token, secret) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("base64url");

  if (!timingSafeEqualString(sig, expected)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload?.exp || Date.now() > payload.exp) return null;
    if (payload.role !== "jpp_admin") return null;
    return payload;
  } catch {
    return null;
  }
}

export function authenticateAdmin(email, password) {
  const config = getJppServerConfig();
  if (!hasAdminCredentials(config)) {
    return {
      ok: false,
      status: 503,
      error:
        "Admin credentials are not configured. Set JPP_ADMIN_EMAIL and JPP_ADMIN_PASSWORD.",
    };
  }

  const emailOk = timingSafeEqualString(
    String(email || "").trim().toLowerCase(),
    config.adminEmail.toLowerCase(),
  );
  const passwordOk = timingSafeEqualString(
    String(password || ""),
    config.adminPassword,
  );

  if (!emailOk || !passwordOk) {
    return { ok: false, status: 401, error: "Invalid email or password." };
  }

  const token = signPayload(
    {
      role: "jpp_admin",
      email: config.adminEmail.toLowerCase(),
      exp: Date.now() + SESSION_TTL_MS,
    },
    config.sessionSecret,
  );

  return {
    ok: true,
    status: 200,
    token,
    email: config.adminEmail.toLowerCase(),
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
}

export function getBearerToken(req) {
  const header =
    req.headers?.authorization ||
    req.headers?.Authorization ||
    "";
  if (typeof header === "string" && header.startsWith("Bearer ")) {
    return header.slice(7).trim();
  }
  return "";
}

export function requireAdmin(req) {
  const config = getJppServerConfig();
  if (!hasAdminCredentials(config)) {
    return {
      ok: false,
      status: 503,
      error:
        "Admin credentials are not configured. Set JPP_ADMIN_EMAIL and JPP_ADMIN_PASSWORD.",
    };
  }

  const payload = verifyToken(getBearerToken(req), config.sessionSecret);
  if (!payload) {
    return { ok: false, status: 401, error: "Authentication required." };
  }

  return { ok: true, email: payload.email };
}
