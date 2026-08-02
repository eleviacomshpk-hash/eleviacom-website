import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { Apertura, Coda } from "@/components/hub/pezzi";
import { ElencoArticoli } from "@/components/hub/elenchi";
import { HUB_URL, VIA, dataEstesa } from "@/lib/hub";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articoli — AI, normativa e automazione per le imprese | ELEVIACOM Hub",
  description:
    "AI Act e obblighi, modelli e agenti, automazione dei processi, costi e ritorno dell'investimento. Analisi brevi per chi deve prendere una decisione.",
  alternates: { canonical: `${HUB_URL}${VIA.articoli}`, types: { "application/rss+xml": `${HUB_URL}${VIA.rss}` } },
  openGraph: {
    type: "website",
    url: `${HUB_URL}${VIA.articoli}`,
    siteName: "ELEVIACOM Hub",
    locale: "it_IT",
    title: "Articoli — ELEVIACOM Hub",
    description: "AI Act, modelli, agenti e automazione: cosa cambia per un'impresa italiana.",
  },
};

export default async function ArticoliPage() {
  const posts = await getAllPostsMeta();
  const categorie = CATEGORIE_ARTICOLI.filter((c) => posts.some((p) => p.category === c.slug)).map((c) => ({
    slug: c.slug,
    label: c.label,
    count: posts.filter((p) => p.category === c.slug).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Articoli — ELEVIACOM Hub",
        url: `${HUB_URL}${VIA.articoli}`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${HUB_URL}${VIA.articolo(p.slug)}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
          { "@type": "ListItem", position: 2, name: "Articoli", item: `${HUB_URL}${VIA.articoli}` },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Apertura
        briciole={[{ label: "Articoli" }]}
        titolo="Le notizie sull'AI che cambiano qualcosa nel tuo lavoro."
        testo="Niente rassegna stampa. Cosa è successo, perché conta per un'impresa italiana, cosa conviene fare. Con le fonti in fondo a ogni pezzo."
        dati={[
          { valore: posts.length, etichetta: "articoli" },
          { valore: categorie.length, etichetta: "categorie" },
          ...(posts[0] ? [{ valore: dataEstesa(posts[0].publishedAt), etichetta: "ultimo aggiornamento" }] : []),
        ]}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nessun articolo pubblicato.</p>
        ) : (
          <ElencoArticoli posts={posts} categorie={categorie} />
        )}
      </section>

      <Coda />
    </main>
  );
}
