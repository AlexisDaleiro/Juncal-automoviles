"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ChoiceChips } from "@/components/ui/choice-chips";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SingleSlider } from "@/components/ui/range-slider";
import { Sheet } from "@/components/ui/sheet";
import { useFinance } from "@/components/shared/finance-provider";
import { FINANCE } from "@/lib/constants";
import { formatNumber, formatPrice, monthlyPayment, vehicleTitle, whatsappLink } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

export function FinanceCalculator({
  open,
  onOpenChange,
  vehicle,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  vehicle?: Vehicle;
}) {
  const { downPct, months, setDownPct, setMonths } = useFinance();
  const [customPrice, setCustomPrice] = useState(20000);

  const price = vehicle?.price ?? customPrice;
  const down = Math.round((price * downPct) / 100);
  const principal = price - down;
  const payment = monthlyPayment(price, downPct, months);
  const interest = payment * months - principal;

  const subject = vehicle ? `${vehicleTitle(vehicle)} ${vehicle.year}` : "un vehículo";
  const message = `Hola Juncal, simulé la financiación de ${subject} (${formatPrice(price)}): anticipo ${downPct}% y ${months} cuotas de ~US$ ${formatNumber(payment)}. Quiero avanzar.`;

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      placement="center"
      title="Calculá tu cuota"
      description="Simulador de cuota mensual en dólares según anticipo y plazo"
      footer={
        <a
          className={buttonVariants({ variant: "wa", size: "lg", className: "w-full" })}
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={20} />
          Consultar esta financiación
        </a>
      }
    >
      <div className="space-y-6">
        {vehicle ? (
          <p className="text-text-2">
            <span className="font-semibold text-ink">{vehicle.brand}</span> {vehicle.model} {vehicle.trim} · {vehicle.year}
            <span className="num ml-2 font-semibold text-ink">{formatPrice(vehicle.price)}</span>
          </p>
        ) : (
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <label className="text-sm font-medium text-ink">Precio del vehículo</label>
              <span className="num text-lg font-semibold">{formatPrice(price)}</span>
            </div>
            <SingleSlider label="Precio del vehículo" min={5000} max={50000} step={500} value={customPrice} onChange={setCustomPrice} />
          </div>
        )}

        <div>
          <div className="mb-3 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink">Anticipo</span>
            <span className="num text-sm text-text-2">
              <span className="font-semibold text-ink">{downPct}%</span> · {formatPrice(down)}
            </span>
          </div>
          <SingleSlider label="Anticipo en porcentaje" min={0} max={70} step={5} value={downPct} onChange={setDownPct} />
        </div>

        <ChoiceChips
          legend="Plazo en meses"
          name="plazo"
          options={FINANCE.terms.map((t) => ({ value: String(t), label: `${t} meses` }))}
          selected={[String(months)]}
          onChange={(v) => setMonths(Number(v))}
        />

        <div className="on-dark rounded-card bg-ink p-5 text-cream">
          <p className="text-sm text-cream-2">Cuota estimada</p>
          <p role="status" className="num mt-1 text-4xl font-semibold">
            <span className="text-lg font-medium text-cream-2">US$ </span>
            <AnimatedNumber value={Math.round(payment)} />
            <span className="text-base font-medium text-cream-2"> /mes</span>
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink-line pt-4 text-sm">
            <dt className="text-cream-2">A financiar</dt>
            <dd className="num text-right">{formatPrice(principal)}</dd>
            <dt className="text-cream-2">Intereses totales</dt>
            <dd className="num text-right">{formatPrice(Math.max(interest, 0))}</dd>
            <dt className="text-cream-2">Plazo</dt>
            <dd className="num text-right">{months} cuotas</dd>
          </dl>
        </div>

        <p className="text-xs text-text-3">
          Simulación referencial en dólares con tasa efectiva anual de {(FINANCE.apr * 100).toFixed(1).replace(".", ",")}%. La cuota
          final depende de la aprobación bancaria. Trabajamos con todos los bancos.
        </p>
      </div>
    </Sheet>
  );
}
