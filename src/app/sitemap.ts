import type { MetadataRoute } from "next";
import { getAllPostsMeta, SITE_URL } from "@/lib/blog";
import { GUIDE } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "", priority: 1.0, freq: "weekly" as const },
    { path: "/consulenza", priority: 0.9, freq: "monthly" as const },
    { path: "/blog", priority: 0.9, freq: "daily" as const },
    { path: "/blog/articoli", priority: 0.8, freq: "daily" as const },
    { path: "/blog/guide", priority: 0.8, freq: "weekly" as const },
    { path: "/blog/tool", priority: 0.8, freq: "weekly" as const },
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
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...posts
      .filter((p) => !p.noindex)
      .map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.updatedAt || p.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...GUIDE.map((g) => ({
      url: `${SITE_URL}/blog/guide/${g.slug}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...TOOLS.map((t) => ({
      url: `${SITE_URL}/blog/tool/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
