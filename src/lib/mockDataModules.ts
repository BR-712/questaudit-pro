// Mock data for Capacitaciones, Gestión IA, Administración modules

import { empresas, auditores } from './mockData';

// ==================== CAPACITACIONES ====================

export interface Asistente {
  id: string;
  nombre: string;
  cedula: string;
  cargo: string;
  firmo: boolean;
  puntajeEvaluacion: number | null;
}

export interface Capacitacion {
  id: string;
  tema: string;
  empresa: typeof empresas[0];
  instructor: string;
  fecha: string;
  hora: string;
  duracionHoras: number;
  normativaRelacionada: string;
  descripcion: string;
  estado: 'Programada' | 'En Curso' | 'Completada';
  asistentesEstimados: number;
  asistentes: Asistente[];
  evaluacionPromedio: number | null;
  certificadosGenerados: boolean;
}

export const capacitaciones: Capacitacion[] = [
  {
    id: 'cap1', tema: 'Trabajo en Alturas', empresa: empresas[0], instructor: auditores[0],
    fecha: '2026-02-05', hora: '08:00', duracionHoras: 4, normativaRelacionada: 'Res. 0312/2019',
    descripcion: 'Capacitación teórico-práctica sobre trabajo seguro en alturas, uso de arnés y líneas de vida.',
    estado: 'Completada', asistentesEstimados: 15,
    asistentes: [
      { id: 'a1', nombre: 'Pedro Martínez Gómez', cedula: '1.045.678.901', cargo: 'Obrero', firmo: true, puntajeEvaluacion: 90 },
      { id: 'a2', nombre: 'Sandra Ruiz Montoya', cedula: '1.045.789.012', cargo: 'Supervisora', firmo: true, puntajeEvaluacion: 95 },
      { id: 'a3', nombre: 'Jorge Castañeda López', cedula: '1.045.890.123', cargo: 'Obrero', firmo: true, puntajeEvaluacion: 78 },
      { id: 'a4', nombre: 'Ana María Herrera', cedula: '1.045.901.234', cargo: 'Ingeniera', firmo: true, puntajeEvaluacion: 88 },
      { id: 'a5', nombre: 'Luis Fernando Díaz', cedula: '1.046.012.345', cargo: 'Obrero', firmo: true, puntajeEvaluacion: 72 },
      { id: 'a6', nombre: 'María Elena Vargas', cedula: '1.046.123.456', cargo: 'Coordinadora', firmo: true, puntajeEvaluacion: 92 },
      { id: 'a7', nombre: 'Carlos Andrés Peña', cedula: '1.046.234.567', cargo: 'Obrero', firmo: true, puntajeEvaluacion: 85 },
      { id: 'a8', nombre: 'Daniela Ospina Rojas', cedula: '1.046.345.678', cargo: 'Practicante', firmo: false, puntajeEvaluacion: 80 },
    ],
    evaluacionPromedio: 85, certificadosGenerados: true,
  },
  {
    id: 'cap2', tema: 'Manejo de Extintores', empresa: empresas[1], instructor: auditores[1],
    fecha: '2026-02-07', hora: '14:00', duracionHoras: 2, normativaRelacionada: 'D. 1072/2015',
    descripcion: 'Uso correcto de extintores portátiles, tipos de fuego y procedimientos de respuesta.',
    estado: 'Completada', asistentesEstimados: 20,
    asistentes: [
      { id: 'a9', nombre: 'Fabián Morales Torres', cedula: '1.047.456.789', cargo: 'Operario', firmo: true, puntajeEvaluacion: 88 },
      { id: 'a10', nombre: 'Camila Restrepo Díaz', cedula: '1.047.567.890', cargo: 'Administrativa', firmo: true, puntajeEvaluacion: 76 },
      { id: 'a11', nombre: 'Andrés Felipe León', cedula: '1.047.678.901', cargo: 'Conductor', firmo: true, puntajeEvaluacion: 82 },
      { id: 'a12', nombre: 'Diana Marcela Quintero', cedula: '1.047.789.012', cargo: 'Recepcionista', firmo: true, puntajeEvaluacion: 90 },
    ],
    evaluacionPromedio: 84, certificadosGenerados: true,
  },
  {
    id: 'cap3', tema: 'Primeros Auxilios', empresa: empresas[2], instructor: auditores[2],
    fecha: '2026-02-10', hora: '09:00', duracionHoras: 6, normativaRelacionada: 'Res. 0312/2019',
    descripcion: 'Técnicas básicas de primeros auxilios, RCP, manejo de heridas y fracturas en el ámbito laboral.',
    estado: 'En Curso', asistentesEstimados: 12,
    asistentes: [
      { id: 'a13', nombre: 'Ricardo Salazar Mejía', cedula: '1.048.890.123', cargo: 'Operario portuario', firmo: true, puntajeEvaluacion: null },
      { id: 'a14', nombre: 'Paola Andrea Gómez', cedula: '1.048.901.234', cargo: 'Enfermera', firmo: true, puntajeEvaluacion: null },
      { id: 'a15', nombre: 'Miguel Ángel Barrios', cedula: '1.049.012.345', cargo: 'Supervisor', firmo: false, puntajeEvaluacion: null },
    ],
    evaluacionPromedio: null, certificadosGenerados: false,
  },
  {
    id: 'cap4', tema: 'Manejo Defensivo', empresa: empresas[1], instructor: auditores[1],
    fecha: '2026-02-14', hora: '08:00', duracionHoras: 8, normativaRelacionada: 'Res. 40595/2022',
    descripcion: 'Técnicas de conducción preventiva, normativa PESV y comportamiento seguro en vía.',
    estado: 'Programada', asistentesEstimados: 25, asistentes: [],
    evaluacionPromedio: null, certificadosGenerados: false,
  },
  {
    id: 'cap5', tema: 'Identificación de Peligros', empresa: empresas[3], instructor: auditores[0],
    fecha: '2026-02-18', hora: '09:00', duracionHoras: 4, normativaRelacionada: 'D. 1072/2015',
    descripcion: 'Metodología para identificar peligros, valorar riesgos y establecer controles en el puesto de trabajo.',
    estado: 'Programada', asistentesEstimados: 18, asistentes: [],
    evaluacionPromedio: null, certificadosGenerados: false,
  },
  {
    id: 'cap6', tema: 'Uso de EPP', empresa: empresas[4], instructor: auditores[3],
    fecha: '2026-02-03', hora: '07:30', duracionHoras: 3, normativaRelacionada: 'Res. 0312/2019',
    descripcion: 'Selección, uso, mantenimiento y disposición final de elementos de protección personal.',
    estado: 'Completada', asistentesEstimados: 30,
    asistentes: [
      { id: 'a16', nombre: 'Héctor Julio Padilla', cedula: '1.050.123.456', cargo: 'Operario', firmo: true, puntajeEvaluacion: 75 },
      { id: 'a17', nombre: 'Laura Melissa Acosta', cedula: '1.050.234.567', cargo: 'Operaria', firmo: true, puntajeEvaluacion: 88 },
      { id: 'a18', nombre: 'José David Navarro', cedula: '1.050.345.678', cargo: 'Supervisor', firmo: true, puntajeEvaluacion: 92 },
      { id: 'a19', nombre: 'Karen Sofía Mendoza', cedula: '1.050.456.789', cargo: 'Brigadista', firmo: true, puntajeEvaluacion: 95 },
      { id: 'a20', nombre: 'Iván Darío Polo', cedula: '1.050.567.890', cargo: 'Operario', firmo: true, puntajeEvaluacion: 70 },
    ],
    evaluacionPromedio: 84, certificadosGenerados: false,
  },
  {
    id: 'cap7', tema: 'Gestión del Cambio', empresa: empresas[2], instructor: auditores[2],
    fecha: '2026-02-20', hora: '10:00', duracionHoras: 4, normativaRelacionada: 'ISO 28000:2022',
    descripcion: 'Procedimientos para gestión del cambio en operaciones de seguridad portuaria.',
    estado: 'Programada', asistentesEstimados: 10, asistentes: [],
    evaluacionPromedio: null, certificadosGenerados: false,
  },
  {
    id: 'cap8', tema: 'Investigación de Accidentes', empresa: empresas[0], instructor: auditores[0],
    fecha: '2026-01-28', hora: '08:00', duracionHoras: 6, normativaRelacionada: 'D. 1072/2015',
    descripcion: 'Metodología de investigación de incidentes y accidentes de trabajo según normativa vigente.',
    estado: 'Completada', asistentesEstimados: 12,
    asistentes: [
      { id: 'a21', nombre: 'Natalia Ríos Castro', cedula: '1.051.678.901', cargo: 'HSEQ', firmo: true, puntajeEvaluacion: 96 },
      { id: 'a22', nombre: 'Esteban Duarte Gil', cedula: '1.051.789.012', cargo: 'Supervisor', firmo: true, puntajeEvaluacion: 88 },
      { id: 'a23', nombre: 'Valentina Arango Ríos', cedula: '1.051.890.123', cargo: 'Coordinadora', firmo: true, puntajeEvaluacion: 91 },
    ],
    evaluacionPromedio: 92, certificadosGenerados: true,
  },
];

