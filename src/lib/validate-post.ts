/** Regole SEO e GEO applicate in scrittura. */
export type PostInput = {
  slug?: string;
  meta_title?: string;
  title?: string;
  description?: string;
  body?: string;
  summary?: string;
  key_takeaways?: string[];
  faq?: { question: string; answer: string }[];
  sources?: { title: string; url: string }[];
  keywords?: string[];
  tags?: string[];
  entities?: string[];
  cover?: string;
  cover_alt?: string;
  status?: string;
};

export type Issue = { campo: string; livello: "errore" | "avviso"; messaggio: string };

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePost(p: PostInput, opts: { publishing: boolean }): Issue[] {
  const out: Issue[] = [];
  const err = (campo: string, messaggio: string) => out.push({ campo, livello: "errore", messaggio });
  const warn = (campo: string, messaggio: string) => out.push({ campo, livello: "avviso", messaggio });

  if (!p.slug || !SLUG_RE.test(p.slug))
    err("slug", "Slug mancante o non valido: solo minuscole, cifre e trattini.");
  else if (p.slug.length > 70) warn("slug", "Slug oltre 70 caratteri: accorcialo.");

  if (!p.title) err("title", "Titolo obbligatorio.");
  const titoloSerp = p.meta_title ?? p.title;
  if (titoloSerp && titoloSerp.length > 65)
    warn("title", `Titolo SERP di ${titoloSerp.length} caratteri: oltre 65 Google lo tronca. Usa meta_title per accorciarlo.`);

  if (!p.description) err("description", "Meta description obbligatoria.");
  else if (p.description.length < 110 || p.description.length > 165)
    warn("description", `Description di ${p.description.length} caratteri: l intervallo utile è 110-165.`);

  const words = (p.body ?? "").trim().split(/\s+/).filter(Boolean).length;
  if (!p.body) err("body", "Corpo dell articolo obbligatorio.");
  else if (words < 600) warn("body", `Solo ${words} parole: sotto le 600 è difficile posizionarsi.`);

  // GEO: struttura estraibile dai motori generativi
  const h2 = (p.body ?? "").match(/^## .+$/gm) ?? [];
  if (h2.length < 3) warn("body", `Solo ${h2.length} sezioni H2: servono almeno 3 per l indice e per l estrazione.`);
  const domande = h2.filter((h) => h.trim().endsWith("?")).length;
  if (h2.length > 0 && domande / h2.length < 0.4)
    warn("body", "Meno del 40% degli H2 è formulato come domanda: peggiora la citabilità dagli assistenti AI.");

  if (!p.summary) warn("summary", "Sintesi assente: è il testo che i motori generativi estraggono più spesso.");
  if (!p.key_takeaways?.length) warn("key_takeaways", "Punti chiave assenti.");
  else if (p.key_takeaways.length < 3) warn("key_takeaways", "Meno di 3 punti chiave.");

  if (!p.faq?.length) warn("faq", "Nessuna FAQ: si perde lo schema FAQPage.");
  else if (p.faq.length < 3) warn("faq", "Meno di 3 FAQ.");

  if (!p.entities?.length) warn("entities", "Nessuna entità dichiarata: peggiora il collegamento semantico.");
  if (!p.cover) warn("cover", "Immagine di copertina assente.");
  if (p.cover && !p.cover_alt) err("cover_alt", "Testo alternativo obbligatorio quando c è una copertina.");
  if (p.body && !p.body.includes("![")) warn("body", "Nessuna immagine nel corpo dell articolo.");

  if (opts.publishing) {
    const bloccanti = out.filter((i) => i.livello === "errore");
    if (!p.sources?.length) warn("sources", "Nessuna fonte citata.");
    if (bloccanti.length === 0 && !p.summary)
      out.push({ campo: "summary", livello: "errore", messaggio: "La sintesi è obbligatoria per pubblicare." });
  }
  return out;
}
