import { capitalizeWordsEs } from "./capitalizeWordsEs";

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

export function normalizeMessage(value: string): string {
  return value
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n");
}

export function normalizeLeadPayload(data: LeadFormValues): LeadFormValues {
  return {
    fullName: capitalizeWordsEs(data.fullName),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.replace(/\D/g, ""),
    programType: data.programType.trim(),
    message: data.message ? normalizeMessage(data.message) : "",
  };
}
