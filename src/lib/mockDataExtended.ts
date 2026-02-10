// Extended mock data for Visitas, Hallazgos, Informes, Empresas modules

import { empresas, ordenesCumplimiento, auditores } from './mockData';

// ==================== VISITAS ====================

export interface VisitaCompleta {
  id: string;
  fecha: string;
  hora: string;
  empresa: typeof empresas[0];
  ocVinculada: string; // codigo OC
  ocId: string;
  tipoAuditoria: 'SST' | 'Calidad' | 'PESV' | 'ISO 28000';
  auditor: string;
  direccion: string;
  estado: 'Programada' | 'En Curso' | 'Completada' | 'Reprogramada';
  hallazgosCount: number;
  duracionHoras: number;
  contactoEmpresa: string;
  telefonoContacto: string;
  notas: string;
}

export const visitasCompletas: VisitaCompleta[] = [
  {
    id: 'v1', fecha: '2026-02-10', hora: '08:00', empresa: empresas[0],
    ocVinculada: 'OC-2026-001', ocId: '1', tipoAuditoria: 'SST', auditor: auditores[0],
    direccion: 'Cra 54 #72-120, Barranquilla', estado: 'Completada', hallazgosCount: 4,
    duracionHoras: 3, contactoEmpresa: 'María Fernanda López', telefonoContacto: '300 123 4567',
    notas: 'Inspección completa de obra en zona norte. Se encontraron hallazgos en EPP y señalización.'
  },
  {
    id: 'v2', fecha: '2026-02-10', hora: '11:00', empresa: empresas[1],
    ocVinculada: 'OC-2026-002', ocId: '2', tipoAuditoria: 'PESV', auditor: auditores[1],
    direccion: 'Vía 40 #79-234, Barranquilla', estado: 'En Curso', hallazgosCount: 2,
    duracionHoras: 2, contactoEmpresa: 'Juan Carlos Pérez', telefonoContacto: '301 234 5678',
    notas: 'Revisión de documentación PESV y verificación de flota vehicular.'
  },
  {
    id: 'v3', fecha: '2026-02-10', hora: '15:00', empresa: empresas[3],
    ocVinculada: 'OC-2026-004', ocId: '4', tipoAuditoria: 'Calidad', auditor: auditores[0],
    direccion: 'Cll 30 #5-45, Santa Marta', estado: 'Programada', hallazgosCount: 0,
    duracionHoras: 4, contactoEmpresa: 'Roberto Acosta Díaz', telefonoContacto: '302 345 6789',
    notas: 'Auditoría de seguimiento ISO 9001. Verificar acciones correctivas previas.'
  },
  {
    id: 'v4', fecha: '2026-02-08', hora: '09:00', empresa: empresas[2],
    ocVinculada: 'OC-2026-003', ocId: '3', tipoAuditoria: 'ISO 28000', auditor: auditores[2],
    direccion: 'Av. Pedro de Heredia #45-120, Cartagena', estado: 'Completada', hallazgosCount: 5,
    duracionHoras: 6, contactoEmpresa: 'Andrea Gutiérrez', telefonoContacto: '303 456 7890',
    notas: 'Evaluación de seguridad en cadena de suministro portuaria.'
  },
  {
    id: 'v5', fecha: '2026-02-12', hora: '08:30', empresa: empresas[4],
    ocVinculada: 'OC-2026-005', ocId: '5', tipoAuditoria: 'SST', auditor: auditores[3],
    direccion: 'Puerto Industrial, Bodega 12, Barranquilla', estado: 'Programada', hallazgosCount: 0,
    duracionHoras: 8, contactoEmpresa: 'Luis Enrique Martínez', telefonoContacto: '304 567 8901',
    notas: 'Evaluación integral SST zona portuaria. Incluye áreas de carga y descarga.'
  },
  {
    id: 'v6', fecha: '2026-02-07', hora: '10:00', empresa: empresas[0],
    ocVinculada: 'OC-2026-006', ocId: '6', tipoAuditoria: 'PESV', auditor: auditores[1],
    direccion: 'Cra 54 #72-120, Barranquilla', estado: 'Completada', hallazgosCount: 3,
    duracionHoras: 3, contactoEmpresa: 'María Fernanda López', telefonoContacto: '300 123 4567',
    notas: 'Seguimiento PESV para flota de transporte interno completado.'
  },
  {
    id: 'v7', fecha: '2026-02-14', hora: '14:00', empresa: empresas[1],
    ocVinculada: 'OC-2026-002', ocId: '2', tipoAuditoria: 'PESV', auditor: auditores[1],
    direccion: 'Vía 40 #79-234, Barranquilla', estado: 'Reprogramada', hallazgosCount: 0,
    duracionHoras: 4, contactoEmpresa: 'Juan Carlos Pérez', telefonoContacto: '301 234 5678',
    notas: 'Reprogramada por solicitud de la empresa. Nueva fecha pendiente de confirmación.'
  },
  {
    id: 'v8', fecha: '2026-02-06', hora: '09:30', empresa: empresas[2],
    ocVinculada: 'OC-2026-007', ocId: '7', tipoAuditoria: 'SST', auditor: auditores[2],
    direccion: 'Terminal de Transporte, Cartagena', estado: 'Completada', hallazgosCount: 6,
    duracionHoras: 5, contactoEmpresa: 'Andrea Gutiérrez', telefonoContacto: '303 456 7890',
    notas: 'Evaluación estándares mínimos SST transporte terrestre. OC cerrada exitosamente.'
  },
  {
    id: 'v9', fecha: '2026-02-13', hora: '07:30', empresa: empresas[3],
    ocVinculada: 'OC-2026-004', ocId: '4', tipoAuditoria: 'Calidad', auditor: auditores[0],
    direccion: 'Zona Franca, Santa Marta', estado: 'Programada', hallazgosCount: 0,
    duracionHoras: 6, contactoEmpresa: 'Roberto Acosta Díaz', telefonoContacto: '302 345 6789',
    notas: 'Visita adicional para verificación de procesos de manufactura.'
  },
  {
    id: 'v10', fecha: '2026-02-09', hora: '10:30', empresa: empresas[4],
    ocVinculada: 'OC-2026-005', ocId: '5', tipoAuditoria: 'SST', auditor: auditores[3],
    direccion: 'Puerto Industrial, Bodega 12, Barranquilla', estado: 'Completada', hallazgosCount: 3,
    duracionHoras: 4, contactoEmpresa: 'Luis Enrique Martínez', telefonoContacto: '304 567 8901',
    notas: 'Primera visita de evaluación SST. Hallazgos en gestión de emergencias.'
  },
];

