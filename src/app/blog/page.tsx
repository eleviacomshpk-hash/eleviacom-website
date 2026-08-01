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
    <main className="min-h-screen bg-black text-neutral-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
          &larr; Torna alla home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog</h1>
        <p className="text-neutral-400 leading-relaxed mb-12">
          Analisi, guide e casi concreti su intelligenza artificiale e automazione applicate alle PMI italiane.
        </p>

        {posts.length === 0 ? (
          <p className="text-neutral-500">Nessun articolo pubblicato.</p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  {post.cover && (
                    <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
                      <Image src={post.cover} alt={post.coverAlt ?? post.title} fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                    <time dateTime={isoDay(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingMinutes} min di lettura</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-neutral-400 leading-relaxed">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded border border-border px-2 py-0.5 text-xs text-neutral-500">{tag}</span>
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
