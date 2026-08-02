"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { VIA } from "@/lib/hub";

const VOCI = [
  { href: VIA.articoli, label: "Articoli" },
  { href: VIA.guide, label: "Guide" },
  { href: VIA.tool, label: "Tool" },
];

/** Il pathname interno è /blog/...: lo confronto sulla coda. */
function attiva(pathname: string, href: string) {
  return pathname.replace(/^\/blog/, "").startsWith(href) ? "si" : "no";
}

export function Testata({ data }: { data: string }) {
  const pathname = usePathname();
  const [aperto, setAperto] = useState(false);

  return (
    <header className="hub-testata">
      <div className="hub-larghezza hub-testata-riga">
        <Link href={VIA.home} className="hub-marchio">
          Eleviacom <span>/</span> Hub
        </Link>

        <nav className="hub-nav">
          {VOCI.map((v) => (
            <Link key={v.href} href={v.href} data-attivo={attiva(pathname, v.href)}>
              {v.label}
            </Link>
          ))}
        </nav>

        <div className="hub-coda">
          <span className="hub-mono hub-data">{data}</span>
          <a className="hub-cta" href="https://www.eleviacom.space/consulenza">
            Consulenza
          </a>
          <button type="button" className="hub-menu-btn" aria-expanded={aperto} onClick={() => setAperto((v) => !v)}>
            {aperto ? "Chiudi" : "Menu"}
          </button>
        </div>
      </div>

      {aperto && (
        <div className="hub-larghezza hub-nav-mobile">
          {VOCI.map((v) => (
            <Link key={v.href} href={v.href} onClick={() => setAperto(false)}>
              {v.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
