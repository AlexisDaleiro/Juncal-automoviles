"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types/vehicle";

/** Large photo with thumbnails. Crossfade, never slide. */
export function DetailGallery({ images }: { images: VehicleImage[] }) {
  const [index, setIndex] = useState(0);
  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-paper-2">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={i === index ? img.alt : ""}
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            priority={i === 0}
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
            className={cn("object-cover transition-opacity duration-300 ease-out", i === index ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
      <ul className="grid grid-cols-3 gap-3" aria-label="Fotos del vehículo">
        {images.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === index}
              className={cn(
                "relative block aspect-[4/3] w-full overflow-hidden rounded-xl border-2 transition-colors",
                i === index ? "border-bronze-600" : "border-transparent opacity-80 hover:opacity-100",
              )}
            >
              <Image src={img.src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