export const estadoCapacitacionColors: Record<string, string> = {
  'Programada': 'bg-muted text-muted-foreground',
  'En Curso': 'bg-primary/15 text-primary border-primary/30',
  'Completada': 'bg-success/15 text-success border-success/30',
};

// ==================== GESTIÓN IA ====================

export interface PromptIA {
  id: string;
  nombre: string;
  tipoAuditoria: 'SST' | 'Calidad' | 'PESV' | 'ISO 28000' | 'General';
  descripcion: string;
  texto: string;
  tasaAceptacion: number;
  vecesUsado: number;
  ultimaEdicion: string;
  categoria: 'predeterminado' | 'organizacion' | 'personal';
  compartido: boolean;
}

export interface AnalisisIA {
  id: string;
  fecha: string;
  tipoEvidencia: 'Foto' | 'PDF' | 'DOCX';
  promptUtilizado: string;
  promptId: string;
  hallazgoVinculado: string;
  respuestaIA: string;
  decision: 'Aceptada' | 'Modificada' | 'Rechazada';
  auditor: string;
  modificaciones: string;
}

export const promptsIA: PromptIA[] = [
  {
    id: 'p1', nombre: 'Análisis SST General', tipoAuditoria: 'SST',
    descripcion: 'Analiza evidencia fotográfica o documental de condiciones SST e identifica hallazgos según normativa colombiana.',
    texto: 'Analiza la siguiente evidencia de una auditoría de {tipo_auditoria}. Identifica posibles hallazgos relacionados con {area_campo} según la normativa {norma}. Clasifica cada hallazgo como {tipo_hallazgo} y proporciona una descripción técnica detallada.',
    tasaAceptacion: 87, vecesUsado: 143, ultimaEdicion: '2026-01-15', categoria: 'predeterminado', compartido: false,
  },
  {
    id: 'p2', nombre: 'Evaluación Calidad ISO 9001', tipoAuditoria: 'Calidad',
    descripcion: 'Evalúa conformidad de procesos documentados contra requisitos ISO 9001:2015.',
    texto: 'Evalúa la conformidad del proceso documentado en la evidencia con los requisitos de ISO 9001:2015. Identifica no conformidades, observaciones y oportunidades de mejora. Referencia las cláusulas específicas aplicables.',
    tasaAceptacion: 82, vecesUsado: 67, ultimaEdicion: '2026-01-20', categoria: 'predeterminado', compartido: false,
  },
  {
    id: 'p3', nombre: 'Verificación PESV', tipoAuditoria: 'PESV',
    descripcion: 'Verifica cumplimiento del Plan Estratégico de Seguridad Vial según Res. 40595/2022.',
    texto: 'Analiza la evidencia del Plan Estratégico de Seguridad Vial. Verifica el cumplimiento de los requisitos de la Resolución 40595 de 2022. Identifica brechas en {area_campo} y sugiere acciones correctivas.',
    tasaAceptacion: 79, vecesUsado: 45, ultimaEdicion: '2026-01-25', categoria: 'predeterminado', compartido: false,
  },
  {
    id: 'p4', nombre: 'Auditoría ISO 28000', tipoAuditoria: 'ISO 28000',
    descripcion: 'Evalúa controles de seguridad en cadena de suministro según ISO 28000:2022.',
    texto: 'Evalúa los controles de seguridad documentados en la evidencia según ISO 28000:2022. Identifica vulnerabilidades en la cadena de suministro, fallas en controles de acceso y brechas en procedimientos de seguridad.',
    tasaAceptacion: 75, vecesUsado: 32, ultimaEdicion: '2026-02-01', categoria: 'predeterminado', compartido: false,
  },
  {
    id: 'p5', nombre: 'Análisis General de Evidencia', tipoAuditoria: 'General',
    descripcion: 'Análisis multipropósito aplicable a cualquier tipo de auditoría y normativa.',
    texto: 'Analiza la evidencia proporcionada en el contexto de una auditoría de {tipo_auditoria}. Identifica hallazgos, clasifícalos por severidad y proporciona recomendaciones de mejora basadas en la normativa {norma}.',
    tasaAceptacion: 71, vecesUsado: 89, ultimaEdicion: '2026-02-05', categoria: 'predeterminado', compartido: false,
  },
  {
    id: 'p6', nombre: 'EPP y Señalización', tipoAuditoria: 'SST',
    descripcion: 'Prompt personalizado para evaluar uso de EPP y estado de señalización en obra.',
    texto: 'Analiza la fotografía de campo y evalúa: 1) Uso correcto de EPP por parte del personal visible. 2) Estado de la señalización de seguridad. 3) Condiciones de orden y aseo. Clasifica hallazgos según Res. 0312/2019.',
    tasaAceptacion: 91, vecesUsado: 28, ultimaEdicion: '2026-02-08', categoria: 'organizacion', compartido: true,
  },
  {
    id: 'p7', nombre: 'Análisis Documental Rápido', tipoAuditoria: 'General',
    descripcion: 'Análisis rápido de documentos para verificar vigencia y completitud.',
    texto: 'Revisa el documento proporcionado y verifica: vigencia, firmas requeridas, completitud de campos obligatorios y coherencia con los requisitos de {norma}. Señala cualquier inconsistencia o dato faltante.',
    tasaAceptacion: 84, vecesUsado: 56, ultimaEdicion: '2026-02-06', categoria: 'organizacion', compartido: true,
  },
  {
    id: 'p8', nombre: 'Mi prompt de emergencias', tipoAuditoria: 'SST',
    descripcion: 'Evaluación personalizada de planes y equipos de emergencia.',
    texto: 'Evalúa el estado de los equipos de emergencia visibles en la evidencia. Verifica extintores, botiquines, camillas, señalización de rutas de evacuación. Compara con los requisitos del Art. 25 de la Res. 0312/2019.',
    tasaAceptacion: 88, vecesUsado: 15, ultimaEdicion: '2026-02-09', categoria: 'personal', compartido: false,
  },
];

