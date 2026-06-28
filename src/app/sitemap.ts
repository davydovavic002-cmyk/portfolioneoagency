import type { MetadataRoute } from "next";
import { SERVICE_PAGE_SLUGS } from "@/lib/seo/service-pages";

const SITE_URL = "https://neostudio.space";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...SERVICE_PAGE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