// ==================== HALLAZGOS ====================

export type TipoHallazgo = 'No Conformidad Mayor' | 'No Conformidad Menor' | 'Observación' | 'Oportunidad de Mejora';
export type NivelRiesgo = 'Alto' | 'Medio' | 'Bajo';
export type EstadoHallazgo = 'Pendiente' | 'En Informe' | 'Cerrado';

export interface Hallazgo {
  id: string;
  fecha: string;
  empresa: typeof empresas[0];
  visitaId: string;
  visitaCodigo: string;
  areaCampo: string;
  tipo: TipoHallazgo;
  descripcion: string;
  norma: string;
  articulo: string;
  nivelRiesgo: NivelRiesgo;
  estado: EstadoHallazgo;
  tipoAuditoria: 'SST' | 'Calidad' | 'PESV' | 'ISO 28000';
  tieneEvidenciaFoto: boolean;
  tieneEvidenciaDoc: boolean;
  analizadoPorIA: boolean;
  notasAuditor: string;
}

export const tipoHallazgoColors: Record<TipoHallazgo, string> = {
  'No Conformidad Mayor': 'bg-destructive/15 text-destructive border-destructive/30',
  'No Conformidad Menor': 'bg-warning/15 text-warning border-warning/30',
  'Observación': 'bg-[hsl(45,93%,90%)] text-[hsl(37,90%,41%)] border-[hsl(37,90%,51%)]/30',
  'Oportunidad de Mejora': 'bg-success/15 text-success border-success/30',
};

export const nivelRiesgoColors: Record<NivelRiesgo, string> = {
  'Alto': 'bg-destructive/15 text-destructive border-destructive/30',
  'Medio': 'bg-warning/15 text-warning border-warning/30',
  'Bajo': 'bg-success/15 text-success border-success/30',
};

export const estadoHallazgoColors: Record<EstadoHallazgo, string> = {
  'Pendiente': 'bg-muted text-muted-foreground',
  'En Informe': 'bg-primary/15 text-primary border-primary/30',
  'Cerrado': 'bg-success/15 text-success border-success/30',
};

