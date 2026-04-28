import {
  CAREER_LEVEL_LABEL,
  CAREER_STATUS_LABEL,
  type CareerProgram,
} from "../../features/careers/careerModel";
import { capitalizeWordsEs } from "../helpers/capitalizeWordsEs";
import { IconClock } from "../atoms/IconClock";
import { IconMapPin } from "../atoms/IconMapPin";
import { IconMortarboard } from "../atoms/IconMortarboard";
import { ProgramBadge } from "../atoms/ProgramBadge";
import { CareerMetaRow } from "../molecules/CareerMetaRow";

type CareerCardProps = {
  program: CareerProgram;
};

export function CareerCard({ program }: CareerCardProps) {
  const titleClass = program.accentTitle
    ? "text-xl font-bold tracking-tight text-blue-600 sm:text-[1.35rem]"
    : "text-xl font-bold tracking-tight text-slate-900 sm:text-[1.35rem]";

  return (
    <div className="flex h-full min-h-[300px] flex-col rounded-2xl border border-slate-100/80 bg-white px-6 pt-6 pb-5 shadow-md shadow-slate-200/60 ring-1 ring-slate-100 transition-shadow duration-300 hover:border-blue-200/70 hover:shadow-[0_4px_36px_-8px_rgba(59,130,246,0.34),0_14px_64px_-12px_rgba(59,130,246,0.2),0_24px_88px_-16px_rgba(59,130,246,0.1)] sm:min-h-[320px]">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pb-3.5">
        <ProgramBadge>
          {program.levelLabel ??
            CAREER_LEVEL_LABEL[program.level as keyof typeof CAREER_LEVEL_LABEL] ??
            program.level}
        </ProgramBadge>
        <ProgramBadge>
          {program.statusLabel ??
            CAREER_STATUS_LABEL[program.status as keyof typeof CAREER_STATUS_LABEL] ??
            program.status}
        </ProgramBadge>
      </div>

      <h2 className={`${titleClass} mt-2 line-clamp-2`}>{program.name}</h2>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{program.description}</p>

      <div className="mt-auto flex flex-col gap-2.5 border-t border-slate-100 pt-5">
        <CareerMetaRow icon={<IconMortarboard className="h-4 w-4" />}>
          {capitalizeWordsEs(program.facultyLabel)}
        </CareerMetaRow>
        <CareerMetaRow icon={<IconClock />}>{program.durationLabel}</CareerMetaRow>
        <CareerMetaRow icon={<IconMapPin />}>{program.modalityLabel}</CareerMetaRow>
      </div>
    </div>
  );
}
