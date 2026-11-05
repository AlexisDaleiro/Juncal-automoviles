import { MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { OpenStatus, WeekHours } from "@/components/home/open-status";
import { StreetMap } from "@/components/home/street-map";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { CONTACT } from "@/lib/constants";
import { whatsappLink } from "@/lib/utils";

/** The home opens on the place: is it open, where is it, how do I get there. */
export function HomeHero() {
  return (
    <section aria-labelledby="titulo-home" className="on-dark bg-ink text-cream">
      <Container className="grid items-center gap-10 pb-10 pt-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-14 lg:pt-16">
        <div className="fade-up">
          <h1 id="titulo-home" className="display text-5xl sm:text-6xl lg:text-[5rem]">
            Pasá a verlos.
          </h1>
          <div className="mt-6">
            <OpenStatus />
          </div>
          <p className="mt-6 text-lg text-cream-2">
            <span className="font-medium text-cream">{CONTACT.address}</span>
            <br />
            {CONTACT.city}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "lg", className: "bg-cream text-ink hover:bg-white" })}
            >
              <MapPin size={18} aria-hidden />
              Cómo llegar
            </a>
            <a
              href={whatsappLink("Hola Juncal, quiero ir a ver autos. ¿Los puedo pasar a ver hoy?")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "wa", size: "lg" })}
            >
              <WhatsAppIcon size={20} />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
        <StreetMap />
      </Container>
      <Container className="pb-12 sm:pb-14">
        <WeekHours />
      </Container>
    </section>
  );
}
