import { useState } from "react";
import { Brain, Plus, Lock, Search, Camera, FileText, Sparkles, BarChart3, TrendingUp, Clock, CheckCircle, XCircle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { promptsIA, analisisIA, tipoAuditoriaPromptColors, decisionColors } from "@/lib/mockDataModules";

const variables = ['{tipo_auditoria}', '{norma}', '{area_campo}', '{tipo_hallazgo}'];

const aceptacionPorTipo = [
  { name: 'Predeterminados', aceptacion: 79, usos: 376 },
  { name: 'Organización', aceptacion: 88, usos: 84 },
  { name: 'Personales', aceptacion: 88, usos: 15 },
];

const analisisPorSemana = [
  { semana: 'S1 Ene', analisis: 12 },
  { semana: 'S2 Ene', analisis: 18 },
  { semana: 'S3 Ene', analisis: 15 },
  { semana: 'S4 Ene', analisis: 22 },
  { semana: 'S1 Feb', analisis: 28 },
  { semana: 'S2 Feb', analisis: 20 },
  { semana: 'S3 Feb', analisis: 25 },
  { semana: 'S4 Feb', analisis: 14 },
];

export default function GestionIAPage() {
  const [promptTab, setPromptTab] = useState("predeterminados");
  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedAnalisis, setSelectedAnalisis] = useState<typeof analisisIA[0] | null>(null);
  const [promptText, setPromptText] = useState('');
  const [filterDecision, setFilterDecision] = useState("todas");

  const predeterminados = promptsIA.filter(p => p.categoria === 'predeterminado');
  const organizacion = promptsIA.filter(p => p.categoria === 'organizacion');
  const personales = promptsIA.filter(p => p.categoria === 'personal');

  const filteredAnalisis = filterDecision === 'todas'
    ? analisisIA
    : analisisIA.filter(a => a.decision === filterDecision);

  const totalAnalisis = analisisIA.length;
  const aceptados = analisisIA.filter(a => a.decision === 'Aceptada').length;
  const tasaGlobal = Math.round((aceptados / totalAnalisis) * 100);
  const promptMasEfectivo = promptsIA.reduce((a, b) => a.tasaAceptacion > b.tasaAceptacion ? a : b);

  const topPrompts = [...promptsIA].sort((a, b) => b.tasaAceptacion - a.tasaAceptacion).slice(0, 5);

  const insertVariable = (v: string) => setPromptText(prev => prev + ' ' + v);

  const getEvidenciaIcon = (tipo: string) => {
    if (tipo === 'Foto') return <Camera size={14} className="text-info" />;
    return <FileText size={14} className="text-warning" />;
  };

  const formatDate = (d: string) => {
    const parts = d.split(' ');
    const date = new Date(parts[0] + 'T12:00:00');
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) + (parts[1] ? ` ${parts[1]}` : '');
  };

  const renderPromptCards = (prompts: typeof promptsIA, locked = false) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prompts.map(p => (
        <Card key={p.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-sm flex items-center gap-1.5">
                {locked && <Lock size={12} className="text-muted-foreground" />}
                {p.nombre}
              </h3>
              <Badge className={`${tipoAuditoriaPromptColors[p.tipoAuditoria]} text-[10px]`}>{p.tipoAuditoria}</Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{p.descripcion}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Sparkles size={12} className="text-primary" /> {p.tasaAceptacion}% aceptación</span>
              <span>{p.vecesUsado} usos</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Editado: {new Date(p.ultimaEdicion + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Gestión IA</h1>
          <p className="text-muted-foreground text-sm">Biblioteca de prompts, historial de análisis y métricas de rendimiento</p>
        </div>
      </div>

      <Tabs defaultValue="biblioteca">
        <TabsList>
          <TabsTrigger value="biblioteca" className="gap-2"><Brain size={14} /> Biblioteca de Prompts</TabsTrigger>
          <TabsTrigger value="historial" className="gap-2"><Clock size={14} /> Historial de Análisis</TabsTrigger>
          <TabsTrigger value="metricas" className="gap-2"><BarChart3 size={14} /> Métricas</TabsTrigger>
        </TabsList>

        <TabsContent value="biblioteca" className="space-y-4">
          <div className="flex items-center justify-between">
            <Tabs value={promptTab} onValueChange={setPromptTab}>
              <TabsList>
                <TabsTrigger value="predeterminados">Predeterminados <Badge className="ml-1.5 bg-secondary text-secondary-foreground text-[10px]">Sistema</Badge></TabsTrigger>
                <TabsTrigger value="organizacion">De mi organización</TabsTrigger>
                <TabsTrigger value="personales">Mis Prompts</TabsTrigger>
              </TabsList>
            </Tabs>
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button variant="brand" size="sm" className="gap-1"><Plus size={14} /> Crear Nuevo Prompt</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Crear Nuevo Prompt</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Nombre del prompt</Label><Input placeholder="Ej: Análisis de EPP en obra" /></div>
                  <div><Label>Tipo de auditoría</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
                      <SelectContent>
                        {['SST','Calidad','PESV','ISO 28000','General'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Texto del prompt</Label>
                    <div className="flex gap-1.5 mt-1 mb-2 flex-wrap">
                      {variables.map(v => (
                        <button key={v} onClick={() => insertVariable(v)}
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-mono">
                          {v}
                        </button>
                      ))}
                    </div>
                    <Textarea value={promptText} onChange={e => setPromptText(e.target.value)} rows={6}
                      placeholder="Analiza la siguiente evidencia de una auditoría de {tipo_auditoria}..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="share" />
                    <Label htmlFor="share" className="text-sm">Compartir con mi organización</Label>
                  </div>
                  {promptText && (
                    <div>
                      <Label className="text-sm">Vista previa</Label>
                      <Card className="mt-1 border-primary/20">
                        <CardContent className="p-3 text-sm text-muted-foreground">
                          {promptText
                            .replace('{tipo_auditoria}', 'SST')
                            .replace('{norma}', 'Res. 0312/2019')
                            .replace('{area_campo}', 'EPP')
                            .replace('{tipo_hallazgo}', 'No Conformidad Mayor')}
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancelar</Button>
                    <Button variant="brand" onClick={() => setCreateOpen(false)}>Guardar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {promptTab === 'predeterminados' && renderPromptCards(predeterminados, true)}
          {promptTab === 'organizacion' && renderPromptCards(organizacion)}
          {promptTab === 'personales' && renderPromptCards(personales)}
        </TabsContent>

        <TabsContent value="historial" className="space-y-4">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar análisis..." className="pl-9 h-9" />
            </div>
            <Select value={filterDecision} onValueChange={setFilterDecision}>
              <SelectTrigger className="w-40 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las decisiones</SelectItem>
                <SelectItem value="Aceptada">Aceptada</SelectItem>
                <SelectItem value="Modificada">Modificada</SelectItem>
                <SelectItem value="Rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Evidencia</TableHead>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Hallazgo</TableHead>
                    <TableHead className="max-w-[200px]">Respuesta IA</TableHead>
                    <TableHead>Decisión</TableHead>
                    <TableHead>Auditor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnalisis.map(a => (
                    <TableRow key={a.id} className="cursor-pointer hover:bg-muted/50" onClick={() => { setSelectedAnalisis(a); setDetailOpen(true); }}>
                      <TableCell className="text-xs">{formatDate(a.fecha)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          {getEvidenciaIcon(a.tipoEvidencia)}
                          <span className="text-xs">{a.tipoEvidencia}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs max-w-[120px] truncate">{a.promptUtilizado}</TableCell>
                      <TableCell className="text-xs">{a.hallazgoVinculado || '—'}</TableCell>
                      <TableCell className="text-xs max-w-[200px] truncate">{a.respuestaIA}</TableCell>
                      <TableCell><Badge className={`${decisionColors[a.decision]} text-[10px]`}>{a.decision}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Avatar className="h-5 w-5"><AvatarFallback className="text-[8px] bg-primary text-primary-foreground">{a.auditor.split(' ').map(n=>n[0]).join('').slice(0,2)}</AvatarFallback></Avatar>
                          <span className="text-xs truncate max-w-[80px]">{a.auditor.split(' ').slice(0,2).join(' ')}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metricas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card><CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Total análisis</p>
              <p className="text-3xl font-bold font-display">{totalAnalisis}</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Tasa aceptación global</p>
              <p className="text-3xl font-bold font-display text-success">{tasaGlobal}%</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Prompt más efectivo</p>
              <p className="text-sm font-semibold mt-1">{promptMasEfectivo.nombre}</p>
              <p className="text-xs text-primary">{promptMasEfectivo.tasaAceptacion}%</p>
            </CardContent></Card>
            <Card><CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">Tiempo promedio IA</p>
              <p className="text-3xl font-bold font-display">3.2s</p>
            </CardContent></Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Aceptación por tipo de prompt</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={aceptacionPorTipo}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="aceptacion" fill="hsl(var(--primary))" radius={[4,4,0,0]} name="Aceptación %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2"><CardTitle className="text-sm">Análisis por semana</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={analisisPorSemana}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="analisis" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} name="Análisis" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Top 5 prompts más efectivos</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-center">Tasa aceptación</TableHead>
                    <TableHead className="text-center">Usos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPrompts.map((p, i) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-bold text-primary">{i + 1}</TableCell>
                      <TableCell className="font-medium text-sm">{p.nombre}</TableCell>
                      <TableCell><Badge className={`${tipoAuditoriaPromptColors[p.tipoAuditoria]} text-[10px]`}>{p.tipoAuditoria}</Badge></TableCell>
                      <TableCell className="text-center font-semibold text-success">{p.tasaAceptacion}%</TableCell>
                      <TableCell className="text-center text-sm">{p.vecesUsado}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analysis detail modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedAnalisis && (
            <>
              <DialogHeader>
                <DialogTitle>Detalle de Análisis IA</DialogTitle>
                <p className="text-sm text-muted-foreground">{formatDate(selectedAnalisis.fecha)}</p>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Evidencia</Label>
                  <div className="mt-1 flex items-center gap-2">
                    {getEvidenciaIcon(selectedAnalisis.tipoEvidencia)}
                    <span className="text-sm">{selectedAnalisis.tipoEvidencia}</span>
                    <div className="w-24 h-16 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs ml-2">
                      {selectedAnalisis.tipoEvidencia === 'Foto' ? '📷' : '📄'} Preview
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Prompt utilizado</Label>
                  <Card className="mt-1"><CardContent className="p-3 text-sm">
                    <p className="font-medium mb-1">{selectedAnalisis.promptUtilizado}</p>
                    <p className="text-muted-foreground text-xs">{promptsIA.find(p => p.id === selectedAnalisis.promptId)?.texto}</p>
                  </CardContent></Card>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Respuesta de la IA</Label>
                  <Card className="mt-1 border-primary/20"><CardContent className="p-3 text-sm">{selectedAnalisis.respuestaIA}</CardContent></Card>
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-xs text-muted-foreground">Decisión:</Label>
                  <Badge className={`${decisionColors[selectedAnalisis.decision]} px-3 py-1`}>{selectedAnalisis.decision}</Badge>
                </div>
                {selectedAnalisis.modificaciones && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Modificaciones realizadas</Label>
                    <Card className="mt-1 border-warning/20"><CardContent className="p-3 text-sm text-warning">{selectedAnalisis.modificaciones}</CardContent></Card>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Avatar className="h-5 w-5"><AvatarFallback className="text-[8px] bg-primary text-primary-foreground">{selectedAnalisis.auditor.split(' ').map(n=>n[0]).join('').slice(0,2)}</AvatarFallback></Avatar>
                  {selectedAnalisis.auditor}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
