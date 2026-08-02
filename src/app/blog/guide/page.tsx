import type { Metadata } from "next";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { Apertura, Coda } from "@/components/hub/pezzi";
import { ElencoGuide } from "@/components/hub/elenchi";
import { HUB_URL, VIA } from "@/lib/hub";

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

      <Apertura
        briciole={[{ label: "Guide" }]}
        titolo="Automatizza il lavoro, un passo alla volta."
        testo="I casi d'uso che funzionano davvero in un'impresa italiana, organizzati per mestiere. Ogni guida dice cosa serve prima di iniziare e a cosa si arriva."
        dati={[
          { valore: GUIDE.length, etichetta: "guide" },
          { valore: categorie.length, etichetta: "ambiti" },
          { valore: `${medio} min`, etichetta: "tempo medio" },
        ]}
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <ElencoGuide guide={GUIDE} categorie={categorie} />
      </section>

      <Coda
        consulenza={{
          titolo: "Preferisci che il flusso lo costruisca qualcun altro?",
          testo:
            "Progettiamo, colladiamo e manteniamo automazioni e agenti AI per PMI italiane. La prima valutazione è gratuita.",
        }}
      />
    </main>
  );
}
