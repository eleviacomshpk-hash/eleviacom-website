import type { MetadataRoute } from "next";
import { getAllPostsMeta, SITE_URL } from "@/lib/blog";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/consulenza", priority: 0.9, freq: "monthly" as const },
    { path: "/blog", priority: 0.9, freq: "daily" as const },
    { path: "/chi-siamo", priority: 0.7, freq: "monthly" as const },
    { path: "/contatti", priority: 0.7, freq: "monthly" as const },
    { path: "/privacy", priority: 0.3, freq: "yearly" as const },
    { path: "/cookie", priority: 0.3, freq: "yearly" as const },
    { path: "/termini", priority: 0.3, freq: "yearly" as const },
  ];
  const now = new Date();
  const posts = await getAllPostsMeta();
  return [
    ...staticPages.map((p) => ({
      url: `${SITE_URL}${p.path}`, lastModified: now,
      changeFrequency: p.freq, priority: p.priority,
    })),
    ...posts.filter((p) => !p.noindex).map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.publishedAt),
      changeFrequency: "monthly" as const, priority: 0.8,
    })),
  ];
}
