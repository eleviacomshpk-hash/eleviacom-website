import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { validatePost, type PostInput } from "@/lib/validate-post";

export const dynamic = "force-dynamic";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function autorizzato(req: NextRequest): boolean {
  const atteso = process.env.CMS_API_TOKEN;
  if (!atteso) return false;
  return (req.headers.get("authorization") ?? "") === `Bearer ${atteso}`;
}

/** Elenco articoli con il referto di validazione di ciascuno. */
export async function GET(req: NextRequest) {
  if (!autorizzato(req)) return NextResponse.json({ errore: "non autorizzato" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ errore: "SUPABASE_SERVICE_ROLE_KEY non configurata" }, { status: 500 });

  const { data, error } = await db.from("posts").select("*").order("published_at", { ascending: false });
  if (error) return NextResponse.json({ errore: error.message }, { status: 500 });

  return NextResponse.json({
    totale: data.length,
    articoli: data.map((p) => ({
      slug: p.slug,
      titolo: p.title,
      stato: p.status,
      problemi: validatePost(p as PostInput, { publishing: p.status === "published" }),
    })),
  });
}

/** Crea o aggiorna un articolo, valida, e rigenera le pagine interessate. */
export async function POST(req: NextRequest) {
  if (!autorizzato(req)) return NextResponse.json({ errore: "non autorizzato" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ errore: "SUPABASE_SERVICE_ROLE_KEY non configurata" }, { status: 500 });

  let input: PostInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ errore: "JSON non valido" }, { status: 400 });
  }

  const pubblicando = input.status === "published";
  const problemi = validatePost(input, { publishing: pubblicando });
  const bloccanti = problemi.filter((p) => p.livello === "errore");
  if (bloccanti.length > 0)
    return NextResponse.json({ errore: "validazione fallita", problemi }, { status: 422 });

  const record: Record<string, unknown> = { ...input };
  if (pubblicando && !record.published_at) record.published_at = new Date().toISOString();

  const { data, error } = await db
    .from("posts")
    .upsert(record, { onConflict: "slug" })
    .select("slug, status, published_at")
    .single();
  if (error) return NextResponse.json({ errore: error.message }, { status: 500 });

  ["/blog", "/sitemap.xml", "/llms", "/blog/rss.xml", `/blog/${data.slug}`].forEach((p) => revalidatePath(p));

  return NextResponse.json({ salvato: data, avvisi: problemi.filter((p) => p.livello === "avviso") });
}
