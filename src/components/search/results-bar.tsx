"use client";

import { Check, ChevronDown, Columns2, LayoutGrid, Rows3 } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { AnimatedNumber } from "@/components/ui/animated-number";
import type { FiltersApi } from "@/hooks/useFilters";
import { SORTS, VIEWS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SortKey, ViewMode } from "@/types/vehicle";

export function SortControl({ f, className }: { f: FiltersApi; className?: string }) {
  const current = SORTS.find((s) => s.key === f.orden)?.label ?? SORTS[0].label;
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "inline-flex h-11 items-center gap-2 rounded-ctl border border-line-strong bg-white px-3.5 text-sm font-medium text-ink transition-colors hover:border-ink data-[state=open]:border-ink",
          className,
        )}
      >
        <span className="text-text-3">Ordenar</span>
        <span className="hidden sm:inline">{current}</span>
        <ChevronDown size={16} aria-hidden />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="end" sideOffset={8} collisionPadding={16} className="pop min-w-60 p-1.5">
          <DropdownMenu.RadioGroup value={f.orden} onValueChange={(v) => f.setOrden(v as SortKey)}>
            {SORTS.map((s) => (
              <DropdownMenu.RadioItem
                key={s.key}
                value={s.key}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-ink outline-none data-[highlighted]:bg-paper-2 data-[state=checked]:font-semibold"
              >
                <span className="grid size-4 place-items-center">
                  <DropdownMenu.ItemIndicator>
                    <Check size={16} aria-hidden className="text-bronze-600" />
                  </DropdownMenu.ItemIndicator>
                </span>
                {s.label}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const VIEW_ICON = { "2": Columns2, "3": LayoutGrid, lista: Rows3 } as const;

export function ViewToggle({ f, className }: { f: FiltersApi; className?: string }) {
  return (
    <fieldset className={cn("flex rounded-ctl border border-line-strong bg-white p-0.5", className)}>
      <legend className="sr-only">Vista de resultados</legend>
      {VIEWS.map((v) => {
        const Icon = VIEW_ICON[v.key];
        return (
          <label key={v.key} className={cn("relative cursor-pointer", v.key === "2" && "hidden lg:block")}>
            <input
              type="radio"
              name="vista"
              className="peer sr-only"
              checked={f.vista === v.key}
              onChange={() => f.setVista(v.key as ViewMode)}
            />
            <span
              title={v.label}
              className="grid size-10 place-items-center rounded-md text-text-2 transition-colors hover:text-ink peer-checked:bg-ink peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bronze-600"
            >
              <Icon size={18} aria-hidden />
              <span className="sr-only">{v.label}</span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}

/** Count is a live region: filter changes are announced without moving focus. */
export function ResultsBar({ f }: { f: FiltersApi }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p role="status" aria-live="polite" aria-atomic className="text-sm text-text-2 sm:text-base">
        Mostrando <span className="num font-semibold text-ink"><AnimatedNumber value={f.results.length} /></span> de{" "}
        <span className="num font-semibold text-ink">{f.total}</span> vehículos
      </p>
      <div className="hidden items-center gap-2 lg:flex">
        <SortControl f={f} />
        <ViewToggle f={f} />
      </div>
    </div>
  );
}
