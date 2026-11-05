import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { vehicles } from "@/data/vehicles";

const featured = vehicles.filter((v) => v.featured);
const seeAll =
  "min-h-11 items-center gap-2 font-medium text-ink underline decoration-bronze-500 decoration-2 underline-offset-8 transition-colors hover:text-bronze-700";

/** A short strip, not a second catalog: three featured units and the way to the rest. */
export function StockStrip() {
  return (
    <section aria-labelledby="titulo-salon">
      <Container className="py-16 sm:py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 id="titulo-salon" className="display text-3xl sm:text-4xl">
              En el salón ahora
            </h2>
            <p className="mt-3 max-w-xl text-text-2">
              Tres de los {vehicles.length} vehículos disponibles. Pasá a verlos o escribinos por el que te guste.
            </p>
          </div>
          <Link href="/vehiculos" className={`${seeAll} hidden shrink-0 sm:inline-flex`}>
            Ver los {vehicles.length} vehículos
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featured.map((v, i) => (
            <li key={v.id} className={i === 2 ? "hidden lg:block" : undefined}>
              <VehicleCard vehicle={v} layout="grid" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
        <Link href="/vehiculos" className={`${seeAll} mt-8 inline-flex sm:hidden`}>
          Ver los {vehicles.length} vehículos
          <ArrowRight size={18} aria-hidden />
        </Link>
      </Container>
    </section>
  );
}
