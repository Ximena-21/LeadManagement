import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fieldInputClass } from "../atoms/fieldClasses";
import { IconChevronDown } from "../atoms/IconChevronDown";
import { IconClose } from "../atoms/IconClose";
import {
  EMPTY_LEAD_FORM,
  type LeadFormValues,
  normalizeLeadPayload,
} from "../helpers/leadForm";
import { FormField } from "../molecules/FormField";

export type { LeadFormValues } from "../helpers/leadForm";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadModal({ open, onClose }: LeadModalProps) {
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<LeadFormValues>({
    defaultValues: EMPTY_LEAD_FORM,
  });

  // Open the modal and restore the draft from localStorage
  useEffect(() => {
    if (!open) return;
    const raw = localStorage.getItem("form_data");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<LeadFormValues>;
      reset({
        fullName: typeof parsed.fullName === "string" ? parsed.fullName : "",
        email: typeof parsed.email === "string" ? parsed.email : "",
        phone: typeof parsed.phone === "string" ? parsed.phone : "",
        programType: typeof parsed.programType === "string" ? parsed.programType : "",
        message: typeof parsed.message === "string" ? parsed.message : "",
      });
    } catch {
      /* JSON inválido: ignorar */
    }
  }, [open, reset]);

  // Save the draft only while the modal is open
  useEffect(() => {
    if (!open) return;
    const sub = watch((value) => {
      localStorage.setItem("form_data", JSON.stringify(value));
    });
    return () => sub.unsubscribe();
  }, [open, watch]);

  // handle keyboard escape and key enter to close the modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // handle body overflow when the modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;


  const onSubmit = (data: LeadFormValues) => {
    const cleaned = normalizeLeadPayload(data);
    console.log("lead", cleaned);

    reset();
    onClose();
    localStorage.removeItem("form_data");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      >
        <span className="pointer-events-none absolute bottom-8 left-1/2 z-0 max-w-[min(100%-2rem,28rem)] -translate-x-1/2 rounded-lg bg-white/95 px-4 py-2 text-center text-sm font-semibold text-slate-800 shadow-md">
          Cerrar ventana
        </span>
      </button>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          onClick={onClose}
        >
          <IconClose />
          <span>Cerrar</span>
        </button>

        <h2
          id="lead-modal-title"
          className="pr-10 text-2xl font-bold tracking-tight text-slate-900"
        >
          Solicita información
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Déjanos tus datos y un asesor te contactará para guiarte en tu elección.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormField id="lead-fullName" label="Nombre completo" error={errors.fullName?.message}>
            <input
              id="lead-fullName"
              className={fieldInputClass}
              placeholder="Juan Pérez"
              {...register("fullName", { 
                required: "Tu nombre completo es requerido",
                minLength: {
                  value: 3,
                  message: "Tu nombre completo debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "Tu nombre completo debe tener menos de 100 caracteres",
                }, })}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField id="lead-email" label="Correo" error={errors.email?.message}>
              <input
                id="lead-email"
                type="email"
                className={fieldInputClass}
                placeholder="usuario@javeriana.edu.co"
                {...register("email", {
                  required: "Tu correo electrónico es requerido",
                  pattern: {
                    value: /^[^\s@]+@javeriana\.edu\.co$/i,
                    message: "Usa un correo @javeriana.edu.co válido",
                  },
                })}
              />
            </FormField>
            <FormField id="lead-phone" label="Teléfono" error={errors.phone?.message}>
              <input
                id="lead-phone"
                type="tel"
                className={fieldInputClass}
                placeholder="+57 300 000 0000"
                {...register("phone", {
                  required: "Tu teléfono es requerido",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Tu teléfono debe tener 10 dígitos",
                  },
                })}
              />
            </FormField>
          </div>

          <FormField id="lead-program" label="Tipo de programa" error={errors.programType?.message}>
            <div className="relative">
              <select
                id="lead-program"
                className={`${fieldInputClass} appearance-none pr-10`}
                {...register("programType", { required: "Selecciona el tipo de programa" })}
              >
                <option value="" disabled>
                  Selecciona el tipo de programa
                </option>
                <option value="pregrado">Pregrado</option>
                <option value="posgrado">Posgrado</option>
                <option value="continua">Educación continua</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <IconChevronDown />
              </span>
            </div>
          </FormField>

          <FormField id="lead-message" label="Mensaje (opcional)">
            <textarea
              id="lead-message"
              rows={4}
              className={`${fieldInputClass} resize-y`}
              placeholder="Cuéntanos más sobre ti..."
              {...register("message", {
                maxLength: {
                  value: 1000,
                  message: "Tu mensaje debe tener menos de 1000 caracteres",
                },
              })}
            />
          </FormField>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}