export const areasCampo = [
  'Gestión Documental', 'Controles Operacionales', 'EPP', 'Señalización',
  'Gestión de Emergencias', 'Infraestructura', 'Capacitación', 'Documentación',
];

export const normasAplicables = [
  'Res. 0312/2019', 'D. 1072/2015', 'ISO 45001:2018', 'ISO 9001:2015',
  'ISO 28000:2022', 'Res. 40595/2022',
];

export const hallazgos: Hallazgo[] = [
  { id: 'h1', fecha: '2026-02-10', empresa: empresas[0], visitaId: 'v1', visitaCodigo: 'V-001', areaCampo: 'EPP', tipo: 'No Conformidad Mayor', descripcion: 'Personal de obra sin casco de seguridad en zona de excavación activa. Riesgo inminente de lesión por caída de objetos.', norma: 'Res. 0312/2019', articulo: 'Art. 16', nivelRiesgo: 'Alto', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: 'Se requiere acción inmediata. Notificar a supervisor de obra.' },
  { id: 'h2', fecha: '2026-02-10', empresa: empresas[0], visitaId: 'v1', visitaCodigo: 'V-001', areaCampo: 'Señalización', tipo: 'No Conformidad Menor', descripcion: 'Señalización de ruta de evacuación desactualizada. Falta señalización en nuevos accesos del segundo piso.', norma: 'Res. 0312/2019', articulo: 'Art. 25', nivelRiesgo: 'Medio', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: 'Actualizar planos de evacuación.' },
  { id: 'h3', fecha: '2026-02-10', empresa: empresas[0], visitaId: 'v1', visitaCodigo: 'V-001', areaCampo: 'Gestión de Emergencias', tipo: 'Observación', descripcion: 'Extintores con fecha de recarga próxima a vencer (marzo 2026). Se recomienda programar mantenimiento preventivo.', norma: 'D. 1072/2015', articulo: 'Art. 2.2.4.6.25', nivelRiesgo: 'Bajo', estado: 'En Informe', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: true, analizadoPorIA: false, notasAuditor: '' },
  { id: 'h4', fecha: '2026-02-10', empresa: empresas[0], visitaId: 'v1', visitaCodigo: 'V-001', areaCampo: 'Capacitación', tipo: 'Oportunidad de Mejora', descripcion: 'Implementar programa de inducción digital para contratistas con evaluación en línea antes de ingreso a obra.', norma: 'Res. 0312/2019', articulo: 'Art. 11', nivelRiesgo: 'Bajo', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: true, notasAuditor: 'Sugerencia aceptada por el cliente.' },
  { id: 'h5', fecha: '2026-02-10', empresa: empresas[1], visitaId: 'v2', visitaCodigo: 'V-002', areaCampo: 'Documentación', tipo: 'No Conformidad Menor', descripcion: 'Plan estratégico de seguridad vial no actualizado con la última resolución. Falta inclusión de rutas nuevas.', norma: 'Res. 40595/2022', articulo: 'Cap. 3', nivelRiesgo: 'Medio', estado: 'Pendiente', tipoAuditoria: 'PESV', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: true, notasAuditor: '' },
  { id: 'h6', fecha: '2026-02-10', empresa: empresas[1], visitaId: 'v2', visitaCodigo: 'V-002', areaCampo: 'Controles Operacionales', tipo: 'Observación', descripcion: 'Se recomienda implementar sistema GPS en tiempo real para monitoreo de velocidad de flota.', norma: 'Res. 40595/2022', articulo: 'Cap. 5', nivelRiesgo: 'Bajo', estado: 'Pendiente', tipoAuditoria: 'PESV', tieneEvidenciaFoto: false, tieneEvidenciaDoc: false, analizadoPorIA: false, notasAuditor: 'Verificar costos de implementación con proveedor.' },
  { id: 'h7', fecha: '2026-02-08', empresa: empresas[2], visitaId: 'v4', visitaCodigo: 'V-004', areaCampo: 'Gestión Documental', tipo: 'No Conformidad Mayor', descripcion: 'Procedimiento de control de acceso a zona portuaria no documentado. No existe registro de visitantes ni contratistas.', norma: 'ISO 28000:2022', articulo: 'Cláusula 8.2', nivelRiesgo: 'Alto', estado: 'En Informe', tipoAuditoria: 'ISO 28000', tieneEvidenciaFoto: true, tieneEvidenciaDoc: true, analizadoPorIA: true, notasAuditor: 'Hallazgo crítico para certificación.' },
  { id: 'h8', fecha: '2026-02-08', empresa: empresas[2], visitaId: 'v4', visitaCodigo: 'V-004', areaCampo: 'Infraestructura', tipo: 'No Conformidad Menor', descripcion: 'Cámaras de seguridad en muelle 3 fuera de servicio desde hace 15 días. Sin plan de mantenimiento correctivo.', norma: 'ISO 28000:2022', articulo: 'Cláusula 7.1', nivelRiesgo: 'Alto', estado: 'Pendiente', tipoAuditoria: 'ISO 28000', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: false, notasAuditor: '' },
  { id: 'h9', fecha: '2026-02-08', empresa: empresas[2], visitaId: 'v4', visitaCodigo: 'V-004', areaCampo: 'Controles Operacionales', tipo: 'Observación', descripcion: 'Sistema de sellos de seguridad en contenedores cumple parcialmente. Falta trazabilidad digital.', norma: 'ISO 28000:2022', articulo: 'Cláusula 8.3', nivelRiesgo: 'Medio', estado: 'En Informe', tipoAuditoria: 'ISO 28000', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: '' },
  { id: 'h10', fecha: '2026-02-08', empresa: empresas[2], visitaId: 'v4', visitaCodigo: 'V-004', areaCampo: 'Capacitación', tipo: 'Oportunidad de Mejora', descripcion: 'Implementar capacitación virtual en seguridad portuaria para personal temporal y contratistas.', norma: 'ISO 28000:2022', articulo: 'Cláusula 7.2', nivelRiesgo: 'Bajo', estado: 'Cerrado', tipoAuditoria: 'ISO 28000', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: false, notasAuditor: 'Plan de capacitación aprobado.' },
  { id: 'h11', fecha: '2026-02-08', empresa: empresas[2], visitaId: 'v4', visitaCodigo: 'V-004', areaCampo: 'Gestión de Emergencias', tipo: 'No Conformidad Menor', descripcion: 'Plan de contingencia para derrame de hidrocarburos desactualizado. No incluye nuevos tanques de almacenamiento.', norma: 'ISO 28000:2022', articulo: 'Cláusula 8.4', nivelRiesgo: 'Alto', estado: 'Pendiente', tipoAuditoria: 'ISO 28000', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: true, notasAuditor: '' },
  { id: 'h12', fecha: '2026-02-07', empresa: empresas[0], visitaId: 'v6', visitaCodigo: 'V-006', areaCampo: 'Documentación', tipo: 'No Conformidad Menor', descripcion: 'Registro de mantenimiento de vehículos incompleto. Faltan registros de 3 vehículos de flota interna.', norma: 'Res. 40595/2022', articulo: 'Cap. 4', nivelRiesgo: 'Medio', estado: 'Cerrado', tipoAuditoria: 'PESV', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: false, notasAuditor: 'Corregido durante la visita.' },
  { id: 'h13', fecha: '2026-02-07', empresa: empresas[0], visitaId: 'v6', visitaCodigo: 'V-006', areaCampo: 'Controles Operacionales', tipo: 'Observación', descripcion: 'Conductores sin capacitación actualizada en manejo defensivo. Última capacitación: junio 2025.', norma: 'Res. 40595/2022', articulo: 'Cap. 6', nivelRiesgo: 'Medio', estado: 'Cerrado', tipoAuditoria: 'PESV', tieneEvidenciaFoto: false, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: 'Se programó capacitación para marzo 2026.' },
  { id: 'h14', fecha: '2026-02-07', empresa: empresas[0], visitaId: 'v6', visitaCodigo: 'V-006', areaCampo: 'Gestión Documental', tipo: 'Oportunidad de Mejora', descripcion: 'Digitalizar formato de inspección preoperacional de vehículos para reducir errores de transcripción.', norma: 'Res. 40595/2022', articulo: 'Cap. 2', nivelRiesgo: 'Bajo', estado: 'Pendiente', tipoAuditoria: 'PESV', tieneEvidenciaFoto: false, tieneEvidenciaDoc: false, analizadoPorIA: false, notasAuditor: '' },
  { id: 'h15', fecha: '2026-02-06', empresa: empresas[2], visitaId: 'v8', visitaCodigo: 'V-008', areaCampo: 'EPP', tipo: 'No Conformidad Mayor', descripcion: 'Conductores sin chaleco reflectivo durante operaciones de carga nocturna en terminal.', norma: 'Res. 0312/2019', articulo: 'Art. 16', nivelRiesgo: 'Alto', estado: 'Cerrado', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: 'Se entregaron chalecos el mismo día.' },
  { id: 'h16', fecha: '2026-02-06', empresa: empresas[2], visitaId: 'v8', visitaCodigo: 'V-008', areaCampo: 'Señalización', tipo: 'No Conformidad Menor', descripcion: 'Falta demarcación de zonas de tránsito peatonal en área de maniobras del terminal.', norma: 'Res. 0312/2019', articulo: 'Art. 25', nivelRiesgo: 'Alto', estado: 'Cerrado', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: false, notasAuditor: '' },
  { id: 'h17', fecha: '2026-02-09', empresa: empresas[4], visitaId: 'v10', visitaCodigo: 'V-010', areaCampo: 'Gestión de Emergencias', tipo: 'No Conformidad Menor', descripcion: 'Brigada de emergencias con solo 3 miembros activos para un turno de 45 trabajadores.', norma: 'Res. 0312/2019', articulo: 'Art. 25', nivelRiesgo: 'Alto', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: false, tieneEvidenciaDoc: true, analizadoPorIA: true, notasAuditor: 'Reclutar mínimo 5 brigadistas adicionales.' },
  { id: 'h18', fecha: '2026-02-09', empresa: empresas[4], visitaId: 'v10', visitaCodigo: 'V-010', areaCampo: 'Infraestructura', tipo: 'Observación', descripcion: 'Iluminación insuficiente en acceso principal de bodega 12. Niveles por debajo de 100 lux.', norma: 'D. 1072/2015', articulo: 'Art. 2.2.4.6.24', nivelRiesgo: 'Medio', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: true, tieneEvidenciaDoc: false, analizadoPorIA: false, notasAuditor: '' },
  { id: 'h19', fecha: '2026-02-09', empresa: empresas[4], visitaId: 'v10', visitaCodigo: 'V-010', areaCampo: 'Capacitación', tipo: 'Oportunidad de Mejora', descripcion: 'Implementar programa de pausas activas con seguimiento digital para operarios de carga.', norma: 'Res. 0312/2019', articulo: 'Art. 15', nivelRiesgo: 'Bajo', estado: 'Pendiente', tipoAuditoria: 'SST', tieneEvidenciaFoto: false, tieneEvidenciaDoc: false, analizadoPorIA: true, notasAuditor: 'Evaluar con área de bienestar.' },
];

