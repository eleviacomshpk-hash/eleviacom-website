import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPostsMeta, getPost, isoDay } from "@/lib/blog";
import { CATEGORIE_ARTICOLI, etichetta } from "@/lib/taxonomy";
import { Avanzamento } from "@/components/hub/avanzamento";
import { Briciole, Coda } from "@/components/hub/pezzi";
import { Etichetta, SchedaArticolo } from "@/components/hub/schede";
import { HUB_URL, SITO_URL, VIA, dataEstesa } from "@/lib/hub";

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
  if (!post) return { title: "Articolo non trovato — ELEVIACOM Hub" };
  const url = post.canonical ?? `${HUB_URL}${VIA.articolo(post.slug)}`;
  const img = post.cover ? `${HUB_URL}${post.cover}` : undefined;
  return {
    title: post.metaTitle ?? `${post.title} — ELEVIACOM Hub`,
    description: post.description,
    keywords: post.keywords.length ? post.keywords : post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    robots: post.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      url,
      siteName: "ELEVIACOM Hub",
      locale: "it_IT",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: img ? [{ url: img, width: 1600, height: 900, alt: post.coverAlt ?? post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: img ? [img] : undefined,
    },
  };
}

export default async function Articolo({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getAllPostsMeta();
  const correlati = all
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      punti: p.tags.filter((t) => post.tags.includes(t)).length + (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.punti - a.punti)
    .slice(0, 3)
    .map((x) => x.p);

  const url = `${HUB_URL}${VIA.articolo(post.slug)}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": post.schemaType,
      headline: post.title,
      description: post.description,
      abstract: post.summary ?? post.description,
      datePublished: isoDay(post.publishedAt),
      dateModified: isoDay(post.updatedAt),
      author: { "@type": "Organization", name: post.author, url: SITO_URL },
      publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITO_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: post.cover ? [`${HUB_URL}${post.cover}`] : undefined,
      keywords: (post.keywords.length ? post.keywords : post.tags).join(", "),
      about: post.entities.map((e) => ({ "@type": "Thing", name: e })),
      citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
      inLanguage: "it-IT",
      wordCount: post.readingMinutes * 200,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
        { "@type": "ListItem", position: 2, name: "Articoli", item: `${HUB_URL}${VIA.articoli}` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <main>
      <Avanzamento />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
        <Briciole
          voci={[
            { label: "Articoli", href: VIA.articoli },
            { label: etichetta(CATEGORIE_ARTICOLI, post.category), href: VIA.articoli },
            { label: post.title.length > 38 ? `${post.title.slice(0, 38)}…` : post.title },
          ]}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
        <article className="min-w-0">
          <header>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Etichetta tono="primario">{etichetta(CATEGORIE_ARTICOLI, post.category)}</Etichetta>
              <span className="text-sm text-muted">
                {dataEstesa(post.publishedAt)} · {post.readingMinutes} min di lettura
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-[1.14] tracking-tight text-foreground md:text-[2.75rem]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.description}
            </p>
          </header>

          {post.cover && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/5">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 760px"
                className="object-cover"
              />
            </div>
          )}

          {post.keyTakeaways.length > 0 && (
            <Card className="mt-8">
              <CardContent className="p-5 pt-5 md:p-6 md:pt-6">
                <h2 className="text-sm font-semibold text-primary">In sintesi</h2>
                <ul className="mt-3 space-y-2.5">
                  {post.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Domande frequenti</h2>
              <div className="divide-y divide-border rounded-lg border border-white/5 bg-card">
                {post.faq.map((f, i) => (
                  <details key={i} className="group p-5" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-foreground">
                      <span>{f.question}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 text-primary transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {post.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Fonti</h2>
              <ul className="space-y-2">
                {post.sources.map((s, i) => (
                  <li key={i} className="text-sm">
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside>
          <div className="sticky top-24 space-y-6">
            {post.toc.length > 2 && (
              <nav aria-label="Indice dell'articolo">
                <h2 className="mb-3 text-sm font-semibold text-foreground">In questo articolo</h2>
                <div className="space-y-1 border-l border-border">
                  {post.toc.map((v) => (
                    <a
                      key={v.id}
                      href={`#${v.id}`}
                      className={`-ml-px block border-l border-transparent py-1.5 text-sm leading-snug text-muted-foreground transition-colors hover:border-primary hover:text-foreground ${
                        v.level === 3 ? "pl-7 text-[13px]" : "pl-4"
                      }`}
                    >
                      {v.text}
                    </a>
                  ))}
                </div>
              </nav>
            )}

            {post.tags.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-semibold text-foreground">Argomenti</h2>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <Etichetta key={t}>{t}</Etichetta>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {correlati.length > 0 && (
        <section className="mx-auto w-full max-w-6xl border-t border-border px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Continua a leggere</h2>
            <Link href={VIA.articoli} className="shrink-0 text-sm font-medium text-primary hover:text-[#6aa1f8]">
              Tutti gli articoli &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {correlati.map((r) => (
              <SchedaArticolo key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}

      <Coda
        consulenza={{
          titolo: "Serve una mano ad applicarlo davvero?",
          testo:
            "Progettiamo chatbot, automazioni e agenti AI su misura per PMI italiane. La prima valutazione è gratuita e finisce con un documento, non con un preventivo.",
        }}
      />
    </main>
  );
}
