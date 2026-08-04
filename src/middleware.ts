import { NextResponse, type NextRequest } from "next/server";

/**
 * Smistamento fra il sito e l'hub. Vedi src/lib/hub.ts per l'interruttore.
 *
 * Con NEXT_PUBLIC_HUB_ATTIVO = "1":
 *   hub.eleviacom.space/guide/x   → riscritto su /blog/guide/x
 *   www.eleviacom.space/blog/...  → 301 verso il sottodominio
 *
 * Senza l'interruttore (stato attuale):
 *   l'hub resta su www.eleviacom.space/blog e l'unico intervento è il 301
 *   dai vecchi indirizzi degli articoli, /blog/<slug> → /blog/articoli/<slug>.
 */

const ATTIVO = process.env.NEXT_PUBLIC_HUB_ATTIVO === "1";
const HUB = "https://hub.eleviacom.space";
const SEZIONI = new Set(["articoli", "guide", "tool", "rss.xml"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase();
  const { pathname, search } = req.nextUrl;

  // I file con estensione sono risorse statiche: non si toccano mai.
  if (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith(".xml") && !pathname.endsWith(".txt")) {
    return NextResponse.next();
  }

  const suHub = ATTIVO && host.startsWith("hub.");

  if (suHub) {
    if (pathname === "/sitemap.xml") return riscrivi(req, "/hub-sitemap.xml");
    if (pathname === "/robots.txt") return riscrivi(req, "/hub-robots.txt");
    if (pathname === "/rss.xml") return riscrivi(req, "/blog/rss.xml");
    if (pathname === "/llms.txt") return riscrivi(req, "/hub-llms.txt");

    // Richiesto a mano l'indirizzo interno: riporta a quello pulito.
    if (pathname === "/blog" || pathname.startsWith("/blog/")) {
      return NextResponse.redirect(new URL(`${HUB}${pulito(pathname)}${search}`), 308);
    }

    return riscrivi(req, pathname === "/" ? "/blog" : `/blog${pathname}`);
  }

  // Dominio principale.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    if (ATTIVO) {
      return NextResponse.redirect(new URL(`${HUB}${pulito(pathname)}${search}`), 301);
    }
    // Vecchio indirizzo di un articolo: ora sta sotto /blog/articoli/.
    const parti = pathname.split("/").filter(Boolean); // ["blog", "<slug>"]
    if (parti.length === 2 && !SEZIONI.has(parti[1])) {
      return NextResponse.redirect(new URL(`/blog/articoli/${parti[1]}${search}`, req.url), 301);
    }
  }

  return NextResponse.next();
}

/** /blog/guide/x → /guide/x · /blog/<slug> → /articoli/<slug> · /blog → / */
function pulito(pathname: string): string {
  const resto = pathname.replace(/^\/blog/, "");
  if (resto === "" || resto === "/") return "/";
  const primo = resto.split("/")[1] ?? "";
  return SEZIONI.has(primo) ? resto : `/articoli${resto}`;
}

function riscrivi(req: NextRequest, destinazione: string) {
  const url = req.nextUrl.clone();
  url.pathname = destinazione;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/).*)"],
};
