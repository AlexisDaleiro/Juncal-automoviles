import { cn } from "@/lib/utils";

/** Shimmer sweeps once, left to right. Looping shimmer reads as a stuck page. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn("skeleton rounded-md", className)} />;
}
