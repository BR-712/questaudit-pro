// Mock data for QuestAudit prototype

export interface Empresa {
  id: string;
  nombre: string;
  nit: string;
  ciudad: string;
}

export interface OrdenCumplimiento {
  id: string;
  codigo: string;
  empresa: Empresa;
  tipoAuditoria: 'SST' | 'Calidad' | 'PESV' | 'ISO 28000';
  auditor: string;
  estado: 'Pendiente' | 'En Progreso' | 'Informe Generado' | 'Cumplida' | 'Cerrada' | 'Vencida';
  fechaLimite: string;
  horasProgramadas: number;
  horasConsumidas: number;
  normativas: string[];
  descripcion: string;
}

export interface Visita {
  id: string;
  empresa: string;
  tipo: 'SST' | 'Calidad' | 'PESV' | 'ISO 28000';
  hora: string;
  direccion: string;
  estado: 'Programada' | 'En Curso' | 'Completada';
}

export interface ActividadReciente {
  id: string;
  tipo: 'hallazgo' | 'informe' | 'oc_cerrada' | 'visita' | 'capacitacion';
  descripcion: string;
  tiempo: string;
}

export const empresas: Empresa[] = [
  { id: '1', nombre: 'Constructora Caribe S.A.S.', nit: '900.123.456-7', ciudad: 'Barranquilla' },
  { id: '2', nombre: 'Logística del Norte S.A.', nit: '800.234.567-8', ciudad: 'Barranquilla' },
  { id: '3', nombre: 'Transportes del Litoral S.A.', nit: '900.345.678-9', ciudad: 'Cartagena' },
  { id: '4', nombre: 'Industrias Barlovento S.A.S.', nit: '800.456.789-0', ciudad: 'Santa Marta' },
  { id: '5', nombre: 'Soluciones Portuarias del Atlántico S.A.S.', nit: '900.567.890-1', ciudad: 'Barranquilla' },
];

export const auditores = [
  'Andrés Mejía Vargas',
  'Laura Castillo Díaz',
  'Carlos Herrera Mendoza',
  'Valentina Rojas Peña',
];

export const ordenesCumplimiento: OrdenCumplimiento[] = [
  {
    id: '1', codigo: 'OC-2026-001', empresa: empresas[0], tipoAuditoria: 'SST',
    auditor: auditores[0], estado: 'En Progreso', fechaLimite: '2026-02-20',
    horasProgramadas: 40, horasConsumidas: 28,
    normativas: ['Res. 0312/2019', 'D. 1072/2015'], descripcion: 'Evaluación de estándares mínimos SG-SST'
  },
  {
    id: '2', codigo: 'OC-2026-002', empresa: empresas[1], tipoAuditoria: 'PESV',
    auditor: auditores[1], estado: 'Pendiente', fechaLimite: '2026-02-15',
    horasProgramadas: 24, horasConsumidas: 0,
    normativas: ['Res. 40595/2022'], descripcion: 'Auditoría Plan Estratégico de Seguridad Vial'
  },
  {
    id: '3', codigo: 'OC-2026-003', empresa: empresas[2], tipoAuditoria: 'ISO 28000',
    auditor: auditores[2], estado: 'Informe Generado', fechaLimite: '2026-02-28',
    horasProgramadas: 32, horasConsumidas: 30,
    normativas: ['ISO 28000:2022'], descripcion: 'Auditoría sistema de gestión de seguridad cadena de suministro'
  },
  {
    id: '4', codigo: 'OC-2026-004', empresa: empresas[3], tipoAuditoria: 'Calidad',
    auditor: auditores[0], estado: 'Vencida', fechaLimite: '2026-02-05',
    horasProgramadas: 16, horasConsumidas: 8,
    normativas: ['ISO 9001:2015'], descripcion: 'Auditoría de seguimiento sistema de gestión de calidad'
  },
  {
    id: '5', codigo: 'OC-2026-005', empresa: empresas[4], tipoAuditoria: 'SST',
    auditor: auditores[3], estado: 'Cumplida', fechaLimite: '2026-03-10',
    horasProgramadas: 48, horasConsumidas: 45,
    normativas: ['Res. 0312/2019', 'D. 1072/2015', 'ISO 45001:2018'], descripcion: 'Evaluación integral SST zona portuaria'
  },
  {
    id: '6', codigo: 'OC-2026-006', empresa: empresas[0], tipoAuditoria: 'PESV',
    auditor: auditores[1], estado: 'En Progreso', fechaLimite: '2026-02-25',
    horasProgramadas: 20, horasConsumidas: 12,
    normativas: ['Res. 40595/2022'], descripcion: 'Seguimiento PESV para flota de transporte interno'
  },
  {
    id: '7', codigo: 'OC-2026-007', empresa: empresas[2], tipoAuditoria: 'SST',
    auditor: auditores[2], estado: 'Cerrada', fechaLimite: '2026-01-30',
    horasProgramadas: 36, horasConsumidas: 36,
    normativas: ['Res. 0312/2019'], descripcion: 'Evaluación estándares mínimos SST transporte terrestre'
  },
];

