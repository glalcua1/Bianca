import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import AppErrorBoundary from "./components/AppErrorBoundary";
import ContentProtectionProvider from "./components/protection/ContentProtectionProvider";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";

const FineJewelleryPage = lazy(() => import("./pages/FineJewelleryPage"));
const CannesShowcase2026Page = lazy(
  () => import("./pages/CannesShowcase2026Page"),
);
const MediaPage = lazy(() => import("./pages/MediaPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const LabGrownDiamondFaqPage = lazy(
  () => import("./pages/LabGrownDiamondFaqPage"),
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BespokeJewelleryPage = lazy(
  () => import("./pages/BespokeJewelleryPage"),
);
const ButterflyCollectionPage = lazy(
  () => import("./pages/ButterflyCollectionPage"),
);
const GoldenRatioEvaluationPage = lazy(
  () => import("./pages/GoldenRatioEvaluationPage"),
);
const WhyChooseBiancaPage = lazy(
  () => import("./pages/WhyChooseBiancaPage"),
);
const DelhiNcrJewelleryPage = lazy(
  () => import("./pages/DelhiNcrJewelleryPage"),
);
const IndiaLabGrownJewelleryPage = lazy(
  () => import("./pages/IndiaLabGrownJewelleryPage"),
);
const ModernBridalJewelleryPage = lazy(
  () => import("./pages/ModernBridalJewelleryPage"),
);
const JewelleryPurchasePlanPage = lazy(
  () => import("./pages/JewelleryPurchasePlanPage"),
);
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("./pages/admin/AdminDashboardPage"),
);

function RouteFallback() {
  return (
    <div
      className="flex min-h-[100svh] items-center justify-center bg-[#faf8f5] text-[11px] uppercase tracking-[0.22em] text-[#1d3c34]/70"
      role="status"
      aria-live="polite"
    >
      <span className="font-editorial">Bianca Diamonds</span>
    </div>
  );
}

export default function App() {
  return (
    <ContentProtectionProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <AppErrorBoundary scope="this page">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/fine-jewellery/cannes-2026"
                element={<CannesShowcase2026Page />}
              />
              <Route
                path="/fine-jewellery/:category"
                element={<FineJewelleryPage />}
              />
              <Route path="/fine-jewellery" element={<FineJewelleryPage />} />
              <Route
                path="/bespoke-jewellery"
                element={<BespokeJewelleryPage />}
              />
              <Route
                path="/butterfly-collection"
                element={<ButterflyCollectionPage />}
              />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route
                path="/golden-ratio-evaluation"
                element={<GoldenRatioEvaluationPage />}
              />
              <Route
                path="/lab-grown-diamond-faq"
                element={<LabGrownDiamondFaqPage />}
              />
              <Route
                path="/why-bianca-diamonds"
                element={<WhyChooseBiancaPage />}
              />
              <Route
                path="/lab-grown-diamond-jewellery-delhi-ncr"
                element={<DelhiNcrJewelleryPage />}
              />
              <Route
                path="/lab-grown-diamond-jewellery-india"
                element={<IndiaLabGrownJewelleryPage />}
              />
              <Route
                path="/jewellery-for-modern-bride"
                element={<ModernBridalJewelleryPage />}
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/jewellery-purchase-plan"
                element={<JewelleryPurchasePlanPage />}
              />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </BrowserRouter>
    </ContentProtectionProvider>
  );
}
