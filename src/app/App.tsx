import { BrowserRouter, Routes, Route } from "react-router";
import { Analytics } from "@vercel/analytics/react";
import ContentProtectionProvider from "./components/protection/ContentProtectionProvider";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import FineJewelleryPage from "./pages/FineJewelleryPage";
import CannesShowcase2026Page from "./pages/CannesShowcase2026Page";
import MediaPage from "./pages/MediaPage";
import CalculatorPage from "./pages/CalculatorPage";
import LabGrownDiamondFaqPage from "./pages/LabGrownDiamondFaqPage";
import ContactPage from "./pages/ContactPage";
import BespokeJewelleryPage from "./pages/BespokeJewelleryPage";
import ButterflyCollectionPage from "./pages/ButterflyCollectionPage";
import GoldenRatioEvaluationPage from "./pages/GoldenRatioEvaluationPage";

export default function App() {
  return (
    <ContentProtectionProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/fine-jewellery/cannes-2026"
          element={<CannesShowcase2026Page />}
        />
        <Route path="/fine-jewellery" element={<FineJewelleryPage />} />
        <Route path="/bespoke-jewellery" element={<BespokeJewelleryPage />} />
        <Route path="/butterfly-collection" element={<ButterflyCollectionPage />} />
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
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
    </ContentProtectionProvider>
  );
}
