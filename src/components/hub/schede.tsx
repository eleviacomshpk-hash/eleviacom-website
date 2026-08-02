import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MARCHI } from "@/lib/marchi";
import type { PostMeta } from "@/lib/blog";
import type { Guida } from "@/lib/guides";
import type { Tool } from "@/lib/tools";
import { etichettaCategoriaGuida, ETICHETTE_DIFFICOLTA } from "@/lib/guides";
import { ETICHETTE_PREZZO, etichettaCategoriaTool, getTool } from "@/lib/tools";
import { CATEGORIE_ARTICOLI, etichetta } from "@/lib/taxonomy";
import { VIA, dataEstesa } from "@/lib/hub";

/* ── Marchio ufficiale, monocromatico ──────────────────────────────
   Da simple-icons (CC0). Dove il marchio non è ridistribuibile
   restano l'immagine del prodotto e il nome: nessun segno inventato. */

export function Marchio({ slug, nome, className }: { slug: string; nome: string; className?: string }) {
  const d = MARCHI[slug];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`Logo ${nome}`} className={cn("fill-current", className)}>
      <path d={d} />
    </svg>
  );
}

/* ── Etichetta di categoria ────────────────────────────────────── */

export function Etichetta({ children, tono = "neutro" }: { children: React.ReactNode; tono?: "neutro" | "primario" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide",
        tono === "primario" ? "bg-primary/15 text-[#8ab4f8]" : "bg-white/5 text-muted-foreground"
      )}
    >
      {children}
    </span>
  );
}

/* ── Intestazione di sezione, stessa scala della landing ───────── */

export function Sezione({
  titolo,
  testo,
  href,
  hrefLabel,
  children,
}: {
  titolo: string;
  testo?: string;
  href?: string;
  hrefLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">{titolo}</h2>
          {testo && <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{testo}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className="group shrink-0 text-sm font-medium text-primary transition-colors hover:text-[#6aa1f8]"
          >
            {hrefLabel ?? "Vedi tutto"}{" "}
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

/* ── Scheda articolo ───────────────────────────────────────────── */

export function SchedaArticolo({ post, priorita = false }: { post: PostMeta; priorita?: boolean }) {
  return (
    <Card className="h-full transition-colors hover:border-white/10">
      <Link href={VIA.articolo(post.slug)} className="flex h-full flex-col">
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority={priorita}
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
            />
          </div>
        )}
        <CardContent className="flex flex-1 flex-col p-5 pt-5">
          <div className="mb-3">
            <Etichetta tono="primario">{etichetta(CATEGORIE_ARTICOLI, post.category)}</Etichetta>
          </div>
          <h3 className="text-lg font-semibold leading-snug text-foreground">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
          <div className="mt-4 flex items-center gap-2 pt-3 text-xs text-muted">
            <span>{dataEstesa(post.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min di lettura</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

/* ── Scheda guida ──────────────────────────────────────────────── */

export function SchedaGuida({ guida }: { guida: Guida }) {
  const principale = guida.tools[0];
  return (
    <Card className="h-full transition-colors hover:border-white/10">
      <Link href={VIA.guida(guida.slug)} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5 bg-black">
          <Image
            src={`/blog/tool/${principale}.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top opacity-45 transition-transform duration-700 group-hover/card:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-card/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
            {guida.tools.slice(0, 4).map((s) => {
              const t = getTool(s);
              if (!t) return null;
              return (
                <span
                  key={s}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 backdrop-blur-sm"
                  title={t.name}
                >
                  <Marchio slug={s} nome={t.name} className="h-3.5 w-3.5 text-foreground" />
                  {!MARCHI[s] && (
                    <span className="text-[10px] font-semibold text-foreground">{t.name.slice(0, 2)}</span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col p-5 pt-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Etichetta tono="primario">{etichettaCategoriaGuida(guida.category)}</Etichetta>
            <span className="text-xs text-muted">
              {ETICHETTE_DIFFICOLTA[guida.difficulty]} · {guida.minutes} min
            </span>
          </div>
          <h3 className="text-lg font-semibold leading-snug text-foreground">{guida.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{guida.description}</p>
          <p className="mt-auto pt-4 text-xs text-muted">
            {guida.tools.map((s) => getTool(s)?.name ?? s).join(" · ")}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

/* ── Scheda tool ───────────────────────────────────────────────── */

export function SchedaTool({ tool }: { tool: Tool }) {
  return (
    <Card className="h-full transition-colors hover:border-white/10">
      <Link href={VIA.scheda(tool.slug)} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5 bg-black">
          <Image
            src={`/blog/tool/${tool.slug}.jpg`}
            alt={`Schermata di ${tool.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-top opacity-90 transition-transform duration-700 group-hover/card:scale-[1.04]"
          />
          {/* Le schermate reali hanno luminosita diverse: la velatura le riporta
              tutte sullo stesso registro scuro della pagina. */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-black/25" />
          <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/60 backdrop-blur">
              {MARCHI[tool.slug] ? (
                <Marchio slug={tool.slug} nome={tool.name} className="h-4 w-4 text-foreground" />
              ) : (
                <span className="text-[11px] font-semibold text-foreground">{tool.name.slice(0, 2)}</span>
              )}
            </span>
            <span className="truncate text-base font-semibold text-foreground">{tool.name}</span>
          </div>
        </div>
        <CardContent className="flex flex-1 flex-col p-5 pt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{tool.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
            <Etichetta>{etichettaCategoriaTool(tool.categories[0])}</Etichetta>
            <Etichetta>{ETICHETTE_PREZZO[tool.pricing]}</Etichetta>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

/* ── Riga compatta, per gli elenchi laterali ───────────────────── */

export function RigaTool({ tool }: { tool: Tool }) {
  return (
    <Link
      href={VIA.scheda(tool.slug)}
      className="flex items-center gap-3 rounded-lg border border-white/5 bg-card p-3 transition-colors hover:border-white/10 hover:bg-card-hover"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
        {MARCHI[tool.slug] ? (
          <Marchio slug={tool.slug} nome={tool.name} className="h-4 w-4 text-foreground" />
        ) : (
          <span className="text-[11px] font-semibold text-foreground">{tool.name.slice(0, 2)}</span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium text-foreground">{tool.name}</span>
        <span className="block truncate text-xs text-muted-foreground">{tool.tagline}</span>
      </span>
    </Link>
  );
}
