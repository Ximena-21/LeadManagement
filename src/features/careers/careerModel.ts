export type CareerLevel = "pregrado" | "posgrado" | "continua";

export type CareerStatus = "activa" | "proxima";

export type CareerModality = "presencial" | "hibrida" | "virtual";

export type CareerProgram = {
  id: string;
  name: string;
  description: string;
  level: CareerLevel | string;
  status: CareerStatus | string;
  facultyId: string;
  facultyLabel: string;
  durationLabel: string;
  modality: CareerModality;
  modalityLabel: string;
  /** Etiqueta para categoría/nivel (p. ej. datos de API). */
  levelLabel?: string;
  /** Etiqueta para estado (p. ej. datos de API). */
  statusLabel?: string;
  /** Valor para filtro `type` en API cuando exista. */
  programType?: string;
  /** Título con acento azul (referencia visual). */
  accentTitle?: boolean;
};

export const CAREER_LEVEL_LABEL: Record<CareerLevel, string> = {
  pregrado: "Pregrado",
  posgrado: "Posgrado",
  continua: "Educación continua",
};

export const CAREER_STATUS_LABEL: Record<CareerStatus, string> = {
  activa: "Activa",
  proxima: "Próxima apertura",
};
