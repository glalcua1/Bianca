import { useEffect, useState, type FormEvent } from "react";
import { Check, Copy, Phone } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import {
  getJppPublicConfig,
  type JppPaymentDetails,
  type JppPublicCustomer,
} from "../../data/jppConfig";
import { registerJppCustomer } from "../../lib/jppApi";
import { trackJppEvent } from "../../lib/jppAnalytics";
import { buildWhatsAppChatUrl } from "../../lib/whatsappContact";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const fieldClass =
  "w-full border border-[#1d3c34]/15 bg-[#faf8f5] px-4 py-3.5 text-[15px] text-[#1d3c34] outline-none transition-colors placeholder:text-on-cream-muted focus:border-[#766d42]";

type SuccessState = {
  customer: JppPublicCustomer;
  payment: JppPaymentDetails;
};

export default function JppRegister() {
  const config = getJppPublicConfig();
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [copied, setCopied] = useState<"account" | "ifsc" | null>(null);
  const [whatsappHref, setWhatsappHref] = useState("#");
  const [startedTracked, setStartedTracked] = useState(false);

  useEffect(() => {
    if (!success) return;
    const text = [
      "Hello Bianca Diamonds,",
      "",
      `I have registered for the Bianca Jewellery Purchase Plan.`,
      `My JPP number is ${success.customer.jppNumber}.`,
      "Please help me activate my plan.",
    ].join("\n");
    setWhatsappHref(buildWhatsAppChatUrl(config.whatsappDigits, { text }));
  }, [success, config.whatsappDigits]);

  function markStarted() {
    if (startedTracked) return;
    setStartedTracked(true);
    trackJppEvent("jpp_registration_started");
  }

  async function copyValue(
    value: string,
    kind: "account" | "ifsc",
    eventName: "jpp_bank_account_copied" | "jpp_ifsc_copied",
  ) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      trackJppEvent(eventName);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setDuplicateMessage("");
    setLoading(true);
    markStarted();

    try {
      const result = await registerJppCustomer({
        fullName,
        mobileNumber,
        email: email.trim() || undefined,
        consent,
      });

      if (result.ok) {
        trackJppEvent("jpp_registration_completed");
        setSuccess({
          customer: result.customer,
          payment: result.payment,
        });
        requestAnimationFrame(() => {
          document
            .getElementById("register")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }

      if (result.duplicate) {
        trackJppEvent("jpp_registration_duplicate");
        setDuplicateMessage(
          result.message ||
            "Please contact Bianca Diamonds for assistance with your existing plan.",
        );
        setError(result.error);
        return;
      }

      setError(result.error || "Registration could not be completed.");
    } catch {
      setError("Something went wrong. Please try again or call Bianca.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    const { customer, payment } = success;
    return (
      <section
        id="register"
        className="scroll-mt-24 border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
      >
        <div className="mx-auto max-w-3xl">
          <EditorialEyebrow>Welcome</EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Welcome to Your Bianca JPP Journey.
          </h2>
          <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
            Your Bianca Jewellery Purchase Plan registration is complete.
          </p>

          <div className="mt-10 border border-[#1d3c34]/12 bg-[#faf8f5] px-6 py-8 sm:px-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold-on-cream">
              Customer name
            </p>
            <p className="mt-2 font-editorial text-xl tracking-[0.04em] text-[#1d3c34]">
              {customer.fullName}
            </p>

            <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-gold-on-cream">
              Your Bianca JPP Number is
            </p>
            <p className="mt-3 font-editorial text-[clamp(1.5rem,4vw,2rem)] tracking-[0.08em] text-[#1d3c34]">
              {customer.jppNumber}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-on-cream-muted">
              Save this number. You&apos;ll need it when you contact Bianca.
            </p>
          </div>

          <p className="mt-8 text-house-body leading-relaxed text-on-cream-body">
            Please call Bianca Diamonds to activate your plan and begin your
            monthly installment journey.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={config.phoneTel}
              onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
              className="inline-flex min-w-[200px] items-center justify-center gap-2.5 border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
            >
              <Phone className="size-4" strokeWidth={1.25} aria-hidden />
              Call Bianca
            </a>
            {config.whatsappDigits ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackJppEvent("jpp_whatsapp_clicked")}
                className="inline-flex min-w-[200px] items-center justify-center gap-2.5 border border-[#1d3c34]/35 px-8 py-3.5 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:border-[#1d3c34] hover:bg-[#1d3c34]/5"
              >
                <WhatsAppGlyph className="size-4" />
                WhatsApp Bianca
              </a>
            ) : null}
          </div>

          <div className="mt-12 border border-[#1d3c34]/12 bg-[#faf8f5] px-6 py-8 sm:px-8">
            <h3 className="font-editorial text-lg tracking-[0.06em] text-[#1d3c34]">
              Your Payment Details
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-on-cream-body">
              Important: Please verify the bank details displayed on this page
              and contact Bianca Diamonds before making your first payment.
              Registration does not activate your plan.
            </p>

            <dl className="mt-8 space-y-5 text-sm">
              <div>
                <dt className="uppercase tracking-[0.16em] text-gold-on-cream">
                  Bank Name
                </dt>
                <dd className="mt-1 text-[#1d3c34]">{payment.bankName}</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-gold-on-cream">
                  Account Number
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-3 text-[#1d3c34]">
                  <span className="font-editorial text-lg tracking-[0.06em]">
                    {payment.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      void copyValue(
                        payment.accountNumber,
                        "account",
                        "jpp_bank_account_copied",
                      )
                    }
                    className="inline-flex items-center gap-1.5 border border-[#1d3c34]/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#1d3c34] transition-colors hover:border-[#1d3c34]"
                  >
                    {copied === "account" ? (
                      <Check className="size-3.5" strokeWidth={1.5} />
                    ) : (
                      <Copy className="size-3.5" strokeWidth={1.5} />
                    )}
                    {copied === "account" ? "Copied" : "Copy"}
                  </button>
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-gold-on-cream">
                  IFSC
                </dt>
                <dd className="mt-1 flex flex-wrap items-center gap-3 text-[#1d3c34]">
                  {payment.ifscConfigured && payment.ifsc ? (
                    <>
                      <span className="font-editorial text-lg tracking-[0.06em]">
                        {payment.ifsc}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          void copyValue(
                            payment.ifsc!,
                            "ifsc",
                            "jpp_ifsc_copied",
                          )
                        }
                        className="inline-flex items-center gap-1.5 border border-[#1d3c34]/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#1d3c34] transition-colors hover:border-[#1d3c34]"
                      >
                        {copied === "ifsc" ? (
                          <Check className="size-3.5" strokeWidth={1.5} />
                        ) : (
                          <Copy className="size-3.5" strokeWidth={1.5} />
                        )}
                        {copied === "ifsc" ? "Copied" : "Copy"}
                      </button>
                    </>
                  ) : (
                    <span className="text-on-cream-muted">
                      Please call Bianca Diamonds for the IFSC code before your
                      first transfer.
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-gold-on-cream">
                  Account Type
                </dt>
                <dd className="mt-1 text-[#1d3c34]">{payment.accountType}</dd>
              </div>
            </dl>

            <p className="mt-8 border-t border-[#1d3c34]/10 pt-6 text-sm leading-relaxed text-on-cream-body">
              Please call Bianca Diamonds before making your first transfer so
              we can activate your Bianca JPP account and guide you through the
              process. Where possible, use your Bianca JPP number as your
              payment reference.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="register"
      className="scroll-mt-24 border-y border-[#1d3c34]/10 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <EditorialEyebrow>Register</EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Create your Bianca JPP account.
          </h2>
          <p className="mt-4 max-w-md text-house-body leading-relaxed text-on-cream-body">
            A short registration — then a unique plan number and a call with
            Bianca to activate your journey.
          </p>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-on-cream-muted">
            Registration does not activate your plan or confirm any payment.
            You must contact Bianca before making your first transfer.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-[#1d3c34]/12 bg-[#faf8f5] px-6 py-8 sm:px-8"
          noValidate
        >
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
              Full Name
            </span>
            <input
              className={`${fieldClass} mt-2`}
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                markStarted();
              }}
              required
              minLength={2}
              maxLength={80}
            />
          </label>

          <label className="mt-5 block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
              Mobile Number
            </span>
            <input
              className={`${fieldClass} mt-2`}
              name="mobileNumber"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit Indian mobile"
              value={mobileNumber}
              onChange={(e) => {
                setMobileNumber(e.target.value);
                markStarted();
              }}
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
              Email Address{" "}
              <span className="normal-case tracking-normal text-on-cream-muted">
                (optional)
              </span>
            </span>
            <input
              className={`${fieldClass} mt-2`}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-on-cream-body">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-[#1d3c34]"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              I agree to be contacted by Bianca Diamonds regarding my Jewellery
              Purchase Plan.
            </span>
          </label>

          {error ? (
            <div className="mt-5 border border-[#8a4a3a]/35 bg-[#faf8f5] px-4 py-3 text-sm leading-relaxed text-[#5c2f24]">
              <p>{error}</p>
              {duplicateMessage ? (
                <p className="mt-2 text-on-cream-body">{duplicateMessage}</p>
              ) : null}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full min-w-[220px] items-center justify-center border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? "Creating your plan…" : "Create My Bianca JPP"}
          </button>
        </form>
      </div>
    </section>
  );
}
