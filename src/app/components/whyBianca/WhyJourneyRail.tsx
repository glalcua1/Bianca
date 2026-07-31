type Step = {
  id: string;
  label: string;
};

type Props = {
  steps: readonly Step[];
  tone?: "cream" | "forest";
  className?: string;
};

export default function WhyJourneyRail({
  steps,
  tone = "cream",
  className = "",
}: Props) {
  const line =
    tone === "forest" ? "bg-[#f9f9f9]/25" : "bg-[#766d42]/35";
  const dot =
    tone === "forest"
      ? "border-[#dccb7b]/70 bg-[#1d3c34]"
      : "border-[#766d42]/50 bg-[#faf8f5]";
  const label =
    tone === "forest" ? "text-on-forest-body" : "text-on-cream-body";

  return (
    <ol
      className={`flex flex-wrap items-start justify-center gap-y-6 ${className}`}
      aria-label="Journey"
    >
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="relative flex min-w-[4.5rem] flex-1 flex-col items-center px-1 text-center sm:min-w-[5.5rem]"
        >
          {index < steps.length - 1 ? (
            <span
              className={`pointer-events-none absolute top-[7px] left-1/2 hidden h-px w-full sm:block ${line}`}
              aria-hidden
            />
          ) : null}
          <span
            className={`relative z-[1] size-3.5 border ${dot}`}
            aria-hidden
          />
          <span
            className={`mt-3 font-editorial text-[11px] uppercase tracking-[0.16em] sm:text-[12px] ${label}`}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
