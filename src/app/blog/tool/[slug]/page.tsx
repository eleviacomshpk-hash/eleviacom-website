import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TOOLS,
  ETICHETTE_PREZZO,
  categoriaPrincipale,
  etichettaCategoriaTool,
  getTool,
  toolSimili,
} from "@/lib/tools";
import { guidePerTool } from "@/lib/guides";
import { MARCHI } from "@/lib/marchi";
import { Briciole, Coda } from "@/components/hub/pezzi";
import { Etichetta, Marchio, SchedaGuida, SchedaTool } from "@/components/hub/schede";
import { HUB_URL, VIA } from "@/lib/hub";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return { title: "Tool non trovato — ELEVIACOM Hub" };
  const img = `${HUB_URL}/blog/tool/${t.slug}.jpg`;
  return {
    title: `${t.name} — cosa fa, quanto costa e quando conviene | ELEVIACOM Hub`,
    description: `${t.tagline}. ${t.description.slice(0, 120)}`,
    alternates: { canonical: `${HUB_URL}${VIA.scheda(t.slug)}` },
    openGraph: {
      type: "article",
      url: `${HUB_URL}${VIA.scheda(t.slug)}`,
      siteName: "ELEVIACOM Hub",
      locale: "it_IT",
      title: `${t.name} — scheda`,
      description: t.tagline,
      images: [{ url: img, width: 1440, height: 900, alt: `Schermata di ${t.name}` }],
    },
    twitter: { card: "summary_large_image", title: `${t.name} — scheda`, description: t.tagline, images: [img] },
  };
}

function Elenco({ titolo, voci }: { titolo: string; voci: string[] }) {
  if (!voci.length) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">{titolo}</h2>
      <ul className="space-y-2.5">
        {voci.map((v, i) => (
          <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SchedaTool_({ params }: Props) {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) notFound();

  const simili = toolSimili(t, 4);
  const guide = guidePerTool(t.slug, 3);
  const principale = categoriaPrincipale(t);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: t.name,
        description: t.description,
        applicationCategory: "BusinessApplication",
        url: t.url,
        image: `${HUB_URL}/blog/tool/${t.slug}.jpg`,
        featureList: t.features,
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: t.pricing === "gratis" ? "0" : undefined,
          description: t.pricingNote ?? ETICHETTE_PREZZO[t.pricing],
        },
        inLanguage: "it-IT",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hub", item: HUB_URL },
          { "@type": "ListItem", position: 2, name: "Tool", item: `${HUB_URL}${VIA.tool}` },
          { "@type": "ListItem", position: 3, name: t.name, item: `${HUB_URL}${VIA.scheda(t.slug)}` },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 md:px-6">
        <Briciole
          voci={[
            { label: "Tool", href: VIA.tool },
            { label: etichettaCategoriaTool(principale), href: VIA.tool },
            { label: t.name },
          ]}
        />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        {/* ── Colonna di lettura ─────────────────────────────── */}
        <div className="min-w-0">
          <header>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-card">
                {MARCHI[t.slug] ? (
                  <Marchio slug={t.slug} nome={t.name} className="h-6 w-6 text-foreground" />
                ) : (
                  <span className="text-base font-semibold text-foreground">{t.name.slice(0, 2)}</span>
                )}
              </span>
              <div className="min-w-0">
                <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t.name}</h1>
                <p className="mt-1 text-base text-muted-foreground md:text-lg">{t.tagline}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {t.categories.map((c) => (
                <Etichetta key={c}>{etichettaCategoriaTool(c)}</Etichetta>
              ))}
              <Etichetta tono="primario">{ETICHETTE_PREZZO[t.pricing]}</Etichetta>
            </div>
          </header>

          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/5 bg-black">
            <Image
              src={`/blog/tool/${t.slug}.jpg`}
              alt={`Schermata del sito di ${t.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover object-top"
            />
          </div>
          <p className="mt-2.5 text-xs text-muted">Schermata del sito ufficiale di {t.name}.</p>

          <p className="mt-8 text-[17px] leading-relaxed text-muted-foreground">{t.description}</p>

          <Elenco titolo="Funzioni principali" voci={t.features} />
          <Elenco titolo="A cosa serve in azienda" voci={t.useCases} />

          <section className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5">
            <Card>
              <CardContent className="p-5 pt-5">
                <h2 className="mb-4 text-sm font-semibold text-foreground">Punti di forza</h2>
                <ul className="space-y-3">
                  {t.pros.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#4ade80]" strokeWidth={2} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 pt-5">
                <h2 className="mb-4 text-sm font-semibold text-foreground">Limiti da conoscere</h2>
                <ul className="space-y-3">
                  {t.cons.map((c, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <X aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#f87171]" strokeWidth={2} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {guide.length > 0 && (
            <section className="mt-14 border-t border-border pt-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Guide che usano {t.name}</h2>
                <Link href={VIA.guide} className="shrink-0 text-sm font-medium text-primary hover:text-[#6aa1f8]">
                  Tutte le guide &rarr;
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
                {guide.map((g) => (
                  <SchedaGuida key={g.slug} guida={g} />
                ))}
              </div>
            </section>
          )}

          {simili.length > 0 && (
            <section className="mt-14 border-t border-border pt-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">Alternative da valutare</h2>
                <Link href={VIA.tool} className="shrink-0 text-sm font-medium text-primary hover:text-[#6aa1f8]">
                  Tutta la directory &rarr;
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                {simili.map((s) => (
                  <SchedaTool key={s.slug} tool={s} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Pannello laterale ──────────────────────────────── */}
        <aside>
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardContent className="p-5 pt-5">
                <Button asChild className="w-full">
                  <a href={t.url} target="_blank" rel="noopener noreferrer nofollow">
                    Vai a {t.name}
                  </a>
                </Button>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs text-muted">Categoria</dt>
                    <dd className="mt-1 text-foreground">{etichettaCategoriaTool(principale)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Prezzo</dt>
                    <dd className="mt-1 text-foreground">{ETICHETTE_PREZZO[t.pricing]}</dd>
                    {t.pricingNote && (
                      <dd className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{t.pricingNote}</dd>
                    )}
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Sito</dt>
                    <dd className="mt-1 break-all">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-primary hover:underline"
                      >
                        {t.url.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <p className="px-1 text-xs leading-relaxed text-muted">
              Scheda redatta da ELEVIACOM. Nessun rapporto commerciale con i fornitori citati: verifica i prezzi sul
              sito ufficiale prima di sottoscrivere.
            </p>
          </div>
        </aside>
      </div>

      <Coda
        consulenza={{
          titolo: `Ti serve davvero ${t.name}?`,
          testo:
            "Prima di sottoscrivere un abbonamento conviene capire quale problema stai risolvendo. La prima valutazione è gratuita.",
        }}
      />
    </main>
  );
}
