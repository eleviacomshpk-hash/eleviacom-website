import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/blog";

export const revalidate = 3600;

/**
 * Sitemap del sito principale. L'hub sta su hub.eleviacom.space e ha
 * la sua sitemap (src/app/hub-sitemap.xml), servita dal middleware.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pagine = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/consulenza", priority: 0.9, freq: "monthly" as const },
    { path: "/chi-siamo", priority: 0.7, freq: "monthly" as const },
    { path: "/contatti", priority: 0.7, freq: "monthly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/cookie", priority: 0.3, freq: "yearly" as const },
    { path: "/termini", priority: 0.3, freq: "yearly" as const },
  ];
  const ora = new Date();
  return pagine.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: ora,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
