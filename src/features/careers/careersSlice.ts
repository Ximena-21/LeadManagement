import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { CareerProgram } from "./careerModel";
import {
  type CareersApiFilters,
  fetchCareersFromApi,
  INITIAL_CAREERS_FILTERS,
  mapApiCareerToProgram,
} from "./careersApi";

export type CareerFacetOption = { value: string; label: string };

export type CareersState = {
  items: CareerProgram[];
  loading: boolean;
  error: string | null;
  filters: CareersApiFilters;
  facets: {
    categories: CareerFacetOption[];
    types: CareerFacetOption[];
    statuses: CareerFacetOption[];
    faculties: CareerFacetOption[];
  };
};

const initialState: CareersState = {
  items: [],
  loading: false,
  error: null,
  filters: { ...INITIAL_CAREERS_FILTERS },
  facets: {
    categories: [],
    types: [],
    statuses: [],
    faculties: [],
  },
};

function mergeFacet(
  existing: CareerFacetOption[],
  value: string,
  label: string = value,
): CareerFacetOption[] {
  if (!value) return existing;
  if (existing.some((o) => o.value === value)) return existing;
  return [...existing, { value, label }].sort((a, b) =>
    a.label.localeCompare(b.label, "es"),
  );
}

export const fetchCareers = createAsyncThunk(
  "careers/fetchCareers",
  async (_, { getState }) => {
    const filters = (getState() as { careers: CareersState }).careers.filters;
    const raw = await fetchCareersFromApi(filters);
    return raw.map(mapApiCareerToProgram);
  },
);

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {
    setCareersFilters(state, action: { payload: Partial<CareersApiFilters> }) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetCareersFilters(state) {
      state.filters = { ...INITIAL_CAREERS_FILTERS };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        for (const p of action.payload) {
          if (typeof p.level === "string" && p.level) {
            state.facets.categories = mergeFacet(
              state.facets.categories,
              p.level,
              p.levelLabel ?? p.level,
            );
          }
          if (p.programType) {
            state.facets.types = mergeFacet(state.facets.types, p.programType);
          }
          if (typeof p.status === "string" && p.status) {
            state.facets.statuses = mergeFacet(
              state.facets.statuses,
              p.status,
              p.statusLabel ?? p.status,
            );
          }
          if (p.facultyId) {
            state.facets.faculties = mergeFacet(
              state.facets.faculties,
              p.facultyId,
              p.facultyLabel,
            );
          }
        }
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "No se pudieron cargar las carreras";
      });
  },
});

export const { setCareersFilters, resetCareersFilters } = careersSlice.actions;

export const careersReducer = careersSlice.reducer;
