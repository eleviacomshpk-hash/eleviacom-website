import { getSiteConfig } from "@/lib/blog";
import { HUB_URL } from "@/lib/hub";

export const revalidate = 3600;

/**
 * robots.txt del sottodominio. Usa la stessa lista di crawler del sito
 * principale (site_config.ai_crawlers su Supabase): gli assistenti AI
 * sono ammessi di proposito, l'hub è fatto per essere citato.
 */
export async function GET() {
  const cfg = await getSiteConfig<{ allow: string[] }>("ai_crawlers");
  const bot = cfg?.allow ?? [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ];

  const blocchi = ["User-Agent: *\nAllow: /", ...bot.map((ua) => `User-Agent: ${ua}\nAllow: /`)];

  const testo = `${blocchi.join("\n\n")}

Host: ${HUB_URL}
Sitemap: ${HUB_URL}/sitemap.xml
`;
  return new Response(testo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
