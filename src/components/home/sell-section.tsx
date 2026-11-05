"use client";

import { useId, type FormEvent, type ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { vehicles } from "@/data/vehicles";
import { formatNumber, whatsappLink } from "@/lib/utils";

const brands = [...new Set(vehicles.map((v) => v.brand))].sort((a, b) => a.localeCompare(b));

const input =
  "h-12 w-full rounded-ctl border border-line-strong bg-white px-3 text-base text-ink outline-none placeholder:text-text-3 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-medium text-ink">
      <span className="mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

/** No backend: the form builds the WhatsApp message the sales team would otherwise have to ask for. */
export function SellSection() {
  const listId = useId();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const km = String(d.get("km") ?? "").replace(/\D/g, "");
    const message = `Hola Juncal, quiero vender mi auto: ${d.get("marca")} ${d.get("modelo")} ${d.get("anio")}${
      km ? `, ${formatNumber(Number(km))} km` : ""
    }. ¿Cómo seguimos?`;
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="vender" aria-labelledby="titulo-vender">
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="titulo-vender" className="display text-3xl sm:text-4xl">
            ¿Querés vender tu auto?
          </h2>
          <p className="mt-4 max-w-md text-text-2">
            Contanos qué auto tenés y te respondemos por WhatsApp. Si preferís, pasá por el local y lo vemos juntos.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-card bg-white p-5 shadow-card sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Marca">
              <input className={input} name="marca" list={listId} required autoComplete="off" placeholder="Toyota" />
              <datalist id={listId}>
                {brands.map((b) => (
                  <option key={b} value={b} />
                ))}
              </datalist>
            </Field>
            <Field label="Modelo y versión">
              <input className={input} name="modelo" required autoComplete="off" placeholder="Corolla XEi" />
            </Field>
            <Field label="Año">
              <input className={input} name="anio" required inputMode="numeric" pattern="(19|20)[0-9]{2}" title="Un año de cuatro cifras, por ejemplo 2019" autoComplete="off" placeholder="2019" />
            </Field>
            <Field label="Kilómetros (opcional)">
              <input className={input} name="km" inputMode="numeric" autoComplete="off" placeholder="60000" />
            </Field>
          </div>
          <button type="submit" className={buttonVariants({ variant: "wa", size: "lg", className: "w-full" })}>
            <WhatsAppIcon size={20} />
            Enviar por WhatsApp
          </button>
          <p className="text-xs text-text-3">Se abre WhatsApp con el mensaje listo para enviar. Esta página no guarda tus datos.</p>
        </form>
      </Container>
    </section>
  );
}
