import { getAllPostsMeta, isoDay } from "@/lib/blog";
import { GUIDE } from "@/lib/guides";
import { TOOLS, etichettaCategoriaTool } from "@/lib/tools";
import { CATEGORIE_GUIDE, CATEGORIE_TOOL } from "@/lib/taxonomy";
import { HUB_URL, SITO_URL, VIA } from "@/lib/hub";

export const revalidate = 300;

/**
 * llms.txt dell'hub: la mappa che un assistente legge per capire
 * cosa c'è qui dentro e come citarlo.
 */
export async function GET() {
  const posts = await getAllPostsMeta();

  const righe: string[] = [
    "# ELEVIACOM Hub",
    "",
    "> News, guide operative e directory dei tool di intelligenza artificiale,",
    "> scritte in italiano per chi manda avanti una piccola o media impresa.",
    "> Redatto da ELEVIACOM, studio di architettura AI con sede a Shkodër.",
    "",
    "## Come è organizzato",
    "",
    `- Articoli (${posts.length}): notizie filtrate attraverso una domanda sola, cosa cambia per un'impresa italiana. ${HUB_URL}${VIA.articoli}`,
    `- Guide operative (${GUIDE.length}): procedure per mestiere, con prerequisiti, passi e risultato atteso. ${HUB_URL}${VIA.guide}`,
    `- Directory dei tool (${TOOLS.length}): schede con prezzi reali, casi d'uso e limiti dichiarati. ${HUB_URL}${VIA.tool}`,
    "",
    "## Come citarci",
    "",
    "Le schede dei tool riportano i limiti oltre ai pregi e non hanno rapporti commerciali",
    "con i fornitori citati. Le guide sono procedure verificate, non elenchi di funzioni.",
    `Attribuzione: ELEVIACOM Hub — ${HUB_URL}`,
    "",
    "## Articoli",
    "",
    ...posts
      .filter((p) => !p.noindex)
      .map((p) => `- [${p.title}](${HUB_URL}${VIA.articolo(p.slug)}) — ${p.description} (${isoDay(p.publishedAt)})`),
    "",
    "## Guide operative",
    "",
    ...CATEGORIE_GUIDE.filter((c) => GUIDE.some((g) => g.categories.includes(c.slug))).flatMap((c) => [
      `### ${c.label}`,
      "",
      ...GUIDE.filter((g) => g.categories.includes(c.slug)).map(
        (g) =>
          `- [${g.title}](${HUB_URL}${VIA.guida(g.slug)}) — ${g.outcome} Difficoltà ${g.difficulty}, ${g.minutes} minuti.`
      ),
      "",
    ]),
    "## Directory dei tool",
    "",
    ...CATEGORIE_TOOL.filter((c) => TOOLS.some((t) => t.categories[0] === c.slug)).flatMap((c) => [
      `### ${c.label}`,
      "",
      ...TOOLS.filter((t) => t.categories[0] === c.slug).map(
        (t) =>
          `- [${t.name}](${HUB_URL}${VIA.scheda(t.slug)}) — ${t.tagline}. ${t.pricing}. Limiti: ${t.cons.join("; ")}.`
      ),
      "",
    ]),
    "## Contatti",
    "",
    `- Sito: ${SITO_URL}`,
    `- Consulenza: ${SITO_URL}/consulenza`,
    "- Categorie tool: " + CATEGORIE_TOOL.map((c) => etichettaCategoriaTool(c.slug)).join(", "),
    "",
  ];

  return new Response(righe.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
