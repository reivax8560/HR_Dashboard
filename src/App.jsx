import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/dashboard/Dashboard";
import Employees from "./pages/employees/Employees";
import Absences from "./pages/absences/Absences";
import Services from "./pages/services/Services";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/absences" element={<Absences />} />
          <Route path="/services" element={<Services />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
