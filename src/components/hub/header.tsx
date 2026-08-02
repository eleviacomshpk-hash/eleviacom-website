"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { MarchioEleviacom } from "@/components/hub/marchio-eleviacom";
import { SITO_URL, VIA } from "@/lib/hub";

const VOCI = [
  { href: VIA.articoli, sezione: "articoli", label: "Articoli" },
  { href: VIA.guide, sezione: "guide", label: "Guide" },
  { href: VIA.tool, sezione: "tool", label: "Tool" },
];

/**
 * La sezione corrente si ricava dal primo segmento del percorso, tolto
 * l'eventuale /blog. Confrontare con startsWith non funziona: sul
 * sottodominio il browser vede /tool mentre le route interne stanno
 * sotto /blog, e ogni voce risultava attiva.
 */
function sezioneCorrente(pathname: string): string {
  const segmenti = pathname.split("/").filter(Boolean);
  if (segmenti[0] === "blog") segmenti.shift();
  return segmenti[0] ?? "";
}

export function HubHeader() {
  const pathname = usePathname();
  const [aperto, setAperto] = useState(false);
  const scrolled = useScroll(10);
  const corrente = sezioneCorrente(pathname);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || aperto ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 md:px-6">
        <Link href={VIA.home} aria-label="ELEVIACOM Hub" className="shrink-0">
          <MarchioEleviacom sezione="Hub" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {VOCI.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              aria-current={corrente === v.sezione ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                corrente === v.sezione ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" className="hidden text-muted-foreground hover:text-foreground sm:inline-flex" asChild>
            <a href={SITO_URL}>Sito</a>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <a href="https://wa.me/393473596624" target="_blank" rel="noopener noreferrer">
              Prenota consulenza
            </a>
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setAperto((v) => !v)}
            aria-label="Apri il menu"
            aria-expanded={aperto}
            className="md:hidden"
          >
            <MenuToggleIcon open={aperto} className="size-5" duration={300} />
          </Button>
        </div>
      </div>

      {aperto && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <div className="grid gap-1">
            {VOCI.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                onClick={() => setAperto(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm transition-colors",
                  corrente === v.sezione
                    ? "bg-accent text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {v.label}
              </Link>
            ))}
          </div>
          <Button asChild className="mt-3 w-full">
            <a href="https://wa.me/393473596624" target="_blank" rel="noopener noreferrer">
              Prenota consulenza
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
