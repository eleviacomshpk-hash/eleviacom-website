import type { MetadataRoute } from "next";
import { getAllPostsMeta, SITE_URL } from "@/lib/blog";
import { GUIDE } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";
import { HUB_ATTIVO, VIA } from "@/lib/hub";

export const revalidate = 3600;

/**
 * Sitemap del sito principale. Quando l'hub passa sul sottodominio ha la
 * sua sitemap (src/app/hub-sitemap.xml) e qui restano solo le pagine del
 * sito; finché è servito da /blog, invece, va dichiarato anche lui.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
  const statiche = pagine.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: ora,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  // Finché l'hub non ha il suo sottodominio, vive qui: va dichiarato.
  if (HUB_ATTIVO) return statiche;

  const posts = await getAllPostsMeta();
  return [
    ...statiche,
    ...[VIA.home, VIA.articoli, VIA.guide, VIA.tool].map((via) => ({
      url: `${SITE_URL}${via}`,
      lastModified: ora,
      changeFrequency: "daily" as const,
      priority: 0.9,
    })),
    ...posts.filter((p) => !p.noindex).map((p) => ({
      url: `${SITE_URL}${VIA.articolo(p.slug)}`,
      lastModified: new Date(p.updatedAt || p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...GUIDE.map((g) => ({
      url: `${SITE_URL}${VIA.guida(g.slug)}`,
      lastModified: new Date(g.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...TOOLS.map((t) => ({
      url: `${SITE_URL}${VIA.scheda(t.slug)}`,
      lastModified: ora,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
