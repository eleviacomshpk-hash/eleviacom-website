import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPost, formatDate, isoDay, SITE_URL } from "@/lib/blog";

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Articolo non trovato — ELEVIACOM" };
  const url = post.canonical ?? `${SITE_URL}/blog/${post.slug}`;
  const img = post.cover ? `${SITE_URL}${post.cover}` : undefined;
  return {
    title: post.metaTitle ?? `${post.title} — ELEVIACOM`,
    description: post.description,
    keywords: post.keywords.length ? post.keywords : post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article", url, siteName: "ELEVIACOM", locale: "it_IT",
      title: post.title, description: post.description,
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt,
      tags: post.tags,
      images: img ? [{ url: img, alt: post.coverAlt ?? post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image", title: post.title,
      description: post.description, images: img ? [img] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": post.schemaType,
      headline: post.title,
      description: post.description,
      abstract: post.summary ?? post.description,
      datePublished: isoDay(post.publishedAt),
      dateModified: isoDay(post.updatedAt),
      author: { "@type": "Organization", name: post.author, url: SITE_URL },
      publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
      keywords: (post.keywords.length ? post.keywords : post.tags).join(", "),
      about: post.entities.map((e) => ({ "@type": "Thing", name: e })),
      citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
      inLanguage: "it-IT",
      wordCount: post.readingMinutes * 200,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question", name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link href="/blog" className="text-sm text-neutral-500 hover:text-white transition-colors mb-8 inline-block">
          &larr; Torna al blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
              <time dateTime={isoDay(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingMinutes} min di lettura</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-neutral-400 leading-relaxed">{post.description}</p>
          </header>

          {post.cover && (
            <figure className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-lg border border-border">
              <Image src={post.cover} alt={post.coverAlt ?? post.title} fill priority
                sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
            </figure>
          )}

          {post.keyTakeaways.length > 0 && (
            <section className="mb-10 rounded-lg border border-border bg-card p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">In sintesi</h2>
              <ul className="list-disc space-y-2 pl-5 text-neutral-300">
                {post.keyTakeaways.map((t, i) => (<li key={i}>{t}</li>))}
              </ul>
            </section>
          )}

          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-white mb-6">Domande frequenti</h2>
              <div className="space-y-6">
                {post.faq.map((f, i) => (
                  <div key={i}>
                    <h3 className="text-base font-semibold text-white mb-2">{f.question}</h3>
                    <p className="text-neutral-400 leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {post.sources.length > 0 && (
            <section className="mt-14">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 mb-3">Fonti</h2>
              <ul className="space-y-2 text-sm">
                {post.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow"
                      className="text-neutral-400 hover:text-white underline underline-offset-4 transition-colors">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-neutral-400 leading-relaxed">
            ELEVIACOM progetta chatbot, automazioni e agenti AI su misura per PMI italiane.{" "}
            <Link href="/consulenza" className="text-white hover:text-primary transition-colors underline underline-offset-4">
              Richiedi una consulenza
            </Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
