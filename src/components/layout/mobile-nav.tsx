"use client";

import Link from "next/link";
import { ArrowUpRight, CarFront, Calculator, Clock, FileCheck, HandCoins, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Sheet } from "@/components/ui/sheet";
import { useFinance } from "@/components/shared/finance-provider";
import { CONTACT } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const row =
  "flex min-h-14 w-full items-center gap-4 border-b border-line text-left text-lg font-medium text-ink transition-colors hover:text-bronze-600";

export function MobileNav({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { openCalculator } = useFinance();
  const close = () => onOpenChange(false);

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Menú"
      description="Navegación principal y datos de contacto"
      footer={
        <a
          className={buttonVariants({ variant: "wa", size: "lg", className: "w-full" })}
          href={whatsappLink("Hola Juncal, quiero hacer una consulta.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={20} />
          Escribinos por WhatsApp
        </a>
      }
    >
      <nav aria-label="Menú móvil">
        <Link href="/vehiculos" className={row} onClick={close}>
          <CarFront size={22} className="text-bronze-600" aria-hidden />
          Vehículos
        </Link>
        <a
          className={row}
          href={whatsappLink("Hola Juncal, quiero vender mi auto. ¿Cómo es el proceso?")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          <HandCoins size={22} className="text-bronze-600" aria-hidden />
          Vender mi auto
          <ArrowUpRight size={18} className="ml-auto text-text-3" aria-hidden />
        </a>
        <button
          type="button"
          className={row}
          onClick={() => {
            close();
            openCalculator();
          }}
        >
          <Calculator size={22} className="text-bronze-600" aria-hidden />
          Financiación
        </button>
        <a
          className={row}
          href={whatsappLink("Hola Juncal, quiero consultar por la gestoría y transferencia.")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
        >
          <FileCheck size={22} className="text-bronze-600" aria-hidden />
          Gestoría propia
          <ArrowUpRight size={18} className="ml-auto text-text-3" aria-hidden />
        </a>
      </nav>

      <div className="mt-6 space-y-3 text-sm text-text-2">
        <a className="flex items-start gap-3 hover:text-ink" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
          <MapPin size={18} className="mt-0.5 shrink-0 text-text-3" aria-hidden />
          <span>
            {CONTACT.address}
            <br />
            {CONTACT.city}
          </span>
        </a>
        <p className="flex items-start gap-3">
          <Clock size={18} className="mt-0.5 shrink-0 text-text-3" aria-hidden />
          <span>
            {CONTACT.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days}: {h.time}
              </span>
            ))}
          </span>
        </p>
      </div>
    </Sheet>
  );
}
