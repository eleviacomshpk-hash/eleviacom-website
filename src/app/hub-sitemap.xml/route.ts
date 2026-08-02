import { getAllPostsMeta } from "@/lib/blog";
import { GUIDE } from "@/lib/guides";
import { TOOLS } from "@/lib/tools";
import { HUB_URL, VIA } from "@/lib/hub";

export const revalidate = 300;

/** Sitemap del solo sottodominio hub.eleviacom.space. */
export async function GET() {
  const posts = await getAllPostsMeta();
  const oggi = new Date().toISOString().slice(0, 10);

  const voci: { loc: string; mod: string; freq: string; pri: string }[] = [
    { loc: "/", mod: oggi, freq: "daily", pri: "1.0" },
    { loc: VIA.articoli, mod: oggi, freq: "daily", pri: "0.9" },
    { loc: VIA.guide, mod: oggi, freq: "weekly", pri: "0.9" },
    { loc: VIA.tool, mod: oggi, freq: "weekly", pri: "0.9" },
    ...posts
      .filter((p) => !p.noindex)
      .map((p) => ({
        loc: VIA.articolo(p.slug),
        mod: (p.updatedAt || p.publishedAt).slice(0, 10),
        freq: "monthly",
        pri: "0.8",
      })),
    ...GUIDE.map((g) => ({ loc: VIA.guida(g.slug), mod: g.publishedAt, freq: "monthly", pri: "0.75" })),
    ...TOOLS.map((t) => ({ loc: VIA.scheda(t.slug), mod: oggi, freq: "monthly", pri: "0.6" })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${voci
  .map(
    (v) => `  <url>
    <loc>${HUB_URL}${v.loc === "/" ? "" : v.loc}</loc>
    <lastmod>${v.mod}</lastmod>
    <changefreq>${v.freq}</changefreq>
    <priority>${v.pri}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
