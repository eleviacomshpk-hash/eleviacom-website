/**
 * Tassonomia unica del blog.
 * Le tre famiglie di categorie sono separate perché rispondono a domande diverse:
 * gli articoli si filtrano per argomento, le guide per mestiere, i tool per funzione.
 */

export type Categoria = {
  slug: string;
  label: string;
  /** Descrizione usata nelle pagine di categoria e nei metadati. */
  descrizione?: string;
};

/* ── Articoli: le schede in cima alla sezione "Ultimi articoli" ───────── */

export const CATEGORIE_ARTICOLI: Categoria[] = [
  { slug: "ai", label: "AI", descrizione: "Modelli, agenti e cosa cambia davvero quando escono." },
  { slug: "normativa", label: "Normativa", descrizione: "AI Act, GDPR e gli obblighi che toccano le imprese italiane." },
  { slug: "automazione", label: "Automazione", descrizione: "Processi, flussi e integrazioni che tolgono lavoro manuale." },
  { slug: "business", label: "Business", descrizione: "Costi, ritorno dell'investimento e scelte di adozione." },
];

/* ── Guide: organizzate per mestiere, come su rundown.ai ──────────────── */

export const CATEGORIE_GUIDE: Categoria[] = [
  { slug: "generale", label: "Generale" },
  { slug: "vendite", label: "Vendite" },
  { slug: "marketing", label: "Marketing" },
  { slug: "customer-service", label: "Customer service" },
  { slug: "amministrazione", label: "Amministrazione" },
  { slug: "operations", label: "Operations" },
  { slug: "ecommerce", label: "E-commerce" },
  { slug: "ristorazione", label: "Ristorazione" },
  { slug: "artigianato", label: "Artigianato" },
  { slug: "studi-professionali", label: "Studi professionali" },
  { slug: "officine", label: "Officine e assistenza" },
  { slug: "contenuti", label: "Contenuti" },
  { slug: "sviluppo", label: "Sviluppo" },
  { slug: "dati", label: "Analisi dati" },
  { slug: "hr", label: "Risorse umane" },
  { slug: "legale", label: "Legale" },
  { slug: "formazione", label: "Formazione" },
];

/* ── Tool: organizzati per funzione ───────────────────────────────────── */

export const CATEGORIE_TOOL: Categoria[] = [
  { slug: "assistenti", label: "Assistenti" },
  { slug: "agenti", label: "Agenti AI" },
  { slug: "automazione", label: "Automazione" },
  { slug: "sviluppo", label: "Sviluppo" },
  { slug: "no-code", label: "No-code" },
  { slug: "contenuti", label: "Contenuti" },
  { slug: "immagini", label: "Immagini" },
  { slug: "video", label: "Video" },
  { slug: "voce", label: "Voce e audio" },
  { slug: "design", label: "Design" },
  { slug: "marketing", label: "Marketing" },
  { slug: "vendite", label: "Vendite" },
  { slug: "customer-service", label: "Customer service" },
  { slug: "produttivita", label: "Produttività" },
  { slug: "dati", label: "Analisi dati" },
  { slug: "ricerca", label: "Ricerca" },
  { slug: "operations", label: "Operations" },
  { slug: "formazione", label: "Formazione" },
];

export function etichetta(elenco: Categoria[], slug: string): string {
  return elenco.find((c) => c.slug === slug)?.label ?? slug;
}
