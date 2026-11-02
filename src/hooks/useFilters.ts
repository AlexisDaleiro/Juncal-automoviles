"use client";

import { useCallback, useMemo } from "react";
import {
  debounce,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryStates,
} from "nuqs";
import { vehicles } from "@/data/vehicles";
import {
  BODY_LABEL,
  BODY_SLUGS,
  CONDITION_SLUGS,
  FUEL_LABEL,
  FUEL_SLUGS,
  SORT_KEYS,
  TRANS_SLUGS,
  VIEW_KEYS,
  TRANSMISSIONS,
} from "@/lib/constants";
import { filterVehicles, getBounds, sortVehicles } from "@/lib/filters";
import { useFavorites } from "@/lib/favorites";
import { clamp, formatNumber, formatPrice } from "@/lib/utils";
import type { BodySlug, FilterChip, FilterState, Range, SortKey, ViewMode } from "@/types/vehicle";

/** URL keys are Spanish and short so a shared link reads well: /vehiculos?tipo=suv&pmax=25000 */
const parsers = {
  q: parseAsString.withDefault(""),
  tipo: parseAsArrayOf(parseAsStringLiteral(BODY_SLUGS)).withDefault([]),
  marca: parseAsArrayOf(parseAsString).withDefault([]),
  comb: parseAsStringLiteral(FUEL_SLUGS),
  trans: parseAsStringLiteral(TRANS_SLUGS),
  estado: parseAsStringLiteral(CONDITION_SLUGS),
  pmin: parseAsInteger,
  pmax: parseAsInteger,
  amin: parseAsInteger,
  amax: parseAsInteger,
  kmin: parseAsInteger,
  kmax: parseAsInteger,
  guardados: parseAsBoolean.withDefault(false),
  orden: parseAsStringLiteral(SORT_KEYS).withDefault("relevancia"),
  vista: parseAsStringLiteral(VIEW_KEYS).withDefault("3"),
};

export const BOUNDS = getBounds(vehicles);

const RANGE_KEYS = {
  precio: ["pmin", "pmax"],
  anio: ["amin", "amax"],
  km: ["kmin", "kmax"],
} as const;
type RangeName = keyof typeof RANGE_KEYS;

const FILTER_RESET = {
  q: null,
  tipo: null,
  marca: null,
  comb: null,
  trans: null,
  estado: null,
  pmin: null,
  pmax: null,
  amin: null,
  amax: null,
  kmin: null,
  kmax: null,
  guardados: null,
} as const;

export function useFilters() {
  const [raw, setRaw] = useQueryStates(parsers, { history: "replace", scroll: false });
  const favorites = useFavorites();

  const state: FilterState = useMemo(() => {
    const range = (name: RangeName): Range => {
      const [lo, hi] = BOUNDS[name];
      const [kMin, kMax] = RANGE_KEYS[name];
      return [clamp(raw[kMin] ?? lo, lo, hi), clamp(raw[kMax] ?? hi, lo, hi)];
    };
    return {
      q: raw.q,
      tipo: raw.tipo,
      marca: raw.marca,
      comb: raw.comb,
      trans: raw.trans,
      estado: raw.estado,
      precio: range("precio"),
      anio: range("anio"),
      km: range("km"),
      guardados: raw.guardados,
    };
  }, [raw]);

  const results = useMemo(
    () => sortVehicles(filterVehicles(vehicles, state, favorites.ids), raw.orden),
    [state, favorites.ids, raw.orden],
  );

  const setQuery = useCallback(
    (q: string) => setRaw({ q: q || null }, { limitUrlUpdates: debounce(250) }),
    [setRaw],
  );

  const setRange = useCallback(
    (name: RangeName, [lo, hi]: Range) => {
      const [bLo, bHi] = BOUNDS[name];
      const [kMin, kMax] = RANGE_KEYS[name];
      setRaw({ [kMin]: lo <= bLo ? null : lo, [kMax]: hi >= bHi ? null : hi });
    },
    [setRaw],
  );

  const toggleTipo = useCallback(
    (slug: BodySlug) => {
      const next = raw.tipo.includes(slug) ? raw.tipo.filter((s) => s !== slug) : [...raw.tipo, slug];
      setRaw({ tipo: next.length ? next : null });
    },
    [raw.tipo, setRaw],
  );

  const toggleMarca = useCallback(
    (brand: string) => {
      const next = raw.marca.includes(brand) ? raw.marca.filter((b) => b !== brand) : [...raw.marca, brand];
      setRaw({ marca: next.length ? next : null });
    },
    [raw.marca, setRaw],
  );

  const chips = useMemo<FilterChip[]>(() => {
    const out: FilterChip[] = [];
    if (state.q) out.push({ id: "q", label: `“${state.q}”`, onRemove: () => setRaw({ q: null }) });
    state.tipo.forEach((t) => out.push({ id: `tipo-${t}`, label: BODY_LABEL[t], onRemove: () => toggleTipo(t) }));
    state.marca.forEach((b) => out.push({ id: `marca-${b}`, label: b, onRemove: () => toggleMarca(b) }));
    if (state.comb) out.push({ id: "comb", label: FUEL_LABEL[state.comb], onRemove: () => setRaw({ comb: null }) });
    if (state.trans) {
      const label = TRANSMISSIONS.find((t) => t.slug === state.trans)?.label ?? state.trans;
      out.push({ id: "trans", label, onRemove: () => setRaw({ trans: null }) });
    }
    if (state.estado) {
      out.push({ id: "estado", label: state.estado === "0km" ? "0 km" : "Usados", onRemove: () => setRaw({ estado: null }) });
    }
    const ranged = (name: RangeName, label: (a: number, b: number) => string) => {
      const [lo, hi] = state[name];
      const [bLo, bHi] = BOUNDS[name];
      if (lo > bLo || hi < bHi) out.push({ id: name, label: label(lo, hi), onRemove: () => setRange(name, BOUNDS[name]) });
    };
    ranged("precio", (a, b) => `${formatPrice(a)} – ${formatNumber(b)}`);
    ranged("anio", (a, b) => `Año ${a} – ${b}`);
    ranged("km", (a, b) => `${formatNumber(a)} – ${formatNumber(b)} km`);
    if (state.guardados) out.push({ id: "guardados", label: "Guardados", onRemove: () => setRaw({ guardados: null }) });
    return out;
  }, [state, setRaw, setRange, toggleTipo, toggleMarca]);

  return {
    state,
    results,
    total: vehicles.length,
    bounds: BOUNDS,
    chips,
    /** Filters applied, not counting the free-text query. */
    activeCount: chips.filter((c) => c.id !== "q").length,
    orden: raw.orden as SortKey,
    vista: raw.vista as ViewMode,
    favorites,
    setQuery,
    setRange,
    toggleTipo,
    toggleMarca,
    setComb: (v: FilterState["comb"]) => setRaw({ comb: v }),
    setTrans: (v: FilterState["trans"]) => setRaw({ trans: v }),
    setEstado: (v: FilterState["estado"]) => setRaw({ estado: v }),
    setGuardados: (v: boolean) => setRaw({ guardados: v || null }),
    setOrden: (v: SortKey) => setRaw({ orden: v === "relevancia" ? null : v }),
    setVista: (v: ViewMode) => setRaw({ vista: v === "3" ? null : v }),
    clearAll: () => setRaw(FILTER_RESET),
    /** Used by the brand suggestion in the search bar. */
    setMarcaOnly: (brand: string) => setRaw({ marca: [brand], q: null }),
  };
}

export type FiltersApi = ReturnType<typeof useFilters>;
