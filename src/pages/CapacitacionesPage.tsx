import { useState } from "react";
import { Calendar, Plus, Star, Award, Users, Clock, CheckCircle, FileText, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { capacitaciones, estadoCapacitacionColors } from "@/lib/mockDataModules";
import { empresas, auditores } from "@/lib/mockData";

export default function CapacitacionesPage() {
  const [selectedCap, setSelectedCap] = useState<typeof capacitaciones[0] | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailTab, setDetailTab] = useState("asistentes");

  const currentMonth = new Date(2026, 1); // Feb 2026
  const daysInMonth = new Date(2026, 2, 0).getDate();
  const firstDay = new Date(2026, 1, 1).getDay();

  const getCapsByDate = (day: number) => {
    const dateStr = `2026-02-${String(day).padStart(2, '0')}`;
    return capacitaciones.filter(c => c.fecha === dateStr);
  };

  const renderStars = (score: number | null) => {
    if (score === null) return <span className="text-muted-foreground text-xs">—</span>;
    const stars = Math.round(score / 20);
    return (
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={12} className={i <= stars ? "fill-primary text-primary" : "text-muted-foreground/30"} />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{score}%</span>
      </div>
    );
  };

  const formatDate = (d: string) => {
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Capacitaciones</h1>
          <p className="text-muted-foreground text-sm">Gestión de capacitaciones SST con registro de asistentes y certificados</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="brand" className="gap-2"><Plus size={16} /> Programar Capacitación</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Programar Capacitación</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Tema / Título</Label><Input placeholder="Ej: Trabajo en Alturas" /></div>
              <div><Label>Empresa</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccionar empresa" /></SelectTrigger>
                  <SelectContent>{empresas.map(e => <SelectItem key={e.id} value={e.id}>{e.nombre}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Instructor</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccionar instructor" /></SelectTrigger>
                  <SelectContent>{auditores.map((a,i) => <SelectItem key={i} value={a}>{a}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Fecha</Label><Input type="date" /></div>
                <div><Label>Hora</Label><Input type="time" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Duración (horas)</Label><Input type="number" placeholder="4" /></div>
                <div><Label>Asistentes estimados</Label><Input type="number" placeholder="15" /></div>
              </div>
              <div><Label>Normativa relacionada</Label>
                <Select><SelectTrigger><SelectValue placeholder="Seleccionar normativa" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="res0312">Res. 0312/2019</SelectItem>
                    <SelectItem value="d1072">D. 1072/2015</SelectItem>
                    <SelectItem value="res40595">Res. 40595/2022</SelectItem>
                    <SelectItem value="iso28000">ISO 28000:2022</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Descripción / Objetivo</Label><Textarea placeholder="Descripción de la capacitación..." /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setCreateOpen(false)}>Cancelar</Button>
                <Button variant="brand" onClick={() => setCreateOpen(false)}>Programar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="calendario">
        <TabsList>
          <TabsTrigger value="calendario" className="gap-2"><Calendar size={14} /> Calendario</TabsTrigger>
          <TabsTrigger value="historial" className="gap-2"><FileText size={14} /> Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="calendario">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Febrero 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => (
                  <div key={d} className="bg-muted p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`e-${i}`} className="bg-card p-2 min-h-[80px]" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const caps = getCapsByDate(day);
                  return (
                    <div key={day} className="bg-card p-1.5 min-h-[80px] border-r border-b border-border/50">
                      <span className={`text-xs font-medium ${day === 10 ? 'bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center' : 'text-muted-foreground'}`}>{day}</span>
                      <div className="mt-1 space-y-0.5">
                        {caps.map(c => (
                          <button key={c.id} onClick={() => { setSelectedCap(c); setDetailOpen(true); setDetailTab("asistentes"); }}
                            className="w-full text-left">
                            <div className={`text-[10px] px-1 py-0.5 rounded truncate ${
                              c.estado === 'Completada' ? 'bg-success/15 text-success' :
                              c.estado === 'En Curso' ? 'bg-primary/15 text-primary' :
                              'bg-muted text-muted-foreground'
                            }`}>{c.tema}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historial">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tema</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead className="text-center">Asistentes</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Evaluación</TableHead>
                    <TableHead className="text-center">Certificados</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {capacitaciones.map(c => (
                    <TableRow key={c.id}>
                      <TableCell className="text-sm">{formatDate(c.fecha)}</TableCell>
                      <TableCell className="font-medium text-sm">{c.tema}</TableCell>
                      <TableCell className="text-sm">{c.empresa.nombre}</TableCell>
                      <TableCell className="text-sm">{c.instructor}</TableCell>
                      <TableCell className="text-center text-sm">{c.asistentes.length}/{c.asistentesEstimados}</TableCell>
                      <TableCell><Badge className={estadoCapacitacionColors[c.estado]}>{c.estado}</Badge></TableCell>
                      <TableCell>{renderStars(c.evaluacionPromedio)}</TableCell>
                      <TableCell className="text-center">
                        {c.certificadosGenerados ? <CheckCircle size={16} className="text-success mx-auto" /> : <span className="text-muted-foreground text-xs">—</span>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => { setSelectedCap(c); setDetailOpen(true); setDetailTab("asistentes"); }}>Ver</Button>
                          {c.estado === 'Completada' && !c.certificadosGenerados && (
                            <Button variant="ghost" size="sm" className="text-primary"><Award size={14} /></Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedCap && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-xl">{selectedCap.tema}</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCap.empresa.nombre} — {formatDate(selectedCap.fecha)} {selectedCap.hora}</p>
                  </div>
                  <Badge className={`${estadoCapacitacionColors[selectedCap.estado]} text-sm px-3 py-1`}>{selectedCap.estado}</Badge>
                </div>
                <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Users size={14} /> {selectedCap.instructor}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {selectedCap.duracionHoras}h</span>
                  <span className="flex items-center gap-1"><FileText size={14} /> {selectedCap.normativaRelacionada}</span>
                </div>
              </DialogHeader>

              <Tabs value={detailTab} onValueChange={setDetailTab}>
                <TabsList>
                  <TabsTrigger value="asistentes">Asistentes</TabsTrigger>
                  <TabsTrigger value="evidencias">Evidencias</TabsTrigger>
                  <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
                  <TabsTrigger value="certificados">Certificados</TabsTrigger>
                </TabsList>

                <TabsContent value="asistentes">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{selectedCap.asistentes.length} de {selectedCap.asistentesEstimados} asistentes registrados</span>
                      <Button variant="outline" size="sm" className="gap-1"><Plus size={14} /> Agregar Asistente</Button>
                    </div>
                    {selectedCap.asistentes.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cédula</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-center">Firma</TableHead>
                            <TableHead className="text-center">Evaluación</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCap.asistentes.map(a => (
                            <TableRow key={a.id}>
                              <TableCell className="font-medium text-sm">{a.nombre}</TableCell>
                              <TableCell className="text-sm">{a.cedula}</TableCell>
                              <TableCell className="text-sm">{a.cargo}</TableCell>
                              <TableCell className="text-center">
                                {a.firmo ? <CheckCircle size={16} className="text-success mx-auto" /> : <span className="text-muted-foreground text-xs">Pendiente</span>}
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {a.puntajeEvaluacion !== null ? `${a.puntajeEvaluacion}%` : '—'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No hay asistentes registrados aún</div>
                    )}
                    {/* Signature canvas placeholder */}
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Área de firma digital</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg h-32 flex items-center justify-center text-muted-foreground text-sm bg-muted/30">
                        <Edit3 size={20} className="mr-2" /> Toque aquí para firmar (disponible en móvil)
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="evidencias">
                  <div className="space-y-4">
                    <Button variant="outline" size="sm" className="gap-1"><Plus size={14} /> Agregar Foto</Button>
                    <div className="grid grid-cols-3 gap-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                          📷 Evidencia {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="evaluacion">
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">Evaluación post-capacitación</p>
                    {[
                      '¿El contenido fue relevante para su trabajo?',
                      '¿El instructor explicó claramente los temas?',
                      '¿Los materiales de apoyo fueron adecuados?',
                      '¿La duración de la capacitación fue apropiada?',
                      '¿Puede aplicar lo aprendido en su puesto de trabajo?'
                    ].map((q, i) => (
                      <div key={i} className="space-y-2">
                        <Label className="text-sm">{i + 1}. {q}</Label>
                        <RadioGroup defaultValue={i < 3 ? "excelente" : ""} className="flex gap-4">
                          {['Excelente','Bueno','Regular','Deficiente'].map(opt => (
                            <div key={opt} className="flex items-center gap-1.5">
                              <RadioGroupItem value={opt.toLowerCase()} id={`q${i}-${opt}`} />
                              <Label htmlFor={`q${i}-${opt}`} className="text-xs">{opt}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                    <div>
                      <Label className="text-sm">Observaciones</Label>
                      <Textarea placeholder="Comentarios adicionales..." className="mt-1" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certificados">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button variant="brand" size="sm" className="gap-1"><Award size={14} /> Generar Todos</Button>
                    </div>
                    {selectedCap.asistentes.length > 0 ? (
                      <>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Asistente</TableHead>
                              <TableHead>Cédula</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead>Acción</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedCap.asistentes.map(a => (
                              <TableRow key={a.id}>
                                <TableCell className="font-medium text-sm">{a.nombre}</TableCell>
                                <TableCell className="text-sm">{a.cedula}</TableCell>
                                <TableCell>
                                  {selectedCap.certificadosGenerados
                                    ? <Badge className="bg-success/15 text-success">Generado</Badge>
                                    : <Badge className="bg-muted text-muted-foreground">Pendiente</Badge>}
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" className="text-primary gap-1"><Award size={14} /> Generar</Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {/* Certificate preview */}
                        <Card className="border-2 border-primary/20">
                          <CardContent className="p-6 text-center space-y-3">
                            <div className="text-primary font-display font-bold text-lg">QuestAudit</div>
                            <p className="text-xs text-muted-foreground tracking-widest uppercase">Certificado de Asistencia</p>
                            <div className="py-4">
                              <p className="text-sm text-muted-foreground">Certifica que</p>
                              <p className="text-lg font-bold mt-1">{selectedCap.asistentes[0]?.nombre || 'Nombre del asistente'}</p>
                              <p className="text-sm text-muted-foreground mt-3">asistió y aprobó la capacitación</p>
                              <p className="text-md font-semibold text-primary mt-1">"{selectedCap.tema}"</p>
                              <p className="text-sm text-muted-foreground mt-3">realizada el {formatDate(selectedCap.fecha)} con una duración de {selectedCap.duracionHoras} horas</p>
                            </div>
                            <div className="flex justify-around pt-6 border-t border-border">
                              <div className="text-center">
                                <div className="w-32 border-b border-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">{selectedCap.instructor}</p>
                                <p className="text-[10px] text-muted-foreground">Instructor</p>
                              </div>
                              <div className="text-center">
                                <div className="w-32 border-b border-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">Quest Estrategias y Sostenibilidad</p>
                                <p className="text-[10px] text-muted-foreground">Organización</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No hay asistentes para generar certificados</div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
