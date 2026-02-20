import { Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      {/* Upload CSV Page */}
      <Route path="/" element={<UploadPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Catch All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}