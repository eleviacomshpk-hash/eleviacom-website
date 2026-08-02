import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { GUIDE, ETICHETTE_DIFFICOLTA, etichettaCategoriaGuida, getGuida } from "@/lib/guides";
import { getTool } from "@/lib/tools";
import { Briciole, Coda } from "@/components/hub/pezzi";
import { Etichetta, RigaTool, SchedaGuida } from "@/components/hub/schede";
import { HUB_URL, SITO_URL, VIA, dataEstesa } from "@/lib/hub";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuida(slug);
  if (!g) return { title: "Guida non trovata — ELEVIACOM Hub" };
  const img = `${HUB_URL}/blog/tool/${g.tools[0]}.jpg`;
  return {
    title: `${g.title} — Guida | ELEVIACOM Hub`,
    description: g.description,
    alternates: { canonical: `${HUB_URL}${VIA.guida(g.slug)}` },
    openGraph: {
      type: "article",
      url: `${HUB_URL}${VIA.guida(g.slug)}`,
      siteName: "ELEVIACOM Hub",
      locale: "it_IT",
      title: g.title,
      description: g.description,
      publishedTime: g.publishedAt,
      images: [{ url: img, width: 1440, height: 900, alt: g.title }],
    },
    twitter: { card: "summary_large_image", title: g.title, description: g.description, images: [img] },
  };
}

export default async function DettaglioGuida({ params }: Props) {
  const { slug } = await params;
  const g = getGuida(slug);
  if (!g) notFound();

  const strumenti = g.tools.map((s) => getTool(s)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  const correlate = GUIDE.filter(
    (x) => x.slug !== g.slug && x.categories.some((c) => g.categories.includes(c))
  ).slice(0, 3);
  const url = `${HUB_URL}${VIA.guida(g.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: g.title,
        description: g.description,
        inLanguage: "it-IT",
        totalTime: `PT${g.minutes}M`,
        datePublished: g.publishedAt,
        author: { "@type": "Organization", name: "ELEVIACOM", url: SITO_URL },
        publisher: { "@type": "Organization", name: "ELEVIACOM", url: SITO_URL },
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
          { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
          { "@type": "ListItem", position: 2, name: "Guide", item: `${HUB_URL}${VIA.guide}` },
          { "@type": "ListItem", position: 3, name: g.title, item: url },
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
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
        <Briciole
          voci={[
            { label: "Guide", href: VIA.guide },
            { label: etichettaCategoriaGuida(g.category), href: VIA.guide },
            { label: g.title.length > 38 ? `${g.title.slice(0, 38)}…` : g.title },
          ]}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-12">
        <article className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Etichetta tono="primario">{etichettaCategoriaGuida(g.category)}</Etichetta>
            <Etichetta>{ETICHETTE_DIFFICOLTA[g.difficulty]}</Etichetta>
            <span className="text-sm text-muted">
              {g.minutes} minuti · {g.steps.length} passi
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-[1.14] tracking-tight text-foreground md:text-[2.75rem]">
            {g.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{g.description}</p>

          <p className="mt-8 text-[17px] leading-relaxed text-muted-foreground">{g.intro}</p>

          <Card className="mt-8">
            <CardContent className="p-5 pt-5">
              <h2 className="text-sm font-semibold text-primary">Cosa ottieni</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground">{g.outcome}</p>
            </CardContent>
          </Card>

          <section className="mt-10">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">Cosa serve prima di iniziare</h2>
            <ul className="space-y-2.5">
              {g.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                  <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">I passi</h2>
            <ol className="space-y-4">
              {g.steps.map((p, i) => (
                <li key={i} id={`passo-${i + 1}`} className="scroll-mt-24">
                  <Card>
                    <CardContent className="flex gap-4 p-5 pt-5 md:gap-5 md:p-6 md:pt-6">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-sm font-semibold tabular-nums text-[#8ab4f8]">
                        {i + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold leading-snug text-foreground">{p.titolo}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.testo}</p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </section>

          {g.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">Domande frequenti</h2>
              <div className="divide-y divide-border rounded-lg border border-white/5 bg-card">
                {g.faq.map((f, i) => (
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
        </article>

        {/* ── Pannello laterale ──────────────────────────────── */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <div>
              <h2 className="mb-3 text-sm font-semibold text-foreground">Tool usati</h2>
              <div className="space-y-2">
                {strumenti.map((t) => (
                  <RigaTool key={t.slug} tool={t} />
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-5 pt-5">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Difficoltà</dt>
                    <dd className="text-foreground">{ETICHETTE_DIFFICOLTA[g.difficulty]}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Tempo</dt>
                    <dd className="text-foreground">{g.minutes} min</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted">Pubblicata</dt>
                    <dd className="text-foreground">{dataEstesa(g.publishedAt)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      {correlate.length > 0 && (
        <section className="mx-auto w-full max-w-6xl border-t border-border px-4 py-12 md:px-6 md:py-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Guide collegate</h2>
            <Link href={VIA.guide} className="shrink-0 text-sm font-medium text-primary hover:text-[#6aa1f8]">
              Tutte le guide &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {correlate.map((c) => (
              <SchedaGuida key={c.slug} guida={c} />
            ))}
          </div>
        </section>
      )}

      <Coda
        consulenza={{
          titolo: "Preferisci che questo flusso lo costruisca qualcun altro?",
          testo:
            "Lo progettiamo, lo colladiamo e lo manteniamo noi. La prima valutazione è gratuita e finisce con un documento, non con un preventivo.",
        }}
      />
    </main>
  );
}
