import {
  ClipboardList, AlertTriangle, MapPin, Search,
  TrendingUp, TrendingDown, FileText, Activity,
  Clock, CheckCircle2, XCircle, BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  ordenesCumplimiento, visitasHoy, actividadReciente,
  cumplimientoSistemas, ocPorEstado, estadoColors,
} from "@/lib/mockData";

const kpis = [
  {
    label: "OC Activas",
    value: 3,
    change: "+12%",
    trend: "up" as const,
    icon: ClipboardList,
  },
  {
    label: "OC Vencidas",
    value: 1,
    change: "-25%",
    trend: "down" as const,
    icon: AlertTriangle,
    alert: true,
  },
  {
    label: "Visitas esta semana",
    value: 8,
    change: "+33%",
    trend: "up" as const,
    icon: MapPin,
  },
  {
    label: "Hallazgos pendientes",
    value: 14,
    change: "+5%",
    trend: "up" as const,
    icon: Search,
  },
];

const PIE_COLORS = [
  'hsl(var(--muted-foreground))',
  'hsl(var(--warning))',
  'hsl(var(--primary))',
  'hsl(var(--success))',
  'hsl(var(--foreground))',
  'hsl(var(--destructive))',
];

const activityIcons: Record<string, typeof FileText> = {
  hallazgo: Search,
  informe: FileText,
  oc_cerrada: CheckCircle2,
  visita: MapPin,
  capacitacion: BarChart3,
};

export default function DashboardPage() {
  const ocProximas = ordenesCumplimiento
    .filter(oc => oc.estado !== 'Cerrada' && oc.estado !== 'Cumplida')
    .sort((a, b) => new Date(a.fechaLimite).getTime() - new Date(b.fechaLimite).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Bienvenido, Andrés. Aquí está tu resumen del día.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className={`${kpi.alert && kpi.value > 0 ? "border-destructive/30" : ""}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className={`text-3xl font-display font-bold mt-1 ${kpi.alert && kpi.value > 0 ? "text-destructive" : ""}`}>
                    {kpi.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  kpi.alert && kpi.value > 0 ? "bg-destructive/10" : "bg-primary/10"
                }`}>
                  <kpi.icon size={22} className={kpi.alert && kpi.value > 0 ? "text-destructive" : "text-primary"} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs">
                {kpi.trend === "up" ? (
                  <TrendingUp size={14} className="text-success" />
                ) : (
                  <TrendingDown size={14} className="text-success" />
                )}
                <span className="text-success font-medium">{kpi.change}</span>
                <span className="text-muted-foreground">vs mes anterior</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Cumplimiento por Sistema de Gestión</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={cumplimientoSistemas} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} />
                <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => [`${v}%`, 'Cumplimiento']} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={24}>
                  {cumplimientoSistemas.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">OC por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={ocPorEstado}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {ocPorEstado.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* OC próximas table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Órdenes Próximas a Vencer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-3 px-2 font-medium">Código</th>
                  <th className="text-left py-3 px-2 font-medium">Empresa</th>
                  <th className="text-left py-3 px-2 font-medium hidden md:table-cell">Tipo</th>
                  <th className="text-left py-3 px-2 font-medium">Fecha Límite</th>
                  <th className="text-left py-3 px-2 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {ocProximas.map((oc) => {
                  const isOverdue = new Date(oc.fechaLimite) < new Date();
                  return (
                    <tr key={oc.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-2 font-mono text-xs font-semibold">{oc.codigo}</td>
                      <td className="py-3 px-2">{oc.empresa.nombre}</td>
                      <td className="py-3 px-2 hidden md:table-cell">
                        <Badge variant="outline" className="text-xs">{oc.tipoAuditoria}</Badge>
                      </td>
                      <td className={`py-3 px-2 ${isOverdue ? "text-destructive font-semibold" : ""}`}>
                        {new Date(oc.fechaLimite).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${estadoColors[oc.estado]}`}>
                          {oc.estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Agenda de Hoy */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Clock size={16} className="text-primary" /> Agenda de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {visitasHoy.map((v) => (
              <div key={v.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className="text-center w-12">
                  <div className="text-sm font-semibold">{v.hora}</div>
                </div>
                <div className="w-0.5 h-10 bg-primary rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{v.empresa}</div>
                  <div className="text-xs text-muted-foreground truncate">{v.direccion}</div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${estadoColors[v.estado]}`}>
                  {v.estado}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display flex items-center gap-2">
              <Activity size={16} className="text-primary" /> Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {actividadReciente.map((a) => {
                const Icon = activityIcons[a.tipo] || Activity;
                return (
                  <div key={a.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{a.descripcion}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.tiempo}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
