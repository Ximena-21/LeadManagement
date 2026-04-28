import type { CareerProgram } from "./careerModel";

const MOCKAROO_KEY = "5a649350";
const CAREERS_API_BASE = "https://my.api.mockaroo.com";

export type CareersApiFilters = {
  name: string;
  type: string;
  status: string;
  category: string;
  faculty: string;
};

export const INITIAL_CAREERS_FILTERS: CareersApiFilters = {
  name: "",
  type: "",
  status: "",
  category: "",
  faculty: "",
};

export type ApiCareerRaw = {
  id: string;
  name: string;
  description: string;
  category: string;
  faculty: string;
  duration: number;
  codeSnies?: string;
  price?: number;
  date?: number;
  status: string;
  type?: string;
};

export function mapApiCareerToProgram(raw: ApiCareerRaw): CareerProgram {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    level: raw.category,
    status: raw.status,
    levelLabel: raw.category,
    statusLabel: raw.status,
    facultyId: raw.faculty,
    facultyLabel: raw.faculty,
    durationLabel: `${raw.duration} meses`,
    modality: "presencial",
    modalityLabel: "Presencial",
    programType: raw.type,
  };
}

export function buildCareersUrl(filters: CareersApiFilters): string {
  const params = new URLSearchParams({ key: MOCKAROO_KEY });
  const n = filters.name.trim();
  if (n) params.set("name", n);
  if (filters.type) params.set("type", filters.type);
  if (filters.status) params.set("status", filters.status);
  if (filters.category) params.set("category", filters.category);
  if (filters.faculty) params.set("faculty", filters.faculty);

  return `${CAREERS_API_BASE}/carrers?${params.toString()}`;
}

export async function fetchCareersFromApi(filters: CareersApiFilters): Promise<ApiCareerRaw[]> {
  const res = await fetch(buildCareersUrl(filters));
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Error ${res.status} al cargar carreras`);
  }
  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("La API no devolvió una lista de carreras");
  }
  return data as ApiCareerRaw[];
}