export const analisisIA: AnalisisIA[] = [
  { id: 'ai1', fecha: '2026-02-10 08:45', tipoEvidencia: 'Foto', promptUtilizado: 'Análisis SST General', promptId: 'p1', hallazgoVinculado: 'h1', respuestaIA: 'Se detecta personal sin casco de seguridad en zona de excavación activa. Riesgo alto de lesión por caída de objetos. No conformidad mayor según Art. 16 de Res. 0312/2019.', decision: 'Aceptada', auditor: auditores[0], modificaciones: '' },
  { id: 'ai2', fecha: '2026-02-10 09:12', tipoEvidencia: 'Foto', promptUtilizado: 'EPP y Señalización', promptId: 'p6', hallazgoVinculado: 'h2', respuestaIA: 'Señalización de ruta de evacuación desactualizada en el segundo piso. Se identifican nuevos accesos sin señalizar. No conformidad menor según Art. 25 de Res. 0312/2019.', decision: 'Modificada', auditor: auditores[0], modificaciones: 'Se ajustó la clasificación de NCM a NC Menor y se agregó detalle sobre los accesos faltantes.' },
  { id: 'ai3', fecha: '2026-02-10 10:30', tipoEvidencia: 'PDF', promptUtilizado: 'Verificación PESV', promptId: 'p3', hallazgoVinculado: 'h5', respuestaIA: 'El Plan Estratégico de Seguridad Vial no incluye las actualizaciones requeridas por la Res. 40595/2022. Faltan las nuevas rutas de operación incorporadas en el último trimestre.', decision: 'Aceptada', auditor: auditores[1], modificaciones: '' },
  { id: 'ai4', fecha: '2026-02-08 09:30', tipoEvidencia: 'Foto', promptUtilizado: 'Auditoría ISO 28000', promptId: 'p4', hallazgoVinculado: 'h7', respuestaIA: 'No se evidencia procedimiento documentado de control de acceso a la zona portuaria. No existe sistema de registro de visitantes ni contratistas. No conformidad mayor según Cláusula 8.2.', decision: 'Aceptada', auditor: auditores[2], modificaciones: '' },
  { id: 'ai5', fecha: '2026-02-08 10:15', tipoEvidencia: 'Foto', promptUtilizado: 'Análisis General de Evidencia', promptId: 'p5', hallazgoVinculado: 'h9', respuestaIA: 'Sistema de sellos de seguridad en contenedores presenta cumplimiento parcial. Se requiere implementación de trazabilidad digital para completar el requisito de la Cláusula 8.3.', decision: 'Aceptada', auditor: auditores[2], modificaciones: '' },
  { id: 'ai6', fecha: '2026-02-08 11:00', tipoEvidencia: 'DOCX', promptUtilizado: 'Análisis Documental Rápido', promptId: 'p7', hallazgoVinculado: 'h11', respuestaIA: 'Plan de contingencia para derrame de hidrocarburos con fecha de última actualización en 2024. No incluye los nuevos tanques de almacenamiento instalados en 2025. Requiere actualización urgente.', decision: 'Modificada', auditor: auditores[2], modificaciones: 'Se agregó referencia específica a la Cláusula 8.4 de ISO 28000.' },
  { id: 'ai7', fecha: '2026-02-10 11:45', tipoEvidencia: 'Foto', promptUtilizado: 'Análisis SST General', promptId: 'p1', hallazgoVinculado: 'h4', respuestaIA: 'Se identifica oportunidad de mejora en el proceso de inducción de contratistas. Se recomienda implementar sistema digital de inducción con evaluación en línea antes del ingreso a obra.', decision: 'Aceptada', auditor: auditores[0], modificaciones: '' },
  { id: 'ai8', fecha: '2026-02-07 10:30', tipoEvidencia: 'PDF', promptUtilizado: 'Verificación PESV', promptId: 'p3', hallazgoVinculado: 'h13', respuestaIA: 'Los registros de capacitación en manejo defensivo están desactualizados. La última capacitación data de junio 2025, superando el período máximo recomendado de 6 meses.', decision: 'Aceptada', auditor: auditores[1], modificaciones: '' },
  { id: 'ai9', fecha: '2026-02-06 10:00', tipoEvidencia: 'Foto', promptUtilizado: 'EPP y Señalización', promptId: 'p6', hallazgoVinculado: 'h15', respuestaIA: 'Conductores realizando operaciones de carga nocturna sin chaleco reflectivo. No conformidad mayor por incumplimiento de requisitos de EPP en operaciones de alto riesgo.', decision: 'Aceptada', auditor: auditores[2], modificaciones: '' },
  { id: 'ai10', fecha: '2026-02-09 11:00', tipoEvidencia: 'DOCX', promptUtilizado: 'Análisis SST General', promptId: 'p1', hallazgoVinculado: 'h17', respuestaIA: 'La brigada de emergencias cuenta con solo 3 miembros activos para un turno de 45 trabajadores. Según la normativa, se requiere un mínimo de 8 brigadistas para esta operación.', decision: 'Aceptada', auditor: auditores[3], modificaciones: '' },
  { id: 'ai11', fecha: '2026-02-09 11:30', tipoEvidencia: 'Foto', promptUtilizado: 'Mi prompt de emergencias', promptId: 'p8', hallazgoVinculado: 'h19', respuestaIA: 'Se recomienda implementar programa de pausas activas con seguimiento digital. Los operarios de carga realizan movimientos repetitivos sin intervalos de descanso programados.', decision: 'Modificada', auditor: auditores[3], modificaciones: 'Se reclasificó como oportunidad de mejora y se vinculó al Art. 15 de Res. 0312/2019.' },
  { id: 'ai12', fecha: '2026-02-05 09:30', tipoEvidencia: 'Foto', promptUtilizado: 'Análisis SST General', promptId: 'p1', hallazgoVinculado: '', respuestaIA: 'Condiciones generales del área de trabajo aceptables. EPP correctamente utilizado. No se identifican hallazgos significativos.', decision: 'Rechazada', auditor: auditores[0], modificaciones: '' },
  { id: 'ai13', fecha: '2026-02-04 14:00', tipoEvidencia: 'PDF', promptUtilizado: 'Evaluación Calidad ISO 9001', promptId: 'p2', hallazgoVinculado: '', respuestaIA: 'El procedimiento de control de documentos cumple con los requisitos de ISO 9001:2015 Cláusula 7.5. Sin embargo, se sugiere mejorar el control de versiones digital.', decision: 'Rechazada', auditor: auditores[0], modificaciones: '' },
  { id: 'ai14', fecha: '2026-02-03 08:45', tipoEvidencia: 'Foto', promptUtilizado: 'EPP y Señalización', promptId: 'p6', hallazgoVinculado: '', respuestaIA: 'Detección de uso incorrecto de guantes en operación de soldadura. Se requieren guantes especiales resistentes al calor en lugar de los guantes de cuero estándar observados.', decision: 'Aceptada', auditor: auditores[3], modificaciones: '' },
  { id: 'ai15', fecha: '2026-02-02 10:15', tipoEvidencia: 'DOCX', promptUtilizado: 'Análisis Documental Rápido', promptId: 'p7', hallazgoVinculado: '', respuestaIA: 'Documento de matriz de riesgos con última actualización de noviembre 2025. Faltan 3 procesos nuevos incorporados en enero 2026. Requiere actualización inmediata.', decision: 'Modificada', auditor: auditores[0], modificaciones: 'Se ajustó la fecha de referencia y se agregaron los procesos específicos faltantes.' },
  { id: 'ai16', fecha: '2026-02-01 11:00', tipoEvidencia: 'Foto', promptUtilizado: 'Análisis General de Evidencia', promptId: 'p5', hallazgoVinculado: '', respuestaIA: 'Zona de almacenamiento de químicos cumple parcialmente. Etiquetas del SGA en buen estado pero falta la hoja de seguridad visible en el punto de uso.', decision: 'Aceptada', auditor: auditores[2], modificaciones: '' },
  { id: 'ai17', fecha: '2026-01-31 09:00', tipoEvidencia: 'Foto', promptUtilizado: 'Auditoría ISO 28000', promptId: 'p4', hallazgoVinculado: '', respuestaIA: 'Perímetro de seguridad del muelle 5 con cerca deteriorada en sector noreste. Riesgo de acceso no autorizado. Se requiere reparación inmediata.', decision: 'Aceptada', auditor: auditores[2], modificaciones: '' },
  { id: 'ai18', fecha: '2026-01-30 14:30', tipoEvidencia: 'PDF', promptUtilizado: 'Verificación PESV', promptId: 'p3', hallazgoVinculado: '', respuestaIA: 'Registro de alcoholimetría incompleto. Solo se evidencian controles en turno diurno. El PESV exige controles aleatorios en todos los turnos operativos.', decision: 'Aceptada', auditor: auditores[1], modificaciones: '' },
  { id: 'ai19', fecha: '2026-01-29 10:00', tipoEvidencia: 'Foto', promptUtilizado: 'Mi prompt de emergencias', promptId: 'p8', hallazgoVinculado: '', respuestaIA: 'Extintor en pasillo principal con fecha de recarga vencida (octubre 2025). Botiquín de primeros auxilios sin inventario visible. Camilla de emergencia sin cinturones de sujeción.', decision: 'Modificada', auditor: auditores[0], modificaciones: 'Se separaron en 3 hallazgos individuales.' },
  { id: 'ai20', fecha: '2026-01-28 08:00', tipoEvidencia: 'DOCX', promptUtilizado: 'Evaluación Calidad ISO 9001', promptId: 'p2', hallazgoVinculado: '', respuestaIA: 'Manual de calidad con estructura adecuada pero sin referencia al contexto de la organización (Cláusula 4.1). Falta análisis de partes interesadas actualizado.', decision: 'Rechazada', auditor: auditores[0], modificaciones: '' },
];

