import { BrowserRouter, Routes, Route } from "react-router";
import ContentProtectionProvider from "./components/protection/ContentProtectionProvider";
import HomePage from "./pages/HomePage";
import FineJewelleryPage from "./pages/FineJewelleryPage";
import CannesShowcase2026Page from "./pages/CannesShowcase2026Page";
import CalculatorPage from "./pages/CalculatorPage";

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
        <Route path="/calculator" element={<CalculatorPage />} />
      </Routes>
    </BrowserRouter>
    </ContentProtectionProvider>
  );
}
