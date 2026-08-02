"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";
import type { Guida } from "@/lib/guides";
import type { Tool } from "@/lib/tools";
import { SchedaArticolo, SchedaGuida, SchedaTool } from "@/components/hub/schede";

type Voce = { slug: string; label: string; count?: number };

/** Filtri: pillole coerenti con i bottoni del sito, non chip colorati. */
function Filtri({ voci, attiva, onCambio }: { voci: Voce[]; attiva: string; onCambio: (s: string) => void }) {
  return (
    <div className="scrollbar-hide -mx-4 mb-7 overflow-x-auto px-4 md:mx-0 md:px-0">
      <div className="flex w-max gap-2">
        {voci.map((v) => {
          const on = v.slug === attiva;
          return (
            <button
              key={v.slug}
              type="button"
              aria-pressed={on}
              onClick={() => onCambio(v.slug)}
              className={cn(
                "whitespace-nowrap rounded-md border px-3 py-1.5 text-sm transition-colors",
                on
                  ? "border-primary/40 bg-primary/15 font-medium text-[#8ab4f8]"
                  : "border-border bg-transparent text-muted-foreground hover:border-white/20 hover:text-foreground"
              )}
            >
              {v.label}
              {typeof v.count === "number" && (
                <span className={cn("ml-1.5 text-xs", on ? "text-[#8ab4f8]/70" : "text-muted")}>{v.count}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const GRIGLIA = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5";

function Vuoto({ testo }: { testo: string }) {
  return (
    <p className="rounded-lg border border-dashed border-border px-6 py-14 text-center text-sm text-muted-foreground">
      {testo}
    </p>
  );
}

/* ── Articoli ─────────────────────────────────────────────────── */

export function ElencoArticoli({
  posts,
  categorie,
  limite,
}: {
  posts: PostMeta[];
  categorie: Voce[];
  limite?: number;
}) {
  const [attiva, setAttiva] = useState("tutti");
  const voci: Voce[] = [{ slug: "tutti", label: "Tutti", count: posts.length }, ...categorie];

  const visibili = useMemo(() => {
    const f = attiva === "tutti" ? posts : posts.filter((p) => p.category === attiva);
    return limite ? f.slice(0, limite) : f;
  }, [posts, attiva, limite]);

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      {visibili.length === 0 ? (
        <Vuoto testo="Nessun articolo in questa categoria." />
      ) : (
        <div className={GRIGLIA}>
          {visibili.map((p, i) => (
            <SchedaArticolo key={p.slug} post={p} priorita={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Guide ────────────────────────────────────────────────────── */

export function ElencoGuide({ guide, categorie, limite }: { guide: Guida[]; categorie: Voce[]; limite?: number }) {
  const [attiva, setAttiva] = useState("tutte");
  const voci: Voce[] = [{ slug: "tutte", label: "Tutte", count: guide.length }, ...categorie];

  const visibili = useMemo(() => {
    const f = attiva === "tutte" ? guide : guide.filter((g) => g.categories.includes(attiva));
    return limite ? f.slice(0, limite) : f;
  }, [guide, attiva, limite]);

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      {visibili.length === 0 ? (
        <Vuoto testo="Nessuna guida in questa categoria." />
      ) : (
        <div className={GRIGLIA}>
          {visibili.map((g) => (
            <SchedaGuida key={g.slug} guida={g} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tool ─────────────────────────────────────────────────────── */

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

  return (
    <div>
      <Filtri voci={voci} attiva={attiva} onCambio={setAttiva} />
      {visibili.length === 0 ? (
        <Vuoto testo="Nessun tool in questa categoria." />
      ) : (
        <div className={GRIGLIA}>
          {visibili.map((t) => (
            <SchedaTool key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
