import Link from "next/link";

export type Briciola = { label: string; href?: string };

/** Percorso di navigazione, come su una directory: Blog / Tool / Coding / Codex */
export function Briciole({ voci }: { voci: Briciola[] }) {
  return (
    <nav aria-label="Percorso di navigazione">
      <ol className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--lettura-tenue)]">
        <li>
          <Link href="/" className="transition-colors hover:text-neutral-300">
            ELEVIACOM
          </Link>
        </li>
        {voci.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span aria-hidden="true" className="opacity-50">
              /
            </span>
            {v.href ? (
              <Link href={v.href} className="transition-colors hover:text-neutral-300">
                {v.label}
              </Link>
            ) : (
              <span className="text-neutral-400">{v.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
