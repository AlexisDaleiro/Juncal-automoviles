import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";
import { Catalog } from "@/components/vehicles/catalog";
import { vehicles } from "@/data/vehicles";
import { itemListLd } from "@/lib/seo";

// Filters live in the URL: rendering per request puts the filtered cards in the first HTML.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vehículos en venta",
  description:
    "Autos usados seleccionados, 0 km y eléctricos en Montevideo. Filtrá por precio, año, marca y combustible. Cuotas estimadas en dólares y gestoría propia.",
  alternates: { canonical: "/vehiculos" },
  openGraph: { url: "/vehiculos", title: "Vehículos en venta | Juncal Automóviles" },
};

export default function VehiculosPage() {
  return (
    <>
      {/* loading.tsx is the Suspense boundary useSearchParams (nuqs) needs. */}
      <Catalog />
      <JsonLd data={itemListLd(vehicles)} />
    </>
  );
}
