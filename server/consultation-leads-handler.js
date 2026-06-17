import { insertConsultationLead } from "./db.js";

const PHONE_PATTERN = /^[\d\s+\-().]{7,20}$/;

/**
 * @param {unknown} body
 */
function validateLead(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const { clientName, phone, city, sourcePage } = body;
  const name = typeof clientName === "string" ? clientName.trim() : "";
  const phoneValue = typeof phone === "string" ? phone.trim() : "";
  const cityValue = typeof city === "string" ? city.trim() : "";

  if (name.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }

  if (!PHONE_PATTERN.test(phoneValue)) {
    return { ok: false, error: "Please enter a valid phone number." };
  }

  if (cityValue.length < 2) {
    return { ok: false, error: "Please enter your city." };
  }

  return {
    ok: true,
    data: {
      clientName: name,
      phone: phoneValue,
      city: cityValue,
      sourcePage:
        typeof sourcePage === "string" && sourcePage.trim()
          ? sourcePage.trim()
          : "cannes-2026",
    },
  };
}

/**
 * @param {unknown} body
 */
export function handleConsultationLeadRequest(body) {
  const validation = validateLead(body);
  if (!validation.ok) {
    return { status: 400, body: { ok: false, error: validation.error } };
  }

  try {
    const id = insertConsultationLead(validation.data);
    return { status: 201, body: { ok: true, id } };
  } catch {
    return {
      status: 500,
      body: { ok: false, error: "Unable to save your request. Please try again." },
    };
  }
}
