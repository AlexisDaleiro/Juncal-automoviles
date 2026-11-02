"use client";

import { Car, CarFront, KeyRound, Truck, Zap } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import type { FiltersApi } from "@/hooks/useFilters";
import { cn } from "@/lib/utils";

/** Quick categories. Counts come from the whole inventory so the pills never jump while filtering. */
export function CategoryPills({ f }: { f: FiltersApi }) {
  const count = (fn: (v: (typeof vehicles)[number]) => boolean) => vehicles.filter(fn).length;
  const pills = [
    { label: "SUV", icon: Car, n: count((v) => v.bodyType === "SUV"), on: f.state.tipo.includes("suv"), toggle: () => f.toggleTipo("suv") },
    { label: "Sedán", icon: CarFront, n: count((v) => v.bodyType === "Sedán"), on: f.state.tipo.includes("sedan"), toggle: () => f.toggleTipo("sedan") },
    { label: "Pick-up", icon: Truck, n: count((v) => v.bodyType === "Pick-up"), on: f.state.tipo.includes("pickup"), toggle: () => f.toggleTipo("pickup") },
    { label: "Eléctricos", icon: Zap, n: count((v) => v.fuel === "Eléctrico"), on: f.state.comb === "electrico", toggle: () => f.setComb(f.state.comb === "electrico" ? null : "electrico") },
    { label: "0 km", icon: KeyRound, n: count((v) => v.condition === "0 km"), on: f.state.estado === "0km", toggle: () => f.setEstado(f.state.estado === "0km" ? null : "0km") },
  ];

  return (
    <ul aria-label="Categorías rápidas" className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
      {pills.map(({ label, icon: Icon, n, on, toggle }) => (
        <li key={label} className="snap-start">
          <button
            type="button"
            aria-pressed={on}
            onClick={toggle}
            className={cn(
              "inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color] duration-200",
              on
                ? "border-cream bg-cream text-ink"
                : "border-ink-line text-cream hover:border-cream-3 hover:bg-ink-raised",
            )}
          >
            <Icon size={18} aria-hidden className={on ? "text-bronze-600" : "text-bronze-500"} />
            {label}
            <span className={cn("num text-xs", on ? "text-text-2" : "text-cream-3")}>{n}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
