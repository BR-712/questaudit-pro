import { useState } from "react";
import { Plus, Eye, Play, MapPin, Phone, Clock, FileText, CheckSquare, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { visitasCompletas, type VisitaCompleta } from "@/lib/mockDataExtended";
import { estadoColors } from "@/lib/mockData";

const visitaEstadoColors: Record<string, string> = {
  'Programada': 'bg-muted text-muted-foreground',
  'En Curso': 'bg-primary/15 text-primary border-primary/30',
  'Completada': 'bg-success/15 text-success border-success/30',
  'Reprogramada': 'bg-warning/15 text-warning border-warning/30',
};

export default function VisitasPage() {
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [empresaFilter, setEmpresaFilter] = useState("todos");
  const [selected, setSelected] = useState<VisitaCompleta | null>(null);

  const filtered = visitasCompletas.filter(v => {
    const matchSearch = v.empresa.nombre.toLowerCase().includes(search.toLowerCase()) ||
      v.ocVinculada.toLowerCase().includes(search.toLowerCase()) ||
      v.direccion.toLowerCase().includes(search.toLowerCase());
    const matchEstado = estadoFilter === "todos" || v.estado === estadoFilter;
    const matchTipo = tipoFilter === "todos" || v.tipoAuditoria === tipoFilter;
    const matchEmpresa = empresaFilter === "todos" || v.empresa.id === empresaFilter;
    return matchSearch && matchEstado && matchTipo && matchEmpresa;
  });

  const empresasUnicas = [...new Map(visitasCompletas.map(v => [v.empresa.id, v.empresa])).values()];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Visitas</h1>
          <p className="text-muted-foreground text-sm">{visitasCompletas.length} visitas registradas</p>
        </div>
        <Button variant="brand"><Plus size={16} className="mr-1" /> Nueva Visita</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Buscar por empresa, OC, dirección..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 flex-1" />
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-44 h-9"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Programada">Programada</SelectItem>
                <SelectItem value="En Curso">En Curso</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
                <SelectItem value="Reprogramada">Reprogramada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full sm:w-40 h-9"><SelectValue placeholder="Tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="SST">SST</SelectItem>
                <SelectItem value="Calidad">Calidad</SelectItem>
                <SelectItem value="PESV">PESV</SelectItem>
                <SelectItem value="ISO 28000">ISO 28000</SelectItem>
              </SelectContent>
            </Select>
            <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
              <SelectTrigger className="w-full sm:w-52 h-9"><SelectValue placeholder="Empresa" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las empresas</SelectItem>
                {empresasUnicas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30 text-muted-foreground">
                  <th className="text-left py-3 px-4 font-medium">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium">Hora</th>
                  <th className="text-left py-3 px-4 font-medium">Empresa</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">OC Vinculada</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Auditor</th>
                  <th className="text-left py-3 px-4 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Hallazgos</th>
                  <th className="text-left py-3 px-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 text-sm">{new Date(v.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}</td>
                    <td className="py-3 px-4 font-mono text-xs">{v.hora}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-sm">{v.empresa.nombre}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]">{v.direccion}</div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="font-mono text-xs font-semibold text-primary cursor-pointer hover:underline">{v.ocVinculada}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell"><Badge variant="outline" className="text-xs">{v.tipoAuditoria}</Badge></td>
                    <td className="py-3 px-4 hidden lg:table-cell text-sm">{v.auditor}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${visitaEstadoColors[v.estado]}`}>{v.estado}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-center">
                      <span className={`font-semibold ${v.hallazgosCount > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{v.hallazgosCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(v)}><Eye size={14} /></Button>
                        {v.estado === 'Programada' && <Button variant="ghost" size="icon" className="h-8 w-8 text-primary"><Play size={14} /></Button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <DialogTitle className="text-xl font-display">{selected.empresa.nombre}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selected.fecha} · {selected.hora} · {selected.ocVinculada}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${visitaEstadoColors[selected.estado]}`}>{selected.estado}</span>
                    {selected.estado === 'Programada' && <Button variant="brand" size="sm"><Play size={14} className="mr-1" /> Iniciar Visita</Button>}
                    {selected.estado === 'En Curso' && <Button variant="destructive" size="sm">Finalizar Visita</Button>}
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2">
                  <Tabs defaultValue="info">
                    <TabsList>
                      <TabsTrigger value="info">Información</TabsTrigger>
                      <TabsTrigger value="hallazgos">Hallazgos ({selected.hallazgosCount})</TabsTrigger>
                      <TabsTrigger value="checklist">Checklist</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Tipo de Auditoría</p>
                          <Badge variant="outline">{selected.tipoAuditoria}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Auditor Asignado</p>
                          <p className="text-sm font-medium">{selected.auditor}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Duración Programada</p>
                          <p className="text-sm font-medium">{selected.duracionHoras} horas</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">OC Vinculada</p>
                          <p className="text-sm font-mono font-semibold text-primary">{selected.ocVinculada}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Dirección</p>
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                          <p className="text-sm">{selected.direccion}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Notas</p>
                        <p className="text-sm">{selected.notas}</p>
                      </div>
                    </TabsContent>
                    <TabsContent value="hallazgos" className="mt-4">
                      {selected.hallazgosCount > 0 ? (
                        <div className="space-y-3">
                          {Array.from({ length: selected.hallazgosCount }).map((_, i) => (
                            <Card key={i}>
                              <CardContent className="p-3 flex items-start gap-3">
                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center shrink-0">
                                  <AlertTriangle size={18} className="text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className="text-[10px]">{i % 2 === 0 ? 'NC Mayor' : 'Observación'}</Badge>
                                    <Badge variant="outline" className="text-[10px]">{i % 3 === 0 ? 'Alto' : 'Medio'}</Badge>
                                  </div>
                                  <p className="text-sm truncate">Hallazgo #{i + 1} registrado durante la visita</p>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground text-sm">No hay hallazgos registrados en esta visita.</div>
                      )}
                    </TabsContent>
                    <TabsContent value="checklist" className="mt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm font-medium">Progreso del checklist</p>
                          <span className="text-sm text-muted-foreground">{selected.estado === 'Completada' ? '100' : '45'}%</span>
                        </div>
                        <Progress value={selected.estado === 'Completada' ? 100 : 45} className="h-2" />
                        <div className="mt-4 space-y-2">
                          {['Documentación general', 'Identificación de peligros', 'Controles operacionales', 'Equipos de protección', 'Gestión de emergencias'].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                              <CheckSquare size={16} className={i < 3 || selected.estado === 'Completada' ? 'text-success' : 'text-muted-foreground'} />
                              <span className="text-sm">{item}</span>
                              <Badge variant="outline" className="ml-auto text-[10px]">{i < 3 || selected.estado === 'Completada' ? 'Cumple' : 'Pendiente'}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right sidebar summary */}
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <h4 className="text-sm font-display font-semibold">Resumen</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Normativas:</span>
                        </div>
                        <p className="text-xs ml-6">{selected.tipoAuditoria === 'SST' ? 'Res. 0312/2019, D. 1072/2015' : selected.tipoAuditoria === 'PESV' ? 'Res. 40595/2022' : selected.tipoAuditoria === 'ISO 28000' ? 'ISO 28000:2022' : 'ISO 9001:2015'}</p>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Horas: {selected.duracionHoras}h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Contacto:</span>
                        </div>
                        <div className="ml-6">
                          <p className="text-xs font-medium">{selected.contactoEmpresa}</p>
                          <p className="text-xs text-muted-foreground">{selected.telefonoContacto}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
