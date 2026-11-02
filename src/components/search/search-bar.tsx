"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CarFront, Search, Tag, X } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import type { FiltersApi } from "@/hooks/useFilters";
import { getSuggestions } from "@/lib/filters";
import { cn, formatNumber } from "@/lib/utils";

type Option =
  | { kind: "brand"; id: string; label: string; meta: string }
  | { kind: "model"; id: string; label: string; meta: string };

/**
 * Combobox (ARIA 1.2 pattern): the list is ours, never the browser's autocomplete.
 * Typing filters the catalog live; picking a brand applies it as a filter, picking a model sets the query.
 */
export function SearchBar({ f }: { f: FiltersApi }) {
  const uid = useId();
  const listId = `${uid}-list`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(f.state.q);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  // Mirror external changes (chip removed, "limpiar") unless the user is typing.
  const externalQ = f.state.q;
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setValue(externalQ);
  }, [externalQ]);

  const options = useMemo<Option[]>(() => {
    const s = getSuggestions(vehicles, value);
    return [
      ...s.brands.map<Option>((b) => ({ kind: "brand", id: `b-${b.name}`, label: b.name, meta: `${b.count} ${b.count === 1 ? "vehículo" : "vehículos"}` })),
      ...s.models.map<Option>((m) => ({ kind: "model", id: `m-${m.label}`, label: m.label, meta: `desde US$ ${formatNumber(m.from)}` })),
    ];
  }, [value]);

  const choose = (o: Option) => {
    setOpen(false);
    setActive(-1);
    if (o.kind === "brand") {
      setValue("");
      f.setMarcaOnly(o.label);
    } else {
      setValue(o.label);
      f.setQuery(o.label);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      const n = options.length;
      if (!n) return;
      setActive((a) => (e.key === "ArrowDown" ? (a + 1) % n : (a - 1 + n) % n));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && active >= 0 && options[active]) choose(options[active]);
      else {
        setOpen(false);
        document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
      }
    }
  };

  const brands = options.filter((o) => o.kind === "brand");
  const models = options.filter((o) => o.kind === "model");
  const optionId = (o: Option) => `${uid}-${o.id.replace(/\W/g, "_")}`;

  const renderGroup = (title: string, group: Option[], Icon: typeof Tag) =>
    group.length ? (
      <li role="presentation" key={title}>
        <p className="px-3 pb-1 pt-3 text-xs font-semibold text-text-3">{title}</p>
        <ul role="presentation">
          {group.map((o) => {
            const i = options.indexOf(o);
            return (
              <li
                key={o.id}
                id={optionId(o)}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(o)}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm text-ink",
                  i === active && "bg-paper-2",
                )}
              >
                <Icon size={16} aria-hidden className="shrink-0 text-text-3" />
                <span className="flex-1 font-medium">{o.label}</span>
                <span className="num text-xs text-text-3">{o.meta}</span>
              </li>
            );
          })}
        </ul>
      </li>
    ) : null;

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
          setActive(-1);
        }
      }}
    >
      <div className="flex h-14 items-center gap-2 rounded-xl bg-paper pl-4 pr-2 text-ink shadow-pop focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bronze-500 sm:h-16">
        <Search size={22} aria-hidden className="shrink-0 text-text-3" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-label="Buscar por marca, modelo o año"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 && options[active] ? optionId(options[active]) : undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="search"
          placeholder="Buscar por marca, modelo o año…"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            f.setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-text-3 sm:text-lg"
        />
        {value ? (
          <button
            type="button"
            aria-label="Borrar búsqueda"
            onClick={() => {
              setValue("");
              f.setQuery("");
              inputRef.current?.focus();
            }}
            className="grid size-10 shrink-0 place-items-center rounded-full text-text-2 transition-colors hover:bg-paper-2"
          >
            <X size={18} aria-hidden />
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="hidden h-11 shrink-0 items-center rounded-lg bg-ink px-5 text-sm font-medium text-cream transition-colors hover:bg-ink-raised sm:inline-flex sm:h-12"
        >
          Buscar
        </button>
      </div>

      {open && options.length ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Sugerencias"
          className="pop absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-80 overflow-y-auto p-2 text-ink"
        >
          {renderGroup(value ? "Marcas" : "Marcas más buscadas", brands, Tag)}
          {renderGroup("Modelos", models, CarFront)}
        </ul>
      ) : null}
      <p className="sr-only" role="status">
        {open && options.length ? `${options.length} sugerencias disponibles` : ""}
      </p>
    </div>
  );
}
