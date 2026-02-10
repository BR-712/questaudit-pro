import { useState } from "react";
import { Plus, LayoutList, Columns, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ordenesCumplimiento, estadoColors } from "@/lib/mockData";

type ViewMode = "list" | "kanban";

const kanbanColumns = [
  'Pendiente', 'En Progreso', 'Informe Generado', 'Cumplida', 'Cerrada', 'Vencida'
] as const;

export default function OrdenesPage() {
  const [view, setView] = useState<ViewMode>("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<string>("todos");
  const [tipoFilter, setTipoFilter] = useState<string>("todos");

  const filtered = ordenesCumplimiento.filter(oc => {
    const matchSearch = oc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      oc.empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = estadoFilter === "todos" || oc.estado === estadoFilter;
    const matchTipo = tipoFilter === "todos" || oc.tipoAuditoria === tipoFilter;
    return matchSearch && matchEstado && matchTipo;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Órdenes de Cumplimiento</h1>
          <p className="text-muted-foreground text-sm">{ordenesCumplimiento.length} órdenes en total</p>
        </div>
        <Button variant="brand" className="shrink-0">
          <Plus size={16} className="mr-1" /> Nueva OC
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <Input
                placeholder="Buscar por código o empresa..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-9"
              />
            </div>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-44 h-9">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                {kanbanColumns.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full sm:w-40 h-9">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="SST">SST</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="PESV">PESV</SelectItem>
                <SelectItem value="ISO 28000">ISO 28000</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1 border rounded-md p-0.5">
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("list")}>
                <LayoutList size={15} />
              </Button>
              <Button variant={view === "kanban" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("kanban")}>
                <Columns size={15} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {view === "list" ? (
        /* Table view */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-muted-foreground">
                    <th className="text-left py-3 px-4 font-medium">Código</th>
                    <th className="text-left py-3 px-4 font-medium">Empresa</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Auditor</th>
                    <th className="text-left py-3 px-4 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Fecha Límite</th>
                    <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Progreso</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((oc) => {
                    const isOverdue = new Date(oc.fechaLimite) < new Date() && oc.estado !== 'Cerrada' && oc.estado !== 'Cumplida';
                    const progress = Math.round((oc.horasConsumidas / oc.horasProgramadas) * 100);
                    return (
                      <tr key={oc.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                        <td className="py-3 px-4 font-mono text-xs font-semibold">{oc.codigo}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium">{oc.empresa.nombre}</div>
                          <div className="text-xs text-muted-foreground">{oc.empresa.ciudad}</div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <Badge variant="outline" className="text-xs">{oc.tipoAuditoria}</Badge>
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell text-sm">{oc.auditor}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${estadoColors[oc.estado]}`}>
                            {oc.estado}
                          </span>
                        </td>
                        <td className={`py-3 px-4 hidden md:table-cell text-sm ${isOverdue ? "text-destructive font-semibold" : ""}`}>
                          {new Date(oc.fechaLimite).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2 min-w-[120px]">
                            <Progress value={progress} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground w-12">{oc.horasConsumidas}/{oc.horasProgramadas}h</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Kanban view */
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto">
          {kanbanColumns.map(col => {
            const items = filtered.filter(oc => oc.estado === col);
            return (
              <div key={col} className="min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${estadoColors[col]}`}>
                    {col}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map(oc => (
                    <Card key={oc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-3 space-y-2">
                        <div className="font-mono text-xs font-bold">{oc.codigo}</div>
                        <div className="text-sm font-medium leading-tight">{oc.empresa.nombre}</div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">{oc.tipoAuditoria}</Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(oc.fechaLimite).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground">Sin órdenes</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
