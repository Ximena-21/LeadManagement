import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCareers } from "../../features/careers/careersSlice";
import {
  selectCareersError,
  selectCareersFilters,
  selectCareersItems,
  selectCareersLoading,
} from "../../features/careers/careersSelectors";
import type { CareerProgram } from "../../features/careers/careerModel";
import { CareersPagination } from "../molecules/CareersPagination";
import { CareerCard } from "./CareerCard";
import { CareersPageHeader } from "./CareersPageHeader";
import { CareersToolbar } from "./CareersToolbar";

const PAGE_SIZE = 15;

type CareersPaginatedBodyProps = {
  items: CareerProgram[];
  loading: boolean;
  error: string | null;
  sectionRef: RefObject<HTMLElement | null>;
};

function CareersPaginatedBody({ items, loading, error, sectionRef }: CareersPaginatedBodyProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const effectivePage = Math.min(Math.max(1, page), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (effectivePage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, effectivePage]);

  const total = items.length;

  const handlePageChange = (next: number) => {
    setPage(next);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <CareersPageHeader visibleCount={paginatedItems.length} totalCount={total} />

      <div className="mt-8">
        <CareersToolbar />
      </div>

      {error ? (
        <p
          className="mt-10 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {loading && !error ? (
        <p className="mt-10 text-center text-sm text-slate-600">Cargando programas…</p>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <p className="mt-10 text-center text-sm text-slate-600">
          No hay programas que coincidan con tu búsqueda o filtros.
        </p>
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <>
          <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedItems.map((program) => (
              <li key={program.id} className="h-full">
                <CareerCard program={program} />
              </li>
            ))}
          </ul>
          <CareersPagination
            page={effectivePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : null}
    </>
  );
}

export function CareersSection() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCareersItems);
  const loading = useAppSelector(selectCareersLoading);
  const error = useAppSelector(selectCareersError);
  const filters = useAppSelector(selectCareersFilters);
  const sectionRef = useRef<HTMLElement>(null);

  const { name, type, status, category, faculty } = filters;

  const paginationResetKey = `${type}|${status}|${category}|${faculty}`;

  useEffect(() => {
    const delay = name.trim() ? 400 : 0;
    const t = window.setTimeout(() => {
      dispatch(fetchCareers());
    }, delay);
    return () => window.clearTimeout(t);
  }, [name, type, status, category, faculty, dispatch]);

  return (
    <section
      ref={sectionRef}
      id="carreras"
      className="scroll-mt-6 bg-slate-50 py-10 sm:py-14"
      aria-labelledby="carreras-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CareersPaginatedBody
          key={paginationResetKey}
          sectionRef={sectionRef}
          items={items}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
}
