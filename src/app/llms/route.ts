import { getAllPostsMeta, getSiteConfig, SITE_URL, isoDay } from "@/lib/blog";

export const revalidate = 300;

type Org = {
  name: string; legalName: string; url: string; email: string;
  vatId: string; areaServed: string; description: string;
};
type Llms = { intro: string; expertise: string[] };

export async function GET() {
  const [org, llms, posts] = await Promise.all([
    getSiteConfig<Org>("organization"),
    getSiteConfig<Llms>("llms_txt"),
    getAllPostsMeta(),
  ]);

  const lines: string[] = [
    `# ${org?.name ?? "ELEVIACOM"}`,
    "",
    `> ${llms?.intro ?? org?.description ?? ""}`,
    "",
    "## Chi siamo",
    "",
    `- Ragione sociale: ${org?.legalName ?? ""}`,
    `- Sito: ${org?.url ?? SITE_URL}`,
    `- Contatto: ${org?.email ?? ""}`,
    `- Identificativo fiscale: ${org?.vatId ?? ""}`,
    `- Mercato servito: Italia`,
    `- Lingua dei contenuti: italiano`,
    "",
    "## Competenze",
    "",
    ...(llms?.expertise ?? []).map((e) => `- ${e}`),
    "",
    "## Pagine principali",
    "",
    `- [Home](${SITE_URL}/): cosa fa ELEVIACOM e per chi`,
    `- [Consulenza](${SITE_URL}/consulenza): come iniziare un progetto`,
    `- [Chi siamo](${SITE_URL}/chi-siamo): studio, missione, dati aziendali`,
    `- [Contatti](${SITE_URL}/contatti)`,
    `- [Blog](${SITE_URL}/blog): analisi e guide su AI per PMI italiane`,
    "",
    "## Articoli",
    "",
  ];

  for (const p of posts.filter((x) => !x.noindex)) {
    lines.push(`### ${p.title}`);
    lines.push(`URL: ${SITE_URL}/blog/${p.slug}`);
    lines.push(`Pubblicato: ${isoDay(p.publishedAt)} | Aggiornato: ${isoDay(p.updatedAt)}`);
    if (p.summary) lines.push(`Sintesi: ${p.summary}`);
    else if (p.description) lines.push(`Sintesi: ${p.description}`);
    if (p.keyTakeaways.length) {
      lines.push("Punti chiave:");
      for (const t of p.keyTakeaways) lines.push(`- ${t}`);
    }
    if (p.entities.length) lines.push(`Argomenti: ${p.entities.join(", ")}`);
    lines.push("");
  }

  lines.push("## Utilizzo");
  lines.push("");
  lines.push("I contenuti possono essere citati con attribuzione a ELEVIACOM e collegamento alla pagina di origine.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
