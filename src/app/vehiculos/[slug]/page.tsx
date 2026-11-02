import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { JsonLd } from "@/components/shared/json-ld";
import { QuotaButton } from "@/components/shared/finance-provider";
import { DetailGallery } from "@/components/vehicles/detail-gallery";
import { vehicleBySlug, vehicles } from "@/data/vehicles";
import { vehicleLd } from "@/lib/seo";
import { formatKm, formatNumber, formatPrice, vehicleMessage, vehicleTitle, whatsappLink } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = vehicleBySlug(slug);
  if (!v) return {};
  const title = `${vehicleTitle(v)} ${v.year}`;
  return {
    title,
    description: `${title}, ${formatKm(v.km)}, ${v.fuel}, ${v.transmission}. ${formatPrice(v.price)}. Financiación y gestoría propia en Juncal Automóviles, Montevideo.`,
    alternates: { canonical: `/vehiculos/${v.slug}` },
    openGraph: { title, images: [{ url: v.images[0].src, width: 1200, height: 900, alt: v.images[0].alt }] },
  };
}

export default async function VehicleDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = vehicleBySlug(slug);
  if (!v) notFound();

  const specs: [string, string][] = [
    ["Año", String(v.year)],
    ["Kilómetros", formatKm(v.km)],
    ["Combustible", v.fuel],
    ["Transmisión", v.transmission],
    ["Motor", v.engine],
    ["Carrocería", v.bodyType],
    ["Color", v.color],
    ["Estado", v.condition === "0 km" ? "0 km" : "Usado seleccionado"],
  ];

  return (
    <Container className="pb-8 pt-6">
      <Link href="/vehiculos" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-text-2 transition-colors hover:text-ink">
        <ChevronLeft size={18} aria-hidden />
        Volver al catálogo
      </Link>

      <div className="mt-2 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
        <DetailGallery images={v.images} />

        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <h1 className="text-3xl leading-tight">
            <span className="display">{v.brand}</span> <span className="font-normal text-text-2">{v.model} {v.trim}</span>
          </h1>
          <p className="mt-6 num text-5xl font-semibold leading-none">
            <span className="mr-2 text-lg font-medium text-text-3">US$</span>
            {formatNumber(v.price)}
          </p>
          <QuotaButton vehicle={v} className="mt-3" />

          <a
            href={whatsappLink(vehicleMessage(v))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary", size: "lg", className: "mt-8 w-full" })}
          >
            <WhatsAppIcon size={20} />
            Consultar por WhatsApp
          </a>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {specs.map(([k, val]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="text-text-2">{k}</dt>
                <dd className="num text-right font-medium text-ink">{val}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-text-2">
            Revisión mecánica, garantía y gestoría propia incluidas. Ficha de demostración: los datos se completan con la
            información real de cada unidad.
          </p>
        </div>
      </div>
      <JsonLd data={vehicleLd(v)} />
    </Container>
  );
}
