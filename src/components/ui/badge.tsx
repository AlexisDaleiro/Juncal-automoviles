import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = {
  solid: "bg-ink text-cream",
  accent: "bg-bronze-600 text-white",
  soft: "bg-bronze-100 text-bronze-700",
  ok: "bg-ok-soft text-ok",
  neutral: "bg-paper-2 text-text-2",
} as const;

export function Badge({
  variant = "neutral",
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold leading-none",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
