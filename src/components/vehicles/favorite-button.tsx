"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { cn, vehicleTitle } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

/** Pill over the photo. The heart fills and pops (1 → 1.3 → 1) only after a click, never on load. */
export function FavoriteButton({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  const { has, toggle } = useFavorites();
  const [popped, setPopped] = useState(false);
  const saved = has(vehicle.id);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Quitar de guardados" : "Guardar"}: ${vehicleTitle(vehicle)} ${vehicle.year}`}
      onClick={() => {
        toggle(vehicle.id);
        setPopped(true);
      }}
      className={cn(
        "relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full bg-paper px-2.5 text-xs font-semibold text-ink shadow-[0_1px_3px_rgb(10_10_10/0.25)] transition-colors duration-200 hover:bg-white",
        className,
      )}
    >
      <Heart
        key={saved ? "on" : "off"}
        size={16}
        aria-hidden
        className={cn(
          "transition-colors duration-200",
          saved ? "fill-bronze-600 text-bronze-600" : "fill-transparent text-ink",
          saved && popped && "heart-pop",
        )}
      />
      {saved ? "Guardado" : "Guardar"}
    </button>
  );
}
