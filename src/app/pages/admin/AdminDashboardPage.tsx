import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BiancaForestNavLogo } from "../../components/BiancaLogo";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  adminExportExcel,
  adminFetchCustomers,
  adminSession,
  adminUpdateCustomerStatus,
  clearAdminToken,
  type JppAdminCustomer,
  type JppAdminStats,
} from "../../lib/jppApi";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "activation_pending", label: "Activation Pending" },
  { value: "registered", label: "Registered" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
] as const;

function formatStatus(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customers, setCustomers] = useState<JppAdminCustomer[]>([]);
  const [stats, setStats] = useState<JppAdminStats | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [selected, setSelected] = useState<JppAdminCustomer | null>(null);
  const [exporting, setExporting] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  usePageMeta(
    "Bianca JPP Admin Dashboard | Bianca Diamonds",
    "Manage Bianca Jewellery Purchase Plan customer registrations.",
  );

  const load = useCallback(async () => {
    setError("");
    const result = await adminFetchCustomers({ search, status, sort });
    if (!result.ok) {
      if (result.error?.toLowerCase().includes("auth")) {
        clearAdminToken();
        navigate("/admin/login", { replace: true });
        return;
      }
      setError(result.error || "Unable to load customers.");
      return;
    }
    setCustomers(result.customers || []);
    setStats(result.stats || null);
  }, [navigate, search, sort, status]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await adminSession();
      if (cancelled) return;
      if (!session.ok) {
        clearAdminToken();
        navigate("/admin/login", { replace: true });
        return;
      }
      setEmail(session.email || "");
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    if (loading) return;
    const handle = window.setTimeout(() => {
      void load();
    }, 250);
    return () => window.clearTimeout(handle);
  }, [search, status, sort, loading, load]);

  const kpis = useMemo(
    () => [
      {
        label: "Total Registered Customers",
        value: stats?.totalRegistered ?? 0,
      },
      {
        label: "Registrations Today",
        value: stats?.registrationsToday ?? 0,
      },
      {
        label: "Registrations This Month",
        value: stats?.registrationsThisMonth ?? 0,
      },
    ],
    [stats],
  );

  async function onStatusChange(id: string, nextStatus: string) {
    const result = await adminUpdateCustomerStatus(id, nextStatus);
    if (!result.ok || !result.customer) {
      setError(result.error || "Unable to update status.");
      return;
    }
    setCustomers((prev) =>
      prev.map((row) => (row.id === id ? result.customer! : row)),
    );
    setSelected((prev) =>
      prev?.id === id ? result.customer! : prev,
    );
  }

  async function onExport() {
    setExporting(true);
    setError("");
    try {
      await adminExportExcel({ search, status, sort });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setExporting(false);
    }
  }

  async function copyJpp(value: string, id: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(""), 1500);
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] text-[11px] uppercase tracking-[0.2em] text-[#1d3c34]/70">
        Loading dashboard…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-[#1d3c34]/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <BiancaForestNavLogo maxWidth={120} />
            <div>
              <h1 className="font-editorial text-2xl tracking-[0.05em] text-[#1d3c34]">
                Bianca JPP Admin Dashboard
              </h1>
              <p className="mt-1 text-[12px] text-on-cream-muted">{email}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void onExport()}
              disabled={exporting}
              className="border border-[#1d3c34] bg-[#1d3c34] px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#faf8f5] disabled:opacity-60"
            >
              {exporting ? "Exporting…" : "Export Excel"}
            </button>
            <button
              type="button"
              onClick={() => {
                clearAdminToken();
                navigate("/admin/login", { replace: true });
              }}
              className="border border-[#1d3c34]/30 px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] text-[#1d3c34]"
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="border border-[#1d3c34]/10 bg-white/40 px-5 py-6"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
                {kpi.label}
              </p>
              <p className="mt-3 font-editorial text-3xl tracking-[0.04em] text-[#1d3c34]">
                {kpi.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 flex flex-col gap-3 md:flex-row md:items-end">
          <label className="block flex-1">
            <span className="text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
              Search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, mobile, or JPP number"
              className="mt-2 w-full border border-[#1d3c34]/20 bg-white/60 px-4 py-2.5 text-[14px] text-[#1d3c34] outline-none focus:border-[#1d3c34]"
            />
          </label>
          <label className="block md:w-56">
            <span className="text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
              Status
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 w-full border border-[#1d3c34]/20 bg-white/60 px-4 py-2.5 text-[14px] text-[#1d3c34] outline-none focus:border-[#1d3c34]"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block md:w-48">
            <span className="text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
              Sort by date
            </span>
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value === "asc" ? "asc" : "desc")
              }
              className="mt-2 w-full border border-[#1d3c34]/20 bg-white/60 px-4 py-2.5 text-[14px] text-[#1d3c34] outline-none focus:border-[#1d3c34]"
            >
              <option value="desc">Newest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </label>
        </section>

        {error ? (
          <p className="mt-4 text-[13px] text-[#8a2f2f]" role="alert">
            {error}
          </p>
        ) : null}

        <section className="mt-6 overflow-x-auto border border-[#1d3c34]/10 bg-white/50">
          <table className="min-w-full text-left text-[13px]">
            <thead className="border-b border-[#1d3c34]/10 text-[11px] uppercase tracking-[0.12em] text-on-cream-muted">
              <tr>
                <th className="px-4 py-3 font-normal">Customer Name</th>
                <th className="px-4 py-3 font-normal">Mobile Number</th>
                <th className="px-4 py-3 font-normal">Bianca JPP</th>
                <th className="px-4 py-3 font-normal">Registration Date</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-on-cream-muted"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="cursor-pointer border-t border-[#1d3c34]/8 transition-colors hover:bg-[#f4f0e6]/70"
                    onClick={() => setSelected(customer)}
                  >
                    <td className="px-4 py-3 text-[#1d3c34]">
                      {customer.full_name}
                    </td>
                    <td className="px-4 py-3 text-[#1d3c34]">
                      {customer.mobile_number}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-left text-[#1d3c34] underline-offset-2 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          void copyJpp(customer.jpp_number, customer.id);
                        }}
                      >
                        {copiedId === customer.id
                          ? "Copied"
                          : customer.jpp_number}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-on-cream-body">
                      {formatDate(customer.created_at)}
                    </td>
                    <td className="px-4 py-3 text-[#1d3c34]">
                      {formatStatus(customer.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {selected ? (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1d3c34]/45 p-4 md:items-center">
            <div
              role="dialog"
              aria-modal="true"
              className="w-full max-w-lg border border-[#1d3c34]/10 bg-[#faf8f5] p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
                    Customer details
                  </p>
                  <h2 className="mt-2 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
                    {selected.full_name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-[11px] uppercase tracking-[0.14em] text-on-cream-muted"
                >
                  Close
                </button>
              </div>

              <dl className="mt-6 space-y-3 text-[14px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-on-cream-muted">Mobile</dt>
                  <dd className="text-[#1d3c34]">{selected.mobile_number}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-cream-muted">Email</dt>
                  <dd className="text-[#1d3c34]">{selected.email || "—"}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-cream-muted">JPP Number</dt>
                  <dd className="text-[#1d3c34]">{selected.jpp_number}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-cream-muted">Registered</dt>
                  <dd className="text-[#1d3c34]">
                    {formatDate(selected.created_at)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-on-cream-muted">Activated</dt>
                  <dd className="text-[#1d3c34]">
                    {formatDate(selected.activated_at)}
                  </dd>
                </div>
              </dl>

              <label className="mt-6 block">
                <span className="text-[11px] uppercase tracking-[0.14em] text-on-cream-muted">
                  Activation status
                </span>
                <select
                  value={selected.status}
                  onChange={(e) =>
                    void onStatusChange(selected.id, e.target.value)
                  }
                  className="mt-2 w-full border border-[#1d3c34]/20 bg-white px-4 py-2.5 text-[14px] text-[#1d3c34]"
                >
                  {STATUS_OPTIONS.filter((option) => option.value).map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
