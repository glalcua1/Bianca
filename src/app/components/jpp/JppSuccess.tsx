import { useEffect, useState } from "react";
import { motion } from "motion/react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import WhyCtaButton from "../whyBianca/WhyCtaButton";
import {
  JPP_COPY,
  getJppPublicConfig,
  type JppPaymentDetails,
  type JppPublicCustomer,
} from "../../data/jppConfig";
import { trackJppEvent } from "../../lib/jppAnalytics";
import { buildWhatsAppChatUrl } from "../../lib/whatsappContact";

type Props = {
  customer: JppPublicCustomer;
  payment: JppPaymentDetails;
  duplicate?: boolean;
};

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export default function JppSuccess({
  customer,
  payment,
  duplicate = false,
}: Props) {
  const config = getJppPublicConfig();
  const [copied, setCopied] = useState<"account" | "ifsc" | "jpp" | "">("");
  const [whatsappHref, setWhatsappHref] = useState("");

  useEffect(() => {
    const text = [
      "Hello Bianca Diamonds,",
      "",
      "I would like to activate my Bianca Jewellery Purchase Plan.",
      `Name: ${customer.fullName}`,
      `JPP Number: ${customer.jppNumber}`,
      `Mobile: ${customer.mobileNumber}`,
    ].join("\n");
    setWhatsappHref(
      buildWhatsAppChatUrl(config.whatsappDigits, { text }),
    );
  }, [config.whatsappDigits, customer]);

  async function handleCopy(
    kind: "account" | "ifsc" | "jpp",
    value: string,
    eventName?: "jpp_bank_account_copied" | "jpp_ifsc_copied",
  ) {
    const ok = await copyText(value);
    if (!ok) return;
    setCopied(kind);
    if (eventName) trackJppEvent(eventName);
    window.setTimeout(() => setCopied(""), 1800);
  }

  const bank = {
    bankName: payment.bankName || config.bank.name,
    accountNumber: payment.accountNumber || config.bank.accountNumber,
    ifsc: payment.ifsc || config.bank.ifsc || "",
    ifscConfigured: payment.ifscConfigured ?? config.bank.ifscConfigured,
    accountType: payment.accountType || config.bank.accountType,
  };

  return (
    <section
      id="jpp-confirmation"
      className="scroll-mt-24 bg-[#faf8f5] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <EditorialEyebrow>
          {duplicate ? "Existing account" : "Registration complete"}
        </EditorialEyebrow>
        <h2 className="mt-4 font-editorial text-[clamp(1.9rem,4.5vw,3rem)] tracking-[0.05em] text-[#1d3c34]">
          {duplicate ? JPP_COPY.duplicateMessage : JPP_COPY.successHeadline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-house-body leading-relaxed text-on-cream-body">
          {duplicate
            ? "Please contact Bianca Diamonds for assistance with your existing plan."
            : JPP_COPY.successMessage}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl border border-[#1d3c34]/12 bg-[#f4f0e6] px-6 py-10 text-center md:px-10">
        <p className="text-[11px] uppercase tracking-[0.18em] text-on-cream-muted">
          Customer Name
        </p>
        <p className="mt-2 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
          {customer.fullName}
        </p>

        <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-on-cream-muted">
          {JPP_COPY.jppRevealLead}
        </p>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.35em" }}
          animate={{ opacity: 1, letterSpacing: "0.08em" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-editorial text-[clamp(1.5rem,4vw,2.15rem)] text-[#1d3c34]"
        >
          {customer.jppNumber}
        </motion.p>
        <button
          type="button"
          onClick={() => handleCopy("jpp", customer.jppNumber)}
          className="mt-3 text-[11px] uppercase tracking-[0.16em] text-gold-on-cream transition-colors hover:text-[#1d3c34]"
        >
          {copied === "jpp" ? "Copied" : "Copy JPP Number"}
        </button>
        <p className="mx-auto mt-4 max-w-md text-[13px] leading-relaxed text-on-cream-body">
          {JPP_COPY.jppRevealNote}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-house-body leading-relaxed text-on-cream-body">
          {JPP_COPY.activateMessage}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={config.phoneTel}
            onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
            className="inline-flex min-w-[200px] justify-center border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
          >
            Call Bianca
          </a>
          {config.whatsappDigits ? (
            <a
              href={whatsappHref || "#"}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackJppEvent("jpp_whatsapp_clicked")}
              className="inline-flex min-w-[200px] justify-center border border-[#1d3c34]/35 px-8 py-3.5 text-house-cta text-[#1d3c34] transition-colors duration-500 hover:border-[#1d3c34] hover:bg-[#1d3c34]/5"
            >
              WhatsApp Bianca
            </a>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-2xl border border-[#1d3c34]/12 bg-white/40 p-6 md:p-8">
        <EditorialEyebrow className="!text-left">Your payment details</EditorialEyebrow>
        <h3 className="mt-3 font-editorial text-2xl tracking-[0.04em] text-[#1d3c34]">
          Bank transfer information
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed text-on-cream-body">
          {JPP_COPY.paymentGuide}
        </p>

        <dl className="mt-8 space-y-4 text-left">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Bank Name
            </dt>
            <dd className="mt-1 text-[15px] text-[#1d3c34]">{bank.bankName}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Account Number
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-3 text-[15px] text-[#1d3c34]">
              <span className="font-editorial tracking-[0.06em]">
                {bank.accountNumber}
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    "account",
                    bank.accountNumber,
                    "jpp_bank_account_copied",
                  )
                }
                className="text-[11px] uppercase tracking-[0.14em] text-gold-on-cream transition-colors hover:text-[#1d3c34]"
              >
                {copied === "account" ? "Copied" : "Copy Account Number"}
              </button>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              IFSC
            </dt>
            <dd className="mt-1 flex flex-wrap items-center gap-3 text-[15px] text-[#1d3c34]">
              {bank.ifscConfigured && bank.ifsc ? (
                <>
                  <span className="font-editorial tracking-[0.06em]">
                    {bank.ifsc}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("ifsc", bank.ifsc, "jpp_ifsc_copied")
                    }
                    className="text-[11px] uppercase tracking-[0.14em] text-gold-on-cream transition-colors hover:text-[#1d3c34]"
                  >
                    {copied === "ifsc" ? "Copied" : "Copy IFSC"}
                  </button>
                </>
              ) : (
                <span className="text-on-cream-body">
                  Please contact Bianca Diamonds to confirm the IFSC code before
                  transferring.
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.16em] text-on-cream-muted">
              Account Type
            </dt>
            <dd className="mt-1 text-[15px] text-[#1d3c34]">
              {bank.accountType}
            </dd>
          </div>
        </dl>

        <p className="mt-8 border-t border-[#1d3c34]/10 pt-5 text-[13px] leading-relaxed text-on-cream-body">
          {JPP_COPY.paymentReference}
        </p>
        <p className="mt-3 text-[13px] leading-relaxed text-[#6a3a2a]">
          {JPP_COPY.paymentSafety}
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <WhyCtaButton variant="secondary" to="/fine-jewellery">
          Explore Bianca Jewellery
        </WhyCtaButton>
      </div>
    </section>
  );
}