export const decisionColors: Record<string, string> = {
  'Aceptada': 'bg-success/15 text-success border-success/30',
  'Modificada': 'bg-warning/15 text-warning border-warning/30',
  'Rechazada': 'bg-destructive/15 text-destructive border-destructive/30',
};

export const tipoAuditoriaPromptColors: Record<string, string> = {
  'SST': 'bg-secondary text-secondary-foreground',
  'Calidad': 'bg-primary/15 text-primary border-primary/30',
  'PESV': 'bg-warning/15 text-warning border-warning/30',
  'ISO 28000': 'bg-[hsl(25,90%,92%)] text-[hsl(25,80%,40%)] border-[hsl(25,80%,50%)]/30',
  'General': 'bg-info/15 text-info border-info/30',
};

// ==================== ADMINISTRACIÓN ====================

export interface UsuarioAdmin {
  id: string;
  nombre: string;
  email: string;
  rol: 'Super Admin' | 'Admin' | 'Coordinador' | 'Auditor' | 'Capacitador';
  activo: boolean;
  ultimoLogin: string;
  avatar: string;
}

export interface InvitacionPendiente {
  id: string;
  email: string;
  nombre: string;
  rol: string;
  fechaEnvio: string;
  estado: 'Pendiente' | 'Expirada' | 'Aceptada';
}

