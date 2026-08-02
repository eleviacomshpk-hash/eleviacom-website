import { NextResponse, type NextRequest } from "next/server";

/**
 * L'hub sta su hub.eleviacom.space e le sue route stanno sotto /blog nel
 * progetto Next. Qui si fanno due cose:
 *
 * 1. sul sottodominio, /qualcosa viene riscritto in /blog/qualcosa, così
 *    l'indirizzo che il visitatore vede resta pulito;
 * 2. sul dominio principale, i vecchi /blog/... vengono rimandati con un
 *    301 al sottodominio, perché l'hub abbia un solo indirizzo canonico.
 *
 * In sviluppo si apre hub.localhost:3000.
 */

const HUB = "https://hub.eleviacom.space";
const SEZIONI = new Set(["articoli", "guide", "tool"]);

function eSottodominioHub(host: string): boolean {
  return host.startsWith("hub.");
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase();
  const { pathname, search } = req.nextUrl;

  // I file con estensione sono risorse statiche: non si toccano mai.
  if (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith(".xml") && !pathname.endsWith(".txt")) {
    return NextResponse.next();
  }

  if (eSottodominioHub(host)) {
    // sitemap e robots del sottodominio hanno un contenuto proprio
    if (pathname === "/sitemap.xml") return riscrivi(req, "/hub-sitemap.xml");
    if (pathname === "/robots.txt") return riscrivi(req, "/hub-robots.txt");
    if (pathname === "/rss.xml") return riscrivi(req, "/blog/rss.xml");

    // già riscritto o richiesto a mano: riporta all'indirizzo pulito
    if (pathname === "/blog" || pathname.startsWith("/blog/")) {
      return NextResponse.redirect(new URL(`${HUB}${pubblico(pathname)}${search}`), 308);
    }

    return riscrivi(req, pathname === "/" ? "/blog" : `/blog${pathname}`);
  }

  // Dominio principale: l'hub ha traslocato.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return NextResponse.redirect(new URL(`${HUB}${pubblico(pathname)}${search}`), 301);
  }

  return NextResponse.next();
}

/** /blog/guide/x → /guide/x · /blog/<slug> → /articoli/<slug> · /blog → / */
function pubblico(pathname: string): string {
  const resto = pathname.replace(/^\/blog/, "");
  if (resto === "" || resto === "/") return "/";
  const primo = resto.split("/")[1] ?? "";
  if (SEZIONI.has(primo) || primo === "rss.xml") return resto;
  return `/articoli${resto}`;
}

function riscrivi(req: NextRequest, destinazione: string) {
  const url = req.nextUrl.clone();
  url.pathname = destinazione;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/).*)"],
};
