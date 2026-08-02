import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDE, ETICHETTE_DIFFICOLTA, etichettaCategoriaGuida, getGuida } from "@/lib/guides";
import { getTool, etichettaCategoriaTool } from "@/lib/tools";
import { Briciole, Iscrizione, Marchio } from "@/components/hub/pezzi";
import { HUB_URL, SITO_URL, VIA, dataEstesa } from "@/lib/hub";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIDE.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuida(slug);
  if (!g) return { title: "Guida non trovata — ELEVIACOM Hub" };
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
    },
  };
}

export default async function SchedaGuida({ params }: Props) {
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

      <div className="hub-larghezza">
        <Briciole
          voci={[
            { label: "Guide", href: VIA.guide },
            { label: etichettaCategoriaGuida(g.category), href: VIA.guide },
            { label: g.title.length > 38 ? `${g.title.slice(0, 38)}…` : g.title },
          ]}
        />

        <div className="hub-doppia" style={{ paddingBlock: "44px 72px" }}>
          <article>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: 18 }}>
              <span className="hub-mono hub-mono-accento">{etichettaCategoriaGuida(g.category)}</span>
              <span className="hub-mono">{ETICHETTE_DIFFICOLTA[g.difficulty]}</span>
              <span className="hub-mono">{g.minutes} minuti</span>
              <span className="hub-mono">{g.steps.length} passi</span>
            </div>

            <h1 className="hub-titolo" style={{ fontSize: "clamp(2.1rem, 4.7vw, 3.5rem)" }}>
              {g.title}
            </h1>
            <p className="hub-sommario">{g.description}</p>

            <div className="hub-prosa" style={{ marginTop: 34 }}>
              <p>{g.intro}</p>
            </div>

            <section
              style={{
                marginTop: 34,
                paddingBlock: 20,
                borderTop: "1px solid var(--filetto-forte)",
                borderBottom: "1px solid var(--filetto-forte)",
              }}
            >
              <span className="hub-mono hub-mono-accento">Cosa ottieni</span>
              <p style={{ marginTop: 8, fontSize: 18, lineHeight: 1.5, maxWidth: "58ch" }}>{g.outcome}</p>
            </section>

            <section style={{ marginTop: 40 }}>
              <h2 className="hub-mono hub-mono-nero" style={{ marginBottom: 4 }}>
                Cosa serve prima di iniziare
              </h2>
              <ul className="hub-lista-filetti">
                {g.requirements.map((r, i) => (
                  <li key={i}>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section style={{ marginTop: 52 }}>
              <h2 className="hub-sezione-titolo" style={{ marginBottom: 20 }}>
                I passi
              </h2>
              <div className="hub-passi">
                {g.steps.map((p, i) => (
                  <div key={i} id={`passo-${i + 1}`} className="hub-passo" style={{ scrollMarginTop: 74 }}>
                    <span className="hub-passo-num" aria-hidden="true" />
                    <div>
                      <h3>{p.titolo}</h3>
                      <p>{p.testo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {g.faq.length > 0 && (
              <section style={{ marginTop: 52 }}>
                <h2 className="hub-sezione-titolo" style={{ marginBottom: 8 }}>
                  Domande frequenti
                </h2>
                {g.faq.map((f, i) => (
                  <details key={i} className="hub-dettagli" open={i === 0}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </section>
            )}

            <section
              style={{ marginTop: 52, paddingTop: 26, borderTop: "1px solid var(--filetto-forte)" }}
            >
              <span className="hub-mono hub-mono-accento">ELEVIACOM</span>
              <p style={{ marginTop: 10, fontSize: 18, lineHeight: 1.5, maxWidth: "48ch" }}>
                Se preferisci che questo flusso venga costruito, collaudato e mantenuto da qualcuno, è
                esattamente quello che facciamo.
              </p>
              <a href={`${SITO_URL}/consulenza`} className="hub-bottone" style={{ marginTop: 20 }}>
                Richiedi una consulenza
              </a>
            </section>
          </article>

          {/* ── Scheda tecnica ─────────────────────────────────── */}
          <aside>
            <div style={{ position: "sticky", top: 74 }}>
              <div className="hub-riquadro">
                <span className="hub-mono hub-mono-nero">Tool usati</span>
                <ul style={{ marginTop: 12 }}>
                  {strumenti.map((t) => (
                    <li key={t.slug} style={{ borderBottom: "1px solid var(--filetto)", paddingBlock: 10 }}>
                      <Link href={VIA.scheda(t.slug)} style={{ display: "flex", gap: 11, alignItems: "baseline" }}>
                        <span style={{ display: "inline-flex", width: 15, height: 15, flex: "none" }}>
                          <Marchio slug={t.slug} titolo={t.name} />
                        </span>
                        <span>
                          <span style={{ display: "block", fontSize: 15.5 }}>{t.name}</span>
                          <span className="hub-tool-cat">{etichettaCategoriaTool(t.categories[0])}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hub-riquadro hub-riquadro--carta" style={{ marginTop: 18 }}>
                <ul className="hub-indice">
                  <li>
                    <span className="hub-mono">Difficoltà</span>
                    <span>{ETICHETTE_DIFFICOLTA[g.difficulty]}</span>
                  </li>
                  <li>
                    <span className="hub-mono">Tempo</span>
                    <span>{g.minutes} min</span>
                  </li>
                  <li>
                    <span className="hub-mono">Pubblicata</span>
                    <span style={{ fontSize: 14 }}>{dataEstesa(g.publishedAt)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {correlate.length > 0 && (
          <section style={{ paddingBottom: 56 }}>
            <h2 className="hub-sezione-titolo" style={{ paddingBottom: 14, borderBottom: "1px solid var(--filetto-forte)" }}>
              Guide collegate
            </h2>
            <div className="hub-elenco" style={{ borderTop: 0 }}>
              {correlate.map((c, i) => (
                <Link key={c.slug} href={VIA.guida(c.slug)} className="hub-riga">
                  <span className="hub-riga-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="hub-riga-titolo" style={{ fontSize: "1.15rem" }}>
                      {c.title}
                    </h3>
                    <p className="hub-riga-testo">{c.description}</p>
                  </div>
                  <div className="hub-riga-meta">
                    <span className="hub-mono hub-mono-accento">{etichettaCategoriaGuida(c.category)}</span>
                    <span className="hub-mono">{c.minutes} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ paddingBottom: 24 }}>
          <Iscrizione compatta />
        </section>
      </div>
    </main>
  );
}
