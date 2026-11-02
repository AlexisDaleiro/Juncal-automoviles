export type BodyType = "Sedán" | "SUV" | "Pick-up" | "Hatchback";
export type Fuel = "Nafta" | "Diésel" | "Eléctrico" | "Híbrido";
export type Transmission = "Manual" | "Automática";
export type Condition = "0 km" | "Usado";

export interface VehicleImage {
  src: string;
  alt: string;
  blurDataURL?: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  /** 0 for new units. */
  km: number;
  /** USD. */
  price: number;
  bodyType: BodyType;
  fuel: Fuel;
  transmission: Transmission;
  condition: Condition;
  color: string;
  engine: string;
  featured: boolean;
  /** ISO date; drives "Recientes". */
  publishedAt: string;
  images: VehicleImage[];
}

/** URL-safe slugs used in the query string. */
export type BodySlug = "sedan" | "suv" | "pickup" | "hatchback";
export type FuelSlug = "nafta" | "diesel" | "electrico" | "hibrido";
export type TransSlug = "manual" | "automatica";
export type ConditionSlug = "0km" | "usado";
export type SortKey = "relevancia" | "recientes" | "precio-asc" | "precio-desc" | "anio-desc" | "km-asc";
export type ViewMode = "2" | "3" | "lista";

export type Range = [number, number];

export interface FilterState {
  q: string;
  tipo: BodySlug[];
  marca: string[];
  comb: FuelSlug | null;
  trans: TransSlug | null;
  estado: ConditionSlug | null;
  precio: Range;
  anio: Range;
  km: Range;
  guardados: boolean;
}

export interface FilterChip {
  id: string;
  label: string;
  onRemove: () => void;
}
