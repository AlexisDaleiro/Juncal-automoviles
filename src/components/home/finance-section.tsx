"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { Container } from "@/components/layout/container";
import { SingleSlider } from "@/components/ui/range-slider";
import { useFinance } from "@/components/shared/finance-provider";
import { vehicles } from "@/data/vehicles";
import { FINANCE } from "@/lib/constants";
import { getBounds } from "@/lib/filters";
import { formatPrice } from "@/lib/utils";

const topPrice = getBounds(vehicles).precio[1];

/** Reverse of the card's "cuota estimada": start from the monthly payment, end at the cars that fit. */
function maxPrice(monthly: number, months: number, downPct: number) {
  const r = Math.pow(1 + FINANCE.apr, 1 / 12) - 1;
  const principal = (monthly * (1 - Math.pow(1 + r, -months))) / r;
  return Math.floor(principal / (1 - downPct / 100) / 500) * 500;
}

export function FinanceSection() {
  const { downPct, months, setDownPct, setMonths, openCalculator } = useFinance();
  const [monthly, setMonthly] = useState(300);

  const limit = maxPrice(monthly, months, downPct);
  const fits = vehicles.filter((v) => v.price <= limit).length;
  const href = limit >= topPrice ? "/vehiculos?orden=precio-desc" : `/vehiculos?pmax=${limit}&orden=precio-desc`;

  return (
    <section id="financiacion" aria-labelledby="titulo-financiacion" className="bg-paper-2">
      <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <h2 id="titulo-financiacion" className="display text-3xl sm:text-4xl">
            Elegí la cuota. Después, el auto.
          </h2>
          <p className="mt-4 max-w-md text-text-2">
            Trabajamos con todos los bancos. Mové el monto mensual y mirá hasta qué auto llegás.
          </p>
          <button
            type="button"
            onClick={() => openCalculator()}
            className="mt-6 inline-flex min-h-11 items-center font-medium text-ink underline decoration-bronze-500 decoration-2 underline-offset-8 transition-colors hover:text-bronze-700"
          >
            Abrir la calculadora completa
          </button>
        </div>

        <div className="space-y-7 rounded-card bg-white p-5 shadow-card sm:p-8">
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium">Cuota que querés pagar</span>
              <span className="num text-xl font-semibold">US$ {monthly}/mes</span>
            </div>
            <SingleSlider label="Cuota mensual en dólares" min={100} max={900} step={10} value={monthly} onChange={setMonthly} />
          </div>
          <div>
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium">Anticipo</span>
              <span className="num text-sm text-text-2">{downPct}% del precio</span>
            </div>
            <SingleSlider label="Anticipo en porcentaje" min={0} max={60} step={5} value={downPct} onChange={setDownPct} />
          </div>
          <ChoiceChips
            legend="Plazo en meses"
            name="plazo-home"
            options={FINANCE.terms.map((t) => ({ value: String(t), label: `${t} meses` }))}
            selected={[String(months)]}
            onChange={(v) => setMonths(Number(v))}
          />

          <div className="border-t border-line pt-6" role="status" aria-live="polite">
            {limit < Math.min(...vehicles.map((v) => v.price)) ? (
              <p className="text-text-2">Con esa cuota todavía no llegamos a ningún auto del stock. Probá subir la cuota o el plazo.</p>
            ) : (
              <>
                <p className="text-sm text-text-2">Llegás a un auto de hasta</p>
                <p className="num mt-1 text-4xl font-semibold leading-none">
                  <AnimatedNumber value={limit} format={(n) => formatPrice(n)} />
                </p>
                <p className="mt-2 text-sm text-text-2">
                  <span className="num font-semibold text-ink">
                    <AnimatedNumber value={fits} />
                  </span>{" "}
                  de los {vehicles.length} vehículos entran en esa cuota.
                </p>
              </>
            )}
            <Link href={href} className={buttonVariants({ variant: "primary", size: "lg", className: "mt-6 w-full sm:w-auto" })}>
              Ver esos vehículos
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
