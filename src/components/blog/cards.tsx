import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { formatDate, isoDay } from "@/lib/blog";
import { CATEGORIE_ARTICOLI, etichetta } from "@/lib/taxonomy";
import type { Guida } from "@/lib/guides";
import { etichettaCategoriaGuida, ETICHETTE_DIFFICOLTA } from "@/lib/guides";
import type { Tool } from "@/lib/tools";
import { ETICHETTE_PREZZO, etichettaCategoriaTool, logoTool } from "@/lib/tools";

/* ── Elementi condivisi ─────────────────────────────────────────────── */

export function Pillola({ children, tono = "neutro" }: { children: React.ReactNode; tono?: "neutro" | "acceso" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] ${
        tono === "acceso"
          ? "bg-[#2a3238] text-neutral-200"
          : "border border-[var(--lettura-bordo)] text-[var(--lettura-tenue)]"
      }`}
    >
      {children}
    </span>
  );
}

export function TitoloSezione({
  occhiello,
  titolo,
  testo,
  href,
  hrefLabel,
}: {
  occhiello?: string;
  titolo: string;
  testo?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {occhiello && (
          <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--lettura-tenue)]">
            {occhiello}
          </p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--lettura-titolo)] md:text-[2rem]">
          {titolo}
        </h2>
        {testo && <p className="mt-3 leading-relaxed text-neutral-400">{testo}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group shrink-0 border-b border-neutral-700 pb-1 text-sm text-neutral-300 transition-colors hover:border-white hover:text-white"
        >
          {hrefLabel ?? "Vedi tutto"}{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      )}
    </div>
  );
}

const SCHEDA =
  "group flex flex-col overflow-hidden rounded-2xl border border-[var(--lettura-bordo)] lettura-superficie transition-all duration-300 hover:border-[#3d4750] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]";

/* ── Articolo ───────────────────────────────────────────────────────── */

export function ArticoloCard({ post, priorita = false }: { post: PostMeta; priorita?: boolean }) {
  return (
    <article className={SCHEDA}>
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        {post.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority={priorita}
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3">
            <Pillola>{etichetta(CATEGORIE_ARTICOLI, post.category)}</Pillola>
          </div>
          <h3 className="text-[17px] font-semibold leading-snug text-[var(--lettura-titolo)]">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">{post.description}</p>
          <div className="mt-4 flex items-center gap-2.5 pt-3 text-xs text-[var(--lettura-tenue)]">
            <span>{post.author}</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={isoDay(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ── Guida ──────────────────────────────────────────────────────────── */

export function GuidaCard({ guida }: { guida: Guida }) {
  return (
    <article className={SCHEDA}>
      <Link href={`/blog/guide/${guida.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={`/blog/guida/${guida.slug}.jpg`}
            alt={guida.title}
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Pillola>{etichettaCategoriaGuida(guida.category)}</Pillola>
            <span className="text-[11px] text-[var(--lettura-tenue)]">
              {ETICHETTE_DIFFICOLTA[guida.difficulty]} &middot; {guida.minutes} min
            </span>
          </div>
          <h3 className="text-[17px] font-semibold leading-snug text-[var(--lettura-titolo)]">{guida.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">{guida.description}</p>
          <div className="mt-auto flex items-center gap-1.5 pt-4">
            {guida.tools.slice(0, 4).map((s) => (
              <span key={s} className="relative h-6 w-6 overflow-hidden rounded-md ring-1 ring-white/10">
                <Image src={logoTool(s)} alt="" fill sizes="24px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ── Tool ───────────────────────────────────────────────────────────── */

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="group rounded-2xl border border-[var(--lettura-bordo)] lettura-superficie p-4 transition-all duration-300 hover:border-[#3d4750] hover:shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
      <Link href={`/blog/tool/${tool.slug}`} className="flex h-full gap-4">
        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10">
          <Image src={logoTool(tool.slug)} alt={`Logo ${tool.name}`} fill sizes="56px" className="object-cover" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[15px] font-semibold text-[var(--lettura-titolo)]">{tool.name}</span>
            <span className="shrink-0 text-[10.5px] uppercase tracking-[0.1em] text-[var(--lettura-tenue)]">
              {ETICHETTE_PREZZO[tool.pricing]}
            </span>
          </span>
          <span className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-neutral-400">{tool.tagline}</span>
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {tool.categories.slice(0, 2).map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--lettura-bordo)] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--lettura-tenue)]"
              >
                {etichettaCategoriaTool(c)}
              </span>
            ))}
          </span>
        </span>
      </Link>
    </article>
  );
}
