"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import type { Guida } from "@/lib/guides";
import type { Tool } from "@/lib/tools";
import { ArticoloCard, GuidaCard, ToolCard } from "@/components/blog/cards";

/* ── Barra di schede scorrevole ─────────────────────────────────────── */

type Voce = { slug: string; label: string; count?: number };

function Schede({
  voci,
  attiva,
  onCambio,
}: {
  voci: Voce[];
  attiva: string;
  onCambio: (slug: string) => void;
}) {
  return (
    <div className="scrollbar-hide -mx-6 mb-7 overflow-x-auto px-6">
      <div className="flex w-max gap-2">
        {voci.map((v) => {
          const on = v.slug === attiva;
          return (
            <button
              key={v.slug}
              type="button"
              onClick={() => onCambio(v.slug)}
              aria-pressed={on}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                on
                  ? "border-transparent bg-[#eef2f5] font-medium text-[#15191c]"
                  : "border-[var(--lettura-bordo)] text-[var(--lettura-tenue)] hover:border-neutral-600 hover:text-neutral-300"
              }`}
            >
              {v.label}
              {typeof v.count === "number" && (
                <span className={`ml-1.5 text-[11px] ${on ? "text-[#5b6167]" : "opacity-60"}`}>{v.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Vuoto({ testo }: { testo: string }) {
  return (
    <p className="rounded-2xl border border-dashed border-[var(--lettura-bordo)] px-6 py-12 text-center text-sm text-[var(--lettura-tenue)]">
      {testo}
    </p>
  );
}

/* ── Articoli ───────────────────────────────────────────────────────── */

export function ListaArticoli({
  posts,
  categorie,
  limite,
}: {
  posts: PostMeta[];
  categorie: Voce[];
  limite?: number;
}) {
  const [attiva, setAttiva] = useState("tutti");
  const voci: Voce[] = [{ slug: "tutti", label: "Tutti" }, ...categorie];

  const visibili = useMemo(() => {
    const f = attiva === "tutti" ? posts : posts.filter((p) => p.category === attiva);
    return limite ? f.slice(0, limite) : f;
  }, [posts, attiva, limite]);

  return (
    <div>
      <Schede voci={voci} attiva={attiva} onCambio={setAttiva} />
      {visibili.length === 0 ? (
        <Vuoto testo="Nessun articolo in questa categoria, per ora." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibili.map((p, i) => (
            <ArticoloCard key={p.slug} post={p} priorita={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Guide ──────────────────────────────────────────────────────────── */

export function ListaGuide({
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
      <Schede voci={voci} attiva={attiva} onCambio={setAttiva} />
      {visibili.length === 0 ? (
        <Vuoto testo="Nessuna guida in questa categoria, per ora." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibili.map((g) => (
            <GuidaCard key={g.slug} guida={g} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tool ───────────────────────────────────────────────────────────── */

type Ordine = "popolari" | "nome" | "recenti";

export function ListaTool({
  tools,
  categorie,
  limite,
  conOrdinamento = false,
}: {
  tools: Tool[];
  categorie: Voce[];
  limite?: number;
  conOrdinamento?: boolean;
}) {
  const [attiva, setAttiva] = useState("popolari");
  const [ordine, setOrdine] = useState<Ordine>("popolari");
  const voci: Voce[] = [
    { slug: "popolari", label: "Più popolari" },
    { slug: "tutti", label: "Tutti" },
    ...categorie,
  ];

  const visibili = useMemo(() => {
    let f =
      attiva === "popolari" || attiva === "tutti"
        ? [...tools]
        : tools.filter((t) => t.categories.includes(attiva));

    if (attiva === "tutti" && ordine === "popolari") f.sort((a, b) => a.name.localeCompare(b.name, "it"));
    else if (ordine === "nome") f.sort((a, b) => a.name.localeCompare(b.name, "it"));
    else f.sort((a, b) => b.popularity - a.popularity);

    if (limite) f = f.slice(0, limite);
    return f;
  }, [tools, attiva, ordine, limite]);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Schede voci={voci} attiva={attiva} onCambio={setAttiva} />
        </div>
        {conOrdinamento && (
          <label className="mb-7 flex shrink-0 items-center gap-2 text-[13px] text-[var(--lettura-tenue)]">
            <span className="sr-only">Ordina i tool</span>
            <select
              value={ordine}
              onChange={(e) => setOrdine(e.target.value as Ordine)}
              className="rounded-full border border-[var(--lettura-bordo)] bg-transparent px-3 py-1.5 text-[13px] text-neutral-300 outline-none focus:border-neutral-500"
            >
              <option value="popolari">Più popolari</option>
              <option value="nome">Nome (A-Z)</option>
            </select>
          </label>
        )}
      </div>

      {visibili.length === 0 ? (
        <Vuoto testo="Nessun tool in questa categoria, per ora." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibili.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
