import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { OfficialCatalogPage } from "@/pages/OfficialCatalogPage";

export default function App() {
  return (
    <Routes>
      {/* Standalone Full-Viewport Cinematic Verification Landing */}
      <Route path="/official" element={<OfficialCatalogPage />} />

      {/* Main Standard Layout Pages */}
      <Route path="/" element={<Layout />}>
        {/* Active Launch MVP Verification Home */}
        <Route index element={<HomePage />} />

        {/* Backward Compatibility & Hidden Page Redirects */}
        <Route path="san-pham" element={<Navigate to="/official" replace />} />
        <Route path="ve-desembre" element={<Navigate to="/" replace />} />
        <Route path="kien-thuc-da" element={<Navigate to="/" replace />} />
        <Route path="doi-tac" element={<Navigate to="/" replace />} />
        <Route path="lien-he" element={<Navigate to="/" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
