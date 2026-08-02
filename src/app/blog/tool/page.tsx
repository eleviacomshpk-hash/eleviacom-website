import type { Metadata } from "next";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { Apertura, Coda } from "@/components/hub/pezzi";
import { ElencoTool } from "@/components/hub/elenchi";
import { HUB_URL, VIA } from "@/lib/hub";

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

      <Apertura
        briciole={[{ label: "Tool" }]}
        titolo="Gli strumenti che contano, con i loro limiti scritti."
        testo="Una directory ragionata invece di un elenco di link. Per ogni strumento: cosa fa, quanto costa davvero, in quali casi conviene e dove smette di funzionare."
        dati={[
          { valore: TOOLS.length, etichetta: "tool schedati" },
          { valore: categorie.length, etichetta: "categorie" },
          { valore: gratuiti, etichetta: "con piano gratuito" },
        ]}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <ElencoTool tools={TOOLS} categorie={categorie} alfabetico />
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
          Le schede sono redatte da ELEVIACOM e non hanno rapporti commerciali con i fornitori citati. Prezzi e funzioni
          cambiano spesso: verifica sempre sul sito ufficiale prima di sottoscrivere.
        </p>
      </section>

      <Coda
        consulenza={{
          titolo: "La domanda giusta non è quale strumento è il migliore.",
          testo: "È quale problema stai risolvendo. Se vuoi ragionarci insieme, la prima valutazione è gratuita.",
        }}
      />
    </main>
  );
}
