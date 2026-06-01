import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { FaqItem } from "../../data/labGrownDiamondFaq";

type Props = {
  items: FaqItem[];
  /** Compact styling for drawer */
  variant?: "page" | "drawer";
  /** Allow multiple panels open (drawer preview) */
  type?: "single" | "multiple";
};

export default function FaqAccordion({
  items,
  variant = "page",
  type = "single",
}: Props) {
  const isDrawer = variant === "drawer";

  return (
    <Accordion.Root
      type={type}
      collapsible={type === "single"}
      className="divide-y divide-[#766d42]/15"
    >
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id} className="group">
          <Accordion.Header>
            <Accordion.Trigger
              className={`flex w-full items-start justify-between gap-4 text-left transition-colors ${
                isDrawer ? "py-4" : "py-6 md:py-7"
              } hover:text-[#1d3c34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1d3c34]/40`}
            >
              <span
                className={`font-editorial leading-snug tracking-[0.03em] text-[#1d3c34] ${
                  isDrawer
                    ? "text-[15px]"
                    : "text-[clamp(1.05rem,2.2vw,1.25rem)]"
                }`}
              >
                {item.question}
              </span>
              <ChevronDown
                className="mt-1 size-4 shrink-0 text-[#766d42] transition-transform duration-300 group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div
              className={`pb-6 text-house-body leading-relaxed text-on-cream-body ${
                isDrawer ? "text-sm pb-4" : "pb-7 md:max-w-3xl"
              }`}
            >
              <p>{item.answer}</p>
              {item.referenceUrl ? (
                <a
                  href={item.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-body text-[12px] uppercase tracking-[0.14em] text-[#766d42] transition-colors hover:text-[#1d3c34]"
                >
                  {item.referenceLabel ?? "Trusted source"}
                  <ExternalLink className="size-3" aria-hidden />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              ) : null}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
