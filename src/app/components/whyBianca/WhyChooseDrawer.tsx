import { useNavigate } from "react-router";
import { Drawer } from "vaul";
import { X } from "lucide-react";
import {
  WHY_CHOOSE_BIANCA_PATH,
  WHY_DRAWER_HIGHLIGHTS,
} from "../../data/whyChooseBianca";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WhyChooseDrawer({ open, onOpenChange }: Props) {
  const navigate = useNavigate();

  function openFullStory() {
    onOpenChange(false);
    navigate(WHY_CHOOSE_BIANCA_PATH);
  }

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
          aria-describedby="why-bianca-drawer-description"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-[#faf8f5] shadow-2xl outline-none"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#1d3c34]/10 px-6 py-5">
            <div>
              <Drawer.Title className="font-editorial text-lg tracking-[0.1em] uppercase text-[#1d3c34]">
                Why Choose Bianca Diamonds?
              </Drawer.Title>
              <p
                id="why-bianca-drawer-description"
                className="mt-2 text-house-body text-sm text-on-cream-body"
              >
                Luxury made personal — certified diamonds, modern design, and
                jewellery crafted around you.
              </p>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close Why Choose Bianca panel"
                className="shrink-0 rounded-full p-2 text-on-cream-muted transition-colors hover:bg-[#1d3c34]/5 hover:text-bianca-forest"
              >
                <X className="size-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <p className="font-editorial text-[clamp(1.35rem,3vw,1.65rem)] tracking-[0.04em] text-[#1d3c34]">
              Luxury, made personal.
            </p>
            <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
              Choosing a diamond is about more than the stone itself. It is
              about trust, craftsmanship, design—and finding something that
              feels uniquely yours.
            </p>
            <p className="mt-4 text-house-body leading-relaxed text-on-cream-body">
              At Bianca Diamonds, we combine exceptional lab-grown diamonds,
              contemporary design and personalised craftsmanship to create
              jewellery made around you.
            </p>

            <ul className="mt-8 space-y-4" aria-label="Why Bianca highlights">
              {WHY_DRAWER_HIGHLIGHTS.map((item) => (
                <li
                  key={item.id}
                  className="border-t border-[#1d3c34]/10 pt-4 first:border-t-0 first:pt-0"
                >
                  <p className="font-editorial text-[13px] uppercase tracking-[0.14em] text-gold-on-cream">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-on-cream-body">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#1d3c34]/10 bg-[#f4f0e6]/60 px-6 py-5">
            <button
              type="button"
              onClick={openFullStory}
              className="inline-flex w-full justify-center border border-[#1d3c34] bg-[#1d3c34] px-8 py-3 text-house-cta text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest"
            >
              Open full page
            </button>
            <p className="mt-3 text-center text-[11px] tracking-[0.04em] text-on-cream-muted">
              Continues to /why-bianca-diamonds
            </p>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
