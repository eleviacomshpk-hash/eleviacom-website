import { getAllPostsMeta } from "@/lib/blog";
import { HUB_URL, VIA } from "@/lib/hub";

export const revalidate = 300;

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getAllPostsMeta();
  const items = posts.map((p) => {
    const url = `${HUB_URL}${VIA.articolo(p.slug)}`;
    return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ELEVIACOM Hub</title>
    <link>${HUB_URL}</link>
    <description>News, guide e tool di intelligenza artificiale per le imprese italiane</description>
    <language>it-IT</language>
    <atom:link href="${HUB_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