// ==================== INFORMES ====================

export type EstadoInforme = 'Borrador' | 'Aprobado' | 'Enviado';
export type TipoInforme = 'Informe Técnico ARL' | 'Estado de Sistemas' | 'Evaluación Estándares' | 'Capacitación' | 'Personalizado';

export interface Informe {
  id: string;
  titulo: string;
  ocVinculada: string;
  empresa: typeof empresas[0];
  tipo: TipoInforme;
  formatos: ('PDF' | 'DOCX' | 'XLSX')[];
  estado: EstadoInforme;
  fechaGeneracion: string;
  generadoPor: string;
}

export interface PlantillaInforme {
  id: string;
  nombre: string;
  formatos: ('PDF' | 'DOCX' | 'XLSX')[];
  vecesUsada: number;
  descripcion: string;
}

export const estadoInformeColors: Record<EstadoInforme, string> = {
  'Borrador': 'bg-muted text-muted-foreground',
  'Aprobado': 'bg-success/15 text-success border-success/30',
  'Enviado': 'bg-primary/15 text-primary border-primary/30',
};

export const informes: Informe[] = [
  { id: 'inf1', titulo: 'Informe Técnico SST — Constructora Caribe', ocVinculada: 'OC-2026-001', empresa: empresas[0], tipo: 'Informe Técnico ARL', formatos: ['PDF'], estado: 'Borrador', fechaGeneracion: '2026-02-10', generadoPor: auditores[0] },
  { id: 'inf2', titulo: 'Estado de Sistemas — Transportes del Litoral', ocVinculada: 'OC-2026-003', empresa: empresas[2], tipo: 'Estado de Sistemas', formatos: ['PDF', 'DOCX'], estado: 'Aprobado', fechaGeneracion: '2026-02-09', generadoPor: auditores[2] },
  { id: 'inf3', titulo: 'Evaluación Estándares Mínimos — Transportes del Litoral', ocVinculada: 'OC-2026-007', empresa: empresas[2], tipo: 'Evaluación Estándares', formatos: ['XLSX'], estado: 'Enviado', fechaGeneracion: '2026-02-07', generadoPor: auditores[2] },
  { id: 'inf4', titulo: 'Informe PESV — Constructora Caribe', ocVinculada: 'OC-2026-006', empresa: empresas[0], tipo: 'Informe Técnico ARL', formatos: ['PDF', 'DOCX'], estado: 'Enviado', fechaGeneracion: '2026-02-08', generadoPor: auditores[1] },
  { id: 'inf5', titulo: 'Informe Técnico ISO 28000 — Transportes del Litoral', ocVinculada: 'OC-2026-003', empresa: empresas[2], tipo: 'Informe Técnico ARL', formatos: ['PDF'], estado: 'Borrador', fechaGeneracion: '2026-02-10', generadoPor: auditores[2] },
  { id: 'inf6', titulo: 'Evaluación Integral SST — Soluciones Portuarias', ocVinculada: 'OC-2026-005', empresa: empresas[4], tipo: 'Evaluación Estándares', formatos: ['PDF', 'XLSX'], estado: 'Aprobado', fechaGeneracion: '2026-02-09', generadoPor: auditores[3] },
  { id: 'inf7', titulo: 'Capacitación EPP — Constructora Caribe', ocVinculada: 'OC-2026-001', empresa: empresas[0], tipo: 'Capacitación', formatos: ['PDF'], estado: 'Enviado', fechaGeneracion: '2026-02-06', generadoPor: auditores[0] },
];

