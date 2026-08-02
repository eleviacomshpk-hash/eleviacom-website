"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import type { Guida } from "@/lib/guides";
import type { Tool } from "@/lib/tools";
import { etichettaCategoriaGuida, ETICHETTE_DIFFICOLTA } from "@/lib/guides";
import { ETICHETTE_PREZZO, etichettaCategoriaTool, getTool } from "@/lib/tools";
import { CATEGORIE_ARTICOLI, etichetta } from "@/lib/taxonomy";
import { Marchio } from "@/components/hub/pezzi";
import { dataBreve, VIA } from "@/lib/hub";

type Voce = { slug: string; label: string; count?: number };

function Filtri({ voci, attiva, onCambio }: { voci: Voce[]; attiva: string; onCambio: (s: string) => void }) {
  return (
    <div className="hub-filtri">
      {voci.map((v) => (
        <button key={v.slug} type="button" aria-pressed={v.slug === attiva} onClick={() => onCambio(v.slug)}>
          {v.label}
          {typeof v.count === "number" && <sup>{v.count}</sup>}
        </button>
      ))}
    </div>
  );
}

function num(i: number) {
  return String(i + 1).padStart(2, "0");
}

/* ── Articoli ─────────────────────────────────────────────────────── */

export function ElencoArticoli({
  posts,
  categorie,
  limite,
  conLead = false,
}: {
  posts: PostMeta[];
  categorie: Voce[];
  limite?: number;
  conLead?: boolean;
}) {
  const [attiva, setAttiva] = useState("tutti");
  const voci: Voce[] = [{ slug: "tutti", label: "Tutti" }, ...categorie];

  const visibili = useMemo(() => {
    const f = attiva === "tutti" ? posts : posts.filter((p) => p.category === attiva);
    return limite ? f.slice(0, limite) : f;
  }, [posts, attiva, limite]);

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      <div className="hub-elenco">
        {visibili.map((p, i) => (
          <Link key={p.slug} href={VIA.articolo(p.slug)} className={`hub-riga${conLead && i === 0 ? " hub-riga--lead" : ""}`}>
            <span className="hub-riga-num">{num(i)}</span>
            <div>
              <h3 className="hub-riga-titolo">{p.title}</h3>
              <p className="hub-riga-testo">{p.description}</p>
            </div>
            <div className="hub-riga-meta">
              <span className="hub-mono hub-mono-accento">{etichetta(CATEGORIE_ARTICOLI, p.category)}</span>
              <span className="hub-mono">{dataBreve(p.publishedAt)}</span>
              <span className="hub-mono">{p.readingMinutes} min</span>
            </div>
          </Link>
        ))}
        {visibili.length === 0 && (
          <p className="hub-mono" style={{ paddingBlock: 40 }}>
            Nessun articolo in questa categoria.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Guide ────────────────────────────────────────────────────────── */

export function ElencoGuide({
  guide,
  categorie,
  limite,
}: {
  guide: Guida[];
  categorie: Voce[];
  limite?: number;
}) {
  const [attiva, setAttiva] = useState("tutte");
  const voci: Voce[] = [{ slug: "tutte", label: "Tutte" }, ...categorie];

  const visibili = useMemo(() => {
    const f = attiva === "tutte" ? guide : guide.filter((g) => g.categories.includes(attiva));
    return limite ? f.slice(0, limite) : f;
  }, [guide, attiva, limite]);

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      <div className="hub-elenco">
        {visibili.map((g, i) => (
          <Link key={g.slug} href={VIA.guida(g.slug)} className="hub-riga">
            <span className="hub-riga-num">{num(i)}</span>
            <div>
              <h3 className="hub-riga-titolo">{g.title}</h3>
              <p className="hub-riga-testo">{g.description}</p>
              <p className="hub-mono" style={{ marginTop: 9 }}>
                {g.tools.map((s) => getTool(s)?.name ?? s).join(" · ")}
              </p>
            </div>
            <div className="hub-riga-meta">
              <span className="hub-mono hub-mono-accento">{etichettaCategoriaGuida(g.category)}</span>
              <span className="hub-mono">{ETICHETTE_DIFFICOLTA[g.difficulty]}</span>
              <span className="hub-mono">{g.minutes} min</span>
            </div>
          </Link>
        ))}
        {visibili.length === 0 && (
          <p className="hub-mono" style={{ paddingBlock: 40 }}>
            Nessuna guida in questa categoria.
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Tool ─────────────────────────────────────────────────────────── */

export function ElencoTool({
  tools,
  categorie,
  limite,
  alfabetico = false,
}: {
  tools: Tool[];
  categorie: Voce[];
  limite?: number;
  alfabetico?: boolean;
}) {
  const [attiva, setAttiva] = useState(alfabetico ? "tutti" : "popolari");
  const voci: Voce[] = [
    { slug: "popolari", label: "Più usati" },
    { slug: "tutti", label: "Tutti", count: tools.length },
    ...categorie,
  ];

  const visibili = useMemo(() => {
    let f =
      attiva === "popolari" || attiva === "tutti" ? [...tools] : tools.filter((t) => t.categories.includes(attiva));
    if (attiva === "tutti") f.sort((a, b) => a.name.localeCompare(b.name, "it"));
    else f.sort((a, b) => b.popularity - a.popularity);
    if (limite) f = f.slice(0, limite);
    return f;
  }, [tools, attiva, limite]);

  const conLettere = attiva === "tutti";
  let letteraCorrente = "";

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      <div className="hub-elenco">
        {visibili.map((t) => {
          const l = t.name[0].toUpperCase();
          const nuova = conLettere && l !== letteraCorrente;
          if (nuova) letteraCorrente = l;
          return (
            <div key={t.slug}>
              {nuova && <div className="hub-lettera">{l}</div>}
              <Link href={VIA.scheda(t.slug)} className="hub-tool-riga">
                <Marchio slug={t.slug} titolo={t.name} />
                <span>
                  <span className="hub-tool-nome">{t.name}</span>
                  <span className="hub-tool-cat">{etichettaCategoriaTool(t.categories[0])}</span>
                </span>
                <span className="hub-tool-desc">{t.tagline}</span>
                <span className="hub-tool-coda hub-mono">{ETICHETTE_PREZZO[t.pricing]}</span>
              </Link>
            </div>
          );
        })}
        {visibili.length === 0 && (
          <p className="hub-mono" style={{ paddingBlock: 40 }}>
            Nessun tool in questa categoria.
          </p>
        )}
      </div>
    </div>
  );
}
