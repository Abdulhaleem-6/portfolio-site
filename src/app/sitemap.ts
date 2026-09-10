import type { MetadataRoute } from "next";
import { cases, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/about`, priority: 0.7 },
    ...cases.map((c) => ({ url: `${site.url}/work/${c.slug}`, priority: 0.9 })),
  ];
}
