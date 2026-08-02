import type { Metadata } from "next";
import { SITE_URL } from "@/lib/blog";
import { GUIDE, categorieGuideAttive } from "@/lib/guides";
import { BlogHeader } from "@/components/blog/blog-header";
import { ListaGuide } from "@/components/blog/liste-filtrate";
import { BloccoNewsletter } from "@/components/blog/newsletter";
import { Briciole } from "@/components/blog/briciole";

export const metadata: Metadata = {
  title: "Guide AI operative per mestiere — ELEVIACOM",
  description:
    "Guide passo per passo per automatizzare il lavoro con l'AI: vendite, customer service, amministrazione, e-commerce, officine, studi professionali.",
  alternates: { canonical: `${SITE_URL}/blog/guide` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog/guide`,
    siteName: "ELEVIACOM",
    locale: "it_IT",
    title: "Guide AI operative per mestiere — ELEVIACOM",
    description: "Procedure complete per applicare l'AI al lavoro di tutti i giorni, mestiere per mestiere.",
  },
};

export default function GuidePage() {
  const categorie = categorieGuideAttive();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Guide AI operative — ELEVIACOM",
        url: `${SITE_URL}/blog/guide`,
        inLanguage: "it-IT",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: GUIDE.length,
          itemListElement: GUIDE.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/blog/guide/${g.slug}`,
            name: g.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Guide", item: `${SITE_URL}/blog/guide` },
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
          <Briciole voci={[{ label: "Blog", href: "/blog" }, { label: "Guide" }]} />
          <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-[var(--lettura-titolo)] md:text-5xl">
            Automatizza il lavoro con guide passo per passo.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-400">
            I casi d&apos;uso che funzionano davvero in un&apos;impresa italiana, organizzati per mestiere.
            Ogni guida dice cosa serve prima di iniziare, cosa fare e cosa si ottiene alla fine.
          </p>
          <p className="mt-6 text-[13px] text-[var(--lettura-tenue)]">
            {GUIDE.length} guide · {categorie.length} ambiti · tempo medio{" "}
            {Math.round(GUIDE.reduce((s, g) => s + g.minutes, 0) / GUIDE.length)} minuti
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:py-16">
        <ListaGuide guide={GUIDE} categorie={categorie} />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <BloccoNewsletter compatto />
      </section>
    </main>
  );
}
