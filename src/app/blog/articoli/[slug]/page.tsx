import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostsMeta, getPost, isoDay } from "@/lib/blog";
import { CATEGORIE_ARTICOLI, etichetta } from "@/lib/taxonomy";
import { Avanzamento } from "@/components/hub/avanzamento";
import { Briciole, Iscrizione } from "@/components/hub/pezzi";
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
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
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

      <div className="hub-larghezza">
        <Briciole
          voci={[
            { label: "Articoli", href: VIA.articoli },
            { label: etichetta(CATEGORIE_ARTICOLI, post.category), href: VIA.articoli },
            { label: post.title.length > 38 ? `${post.title.slice(0, 38)}…` : post.title },
          ]}
        />

        <div className="hub-doppia" style={{ paddingBlock: "44px 72px" }}>
          <article>
            <header>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginBottom: 18 }}>
                <span className="hub-mono hub-mono-accento">{etichetta(CATEGORIE_ARTICOLI, post.category)}</span>
                <span className="hub-mono">{dataEstesa(post.publishedAt)}</span>
                <span className="hub-mono">{post.readingMinutes} min di lettura</span>
              </div>

              <h1 className="hub-titolo" style={{ fontSize: "clamp(2.2rem, 5vw, 3.7rem)" }}>
                {post.title}
              </h1>
              <p className="hub-sommario">{post.description}</p>
            </header>

            {post.keyTakeaways.length > 0 && (
              <section
                style={{
                  marginTop: 34,
                  paddingBlock: 20,
                  borderTop: "1px solid var(--filetto-forte)",
                  borderBottom: "1px solid var(--filetto-forte)",
                }}
              >
                <span className="hub-mono hub-mono-accento">In sintesi</span>
                <ul className="hub-lista-filetti hub-lista-filetti--chiusa" style={{ marginTop: 10, borderTop: 0 }}>
                  {post.keyTakeaways.map((t, i) => (
                    <li key={i}>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="hub-articolo" style={{ marginTop: 40 }} dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.faq.length > 0 && (
              <section style={{ marginTop: 56 }}>
                <h2 className="hub-sezione-titolo" style={{ marginBottom: 8 }}>
                  Domande frequenti
                </h2>
                {post.faq.map((f, i) => (
                  <details key={i} className="hub-dettagli" open={i === 0}>
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </section>
            )}

            {post.sources.length > 0 && (
              <section style={{ marginTop: 48 }}>
                <h2 className="hub-mono hub-mono-nero" style={{ marginBottom: 4 }}>
                  Fonti
                </h2>
                <ul className="hub-lista-filetti">
                  {post.sources.map((s, i) => (
                    <li key={i}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        style={{ borderBottom: "1px solid var(--filetto)" }}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section style={{ marginTop: 52, paddingTop: 26, borderTop: "1px solid var(--filetto-forte)" }}>
              <span className="hub-mono hub-mono-accento">ELEVIACOM</span>
              <p style={{ marginTop: 10, fontSize: 18, lineHeight: 1.5, maxWidth: "48ch" }}>
                Progettiamo chatbot, automazioni e agenti AI su misura per PMI italiane. La prima
                valutazione è gratuita e finisce con un documento, non con un preventivo.
              </p>
              <a href={`${SITO_URL}/consulenza`} className="hub-bottone" style={{ marginTop: 20 }}>
                Richiedi una consulenza
              </a>
            </section>
          </article>

          {/* ── Indice e argomenti ─────────────────────────────── */}
          <aside>
            <div style={{ position: "sticky", top: 74 }}>
              {post.toc.length > 2 && (
                <nav aria-label="Indice dell'articolo">
                  <span className="hub-mono hub-mono-nero">In questo articolo</span>
                  <div className="hub-toc" style={{ marginTop: 12 }}>
                    {post.toc.map((v) => (
                      <a key={v.id} href={`#${v.id}`} data-livello={v.level}>
                        {v.text}
                      </a>
                    ))}
                  </div>
                </nav>
              )}

              {post.tags.length > 0 && (
                <div style={{ marginTop: 28 }}>
                  <span className="hub-mono hub-mono-nero">Argomenti</span>
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
                    {post.tags.map((t) => (
                      <span key={t} className="hub-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {correlati.length > 0 && (
          <section style={{ paddingBottom: 56 }}>
            <h2
              className="hub-sezione-titolo"
              style={{ paddingBottom: 14, borderBottom: "1px solid var(--filetto-forte)" }}
            >
              Continua a leggere
            </h2>
            <div className="hub-elenco" style={{ borderTop: 0 }}>
              {correlati.map((r, i) => (
                <Link key={r.slug} href={VIA.articolo(r.slug)} className="hub-riga">
                  <span className="hub-riga-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="hub-riga-titolo" style={{ fontSize: "1.15rem" }}>
                      {r.title}
                    </h3>
                    <p className="hub-riga-testo">{r.description}</p>
                  </div>
                  <div className="hub-riga-meta">
                    <span className="hub-mono hub-mono-accento">{etichetta(CATEGORIE_ARTICOLI, r.category)}</span>
                    <span className="hub-mono">{r.readingMinutes} min</span>
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
