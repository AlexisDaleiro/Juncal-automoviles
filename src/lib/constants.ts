import type { BodySlug, ConditionSlug, FuelSlug, SortKey, TransSlug, ViewMode } from "@/types/vehicle";

export const SITE = {
  name: "Juncal Automóviles",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.juncalautomoviles.com",
  description:
    "Autos usados seleccionados, 0 km y eléctricos en Montevideo. Precios en USD, financiación con todos los bancos y gestoría propia.",
};

/** Real data read from juncalautomoviles.com. Social handles are placeholders to confirm with the client. */
export const CONTACT = {
  /** E.164 without "+", for wa.me. */
  whatsapp: "59899601062",
  phones: [
    { label: "091 223 355", tel: "+59891223355" },
    { label: "099 601 062", tel: "+59899601062" },
  ],
  address: "Constituyente 1880 esq. Emilio Frugoni",
  city: "Montevideo, Uruguay",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Constituyente+1880+Montevideo+Uruguay",
  hours: [
    { days: "Lunes a viernes", time: "09:30 a 18:00 hs" },
    { days: "Sábados", time: "09:00 a 13:00 hs" },
  ],
  social: {
    instagram: "https://www.instagram.com/juncalautomoviles",
    facebook: "https://www.facebook.com/juncalautomoviles",
  },
};

export const FINANCE = {
  /** Reference annual effective rate in USD. Subject to bank approval; to be confirmed with the client. */
  apr: 0.095,
  terms: [12, 24, 36, 48, 60, 72],
  defaultMonths: 60,
  defaultDownPct: 30,
};

export const PAGE_SIZE = 12;
/** Position (card count) after which the trust interstitial is inserted. */
export const TRUST_AFTER = 12;

export const BODY_TYPES: { slug: BodySlug; label: string }[] = [
  { slug: "suv", label: "SUV" },
  { slug: "sedan", label: "Sedán" },
  { slug: "pickup", label: "Pick-up" },
  { slug: "hatchback", label: "Hatchback" },
];

export const FUELS: { slug: FuelSlug; label: string }[] = [
  { slug: "nafta", label: "Nafta" },
  { slug: "diesel", label: "Diésel" },
  { slug: "electrico", label: "Eléctrico" },
  { slug: "hibrido", label: "Híbrido" },
];

export const TRANSMISSIONS: { slug: TransSlug; label: string }[] = [
  { slug: "manual", label: "Manual" },
  { slug: "automatica", label: "Automática" },
];

export const CONDITIONS: { slug: ConditionSlug; label: string }[] = [
  { slug: "0km", label: "0 km" },
  { slug: "usado", label: "Usado" },
];

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevancia", label: "Relevancia" },
  { key: "recientes", label: "Más recientes" },
  { key: "precio-asc", label: "Precio: menor a mayor" },
  { key: "precio-desc", label: "Precio: mayor a menor" },
  { key: "anio-desc", label: "Año: más nuevo" },
  { key: "km-asc", label: "Menos kilómetros" },
];

export const VIEWS: { key: ViewMode; label: string }[] = [
  { key: "2", label: "Cuadrícula de 2 columnas" },
  { key: "3", label: "Cuadrícula de 3 columnas" },
  { key: "lista", label: "Lista" },
];

export const BODY_SLUGS = BODY_TYPES.map((b) => b.slug) as [BodySlug, ...BodySlug[]];
export const FUEL_SLUGS = FUELS.map((f) => f.slug) as [FuelSlug, ...FuelSlug[]];
export const TRANS_SLUGS = TRANSMISSIONS.map((t) => t.slug) as [TransSlug, ...TransSlug[]];
export const CONDITION_SLUGS = CONDITIONS.map((c) => c.slug) as [ConditionSlug, ...ConditionSlug[]];
export const SORT_KEYS = SORTS.map((s) => s.key) as [SortKey, ...SortKey[]];
export const VIEW_KEYS = VIEWS.map((v) => v.key) as [ViewMode, ...ViewMode[]];

/** Allowed hosts are local only: photos ship in /public/cars. */
export const BODY_LABEL = Object.fromEntries(BODY_TYPES.map((b) => [b.slug, b.label])) as Record<BodySlug, string>;
export const FUEL_LABEL = Object.fromEntries(FUELS.map((f) => [f.slug, f.label])) as Record<FuelSlug, string>;
