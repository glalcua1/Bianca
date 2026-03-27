import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import FineJewelleryPage from "./pages/FineJewelleryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fine-jewellery" element={<FineJewelleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
