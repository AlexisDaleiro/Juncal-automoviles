"use client";

import Link from "next/link";
import { Cog, Fuel, Gauge, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { QuotaButton } from "@/components/shared/finance-provider";
import { FavoriteButton } from "@/components/vehicles/favorite-button";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { cn, formatKm, formatNumber, vehicleMessage, vehicleTitle, whatsappLink } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

/** grid: stacked. list: photo left, price block right. feature: wide, the lead result of a row. */
export type CardLayout = "grid" | "list" | "feature";

export function VehicleCard({
  vehicle: v,
  layout,
  priority,
  sizes,
}: {
  vehicle: Vehicle;
  layout: CardLayout;
  priority?: boolean;
  sizes: string;
}) {
  const href = `/vehiculos/${v.slug}`;
  const feature = layout === "feature";
  const list = layout === "list";
  const FuelIcon = v.fuel === "Eléctrico" ? Zap : Fuel;

  return (
    <article
      aria-labelledby={`vehiculo-${v.id}`}
      className={cn(
        "vehicle-card group/card relative flex h-full overflow-hidden rounded-card border border-transparent bg-white shadow-card",
        "[transition:box-shadow_300ms_var(--ease-out-expo),border-color_300ms_var(--ease-out-expo),transform_260ms_var(--ease-spring)]",
        "hover:border-bronze-500/60 hover:shadow-card-hover pointer-coarse:active:scale-[0.98] pointer-coarse:active:duration-100",
        "has-[h3_a:focus-visible]:outline-2 has-[h3_a:focus-visible]:outline-offset-2 has-[h3_a:focus-visible]:outline-bronze-600",
        layout === "grid" && "flex-col",
        list && "flex-row",
        feature && "flex-col sm:flex-row",
      )}
    >
      <VehicleGallery
        images={v.images}
        href={href}
        priority={priority}
        sizes={sizes}
        className={cn(
          layout === "grid" && "aspect-[4/3] w-full",
          list && "min-h-36 w-[42%] shrink-0 self-stretch md:w-80",
          feature && "aspect-[4/3] w-full shrink-0 sm:aspect-auto sm:min-h-[22rem] sm:w-[56%] sm:self-stretch",
        )}
      >
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
          <Badge variant="solid" className="num">
            {v.year}
          </Badge>
          {v.condition === "0 km" ? <Badge variant="accent">0 km</Badge> : null}
          {v.featured ? <Badge variant="soft">Destacado</Badge> : null}
        </div>
        <FavoriteButton vehicle={v} className="absolute right-3 top-3" />
        <span className="pointer-events-none absolute bottom-2.5 left-3 z-10 inline-flex items-center gap-1.5 text-xs font-medium text-cream">
          <span aria-hidden className="size-2 rounded-full bg-ok-bright" />
          Disponible
        </span>
      </VehicleGallery>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-4 p-4 sm:p-5",
          list && "md:flex-row md:items-center md:gap-8",
          feature && "sm:justify-center sm:gap-5 sm:p-8",
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <h3 id={`vehiculo-${v.id}`} className={cn("leading-snug", feature ? "text-2xl" : "text-lg")}>
            <Link
              href={href}
              className="outline-none after:absolute after:inset-0 after:z-0 after:content-['']"
              aria-label={`${vehicleTitle(v)} ${v.year}, ver detalle`}
            >
              <span className="font-semibold">{v.brand}</span>{" "}
              <span className="font-normal text-text-2">
                {v.model} {v.trim}
              </span>
            </Link>
          </h3>
          <div aria-hidden className="relative h-px w-full bg-line">
            <span className="absolute left-0 top-0 h-0.5 w-8 -translate-y-px bg-bronze-500" />
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-text-2">
            <li className="inline-flex items-center gap-1.5">
              <FuelIcon size={16} aria-hidden className="text-text-3" />
              {v.fuel}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Gauge size={16} aria-hidden className="text-text-3" />
              <span className="num">{formatKm(v.km)}</span>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Cog size={16} aria-hidden className="text-text-3" />
              {v.transmission}
            </li>
          </ul>
          {feature ? (
            <p className="hidden text-sm text-text-2 sm:block">
              {v.engine} · {v.color}
            </p>
          ) : null}
        </div>

        <div className={cn("flex flex-col gap-4", list && "md:w-64 md:shrink-0 md:border-l md:border-line md:pl-6")}>
          <div>
            <p className={cn("num font-semibold leading-none", feature ? "text-4xl" : "text-[1.75rem]")}>
              <span className="mr-1.5 text-sm font-medium text-text-3">US$</span>
              {formatNumber(v.price)}
            </p>
            <QuotaButton vehicle={v} className="mt-2 -ml-0.5" />
          </div>
          <div className="flex gap-2">
            <Link href={href} className={buttonVariants({ variant: "outline", className: "relative z-10 flex-1 px-3" })}>
              Ver detalle
            </Link>
            <a
              href={whatsappLink(vehicleMessage(v))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar por WhatsApp: ${vehicleTitle(v)} ${v.year}`}
              className={buttonVariants({ variant: "primary", className: "relative z-10 flex-1 px-3" })}
            >
              <WhatsAppIcon size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
