import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/utils";

/** Phones only: from md the header carries the WhatsApp button. Pulses three times, then rests. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hola Juncal, quiero hacer una consulta.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fab-pulse fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 grid size-14 place-items-center rounded-full bg-wa text-white shadow-fab transition-[transform,background-color] duration-200 ease-out hover:bg-wa-hover active:scale-95 md:hidden"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
