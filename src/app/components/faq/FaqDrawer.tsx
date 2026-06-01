import { Link } from "react-router";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import FaqAccordion from "./FaqAccordion";
import {
  LAB_GROWN_FAQ_ITEMS,
  LAB_GROWN_FAQ_PATH,
  LAB_GROWN_FAQ_TRUST_PILLARS,
} from "../../data/labGrownDiamondFaq";
import FaqTrustPillars from "./FaqTrustPillars";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FaqDrawer({ open, onOpenChange }: Props) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#1d3c34]/60 backdrop-blur-[2px]" />
        <Drawer.Content
          aria-describedby="faq-drawer-description"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-[#faf8f5] shadow-2xl outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#1d3c34]/10 px-6 py-5">
            <div>
              <Drawer.Title className="font-editorial text-lg tracking-[0.1em] uppercase text-[#1d3c34]">
                Lab-Grown Diamond FAQs
              </Drawer.Title>
              <p
                id="faq-drawer-description"
                className="mt-2 text-house-body text-sm text-on-cream-body"
              >
                Certified brilliance, transparency, and craftsmanship — answered
                with clarity.
              </p>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close FAQ panel"
                className="shrink-0 rounded-full p-2 text-on-cream-muted transition-colors hover:bg-[#1d3c34]/5 hover:text-bianca-forest"
              >
                <X className="size-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <FaqTrustPillars pillars={LAB_GROWN_FAQ_TRUST_PILLARS} compact />

            <div className="mt-8">
              <FaqAccordion
                items={LAB_GROWN_FAQ_ITEMS}
                variant="drawer"
                type="multiple"
              />
            </div>
          </div>

          <div className="border-t border-[#1d3c34]/10 bg-[#f4f0e6]/60 px-6 py-5">
            <Drawer.Close asChild>
              <Link
                to={LAB_GROWN_FAQ_PATH}
                className="inline-flex w-full justify-center border border-[#1d3c34] bg-[#1d3c34] px-8 py-3 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
              >
                Read the full guide
              </Link>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
