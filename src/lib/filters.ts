import { BODY_LABEL, FUEL_LABEL } from "@/lib/constants";
import { normalize } from "@/lib/utils";
import type { FilterState, Range, SortKey, Vehicle } from "@/types/vehicle";

const roundDown = (n: number, step: number) => Math.floor(n / step) * step;
const roundUp = (n: number, step: number) => Math.ceil(n / step) * step;

export function getBounds(list: Vehicle[]) {
  const prices = list.map((v) => v.price);
  const years = list.map((v) => v.year);
  const kms = list.map((v) => v.km);
  return {
    precio: [roundDown(Math.min(...prices), 500), roundUp(Math.max(...prices), 500)] as Range,
    anio: [Math.min(...years), Math.max(...years)] as Range,
    km: [0, roundUp(Math.max(...kms), 5000)] as Range,
  };
}

const haystack = (v: Vehicle) =>
  normalize(
    [v.brand, v.model, v.trim, v.year, v.color, v.bodyType, v.fuel, v.condition === "0 km" ? "0km cero km nuevo" : "usado"].join(" "),
  );

export function filterVehicles(list: Vehicle[], f: FilterState, favorites: readonly string[]): Vehicle[] {
  const tokens = normalize(f.q).split(/\s+/).filter(Boolean);
  return list.filter((v) => {
    if (tokens.length) {
      const h = haystack(v);
      if (!tokens.every((t) => h.includes(t))) return false;
    }
    if (f.tipo.length && !f.tipo.some((t) => BODY_LABEL[t] === v.bodyType)) return false;
    if (f.marca.length && !f.marca.includes(v.brand)) return false;
    if (f.comb && FUEL_LABEL[f.comb] !== v.fuel) return false;
    if (f.trans && normalize(v.transmission) !== f.trans) return false;
    if (f.estado && (f.estado === "0km") !== (v.condition === "0 km")) return false;
    if (v.price < f.precio[0] || v.price > f.precio[1]) return false;
    if (v.year < f.anio[0] || v.year > f.anio[1]) return false;
    if (v.km < f.km[0] || v.km > f.km[1]) return false;
    if (f.guardados && !favorites.includes(v.id)) return false;
    return true;
  });
}

const byRecent = (a: Vehicle, b: Vehicle) => b.publishedAt.localeCompare(a.publishedAt);

export function sortVehicles(list: Vehicle[], key: SortKey): Vehicle[] {
  const out = [...list];
  switch (key) {
    case "recientes":
      return out.sort(byRecent);
    case "precio-asc":
      return out.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return out.sort((a, b) => b.price - a.price);
    case "anio-desc":
      return out.sort((a, b) => b.year - a.year || a.km - b.km);
    case "km-asc":
      return out.sort((a, b) => a.km - b.km);
    default:
      return out.sort((a, b) => Number(b.featured) - Number(a.featured) || byRecent(a, b));
  }
}

export function countBy<T extends string>(list: Vehicle[], pick: (v: Vehicle) => T) {
  const map = new Map<T, number>();
  for (const v of list) map.set(pick(v), (map.get(pick(v)) ?? 0) + 1);
  return map;
}

export interface Suggestions {
  brands: { name: string; count: number }[];
  models: { label: string; query: string; count: number; from: number }[];
}

/** Powers the search combobox. Empty query returns the most stocked brands. */
export function getSuggestions(list: Vehicle[], q: string): Suggestions {
  const term = normalize(q);
  const brandCounts = [...countBy(list, (v) => v.brand).entries()].map(([name, count]) => ({ name, count }));
  const modelMap = new Map<string, { label: string; query: string; count: number; from: number }>();
  for (const v of list) {
    const label = `${v.brand} ${v.model}`;
    const hit = modelMap.get(label);
    if (hit) {
      hit.count += 1;
      hit.from = Math.min(hit.from, v.price);
    } else {
      modelMap.set(label, { label, query: label, count: 1, from: v.price });
    }
  }
  if (!term) {
    return { brands: brandCounts.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 5), models: [] };
  }
  const tokens = term.split(/\s+/);
  const matches = (text: string) => {
    const n = normalize(text);
    return tokens.every((t) => n.includes(t));
  };
  return {
    brands: brandCounts.filter((b) => matches(b.name)).sort((a, b) => b.count - a.count).slice(0, 3),
    models: [...modelMap.values()].filter((m) => matches(m.label)).sort((a, b) => b.count - a.count).slice(0, 6),
  };
}
