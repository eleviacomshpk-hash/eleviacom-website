import type { Metadata } from "next";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { ElencoGuide } from "@/components/hub/elenchi";
import { Briciole, Iscrizione } from "@/components/hub/pezzi";
import { HUB_URL, SITO_URL, VIA } from "@/lib/hub";

export const metadata: Metadata = {
  title: "Guide AI operative, per mestiere — ELEVIACOM Hub",
  description:
    "Procedure passo per passo per automatizzare il lavoro con l'AI: vendite, customer service, amministrazione, e-commerce, ristorazione, officine, studi professionali.",
  alternates: { canonical: `${HUB_URL}${VIA.guide}` },
  openGraph: {
    type: "website",
    url: `${HUB_URL}${VIA.guide}`,
    siteName: "ELEVIACOM Hub",
    locale: "it_IT",
    title: "Guide AI operative, per mestiere",
    description: "Cosa serve, cosa fare, cosa si ottiene. Mestiere per mestiere.",
  },
};

export default function GuidePage() {
  const categorie = categorieGuideAttive();
  const medio = Math.round(GUIDE.reduce((s, g) => s + g.minutes, 0) / GUIDE.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Guide AI operative — ELEVIACOM Hub",
        url: `${HUB_URL}${VIA.guide}`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: GUIDE.length,
          itemListElement: GUIDE.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${HUB_URL}${VIA.guida(g.slug)}`,
            name: g.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
          { "@type": "ListItem", position: 2, name: "Guide", item: `${HUB_URL}${VIA.guide}` },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hub-apertura">
        <div className="hub-larghezza">
          <Briciole voci={[{ label: "Guide" }]} />
          <div className="hub-doppia" style={{ paddingBlock: "44px 44px" }}>
            <div>
              <h1 className="hub-titolo" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)" }}>
                Automatizza il lavoro, un passo alla volta.
              </h1>
              <p className="hub-sommario">
                I casi d&apos;uso che funzionano davvero in un&apos;impresa italiana, organizzati per
                mestiere. Ogni guida dice cosa serve prima di iniziare e a cosa si arriva.
              </p>
            </div>
            <div>
              <span className="hub-mono hub-mono-nero">Stato</span>
              <ul className="hub-indice" style={{ marginTop: 12 }}>
                <li>
                  <span>Guide</span>
                  <span className="hub-mono">{String(GUIDE.length).padStart(2, "0")}</span>
                </li>
                <li>
                  <span>Ambiti</span>
                  <span className="hub-mono">{String(categorie.length).padStart(2, "0")}</span>
                </li>
                <li>
                  <span>Tempo medio</span>
                  <span className="hub-mono">{medio} min</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-larghezza" style={{ paddingBlock: "10px 56px" }}>
        <ElencoGuide guide={GUIDE} categorie={categorie} />
      </section>

      <section className="hub-larghezza" style={{ paddingBottom: 24 }}>
        <div className="hub-doppia">
          <Iscrizione compatta />
          <div className="hub-riquadro hub-riquadro--carta">
            <span className="hub-mono hub-mono-accento">Su misura</span>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.5 }}>
              Se preferisci che il flusso venga costruito, collaudato e mantenuto da qualcuno, è quello
              che facciamo.
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
