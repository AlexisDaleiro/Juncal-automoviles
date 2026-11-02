"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Popover } from "radix-ui";
import { Container } from "@/components/layout/container";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { RangeSlider } from "@/components/ui/range-slider";
import { SortControl, ViewToggle } from "@/components/search/results-bar";
import { vehicles } from "@/data/vehicles";
import type { FiltersApi } from "@/hooks/useFilters";
import { BODY_TYPES, CONDITIONS, FUELS, TRANSMISSIONS } from "@/lib/constants";
import { countBy } from "@/lib/filters";
import { cn, formatNumber, normalize } from "@/lib/utils";
import type { BodySlug, ConditionSlug, FuelSlug, TransSlug } from "@/types/vehicle";

/* ---------- Filter bodies: shared by the desktop popovers and the sheet ---------- */

export function PriceFilter({ f }: { f: FiltersApi }) {
  return <RangeSlider label="Precio" min={f.bounds.precio[0]} max={f.bounds.precio[1]} step={500} value={f.state.precio} onChange={(v) => f.setRange("precio", v)} prefix="US$" />;
}

export function YearFilter({ f }: { f: FiltersApi }) {
  return <RangeSlider label="Año" min={f.bounds.anio[0]} max={f.bounds.anio[1]} step={1} value={f.state.anio} onChange={(v) => f.setRange("anio", v)} plain />;
}

export function KmFilter({ f }: { f: FiltersApi }) {
  return <RangeSlider label="Kilómetros" min={f.bounds.km[0]} max={f.bounds.km[1]} step={5000} value={f.state.km} onChange={(v) => f.setRange("km", v)} suffix="km" />;
}

const brandCounts = countBy(vehicles, (v) => v.brand);
const brandList = [...brandCounts.keys()].sort((a, b) => a.localeCompare(b));

export function BrandFilter({ f }: { f: FiltersApi }) {
  const [term, setTerm] = useState("");
  const shown = useMemo(() => brandList.filter((b) => normalize(b).includes(normalize(term))), [term]);
  return (
    <div className="space-y-3">
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Buscar marca"
        aria-label="Buscar marca"
        className="h-11 w-full rounded-ctl border border-line-strong bg-white px-3 text-base text-ink outline-none placeholder:text-text-3 focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze-600 sm:text-sm"
      />
      <fieldset>
        <legend className="sr-only">Marcas</legend>
        <ul className="-mx-1 max-h-64 overflow-y-auto pr-1">
          {shown.map((b) => (
            <li key={b}>
              <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm text-ink hover:bg-paper-2">
                <input
                  type="checkbox"
                  checked={f.state.marca.includes(b)}
                  onChange={() => f.toggleMarca(b)}
                  className="size-5 shrink-0 accent-bronze-600"
                />
                <span className="flex-1">{b}</span>
                <span className="num text-xs text-text-3">{brandCounts.get(b)}</span>
              </label>
            </li>
          ))}
          {shown.length === 0 ? <li className="px-2 py-3 text-sm text-text-3">No hay marcas con ese nombre.</li> : null}
        </ul>
      </fieldset>
    </div>
  );
}

const ANY = { value: "", label: "Todos" };

export function FuelFilter({ f }: { f: FiltersApi }) {
  return (
    <ChoiceChips
      legend="Combustible"
      name="combustible"
      options={[ANY, ...FUELS.map((x) => ({ value: x.slug, label: x.label }))]}
      selected={[f.state.comb ?? ""]}
      onChange={(v) => f.setComb((v || null) as FuelSlug | null)}
    />
  );
}

export function BodyFilter({ f }: { f: FiltersApi }) {
  return (
    <ChoiceChips
      legend="Carrocería"
      name="carroceria"
      type="checkbox"
      options={BODY_TYPES.map((x) => ({ value: x.slug, label: x.label }))}
      selected={f.state.tipo}
      onChange={(v) => f.toggleTipo(v as BodySlug)}
    />
  );
}

export function TransFilter({ f }: { f: FiltersApi }) {
  return (
    <ChoiceChips
      legend="Transmisión"
      name="transmision"
      options={[ANY, ...TRANSMISSIONS.map((x) => ({ value: x.slug, label: x.label }))]}
      selected={[f.state.trans ?? ""]}
      onChange={(v) => f.setTrans((v || null) as TransSlug | null)}
    />
  );
}

