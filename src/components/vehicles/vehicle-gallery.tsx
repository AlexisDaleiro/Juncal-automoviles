"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/types/vehicle";

const arrow =
  "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-paper text-ink shadow-[0_1px_3px_rgb(10_10_10/0.3)] transition-opacity duration-200 hover:bg-white focus-visible:opacity-100";

/**
 * Photo area of a card.
 * - Desktop: moving the mouse across the photo scrubs through the shots (left zone, middle, right zone).
 * - Touch: horizontal swipe (vertical scroll stays native).
 * - Keyboard: prev/next buttons appear on focus.
 * Shots crossfade; extra shots only mount on first intent, so a grid of cards fetches one photo each.
 */
export function VehicleGallery({
  images,
  href,
  priority,
  sizes,
  className,
  children,
}: {
  images: VehicleImage[];
  href: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  children?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [armed, setArmed] = useState(false);
  const swipe = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const count = images.length;
  const go = (next: number) => setIndex((next + count) % count);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || count < 2) return;
    const box = e.currentTarget.getBoundingClientRect();
    const zone = Math.min(count - 1, Math.max(0, Math.floor(((e.clientX - box.left) / box.width) * count)));
    setIndex(zone);
  };

  return (
    <div
      className={cn("group/gallery relative touch-pan-y overflow-hidden bg-paper-2", className)}
      onPointerEnter={() => setArmed(true)}
      onFocusCapture={() => setArmed(true)}
      onPointerMove={onMove}
      onPointerLeave={(e) => e.pointerType === "mouse" && setIndex(0)}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") {
          setArmed(true);
          swipe.current = { x: e.clientX, y: e.clientY, moved: false };
        }
      }}
      onPointerUp={(e) => {
        const s = swipe.current;
        swipe.current = null;
        if (!s) return;
        const dx = e.clientX - s.x;
        if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(e.clientY - s.y)) {
          go(index + (dx < 0 ? 1 : -1));
          // keep the flag for the click that follows a swipe so it never opens the detail page
          swipe.current = { ...s, moved: true };
          setTimeout(() => (swipe.current = null), 50);
        }
      }}
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="absolute inset-0"
        onClick={(e) => {
          if (swipe.current?.moved) e.preventDefault();
        }}
      >
        {images.map((img, i) =>
          i === 0 || armed ? (
            <Image
              key={img.src}
              src={img.src}
              alt={i === index ? img.alt : ""}
              fill
              sizes={sizes}
              priority={priority && i === 0}
              loading={priority && i === 0 ? undefined : "lazy"}
              placeholder={img.blurDataURL ? "blur" : "empty"}
              blurDataURL={img.blurDataURL}
              draggable={false}
              className={cn(
                "object-cover transition-opacity duration-300 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null,
        )}
      </Link>

      {/* scrim: functional fade so dots and labels stay legible over any photo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink/55 to-transparent" />

      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => go(index - 1)}
            className={cn(arrow, "left-2 opacity-0 group-hover/gallery:opacity-100 pointer-coarse:hidden")}
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Foto siguiente"
            onClick={() => go(index + 1)}
            className={cn(arrow, "right-2 opacity-0 group-hover/gallery:opacity-100 pointer-coarse:hidden")}
          >
            <ChevronRight size={18} aria-hidden />
          </button>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <span
                key={img.src}
                className={cn(
                  "h-1.5 rounded-full bg-cream transition-[width,opacity] duration-300 ease-out",
                  i === index ? "w-4 opacity-100" : "w-1.5 opacity-60",
                )}
              />
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Foto {index + 1} de {count}
          </p>
        </>
      ) : null}
      {children}
    </div>
  );
}
