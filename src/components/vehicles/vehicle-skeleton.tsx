import { Skeleton } from "@/components/ui/skeleton";
import type { CardLayout } from "@/components/vehicles/vehicle-card";
import { cn } from "@/lib/utils";

/** Same boxes as VehicleCard, so nothing jumps when real cards replace it. */
export function VehicleSkeleton({ layout = "grid" }: { layout?: CardLayout }) {
  const list = layout === "list";
  return (
    <div aria-hidden className={cn("flex h-full overflow-hidden rounded-card bg-white shadow-card", list ? "flex-row" : "flex-col")}>
      <Skeleton className={cn("rounded-none", list ? "min-h-36 w-[42%] shrink-0 md:w-80" : "aspect-[4/3] w-full")} />
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-px w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-11 flex-1" />
          <Skeleton className="h-11 flex-1" />
        </div>
      </div>
    </div>
  );
}
