import { BrowserRouter, Routes, Route } from "react-router";
import ContentProtectionProvider from "./components/protection/ContentProtectionProvider";
import HomePage from "./pages/HomePage";
import FineJewelleryPage from "./pages/FineJewelleryPage";
import CannesShowcase2026Page from "./pages/CannesShowcase2026Page";
import MediaPage from "./pages/MediaPage";
import CalculatorPage from "./pages/CalculatorPage";
import LabGrownDiamondFaqPage from "./pages/LabGrownDiamondFaqPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <ContentProtectionProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/fine-jewellery/cannes-2026"
          element={<CannesShowcase2026Page />}
        />
        <Route path="/fine-jewellery" element={<FineJewelleryPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
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
