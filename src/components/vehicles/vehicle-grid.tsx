"use client";

import { AnimatePresence, m } from "framer-motion";
import { TrustBanner } from "@/components/shared/trust-banner";
import { VehicleCard, type CardLayout } from "@/components/vehicles/vehicle-card";
import { VehicleSkeleton } from "@/components/vehicles/vehicle-skeleton";
import { PAGE_SIZE, TRUST_AFTER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Vehicle, ViewMode } from "@/types/vehicle";

const GRID: Record<ViewMode, string> = {
  "2": "grid-cols-1 sm:grid-cols-2",
  "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  lista: "grid-cols-1",
};

const SIZES: Record<ViewMode, string> = {
  "2": "(min-width: 640px) 50vw, 100vw",
  "3": "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  lista: "(min-width: 768px) 320px, 42vw",
};

const ease = [0.16, 1, 0.3, 1] as const;

export function VehicleGrid({
  items,
  view,
  loadingMore,
  intro,
}: {
  items: Vehicle[];
  view: ViewMode;
  loadingMore: boolean;
  /** Stagger only the first paint; later filter changes should feel immediate. */
  intro: boolean;
}) {
  const skeletonLayout: CardLayout = view === "lista" ? "list" : "grid";

  return (
    <ul className={cn("relative grid gap-5 lg:gap-6", GRID[view], view === "lista" && "gap-3 sm:gap-4")}>
      <AnimatePresence mode="popLayout" initial>
        {items.flatMap((v, i) => {
          // The lead result stretches across two columns when it is a featured unit.
          const layout: CardLayout = view === "lista" ? "list" : i === 0 && v.featured ? "feature" : "grid";
          const nodes = [
            <m.li
              key={v.id}
              data-vehicle-index={i}
              layout="position"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
              transition={{ duration: 0.3, ease, delay: intro ? Math.min(i, 9) * 0.04 : 0, layout: { duration: 0.4, ease } }}
              className={layout === "feature" ? "sm:col-span-2" : undefined}
            >
              <VehicleCard
                vehicle={v}
                layout={layout}
                priority={i < 4}
                sizes={layout === "feature" ? "(min-width: 640px) 56vw, 100vw" : SIZES[view]}
              />
            </m.li>,
          ];
          if (i === TRUST_AFTER - 1) {
            nodes.push(
              <m.li
                key="confianza"
                layout="position"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.3, ease }}
                className="col-span-full"
              >
                <TrustBanner />
              </m.li>,
            );
          }
          return nodes;
        })}
      </AnimatePresence>
      {loadingMore
        ? Array.from({ length: Math.min(PAGE_SIZE, 6) }, (_, i) => (
            <li key={`sk-${i}`} aria-hidden>
              <VehicleSkeleton layout={skeletonLayout} />
            </li>
          ))
        : null}
    </ul>
  );
}
