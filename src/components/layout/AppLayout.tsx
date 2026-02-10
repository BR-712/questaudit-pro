import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, ClipboardList, Calendar, MapPin, Search,
  FileText, GraduationCap, Brain, Building2, Settings,
  Bell, ChevronLeft, ChevronRight, LogOut, User, Monitor,
} from "lucide-react";
import { QuestLogo } from "@/components/QuestLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Órdenes de Cumplimiento", icon: ClipboardList, to: "/ordenes" },
  { label: "Agenda", icon: Calendar, to: "/agenda" },
  { label: "Visitas", icon: MapPin, to: "/visitas" },
  { label: "Hallazgos", icon: Search, to: "/hallazgos" },
  { label: "Informes", icon: FileText, to: "/informes" },
  { label: "Capacitaciones", icon: GraduationCap, to: "/capacitaciones" },
  { label: "Gestión IA", icon: Brain, to: "/ia" },
  { label: "Empresas Clientes", icon: Building2, to: "/empresas" },
  { label: "Administración", icon: Settings, to: "/admin" },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground flex flex-col transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        } shrink-0`}
      >
        <div className={`flex items-center h-16 px-4 border-b border-sidebar-border ${collapsed ? "justify-center" : ""}`}>
          {collapsed ? (
            <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-sm">Q</span>
            </div>
          ) : (
            <QuestLogo size="sm" className="[&_span]:text-sidebar-foreground [&_.text-primary]:text-primary" />
          )}
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative group ${
                  isActive
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r" />
                )}
                <item.icon size={18} className={isActive ? "text-primary" : ""} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-2 rounded-md text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Buscar OC, empresa, hallazgo..."
              className="h-9 bg-muted/50"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">AM</AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <span className="text-sm font-medium hidden md:inline">Andrés Mejía</span>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem><User size={14} className="mr-2" /> Mi perfil</DropdownMenuItem>
                <DropdownMenuItem><Monitor size={14} className="mr-2" /> Mis sesiones</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"><LogOut size={14} className="mr-2" /> Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
