import { useEffect } from "react";
import { motion } from "motion/react";
import SiteNav from "../components/SiteNav";
import SiteCopyright from "../components/SiteCopyright";
import { CalculatorProvider } from "../calculator/context/CalculatorContext";
import GoldRatesBar from "../calculator/components/GoldRatesBar";
import DesignToolbar from "../calculator/components/DesignToolbar";
import QuoteModeToggle from "../calculator/components/QuoteModeToggle";
import ExportBar from "../calculator/components/ExportBar";
import JewelleryDetailsSection from "../calculator/components/JewelleryDetailsSection";
import GoldComponentsSection from "../calculator/components/GoldComponentsSection";
import DiamondSection from "../calculator/components/DiamondSection";
import PreciousStonesSection from "../calculator/components/PreciousStonesSection";
import ChargesSection from "../calculator/components/ChargesSection";
import BreakdownTables from "../calculator/components/BreakdownTables";
import VariantPanel from "../calculator/components/VariantPanel";
import HistoryPanel from "../calculator/components/HistoryPanel";
import CannesSketchPricingPanel from "../calculator/components/CannesSketchPricingPanel";
import PricingSidebar from "../calculator/components/PricingSidebar";

function CalculatorContent() {
  useEffect(() => {
    document.title = "Pricing Calculator | Bianca Diamonds";
    return () => {
      document.title = "Bianca Diamonds | Lab-Grown Diamond Fine Jewellery";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#faf8f5]" data-protected-page>
      <div className="bg-[#1d3c34]">
        <SiteNav />
      </div>

      <header className="border-b border-[#C9A962]/20 bg-white px-6 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mb-2 text-house-eyebrow text-gold-on-cream">
              Bianca Diamonds · Atelier Tools
            </p>
            <h1 className="text-house-title text-[clamp(1.75rem,4vw,2.5rem)] text-bianca-forest">
              Jewellery Pricing Calculator
            </h1>
            <p className="mt-3 max-w-2xl text-house-body text-on-cream-muted">
              Real-time bespoke pricing for gold, diamonds, and precious stones.
              Configure designs dynamically, compare variants, and generate
              customer quotations.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <QuoteModeToggle />
            <ExportBar />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8 space-y-6">
          <GoldRatesBar />
          <CannesSketchPricingPanel />
          <DesignToolbar />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <JewelleryDetailsSection />
            <GoldComponentsSection />
            <DiamondSection />
            <PreciousStonesSection />
            <ChargesSection />
            <BreakdownTables />
            <VariantPanel />
            <HistoryPanel />
          </div>
          <PricingSidebar />
        </div>
      </main>

      <footer className="border-t border-black/5 bg-white px-6 py-8 text-center">
        <p className="text-house-caption tracking-[0.3em] text-on-cream-subtle">
          Bianca Diamonds · Internal Pricing Tool · Delhi
        </p>
        <SiteCopyright className="mt-4 text-on-cream-subtle" />
      </footer>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}