export const visitasHoy: Visita[] = [
  { id: '1', empresa: 'Constructora Caribe S.A.S.', tipo: 'SST', hora: '08:00', direccion: 'Cra 54 #72-120, Barranquilla', estado: 'Completada' },
  { id: '2', empresa: 'Logística del Norte S.A.', tipo: 'PESV', hora: '11:00', direccion: 'Vía 40 #79-234, Barranquilla', estado: 'En Curso' },
  { id: '3', empresa: 'Industrias Barlovento S.A.S.', tipo: 'Calidad', hora: '15:00', direccion: 'Cll 30 #5-45, Santa Marta', estado: 'Programada' },
];

export const actividadReciente: ActividadReciente[] = [
  { id: '1', tipo: 'hallazgo', descripcion: 'Hallazgo NC Mayor registrado en Constructora Caribe', tiempo: 'Hace 25 min' },
  { id: '2', tipo: 'informe', descripcion: 'Informe técnico generado para OC-2026-003', tiempo: 'Hace 1 hora' },
  { id: '3', tipo: 'oc_cerrada', descripcion: 'OC-2026-007 cerrada exitosamente', tiempo: 'Hace 3 horas' },
  { id: '4', tipo: 'visita', descripcion: 'Visita finalizada en Constructora Caribe', tiempo: 'Hace 4 horas' },
  { id: '5', tipo: 'capacitacion', descripcion: 'Capacitación de EPP completada — 15 asistentes', tiempo: 'Ayer' },
];

export const cumplimientoSistemas = [
  { name: 'SG-SST', valor: 70, fill: 'hsl(var(--chart-1))' },
  { name: 'PESV', valor: 40, fill: 'hsl(var(--chart-4))' },
  { name: 'ISO 28000', valor: 35, fill: 'hsl(var(--chart-3))' },
  { name: 'ISO 9001', valor: 62, fill: 'hsl(var(--chart-2))' },
];

export const ocPorEstado = [
  { name: 'Pendiente', value: 1, fill: 'hsl(var(--muted-foreground))' },
  { name: 'En Progreso', value: 2, fill: 'hsl(var(--warning))' },
  { name: 'Informe Generado', value: 1, fill: 'hsl(var(--chart-1))' },
  { name: 'Cumplida', value: 1, fill: 'hsl(var(--success))' },
  { name: 'Cerrada', value: 1, fill: 'hsl(var(--foreground))' },
  { name: 'Vencida', value: 1, fill: 'hsl(var(--destructive))' },
];

export const estadoColors: Record<string, string> = {
  'Pendiente': 'bg-muted text-muted-foreground',
  'En Progreso': 'bg-warning/15 text-warning border-warning/30',
  'Informe Generado': 'bg-primary/15 text-primary border-primary/30',
  'Cumplida': 'bg-success/15 text-success border-success/30',
  'Cerrada': 'bg-secondary text-secondary-foreground',
  'Vencida': 'bg-destructive/15 text-destructive border-destructive/30',
  'Programada': 'bg-info/15 text-info border-info/30',
  'En Curso': 'bg-warning/15 text-warning border-warning/30',
  'Completada': 'bg-success/15 text-success border-success/30',
};
