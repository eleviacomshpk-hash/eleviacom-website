"use client";
import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

type Props = { items: TocItem[]; variant: "mobile" | "desktop" };

export function TableOfContents({ items, variant }: Props) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
    setOpen(false);
  };

  const list = (
    <ul className="space-y-2.5 text-sm">
      {items.map((i) => (
        <li key={i.id} className={i.level === 3 ? "pl-4" : ""}>
          <a
            href={`#${i.id}`}
            onClick={(e) => go(e, i.id)}
            className={
              "block border-l-2 pl-3 leading-snug transition-colors " +
              (active === i.id
                ? "border-primary text-white"
                : "border-transparent text-neutral-500 hover:text-neutral-300")
            }
          >
            {i.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (variant === "desktop") {
    return (
      <>
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-600">
          In questo articolo
        </p>
        <nav>{list}</nav>
      </>
    );
  }

  return (
    <div className="mb-10 rounded-lg border border-border bg-card xl:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Indice dell&apos;articolo
        </span>
        <span className={"text-neutral-500 transition-transform " + (open ? "rotate-180" : "")}>
          &#9662;
        </span>
      </button>
      {open && <div className="border-t border-border px-5 py-4">{list}</div>}
    </div>
  );
}