export const plantillasInforme: PlantillaInforme[] = [
  { id: 'pl1', nombre: 'Informe Técnico ARL', formatos: ['PDF'], vecesUsada: 24, descripcion: 'Formato estándar para informes técnicos dirigidos a ARL con secciones de hallazgos, recomendaciones y plan de acción.' },
  { id: 'pl2', nombre: 'Informe Estado de Sistemas', formatos: ['PDF', 'DOCX'], vecesUsada: 12, descripcion: 'Informe ejecutivo con gráficos de cumplimiento por sistema de gestión y resumen de hallazgos.' },
  { id: 'pl3', nombre: 'Evaluación Estándares Mínimos', formatos: ['XLSX'], vecesUsada: 18, descripcion: 'Matriz de evaluación según Res. 0312/2019 con cálculo automático de porcentaje de cumplimiento.' },
  { id: 'pl4', nombre: 'Informe de Capacitación', formatos: ['PDF'], vecesUsada: 9, descripcion: 'Formato para evidencia de capacitaciones con lista de asistentes, evaluación y certificados.' },
  { id: 'pl5', nombre: 'Personalizado', formatos: ['PDF', 'DOCX', 'XLSX'], vecesUsada: 5, descripcion: 'Plantilla en blanco para crear informes personalizados según requerimientos específicos del cliente.' },
];

