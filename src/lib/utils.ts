import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CONTACT, FINANCE } from "@/lib/constants";
import type { Vehicle } from "@/types/vehicle";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 14900 -> "14.900". Hand-rolled so server and client always agree (ICU skips grouping on 4 digits). */
export function formatNumber(n: number) {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function formatPrice(n: number) {
  return `US$ ${formatNumber(n)}`;
}

export function formatKm(km: number) {
  return km === 0 ? "0 km" : `${formatNumber(km)} km`;
}

export function vehicleTitle(v: Pick<Vehicle, "brand" | "model" | "trim">) {
  return `${v.brand} ${v.model} ${v.trim}`;
}

/** French amortization (PMT). Rate is annual effective; payment is monthly. */
export function monthlyPayment(price: number, downPct: number, months: number, apr: number = FINANCE.apr) {
  const principal = price * (1 - downPct / 100);
  if (principal <= 0) return 0;
  const r = Math.pow(1 + apr, 1 / 12) - 1;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export function whatsappLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function vehicleMessage(v: Vehicle) {
  return `Hola Juncal, me interesa el ${vehicleTitle(v)} ${v.year} (${formatPrice(v.price)}). ¿Sigue disponible?`;
}

/** Lowercase, accent-free, for forgiving search. */
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
