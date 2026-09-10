import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { AboutPage } from "@/pages/AboutPage";
import { KnowledgePage } from "@/pages/KnowledgePage";
import { PartnerPage } from "@/pages/PartnerPage";
import { ContactPage } from "@/pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="san-pham" element={<CatalogPage />} />
        <Route path="ve-desembre" element={<AboutPage />} />
        <Route path="kien-thuc-da" element={<KnowledgePage />} />
        <Route path="doi-tac" element={<PartnerPage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
