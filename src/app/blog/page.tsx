import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta, isoDay, SITE_URL } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { BlogHeader } from "@/components/blog/blog-header";
import { TitoloSezione } from "@/components/blog/cards";
import { ListaArticoli, ListaGuide, ListaTool } from "@/components/blog/liste-filtrate";
import { BloccoNewsletter } from "@/components/blog/newsletter";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog ELEVIACOM — News, guide e tool AI per le imprese italiane",
  description:
    "Le notizie sull'intelligenza artificiale che contano per un'impresa, le guide operative per applicarla e la directory dei tool, in italiano.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: "ELEVIACOM",
    locale: "it_IT",
    title: "Blog ELEVIACOM — News, guide e tool AI per le imprese italiane",
    description:
      "Le notizie sull'AI che contano per un'impresa, le guide operative per applicarla e la directory dei tool.",
  },
  twitter: { card: "summary_large_image", title: "Blog ELEVIACOM" },
};

export default async function BlogHubPage() {
  const posts = await getAllPostsMeta();
  const guide = GUIDE;
  const tools = TOOLS;

  const categorieArticoli = CATEGORIE_ARTICOLI.filter((c) => posts.some((p) => p.category === c.slug)).map((c) => ({
    slug: c.slug,
    label: c.label,
    count: posts.filter((p) => p.category === c.slug).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "Blog ELEVIACOM",
        url: `${SITE_URL}/blog`,
        inLanguage: "it-IT",
        publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITE_URL },
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: isoDay(p.publishedAt),
          description: p.description,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        ],
      },
    ],
  };

  return (
    <main className="lettura min-h-screen text-[var(--lettura-testo)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHeader />

      {/* ── Apertura ─────────────────────────────────────────────── */}
      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--lettura-tenue)]">
            News · Guide · Tool
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[var(--lettura-titolo)] md:text-6xl">
            L&apos;intelligenza artificiale spiegata a chi deve usarla in azienda.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Cosa esce, perché conta per un&apos;impresa italiana e come si applica davvero.
            Guide operative passo per passo e una directory di {tools.length} strumenti valutati sul campo.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/blog/guide"
              className="rounded-full bg-[#eef2f5] px-6 py-3 text-sm font-medium text-[#15191c] transition-colors hover:bg-white"
            >
              Parti dalle guide
            </Link>
            <Link
              href="/blog/tool"
              className="rounded-full border border-[var(--lettura-bordo)] px-6 py-3 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
            >
              Esplora i tool
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-[var(--lettura-bordo)] pt-8">
            {[
              { n: posts.length, l: "articoli" },
              { n: guide.length, l: "guide operative" },
              { n: tools.length, l: "tool schedati" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="block text-2xl font-semibold text-[var(--lettura-titolo)] md:text-3xl">
                    {s.n}
                  </span>
                  <span className="mt-1 block text-[13px] text-[var(--lettura-tenue)]">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Ultimi articoli ──────────────────────────────────────── */}
      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <TitoloSezione
            occhiello="Ultimi articoli"
            titolo="Cosa è successo e cosa cambia per te"
            testo="Analisi brevi su normativa, modelli e automazione, scritte per chi deve prendere una decisione, non per chi segue il settore."
            href="/blog/articoli"
            hrefLabel="Tutti gli articoli"
          />
          {posts.length === 0 ? (
            <p className="text-sm text-[var(--lettura-tenue)]">Nessun articolo pubblicato.</p>
          ) : (
            <ListaArticoli posts={posts} categorie={categorieArticoli} limite={6} />
          )}
        </div>
      </section>

      {/* ── Guide ────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <TitoloSezione
            occhiello="Guide"
            titolo="Automatizza il lavoro, passo per passo"
            testo="Procedure complete per mestiere: cosa serve, cosa fare e cosa si ottiene alla fine. Ogni guida indica i tool usati e quanto tempo richiede."
            href="/blog/guide"
            hrefLabel="Tutte le guide"
          />
          <ListaGuide guide={guide} categorie={categorieGuideAttive()} limite={6} />
        </div>
      </section>

      {/* ── Tool di tendenza ─────────────────────────────────────── */}
      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <TitoloSezione
            occhiello="Tool di tendenza"
            titolo="Gli strumenti che vale la pena conoscere"
            testo="Directory ragionata: cosa fa ogni strumento, quanto costa davvero e in quali casi conviene. Con i limiti dichiarati, non solo i pregi."
            href="/blog/tool"
            hrefLabel="Tutta la directory"
          />
          <ListaTool tools={tools} categorie={categorieToolAttive()} limite={12} />
        </div>
      </section>

      {/* ── Newsletter e consulenza ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <BloccoNewsletter />

        <div className="mt-6 rounded-3xl border border-[var(--lettura-bordo)] p-8 md:p-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--lettura-tenue)]">
            ELEVIACOM
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight text-[var(--lettura-titolo)] md:text-3xl">
            Se una di queste guide descrive un problema che hai, possiamo costruirla noi.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-neutral-400">
            Progettiamo chatbot, automazioni e agenti AI su misura per PMI italiane.
            La prima valutazione è gratuita e finisce con un documento, non con un preventivo.
          </p>
          <Link
            href="/consulenza"
            className="group mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--lettura-bordo)] px-6 py-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
          >
            Richiedi una consulenza
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
