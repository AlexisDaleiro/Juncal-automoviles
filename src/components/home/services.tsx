import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { whatsappLink } from "@/lib/utils";

const rows = [
  {
    title: "Revisión mecánica y garantía",
    text: "Cada vehículo pasa por revisión mecánica antes de publicarse y se entrega con garantía.",
    cta: "Ver vehículos",
    href: "/vehiculos",
  },
  {
    title: "Gestoría propia",
    text: "Los trámites y la transferencia se resuelven en la casa, sin intermediarios.",
    cta: "Consultar gestoría",
    href: whatsappLink("Hola Juncal, quiero consultar por la gestoría y la transferencia."),
  },
  {
    title: "Seguros Ezzatti",
    text: "Cotizá el seguro del auto que elegís junto con la compra.",
    cta: "Cotizar seguro",
    href: whatsappLink("Hola Juncal, quiero cotizar el seguro con Ezzatti Seguros."),
  },
];

/** A ruled list on purpose: three services are a table of contents, not three cards. */
export function Services() {
  return (
    <section aria-labelledby="titulo-servicios" className="bg-paper-2">
      <Container className="py-16 sm:py-24">
        <h2 id="titulo-servicios" className="display text-3xl sm:text-4xl">
          Todo en la misma puerta
        </h2>
        <ul className="mt-10 divide-y divide-line-strong border-y border-line-strong">
          {rows.map((r) => {
            const external = r.href.startsWith("http");
            const link = (
              <>
                {r.cta}
                <ArrowUpRight size={18} aria-hidden />
              </>
            );
            const cls =
              "inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline decoration-bronze-500 decoration-2 underline-offset-8 transition-colors hover:text-bronze-700";
            return (
              <li key={r.title} className="grid gap-3 py-7 md:grid-cols-[1fr_1.3fr_auto] md:items-center md:gap-10">
                <h3 className="display text-xl">{r.title}</h3>
                <p className="text-text-2">{r.text}</p>
                {external ? (
                  <a className={cls} href={r.href} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                ) : (
                  <Link className={cls} href={r.href}>
                    {link}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
