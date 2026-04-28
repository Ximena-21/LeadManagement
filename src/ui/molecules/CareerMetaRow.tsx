import type { ReactNode } from "react";

type CareerMetaRowProps = {
  icon: ReactNode;
  children: string;
};

export function CareerMetaRow({ icon, children }: CareerMetaRowProps) {
  return (
    <div className="flex items-start gap-2 text-sm text-slate-600">
      <span className="mt-0.5 shrink-0 text-blue-600">{icon}</span>
      <span>{children}</span>
    </div>
  );
}
