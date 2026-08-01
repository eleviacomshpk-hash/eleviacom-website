import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function autorizzato(req: NextRequest): boolean {
  const atteso = process.env.CMS_API_TOKEN;
  if (!atteso) return false;
  const header = req.headers.get("authorization") ?? "";
  return header === `Bearer ${atteso}`;
}

export async function POST(req: NextRequest) {
  if (!autorizzato(req))
    return NextResponse.json({ errore: "non autorizzato" }, { status: 401 });

  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = typeof body?.slug === "string" ? body.slug : undefined;
  } catch {
    /* corpo vuoto: rigenera solo le pagine comuni */
  }

  const percorsi = ["/blog", "/sitemap.xml", "/llms", "/blog/rss.xml"];
  if (slug) percorsi.push(`/blog/${slug}`);
  percorsi.forEach((p) => revalidatePath(p));

  return NextResponse.json({ rigenerati: percorsi, ora: new Date().toISOString() });
}
