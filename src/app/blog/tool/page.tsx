import type { Metadata } from "next";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { MARCHI } from "@/lib/marchi";
import { ElencoTool } from "@/components/hub/elenchi";
import { Briciole, Iscrizione } from "@/components/hub/pezzi";
import { HUB_URL, SITO_URL, VIA } from "@/lib/hub";

export const metadata: Metadata = {
  title: "Directory dei tool AI — prezzi reali e limiti dichiarati | ELEVIACOM Hub",
  description:
    "55 strumenti di intelligenza artificiale organizzati per funzione: assistenti, agenti, automazione, contenuti, voce, vendite. Con quanto costano davvero e dove sono i limiti.",
  alternates: { canonical: `${HUB_URL}${VIA.tool}` },
  openGraph: {
    type: "website",
    url: `${HUB_URL}${VIA.tool}`,
    siteName: "ELEVIACOM Hub",
    locale: "it_IT",
    title: "Directory dei tool AI",
    description: "Strumenti organizzati per funzione, con prezzi reali e limiti dichiarati.",
  },
};

export default function ToolPage() {
  const categorie = categorieToolAttive();
  const gratuiti = TOOLS.filter((t) => t.pricing !== "a pagamento").length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Directory dei tool AI — ELEVIACOM Hub",
        url: `${HUB_URL}${VIA.tool}`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: TOOLS.length,
          itemListElement: TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${HUB_URL}${VIA.scheda(t.slug)}`,
            name: t.name,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
          { "@type": "ListItem", position: 2, name: "Tool", item: `${HUB_URL}${VIA.tool}` },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hub-apertura">
        <div className="hub-larghezza">
          <Briciole voci={[{ label: "Tool" }]} />
          <div className="hub-doppia" style={{ paddingBlock: "44px 44px" }}>
            <div>
              <h1 className="hub-titolo" style={{ fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)" }}>
                Gli strumenti che contano, con i loro limiti scritti.
              </h1>
              <p className="hub-sommario">
                Una directory ragionata invece di un elenco di link. Per ogni strumento: cosa fa, quanto
                costa davvero, in quali casi conviene e dove smette di funzionare.
              </p>
            </div>
            <div>
              <span className="hub-mono hub-mono-nero">Stato</span>
              <ul className="hub-indice" style={{ marginTop: 12 }}>
                <li>
                  <span>Tool</span>
                  <span className="hub-mono">{TOOLS.length}</span>
                </li>
                <li>
                  <span>Categorie</span>
                  <span className="hub-mono">{categorie.length}</span>
                </li>
                <li>
                  <span>Con piano gratuito</span>
                  <span className="hub-mono">{gratuiti}</span>
                </li>
                <li>
                  <span>Marchi ufficiali</span>
                  <span className="hub-mono">{Object.keys(MARCHI).length}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="hub-larghezza" style={{ paddingBlock: "10px 56px" }}>
        <ElencoTool tools={TOOLS} categorie={categorie} alfabetico />
        <p className="hub-mono" style={{ marginTop: 22, textTransform: "none", letterSpacing: 0, maxWidth: "64ch" }}>
          Le schede sono redatte a mano. Prezzi e funzioni cambiano spesso: verifica sempre sul sito
          ufficiale prima di sottoscrivere.
        </p>
      </section>

      <section className="hub-larghezza" style={{ paddingBottom: 24 }}>
        <div className="hub-doppia">
          <Iscrizione compatta />
          <div className="hub-riquadro hub-riquadro--carta">
            <span className="hub-mono hub-mono-accento">Quale scegliere</span>
            <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.5 }}>
              La domanda giusta non è quale strumento è il migliore, ma quale problema stai risolvendo.
              La prima valutazione è gratuita.
            </p>
            <a href={`${SITO_URL}/consulenza`} className="hub-bottone" style={{ marginTop: 18 }}>
              Parlane con noi
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
