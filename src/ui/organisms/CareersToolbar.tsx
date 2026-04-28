import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetCareersFilters,
  setCareersFilters,
} from "../../features/careers/careersSlice";
import { selectCareersFacets, selectCareersFilters } from "../../features/careers/careersSelectors";
import { fieldInputClass } from "../atoms/fieldClasses";
import { IconChevronDown } from "../atoms/IconChevronDown";
import { IconSliders } from "../atoms/IconSliders";
import { CareersSearchInput } from "../molecules/CareersSearchInput";

const selectClass = `${fieldInputClass} appearance-none pr-9 text-sm`;

export function CareersToolbar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectCareersFilters);
  const facets = useAppSelector(selectCareersFacets);

  const detailsRef = useRef<HTMLDetailsElement>(null);

  const hasActiveFilters =
    filters.type !== "" ||
    filters.status !== "" ||
    filters.category !== "" ||
    filters.faculty !== "";
  const hasAnyFilterOrSearch =
    filters.name.trim() !== "" ||
    filters.type !== "" ||
    filters.status !== "" ||
    filters.category !== "" ||
    filters.faculty !== "";

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const details = detailsRef.current;
      if (!details?.open) return;
      if (!details.contains(e.target as Node)) {
        details.open = false;
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-3">
      <div className="min-w-0 max-w-2xl flex-1">
        <CareersSearchInput
          value={filters.name}
          onChange={(q) => dispatch(setCareersFilters({ name: q }))}
        />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <details ref={detailsRef} className="relative">
          <summary className="inline-flex h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
            <IconSliders />
            Filtros
            {hasActiveFilters ? (
              <span
                className="size-2 shrink-0 rounded-full bg-blue-600"
                title="Hay filtros aplicados"
              />
            ) : null}
          </summary>

          <div className="absolute right-0 top-full z-20 mt-2 w-[min(100vw-2rem,22rem)] max-h-[min(70vh,28rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Filtros de programas</h3>
            <div className="space-y-3">
              {/* category filter */}
              <div>
                <label htmlFor="filter-category" className="text-xs font-semibold text-slate-700">
                  Categoría
                </label>
                <div className="relative mt-1">
                  <select
                    id="filter-category"
                    className={selectClass}
                    value={filters.category}
                    onChange={(e) => dispatch(setCareersFilters({ category: e.target.value }))}
                  >
                    <option value="">Todas las categorías</option>
                    {facets.categories.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <IconChevronDown />
                  </span>
                </div>
              </div>

              {/* type filter */}
              {facets.types.length > 0 ? (
                <div>
                  <label htmlFor="filter-type" className="text-xs font-semibold text-slate-700">
                    Tipo
                  </label>
                  <div className="relative mt-1">
                    <select
                      id="filter-type"
                      className={selectClass}
                      value={filters.type}
                      onChange={(e) => dispatch(setCareersFilters({ type: e.target.value }))}
                    >
                      <option value="">Todos los tipos</option>
                      {facets.types.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <IconChevronDown />
                    </span>
                  </div>
                </div>
              ) : null}

              {/* status filter */}
              <div>
                <label htmlFor="filter-status" className="text-xs font-semibold text-slate-700">
                  Estado
                </label>
                <div className="relative mt-1">
                  <select
                    id="filter-status"
                    className={selectClass}
                    value={filters.status}
                    onChange={(e) => dispatch(setCareersFilters({ status: e.target.value }))}
                  >
                    <option value="">Todos los estados</option>
                    {facets.statuses.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <IconChevronDown />
                  </span>
                </div>
              </div>

              {/* faculty filter */}
              <div>
                <label htmlFor="filter-faculty" className="text-xs font-semibold text-slate-700">
                  Facultad
                </label>
                <div className="relative mt-1">
                  <select
                    id="filter-faculty"
                    className={selectClass}
                    value={filters.faculty}
                    onChange={(e) => dispatch(setCareersFilters({ faculty: e.target.value }))}
                  >
                    <option value="">Todas las facultades</option>
                    {facets.faculties.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500">
                    <IconChevronDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </details>

        <button
          type="button"
          disabled={!hasAnyFilterOrSearch}
          onClick={() => {
            dispatch(resetCareersFilters());
            if (detailsRef.current) detailsRef.current.open = false;
          }}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}
