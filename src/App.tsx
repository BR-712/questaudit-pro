import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import OrdenesPage from "./pages/OrdenesPage";
import AgendaPage from "./pages/AgendaPage";
import VisitasPage from "./pages/VisitasPage";
import HallazgosPage from "./pages/HallazgosPage";
import InformesPage from "./pages/InformesPage";
import EmpresasPage from "./pages/EmpresasPage";
import CapacitacionesPage from "./pages/CapacitacionesPage";
import GestionIAPage from "./pages/GestionIAPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ordenes" element={<OrdenesPage />} />
            <Route path="/agenda" element={<AgendaPage />} />
            <Route path="/visitas" element={<VisitasPage />} />
            <Route path="/hallazgos" element={<HallazgosPage />} />
            <Route path="/informes" element={<InformesPage />} />
            <Route path="/capacitaciones" element={<CapacitacionesPage />} />
            <Route path="/ia" element={<GestionIAPage />} />
            <Route path="/empresas" element={<EmpresasPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
