"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Calculator, X } from "lucide-react";
import { useFinance } from "@/components/shared/finance-provider";
import { cn } from "@/lib/utils";

/**
 * Appears once the visitor scrolls past the first cards. Dismissible. After dismissal it returns
 * once, softly, when the third vehicle scrolls back into view.
 */
export function FinanceBanner() {
  const { openCalculator } = useFinance();
  const [visible, setVisible] = useState(false);
  const dismissed = useRef(false);
  const returned = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed.current) return;
      setVisible(window.scrollY > 560);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => observer.current?.disconnect(), []);

  const dismiss = useCallback(() => {
    setVisible(false);
    dismissed.current = true;
    if (returned.current) return;
    const third = document.querySelector("[data-vehicle-index='2']");
    if (!third) return;
    let wasIn = true;
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasIn && !returned.current) {
        returned.current = true;
        dismissed.current = false;
        setVisible(true);
        observer.current?.disconnect();
      }
      wasIn = entry.isIntersecting;
    });
    observer.current.observe(third);
  }, []);

  return (
    <aside
      aria-label="Financiación"
      inert={!visible}
      className={cn(
        "on-dark fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-[5.25rem] z-40 flex items-center gap-3 rounded-card bg-ink py-3 pl-4 pr-2 text-cream shadow-pop transition-[opacity,transform] duration-500 ease-out md:right-auto md:w-[22rem] lg:bottom-6 lg:left-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Calculator size={22} className="shrink-0 text-bronze-500" aria-hidden />
      <div className="min-w-0 flex-1 text-sm leading-snug">
        <p className="font-semibold">¿Necesitás financiación?</p>
        <button
          type="button"
          onClick={() => openCalculator()}
          className="mt-0.5 rounded-sm text-cream-2 underline decoration-bronze-500 underline-offset-4 transition-colors hover:text-cream"
        >
          Calculá tu cuota →
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Cerrar aviso de financiación"
        className="grid size-11 shrink-0 place-items-center rounded-full text-cream-2 transition-colors hover:text-cream"
      >
        <X size={18} aria-hidden />
      </button>
    </aside>
  );
}
