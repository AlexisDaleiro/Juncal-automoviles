import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleSkeleton } from "@/components/vehicles/vehicle-skeleton";

/** Hero-shaped placeholder + first row of cards: same boxes as the real page, so nothing shifts. */
export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Cargando vehículos">
      <div className="bg-ink">
        <Container className="pb-8 pt-6 sm:pb-10 sm:pt-10 lg:pb-12">
          <h1 className="display max-w-3xl text-5xl text-cream">Encontrá tu próximo auto</h1>
          <Skeleton className="mt-4 h-6 w-full max-w-xl bg-ink-raised" />
          <Skeleton className="mt-6 h-14 w-full max-w-3xl bg-ink-raised sm:h-16" />
          <Skeleton className="mt-5 h-11 w-full max-w-md bg-ink-raised" />
        </Container>
      </div>
      <div className="h-[4.5rem] border-b border-line" />
      <Container className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {Array.from({ length: 3 }, (_, i) => (
          <VehicleSkeleton key={i} />
        ))}
      </Container>
    </div>
  );
}
