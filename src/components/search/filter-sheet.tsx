"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import {
  BodyFilter,
  BrandFilter,
  ConditionFilter,
  FuelFilter,
  KmFilter,
  PriceFilter,
  TransFilter,
  YearFilter,
} from "@/components/search/filter-bar";
import type { FiltersApi } from "@/hooks/useFilters";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line py-5 first:pt-1 last:border-b-0">
      <h3 className="display mb-4 text-base">{title}</h3>
      {children}
    </section>
  );
}

/**
 * Phones: every filter, organised by section. Desktop (the pills already carry price, year, km,
 * brand and fuel): only the rest.
 */
export function FilterSheet({ f, open, onOpenChange }: { f: FiltersApi; open: boolean; onOpenChange: (o: boolean) => void }) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const n = f.results.length;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={desktop ? "Más filtros" : "Filtros"}
      description="Ajustá la búsqueda. El número de resultados se actualiza al instante."
      footer={
        <div className="flex gap-3">
          <Button variant="outline" size="lg" onClick={f.clearAll} disabled={f.activeCount === 0}>
            Limpiar
          </Button>
          <Button variant="primary" size="lg" className="flex-1" onClick={() => onOpenChange(false)}>
            {n === 0 ? "Sin resultados" : `Ver ${n} ${n === 1 ? "vehículo" : "vehículos"}`}
          </Button>
        </div>
      }
    >
      {!desktop ? (
        <>
          <Section title="Precio (US$)">
            <PriceFilter f={f} />
          </Section>
          <Section title="Año">
            <YearFilter f={f} />
          </Section>
          <Section title="Kilómetros">
            <KmFilter f={f} />
          </Section>
          <Section title="Marca">
            <BrandFilter f={f} />
          </Section>
          <Section title="Combustible">
            <FuelFilter f={f} />
          </Section>
        </>
      ) : null}
      <Section title="Carrocería">
        <BodyFilter f={f} />
      </Section>
      <Section title="Transmisión">
        <TransFilter f={f} />
      </Section>
      <Section title="Estado">
        <ConditionFilter f={f} />
      </Section>
      <Section title="Guardados">
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-ink">
          <input
            type="checkbox"
            checked={f.state.guardados}
            onChange={(e) => f.setGuardados(e.target.checked)}
            className="size-5 accent-bronze-600"
          />
          Mostrar solo los que guardé
        </label>
      </Section>
    </Sheet>
  );
}
