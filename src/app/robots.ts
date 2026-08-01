import type { MetadataRoute } from "next";
import { getSiteConfig, SITE_URL } from "@/lib/blog";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const cfg = await getSiteConfig<{ allow: string[] }>("ai_crawlers");
  const aiBots = cfg?.allow ?? [];
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
