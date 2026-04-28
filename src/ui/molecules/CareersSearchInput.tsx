import { IconSearch } from "../atoms/IconSearch";
import { fieldInputClass } from "../atoms/fieldClasses";

type CareersSearchInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function CareersSearchInput({
  id = "careers-search",
  value,
  onChange,
  placeholder = "Buscar carrera por nombre...",
}: CareersSearchInputProps) {
  return (
    <div className="relative w-full">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <IconSearch className="h-5 w-5" />
      </span>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${fieldInputClass.replace("rounded-lg", "rounded-full")} py-3 pl-11 pr-5`}
        autoComplete="off"
      />
    </div>
  );
}
