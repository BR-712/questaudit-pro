import { useState } from "react";
import { Users, Building2, Shield, CreditCard, Plus, Mail, RefreshCw, Lock, Unlock, LogIn, LogOut, Key, UserPlus, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usuariosAdmin, invitacionesPendientes, eventosSeguridad, eventoSeguridadIcons, modulosPlan } from "@/lib/mockDataModules";

export default function AdminPage() {
  const [inviteOpen, setInviteOpen] = useState(false);

  const formatRelativeTime = (date: string) => {
    const now = new Date('2026-02-10T12:00:00');
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `Hace ${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `Hace ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `Hace ${diffDays}d`;
    return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
  };

  const getEventIcon = (tipo: string) => {
    const map: Record<string, React.ReactNode> = {
      'login_exitoso': <LogIn size={14} />,
      'login_fallido': <AlertTriangle size={14} />,
      'cambio_password': <Key size={14} />,
      'sesion_cerrada': <LogOut size={14} />,
      'usuario_invitado': <UserPlus size={14} />,
    };
    return map[tipo] || <CheckCircle size={14} />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Administración</h1>
        <p className="text-muted-foreground text-sm">Gestión de usuarios, organización, seguridad y plan</p>
      </div>

      <Tabs defaultValue="usuarios">
        <TabsList>
          <TabsTrigger value="usuarios" className="gap-2"><Users size={14} /> Usuarios</TabsTrigger>
          <TabsTrigger value="organizacion" className="gap-2"><Building2 size={14} /> Organización</TabsTrigger>
          <TabsTrigger value="seguridad" className="gap-2"><Shield size={14} /> Seguridad</TabsTrigger>
          <TabsTrigger value="plan" className="gap-2"><CreditCard size={14} /> Plan y Facturación</TabsTrigger>
        </TabsList>

        {/* ====== USUARIOS ====== */}
        <TabsContent value="usuarios" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Equipo ({usuariosAdmin.length} usuarios)</h2>
            <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
              <DialogTrigger asChild>
                <Button variant="brand" size="sm" className="gap-1"><Plus size={14} /> Invitar Usuario</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader><DialogTitle>Invitar Usuario</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Email</Label><Input placeholder="usuario@empresa.com.co" /></div>
                  <div><Label>Nombre</Label><Input placeholder="Nombre completo" /></div>
                  <div><Label>Rol</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Seleccionar rol" /></SelectTrigger>
                      <SelectContent>
                        {['Admin','Coordinador','Auditor','Capacitador'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label>Mensaje personalizado (opcional)</Label><Textarea placeholder="Bienvenido al equipo..." /></div>
                  <Card className="border-primary/20">
                    <CardContent className="p-3 text-xs text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Vista previa del email:</p>
                      <p>Asunto: Invitación a QuestAudit</p>
                      <p className="mt-1">Hola [Nombre],</p>
                      <p>Has sido invitado a unirte a Quest Estrategias y Sostenibilidad en QuestAudit como [Rol]. Haz clic en el enlace para completar tu registro.</p>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancelar</Button>
                    <Button variant="brand" onClick={() => setInviteOpen(false)}><Mail size={14} className="mr-1" /> Enviar Invitación</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                    <TableHead>Último login</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuariosAdmin.map(u => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px] bg-primary text-primary-foreground">{u.avatar}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{u.nombre}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        <Select defaultValue={u.rol}>
                          <SelectTrigger className="h-7 text-xs w-32"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {['Super Admin','Admin','Coordinador','Auditor','Capacitador'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full mr-1.5 ${u.activo ? 'bg-success' : 'bg-destructive'}`} />
                          <span className="text-xs">{u.activo ? 'Activo' : 'Inactivo'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatRelativeTime(u.ultimoLogin)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Editar</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">
                            {u.activo ? 'Desactivar' : 'Activar'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-sm font-semibold mb-3">Invitaciones Pendientes</h3>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Fecha envío</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invitacionesPendientes.map(inv => (
                      <TableRow key={inv.id}>
                        <TableCell className="text-sm">{inv.email}</TableCell>
                        <TableCell className="text-sm">{inv.nombre}</TableCell>
                        <TableCell className="text-sm">{inv.rol}</TableCell>
                        <TableCell className="text-sm">{new Date(inv.fechaEnvio + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })}</TableCell>
                        <TableCell>
                          <Badge className={inv.estado === 'Pendiente' ? 'bg-warning/15 text-warning' : 'bg-destructive/15 text-destructive'}>{inv.estado}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"><RefreshCw size={12} /> Reenviar</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ====== ORGANIZACIÓN ====== */}
        <TabsContent value="organizacion" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Información de la Organización</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Nombre</Label><Input defaultValue="Quest Estrategias y Sostenibilidad S.A.S." /></div>
                <div><Label>NIT</Label><Input defaultValue="901.234.567-8" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Ciudad</Label><Input defaultValue="Barranquilla" /></div>
                <div><Label>Teléfono</Label><Input defaultValue="+57 605 369 1234" /></div>
              </div>
              <div><Label>Dirección</Label><Input defaultValue="Cra 53 #76-100, Of. 305, Barranquilla, Atlántico" /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Branding</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Logo de la organización</Label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg h-32 flex flex-col items-center justify-center text-muted-foreground text-sm bg-muted/30 cursor-pointer hover:border-primary/50 transition-colors">
                  <Building2 size={24} className="mb-2" />
                  <span>Arrastra tu logo aquí o haz clic para subir</span>
                  <span className="text-xs">PNG, SVG — máx. 2MB</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Color primario</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-md bg-primary border" />
                    <Input defaultValue="#D4A017" className="w-32" />
                  </div>
                </div>
                <div>
                  <Label>Color secundario</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-8 h-8 rounded-md bg-secondary border" />
                    <Input defaultValue="#1A1A1A" className="w-32" />
                  </div>
                </div>
              </div>
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-2">Vista previa del encabezado del informe</p>
                  <div className="bg-secondary text-secondary-foreground p-3 rounded flex items-center justify-between">
                    <span className="font-display font-bold text-primary">QuestAudit</span>
                    <span className="text-xs">Informe Técnico SST</span>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end"><Button variant="brand">Guardar Cambios</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ====== SEGURIDAD ====== */}
        <TabsContent value="seguridad" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Políticas de Seguridad</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">2FA obligatorio para todos los usuarios</p>
                  <p className="text-xs text-muted-foreground">Requiere verificación en dos pasos para iniciar sesión</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Tiempo de expiración de sesión</p>
                  <p className="text-xs text-muted-foreground">Cierre automático tras inactividad</p>
                </div>
                <Select defaultValue="4h">
                  <SelectTrigger className="w-28 h-8"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['15min','30min','1h','4h','8h'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Máximo de dispositivos simultáneos</p>
                  <p className="text-xs text-muted-foreground">Número máximo de sesiones activas por usuario</p>
                </div>
                <Input type="number" defaultValue={3} className="w-20 h-8 text-center" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Bloquear cuenta tras 5 intentos fallidos</p>
                  <p className="text-xs text-muted-foreground">Bloqueo temporal de 30 minutos</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registro de Seguridad</CardTitle>
              <CardDescription>Últimos eventos del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventosSeguridad.map(ev => {
                  const info = eventoSeguridadIcons[ev.tipo];
                  return (
                    <div key={ev.id} className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0">
                      <div className={`mt-0.5 ${info.color}`}>{getEventIcon(ev.tipo)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{ev.usuario}</span>
                          <Badge variant="outline" className="text-[10px]">{info.label}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{ev.descripcion}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{ev.ip} — {ev.dispositivo}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{formatRelativeTime(ev.fecha)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ====== PLAN Y FACTURACIÓN ====== */}
        <TabsContent value="plan" className="space-y-6">
          <Card className="border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-display font-bold">Plan Professional</h2>
                    <Badge className="bg-primary/15 text-primary">Activo</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Renovación: 10 de marzo de 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold font-display">$299.000</p>
                  <p className="text-xs text-muted-foreground">COP / mes</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Usuarios activos: 4 / 10</span>
                  <span className="text-muted-foreground">40%</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {['Hasta 10 usuarios','Todos los módulos base','Gestión IA incluida','Soporte prioritario','50 análisis IA/mes','Informes ilimitados'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-sm"><CheckCircle size={14} className="text-success shrink-0" />{f}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Módulos</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Módulo</TableHead>
                    <TableHead className="text-center">Disponible</TableHead>
                    <TableHead className="text-center">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modulosPlan.map(m => (
                    <TableRow key={m.nombre}>
                      <TableCell className="font-medium text-sm">{m.nombre}</TableCell>
                      <TableCell className="text-center">
                        {m.disponible
                          ? <CheckCircle size={16} className="text-success mx-auto" />
                          : <Tooltip><TooltipTrigger><Lock size={16} className="text-muted-foreground mx-auto" /></TooltipTrigger><TooltipContent>Disponible en plan Enterprise</TooltipContent></Tooltip>}
                      </TableCell>
                      <TableCell className="text-center">
                        {m.disponible ? <Switch defaultChecked={m.activo} /> : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-4">Cambiar Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Starter', price: '$149.000', users: '3', features: ['3 usuarios','Módulos básicos','10 análisis IA/mes','Soporte email'], current: false },
                { name: 'Professional', price: '$299.000', users: '10', features: ['10 usuarios','Todos los módulos base','50 análisis IA/mes','Soporte prioritario','Informes ilimitados'], current: true },
                { name: 'Enterprise', price: '$599.000', users: 'Ilimitados', features: ['Usuarios ilimitados','Todos los módulos','IA ilimitada','Soporte 24/7','API integraciones','Firma digital certificada','Multi-organización'], current: false },
              ].map(plan => (
                <Card key={plan.name} className={plan.current ? 'border-primary/50 ring-1 ring-primary/20' : ''}>
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-lg">{plan.name}</h3>
                        {plan.current && <Badge className="bg-primary/15 text-primary text-[10px]">Actual</Badge>}
                      </div>
                      <p className="text-2xl font-bold mt-1">{plan.price} <span className="text-xs font-normal text-muted-foreground">COP/mes</span></p>
                      <p className="text-xs text-muted-foreground">{plan.users} usuarios</p>
                    </div>
                    <div className="space-y-1.5">
                      {plan.features.map(f => (
                        <div key={f} className="flex items-center gap-1.5 text-xs"><CheckCircle size={12} className="text-success shrink-0" />{f}</div>
                      ))}
                    </div>
                    <Button variant={plan.current ? 'outline' : 'brand'} className="w-full" disabled={plan.current}>
                      {plan.current ? 'Plan Actual' : 'Cambiar Plan'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
