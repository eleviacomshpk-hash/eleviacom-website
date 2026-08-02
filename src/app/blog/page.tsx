import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta, isoDay } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { Sezione, Iscrizione } from "@/components/hub/pezzi";
import { ElencoArticoli, ElencoGuide, ElencoTool } from "@/components/hub/elenchi";
import { HUB_URL, SITO_URL, VIA, dataEstesa } from "@/lib/hub";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "ELEVIACOM Hub — AI per le imprese italiane: news, guide, tool",
  description:
    "Le notizie sull'intelligenza artificiale che cambiano qualcosa in azienda, le guide operative per applicarla e una directory di 55 strumenti con prezzi reali e limiti dichiarati.",
  alternates: { canonical: HUB_URL, types: { "application/rss+xml": `${HUB_URL}/rss.xml` } },
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

  const ultimo = posts[0];

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

      {/* ── Apertura ────────────────────────────────────────────── */}
      <section className="hub-apertura">
        <div className="hub-larghezza">
          <div className="hub-occhiello-riga">
            <span className="hub-mono hub-mono-nero">Intelligenza artificiale applicata</span>
            <span className="hub-mono">Imprese italiane</span>
            <span className="hub-mono" style={{ marginLeft: "auto" }}>
              {ultimo ? `Aggiornato il ${dataEstesa(ultimo.publishedAt)}` : "In aggiornamento"}
            </span>
          </div>

          <div className="hub-doppia" style={{ paddingBlock: "58px 54px" }}>
            <div>
              <h1 className="hub-titolo">
                Quello che l&apos;AI cambia in azienda, <em>senza il rumore</em> intorno.
              </h1>
              <p className="hub-sommario">
                Le notizie che spostano una decisione, le procedure per applicarle e gli strumenti che
                le reggono. Scritto per chi manda avanti un&apos;impresa, non per chi segue il settore.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                <Link href={VIA.guide} className="hub-bottone hub-bottone--pieno">
                  Parti dalle guide
                </Link>
                <Link href={VIA.tool} className="hub-bottone">
                  Directory dei tool
                </Link>
              </div>
            </div>

            <div>
              <span className="hub-mono hub-mono-nero">In questo hub</span>
              <ul className="hub-indice" style={{ marginTop: 12 }}>
                <li>
                  <Link href={VIA.articoli}>Articoli</Link>
                  <span className="hub-mono">{String(posts.length).padStart(2, "0")}</span>
                </li>
                <li>
                  <Link href={VIA.guide}>Guide operative</Link>
                  <span className="hub-mono">{String(GUIDE.length).padStart(2, "0")}</span>
                </li>
                <li>
                  <Link href={VIA.tool}>Tool schedati</Link>
                  <span className="hub-mono">{TOOLS.length}</span>
                </li>
                <li>
                  <a href={VIA.rss}>Feed RSS</a>
                  <span className="hub-mono">XML</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Articoli ────────────────────────────────────────────── */}
      <Sezione
        numero="§ 01"
        titolo="Ultimi articoli"
        nota="Cosa è successo, perché conta per un'impresa italiana e cosa conviene fare. Con le fonti in fondo."
        href={VIA.articoli}
        hrefLabel="Tutti gli articoli"
      >
        {posts.length === 0 ? (
          <p className="hub-mono" style={{ paddingBlock: 40 }}>
            Nessun articolo pubblicato.
          </p>
        ) : (
          <ElencoArticoli posts={posts} categorie={categorieArticoli} limite={6} conLead />
        )}
      </Sezione>

      {/* ── Guide ───────────────────────────────────────────────── */}
      <Sezione
        numero="§ 02"
        titolo="Guide operative"
        nota="Procedure complete per mestiere: cosa serve prima di iniziare, i passi, e cosa si ottiene alla fine."
        href={VIA.guide}
        hrefLabel="Tutte le guide"
      >
        <ElencoGuide guide={GUIDE} categorie={categorieGuideAttive()} limite={6} />
      </Sezione>

      {/* ── Tool ────────────────────────────────────────────────── */}
      <Sezione
        numero="§ 03"
        titolo="Directory dei tool"
        nota="Cosa fa ogni strumento, quanto costa davvero e dove sono i limiti. I limiti sono la parte che manca alle altre directory."
        href={VIA.tool}
        hrefLabel="Tutta la directory"
      >
        <ElencoTool tools={TOOLS} categorie={categorieToolAttive()} limite={14} />
      </Sezione>

      {/* ── Coda ────────────────────────────────────────────────── */}
      <section className="hub-sezione">
        <div className="hub-larghezza" style={{ paddingBlock: "48px 8px" }}>
          <div className="hub-doppia">
            <Iscrizione />
            <div className="hub-riquadro hub-riquadro--carta">
              <span className="hub-mono hub-mono-accento">ELEVIACOM</span>
              <p style={{ marginTop: 12, fontSize: 16.5, lineHeight: 1.5 }}>
                Se una di queste guide descrive un problema che hai, possiamo costruirla, collaudarla e
                mantenerla noi.
              </p>
              <a href={`${SITO_URL}/consulenza`} className="hub-bottone" style={{ marginTop: 20 }}>
                Richiedi una consulenza
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
