import { useState } from "react";
import { Plus, Download, Copy, Trash2, Eye, FileText, FileSpreadsheet, File, Pencil, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { informes, plantillasInforme, estadoInformeColors } from "@/lib/mockDataExtended";
import { ordenesCumplimiento } from "@/lib/mockData";

const formatIcons: Record<string, typeof FileText> = { 'PDF': FileText, 'DOCX': File, 'XLSX': FileSpreadsheet };

export default function InformesPage() {
  const [showGenerate, setShowGenerate] = useState(false);
  const [genStep, setGenStep] = useState(1);
  const [selectedOC, setSelectedOC] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [activeSection, setActiveSection] = useState("info-general");

  const secciones = [
    { id: 'info-general', label: 'Información General' },
    { id: 'introduccion', label: 'Introducción' },
    { id: 'marco-legal', label: 'Marco Legal' },
    { id: 'hallazgos', label: 'Hallazgos' },
    { id: 'recomendaciones', label: 'Recomendaciones' },
    { id: 'conclusiones', label: 'Conclusiones' },
    { id: 'bibliografia', label: 'Bibliografía' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">Informes</h1>
          <p className="text-muted-foreground text-sm">{informes.length} informes generados</p>
        </div>
        <Button variant="brand" onClick={() => { setShowGenerate(true); setGenStep(1); setSelectedOC(""); setSelectedTemplate(""); }}>
          <Plus size={16} className="mr-1" /> Generar Informe
        </Button>
      </div>

      <Tabs defaultValue="generados">
        <TabsList>
          <TabsTrigger value="generados">Informes Generados</TabsTrigger>
          <TabsTrigger value="plantillas">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="generados" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30 text-muted-foreground">
                      <th className="text-left py-3 px-4 font-medium">Título</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">OC</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Tipo</th>
                      <th className="text-left py-3 px-4 font-medium">Formato</th>
                      <th className="text-left py-3 px-4 font-medium">Estado</th>
                      <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Generado por</th>
                      <th className="text-left py-3 px-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {informes.map(inf => (
                      <tr key={inf.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium text-sm max-w-[250px] truncate">{inf.titulo}</td>
                        <td className="py-3 px-4 hidden md:table-cell"><span className="font-mono text-xs font-semibold text-primary">{inf.ocVinculada}</span></td>
                        <td className="py-3 px-4 hidden md:table-cell text-sm">{inf.empresa.nombre}</td>
                        <td className="py-3 px-4 hidden lg:table-cell text-xs">{inf.tipo}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">{inf.formatos.map(f => <Badge key={f} variant="outline" className="text-[10px] px-1.5">{f}</Badge>)}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${estadoInformeColors[inf.estado]}`}>{inf.estado}</span>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell text-sm">{new Date(inf.fechaGeneracion).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })}</td>
                        <td className="py-3 px-4 hidden lg:table-cell text-sm">{inf.generadoPor}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Eye size={13} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Download size={13} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Copy size={13} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 size={13} /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plantillas" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantillasInforme.map(pl => {
              return (
                <Card key={pl.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="h-28 bg-muted/50 border-b flex items-center justify-center">
                      <FileText size={36} className="text-muted-foreground" />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-display font-semibold text-sm">{pl.nombre}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{pl.descripcion}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">{pl.formatos.map(f => <Badge key={f} variant="outline" className="text-[10px] px-1.5">{f}</Badge>)}</div>
                        <span className="text-xs text-muted-foreground">{pl.vecesUsada} usos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Generation Wizard */}
      <Dialog open={showGenerate} onOpenChange={setShowGenerate}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Generar Informe</DialogTitle>
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${genStep >= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{step}</div>
                  <span className={`text-xs hidden sm:inline ${genStep >= step ? 'font-medium' : 'text-muted-foreground'}`}>
                    {step === 1 ? 'Seleccionar OC' : step === 2 ? 'Plantilla' : 'Vista previa'}
                  </span>
                  {step < 3 && <div className={`w-8 h-0.5 ${genStep > step ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </DialogHeader>

          {genStep === 1 && (
            <div className="space-y-4 mt-4">
              <Label>Seleccionar Orden de Cumplimiento</Label>
              <Select value={selectedOC} onValueChange={setSelectedOC}>
                <SelectTrigger><SelectValue placeholder="Seleccionar OC..." /></SelectTrigger>
                <SelectContent>
                  {ordenesCumplimiento.map(oc => (
                    <SelectItem key={oc.id} value={oc.id}>{oc.codigo} — {oc.empresa.nombre} ({oc.tipoAuditoria})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedOC && (() => {
                const oc = ordenesCumplimiento.find(o => o.id === selectedOC);
                if (!oc) return null;
                return (
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      <p className="text-sm"><strong>Empresa:</strong> {oc.empresa.nombre}</p>
                      <p className="text-sm"><strong>Tipo:</strong> {oc.tipoAuditoria}</p>
                      <p className="text-sm"><strong>Normativas:</strong> {oc.normativas.join(', ')}</p>
                      <p className="text-sm"><strong>Auditor:</strong> {oc.auditor}</p>
                    </CardContent>
                  </Card>
                );
              })()}
              <div className="flex justify-end"><Button variant="brand" onClick={() => setGenStep(2)} disabled={!selectedOC}>Siguiente</Button></div>
            </div>
          )}

          {genStep === 2 && (
            <div className="space-y-4 mt-4">
              <Label>Seleccionar Plantilla</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {plantillasInforme.map(pl => (
                  <Card key={pl.id} className={`cursor-pointer transition-all ${selectedTemplate === pl.id ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-sm'}`} onClick={() => setSelectedTemplate(pl.id)}>
                    <CardContent className="p-4 space-y-1">
                      <h4 className="font-semibold text-sm">{pl.nombre}</h4>
                      <div className="flex gap-1">{pl.formatos.map(f => <Badge key={f} variant="outline" className="text-[10px]">{f}</Badge>)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setGenStep(1)}>Anterior</Button>
                <Button variant="brand" onClick={() => setGenStep(3)} disabled={!selectedTemplate}>Siguiente</Button>
              </div>
            </div>
          )}

          {genStep === 3 && (
            <div className="space-y-4 mt-4">
              {/* Logo & color selectors */}
              <div className="flex flex-wrap gap-4 items-center">
                <div className="space-y-1">
                  <Label className="text-xs">Logo del cliente</Label>
                  <Button variant="outline" size="sm"><FileText size={12} className="mr-1" /> Subir logo</Button>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Colores corporativos</Label>
                  <div className="flex gap-1">
                    <div className="w-6 h-6 rounded bg-primary border cursor-pointer" />
                    <div className="w-6 h-6 rounded bg-secondary border cursor-pointer" />
                    <div className="w-6 h-6 rounded bg-info border cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[400px]">
                {/* Outline/index */}
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Índice</p>
                  {secciones.map(s => (
                    <button key={s.id} onClick={() => setActiveSection(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${activeSection === s.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Preview */}
                <div className="lg:col-span-3 border rounded-lg p-6 bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold">{secciones.find(s => s.id === activeSection)?.label}</h3>
                    <Button variant="ghost" size="sm"><Pencil size={12} className="mr-1" /> Editar</Button>
                  </div>
                  {activeSection === 'info-general' && (
                    <div className="space-y-2 text-sm">
                      <p><strong>Código OC:</strong> {ordenesCumplimiento.find(o => o.id === selectedOC)?.codigo}</p>
                      <p><strong>Empresa:</strong> {ordenesCumplimiento.find(o => o.id === selectedOC)?.empresa.nombre}</p>
                      <p><strong>Tipo de Auditoría:</strong> {ordenesCumplimiento.find(o => o.id === selectedOC)?.tipoAuditoria}</p>
                      <p><strong>Auditor:</strong> {ordenesCumplimiento.find(o => o.id === selectedOC)?.auditor}</p>
                      <p><strong>Fecha:</strong> {new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                  )}
                  {activeSection === 'introduccion' && <p className="text-sm text-muted-foreground">El presente informe tiene como objetivo presentar los resultados de la auditoría realizada a {ordenesCumplimiento.find(o => o.id === selectedOC)?.empresa.nombre} en el marco de la orden de cumplimiento {ordenesCumplimiento.find(o => o.id === selectedOC)?.codigo}.</p>}
                  {activeSection === 'marco-legal' && <p className="text-sm text-muted-foreground">Normativas aplicables: {ordenesCumplimiento.find(o => o.id === selectedOC)?.normativas.join(', ')}. La presente auditoría se rige por el marco normativo colombiano vigente en materia de seguridad y salud en el trabajo.</p>}
                  {activeSection === 'hallazgos' && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border">
                        <thead><tr className="bg-muted/50"><th className="p-2 text-left border">Tipo</th><th className="p-2 text-left border">Área</th><th className="p-2 text-left border">Descripción</th><th className="p-2 text-left border">Riesgo</th></tr></thead>
                        <tbody>
                          <tr className="border"><td className="p-2 border text-xs">NC Mayor</td><td className="p-2 border text-xs">EPP</td><td className="p-2 border text-xs">Personal sin casco en zona de excavación</td><td className="p-2 border text-xs">Alto</td></tr>
                          <tr className="border"><td className="p-2 border text-xs">NC Menor</td><td className="p-2 border text-xs">Señalización</td><td className="p-2 border text-xs">Señalización de evacuación desactualizada</td><td className="p-2 border text-xs">Medio</td></tr>
                          <tr className="border"><td className="p-2 border text-xs">Observación</td><td className="p-2 border text-xs">Emergencias</td><td className="p-2 border text-xs">Extintores próximos a vencimiento</td><td className="p-2 border text-xs">Bajo</td></tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  {activeSection === 'recomendaciones' && <p className="text-sm text-muted-foreground">1. Adquirir EPP certificado para todo el personal de obra.<br/>2. Actualizar planos de evacuación con nuevos accesos.<br/>3. Programar mantenimiento preventivo de extintores.</p>}
                  {activeSection === 'conclusiones' && <p className="text-sm text-muted-foreground">La empresa presenta un nivel de cumplimiento del 70% en los estándares mínimos evaluados. Se requiere atención prioritaria en los hallazgos de No Conformidad Mayor identificados.</p>}
                  {activeSection === 'bibliografia' && <p className="text-sm text-muted-foreground">• Resolución 0312 de 2019 — Estándares Mínimos del SG-SST<br/>• Decreto 1072 de 2015 — Decreto Único Reglamentario del Sector Trabajo<br/>• ISO 45001:2018 — Sistemas de gestión de la seguridad y salud en el trabajo</p>}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-between">
                <Button variant="outline" onClick={() => setGenStep(2)}>Anterior</Button>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Guardar Borrador</Button>
                  <Button variant="outline" size="sm"><Download size={12} className="mr-1" /> PDF</Button>
                  <Button variant="outline" size="sm"><Download size={12} className="mr-1" /> DOCX</Button>
                  <Button variant="outline" size="sm"><Download size={12} className="mr-1" /> XLSX</Button>
                  <Button variant="brand" size="sm"><Send size={12} className="mr-1" /> Enviar por Email</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
