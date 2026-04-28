import type { RootState } from "../../app/store";

export const selectCareersItems = (s: RootState) => s.careers.items;
export const selectCareersLoading = (s: RootState) => s.careers.loading;
export const selectCareersError = (s: RootState) => s.careers.error;
export const selectCareersFilters = (s: RootState) => s.careers.filters;
export const selectCareersFacets = (s: RootState) => s.careers.facets;
