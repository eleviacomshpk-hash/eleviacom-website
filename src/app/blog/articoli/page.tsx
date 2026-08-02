import type { Metadata } from "next";
import { getAllPostsMeta, isoDay, SITE_URL } from "@/lib/blog";
import { CATEGORIE_ARTICOLI } from "@/lib/taxonomy";
import { BlogHeader } from "@/components/blog/blog-header";
import { ListaArticoli } from "@/components/blog/liste-filtrate";
import { BloccoNewsletter } from "@/components/blog/newsletter";
import { Briciole } from "@/components/blog/briciole";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Articoli — AI, normativa e automazione per le imprese | ELEVIACOM",
  description:
    "Tutti gli articoli: AI Act e obblighi, modelli e agenti, automazione dei processi, costi e ritorno dell'investimento per le PMI italiane.",
  alternates: {
    canonical: `${SITE_URL}/blog/articoli`,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/articoli`,
    siteName: "ELEVIACOM",
    locale: "it_IT",
    title: "Articoli — ELEVIACOM",
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
        name: "Articoli — ELEVIACOM",
        url: `${SITE_URL}/blog/articoli`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/blog/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Articoli", item: `${SITE_URL}/blog/articoli` },
        ],
      },
    ],
  };

  const ultimo = posts[0];

  return (
    <main className="lettura min-h-screen text-[var(--lettura-testo)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHeader />

      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <Briciole voci={[{ label: "Blog", href: "/blog" }, { label: "Articoli" }]} />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-[var(--lettura-titolo)] md:text-5xl">
            Le notizie sull&apos;AI che cambiano qualcosa nel tuo lavoro.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Niente rassegna stampa. Ogni articolo dice cosa è successo, perché conta per un&apos;impresa
            italiana e cosa conviene fare, con le fonti in fondo.
          </p>
          {ultimo && (
            <p className="mt-6 text-[13px] text-[var(--lettura-tenue)]">
              {posts.length} articoli pubblicati · ultimo aggiornamento{" "}
              <time dateTime={isoDay(ultimo.publishedAt)}>{isoDay(ultimo.publishedAt)}</time>
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        {posts.length === 0 ? (
          <p className="text-sm text-[var(--lettura-tenue)]">Nessun articolo pubblicato.</p>
        ) : (
          <ListaArticoli posts={posts} categorie={categorie} />
        )}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <BloccoNewsletter compatto />
      </section>
    </main>
  );
}
