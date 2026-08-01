import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPost, formatDate, SITE_URL } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Articolo non trovato — ELEVIACOM" };
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} — ELEVIACOM`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "ELEVIACOM",
      locale: "it_IT",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ELEVIACOM",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    inLanguage: "it-IT",
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/blog"
          className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block"
        >
          &larr; Torna al blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingMinutes} min di lettura</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <p className="text-neutral-400 leading-relaxed">
              {post.description}
            </p>
          </header>

          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-neutral-400 leading-relaxed">
            ELEVIACOM progetta chatbot, automazioni e agenti AI su misura per PMI
            italiane.{" "}
            <Link href="/consulenza" className="text-white hover:text-primary transition-colors underline underline-offset-4">
              Richiedi una consulenza
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
