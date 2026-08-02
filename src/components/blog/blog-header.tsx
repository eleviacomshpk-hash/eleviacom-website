"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const VOCI = [
  { href: "/blog", label: "Blog", exact: true },
  { href: "/blog/articoli", label: "Articoli" },
  { href: "/blog/guide", label: "Guide" },
  { href: "/blog/tool", label: "Tool" },
];

export function BlogHeader() {
  const pathname = usePathname();
  const [aperto, setAperto] = useState(false);

  const attivo = (v: (typeof VOCI)[number]) =>
    v.exact ? pathname === v.href : pathname.startsWith(v.href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--lettura-bordo)] bg-[var(--lettura-fondo)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link href="/" className="shrink-0 text-sm font-semibold tracking-[0.18em] text-[var(--lettura-titolo)]">
          ELEVIACOM
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {VOCI.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className={`text-sm transition-colors ${
                attivo(v)
                  ? "text-[var(--lettura-titolo)]"
                  : "text-[var(--lettura-tenue)] hover:text-neutral-300"
              }`}
            >
              {v.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/consulenza"
            className="hidden rounded-full border border-[var(--lettura-bordo)] px-4 py-1.5 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white sm:inline-block"
          >
            Consulenza gratuita
          </Link>
          <button
            type="button"
            onClick={() => setAperto((v) => !v)}
            aria-label="Apri il menu"
            aria-expanded={aperto}
            className="text-[var(--lettura-tenue)] transition-colors hover:text-white md:hidden"
          >
            <span aria-hidden="true" className="text-lg">
              {aperto ? "×" : "≡"}
            </span>
          </button>
        </div>
      </div>

      {aperto && (
        <nav className="border-t border-[var(--lettura-bordo)] px-6 py-3 md:hidden">
          {VOCI.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              onClick={() => setAperto(false)}
              className="block py-2 text-sm text-neutral-300"
            >
              {v.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
