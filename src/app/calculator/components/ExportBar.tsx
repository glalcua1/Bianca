import { FileText, MessageCircle, Printer, Save } from "lucide-react";
import {
  buildWhatsAppQuote,
  exportPdfQuote,
  openWhatsAppQuote,
  printQuote,
} from "../lib/exportQuote";
import { useCalculator } from "../context/CalculatorContext";

export default function ExportBar() {
  const { state, result, persistDesign } = useCalculator();
  const isCustomer = state.quoteMode === "customer";
  const design = state.currentDesign;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={persistDesign}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm transition hover:border-[#C9A962]/40 hover:bg-[#faf8f5]"
      >
        <Save className="h-4 w-4 text-[#8B7355]" />
        Save to History
      </button>
      <button
        type="button"
        onClick={() => exportPdfQuote(design, result, isCustomer)}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm transition hover:border-[#C9A962]/40 hover:bg-[#faf8f5]"
      >
        <FileText className="h-4 w-4 text-[#8B7355]" />
        PDF Quote
      </button>
      <button
        type="button"
        onClick={() =>
          openWhatsAppQuote(buildWhatsAppQuote(design, result, isCustomer))
        }
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm transition hover:border-[#C9A962]/40 hover:bg-[#faf8f5]"
      >
        <MessageCircle className="h-4 w-4 text-[#8B7355]" />
        WhatsApp
      </button>
      <button
        type="button"
        onClick={() => printQuote(design, result, isCustomer)}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2 text-sm transition hover:border-[#C9A962]/40 hover:bg-[#faf8f5]"
      >
        <Printer className="h-4 w-4 text-[#8B7355]" />
        Print
      </button>
    </div>
  );
}
