type CareersPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function pageButtonClass(active: boolean) {
  const base =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-40";
  if (active) {
    return `${base} border-blue-200 bg-blue-50 text-blue-700 shadow-sm`;
  }
  return `${base} border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50`;
}

function buildPageList(current: number, total: number): (number | "gap")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);
  for (let d = -1; d <= 1; d++) {
    const p = current + d;
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i];
    const prev = sorted[i - 1];
    if (i > 0 && prev !== undefined && n - prev > 1) {
      out.push("gap");
    }
    out.push(n);
  }
  return out;
}

const paginationTitleId = "careers-pagination-title";

export function CareersPagination({ page, totalPages, onPageChange }: CareersPaginationProps) {
  if (totalPages <= 1) return null;

  const list = buildPageList(page, totalPages);

  return (
    <nav
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2"
      aria-labelledby={paginationTitleId}
    >
      <h3
        id={paginationTitleId}
        className="order-1 w-full text-center text-sm font-semibold text-slate-800 sm:order-none sm:w-auto"
      >
        Paginación de programas
      </h3>
      <p className="order-3 text-sm text-slate-500 sm:order-none">
        Página <span className="font-semibold text-slate-700">{page}</span> de{" "}
        <span className="font-semibold text-slate-700">{totalPages}</span>
      </p>

      <div className="order-2 flex flex-wrap items-center justify-center gap-2 sm:order-none">
        <ul className="flex list-none flex-wrap items-center justify-center gap-1.5 p-0">
          {list.map((entry, idx) =>
            entry === "gap" ? (
              <li key={`gap-${idx}`} className="px-1 text-sm font-medium text-slate-400" aria-hidden>
                …
              </li>
            ) : (
              <li key={entry}>
                <button
                  type="button"
                  className={pageButtonClass(entry === page)}
                  onClick={() => onPageChange(entry)}
                  aria-current={entry === page ? "page" : undefined}
                >
                  {entry}
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}