export interface EventoSeguridad {
  id: string;
  tipo: 'login_exitoso' | 'login_fallido' | 'cambio_password' | 'sesion_cerrada' | 'usuario_invitado';
  usuario: string;
  descripcion: string;
  ip: string;
  dispositivo: string;
  fecha: string;
}

export const usuariosAdmin: UsuarioAdmin[] = [
  { id: 'u1', nombre: 'Andrés Mejía Vargas', email: 'amejia@questsst.com.co', rol: 'Super Admin', activo: true, ultimoLogin: '2026-02-10T08:30:00', avatar: 'AM' },
  { id: 'u2', nombre: 'Laura Castillo Díaz', email: 'lcastillo@questsst.com.co', rol: 'Auditor', activo: true, ultimoLogin: '2026-02-10T07:45:00', avatar: 'LC' },
  { id: 'u3', nombre: 'Carlos Herrera Mendoza', email: 'cherrera@questsst.com.co', rol: 'Auditor', activo: true, ultimoLogin: '2026-02-09T16:20:00', avatar: 'CH' },
  { id: 'u4', nombre: 'Valentina Rojas Peña', email: 'vrojas@questsst.com.co', rol: 'Capacitador', activo: true, ultimoLogin: '2026-02-10T06:15:00', avatar: 'VR' },
  { id: 'u5', nombre: 'Diego Parra Solano', email: 'dparra@questsst.com.co', rol: 'Auditor', activo: false, ultimoLogin: '2026-01-15T10:00:00', avatar: 'DP' },
];

