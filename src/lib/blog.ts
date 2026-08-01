import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const SITE_URL = "https://www.eleviacom.space";
export const BLOG_NAME = "Blog ELEVIACOM";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function listFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
}

function parse(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const meta: PostMeta = {
    slug: String(data.slug || file.replace(/\.md$/, "")),
    title: String(data.title || "Senza titolo"),
    description: String(data.description || ""),
    date: String(data.date || new Date().toISOString().slice(0, 10)),
    updated: data.updated ? String(data.updated) : undefined,
    author: String(data.author || "ELEVIACOM"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
  return { meta, content };
}

export function getAllPostsMeta(): PostMeta[] {
  return listFiles()
    .map((f) => parse(f).meta)
    .filter((m) => !m.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = listFiles().find((f) => parse(f).meta.slug === slug);
  if (!file) return null;
  const { meta, content } = parse(file);
  if (meta.draft) return null;
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return { ...meta, html: String(processed) };
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("it-IT", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });
}
