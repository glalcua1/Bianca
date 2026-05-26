import { useCalculator } from "../context/CalculatorContext";
import { formatCurrency, formatWeight } from "../lib/calculations";
import CollapsibleSection from "./ui/CollapsibleSection";

export default function BreakdownTables() {
  const { state, result } = useCalculator();
  const isCustomer = state.quoteMode === "customer";

  if (isCustomer) return null;

  return (
    <CollapsibleSection
      title="Detailed Breakdown"
      subtitle="Gold components and gemstone tables"
      defaultOpen={false}
    >
      <div className="space-y-8">
        <div>
          <h3 className="mb-3 font-['Times_New_Roman',serif] text-sm tracking-wide">
            Gold Components
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-left text-sm">
              <thead>
                <tr className="border-b border-black/10 text-[11px] uppercase tracking-widest text-[#717182]">
                  <th className="pb-2 pr-4 font-normal">Component</th>
                  <th className="pb-2 pr-4 font-normal">Weight</th>
                  <th className="pb-2 font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {result.componentBreakdown.map((row) => (
                  <tr key={row.id} className="border-b border-black/5">
                    <td className="py-2.5 pr-4">{row.name}</td>
                    <td className="py-2.5 pr-4">{formatWeight(row.weight)}</td>
                    <td className="py-2.5 text-right">
                      {formatCurrency(row.amount)}
                    </td>
                  </tr>
                ))}
                <tr className="font-medium">
                  <td className="pt-3">Total</td>
                  <td className="pt-3">{formatWeight(result.totalGoldWeight)}</td>
                  <td className="pt-3 text-right">
                    {formatCurrency(result.goldAmount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {result.stoneBreakdown.length > 0 && (
          <div>
            <h3 className="mb-3 font-['Times_New_Roman',serif] text-sm tracking-wide">
              Gemstone Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10 text-[11px] uppercase tracking-widest text-[#717182]">
                    <th className="pb-2 pr-4 font-normal">Stone</th>
                    <th className="pb-2 pr-4 font-normal">Qty</th>
                    <th className="pb-2 pr-4 font-normal">Carat</th>
                    <th className="pb-2 pr-4 font-normal">Rate</th>
                    <th className="pb-2 font-normal text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {result.stoneBreakdown.map((row) => (
                    <tr key={row.id} className="border-b border-black/5">
                      <td className="py-2.5 pr-4">{row.name}</td>
                      <td className="py-2.5 pr-4">{row.quantity}</td>
                      <td className="py-2.5 pr-4">{row.carat} ct</td>
                      <td className="py-2.5 pr-4">{formatCurrency(row.rate)}</td>
                      <td className="py-2.5 text-right">
                        {formatCurrency(row.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}
