import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-ctl font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-45";

const variants = {
  primary: "bg-ink text-cream hover:bg-ink-raised",
  accent: "bg-bronze-600 text-white hover:bg-bronze-700",
  wa: "bg-wa text-white hover:bg-wa-hover",
  outline: "border border-line-strong text-ink hover:border-ink",
  ghost: "text-ink hover:bg-paper-2",
  onDark: "border border-ink-line text-cream hover:border-cream-3 hover:bg-ink-raised",
} as const;

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "size-11",
  iconSm: "size-9",
} as const;

export interface ButtonStyleProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

/** Same look for <button>, <a> and next/link. */
export function buttonVariants({ variant = "primary", size = "md", className }: ButtonStyleProps = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonStyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
