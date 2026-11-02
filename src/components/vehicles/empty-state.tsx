import { Button, buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/utils";

/** A line drawing, not an emoji: a car parked on an empty lot with the search still running. */
function Illustration() {
  return (
    <svg viewBox="0 0 320 160" width="320" height="160" aria-hidden focusable="false" className="mx-auto h-auto w-full max-w-xs">
      <path d="M12 140h296" stroke="var(--color-line-strong)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 10" />
      <g fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M52 124H40a6 6 0 0 1-6-6v-14a10 10 0 0 1 8-9.8l26-5.5 20-22a14 14 0 0 1 10-4.7h58a14 14 0 0 1 10.6 4.9l19 21.8 24 4.6a10 10 0 0 1 8 9.8V118a6 6 0 0 1-6 6h-14" />
        <path d="M108 124h84" />
        <path d="M94 76l-14 18h108l-16-18" />
        <path d="M134 76v18" />
      </g>
      <g fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3">
        <circle cx="82" cy="124" r="16" />
        <circle cx="218" cy="124" r="16" />
      </g>
      <circle cx="82" cy="124" r="5" fill="var(--color-bronze-500)" />
      <circle cx="218" cy="124" r="5" fill="var(--color-bronze-500)" />
      <g fill="none" stroke="var(--color-bronze-600)" strokeWidth="3" strokeLinecap="round">
        <circle cx="262" cy="52" r="18" fill="var(--color-paper)" />
        <path d="M275 65l16 16" />
      </g>
    </svg>
  );
}

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="fade-up mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <Illustration />
      <h2 className="display mt-8 text-2xl">No encontramos vehículos con esos filtros</h2>
      <p className="mt-3 text-text-2">Probá ampliando tu búsqueda o contanos qué auto buscás y te avisamos cuando entre.</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="primary" size="lg" onClick={onClear}>
          Limpiar filtros
        </Button>
        <a
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href={whatsappLink("Hola Juncal, no encontré el auto que busco. ¿Me pueden ayudar?")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={18} />
          Hablar con un asesor
        </a>
      </div>
    </div>
  );
}
