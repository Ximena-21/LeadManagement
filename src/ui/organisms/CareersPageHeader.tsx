import { IconMortarboard } from "../atoms/IconMortarboard";

type CareersPageHeaderProps = {
  visibleCount: number;
  totalCount: number;
};

export function CareersPageHeader({ visibleCount, totalCount }: CareersPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
          <IconMortarboard className="h-4 w-4" />
          Programas
        </p>
        <h2
          id="carreras-heading"
          className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Carreras disponibles
        </h2>
      </div>
      <p className="shrink-0 text-sm text-slate-500">
        Mostrando <span className="font-semibold text-slate-700">{visibleCount}</span> de{" "}
        <span className="font-semibold text-slate-700">{totalCount}</span> programas
      </p>
    </header>
  );
}
