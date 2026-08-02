import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/blog";
import {
  TOOLS,
  ETICHETTE_PREZZO,
  categoriaPrincipale,
  etichettaCategoriaTool,
  getTool,
  logoTool,
  toolSimili,
} from "@/lib/tools";
import { guidePerTool } from "@/lib/guides";
import { BlogHeader } from "@/components/blog/blog-header";
import { Briciole } from "@/components/blog/briciole";
import { GuidaCard, Pillola, ToolCard, TitoloSezione } from "@/components/blog/cards";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return { title: "Tool non trovato — ELEVIACOM" };
  const url = `${SITE_URL}/blog/tool/${t.slug}`;
  return {
    title: `${t.name} — cosa fa, quanto costa e quando conviene | ELEVIACOM`,
    description: t.tagline + " " + t.description.slice(0, 110),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "ELEVIACOM",
      locale: "it_IT",
      title: `${t.name} — scheda tool`,
      description: t.tagline,
      images: [{ url: `${SITE_URL}${logoTool(t.slug)}`, width: 320, height: 320, alt: `Logo ${t.name}` }],
    },
    twitter: { card: "summary", title: `${t.name} — scheda tool`, description: t.tagline },
  };
}

function Elenco({ titolo, voci, segno }: { titolo: string; voci: string[]; segno: "linea" | "piu" | "meno" }) {
  if (voci.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="mb-5 text-lg font-semibold text-[var(--lettura-titolo)]">{titolo}</h2>
      <ul className="space-y-3">
        {voci.map((v, i) => (
          <li key={i} className="flex gap-3.5 text-[15px] leading-relaxed text-neutral-300">
            <span
              aria-hidden="true"
              className={`mt-[0.62em] h-px w-3.5 shrink-0 ${
                segno === "piu" ? "bg-[#5f9e7d]" : segno === "meno" ? "bg-[#9e6b5f]" : "bg-neutral-700"
              }`}
            />
            <span>{v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) notFound();

  const simili = toolSimili(t, 4);
  const guide = guidePerTool(t.slug, 3);
  const principale = categoriaPrincipale(t);
  const url = `${SITE_URL}/blog/tool/${t.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: t.name,
        description: t.description,
        applicationCategory: "BusinessApplication",
        url: t.url,
        image: `${SITE_URL}${logoTool(t.slug)}`,
        offers: {
          "@type": "Offer",
          price: t.pricing === "gratis" ? "0" : undefined,
          priceCurrency: "EUR",
          description: t.pricingNote ?? ETICHETTE_PREZZO[t.pricing],
        },
        featureList: t.features,
        inLanguage: "it-IT",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: "Tool", item: `${SITE_URL}/blog/tool` },
          { "@type": "ListItem", position: 4, name: t.name, item: url },
        ],
      },
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
            { label: "Tool", href: "/blog/tool" },
            { label: etichettaCategoriaTool(principale), href: "/blog/tool" },
            { label: t.name },
          ]}
        />

        <div className="mt-8 gap-12 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem]">
          {/* ── Colonna principale ─────────────────────────────── */}
          <div className="min-w-0">
            <header className="flex flex-wrap items-start gap-6">
              <span
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10"
                style={{ boxShadow: `0 12px 48px -18px ${t.color}` }}
              >
                <Image src={logoTool(t.slug)} alt={`Logo ${t.name}`} fill priority sizes="96px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-bold tracking-tight text-[var(--lettura-titolo)] md:text-4xl">
                  {t.name}
                </h1>
                <p className="mt-2 text-lg leading-relaxed text-neutral-400">{t.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {t.categories.map((c) => (
                    <Pillola key={c}>{etichettaCategoriaTool(c)}</Pillola>
                  ))}
                  <Pillola tono="acceso">{ETICHETTE_PREZZO[t.pricing]}</Pillola>
                </div>
              </div>
            </header>

            <p className="mt-8 text-[17px] leading-relaxed text-neutral-300">{t.description}</p>

            <Elenco titolo="Funzioni principali" voci={t.features} segno="linea" />
            <Elenco titolo="A cosa serve in azienda" voci={t.useCases} segno="linea" />

            <section className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[var(--lettura-bordo)] p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--lettura-tenue)]">
                  Punti di forza
                </h2>
                <ul className="space-y-3">
                  {t.pros.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-neutral-300">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-[#5f9e7d]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-[var(--lettura-bordo)] p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--lettura-tenue)]">
                  Limiti da conoscere
                </h2>
                <ul className="space-y-3">
                  {t.cons.map((c, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-neutral-300">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-[#9e6b5f]" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {guide.length > 0 && (
              <section className="mt-16 border-t border-[var(--lettura-bordo)] pt-12">
                <TitoloSezione titolo={`Guide che usano ${t.name}`} href="/blog/guide" hrefLabel="Tutte le guide" />
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {guide.map((g) => (
                    <GuidaCard key={g.slug} guida={g} />
                  ))}
                </div>
              </section>
            )}

            {simili.length > 0 && (
              <section className="mt-16 border-t border-[var(--lettura-bordo)] pt-12">
                <TitoloSezione titolo="Tool simili" href="/blog/tool" hrefLabel="Tutta la directory" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {simili.map((s) => (
                    <ToolCard key={s.slug} tool={s} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Pannello laterale ──────────────────────────────── */}
          <aside className="mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl border border-[var(--lettura-bordo)] lettura-superficie p-6">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block w-full rounded-full bg-[#eef2f5] px-5 py-3 text-center text-sm font-medium text-[#15191c] transition-colors hover:bg-white"
                >
                  Vai a {t.name}
                </a>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[var(--lettura-tenue)]">Categoria</dt>
                    <dd className="mt-1 text-neutral-300">{etichettaCategoriaTool(principale)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[var(--lettura-tenue)]">Prezzo</dt>
                    <dd className="mt-1 text-neutral-300">{ETICHETTE_PREZZO[t.pricing]}</dd>
                    {t.pricingNote && (
                      <dd className="mt-1 text-[13px] leading-relaxed text-[var(--lettura-tenue)]">{t.pricingNote}</dd>
                    )}
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.12em] text-[var(--lettura-tenue)]">Sito</dt>
                    <dd className="mt-1 break-all">
                      <a
                        href={t.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-neutral-300 underline underline-offset-4 hover:text-white"
                      >
                        {t.url.replace(/^https?:\/\//, "")}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-[var(--lettura-bordo)] p-6">
                <p className="text-sm leading-relaxed text-neutral-400">
                  Non sai se questo strumento serve alla tua azienda? La prima valutazione è gratuita.
                </p>
                <Link
                  href="/consulenza"
                  className="mt-4 inline-block border-b border-neutral-700 pb-1 text-sm text-neutral-200 transition-colors hover:border-white hover:text-white"
                >
                  Parlane con noi &rarr;
                </Link>
              </div>

              <p className="px-1 text-[11.5px] leading-relaxed text-[var(--lettura-tenue)]">
                Scheda redatta da ELEVIACOM. Prezzi e funzioni cambiano spesso: verifica sempre sul sito
                ufficiale prima di sottoscrivere.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
