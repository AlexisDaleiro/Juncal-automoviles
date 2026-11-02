import { IMAGE_BLUR } from "@/data/image-blur";
import type { BodyType, Fuel, Transmission, Vehicle } from "@/types/vehicle";

/**
 * Demo inventory. Model names, years, km and prices are illustrative (market-plausible for Uruguay),
 * except the models that appear on the current juncalautomoviles.com store (Strada, Oroch, Duster, EV3,
 * Mini EV4, OMODA EV Luxury). Chinese-brand trims (MCROWN, BAW, JMC) must be validated with the client.
 * Photos are Wikimedia Commons stand-ins matched to the model: see public/cars/CREDITS.md.
 */

type Row = {
  slug: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  km: number;
  price: number;
  bodyType: BodyType;
  fuel: Fuel;
  transmission: Transmission;
  color: string;
  engine: string;
  publishedAt: string;
  featured?: boolean;
};

function car(r: Row): Vehicle {
  const title = `${r.brand} ${r.model} ${r.trim} ${r.year}`;
  return {
    ...r,
    id: r.slug,
    featured: r.featured ?? false,
    condition: r.km === 0 ? "0 km" : "Usado",
    images: [1, 2, 3].map((n) => {
      const src = `/cars/${r.slug}-${n}.jpg`;
      return { src, alt: `${title}, foto ${n} de 3`, blurDataURL: IMAGE_BLUR[src] };
    }),
  };
}