export function ConditionFilter({ f }: { f: FiltersApi }) {
  return (
    <ChoiceChips
      legend="Estado"
      name="estado"
      options={[ANY, ...CONDITIONS.map((x) => ({ value: x.slug, label: x.label }))]}
      selected={[f.state.estado ?? ""]}
      onChange={(v) => f.setEstado((v || null) as ConditionSlug | null)}
    />
  );
}

/* ---------- Desktop pills ---------- */

const pillBase =
  "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-[background-color,border-color] duration-200";

function PillPopover({ label, summary, children }: { label: string; summary?: string; children: ReactNode }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        className={cn(
          pillBase,
          summary ? "border-ink bg-paper-2 text-ink" : "border-line-strong bg-white text-ink hover:border-ink",
          "data-[state=open]:border-ink",
        )}
      >
        {label}
        {summary ? <span className="num text-text-2">{summary}</span> : null}
        <ChevronDown size={16} aria-hidden className="text-text-3" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content align="start" sideOffset={8} collisionPadding={16} className="pop w-[22rem] max-w-[calc(100vw-2rem)] p-5">
          <p className="display mb-4 text-lg">{label}</p>
          {children}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export function FilterBar({ f, onOpenSheet }: { f: FiltersApi; onOpenSheet: () => void }) {
  const { precio, anio, km, marca, comb } = f.state;
  const touched = (range: [number, number], bounds: [number, number]) => range[0] > bounds[0] || range[1] < bounds[1];
  const fuelLabel = FUELS.find((x) => x.slug === comb)?.label;
  const extra = f.state.tipo.length + (f.state.trans ? 1 : 0) + (f.state.estado ? 1 : 0);

  return (
    <div
      className="sticky z-30 border-b border-line bg-paper/100 transition-[top] duration-200 ease-out"
      style={{ top: "var(--header-h)" }}
    >
      <Container className="flex items-center gap-2 py-3">
        {/* Desktop: pills */}
        <div className="hidden flex-wrap items-center gap-2 lg:flex">
          <PillPopover label="Precio" summary={touched(precio, f.bounds.precio) ? `${formatNumber(precio[0])}–${formatNumber(precio[1])}` : undefined}>
            <PriceFilter f={f} />
          </PillPopover>
          <PillPopover label="Año" summary={touched(anio, f.bounds.anio) ? `${anio[0]}–${anio[1]}` : undefined}>
            <YearFilter f={f} />
          </PillPopover>
          <PillPopover label="Kilómetros" summary={touched(km, f.bounds.km) ? `${formatNumber(km[0])}–${formatNumber(km[1])}` : undefined}>
            <KmFilter f={f} />
          </PillPopover>
          <PillPopover label="Marca" summary={marca.length ? (marca.length === 1 ? marca[0] : `${marca.length} marcas`) : undefined}>
            <BrandFilter f={f} />
          </PillPopover>
          <PillPopover label="Combustible" summary={fuelLabel}>
            <FuelFilter f={f} />
          </PillPopover>
          <button type="button" onClick={onOpenSheet} className={cn(pillBase, extra ? "border-ink bg-paper-2" : "border-line-strong bg-white hover:border-ink")}>
            <SlidersHorizontal size={16} aria-hidden />
            Más filtros
            {extra ? <span className="num grid size-5 place-items-center rounded-full bg-ink text-xs text-cream">{extra}</span> : null}
          </button>
        </div>

        {/* Phones and tablets: one button, sheet from the bottom */}
        <button
          type="button"
          onClick={onOpenSheet}
          className={cn(pillBase, "rounded-ctl lg:hidden", f.activeCount ? "border-ink bg-paper-2" : "border-line-strong bg-white")}
        >
          <SlidersHorizontal size={18} aria-hidden />
          Filtros
          {f.activeCount ? <span className="num grid size-5 place-items-center rounded-full bg-ink text-xs text-cream">{f.activeCount}</span> : null}
        </button>
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <SortControl f={f} />
          <ViewToggle f={f} />
        </div>
      </Container>
    </div>
  );
}