export const invitacionesPendientes: InvitacionPendiente[] = [
  { id: 'inv1', email: 'mrodriguez@questsst.com.co', nombre: 'Manuel Rodríguez', rol: 'Coordinador', fechaEnvio: '2026-02-08', estado: 'Pendiente' },
  { id: 'inv2', email: 'sperez@questsst.com.co', nombre: 'Sofía Pérez', rol: 'Auditor', fechaEnvio: '2026-02-03', estado: 'Expirada' },
];

export const eventosSeguridad: EventoSeguridad[] = [
  { id: 'ev1', tipo: 'login_exitoso', usuario: 'Andrés Mejía Vargas', descripcion: 'Inicio de sesión exitoso', ip: '181.49.234.56', dispositivo: 'Chrome / Windows 11', fecha: '2026-02-10T08:30:00' },
  { id: 'ev2', tipo: 'login_exitoso', usuario: 'Laura Castillo Díaz', descripcion: 'Inicio de sesión exitoso', ip: '181.49.178.92', dispositivo: 'Safari / macOS', fecha: '2026-02-10T07:45:00' },
  { id: 'ev3', tipo: 'login_fallido', usuario: 'Diego Parra Solano', descripcion: 'Intento de login — contraseña incorrecta', ip: '200.116.45.12', dispositivo: 'Chrome / Android', fecha: '2026-02-10T07:30:00' },
  { id: 'ev4', tipo: 'login_exitoso', usuario: 'Valentina Rojas Peña', descripcion: 'Inicio de sesión exitoso', ip: '181.49.200.10', dispositivo: 'Chrome / Windows 10', fecha: '2026-02-10T06:15:00' },
  { id: 'ev5', tipo: 'cambio_password', usuario: 'Carlos Herrera Mendoza', descripcion: 'Cambio de contraseña realizado', ip: '181.49.156.78', dispositivo: 'Firefox / Ubuntu', fecha: '2026-02-09T18:00:00' },
  { id: 'ev6', tipo: 'sesion_cerrada', usuario: 'Andrés Mejía Vargas', descripcion: 'Sesión cerrada remotamente desde panel de admin', ip: '181.49.234.56', dispositivo: 'Chrome / Windows 11', fecha: '2026-02-09T17:45:00' },
  { id: 'ev7', tipo: 'login_exitoso', usuario: 'Carlos Herrera Mendoza', descripcion: 'Inicio de sesión exitoso', ip: '181.49.156.78', dispositivo: 'Firefox / Ubuntu', fecha: '2026-02-09T16:20:00' },
  { id: 'ev8', tipo: 'usuario_invitado', usuario: 'Andrés Mejía Vargas', descripcion: 'Invitación enviada a mrodriguez@questsst.com.co', ip: '181.49.234.56', dispositivo: 'Chrome / Windows 11', fecha: '2026-02-08T14:00:00' },
  { id: 'ev9', tipo: 'login_fallido', usuario: 'Desconocido', descripcion: 'Intento de login con email no registrado', ip: '45.67.89.123', dispositivo: 'Chrome / Windows 10', fecha: '2026-02-08T03:22:00' },
  { id: 'ev10', tipo: 'login_exitoso', usuario: 'Laura Castillo Díaz', descripcion: 'Inicio de sesión desde nuevo dispositivo', ip: '181.49.178.92', dispositivo: 'Chrome / iPhone', fecha: '2026-02-07T12:00:00' },
  { id: 'ev11', tipo: 'usuario_invitado', usuario: 'Andrés Mejía Vargas', descripcion: 'Invitación enviada a sperez@questsst.com.co', ip: '181.49.234.56', dispositivo: 'Chrome / Windows 11', fecha: '2026-02-03T09:00:00' },
  { id: 'ev12', tipo: 'login_fallido', usuario: 'Diego Parra Solano', descripcion: 'Cuenta bloqueada tras 5 intentos fallidos', ip: '200.116.45.12', dispositivo: 'Chrome / Android', fecha: '2026-01-15T10:05:00' },
];

