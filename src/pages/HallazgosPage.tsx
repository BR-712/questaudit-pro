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
  const [iaDecision, setIaDecision] = useState<'accepted' | 'editing' | 'rejected' | null>(null);

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

      {/* New Finding Wizard — 2 pasos: Evidencias → IA analiza todo → Validar */}
      <Dialog open={showWizard} onOpenChange={setShowWizard}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Nuevo Hallazgo</DialogTitle>
            <div className="flex items-center gap-2 mt-4">
              {[1, 2].map(step => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${wizardStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{step}</div>
                  <span className={`text-xs hidden sm:inline ${wizardStep >= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {step === 1 ? 'Cargar Evidencias' : 'Análisis IA y Validación'}
                  </span>
                  {step < 2 && <div className={`w-12 h-0.5 ${wizardStep > step ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </DialogHeader>

          {wizardStep === 1 && (
            <div className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">Sube las fotos o documentos de evidencia. La IA analizará automáticamente el contenido para generar la clasificación, descripción y recomendaciones del hallazgo.</p>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
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
                  <div key={i} className="relative aspect-square bg-muted rounded-md flex items-center justify-center group">
                    <Image size={20} className="text-muted-foreground" />
                    <span className="absolute bottom-1 left-1 text-[9px] text-muted-foreground bg-background/80 px-1 rounded">evidencia_{i}.jpg</span>
                    <button className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="brand" onClick={() => { setWizardStep(2); handleAnalyze(); }}>
                  <Brain size={14} className="mr-1" /> Analizar con IA
                </Button>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-4 mt-4">
              {iaLoading && (
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm font-medium">Analizando evidencias con IA...</p>
                    <p className="text-xs text-muted-foreground">Clasificando hallazgo, identificando normas y generando recomendaciones</p>
                  </CardContent>
                </Card>
              )}

              {iaResult && (
                <>
                  {/* Evidence preview */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2].map(i => (
                      <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                        <Image size={16} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>

                  {/* IA Result Card */}
                  <Card className="border-primary/50 shadow-sm">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center gap-2">
                        <Brain size={16} className="text-primary" />
                        <p className="text-sm font-semibold text-primary">Resultado del Análisis IA</p>
                        <Badge variant="outline" className="text-[10px] ml-auto">Análisis automático</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                          <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Clasificación</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-orange-50 text-orange-700 border-orange-200">No Conformidad Menor</span>
                        </div>
                        <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                          <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Nivel de Riesgo</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-yellow-50 text-yellow-700 border-yellow-200">Medio</span>
                        </div>
                        <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                          <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Área / Campo</p>
                          <p className="text-sm font-medium">Señalización</p>
                        </div>
                      </div>

                      <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                        <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Norma Aplicable</p>
                        <p className="text-sm font-medium">Res. 0312/2019 — Art. 25</p>
                        <p className="text-xs text-muted-foreground">Señalización, delimitación y demarcación de áreas</p>
                      </div>

                      <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                        <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Descripción del Hallazgo</p>
                        <p className="text-sm">Se evidencia la falta de señalización de seguridad en área de excavación activa. No se observan cintas de demarcación, conos ni avisos de peligro que adviertan al personal sobre los riesgos presentes en la zona de trabajo, incumpliendo lo establecido en la Res. 0312/2019, Art. 25.</p>
                      </div>

                      <div className="space-y-1 p-3 bg-muted/50 rounded-lg">
                        <p className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">Recomendaciones y Plan de Acción</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li>Instalar señalización vertical y horizontal en todas las zonas de excavación activa</li>
                          <li>Demarcar perímetro con cinta de seguridad reflectiva y conos a máximo 2 metros de distancia</li>
                          <li>Colocar avisos de peligro visibles con pictogramas según NTC 1461</li>
                          <li>Capacitar al personal en identificación y reporte de áreas sin señalización</li>
                          <li>Realizar inspecciones diarias antes del inicio de labores para verificar señalización</li>
                        </ul>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="success" size="sm" className="flex-1" onClick={() => setIaDecision('accepted')}>
                          <Check size={12} className="mr-1" /> Aceptar Análisis
                        </Button>
                        <Button variant="warning" size="sm" className="flex-1" onClick={() => setIaDecision('editing')}>
                          <Pencil size={12} className="mr-1" /> Editar
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1" onClick={() => setIaDecision('rejected')}>
                          <X size={12} className="mr-1" /> Rechazar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Editable fields — shown when accepted or editing */}
                  {(iaDecision === 'accepted' || iaDecision === 'editing') && (
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {iaDecision === 'accepted' ? '✅ Análisis aceptado — revisa antes de guardar' : '✏️ Edita los campos según tu criterio'}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Empresa</Label>
                            <Select defaultValue="emp1">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>{empresasUnicas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}</SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>OC / Visita vinculada</Label>
                            <Select defaultValue="oc1">
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="oc1">OC-2026-001</SelectItem>
                                <SelectItem value="oc2">OC-2026-002</SelectItem>
                                <SelectItem value="oc3">OC-2026-003</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {iaDecision === 'editing' && (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label>Clasificación</Label>
                                <Select defaultValue="ncmin">
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="ncm">No Conformidad Mayor</SelectItem>
                                    <SelectItem value="ncmin">No Conformidad Menor</SelectItem>
                                    <SelectItem value="obs">Observación</SelectItem>
                                    <SelectItem value="om">Oportunidad de Mejora</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Nivel de Riesgo</Label>
                                <Select defaultValue="medio">
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="alto">Alto</SelectItem>
                                    <SelectItem value="medio">Medio</SelectItem>
                                    <SelectItem value="bajo">Bajo</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Área / Campo</Label>
                                <Select defaultValue="Señalización">
                                  <SelectTrigger><SelectValue /></SelectTrigger>
                                  <SelectContent>{areasCampo.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Norma Aplicable</Label>
                              <Select defaultValue="Res. 0312/2019">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>{normasAplicables.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Descripción del hallazgo</Label>
                              <Textarea rows={3} defaultValue="Se evidencia la falta de señalización de seguridad en área de excavación activa. No se observan cintas de demarcación, conos ni avisos de peligro que adviertan al personal sobre los riesgos presentes en la zona de trabajo, incumpliendo lo establecido en la Res. 0312/2019, Art. 25." />
                            </div>
                            <div className="space-y-2">
                              <Label>Recomendaciones</Label>
                              <Textarea rows={4} defaultValue={"• Instalar señalización vertical y horizontal en todas las zonas de excavación activa\n• Demarcar perímetro con cinta de seguridad reflectiva y conos a máximo 2 metros de distancia\n• Colocar avisos de peligro visibles con pictogramas según NTC 1461\n• Capacitar al personal en identificación y reporte de áreas sin señalización\n• Realizar inspecciones diarias antes del inicio de labores para verificar señalización"} />
                            </div>
                          </>
                        )}
                        <div className="space-y-2">
                          <Label>Notas del auditor</Label>
                          <Textarea placeholder="Observaciones adicionales del auditor..." rows={2} />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Rejected — manual entry */}
                  {iaDecision === 'rejected' && (
                    <Card>
                      <CardContent className="p-4 space-y-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">❌ Análisis rechazado — completa manualmente</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Empresa</Label>
                            <Select><SelectTrigger><SelectValue placeholder="Seleccionar empresa" /></SelectTrigger>
                              <SelectContent>{empresasUnicas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}</SelectContent>
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
                          <Label>Clasificación</Label>
                          <RadioGroup className="grid grid-cols-2 gap-2">
                            {([['ncm', 'No Conformidad Mayor'], ['ncmin', 'No Conformidad Menor'], ['obs', 'Observación'], ['om', 'Oportunidad de Mejora']] as const).map(([val, label]) => (
                              <div key={val} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                                <RadioGroupItem value={val} id={`rej-${val}`} />
                                <Label htmlFor={`rej-${val}`} className="cursor-pointer flex-1 text-sm">{label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Nivel de Riesgo</Label>
                          <RadioGroup className="flex gap-3">
                            {([['alto', 'Alto', 'text-destructive'], ['medio', 'Medio', 'text-warning'], ['bajo', 'Bajo', 'text-success']] as const).map(([val, label, color]) => (
                              <div key={val} className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                                <RadioGroupItem value={val} id={`rej-riesgo-${val}`} />
                                <Label htmlFor={`rej-riesgo-${val}`} className={`cursor-pointer text-sm font-medium ${color}`}>{label}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Descripción del hallazgo</Label>
                          <Textarea placeholder="Describe el hallazgo encontrado..." rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label>Recomendaciones</Label>
                          <Textarea placeholder="Acciones correctivas y preventivas recomendadas..." rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label>Notas del auditor</Label>
                          <Textarea placeholder="Observaciones adicionales..." rows={2} />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Save button */}
                  {iaDecision && (
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => { setWizardStep(1); setIaResult(false); setIaDecision(null); }}>
                        Anterior
                      </Button>
                      <Button variant="brand" onClick={() => { setShowWizard(false); setIaDecision(null); }}>
                        Guardar Hallazgo
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
