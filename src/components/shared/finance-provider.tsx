"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { FINANCE } from "@/lib/constants";
import { cn, formatNumber, monthlyPayment } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

const FinanceCalculator = dynamic(() => import("@/components/shared/finance-calculator").then((m) => m.FinanceCalculator), {
  ssr: false,
});

interface FinanceContext {
  downPct: number;
  months: number;
  setDownPct: (n: number) => void;
  setMonths: (n: number) => void;
  /** Monthly installment in USD for the shared down payment and term. */
  quota: (price: number) => number;
  openCalculator: (vehicle?: Vehicle) => void;
}

const Ctx = createContext<FinanceContext | null>(null);

export function useFinance() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFinance must be used inside <FinanceProvider>");
  return ctx;
}

/**
 * One down payment / term shared by every card: change it in the calculator and each
 * "cuota estimada" in the catalog recounts.
 */
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [downPct, setDownPct] = useState<number>(FINANCE.defaultDownPct);
  const [months, setMonths] = useState<number>(FINANCE.defaultMonths);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | undefined>();

  const quota = useCallback((price: number) => monthlyPayment(price, downPct, months), [downPct, months]);
  const openCalculator = useCallback((v?: Vehicle) => {
    setVehicle(v);
    setMounted(true);
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ downPct, months, setDownPct, setMonths, quota, openCalculator }),
    [downPct, months, quota, openCalculator],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted ? <FinanceCalculator open={open} onOpenChange={setOpen} vehicle={vehicle} /> : null}
    </Ctx.Provider>
  );
}

/** "~US$ 219 /mes con financiación →" opens the calculator for that vehicle. */
export function QuotaButton({ vehicle, className }: { vehicle: Vehicle; className?: string }) {
  const { quota, openCalculator } = useFinance();
  return (
    <button
      type="button"
      onClick={() => openCalculator(vehicle)}
      className={cn(
        "group/quota relative z-10 inline-flex items-center gap-1.5 rounded-ctl py-1 text-sm text-text-2 transition-colors hover:text-bronze-700",
        className,
      )}
    >
      <span>
        ~US$ <span className="num font-semibold text-ink"><AnimatedNumber value={Math.round(quota(vehicle.price))} format={formatNumber} /></span>
        <span className="text-text-3"> /mes con financiación</span>
      </span>
      <ArrowRight size={16} aria-hidden className="transition-transform duration-200 ease-out group-hover/quota:translate-x-0.5" />
    </button>
  );
}
