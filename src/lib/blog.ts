import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * File-system blog backed by markdown files in /content/blog/.
 * Frontmatter spec:
 *   title:    string  (required)
 *   date:     YYYY-MM-DD (required)
 *   excerpt:  string (required, ~150 chars)
 *   tags:     string[] (required)
 *   author:   string (defaults to "AnduBer collective")
 *   cover:    optional path to image in /public
 *   draft:    optional boolean — drafts are excluded outside dev
 */

export interface BlogFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  author?: string;
  cover?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  /** ISO-formatted date for sorting */
  isoDate: string;
  /** Pre-rendered HTML body */
  html: string;
  /** Original markdown body (post-frontmatter) */
  raw: string;
  /** Estimated reading time in minutes */
  readingMinutes: number;
  /** Headings for the in-post TOC */
  headings: BlogHeading[];
}

export interface BlogHeading {
  id: string;
  text: string;
  /** 2 = h2, 3 = h3 */
  level: 2 | 3;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

const isProduction = process.env.NODE_ENV === "production";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function estimateReadingMinutes(plainTextLength: number): number {
  // ~200 words/minute, ~5 chars/word
  const words = plainTextLength / 5;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Walk the markdown body and return h2/h3 headings (ATX-style: `## ...`).
 * Used to generate the in-post Table of Contents and inject id="…" anchors
 * into the rendered HTML.
 */
function extractHeadings(raw: string): { headings: BlogHeading[]; idMap: Record<string, string> } {
  const lines = raw.split("\n");
  const headings: BlogHeading[] = [];
  const idMap: Record<string, string> = {};
  const seen = new Set<string>();

  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length === 2 ? 2 : 3;
    let id = slugify(m[2]);
    let counter = 1;
    while (seen.has(id)) {
      id = `${slugify(m[2])}-${counter += 1}`;
    }
    seen.add(id);
    headings.push({ id, text: m[2], level: level as 2 | 3 });
    idMap[m[2]] = id;
  }

  return { headings, idMap };
}

/** Configure marked once. We hand it our own heading id so the TOC matches. */
function buildRenderer(idMap: Record<string, string>) {
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t: { raw?: string; text?: string }) => t.raw ?? t.text ?? "").join("");
    const id = idMap[text] ?? slugify(text);
    return `<h${depth} id="${id}">${text}</h${depth}>\n`;
  };
  return renderer;
}

function loadPostFromFile(filename: string): BlogPost {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const parsed = matter(fileContents);
  const fm = parsed.data as Partial<BlogFrontmatter>;

  if (!fm.title || !fm.date || !fm.excerpt || !Array.isArray(fm.tags)) {
    throw new Error(
      `Blog post ${filename} is missing required frontmatter (title, date, excerpt, tags)`
    );
  }

  const slug = filename.replace(/\.mdx?$/, "");
  const raw = parsed.content.trim();
  const { headings, idMap } = extractHeadings(raw);
  const html = marked.parse(raw, { renderer: buildRenderer(idMap), async: false }) as string;
  const plainText = raw.replace(/[#*_`>\-\[\]\(\)!]/g, "");

  return {
    slug,
    title: fm.title,
    date: fm.date,
    isoDate: new Date(fm.date).toISOString(),
    excerpt: fm.excerpt,
    tags: fm.tags,
    author: fm.author ?? "AnduBer collective",
    cover: fm.cover,
    draft: fm.draft ?? false,
    raw,
    html,
    readingMinutes: estimateReadingMinutes(plainText.length),
    headings,
  };
}

/** Returns all posts sorted newest-first. Drafts are excluded in production. */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map(loadPostFromFile)
    .filter((p) => !(p.draft && isProduction))
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Returns posts that share at least one tag with `post`, excluding `post` itself. */
export function getRelatedPosts(post: BlogPost, max = 3): BlogPost[] {
  const tagSet = new Set(post.tags);
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => tagSet.has(t)))
    .slice(0, max);
}

/** Set of all unique tags across all posts. */
export function getAllTags(): string[] {
  const tags: string[] = [];
  for (const p of getAllPosts()) {
    for (const t of p.tags) {
      if (!tags.includes(t)) tags.push(t);
    }
  }
  return tags.sort((a, b) => a.localeCompare(b));
}
