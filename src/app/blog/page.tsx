import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllPostsMeta, formatDate, isoDay, SITE_URL } from "@/lib/blog";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog — ELEVIACOM | AI e automazione per PMI italiane",
  description:
    "Analisi, guide e casi concreti su intelligenza artificiale, automazioni e agenti AI applicati alle piccole e medie imprese italiane.",
  alternates: { canonical: `${SITE_URL}/blog`, types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` } },
  openGraph: {
    type: "website", url: `${SITE_URL}/blog`, siteName: "ELEVIACOM", locale: "it_IT",
    title: "Blog — ELEVIACOM",
    description: "Analisi, guide e casi concreti su AI e automazione per le PMI italiane.",
  },
  twitter: { card: "summary_large_image", title: "Blog — ELEVIACOM" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPostsMeta();

  const jsonLd = {
    "@context": "https://schema.org",
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
  };

  return (
    <main className="lettura min-h-screen text-[var(--lettura-testo)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-[var(--lettura-tenue)] hover:text-[var(--lettura-titolo)] transition-colors mb-8 inline-block">
          &larr; Torna alla home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--lettura-titolo)] mb-4">Blog</h1>
        <p className="text-neutral-400 leading-relaxed mb-12">
          Analisi, guide e casi concreti su intelligenza artificiale e automazione applicate alle PMI italiane.
        </p>

        {posts.length === 0 ? (
          <p className="text-[var(--lettura-tenue)]">Nessun articolo pubblicato.</p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.cover && (
                    <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-[var(--lettura-bordo)]">
                      <Image src={post.cover} alt={post.coverAlt ?? post.title} fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-[var(--lettura-tenue)] mb-2">
                    <time dateTime={isoDay(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingMinutes} min di lettura</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-[var(--lettura-titolo)] group-hover:text-[var(--lettura-titolo)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-neutral-400 leading-relaxed">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-x-2.5 text-[11px] uppercase tracking-[0.14em] text-[var(--lettura-tenue)]">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={tag} className="flex items-center gap-2.5">
                          {i > 0 && <span aria-hidden="true" className="text-neutral-800">/</span>}
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
