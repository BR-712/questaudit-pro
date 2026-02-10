import { useState } from "react";
import { Plus, LayoutList, LayoutGrid, Camera, FileUp, Paperclip, Image, Brain, Check, Pencil, X, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  hallazgos, tipoHallazgoColors, nivelRiesgoColors, estadoHallazgoColors,
  areasCampo, normasAplicables, type TipoHallazgo, type NivelRiesgo,
} from "@/lib/mockDataExtended";

type ViewMode = "list" | "grid";

export default function HallazgosPage() {
  const [view, setView] = useState<ViewMode>("list");
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState("todos");
  const [riesgoFilter, setRiesgoFilter] = useState("todos");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [empresaFilter, setEmpresaFilter] = useState("todos");
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [iaLoading, setIaLoading] = useState(false);
  const [iaResult, setIaResult] = useState(false);

  const filtered = hallazgos.filter(h => {
    const matchSearch = h.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      h.empresa.nombre.toLowerCase().includes(search.toLowerCase()) ||
      h.areaCampo.toLowerCase().includes(search.toLowerCase());
    const matchTipo = tipoFilter === "todos" || h.tipo === tipoFilter;
    const matchRiesgo = riesgoFilter === "todos" || h.nivelRiesgo === riesgoFilter;
    const matchEstado = estadoFilter === "todos" || h.estado === estadoFilter;
    const matchEmpresa = empresaFilter === "todos" || h.empresa.id === empresaFilter;
    return matchSearch && matchTipo && matchRiesgo && matchEstado && matchEmpresa;
  });

  const empresasUnicas = [...new Map(hallazgos.map(h => [h.empresa.id, h.empresa])).values()];

  const handleAnalyze = () => {
    setIaLoading(true);
    setTimeout(() => { setIaLoading(false); setIaResult(true); }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Hallazgos</h1>
          <p className="text-muted-foreground text-sm">{hallazgos.length} hallazgos registrados</p>
        </div>
        <Button variant="brand" onClick={() => { setShowWizard(true); setWizardStep(1); setIaResult(false); }}>
          <Plus size={16} className="mr-1" /> Nuevo Hallazgo
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <Input placeholder="Buscar por descripción, empresa, área..." value={search} onChange={e => setSearch(e.target.value)} className="h-9 flex-1" />
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full sm:w-48 h-9"><SelectValue placeholder="Clasificación" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las clasificaciones</SelectItem>
                <SelectItem value="No Conformidad Mayor">NC Mayor</SelectItem>
                <SelectItem value="No Conformidad Menor">NC Menor</SelectItem>
                <SelectItem value="Observación">Observación</SelectItem>
                <SelectItem value="Oportunidad de Mejora">Oportunidad de Mejora</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riesgoFilter} onValueChange={setRiesgoFilter}>
              <SelectTrigger className="w-full sm:w-36 h-9"><SelectValue placeholder="Riesgo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los niveles</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
                <SelectItem value="Medio">Medio</SelectItem>
                <SelectItem value="Bajo">Bajo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={estadoFilter} onValueChange={setEstadoFilter}>
              <SelectTrigger className="w-full sm:w-36 h-9"><SelectValue placeholder="Estado" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En Informe">En Informe</SelectItem>
                <SelectItem value="Cerrado">Cerrado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={empresaFilter} onValueChange={setEmpresaFilter}>
              <SelectTrigger className="w-full sm:w-52 h-9"><SelectValue placeholder="Empresa" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                {empresasUnicas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="flex gap-1 border rounded-md p-0.5">
              <Button variant={view === "list" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("list")}><LayoutList size={15} /></Button>
              <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={() => setView("grid")}><LayoutGrid size={15} /></Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      {view === "list" ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30 text-muted-foreground">
                    <th className="text-left py-3 px-4 font-medium">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium">Empresa</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Área</th>
                    <th className="text-left py-3 px-4 font-medium">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Descripción</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Evidencias</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Norma</th>
                    <th className="text-left py-3 px-4 font-medium">Riesgo</th>
                    <th className="text-left py-3 px-4 font-medium hidden md:table-cell">IA</th>
                    <th className="text-left py-3 px-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(h => (
                    <tr key={h.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="py-3 px-4 text-sm">{new Date(h.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-sm">{h.empresa.nombre}</div>
                        <div className="text-xs text-muted-foreground">{h.visitaCodigo}</div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-sm">{h.areaCampo}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${tipoHallazgoColors[h.tipo]}`}>
                          {h.tipo === 'No Conformidad Mayor' ? 'NCM' : h.tipo === 'No Conformidad Menor' ? 'NCm' : h.tipo === 'Observación' ? 'Obs' : 'OM'}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell"><p className="text-sm truncate max-w-[250px]">{h.descripcion}</p></td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex gap-1">
                          {h.tieneEvidenciaFoto && <Camera size={14} className="text-muted-foreground" />}
                          {h.tieneEvidenciaDoc && <Paperclip size={14} className="text-muted-foreground" />}
                          {!h.tieneEvidenciaFoto && !h.tieneEvidenciaDoc && <span className="text-xs text-muted-foreground">—</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-xs">{h.norma}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${nivelRiesgoColors[h.nivelRiesgo]}`}>{h.nivelRiesgo}</span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        {h.analizadoPorIA ? <Check size={14} className="text-success" /> : <span className="text-xs text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${estadoHallazgoColors[h.estado]}`}>{h.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(h => (
            <Card key={h.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="h-32 bg-muted flex items-center justify-center">
                  {h.tieneEvidenciaFoto ? (
                    <Image size={32} className="text-muted-foreground" />
                  ) : h.tieneEvidenciaDoc ? (
                    <Paperclip size={32} className="text-muted-foreground" />
                  ) : (
                    <div className="text-xs text-muted-foreground">Sin evidencia</div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${tipoHallazgoColors[h.tipo]}`}>
                      {h.tipo === 'No Conformidad Mayor' ? 'NCM' : h.tipo === 'No Conformidad Menor' ? 'NCm' : h.tipo === 'Observación' ? 'Obs' : 'OM'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${nivelRiesgoColors[h.nivelRiesgo]}`}>{h.nivelRiesgo}</span>
                    {h.analizadoPorIA && <Brain size={12} className="text-primary" />}
                  </div>
                  <p className="text-sm font-medium">{h.empresa.nombre}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{h.descripcion}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{new Date(h.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    <Badge variant="outline" className="text-[10px]">{h.norma}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* New Finding Wizard */}
      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Nuevo Hallazgo</DialogTitle>
            {/* Stepper */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${wizardStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{step}</div>
                  <span className={`text-xs hidden sm:inline ${wizardStep >= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {step === 1 ? 'Evidencias' : step === 2 ? 'Clasificación' : 'Análisis IA'}
                  </span>
                  {step < 3 && <div className={`w-8 h-0.5 ${wizardStep > step ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </DialogHeader>

          {wizardStep === 1 && (
            <div className="space-y-4 mt-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload size={32} className="mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Arrastra archivos aquí o selecciona</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, XLSX, XML, JPG, PNG</p>
                <div className="flex gap-3 justify-center mt-4">
                  <Button variant="outline" size="sm"><Camera size={14} className="mr-1" /> Tomar Foto</Button>
                  <Button variant="outline" size="sm"><FileUp size={14} className="mr-1" /> Cargar Documento</Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2].map(i => (
                  <div key={i} className="relative aspect-square bg-muted rounded-md flex items-center justify-center">
                    <Image size={20} className="text-muted-foreground" />
                    <button className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end"><Button variant="brand" onClick={() => setWizardStep(2)}>Siguiente</Button></div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Empresa</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Seleccionar empresa" /></SelectTrigger>
                    <SelectContent>{[...new Map(hallazgos.map(h => [h.empresa.id, h.empresa])).values()].map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>OC / Visita vinculada</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Seleccionar OC" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oc1">OC-2026-001</SelectItem>
                      <SelectItem value="oc2">OC-2026-002</SelectItem>
                      <SelectItem value="oc3">OC-2026-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Área / Campo</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Seleccionar área" /></SelectTrigger>
                    <SelectContent>{areasCampo.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Norma Aplicable</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Seleccionar norma" /></SelectTrigger>
                    <SelectContent>{normasAplicables.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Hallazgo</Label>
                <RadioGroup defaultValue="ncm" className="grid grid-cols-2 gap-2">
                  {([['ncm', 'No Conformidad Mayor', 'destructive'], ['ncmin', 'No Conformidad Menor', 'warning'], ['obs', 'Observación', 'primary'], ['om', 'Oportunidad de Mejora', 'success']] as const).map(([val, label, color]) => (
                    <div key={val} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value={val} id={val} />
                      <Label htmlFor={val} className="cursor-pointer flex-1 text-sm">{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Artículo / Requisito</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccionar artículo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="art16">Art. 16</SelectItem>
                    <SelectItem value="art25">Art. 25</SelectItem>
                    <SelectItem value="art11">Art. 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Nivel de Riesgo</Label>
                <RadioGroup defaultValue="medio" className="flex gap-3">
                  {([['alto', 'Alto', 'text-destructive'], ['medio', 'Medio', 'text-warning'], ['bajo', 'Bajo', 'text-success']] as const).map(([val, label, color]) => (
                    <div key={val} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                      <RadioGroupItem value={val} id={`riesgo-${val}`} />
                      <Label htmlFor={`riesgo-${val}`} className={`cursor-pointer text-sm font-medium ${color}`}>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setWizardStep(1)}>Anterior</Button>
                <Button variant="brand" onClick={() => setWizardStep(3)}>Siguiente</Button>
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Evidence preview */}
                <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                  <Image size={48} className="text-muted-foreground" />
                </div>
                {/* IA Analysis */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Prompt de IA</Label>
                    <Select defaultValue="sst">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sst">Predeterminado SST</SelectItem>
                        <SelectItem value="calidad">Predeterminado Calidad</SelectItem>
                        <SelectItem value="pesv">Predeterminado PESV</SelectItem>
                        <SelectItem value="custom">Prompt personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="brand" className="w-full" onClick={handleAnalyze} disabled={iaLoading}>
                    <Brain size={14} className="mr-1" /> {iaLoading ? 'Analizando...' : 'Analizar con IA'}
                  </Button>
                  {iaResult && (
                    <Card className="border-primary/50">
                      <CardContent className="p-3 space-y-2">
                        <p className="text-xs font-medium text-primary">Resultado del análisis</p>
                        <p className="text-sm"><strong>Descripción:</strong> Falta de señalización de seguridad en área de excavación activa según Res. 0312/2019.</p>
                        <p className="text-sm"><strong>Clasificación:</strong> No Conformidad Menor</p>
                        <p className="text-sm"><strong>Norma:</strong> Res. 0312/2019 — Art. 25</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="success" size="sm"><Check size={12} className="mr-1" /> Aceptar</Button>
                          <Button variant="warning" size="sm"><Pencil size={12} className="mr-1" /> Editar</Button>
                          <Button variant="destructive" size="sm"><X size={12} className="mr-1" /> Rechazar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción del hallazgo</Label>
                <Textarea placeholder="Describe el hallazgo encontrado..." rows={3} defaultValue={iaResult ? 'Falta de señalización de seguridad en área de excavación activa según Res. 0312/2019.' : ''} />
              </div>
              <div className="space-y-2">
                <Label>Notas del auditor</Label>
                <Textarea placeholder="Observaciones adicionales..." rows={2} />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setWizardStep(2)}>Anterior</Button>
                <Button variant="brand" onClick={() => setShowWizard(false)}>Guardar Hallazgo</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
