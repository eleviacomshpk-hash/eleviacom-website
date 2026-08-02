import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  TOOLS,
  ETICHETTE_PREZZO,
  categoriaPrincipale,
  etichettaCategoriaTool,
  getTool,
  toolSimili,
} from "@/lib/tools";
import { guidePerTool, etichettaCategoriaGuida, ETICHETTE_DIFFICOLTA } from "@/lib/guides";
import { Briciole, Marchio } from "@/components/hub/pezzi";
import { HUB_URL, SITO_URL, VIA } from "@/lib/hub";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTool(slug);
  if (!t) return { title: "Tool non trovato — ELEVIACOM Hub" };
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
    },
  };
}

function Blocco({ titolo, voci }: { titolo: string; voci: string[] }) {
  if (!voci.length) return null;
  return (
    <section style={{ marginTop: 44 }}>
      <h2 className="hub-mono hub-mono-nero" style={{ marginBottom: 4 }}>
        {titolo}
      </h2>
      <ul className="hub-lista-filetti">
        {voci.map((v, i) => (
          <li key={i}>
            <span>{v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SchedaTool({ params }: Props) {
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

      <div className="hub-larghezza">
        <Briciole
          voci={[
            { label: "Tool", href: VIA.tool },
            { label: etichettaCategoriaTool(principale), href: VIA.tool },
            { label: t.name },
          ]}
        />

        <div className="hub-doppia" style={{ paddingBlock: "44px 72px" }}>
          {/* ── Colonna di lettura ─────────────────────────────── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ display: "inline-flex", width: 22, height: 22 }}>
                <Marchio slug={t.slug} titolo={t.name} />
              </span>
              <span className="hub-mono hub-mono-accento">{etichettaCategoriaTool(principale)}</span>
            </div>

            <h1 className="hub-titolo" style={{ fontSize: "clamp(2.3rem, 5vw, 3.6rem)", marginTop: 14 }}>
              {t.name}
            </h1>
            <p className="hub-sommario" style={{ marginTop: 14 }}>
              {t.tagline}
            </p>

            <div className="hub-prosa" style={{ marginTop: 30 }}>
              <p>{t.description}</p>
            </div>

            <Blocco titolo="Funzioni principali" voci={t.features} />
            <Blocco titolo="A cosa serve in azienda" voci={t.useCases} />
            <Blocco titolo="Punti di forza" voci={t.pros} />
            <Blocco titolo="Limiti da conoscere" voci={t.cons} />

            {guide.length > 0 && (
              <section style={{ marginTop: 56 }}>
                <h2 className="hub-sezione-titolo" style={{ paddingBottom: 14, borderBottom: "1px solid var(--filetto-forte)" }}>
                  Guide che usano {t.name}
                </h2>
                <div className="hub-elenco" style={{ borderTop: 0 }}>
                  {guide.map((g, i) => (
                    <Link key={g.slug} href={VIA.guida(g.slug)} className="hub-riga">
                      <span className="hub-riga-num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="hub-riga-titolo" style={{ fontSize: "1.15rem" }}>
                          {g.title}
                        </h3>
                        <p className="hub-riga-testo">{g.description}</p>
                      </div>
                      <div className="hub-riga-meta">
                        <span className="hub-mono hub-mono-accento">{etichettaCategoriaGuida(g.category)}</span>
                        <span className="hub-mono">{ETICHETTE_DIFFICOLTA[g.difficulty]}</span>
                        <span className="hub-mono">{g.minutes} min</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {simili.length > 0 && (
              <section style={{ marginTop: 56 }}>
                <h2 className="hub-sezione-titolo" style={{ paddingBottom: 14, borderBottom: "1px solid var(--filetto-forte)" }}>
                  Alternative da valutare
                </h2>
                <div className="hub-elenco" style={{ borderTop: 0 }}>
                  {simili.map((s) => (
                    <Link key={s.slug} href={VIA.scheda(s.slug)} className="hub-tool-riga">
                      <Marchio slug={s.slug} titolo={s.name} />
                      <span>
                        <span className="hub-tool-nome">{s.name}</span>
                        <span className="hub-tool-cat">{etichettaCategoriaTool(s.categories[0])}</span>
                      </span>
                      <span className="hub-tool-desc">{s.tagline}</span>
                      <span className="hub-tool-coda hub-mono">{ETICHETTE_PREZZO[s.pricing]}</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Scheda tecnica ─────────────────────────────────── */}
          <aside>
            <div style={{ position: "sticky", top: 74 }}>
              <div className="hub-riquadro">
                <span className="hub-mono hub-mono-nero">Scheda</span>
                <ul className="hub-indice" style={{ marginTop: 12 }}>
                  <li>
                    <span className="hub-mono">Categoria</span>
                    <span>{etichettaCategoriaTool(principale)}</span>
                  </li>
                  <li>
                    <span className="hub-mono">Prezzo</span>
                    <span>{ETICHETTE_PREZZO[t.pricing]}</span>
                  </li>
                </ul>
                {t.pricingNote && (
                  <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.45, color: "var(--inchiostro-tenue)" }}>
                    {t.pricingNote}
                  </p>
                )}
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="hub-bottone hub-bottone--pieno"
                  style={{ marginTop: 18, width: "100%", textAlign: "center" }}
                >
                  Vai a {t.name}
                </a>
                <p className="hub-mono" style={{ marginTop: 12, textTransform: "none", letterSpacing: 0, wordBreak: "break-all" }}>
                  {t.url.replace(/^https?:\/\//, "")}
                </p>
              </div>

              <div style={{ marginTop: 18 }}>
                <span className="hub-mono hub-mono-nero">Anche in</span>
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
                  {t.categories.slice(1).map((c) => (
                    <Link key={c} href={VIA.tool} className="hub-mono">
                      {etichettaCategoriaTool(c)}
                    </Link>
                  ))}
                </div>
              </div>

              <p className="hub-mono" style={{ marginTop: 26, textTransform: "none", letterSpacing: 0, lineHeight: 1.5 }}>
                Scheda redatta da{" "}
                <a href={SITO_URL} style={{ borderBottom: "1px solid var(--filetto)" }}>
                  ELEVIACOM
                </a>
                . Nessun rapporto commerciale con i fornitori citati.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
