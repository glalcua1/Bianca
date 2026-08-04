import { useState, type FormEvent } from "react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import WhyCtaButton from "../whyBianca/WhyCtaButton";
import { registerJppCustomer } from "../../lib/jppApi";
import { trackJppEvent } from "../../lib/jppAnalytics";
import type { JppPaymentDetails, JppPublicCustomer } from "../../data/jppConfig";
import { JPP_COPY } from "../../data/jppConfig";

type Props = {
  onSuccess: (customer: JppPublicCustomer, payment: JppPaymentDetails) => void;
  onDuplicate: (customer?: JppPublicCustomer) => void;
};

function validateName(name: string) {
  if (name.trim().length < 2) return "Please enter your full name.";
  return "";
}

function validateMobile(mobile: string) {
  const digits = mobile.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (!/^[6-9]\d{9}$/.test(national)) {
    return "Please enter a valid 10-digit Indian mobile number.";
  }
  return "";
}

export default function JppRegistrationForm({
  onSuccess,
  onDuplicate,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackJppEvent("jpp_registration_started");
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError("");

    const nextErrors: Record<string, string> = {
      fullName: validateName(fullName),
      mobileNumber: validateMobile(mobileNumber),
      consent: consent
        ? ""
        : "Please agree to be contacted by Bianca Diamonds regarding your Jewellery Purchase Plan.",
    };
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      const result = await registerJppCustomer({
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email.trim() || undefined,
        consent: true,
      });

      if (result.ok) {
        trackJppEvent("jpp_registration_completed", {
          jpp_number: result.customer.jppNumber,
        });
        onSuccess(result.customer, result.payment);
        return;
      }

      if (result.duplicate) {
        trackJppEvent("jpp_registration_duplicate");
        onDuplicate(result.customer);
        setFormError(result.error || JPP_COPY.duplicateMessage);
        return;
      }

      setFormError(result.error || "Unable to complete registration.");
    } catch {
      setFormError("Unable to complete registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full border border-[#1d3c34]/20 bg-transparent px-4 py-3 text-[15px] text-[#1d3c34] outline-none transition-colors focus:border-[#1d3c34] placeholder:text-on-cream-muted/70";

  return (
    <section
      id="register"
      className="scroll-mt-24 bg-[#f4f0e6] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <EditorialEyebrow>Register</EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#1d3c34]">
            Begin your Bianca JPP.
          </h2>
          <p className="mt-4 max-w-md text-house-body leading-relaxed text-on-cream-body">
            Share a few details to receive your unique Bianca JPP number. Your
            plan is activated when you speak with our team.
          </p>
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-on-cream-muted">
            Registration does not start payments and does not confirm that funds
            have been received. Bianca will guide you through activation and your
            first transfer.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-[#1d3c34]/12 bg-[#faf8f5] p-6 md:p-8"
          noValidate
        >
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Full Name *
            </span>
            <input
              className={fieldClass}
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => {
                markStarted();
                setFullName(e.target.value);
              }}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName ? (
              <span className="mt-1 block text-[12px] text-[#8a2f2f]">
                {errors.fullName}
              </span>
            ) : null}
          </label>

          <label className="mt-5 block">
            <span className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Mobile Number *
            </span>
            <input
              className={fieldClass}
              name="mobileNumber"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit Indian mobile"
              value={mobileNumber}
              onChange={(e) => {
                markStarted();
                setMobileNumber(e.target.value);
              }}
              aria-invalid={Boolean(errors.mobileNumber)}
            />
            {errors.mobileNumber ? (
              <span className="mt-1 block text-[12px] text-[#8a2f2f]">
                {errors.mobileNumber}
              </span>
            ) : null}
          </label>

          <label className="mt-5 block">
            <span className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Email Address (optional)
            </span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                markStarted();
                setEmail(e.target.value);
              }}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <span className="mt-1 block text-[12px] text-[#8a2f2f]">
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-[#1d3c34]"
              checked={consent}
              onChange={(e) => {
                markStarted();
                setConsent(e.target.checked);
              }}
            />
            <span className="text-[13px] leading-relaxed text-on-cream-body">
              I agree to be contacted by Bianca Diamonds regarding my Jewellery
              Purchase Plan.
            </span>
          </label>
          {errors.consent ? (
            <span className="mt-1 block text-[12px] text-[#8a2f2f]">
              {errors.consent}
            </span>
          ) : null}

          {formError ? (
            <p className="mt-5 text-[13px] leading-relaxed text-[#8a2f2f]" role="alert">
              {formError}
            </p>
          ) : null}

          <div className="mt-8">
            <WhyCtaButton
              type="submit"
              variant="primary"
              disabled={submitting}
              className="w-full min-w-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating your JPP…" : "Create My Bianca JPP"}
            </WhyCtaButton>
          </div>
        </form>
      </div>
    </section>
  );
}
