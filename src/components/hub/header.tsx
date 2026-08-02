"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WordmarkIcon } from "@/components/ui/header-2";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useScroll } from "@/components/ui/use-scroll";
import { VIA, interno } from "@/lib/hub";

const VOCI = [
  { href: VIA.articoli, label: "Articoli" },
  { href: VIA.guide, label: "Guide" },
  { href: VIA.tool, label: "Tool" },
];

export function HubHeader() {
  const pathname = usePathname();
  const [aperto, setAperto] = useState(false);
  const scrolled = useScroll(10);

  const attiva = (href: string) => pathname.startsWith(interno(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || aperto
          ? "border-border bg-background/80 backdrop-blur-xl"
          : "border-transparent bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-4 md:px-6">
        <Link href={VIA.home} aria-label="ELEVIACOM Hub" className="shrink-0">
          <WordmarkIcon className="h-4 text-foreground" />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {VOCI.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                attiva(v.href)
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" className="hidden text-muted-foreground hover:text-foreground sm:inline-flex" asChild>
            <a href="https://www.eleviacom.space">Sito</a>
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
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