export const vehicles: Vehicle[] = [
  car({ slug: "omoda-5-premium", brand: "OMODA", model: "5", trim: "Premium 1.5T", year: 2026, km: 0, price: 27990, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Verde menta", engine: "1.5 turbo 147 cv", publishedAt: "2026-10-31", featured: true }),
  car({ slug: "toyota-hilux-srv", brand: "Toyota", model: "Hilux", trim: "SRV 2.8 TDI 4x4", year: 2021, km: 62000, price: 33900, bodyType: "Pick-up", fuel: "Diésel", transmission: "Automática", color: "Blanco perlado", engine: "2.8 turbodiésel 204 cv", publishedAt: "2026-10-30", featured: true }),
  car({ slug: "toyota-corolla-cross-hybrid", brand: "Toyota", model: "Corolla Cross", trim: "XEi Hybrid", year: 2023, km: 22000, price: 33500, bodyType: "SUV", fuel: "Híbrido", transmission: "Automática", color: "Plata", engine: "1.8 híbrido 122 cv", publishedAt: "2026-10-29", featured: true }),
  car({ slug: "fiat-strada-ultra", brand: "Fiat", model: "Strada", trim: "Ultra 1.3 CD", year: 2026, km: 895, price: 13990, bodyType: "Pick-up", fuel: "Nafta", transmission: "Automática", color: "Rojo", engine: "1.3 Firefly 107 cv", publishedAt: "2026-10-28" }),
  car({ slug: "omoda-ev-luxury", brand: "OMODA", model: "EV", trim: "Luxury", year: 2026, km: 0, price: 18990, bodyType: "SUV", fuel: "Eléctrico", transmission: "Automática", color: "Blanco", engine: "Motor eléctrico 204 cv", publishedAt: "2026-10-27" }),
  car({ slug: "jmc-ev3", brand: "JMC", model: "EV3", trim: "Confort", year: 2026, km: 7200, price: 7990, bodyType: "Hatchback", fuel: "Eléctrico", transmission: "Automática", color: "Blanco", engine: "Motor eléctrico 41 cv", publishedAt: "2026-10-26" }),
  car({ slug: "mcrown-mini-ev4", brand: "MCROWN", model: "Mini EV4", trim: "Plus", year: 2026, km: 0, price: 7490, bodyType: "Hatchback", fuel: "Eléctrico", transmission: "Automática", color: "Celeste", engine: "Motor eléctrico 27 cv", publishedAt: "2026-10-25" }),
  car({ slug: "baw-bj40-plus", brand: "BAW", model: "BJ40", trim: "Plus 2.0T 4x4", year: 2025, km: 0, price: 38900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Verde militar", engine: "2.0 turbo 231 cv", publishedAt: "2026-10-24" }),
  car({ slug: "baw-bj30-elite", brand: "BAW", model: "BJ30", trim: "Elite 1.5T", year: 2025, km: 0, price: 24990, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Verde agua", engine: "1.5 turbo 177 cv", publishedAt: "2026-10-23" }),
  car({ slug: "renault-oroch-outsider", brand: "Renault", model: "Oroch", trim: "Intens Outsider 1.3T", year: 2024, km: 41400, price: 19900, bodyType: "Pick-up", fuel: "Nafta", transmission: "Automática", color: "Gris estrella", engine: "1.3 turbo 150 cv", publishedAt: "2026-10-22" }),
  car({ slug: "renault-duster-zen", brand: "Renault", model: "Duster", trim: "Zen 1.6", year: 2022, km: 62400, price: 14900, bodyType: "SUV", fuel: "Nafta", transmission: "Manual", color: "Gris", engine: "1.6 16v 115 cv", publishedAt: "2026-10-21" }),
  car({ slug: "renault-kwid-outsider", brand: "Renault", model: "Kwid", trim: "Outsider 1.0", year: 2023, km: 18500, price: 9600, bodyType: "Hatchback", fuel: "Nafta", transmission: "Manual", color: "Gris", engine: "1.0 SCe 66 cv", publishedAt: "2026-10-20" }),
  car({ slug: "ford-ranger-wildtrak", brand: "Ford", model: "Ranger", trim: "Wildtrak 2.0 BiTurbo 4x4", year: 2023, km: 29500, price: 38900, bodyType: "Pick-up", fuel: "Diésel", transmission: "Automática", color: "Naranja", engine: "2.0 biturbo 210 cv", publishedAt: "2026-10-19" }),
  car({ slug: "toyota-sw4-srx", brand: "Toyota", model: "SW4", trim: "SRX 2.8 TDI 4x4", year: 2022, km: 41000, price: 44900, bodyType: "SUV", fuel: "Diésel", transmission: "Automática", color: "Gris oscuro", engine: "2.8 turbodiésel 204 cv", publishedAt: "2026-10-18" }),
  car({ slug: "toyota-corolla-xei", brand: "Toyota", model: "Corolla", trim: "XEi 2.0 CVT", year: 2020, km: 48000, price: 19900, bodyType: "Sedán", fuel: "Nafta", transmission: "Automática", color: "Azul oscuro", engine: "2.0 Dual VVT-i 170 cv", publishedAt: "2026-10-17" }),
  car({ slug: "toyota-yaris-cross-hybrid", brand: "Toyota", model: "Yaris Cross", trim: "XLS Hybrid", year: 2023, km: 18000, price: 27900, bodyType: "SUV", fuel: "Híbrido", transmission: "Automática", color: "Blanco", engine: "1.5 híbrido 116 cv", publishedAt: "2026-10-16" }),
  car({ slug: "vw-polo-highline", brand: "Volkswagen", model: "Polo", trim: "Highline 200 TSI", year: 2022, km: 36500, price: 17900, bodyType: "Hatchback", fuel: "Nafta", transmission: "Automática", color: "Gris", engine: "1.0 TSI 116 cv", publishedAt: "2026-10-15" }),
  car({ slug: "vw-t-cross-highline", brand: "Volkswagen", model: "T-Cross", trim: "Highline 250 TSI", year: 2022, km: 38000, price: 24900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Gris plata", engine: "1.4 TSI 150 cv", publishedAt: "2026-10-14" }),
  car({ slug: "vw-amarok-v6", brand: "Volkswagen", model: "Amarok", trim: "V6 Highline 3.0 TDI", year: 2023, km: 21500, price: 44500, bodyType: "Pick-up", fuel: "Diésel", transmission: "Automática", color: "Plata", engine: "3.0 V6 turbodiésel 258 cv", publishedAt: "2026-10-13" }),
  car({ slug: "vw-gol-trend", brand: "Volkswagen", model: "Gol", trim: "Trend 1.6", year: 2019, km: 74000, price: 8900, bodyType: "Hatchback", fuel: "Nafta", transmission: "Manual", color: "Plata", engine: "1.6 MSI 101 cv", publishedAt: "2026-10-12" }),
  car({ slug: "hyundai-tucson-gls", brand: "Hyundai", model: "Tucson", trim: "GLS 2.0", year: 2021, km: 52000, price: 22900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Blanco", engine: "2.0 MPI 156 cv", publishedAt: "2026-10-11" }),
  car({ slug: "hyundai-creta-limited", brand: "Hyundai", model: "Creta", trim: "Limited 2.0", year: 2022, km: 31000, price: 21900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Blanco", engine: "2.0 MPI 156 cv", publishedAt: "2026-10-10" }),
  car({ slug: "hyundai-accent-gl", brand: "Hyundai", model: "Accent", trim: "GL 1.6", year: 2018, km: 87000, price: 9800, bodyType: "Sedán", fuel: "Nafta", transmission: "Manual", color: "Blanco", engine: "1.6 MPI 123 cv", publishedAt: "2026-10-09" }),
  car({ slug: "chevrolet-onix-plus-premier", brand: "Chevrolet", model: "Onix Plus", trim: "Premier 1.0 Turbo", year: 2022, km: 35000, price: 15200, bodyType: "Sedán", fuel: "Nafta", transmission: "Automática", color: "Plata", engine: "1.0 turbo 116 cv", publishedAt: "2026-10-08" }),
  car({ slug: "chevrolet-onix-plus-lt", brand: "Chevrolet", model: "Onix Plus", trim: "LT 1.2", year: 2021, km: 58000, price: 11900, bodyType: "Sedán", fuel: "Nafta", transmission: "Manual", color: "Blanco", engine: "1.2 MPFI 90 cv", publishedAt: "2026-10-07" }),
  car({ slug: "chevrolet-tracker-premier", brand: "Chevrolet", model: "Tracker", trim: "Premier 1.2 Turbo", year: 2023, km: 24000, price: 23500, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Blanco", engine: "1.2 turbo 133 cv", publishedAt: "2026-10-06" }),
  car({ slug: "peugeot-2008-allure", brand: "Peugeot", model: "2008", trim: "Allure Pack", year: 2024, km: 12500, price: 26900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Gris", engine: "1.2 PureTech 130 cv", publishedAt: "2026-10-05" }),
  car({ slug: "suzuki-celerio-gl", brand: "Suzuki", model: "Celerio", trim: "GL 1.0", year: 2021, km: 41000, price: 8490, bodyType: "Hatchback", fuel: "Nafta", transmission: "Manual", color: "Blanco", engine: "1.0 K10C 67 cv", publishedAt: "2026-10-04" }),
  car({ slug: "jeep-renegade-sport", brand: "Jeep", model: "Renegade", trim: "Sport 1.8", year: 2021, km: 44000, price: 17900, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Turquesa", engine: "1.8 E.torQ 139 cv", publishedAt: "2026-10-03" }),
  car({ slug: "nissan-kicks-advance", brand: "Nissan", model: "Kicks", trim: "Advance 1.6 CVT", year: 2022, km: 33000, price: 17500, bodyType: "SUV", fuel: "Nafta", transmission: "Automática", color: "Blanco", engine: "1.6 16v 118 cv", publishedAt: "2026-10-02" }),
  car({ slug: "fiat-toro-volcano", brand: "Fiat", model: "Toro", trim: "Volcano 1.3 T270", year: 2022, km: 38200, price: 21900, bodyType: "Pick-up", fuel: "Nafta", transmission: "Automática", color: "Blanco", engine: "1.3 turbo 185 cv", publishedAt: "2026-10-01" }),
];

export const vehicleBySlug = (slug: string) => vehicles.find((v) => v.slug === slug);
