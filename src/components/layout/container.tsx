import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Max 1360px, gutters 16 / 24 / 32. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
