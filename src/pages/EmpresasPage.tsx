import { useState } from "react";
import { Plus, Building2, Phone, Mail, MapPin, FileText, ClipboardList, Search as SearchIcon, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { empresasCompletas, type EmpresaCompleta } from "@/lib/mockDataExtended";
import { ordenesCumplimiento, estadoColors } from "@/lib/mockData";

export default function EmpresasPage() {
  const [search, setSearch] = useState("");
  const [ciudadFilter, setCiudadFilter] = useState("todos");
  const [sectorFilter, setSectorFilter] = useState("todos");
  const [selected, setSelected] = useState<EmpresaCompleta | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filtered = empresasCompletas.filter(e => {
    const matchSearch = e.nombre.toLowerCase().includes(search.toLowerCase()) || e.nit.includes(search);
    const matchCiudad = ciudadFilter === "todos" || e.ciudad === ciudadFilter;
    const matchSector = sectorFilter === "todos" || e.sector === sectorFilter;
    return matchSearch && matchCiudad && matchSector;
  });

  const ciudades = [...new Set(empresasCompletas.map(e => e.ciudad))];
  const sectores = [...new Set(empresasCompletas.map(e => e.sector))];

  const getCumplimientoColor = (v: number) => v >= 75 ? 'text-success' : v >= 50 ? 'text-warning' : 'text-destructive';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Empresas Clientes</h1>
          <p className="text-muted-foreground text-sm">{empresasCompletas.length} empresas registradas</p>
        </div>
        <Button variant="brand" onClick={() => setShowCreate(true)}><Plus size={16} className="mr-1" /> Nueva Empresa</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Buscar por nombre o NIT..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 flex-1" />
            <Select value={ciudadFilter} onValueChange={setCiudadFilter}>
              <SelectTrigger className="w-full sm:w-44 h-9"><SelectValue placeholder="Ciudad" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las ciudades</SelectItem>
                {ciudades.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-full sm:w-40 h-9"><SelectValue placeholder="Sector" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los sectores</SelectItem>
                {sectores.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(emp => (
          <Card key={emp.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(emp)}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-semibold text-sm leading-tight">{emp.nombre}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">NIT: {emp.nit}</p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">{emp.sector}</Badge>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={12} /> {emp.ciudad}
              </div>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{emp.contactoPrincipal.nombre}</span> · {emp.contactoPrincipal.email}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 border-t">
                <div className="text-center">
                  <p className="text-lg font-bold">{emp.ocActivas}</p>
                  <p className="text-[10px] text-muted-foreground">OC Activas</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium">{emp.ultimoInforme ? new Date(emp.ultimoInforme).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' }) : '—'}</p>
                  <p className="text-[10px] text-muted-foreground">Últ. Informe</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-bold ${getCumplimientoColor(emp.cumplimientoGeneral)}`}>{emp.cumplimientoGeneral}%</p>
                  <p className="text-[10px] text-muted-foreground">Cumplimiento</p>
                </div>
              </div>
              <Progress value={emp.cumplimientoGeneral} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display text-lg">{selected.nombre}</SheetTitle>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">NIT: {selected.nit}</p>
                  <div className="flex items-center gap-1 text-muted-foreground"><MapPin size={12} /> {selected.direccion}</div>
                  <Badge variant="outline" className="text-xs">{selected.sector}</Badge>
                </div>
              </SheetHeader>

              {/* Contact */}
              <Card className="mt-4">
                <CardContent className="p-4 space-y-2">
                  <h4 className="text-sm font-semibold">Contacto Principal</h4>
                  <p className="text-sm font-medium">{selected.contactoPrincipal.nombre}</p>
                  <p className="text-xs text-muted-foreground">{selected.contactoPrincipal.cargo}</p>
                  <div className="flex items-center gap-2 text-xs"><Phone size={12} className="text-muted-foreground" /> {selected.contactoPrincipal.telefono}</div>
                  <div className="flex items-center gap-2 text-xs"><Mail size={12} className="text-muted-foreground" /> {selected.contactoPrincipal.email}</div>
                </CardContent>
              </Card>

              {/* Compliance chart */}
              <Card className="mt-4">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Cumplimiento General</h4>
                    <span className={`text-xl font-bold ${getCumplimientoColor(selected.cumplimientoGeneral)}`}>{selected.cumplimientoGeneral}%</span>
                  </div>
                  {selected.cumplimientoPorSistema.map(s => (
                    <div key={s.sistema} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{s.sistema}</span>
                        <span className={`font-medium ${getCumplimientoColor(s.valor)}`}>{s.valor}%</span>
                      </div>
                      <Progress value={s.valor} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="oc" className="mt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="oc" className="flex-1 text-xs">OC</TabsTrigger>
                  <TabsTrigger value="visitas" className="flex-1 text-xs">Visitas</TabsTrigger>
                  <TabsTrigger value="hallazgos" className="flex-1 text-xs">Hallazgos</TabsTrigger>
                  <TabsTrigger value="informes" className="flex-1 text-xs">Informes</TabsTrigger>
                </TabsList>
                <TabsContent value="oc" className="mt-3 space-y-2">
                  {ordenesCumplimiento.filter(oc => oc.empresa.id === selected.id).map(oc => (
                    <Card key={oc.id}>
                      <CardContent className="p-3 flex items-center justify-between">
                        <div>
                          <p className="font-mono text-xs font-bold">{oc.codigo}</p>
                          <p className="text-xs text-muted-foreground">{oc.tipoAuditoria} · {oc.auditor}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${estadoColors[oc.estado]}`}>{oc.estado}</span>
                      </CardContent>
                    </Card>
                  ))}
                  {ordenesCumplimiento.filter(oc => oc.empresa.id === selected.id).length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Sin OC registradas</p>}
                </TabsContent>
                <TabsContent value="visitas" className="mt-3">
                  <div className="space-y-2">
                    {['10 Feb 2026 — SST — Completada', '07 Feb 2026 — PESV — Completada', '03 Feb 2026 — SST — Completada'].map((v, i) => (
                      <Card key={i}><CardContent className="p-3 text-sm">{v}</CardContent></Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="hallazgos" className="mt-3">
                  <div className="grid grid-cols-2 gap-2">
                    {[['NC Mayor', 2, 'destructive'], ['NC Menor', 3, 'warning'], ['Observación', 4, 'primary'], ['Op. Mejora', 1, 'success']].map(([label, count, color]) => (
                      <Card key={label as string}>
                        <CardContent className="p-3 text-center">
                          <p className="text-2xl font-bold">{count as number}</p>
                          <p className="text-[10px] text-muted-foreground">{label as string}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="informes" className="mt-3 space-y-2">
                  {['Informe Técnico SST — 10 Feb', 'Informe PESV — 08 Feb', 'Capacitación EPP — 06 Feb'].map((inf, i) => (
                    <Card key={i}><CardContent className="p-3 text-sm flex items-center justify-between">{inf}<Badge variant="outline" className="text-[10px]">PDF</Badge></CardContent></Card>
                  ))}
                </TabsContent>
              </Tabs>

              {selected.notas && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="text-sm font-semibold mb-1">Notas</h4>
                    <p className="text-sm text-muted-foreground">{selected.notas}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display">Nueva Empresa</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2"><Label>Nombre de la empresa</Label><Input placeholder="Ej: Constructora Caribe S.A.S." /></div>
              <div className="space-y-2"><Label>NIT</Label><Input placeholder="900.123.456-7" /></div>
              <div className="space-y-2"><Label>Ciudad</Label><Input placeholder="Barranquilla" /></div>
              <div className="space-y-2 col-span-2"><Label>Dirección</Label><Input placeholder="Cra 54 #72-120" /></div>
              <div className="space-y-2 col-span-2">
                <Label>Sector</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccionar sector" /></SelectTrigger>
                  <SelectContent>
                    {['Construcción', 'Logística', 'Transporte', 'Industrial', 'Servicios', 'Otro'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="border-t pt-4 space-y-3">
              <h4 className="text-sm font-semibold">Contacto Principal</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Nombre</Label><Input placeholder="María Fernanda López" /></div>
                <div className="space-y-2"><Label>Cargo</Label><Input placeholder="Coordinadora SST" /></div>
                <div className="space-y-2"><Label>Teléfono</Label><Input placeholder="300 123 4567" /></div>
                <div className="space-y-2"><Label>Email</Label><Input placeholder="mflopez@empresa.com" /></div>
              </div>
            </div>
            <div className="space-y-2"><Label>Notas</Label><Textarea placeholder="Observaciones adicionales..." rows={2} /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
              <Button variant="brand" onClick={() => setShowCreate(false)}>Guardar Empresa</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
