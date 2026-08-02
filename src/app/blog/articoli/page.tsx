import type { Metadata } from "next";
import { getAllPostsMeta } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { ElencoArticoli } from "@/components/hub/elenchi";
import { Briciole, Iscrizione } from "@/components/hub/pezzi";
import { HUB_URL, SITO_URL, VIA, dataEstesa } from "@/lib/hub";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articoli — AI, normativa e automazione per le imprese | ELEVIACOM Hub",
  description:
    "AI Act e obblighi, modelli e agenti, automazione dei processi, costi e ritorno dell'investimento. Analisi brevi per chi deve prendere una decisione.",
  alternates: { canonical: `${HUB_URL}${VIA.articoli}`, types: { "application/rss+xml": `${HUB_URL}/rss.xml` } },
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

      <section className="hub-apertura">
        <div className="hub-larghezza">
          <Briciole voci={[{ label: "Articoli" }]} />
          <div className="hub-doppia" style={{ paddingBlock: "44px 44px" }}>
            <div>
              <h1 className="hub-titolo" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)" }}>
                Le notizie sull&apos;AI che cambiano qualcosa nel tuo lavoro.
              </h1>
              <p className="hub-sommario">
                Niente rassegna stampa. Cosa è successo, perché conta per un&apos;impresa italiana, cosa
                conviene fare. Con le fonti in fondo a ogni pezzo.
              </p>
            </div>
            <div>
              <span className="hub-mono hub-mono-nero">Stato</span>
              <ul className="hub-indice" style={{ marginTop: 12 }}>
                <li>
                  <span>Articoli</span>
                  <span className="hub-mono">{String(posts.length).padStart(2, "0")}</span>
                </li>
                <li>
                  <span>Categorie</span>
                  <span className="hub-mono">{String(categorie.length).padStart(2, "0")}</span>
                </li>
                {posts[0] && (
                  <li>
                    <span>Ultimo</span>
                    <span className="hub-mono" style={{ textTransform: "none", letterSpacing: 0 }}>
                      {dataEstesa(posts[0].publishedAt)}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-larghezza" style={{ paddingBlock: "10px 56px" }}>
        {posts.length === 0 ? (
          <p className="hub-mono" style={{ paddingBlock: 40 }}>
            Nessun articolo pubblicato.
          </p>
        ) : (
          <ElencoArticoli posts={posts} categorie={categorie} conLead />
        )}
      </section>

      <section className="hub-larghezza" style={{ paddingBottom: 24 }}>
        <div className="hub-doppia">
          <Iscrizione compatta />
          <div className="hub-riquadro hub-riquadro--carta">
            <span className="hub-mono hub-mono-accento">ELEVIACOM</span>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.5 }}>
              Progettiamo chatbot, automazioni e agenti AI su misura per PMI italiane.
            </p>
            <a href={`${SITO_URL}/consulenza`} className="hub-bottone" style={{ marginTop: 18 }}>
              Consulenza
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
