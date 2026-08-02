import type { Metadata } from "next";
import { getAllPostsMeta, isoDay } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { Button } from "@/components/ui/button";
import { Apertura, Coda } from "@/components/hub/pezzi";
import { Sezione } from "@/components/hub/schede";
import { ElencoArticoli, ElencoGuide, ElencoTool } from "@/components/hub/elenchi";
import { HUB_URL, SITO_URL, VIA } from "@/lib/hub";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ELEVIACOM Hub — AI per le imprese italiane: news, guide, tool",
  description:
    "Le notizie sull'intelligenza artificiale che contano per un'impresa, le guide operative per applicarla e una directory di 55 strumenti con prezzi reali e limiti dichiarati.",
  alternates: { canonical: HUB_URL, types: { "application/rss+xml": `${HUB_URL}${VIA.rss}` } },
  openGraph: {
    type: "website",
    url: HUB_URL,
    siteName: "ELEVIACOM Hub",
    locale: "it_IT",
    title: "ELEVIACOM Hub — AI per le imprese italiane",
    description: "News, guide operative e directory dei tool. In italiano, per chi deve decidere.",
  },
};

export default async function HubHome() {
  const posts = await getAllPostsMeta();

  const categorieArticoli = CATEGORIE_ARTICOLI.filter((c) => posts.some((p) => p.category === c.slug)).map((c) => ({
    slug: c.slug,
    label: c.label,
    count: posts.filter((p) => p.category === c.slug).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "ELEVIACOM Hub",
        url: HUB_URL,
        inLanguage: "it-IT",
        publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITO_URL },
      },
      {
        "@type": "Blog",
        name: "ELEVIACOM Hub",
        url: HUB_URL,
        inLanguage: "it-IT",
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${HUB_URL}${VIA.articolo(p.slug)}`,
          datePublished: isoDay(p.publishedAt),
          description: p.description,
        })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Apertura
        briciole={[]}
        titolo={
          <>
            L&apos;intelligenza artificiale, <span className="text-muted-foreground">spiegata a chi la deve usare</span>{" "}
            in azienda.
          </>
        }
        testo="Le notizie che spostano una decisione, le procedure per applicarle e gli strumenti che le reggono. Scritto per chi manda avanti un'impresa, non per chi segue il settore."
        azioni={
          <>
            <Button asChild size="lg">
              <a href={VIA.guide}>Parti dalle guide</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={VIA.tool}>Directory dei tool</a>
            </Button>
          </>
        }
        dati={[
          { valore: posts.length, etichetta: "articoli" },
          { valore: GUIDE.length, etichetta: "guide operative" },
          { valore: TOOLS.length, etichetta: "tool schedati" },
          { valore: categorieToolAttive().length, etichetta: "categorie" },
        ]}
      />

      <Sezione
        titolo="Ultimi articoli"
        testo="Cosa è successo, perché conta per un'impresa italiana e cosa conviene fare. Con le fonti in fondo."
        href={VIA.articoli}
        hrefLabel="Tutti gli articoli"
      >
        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nessun articolo pubblicato.</p>
        ) : (
          <ElencoArticoli posts={posts} categorie={categorieArticoli} limite={6} />
        )}
      </Sezione>

      <div className="border-t border-border">
        <Sezione
          titolo="Guide operative"
          testo="Procedure complete per mestiere: cosa serve prima di iniziare, i passi da fare e cosa si ottiene alla fine."
          href={VIA.guide}
          hrefLabel="Tutte le guide"
        >
          <ElencoGuide guide={GUIDE} categorie={categorieGuideAttive()} limite={6} />
        </Sezione>
      </div>

      <div className="border-t border-border">
        <Sezione
          titolo="Directory dei tool"
          testo="Cosa fa ogni strumento, quanto costa davvero e dove sono i limiti. I limiti sono la parte che manca alle altre directory."
          href={VIA.tool}
          hrefLabel="Tutta la directory"
        >
          <ElencoTool tools={TOOLS} categorie={categorieToolAttive()} limite={6} />
        </Sezione>
      </div>

      <Coda />
    </main>
  );
}
