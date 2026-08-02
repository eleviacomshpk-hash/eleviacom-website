import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/blog";
import {
  GUIDE,
  ETICHETTE_DIFFICOLTA,
  etichettaCategoriaGuida,
  getGuida,
} from "@/lib/guides";
import { getTool, logoTool } from "@/lib/tools";
import { BlogHeader } from "@/components/blog/blog-header";
import { Briciole } from "@/components/blog/briciole";
import { GuidaCard, Pillola, TitoloSezione } from "@/components/blog/cards";
import { BloccoNewsletter } from "@/components/blog/newsletter";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuida(slug);
  if (!g) return { title: "Guida non trovata — ELEVIACOM" };
  const url = `${SITE_URL}/blog/guide/${g.slug}`;
  const img = `${SITE_URL}/blog/guida/${g.slug}.jpg`;
  return {
    title: `${g.title} — Guida ELEVIACOM`,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "ELEVIACOM",
      locale: "it_IT",
      title: g.title,
      description: g.description,
      publishedTime: g.publishedAt,
      images: [{ url: img, width: 1200, height: 675, alt: g.title }],
    },
    twitter: { card: "summary_large_image", title: g.title, description: g.description, images: [img] },
  };
}

export default async function GuidaDetailPage({ params }: Props) {
  const { slug } = await params;
  const g = getGuida(slug);
  if (!g) notFound();

  const strumenti = g.tools.map((s) => getTool(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const correlate = GUIDE.filter(
    (x) => x.slug !== g.slug && x.categories.some((c) => g.categories.includes(c))
  ).slice(0, 3);
  const url = `${SITE_URL}/blog/guide/${g.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: g.title,
        description: g.description,
        inLanguage: "it-IT",
        totalTime: `PT${g.minutes}M`,
        image: `${SITE_URL}/blog/guida/${g.slug}.jpg`,
        datePublished: g.publishedAt,
        author: { "@type": "Organization", name: "ELEVIACOM", url: SITE_URL },
        publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITE_URL },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        supply: g.requirements.map((r) => ({ "@type": "HowToSupply", name: r })),
        tool: strumenti.map((t) => ({ "@type": "HowToTool", name: t.name })),
        step: g.steps.map((p, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: p.titolo,
          text: p.testo,
          url: `${url}#passo-${i + 1}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Guide", item: `${SITE_URL}/blog/guide` },
          { "@type": "ListItem", position: 4, name: g.title, item: url },
        ],
      },
      ...(g.faq.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: g.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="lettura min-h-screen text-[var(--lettura-testo)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogHeader />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <Briciole
          voci={[
            { label: "Blog", href: "/blog" },
            { label: "Guide", href: "/blog/guide" },
            { label: etichettaCategoriaGuida(g.category), href: "/blog/guide" },
            { label: g.title.length > 42 ? g.title.slice(0, 42) + "…" : g.title },
          ]}
        />

        <div className="mt-8 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem]">
          <article className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Pillola tono="acceso">{etichettaCategoriaGuida(g.category)}</Pillola>
              <Pillola>{ETICHETTE_DIFFICOLTA[g.difficulty]}</Pillola>
              <span className="text-[13px] text-[var(--lettura-tenue)]">{g.minutes} minuti</span>
            </div>

            <h1 className="text-3xl font-bold leading-[1.14] tracking-tight text-[var(--lettura-titolo)] md:text-[2.75rem]">
              {g.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">{g.description}</p>

            <div className="relative mt-9 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--lettura-bordo)]">
              <Image
                src={`/blog/guida/${g.slug}.jpg`}
                alt={g.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>

            <p className="mt-9 text-[17px] leading-relaxed text-neutral-300">{g.intro}</p>

            <section className="mt-10 rounded-2xl border border-[var(--lettura-bordo)] lettura-superficie p-6">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--lettura-tenue)]">
                Cosa ottieni
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-200">{g.outcome}</p>
            </section>

            <section className="mt-10">
              <h2 className="mb-4 text-lg font-semibold text-[var(--lettura-titolo)]">Cosa serve prima di iniziare</h2>
              <ul className="space-y-2.5">
                {g.requirements.map((r, i) => (
                  <li key={i} className="flex gap-3.5 text-[15px] leading-relaxed text-neutral-300">
                    <span aria-hidden="true" className="mt-[0.62em] h-px w-3.5 shrink-0 bg-neutral-700" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="mb-8 text-xl font-semibold text-[var(--lettura-titolo)]">I passi</h2>
              <ol className="space-y-9">
                {g.steps.map((p, i) => (
                  <li key={i} id={`passo-${i + 1}`} className="scroll-mt-24">
                    <div className="flex gap-5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--lettura-bordo)] text-[13px] font-medium tabular-nums text-neutral-400"
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[17px] font-semibold leading-snug text-[var(--lettura-titolo)]">
                          {p.titolo}
                        </h3>
                        <p className="mt-2.5 text-[15.5px] leading-[1.8] text-neutral-300">{p.testo}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {g.faq.length > 0 && (
              <section className="mt-16 border-t border-[var(--lettura-bordo)] pt-12">
                <h2 className="mb-7 text-xl font-semibold text-[var(--lettura-titolo)]">Domande frequenti</h2>
                <div className="divide-y divide-[var(--lettura-bordo)]">
                  {g.faq.map((f, i) => (
                    <details key={i} className="group py-5" open={i === 0}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-medium text-[var(--lettura-titolo)]">
                        <span>{f.question}</span>
                        <span
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-[var(--lettura-tenue)] transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 leading-relaxed text-neutral-400">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-16 border-t border-[var(--lettura-bordo)] pt-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--lettura-tenue)]">
                ELEVIACOM
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-neutral-300">
                Se preferisci che questo flusso venga costruito, collaudato e mantenuto da qualcuno,
                è esattamente quello che facciamo.
              </p>
              <Link
                href="/consulenza"
                className="group mt-6 inline-flex items-center gap-2 border-b border-neutral-700 pb-1 text-sm text-[var(--lettura-titolo)] transition-colors hover:border-white"
              >
                Richiedi una consulenza
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </section>
          </article>

          {/* ── Pannello laterale ──────────────────────────────── */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-[var(--lettura-bordo)] lettura-superficie p-6">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--lettura-tenue)]">
                  Tool usati
                </h2>
                <ul className="mt-4 space-y-3">
                  {strumenti.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/blog/tool/${t.slug}`} className="group flex items-center gap-3">
                        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/10">
                          <Image src={logoTool(t.slug)} alt="" fill sizes="36px" className="object-cover" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-neutral-200 transition-colors group-hover:text-white">
                            {t.name}
                          </span>
                          <span className="block truncate text-[11.5px] text-[var(--lettura-tenue)]">
                            {t.tagline}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--lettura-bordo)] p-6">
                <dl className="space-y-3.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--lettura-tenue)]">Difficoltà</dt>
                    <dd className="text-neutral-300">{ETICHETTE_DIFFICOLTA[g.difficulty]}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--lettura-tenue)]">Tempo</dt>
                    <dd className="text-neutral-300">{g.minutes} min</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-[var(--lettura-tenue)]">Passi</dt>
                    <dd className="text-neutral-300">{g.steps.length}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </aside>
        </div>

        {correlate.length > 0 && (
          <section className="mt-20 border-t border-[var(--lettura-bordo)] pt-12">
            <TitoloSezione titolo="Guide collegate" href="/blog/guide" hrefLabel="Tutte le guide" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {correlate.map((c) => (
                <GuidaCard key={c.slug} guida={c} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-14">
          <BloccoNewsletter compatto />
        </div>
      </div>
    </main>
  );
}
