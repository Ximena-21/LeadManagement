import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/carreras" element={<Navigate to="/home#carreras" replace />} />
    </Routes>
  );
}
