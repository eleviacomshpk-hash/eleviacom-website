import type { Metadata } from "next";
import { SITE_URL } from "@/lib/blog";
import { TOOLS, categorieToolAttive } from "@/lib/tools";
import { BlogHeader } from "@/components/blog/blog-header";
import { ListaTool } from "@/components/blog/liste-filtrate";
import { BloccoNewsletter } from "@/components/blog/newsletter";
import { Briciole } from "@/components/blog/briciole";

export const metadata: Metadata = {
  title: "Directory dei tool AI — schede, prezzi e limiti | ELEVIACOM",
  description:
    "I migliori strumenti di intelligenza artificiale organizzati per funzione: assistenti, agenti, automazione, contenuti, voce, vendite. Con prezzi reali e limiti dichiarati.",
  alternates: { canonical: `${SITE_URL}/blog/tool` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/tool`,
    siteName: "ELEVIACOM",
    locale: "it_IT",
    title: "Directory dei tool AI — ELEVIACOM",
    description: "Strumenti AI organizzati per funzione, con prezzi reali e limiti dichiarati.",
  },
};

export default function ToolPage() {
  const categorie = categorieToolAttive();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Directory dei tool AI — ELEVIACOM",
        url: `${SITE_URL}/blog/tool`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: TOOLS.length,
          itemListElement: TOOLS.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/blog/tool/${t.slug}`,
            name: t.name,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Tool", item: `${SITE_URL}/blog/tool` },
        ],
      },
    ],
  };

  return (
    <main className="lettura min-h-screen text-[var(--lettura-testo)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHeader />

      <section className="border-b border-[var(--lettura-bordo)]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
          <Briciole voci={[{ label: "Blog", href: "/blog" }, { label: "Tool" }]} />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-[var(--lettura-titolo)] md:text-5xl">
            Gli strumenti AI che contano, organizzati per funzione.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            Una directory ragionata invece di un elenco. Per ogni strumento: cosa fa, quanto costa davvero,
            in quali casi conviene e dove sono i limiti.
          </p>
          <p className="mt-6 text-[13px] text-[var(--lettura-tenue)]">
            {TOOLS.length} tool · {categorie.length} categorie · schede aggiornate a mano
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <ListaTool tools={TOOLS} categorie={categorie} conOrdinamento />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <BloccoNewsletter compatto />
      </section>
    </main>
  );
}
