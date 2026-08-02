"use client";

import { useEffect, useState } from "react";

/** Filetto di avanzamento sotto la testata, nel blu del sito. */
export function Avanzamento() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const misura = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.querySelector("article");
        if (!el) return;
        const inizio = (el as HTMLElement).offsetTop;
        const totale = (el as HTMLElement).offsetHeight - window.innerHeight * 0.6;
        const fatto = window.scrollY - inizio;
        setPct(Math.min(100, Math.max(0, (fatto / Math.max(totale, 1)) * 100)));
      });
    };
    misura();
    window.addEventListener("scroll", misura, { passive: true });
    window.addEventListener("resize", misura);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", misura);
      window.removeEventListener("resize", misura);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-16 z-40 h-0.5" aria-hidden="true">
      <div className="h-full bg-primary transition-[width] duration-150 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}