export const eventoSeguridadIcons: Record<string, { color: string; label: string }> = {
  'login_exitoso': { color: 'text-success', label: 'Login exitoso' },
  'login_fallido': { color: 'text-destructive', label: 'Login fallido' },
  'cambio_password': { color: 'text-warning', label: 'Cambio de contraseña' },
  'sesion_cerrada': { color: 'text-[hsl(25,80%,50%)]', label: 'Sesión cerrada' },
  'usuario_invitado': { color: 'text-info', label: 'Usuario invitado' },
};

export const modulosPlan = [
  { nombre: 'Dashboard', activo: true, disponible: true },
  { nombre: 'Órdenes de Cumplimiento', activo: true, disponible: true },
  { nombre: 'Agenda', activo: true, disponible: true },
  { nombre: 'Visitas', activo: true, disponible: true },
  { nombre: 'Hallazgos', activo: true, disponible: true },
  { nombre: 'Informes', activo: true, disponible: true },
  { nombre: 'Capacitaciones', activo: true, disponible: true },
  { nombre: 'Gestión IA', activo: true, disponible: true },
  { nombre: 'Empresas Clientes', activo: true, disponible: true },
  { nombre: 'Administración', activo: true, disponible: true },
  { nombre: 'API Integraciones', activo: false, disponible: false },
  { nombre: 'Firma Digital Certificada', activo: false, disponible: false },
  { nombre: 'Multi-organización', activo: false, disponible: false },
];
