"use client";

import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import type { FiltersApi } from "@/hooks/useFilters";

/** Chips scale in with a spring; on removal they fade and collapse horizontally. */
export function FilterChips({ f }: { f: FiltersApi }) {
  return (
    <div className="flex min-h-9 flex-wrap items-center gap-y-2">
      <ul aria-label="Filtros aplicados" className="contents">
        <AnimatePresence initial={false}>
          {f.chips.map((c) => (
            <m.li
              key={c.id}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, marginRight: 8 }}
              exit={{ opacity: 0, scale: 0.6, width: 0, marginRight: 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 32 }}
              className="origin-left overflow-hidden"
            >
              <button
                type="button"
                onClick={c.onRemove}
                aria-label={`Quitar filtro: ${c.label}`}
                className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full bg-ink pl-3.5 pr-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink-raised"
              >
                {c.label}
                <X size={14} aria-hidden className="text-cream-2" />
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
      {f.chips.length > 1 ? (
        <button
          type="button"
          onClick={f.clearAll}
          className="ml-1 rounded-ctl px-2 py-2 text-sm font-medium text-text-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
        >
          Limpiar todo
        </button>
      ) : null}
    </div>
  );
}
