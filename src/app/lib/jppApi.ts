import type { JppPaymentDetails, JppPublicCustomer } from "../data/jppConfig";

const ADMIN_TOKEN_KEY = "bianca_jpp_admin_token";

export type JppRegisterResponse =
  | {
      ok: true;
      duplicate: false;
      customer: JppPublicCustomer;
      payment: JppPaymentDetails;
    }
  | {
      ok: false;
      duplicate?: boolean;
      error: string;
      customer?: JppPublicCustomer;
      message?: string;
    };

export type JppAdminCustomer = {
  id: string;
  full_name: string;
  mobile_number: string;
  email: string | null;
  jpp_number: string;
  status: string;
  consent: boolean;
  created_at: string;
  updated_at: string;
  activated_at: string | null;
};

export type JppAdminStats = {
  totalRegistered: number;
  registrationsToday: number;
  registrationsThisMonth: number;
};

export function getAdminToken(): string {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";
  } catch {
    return "";
  }
}

export function setAdminToken(token: string) {
  try {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

async function parseJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return { ok: false, error: "Unexpected server response." };
  }
}

export async function registerJppCustomer(payload: {
  fullName: string;
  mobileNumber: string;
  email?: string;
  consent: boolean;
}): Promise<JppRegisterResponse> {
  const res = await fetch("/api/jpp/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJson(res);
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch("/api/jpp/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    token?: string;
    email?: string;
    error?: string;
  }>;
}

export async function adminSession() {
  const token = getAdminToken();
  if (!token) return { ok: false as const, error: "Authentication required." };
  const res = await fetch("/api/jpp/admin/session", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    email?: string;
    storage?: string;
    error?: string;
  }>;
}

export async function adminFetchCustomers(params: {
  search?: string;
  status?: string;
  sort?: "asc" | "desc";
}) {
  const token = getAdminToken();
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.sort) qs.set("sort", params.sort);

  const res = await fetch(`/api/jpp/admin/customers?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    customers?: JppAdminCustomer[];
    stats?: JppAdminStats;
    error?: string;
  }>;
}

export async function adminUpdateCustomerStatus(id: string, status: string) {
  const token = getAdminToken();
  const res = await fetch("/api/jpp/admin/customers", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, status }),
  });
  return parseJson(res) as Promise<{
    ok: boolean;
    customer?: JppAdminCustomer;
    error?: string;
  }>;
}

export async function adminExportExcel(params: {
  search?: string;
  status?: string;
  sort?: "asc" | "desc";
}) {
  const token = getAdminToken();
  const qs = new URLSearchParams();
  if (params.search) qs.set("search", params.search);
  if (params.status) qs.set("status", params.status);
  if (params.sort) qs.set("sort", params.sort);

  const res = await fetch(`/api/jpp/admin/export?${qs.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const data = await parseJson(res);
    throw new Error(data.error || "Export failed.");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Bianca_JPP_Customers.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
