import { motion } from "motion/react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CHART_COLORS } from "../constants";
import { useCalculator } from "../context/CalculatorContext";
import { formatCurrency, formatWeight } from "../lib/calculations";
import LuxuryCard from "./ui/LuxuryCard";

function PriceRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-2 ${muted ? "text-[#717182]" : ""}`}
    >
      <span className="font-['Arial',sans-serif] text-xs uppercase tracking-wider">
        {label}
      </span>
      <span className="font-['Times_New_Roman',serif] text-sm">{value}</span>
    </div>
  );
}

export default function PricingSidebar() {
  const { state, result } = useCalculator();
  const isCustomer = state.quoteMode === "customer";
  const { currentDesign: design } = state;

  const chartData = [
    { name: "Gold", value: result.goldAmount, fill: CHART_COLORS.gold },
    { name: "Diamond", value: result.diamondCost, fill: CHART_COLORS.diamond },
    { name: "Stones", value: result.preciousStoneCost, fill: CHART_COLORS.stones },
    { name: "Making", value: result.makingChargesAmount, fill: CHART_COLORS.making },
    { name: "GST", value: result.gstAmount, fill: CHART_COLORS.gst },
  ].filter((d) => d.value > 0);

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <LuxuryCard variant="hero">
          <p className="font-['Arial',sans-serif] text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
            Pricing Summary
          </p>
          <h3 className="mt-1 font-['Times_New_Roman',serif] text-xl text-[#1a1a1a]">
            {design.name}
          </h3>
          <p className="text-xs text-[#717182]">
            {design.category} · {design.goldPurity}
          </p>

          <div className="mt-4 divide-y divide-black/5">
            {!isCustomer && (
              <>
                <PriceRow
                  label="Total Gold Weight"
                  value={formatWeight(result.totalGoldWeight)}
                />
                <PriceRow
                  label={`Gold Rate (${design.goldPurity})`}
                  value={`${formatCurrency(result.goldRate)}/g`}
                />
                <PriceRow label="Gold Amount" value={formatCurrency(result.goldAmount)} />
                <PriceRow label="Diamond Cost" value={formatCurrency(result.diamondCost)} />
                <PriceRow
                  label="Precious Stones"
                  value={formatCurrency(result.preciousStoneCost)}
                />
                <PriceRow
                  label="Making Charges"
                  value={formatCurrency(result.makingChargesAmount)}
                />
                {result.gstAmount > 0 && (
                  <PriceRow label="GST" value={formatCurrency(result.gstAmount)} />
                )}
                <PriceRow label="Subtotal" value={formatCurrency(result.subtotal)} muted />
              </>
            )}
          </div>
        </LuxuryCard>

        {!isCustomer && (
          <LuxuryCard>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#717182]">
              Total Cost Price
            </p>
            <p className="font-['Times_New_Roman',serif] text-2xl text-[#1a1a1a]">
              {formatCurrency(result.costPrice)}
            </p>
          </LuxuryCard>
        )}

        {!isCustomer && (
          <LuxuryCard>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#717182]">
              Selling Price
            </p>
            <p className="font-['Times_New_Roman',serif] text-2xl text-[#1a1a1a]">
              {formatCurrency(result.sellingPrice)}
            </p>
            <p className="mt-1 text-xs text-emerald-700">
              Margin: {formatCurrency(result.grossMargin)}
            </p>
          </LuxuryCard>
        )}

        <LuxuryCard variant="accent">
          <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-[#dccb7b]/80">
            {isCustomer ? "Your Estimate" : "Final Customer Price"}
          </p>
          <motion.p
            key={result.finalPrice}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="font-['Times_New_Roman',serif] text-3xl text-white"
          >
            {formatCurrency(result.finalPrice)}
          </motion.p>
        </LuxuryCard>

        {chartData.length > 0 && !isCustomer && (
          <LuxuryCard>
            <p className="mb-3 text-[10px] uppercase tracking-widest text-[#717182]">
              Price Breakdown
            </p>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #eee",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {chartData.map((d) => (
                <span
                  key={d.name}
                  className="inline-flex items-center gap-1 text-[10px] text-[#717182]"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: d.fill }}
                  />
                  {d.name}
                </span>
              ))}
            </div>
          </LuxuryCard>
        )}
      </motion.div>
    </aside>
  );
}
