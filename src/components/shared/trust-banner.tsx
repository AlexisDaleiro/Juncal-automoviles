import { FileCheck, Landmark, ShieldCheck, Wrench } from "lucide-react";

const items = [
  { icon: Wrench, title: "Revisión mecánica en todos los vehículos", text: "Cada auto pasa por el taller antes de publicarse." },
  { icon: ShieldCheck, title: "Garantía incluida", text: "Comprás con respaldo después de la entrega." },
  { icon: Landmark, title: "Financiación con todos los bancos", text: "Comparamos las opciones por vos." },
  { icon: FileCheck, title: "Gestoría y transferencia incluida", text: "Gestoría propia: salís con el auto a tu nombre." },
];

/** Full-width interstitial between catalog rows. A list with checks, not a row of icon cards. */
export function TrustBanner() {
  return (
    <section aria-labelledby="confianza-titulo" className="on-dark rounded-card bg-ink px-6 py-10 text-cream sm:px-10 sm:py-12">
      <h2 id="confianza-titulo" className="display max-w-xl text-2xl sm:text-3xl">
        Comprás tranquilo. Nosotros nos ocupamos del resto.
      </h2>
      <ul className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4">
            <Icon size={22} className="mt-0.5 shrink-0 text-bronze-500" aria-hidden />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="mt-0.5 text-sm text-cream-2">{text}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Figure comes from the brief's example copy: confirm the real number with the client. */}
      <p className="mt-8 border-t border-ink-line pt-6 text-sm text-cream-2">
        <span className="num font-semibold text-cream">+200</span> clientes satisfechos
      </p>
    </section>
  );
}
