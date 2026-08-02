import { HUB_URL } from "@/lib/hub";

export const revalidate = 3600;

/** robots.txt del sottodominio: gli assistenti sono ammessi di proposito. */
export function GET() {
  const testo = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${HUB_URL}/sitemap.xml
`;
  return new Response(testo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
