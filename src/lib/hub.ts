/**
 * L'hub è pensato per vivere su hub.eleviacom.space, ma il sottodominio
 * si accende solo quando il record DNS e il dominio su Vercel esistono.
 * Fino ad allora resta servito da www.eleviacom.space/blog, con gli stessi
 * contenuti e gli stessi indirizzi interni.
 *
 * L'interruttore è la variabile d'ambiente NEXT_PUBLIC_HUB_ATTIVO:
 *
 *   non impostata  →  hub su www.eleviacom.space/blog       (stato attuale)
 *   = "1"          →  hub su hub.eleviacom.space, e i vecchi
 *                     indirizzi /blog/... rispondono 301
 *
 * Le route dell'applicazione stanno sempre sotto /blog. Quando il
 * sottodominio è attivo il middleware riscrive gli indirizzi puliti:
 *
 *   hub.eleviacom.space/guide/<slug>  →  /blog/guide/<slug>
 *
 * In sviluppo con l'interruttore acceso si apre hub.localhost:3000.
 */

export const HUB_ATTIVO = process.env.NEXT_PUBLIC_HUB_ATTIVO === "1";

export const SITO_URL = "https://www.eleviacom.space";
export const HUB_URL = HUB_ATTIVO ? "https://hub.eleviacom.space" : SITO_URL;

/** Prefisso degli indirizzi pubblici: vuoto sul sottodominio, /blog sul sito. */
export const PREFISSO = HUB_ATTIVO ? "" : "/blog";

export const VIA = {
  home: PREFISSO || "/",
  articoli: `${PREFISSO}/articoli`,
  articolo: (slug: string) => `${PREFISSO}/articoli/${slug}`,
  guide: `${PREFISSO}/guide`,
  guida: (slug: string) => `${PREFISSO}/guide/${slug}`,
  tool: `${PREFISSO}/tool`,
  scheda: (slug: string) => `${PREFISSO}/tool/${slug}`,
  rss: `${PREFISSO}/rss.xml`,
} as const;

/** Indirizzo assoluto di un percorso pubblico. */
export function assoluto(via: string): string {
  return `${HUB_URL}${via === "/" ? "" : via}`;
}

/**
 * Percorso interno corrispondente a un indirizzo pubblico.
 * Serve solo a capire quale voce di menu è attiva.
 */
export function interno(via: string): string {
  if (!HUB_ATTIVO) return via;
  return via === "/" ? "/blog" : `/blog${via}`;
}

const MESI = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];

export function dataEstesa(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getDate()} ${MESI[d.getMonth()]} ${d.getFullYear()}`;
}

export function dataBreve(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getFullYear()
  ).slice(2)}`;
}
