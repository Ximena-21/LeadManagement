import { IconSparkles } from "../atoms/IconSparkles";

type HomeHeroProps = {
  onRequestInfo: () => void;
};

export function HomeHero({ onRequestInfo }: HomeHeroProps) {
  return (
    <section className="relative min-h-svh overflow-hidden bg-[radial-gradient(ellipse_80%_55%_at_50%_38%,rgba(191,219,254,0.45)_0%,rgba(224,231,255,0.2)_35%,transparent_70%),linear-gradient(to_bottom,rgb(248_250_252),rgb(255_255_255),rgba(239_246_255,0.4))]">
      <div className="relative mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/80 px-3.5 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
          <IconSparkles />
          Admisiones abiertas 2026
        </p>

        <h1 className="mt-6 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Encuentra la carrera que{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            transformará tu futuro
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Explora nuestro portafolio académico con programas de pregrado, posgrado y educación continua
          diseñados para impulsar tu carrera.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={onRequestInfo}
          >
            Solicita información
          </button>
          <a
            href="#carreras"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Ver carreras
          </a>
        </div>
      </div>
    </section>
  );
}
