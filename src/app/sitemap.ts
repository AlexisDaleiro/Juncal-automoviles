import type { MetadataRoute } from "next";
import { vehicles } from "@/data/vehicles";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/vehiculos`, changeFrequency: "daily", priority: 1 },
    ...vehicles.map((v) => ({
      url: `${SITE.url}/vehiculos/${v.slug}`,
      lastModified: v.publishedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
