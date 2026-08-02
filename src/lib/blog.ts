import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { supabase } from "@/lib/supabase";

export const SITE_URL = "https://www.eleviacom.space";

export type FaqItem = { question: string; answer: string };
export type Source = { title: string; url: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  /** Categoria editoriale: alimenta le schede di filtro dell'indice. */
  category: string;
  publishedAt: string;
  updatedAt: string;
  cover?: string;
  coverAlt?: string;
  metaTitle?: string;
  canonical?: string;
  keywords: string[];
  noindex: boolean;
  summary?: string;
  keyTakeaways: string[];
  faq: FaqItem[];
  sources: Source[];
  entities: string[];
  schemaType: string;
  readingMinutes: number;
};

export type TocItem = { id: string; text: string; level: 2 | 3 };
export type Post = PostMeta & { html: string; toc: TocItem[] };

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Aggiunge un id a ogni h2/h3 e restituisce l indice dei contenuti. */
function withHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_m, lvl: string, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let id = slugifyHeading(text) || `sezione-${toc.length + 1}`;
      let n = 2;
      while (used.has(id)) id = `${id}-${n++}`;
      used.add(id);
      toc.push({ id, text, level: Number(lvl) as 2 | 3 });
      return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
    }
  );
  return { html: out, toc };
}

type Row = Record<string, unknown>;

function toMeta(r: Row): PostMeta {
  const body = String(r.body ?? "");
  return {
    slug: String(r.slug),
    title: String(r.title),
    description: String(r.description ?? ""),
    author: String(r.author ?? "ELEVIACOM"),
    tags: (r.tags as string[]) ?? [],
    category: String(r.category ?? "ai"),
    publishedAt: String(r.published_at ?? r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? r.published_at ?? ""),
    cover: (r.cover as string) ?? undefined,
    coverAlt: (r.cover_alt as string) ?? undefined,
    metaTitle: (r.meta_title as string) ?? undefined,
    canonical: (r.canonical as string) ?? undefined,
    keywords: (r.keywords as string[]) ?? [],
    noindex: Boolean(r.noindex),
    summary: (r.summary as string) ?? undefined,
    keyTakeaways: (r.key_takeaways as string[]) ?? [],
    faq: (r.faq as FaqItem[]) ?? [],
    sources: (r.sources as Source[]) ?? [],
    entities: (r.entities as string[]) ?? [],
    schemaType: String(r.schema_type ?? "BlogPosting"),
    readingMinutes: Math.max(1, Math.round(body.trim().split(/\s+/).length / 200)),
  };
}

export async function getAllPostsMeta(): Promise<PostMeta[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error || !data) return [];
  return data.map(toMeta);
}

export async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error || !data) return null;
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(String(data.body ?? ""));
  const { html, toc } = withHeadingIds(String(processed));
  return { ...toMeta(data), html, toc };
}

export async function getSiteConfig<T = unknown>(key: string): Promise<T | null> {
  const { data } = await supabase
    .from("site_config")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  return (data?.value as T) ?? null;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome",
  });
}

export function isoDay(iso: string): string {
  return iso ? new Date(iso).toISOString().slice(0, 10) : "";
}
