import * as XLSX from "xlsx";
import { authenticateAdmin, requireAdmin } from "./jpp-auth.js";
import { getJppServerConfig } from "./jpp-config.js";
import {
  getJppCustomerById,
  getJppStats,
  getJppStorageMode,
  listJppCustomers,
  registerJppCustomer,
  updateJppCustomerStatus,
} from "./jpp-store.js";

const STATUSES = new Set([
  "registered",
  "activation_pending",
  "active",
  "completed",
]);

/**
 * Normalize Indian mobile numbers to 10 digits (or 12 with 91).
 * Stored form: 10-digit national number when possible.
 */
export function normalizeIndianMobile(raw) {
  if (typeof raw !== "string") return "";
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }
  return digits;
}

export function isValidIndianMobile(digits) {
  return /^[6-9]\d{9}$/.test(digits);
}

function validateRegistration(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() : "";
  const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
  const consent = Boolean(body.consent);
  const mobileNumber = normalizeIndianMobile(
    typeof body.mobileNumber === "string" ? body.mobileNumber : "",
  );

  if (fullName.length < 2) {
    return { ok: false, error: "Please enter your full name." };
  }
  if (fullName.length > 80) {
    return { ok: false, error: "Please enter a shorter name." };
  }
  if (!isValidIndianMobile(mobileNumber)) {
    return {
      ok: false,
      error: "Please enter a valid 10-digit Indian mobile number.",
    };
  }
  if (emailRaw) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw) || emailRaw.length > 120) {
      return { ok: false, error: "Please enter a valid email address." };
    }
  }
  if (!consent) {
    return {
      ok: false,
      error:
        "Please agree to be contacted by Bianca Diamonds regarding your Jewellery Purchase Plan.",
    };
  }

  return {
    ok: true,
    data: {
      fullName,
      mobileNumber,
      email: emailRaw || null,
      consent: true,
    },
  };
}

function publicCustomerPayload(customer) {
  return {
    fullName: customer.full_name,
    mobileNumber: customer.mobile_number,
    email: customer.email,
    jppNumber: customer.jpp_number,
    status: customer.status,
    createdAt: customer.created_at,
  };
}

function paymentDetailsPayload() {
  const { bank } = getJppServerConfig();
  return {
    bankName: bank.name,
    accountNumber: bank.accountNumber,
    ifsc: bank.ifsc || null,
    ifscConfigured: Boolean(bank.ifsc),
    accountType: bank.accountType,
  };
}

export async function handleJppRegister(body) {
  const validation = validateRegistration(body);
  if (!validation.ok) {
    return { status: 400, body: { ok: false, error: validation.error } };
  }

  try {
    const result = await registerJppCustomer(validation.data);
    if (result.duplicate) {
      return {
        status: 409,
        body: {
          ok: false,
          duplicate: true,
          error:
            "It looks like you already have a Bianca JPP account.",
          customer: publicCustomerPayload(result.customer),
          message:
            "Please contact Bianca Diamonds for assistance with your existing plan.",
        },
      };
    }

    return {
      status: 201,
      body: {
        ok: true,
        duplicate: false,
        customer: publicCustomerPayload(result.customer),
        payment: paymentDetailsPayload(),
        storage: getJppStorageMode(),
      },
    };
  } catch (error) {
    console.error("[jpp] register failed", error);
    return {
      status: 500,
      body: {
        ok: false,
        error: "Unable to complete registration. Please try again.",
      },
    };
  }
}

export function handleJppAdminLogin(body) {
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const result = authenticateAdmin(email, password);
  if (!result.ok) {
    return {
      status: result.status,
      body: { ok: false, error: result.error },
    };
  }
  return {
    status: 200,
    body: {
      ok: true,
      token: result.token,
      email: result.email,
      expiresAt: result.expiresAt,
    },
  };
}

export function handleJppAdminSession(req) {
  const auth = requireAdmin(req);
  if (!auth.ok) {
    return { status: auth.status, body: { ok: false, error: auth.error } };
  }
  return {
    status: 200,
    body: {
      ok: true,
      email: auth.email,
      storage: getJppStorageMode(),
    },
  };
}

export async function handleJppAdminCustomers(req, query = {}) {
  const auth = requireAdmin(req);
  if (!auth.ok) {
    return { status: auth.status, body: { ok: false, error: auth.error } };
  }

  try {
    const search = typeof query.search === "string" ? query.search.trim() : "";
    const status = typeof query.status === "string" ? query.status.trim() : "";
    const sort = query.sort === "asc" ? "asc" : "desc";

    if (status && !STATUSES.has(status)) {
      return { status: 400, body: { ok: false, error: "Invalid status filter." } };
    }

    const [customers, stats] = await Promise.all([
      listJppCustomers({ search, status, sort }),
      getJppStats(),
    ]);

    return {
      status: 200,
      body: { ok: true, customers, stats, storage: getJppStorageMode() },
    };
  } catch (error) {
    console.error("[jpp] list customers failed", error);
    return {
      status: 500,
      body: { ok: false, error: "Unable to load customers." },
    };
  }
}

export async function handleJppAdminUpdateCustomer(req, body) {
  const auth = requireAdmin(req);
  if (!auth.ok) {
    return { status: auth.status, body: { ok: false, error: auth.error } };
  }

  const id = typeof body?.id === "string" ? body.id.trim() : "";
  const status = typeof body?.status === "string" ? body.status.trim() : "";

  if (!id) {
    return { status: 400, body: { ok: false, error: "Customer id is required." } };
  }
  if (!STATUSES.has(status)) {
    return { status: 400, body: { ok: false, error: "Invalid status." } };
  }

  try {
    const existing = await getJppCustomerById(id);
    if (!existing) {
      return { status: 404, body: { ok: false, error: "Customer not found." } };
    }

    const customer = await updateJppCustomerStatus(id, status);
    return { status: 200, body: { ok: true, customer } };
  } catch (error) {
    console.error("[jpp] update customer failed", error);
    return {
      status: 500,
      body: { ok: false, error: "Unable to update customer." },
    };
  }
}

export async function handleJppAdminExport(req, query = {}) {
  const auth = requireAdmin(req);
  if (!auth.ok) {
    return { status: auth.status, body: { ok: false, error: auth.error } };
  }

  try {
    const search = typeof query.search === "string" ? query.search.trim() : "";
    const status = typeof query.status === "string" ? query.status.trim() : "";
    const sort = query.sort === "asc" ? "asc" : "desc";
    const customers = await listJppCustomers({ search, status, sort });

    const rows = customers.map((c) => ({
      "Customer Name": c.full_name,
      "Mobile Number": c.mobile_number,
      Email: c.email || "",
      "Bianca JPP Number": c.jpp_number,
      Status: c.status,
      "Registration Date": c.created_at,
      "Activation Date": c.activated_at || "",
    }));

    const sheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, "Customers");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    return {
      status: 200,
      filename: "Bianca_JPP_Customers.xlsx",
      contentType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      buffer,
    };
  } catch (error) {
    console.error("[jpp] export failed", error);
    return {
      status: 500,
      body: { ok: false, error: "Unable to export customers." },
    };
  }
}
