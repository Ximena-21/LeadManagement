export type CareerProgram = {
  id: string;
  name: string;
  description: string;
  level: string;
  status: string;
  facultyId: string;
  facultyLabel: string;
  durationLabel: string;
  modality: string;
  modalityLabel: string;
  levelLabel?: string;
  statusLabel?: string;
  programType?: string;
  accentTitle?: boolean;
};

export const CAREER_LEVEL_LABEL = {
  pregrado: "Pregrado",
  posgrado: "Posgrado",
  continua: "Educación continua",
} as const;

export const CAREER_STATUS_LABEL = {
  activa: "Activa",
  proxima: "Próxima apertura",
} as const;
