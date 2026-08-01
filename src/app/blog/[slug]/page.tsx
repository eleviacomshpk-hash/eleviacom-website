import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPost, formatDate, isoDay, SITE_URL } from "@/lib/blog";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { TableOfContents } from "@/components/blog/table-of-contents";

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
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt, tags: post.tags,
      images: img ? [{ url: img, width: 1600, height: 900, alt: post.coverAlt ?? post.title }] : undefined,
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

  const all = await getAllPostsMeta();
  const related = all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.p);

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

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <ReadingProgress />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }} />

      {/* Copertina a tutta larghezza, con sfumatura verso il nero */}
      {post.cover && (
        <div className="relative h-[32vh] min-h-[220px] w-full overflow-hidden md:h-[40vh]">
          <Image src={post.cover} alt={post.coverAlt ?? post.title} fill priority
            sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
        <Link href="/blog"
          className="mb-8 inline-block text-sm text-neutral-500 transition-colors hover:text-white">
          &larr; Torna al blog
        </Link>

        <div className="gap-14 xl:grid xl:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0">

        <article id="articolo">
          <header className="mb-12">
            {post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((t) => (
                  <span key={t}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-bold leading-[1.15] text-white md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">{post.description}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-xs text-neutral-500">
              <span className="font-medium text-neutral-400">{post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={isoDay(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingMinutes} min di lettura</span>
            </div>
          </header>

          {post.keyTakeaways.length > 0 && (
            <section className="mb-12 rounded-xl border border-border bg-gradient-to-b from-card to-black p-6 md:p-8">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
                In sintesi
              </h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <TableOfContents items={post.toc} variant="mobile" />

          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <section className="mt-20 border-t border-border pt-12">
              <h2 className="mb-8 text-2xl font-semibold text-white">Domande frequenti</h2>
              <div className="divide-y divide-border">
                {post.faq.map((f, i) => (
                  <details key={i} className="group py-5" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-white">
                      <span>{f.question}</span>
                      <span aria-hidden="true"
                        className="mt-1 shrink-0 text-neutral-600 transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-neutral-400">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {post.sources.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-600">Fonti</h2>
              <ul className="space-y-2 text-sm">
                {post.sources.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow"
                      className="text-neutral-400 underline underline-offset-4 transition-colors hover:text-white">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <section className="mt-16 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8">
          <h2 className="text-xl font-semibold text-white">Hai un progetto in mente?</h2>
          <p className="mt-3 leading-relaxed text-neutral-400">
            ELEVIACOM progetta chatbot, automazioni e agenti AI su misura per PMI italiane.
            La valutazione iniziale è gratuita.
          </p>
          <Link href="/consulenza"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Richiedi una consulenza <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-wider text-neutral-600">
              Continua a leggere
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  {r.cover && (
                    <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-lg border border-border">
                      <Image src={r.cover} alt={r.coverAlt ?? r.title} fill sizes="33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}
                  <h3 className="text-sm font-medium leading-snug text-neutral-300 transition-colors group-hover:text-white">
                    {r.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600">{r.readingMinutes} min</p>
                </Link>
              ))}
            </div>
          </section>
        )}

          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
              <TableOfContents items={post.toc} variant="desktop" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
