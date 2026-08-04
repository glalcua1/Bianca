import { useId, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Gift, Phone, Sigma } from "lucide-react";
import EditorialEyebrow from "../editorial/EditorialEyebrow";
import {
  JPP_CALCULATOR,
  JPP_COPY,
  formatInr,
  getJppPublicConfig,
} from "../../data/jppConfig";
import { trackJppEvent } from "../../lib/jppAnalytics";

function clampMonthly(raw: number) {
  if (!Number.isFinite(raw)) return JPP_CALCULATOR.minMonthly;
  return Math.min(
    JPP_CALCULATOR.maxMonthly,
    Math.max(JPP_CALCULATOR.minMonthly, Math.round(raw)),
  );
}

function parseAmount(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return 0;
  return Number(digits);
}

export default function JppCalculator() {
  const inputId = useId();
  const config = getJppPublicConfig();
  const [input, setInput] = useState(
    String(JPP_CALCULATOR.minMonthly.toLocaleString("en-IN")),
  );
  const monthly = clampMonthly(parseAmount(input));

  const breakdown = useMemo(() => {
    const yourContribution = monthly * JPP_CALCULATOR.customerMonths;
    const biancaContribution = monthly * JPP_CALCULATOR.biancaMonths;
    const total = yourContribution + biancaContribution;
    return { yourContribution, biancaContribution, total };
  }, [monthly]);

  function onInputChange(value: string) {
    const cleaned = value.replace(/[^\d,]/g, "");
    setInput(cleaned);
  }

  function onBlur() {
    const next = clampMonthly(parseAmount(input));
    setInput(next.toLocaleString("en-IN"));
  }

  const presets = [5_000, 10_000, 25_000, 50_000, 100_000];

  return (
    <section
      id="calculator"
      className="scroll-mt-24 relative overflow-hidden bg-[#1d3c34] px-6 py-20 md:px-10 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_70%_20%,rgba(220,203,123,0.14),transparent_55%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <EditorialEyebrow tone="gold">
            {JPP_COPY.calculatorEyebrow}
          </EditorialEyebrow>
          <h2 className="mt-4 font-editorial text-[clamp(1.85rem,4vw,2.75rem)] tracking-[0.05em] text-[#f9f9f9]">
            {JPP_COPY.calculatorTitle}
          </h2>
          <p className="mt-4 max-w-md text-house-body leading-relaxed text-on-forest-body">
            {JPP_COPY.calculatorSupport}
          </p>
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-on-forest-muted">
            For Plan 01 · Fixed monthly installment · Purchase in month{" "}
            {JPP_CALCULATOR.purchaseMonth}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="border border-[#dccb7b]/25 bg-[#faf8f5] p-6 md:p-9"
        >
          <label htmlFor={inputId} className="block">
            <span className="text-[11px] uppercase tracking-[0.18em] text-on-cream-muted">
              Monthly installment (₹)
            </span>
            <div className="mt-3 flex items-baseline gap-2 border-b border-[#1d3c34]/20 pb-3">
              <span className="font-editorial text-2xl text-[#1d3c34]">₹</span>
              <input
                id={inputId}
                inputMode="numeric"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onBlur={onBlur}
                className="w-full bg-transparent font-editorial text-[clamp(2rem,5vw,2.75rem)] tracking-[0.04em] text-[#1d3c34] outline-none"
                aria-describedby={`${inputId}-hint`}
              />
            </div>
            <span
              id={`${inputId}-hint`}
              className="mt-2 block text-[12px] text-on-cream-muted"
            >
              Between {formatInr(JPP_CALCULATOR.minMonthly)} and{" "}
              {formatInr(JPP_CALCULATOR.maxMonthly)}
            </span>
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            {presets.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setInput(amount.toLocaleString("en-IN"))}
                className={`border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  monthly === amount
                    ? "border-[#1d3c34] bg-[#1d3c34] text-[#faf8f5]"
                    : "border-[#1d3c34]/20 text-[#1d3c34] hover:border-[#1d3c34]"
                }`}
              >
                {formatInr(amount)}
              </button>
            ))}
          </div>

          <input
            type="range"
            min={JPP_CALCULATOR.minMonthly}
            max={JPP_CALCULATOR.maxMonthly}
            step={1000}
            value={monthly}
            onChange={(e) =>
              setInput(Number(e.target.value).toLocaleString("en-IN"))
            }
            className="mt-8 w-full accent-[#1d3c34]"
            aria-label="Adjust monthly installment"
          />

          <dl className="mt-10 space-y-5">
            <div className="flex items-start justify-between gap-4 border-t border-[#1d3c34]/10 pt-5">
              <dt className="flex items-center gap-2.5 text-[13px] text-on-cream-body">
                <Sigma
                  className="size-4 text-[#766d42]"
                  strokeWidth={1.25}
                  aria-hidden
                />
                Your contribution × {JPP_CALCULATOR.customerMonths}
              </dt>
              <dd className="font-editorial text-lg tracking-[0.03em] text-[#1d3c34]">
                {formatInr(breakdown.yourContribution)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-4">
              <dt className="flex items-center gap-2.5 text-[13px] text-on-cream-body">
                <Gift
                  className="size-4 text-[#766d42]"
                  strokeWidth={1.25}
                  aria-hidden
                />
                One month from Bianca Diamonds
              </dt>
              <dd className="font-editorial text-lg tracking-[0.03em] text-[#1d3c34]">
                {formatInr(breakdown.biancaContribution)}
              </dd>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-[#1d3c34]/15 pt-5">
              <dt>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gold-on-cream">
                  Total jewellery value
                </p>
                <p className="mt-1 text-[12px] text-on-cream-muted">
                  Available to purchase in month{" "}
                  {JPP_CALCULATOR.purchaseMonth}
                </p>
              </dt>
              <dd className="font-editorial text-[clamp(1.75rem,4vw,2.35rem)] tracking-[0.04em] text-[#1d3c34]">
                {formatInr(breakdown.total)}
              </dd>
            </div>
          </dl>

          <a
            href={config.phoneTel}
            onClick={() => trackJppEvent("jpp_call_bianca_clicked")}
            className="mt-9 inline-flex w-full items-center justify-center gap-2.5 border border-[#1d3c34] bg-[#1d3c34] px-8 py-3.5 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
          >
            <Phone className="size-4" strokeWidth={1.25} aria-hidden />
            Call Now to Enrol
          </a>
        </motion.div>
      </div>
    </section>
  );
}
