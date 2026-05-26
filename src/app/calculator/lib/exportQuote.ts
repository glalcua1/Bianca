import type { CalculationResult, JewelleryDesign } from "../types";
import { formatCurrency, formatWeight } from "./calculations";

export function buildWhatsAppQuote(
  design: JewelleryDesign,
  result: CalculationResult,
  customerMode: boolean,
): string {
  const lines = [
    "✨ *Bianca Diamonds*",
    `*${design.name}*`,
    `Category: ${design.category}`,
    "",
    `Gold (${design.goldPurity}): ${formatWeight(result.totalGoldWeight)}`,
  ];

  if (!customerMode) {
    lines.push(
      `Gold Amount: ${formatCurrency(result.goldAmount)}`,
      `Diamond: ${formatCurrency(result.diamondCost)}`,
      `Precious Stones: ${formatCurrency(result.preciousStoneCost)}`,
      `Making Charges: ${formatCurrency(result.makingChargesAmount)}`,
    );
    if (result.gstAmount > 0) {
      lines.push(`GST: ${formatCurrency(result.gstAmount)}`);
    }
    lines.push(`Cost Price: ${formatCurrency(result.costPrice)}`);
  }

  lines.push(
    "",
    `*Estimated Price: ${formatCurrency(result.finalPrice)}*`,
    "",
    "_This is an indicative quotation. Final pricing may vary based on design refinement and stone selection._",
    "Bianca Diamonds | Delhi",
  );

  return lines.join("\n");
}

export function openWhatsAppQuote(text: string): void {
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function printQuote(
  design: JewelleryDesign,
  result: CalculationResult,
  customerMode: boolean,
): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const internalRows = customerMode
    ? ""
    : `
      <tr><td>Gold Amount</td><td>${formatCurrency(result.goldAmount)}</td></tr>
      <tr><td>Diamond</td><td>${formatCurrency(result.diamondCost)}</td></tr>
      <tr><td>Precious Stones</td><td>${formatCurrency(result.preciousStoneCost)}</td></tr>
      <tr><td>Making Charges</td><td>${formatCurrency(result.makingChargesAmount)}</td></tr>
      ${result.gstAmount > 0 ? `<tr><td>GST</td><td>${formatCurrency(result.gstAmount)}</td></tr>` : ""}
      <tr><td>Cost Price</td><td>${formatCurrency(result.costPrice)}</td></tr>
    `;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Bianca Diamonds — ${design.name}</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Times New Roman', serif; color: #1a1a1a; padding: 48px; background: #fff; }
        .header { text-align: center; border-bottom: 2px solid #C9A962; padding-bottom: 24px; margin-bottom: 32px; }
        .logo { font-size: 28px; letter-spacing: 0.3em; text-transform: uppercase; color: #1d3c34; }
        .subtitle { font-size: 12px; letter-spacing: 0.4em; color: #8B7355; margin-top: 8px; }
        h1 { font-size: 22px; font-weight: normal; margin: 24px 0 8px; }
        .meta { font-size: 13px; color: #666; margin-bottom: 32px; }
        table { width: 100%; border-collapse: collapse; margin: 24px 0; }
        td { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
        td:last-child { text-align: right; }
        .total { font-size: 24px; text-align: center; margin: 40px 0; padding: 24px; border: 1px solid #C9A962; }
        .total span { display: block; font-size: 12px; letter-spacing: 0.2em; color: #8B7355; margin-bottom: 8px; }
        .footer { text-align: center; font-size: 11px; color: #999; margin-top: 48px; letter-spacing: 0.1em; }
        @media print { body { padding: 24px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">Bianca Diamonds</div>
        <div class="subtitle">Fine Jewellery Quotation</div>
      </div>
      <h1>${design.name}</h1>
      <p class="meta">${design.category} · ${design.goldPurity} Gold · ${formatWeight(result.totalGoldWeight)}</p>
      <table>
        ${internalRows}
      </table>
      <div class="total">
        <span>Estimated Price</span>
        ${formatCurrency(result.finalPrice)}
      </div>
      <p class="footer">Indicative quotation only. Final pricing subject to design confirmation.<br>Bianca Diamonds · Delhi</p>
    </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 300);
}

export function exportPdfQuote(
  design: JewelleryDesign,
  result: CalculationResult,
  customerMode: boolean,
): void {
  printQuote(design, result, customerMode);
}
