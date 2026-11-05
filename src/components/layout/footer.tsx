import Link from "next/link";
import { Clock, FileCheck, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { FacebookIcon, InstagramIcon, LogoMark, WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

const col = "space-y-3 text-sm text-cream-2";
const heading = "display mb-4 text-base text-cream";
const link = "inline-flex min-h-8 items-center transition-colors hover:text-cream";

export function Footer() {
  return (
    <footer className="on-dark mt-24 bg-ink text-cream-2">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-cream">
            <LogoMark size={36} />
            <span className="flex flex-col leading-none">
              <span className="display text-2xl">Juncal</span>
              <span className="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-cream-2">Automóviles</span>
            </span>
          </div>
          <p className="max-w-sm text-sm">
            Autos usados seleccionados, 0 km y eléctricos. Precios en dólares, financiación con todos los bancos y
            gestoría propia.
          </p>
          <div className="flex max-w-sm items-start gap-3 rounded-card border border-ink-line p-4">
            <FileCheck size={22} className="mt-0.5 shrink-0 text-bronze-500" aria-hidden />
            <p className="text-sm">
              <span className="block font-semibold text-cream">Gestoría propia</span>
              Trámites y transferencia resueltos en la casa, sin intermediarios.
            </p>
          </div>
        </div>

        <div>
          <h2 className={heading}>Visitanos</h2>
          <div className={col}>
            <a className="flex items-start gap-3 hover:text-cream" href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={18} className="mt-0.5 shrink-0 text-cream-3" aria-hidden />
              <span>
                {CONTACT.address}
                <br />
                {CONTACT.city}
                <span className="mt-1 block text-bronze-500 underline underline-offset-4">Cómo llegar</span>
              </span>
            </a>
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-cream-3" aria-hidden />
              <dl>
                {CONTACT.hours.map((h) => (
                  <div key={h.days} className="mb-1">
                    <dt className="text-cream">{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div>
          <h2 className={heading}>Atajos</h2>
          <ul className={col}>
            <li>
              <Link className={link} href="/">
                Inicio
              </Link>
            </li>
            <li>
              <Link className={link} href="/vehiculos">
                Todos los vehículos
              </Link>
            </li>
            <li>
              <Link className={link} href="/#vender">
                Vender mi auto
              </Link>
            </li>
            <li>
              <a className={link} href={whatsappLink("Hola Juncal, quiero consultar por financiación.")} target="_blank" rel="noopener noreferrer">
                Financiación
              </a>
            </li>
            <li>
              <a className={link} href="https://www.juncalautomoviles.com" target="_blank" rel="noopener noreferrer">
                Sobre nosotros
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>Contacto</h2>
          <ul className={col}>
            <li>
              <a
                className={`${link} gap-2 text-cream`}
                href={whatsappLink("Hola Juncal, quiero hacer una consulta.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={18} className="text-wa" />
                <span className="num">{CONTACT.phones[1].label}</span>
              </a>
            </li>
            {CONTACT.phones.map((p) => (
              <li key={p.tel}>
                <a className={`${link} gap-2`} href={`tel:${p.tel}`}>
                  <Phone size={16} aria-hidden className="text-cream-3" />
                  <span className="num">{p.label}</span>
                </a>
              </li>
            ))}
            <li className="flex gap-2 pt-2">
              <a
                aria-label="Instagram de Juncal Automóviles"
                className="grid size-10 place-items-center rounded-full border border-ink-line transition-colors hover:border-cream-3 hover:text-cream"
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                aria-label="Facebook de Juncal Automóviles"
                className="grid size-10 place-items-center rounded-full border border-ink-line transition-colors hover:border-cream-3 hover:text-cream"
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon size={18} />
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-ink-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cream-3 sm:flex-row sm:justify-between">
          <p>© 2026 Juncal Automóviles. Montevideo, Uruguay.</p>
          <p>Precios en dólares estadounidenses. Cuotas estimadas, sujetas a aprobación bancaria.</p>
        </Container>
      </div>
    </footer>
  );
}
