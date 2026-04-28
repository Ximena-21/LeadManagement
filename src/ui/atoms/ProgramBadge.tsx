type ProgramBadgeProps = {
  children: string;
};

export function ProgramBadge({ children }: ProgramBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-100">
      {children}
    </span>
  );
}
