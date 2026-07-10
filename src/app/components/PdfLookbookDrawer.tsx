import { Drawer } from "vaul";
import { X, ExternalLink, Download } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfSrc: string;
  title?: string;
  description?: string;
};

/**
 * Right-side salon drawer that presents a PDF lookbook with slide-in motion (vaul).
 */
export default function PdfLookbookDrawer({
  open,
  onOpenChange,
  pdfSrc,
  title = "Blue Star Collection",
  description = "Exclusive lab-grown blue diamonds by Bianca Diamonds.",
}: Props) {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="right"
      shouldScaleBackground={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-[#0a1628]/70 backdrop-blur-[3px] transition-opacity" />
        <Drawer.Content
          aria-describedby="blue-diamond-drawer-description"
          className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-[#faf8f5] shadow-[-24px_0_64px_rgba(10,22,40,0.35)] outline-none sm:max-w-2xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#1d3c34]/10 px-5 py-5 sm:px-6">
            <div className="min-w-0">
              <p className="font-editorial text-[10px] uppercase tracking-[0.28em] text-gold-on-cream">
                Exclusive lookbook
              </p>
              <Drawer.Title className="mt-2 font-editorial text-lg tracking-[0.1em] uppercase text-[#1d3c34] sm:text-xl">
                {title}
              </Drawer.Title>
              <p
                id="blue-diamond-drawer-description"
                className="mt-2 text-sm leading-relaxed text-on-cream-body"
              >
                {description}
              </p>
            </div>
            <Drawer.Close asChild>
              <button
                type="button"
                aria-label="Close Blue Star lookbook"
                className="shrink-0 rounded-full p-2 text-on-cream-muted transition-colors hover:bg-[#1d3c34]/5 hover:text-bianca-forest"
              >
                <X className="size-5" />
              </button>
            </Drawer.Close>
          </div>

          <div className="relative min-h-0 flex-1 bg-[#0a1628]">
            <iframe
              title={`${title} PDF`}
              src={`${pdfSrc}#toolbar=0&navpanes=0&view=FitH`}
              className="absolute inset-0 size-full border-0 bg-[#0a1628]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#1d3c34]/10 bg-[#f4f0e6]/70 px-5 py-4 sm:px-6">
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 border border-[#1d3c34] bg-[#1d3c34] px-5 py-3 font-editorial text-[12px] uppercase tracking-[0.16em] text-[#faf8f5] transition-colors duration-500 hover:bg-transparent hover:text-bianca-forest sm:flex-none"
            >
              <ExternalLink className="size-4" aria-hidden />
              Open full screen
            </a>
            <a
              href={pdfSrc}
              download
              className="inline-flex flex-1 items-center justify-center gap-2 border border-[#1d3c34]/25 px-5 py-3 font-editorial text-[12px] uppercase tracking-[0.16em] text-[#1d3c34] transition-colors duration-500 hover:border-[#766d42]/50 hover:text-[#524a28] sm:flex-none"
            >
              <Download className="size-4" aria-hidden />
              Download PDF
            </a>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
