import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FineJewelleryPage from "./pages/FineJewelleryPage";
import CannesShowcase2026Page from "./pages/CannesShowcase2026Page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/fine-jewellery/cannes-2026"
          element={<CannesShowcase2026Page />}
        />
        <Route path="/fine-jewellery" element={<FineJewelleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
