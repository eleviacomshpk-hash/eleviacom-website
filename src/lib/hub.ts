/**
 * L'hub vive su un sottodominio: hub.eleviacom.space.
 *
 * Le route dell'applicazione stanno sotto /blog/... perché il progetto Next
 * è uno solo, ma il middleware riscrive il sottodominio in modo che al
 * visitatore arrivino percorsi puliti:
 *
 *   hub.eleviacom.space/                 →  /blog
 *   hub.eleviacom.space/articoli         →  /blog/articoli
 *   hub.eleviacom.space/articoli/<slug>  →  /blog/articoli/<slug>
 *   hub.eleviacom.space/guide/<slug>     →  /blog/guide/<slug>
 *   hub.eleviacom.space/tool/<slug>      →  /blog/tool/<slug>
 *
 * Quindi nei componenti si scrivono SEMPRE i percorsi pubblici, senza /blog.
 * In sviluppo si apre hub.localhost:3000, che risolve su 127.0.0.1.
 */

export const HUB_URL = "https://hub.eleviacom.space";
export const SITO_URL = "https://www.eleviacom.space";

export const VIA = {
  home: "/",
  articoli: "/articoli",
  articolo: (slug: string) => `/articoli/${slug}`,
  guide: "/guide",
  guida: (slug: string) => `/guide/${slug}`,
  tool: "/tool",
  scheda: (slug: string) => `/tool/${slug}`,
  rss: "/rss.xml",
} as const;

export function assoluto(percorso: string): string {
  return `${HUB_URL}${percorso === "/" ? "" : percorso}`;
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
