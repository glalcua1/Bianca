import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { BiancaForestNavLogo } from "../../components/BiancaLogo";
import {
  adminLogin,
  adminSession,
  setAdminToken,
} from "../../lib/jppApi";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  usePageMeta(
    "Bianca JPP Admin | Bianca Diamonds",
    "Secure admin access for the Bianca Jewellery Purchase Plan.",
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await adminSession();
      if (!cancelled && session.ok) {
        navigate("/admin", { replace: true });
        return;
      }
      if (!cancelled) setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await adminLogin(email.trim(), password);
      if (!result.ok || !result.token) {
        setError(result.error || "Unable to sign in.");
        return;
      }
      setAdminToken(result.token);
      navigate("/admin", { replace: true });
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] text-[11px] uppercase tracking-[0.2em] text-[#1d3c34]/70">
        Checking session…
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-6 py-16">
      <div className="w-full max-w-md border border-[#1d3c34]/12 bg-white/50 p-8">
        <div className="flex justify-center">
          <BiancaForestNavLogo maxWidth={140} />
        </div>
        <h1 className="mt-8 text-center font-editorial text-2xl tracking-[0.06em] text-[#1d3c34]">
          Bianca JPP Admin
        </h1>
        <p className="mt-2 text-center text-[13px] text-on-cream-muted">
          Sign in to manage Jewellery Purchase Plan registrations.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Email
            </span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-[#1d3c34]/20 bg-transparent px-4 py-3 text-[15px] text-[#1d3c34] outline-none focus:border-[#1d3c34]"
            />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-[#1d3c34]/20 bg-transparent px-4 py-3 text-[15px] text-[#1d3c34] outline-none focus:border-[#1d3c34]"
            />
          </label>

          {error ? (
            <p className="text-[13px] text-[#8a2f2f]" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full justify-center bg-[#1d3c34] px-6 py-3.5 text-house-cta text-[#faf8f5] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