// ==================== EMPRESAS ====================

export interface EmpresaCompleta {
  id: string;
  nombre: string;
  nit: string;
  ciudad: string;
  direccion: string;
  sector: string;
  contactoPrincipal: { nombre: string; cargo: string; telefono: string; email: string };
  ocActivas: number;
  ultimoInforme: string;
  cumplimientoGeneral: number;
  cumplimientoPorSistema: { sistema: string; valor: number }[];
  notas: string;
}

export const empresasCompletas: EmpresaCompleta[] = [
  {
    id: '1', nombre: 'Constructora Caribe S.A.S.', nit: '900.123.456-7', ciudad: 'Barranquilla',
    direccion: 'Cra 54 #72-120, Barranquilla, Atlántico', sector: 'Construcción',
    contactoPrincipal: { nombre: 'María Fernanda López', cargo: 'Coordinadora SST', telefono: '300 123 4567', email: 'mflopez@constructoracaribe.com.co' },
    ocActivas: 2, ultimoInforme: '2026-02-10', cumplimientoGeneral: 68,
    cumplimientoPorSistema: [{ sistema: 'SG-SST', valor: 70 }, { sistema: 'PESV', valor: 55 }],
    notas: 'Cliente desde 2024. Proyecto de vivienda VIS en zona norte.'
  },
  {
    id: '2', nombre: 'Logística del Norte S.A.', nit: '800.234.567-8', ciudad: 'Barranquilla',
    direccion: 'Vía 40 #79-234, Barranquilla, Atlántico', sector: 'Logística',
    contactoPrincipal: { nombre: 'Juan Carlos Pérez', cargo: 'Gerente de Operaciones', telefono: '301 234 5678', email: 'jcperez@logisticanorte.com.co' },
    ocActivas: 1, ultimoInforme: '2026-01-28', cumplimientoGeneral: 42,
    cumplimientoPorSistema: [{ sistema: 'PESV', valor: 40 }, { sistema: 'SG-SST', valor: 44 }],
    notas: 'Requiere mejoras urgentes en PESV.'
  },
  {
    id: '3', nombre: 'Transportes del Litoral S.A.', nit: '900.345.678-9', ciudad: 'Cartagena',
    direccion: 'Av. Pedro de Heredia #45-120, Cartagena, Bolívar', sector: 'Transporte',
    contactoPrincipal: { nombre: 'Andrea Gutiérrez', cargo: 'Directora de Calidad', telefono: '303 456 7890', email: 'agutierrez@transporteslitoral.com.co' },
    ocActivas: 1, ultimoInforme: '2026-02-09', cumplimientoGeneral: 75,
    cumplimientoPorSistema: [{ sistema: 'ISO 28000', valor: 72 }, { sistema: 'SG-SST', valor: 82 }, { sistema: 'ISO 9001', valor: 70 }],
    notas: 'En proceso de certificación ISO 28000.'
  },
  {
    id: '4', nombre: 'Industrias Barlovento S.A.S.', nit: '800.456.789-0', ciudad: 'Santa Marta',
    direccion: 'Cll 30 #5-45, Santa Marta, Magdalena', sector: 'Industrial',
    contactoPrincipal: { nombre: 'Roberto Acosta Díaz', cargo: 'Jefe de Planta', telefono: '302 345 6789', email: 'racosta@barlovento.com.co' },
    ocActivas: 1, ultimoInforme: '2026-01-15', cumplimientoGeneral: 55,
    cumplimientoPorSistema: [{ sistema: 'ISO 9001', valor: 62 }, { sistema: 'SG-SST', valor: 48 }],
    notas: 'OC de calidad vencida. Requiere seguimiento urgente.'
  },
  {
    id: '5', nombre: 'Soluciones Portuarias del Atlántico S.A.S.', nit: '900.567.890-1', ciudad: 'Barranquilla',
    direccion: 'Puerto Industrial, Bodega 12, Barranquilla, Atlántico', sector: 'Servicios',
    contactoPrincipal: { nombre: 'Luis Enrique Martínez', cargo: 'Gerente General', telefono: '304 567 8901', email: 'lemartinez@solucionesportuarias.com.co' },
    ocActivas: 1, ultimoInforme: '2026-02-09', cumplimientoGeneral: 80,
    cumplimientoPorSistema: [{ sistema: 'SG-SST', valor: 85 }, { sistema: 'ISO 45001', valor: 75 }],
    notas: 'Excelente compromiso con SST. Candidato para certificación ISO 45001.'
  },
  {
    id: '6', nombre: 'Alimentos del Valle S.A.', nit: '800.678.901-2', ciudad: 'Barranquilla',
    direccion: 'Zona Industrial de Malambo, Km 5, Atlántico', sector: 'Industrial',
    contactoPrincipal: { nombre: 'Carolina Vega Rincón', cargo: 'Directora de Calidad', telefono: '305 678 9012', email: 'cvega@alimentosdelvalle.com.co' },
    ocActivas: 0, ultimoInforme: '2025-12-20', cumplimientoGeneral: 88,
    cumplimientoPorSistema: [{ sistema: 'ISO 9001', valor: 92 }, { sistema: 'SG-SST', valor: 84 }],
    notas: 'Cliente estrella. Certificación ISO 9001 vigente.'
  },
];
