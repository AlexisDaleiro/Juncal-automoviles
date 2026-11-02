import { CONTACT, SITE } from "@/lib/constants";
import { vehicleTitle } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

const abs = (path: string) => new URL(path, SITE.url).toString();

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "AutoDealer"],
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    telephone: CONTACT.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address,
      addressLocality: "Montevideo",
      addressCountry: "UY",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
    sameAs: Object.values(CONTACT.social),
  };
}

export function vehicleLd(v: Vehicle) {
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: `${vehicleTitle(v)} ${v.year}`,
    brand: { "@type": "Brand", name: v.brand },
    model: v.model,
    vehicleModelDate: String(v.year),
    bodyType: v.bodyType,
    fuelType: v.fuel,
    vehicleTransmission: v.transmission,
    color: v.color,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: v.km, unitCode: "KMT" },
    itemCondition: v.km === 0 ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    image: v.images.map((i) => abs(i.src)),
    url: abs(`/vehiculos/${v.slug}`),
    offers: {
      "@type": "Offer",
      price: v.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: abs(`/vehiculos/${v.slug}`),
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
}

export function itemListLd(list: Vehicle[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vehículos en venta",
    numberOfItems: list.length,
    itemListElement: list.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/vehiculos/${v.slug}`),
      name: `${vehicleTitle(v)} ${v.year}`,
    })),
  };
}
