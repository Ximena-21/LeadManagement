export type LeadFormValues = {
  fullName: string;
  email: string;
  phone: string;
  programType: string;
  message: string;
};

export const EMPTY_LEAD_FORM: LeadFormValues = {
  fullName: "",
  email: "",
  phone: "",
  programType: "",
  message: "",
};

/** Recorta bordes, colapsa espacios internos y capitaliza cada palabra (nombre propio). */
export function normalizeFullName(value: string): string {
  const name = value.trim().replace(/\s+/g, " ");
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => {
      const lower = word.toLocaleLowerCase("es");
      return lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1);
    })
    .join(" ");
}

export function normalizeMessage(value: string): string {
  return value
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n");
}

export function normalizeLeadPayload(data: LeadFormValues): LeadFormValues {
  return {
    fullName: normalizeFullName(data.fullName),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.replace(/\D/g, ""),
    programType: data.programType.trim(),
    message: data.message ? normalizeMessage(data.message) : "",
  };
}
