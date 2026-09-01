/**
 * Content build step — runs BEFORE vite (see package.json scripts).
 *
 * Parses content/blog/{es,en}/*.md (frontmatter + markdown), validates the
 * bilingual pairing, renders HTML with stable heading ids + a TOC, and
 * emits the typed src/generated/content.ts module that the route registry,
 * SEO registry, blog pages and prerenderer all consume.
 *
 * Frontmatter schema (validated here; the build fails on violations):
 *   title:          required — the post H1
 *   metaTitle:      optional — <title> override (defaults to title)
 *   description:    required, ≤160 chars — meta description
 *   slug:           required — path segment only, [a-z0-9-]
 *   translationKey: required — joins the es/en pair
 *   date:           required, YYYY-MM-DD — datePublished
 *   updated:        optional, YYYY-MM-DD — dateModified (defaults to date)
 *   author:         required — 'juan-camara' | 'omar-curi'
 *   tags:           optional string[] — drives related posts
 *   ogImage:        optional — site-relative 1200×630 image
 *   draft:          optional — true excludes the post from the build
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'content.ts');

const AUTHOR_IDS = new Set(['juan-camara', 'omar-curi']);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Deterministic, accent-stripping slugifier for heading ids. */
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

function fail(msg) {
  console.error(`\n[build-content] ERROR: ${msg}\n`);
  process.exit(1);
}

function readingMinutes(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function renderMarkdown(md, filename) {
  const toc = [];
  const seen = new Map();
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => t.text ?? t.raw ?? '').join('');
    let id = slugify(text);
    const n = seen.get(id) ?? 0;
    seen.set(id, n + 1);
    if (n > 0) id = `${id}-${n}`;
    if (depth === 2 || depth === 3) toc.push({ id, text, level: depth });
    const inline = marked.parseInline(tokens.map((t) => t.raw).join(''));
    return `<h${depth} id="${id}">${inline}</h${depth}>\n`;
  };
  let html;
  try {
    html = marked.parse(md, { renderer, async: false });
  } catch (e) {
    fail(`${filename}: markdown render failed — ${e.message}`);
  }
  return { html, toc };
}

function loadLang(lang) {
  const dir = path.join(CONTENT_DIR, lang);
  if (!fs.existsSync(dir)) return [];
  const posts = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, 'utf8');
    const { data: fm, content: md } = matter(raw);
    const name = `content/blog/${lang}/${file}`;

    if (fm.draft === true) continue;
    for (const field of ['title', 'description', 'slug', 'translationKey', 'date', 'author']) {
      if (!fm[field]) fail(`${name}: missing required frontmatter field "${field}"`);
    }
    if (!SLUG_RE.test(fm.slug)) fail(`${name}: slug "${fm.slug}" must match ${SLUG_RE}`);
    if (String(fm.description).length > 160)
      fail(`${name}: description is ${String(fm.description).length} chars (max 160)`);
    const date = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date);
    const updatedRaw = fm.updated ?? date;
    const updated =
      updatedRaw instanceof Date ? updatedRaw.toISOString().slice(0, 10) : String(updatedRaw);
    if (!DATE_RE.test(date)) fail(`${name}: date "${date}" must be YYYY-MM-DD`);
    if (!DATE_RE.test(updated)) fail(`${name}: updated "${updated}" must be YYYY-MM-DD`);
    if (!AUTHOR_IDS.has(fm.author))
      fail(`${name}: author "${fm.author}" must be one of ${[...AUTHOR_IDS].join(', ')}`);

    const { html, toc } = renderMarkdown(md, name);
    posts.push({
      lang,
      slug: fm.slug,
      translationKey: fm.translationKey,
      path: lang === 'es' ? `/blog/${fm.slug}` : `/en/blog/${fm.slug}`,
      altPath: null, // paired below
      title: fm.title,
      metaTitle: fm.metaTitle ?? fm.title,
      description: fm.description,
      datePublished: date,
      updated,
      author: fm.author,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      ogImage: fm.ogImage ?? null,
      readingMinutes: readingMinutes(md),
      toc,
      html,
    });
  }
  return posts;
}

const es = loadLang('es');
const en = loadLang('en');

for (const list of [es, en]) {
  const slugs = new Set();
  for (const p of list) {
    if (slugs.has(p.slug)) fail(`duplicate ${p.lang} slug "${p.slug}"`);
    slugs.add(p.slug);
  }
}

// Pair by translationKey (explicit hreflang pairing — slugs are localized).
const byKey = { es: new Map(es.map((p) => [p.translationKey, p])), en: new Map(en.map((p) => [p.translationKey, p])) };
for (const p of es) {
  const pair = byKey.en.get(p.translationKey);
  if (pair) p.altPath = pair.path;
  else console.warn(`[build-content] WARN: ES post "${p.slug}" has no EN pair (translationKey: ${p.translationKey})`);
}
for (const p of en) {
  const pair = byKey.es.get(p.translationKey);
  if (pair) p.altPath = pair.path;
  else console.warn(`[build-content] WARN: EN post "${p.slug}" has no ES pair (translationKey: ${p.translationKey})`);
}

const all = [...es, ...en].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

const header = `/**
 * AUTO-GENERATED by scripts/build-content.mjs — do not edit by hand.
 * Source of truth: content/blog/{es,en}/*.md
 */

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  lang: 'es' | 'en';
  slug: string;
  translationKey: string;
  path: string;
  altPath: string | null;
  title: string;
  metaTitle: string;
  description: string;
  datePublished: string;
  updated: string;
  author: 'juan-camara' | 'omar-curi';
  tags: string[];
  ogImage: string | null;
  readingMinutes: number;
  toc: TocEntry[];
  html: string;
}

export const POSTS: BlogPost[] = `;

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, header + JSON.stringify(all, null, 2) + ';\n');
console.log(`[build-content] wrote ${all.length} posts (${es.length} es / ${en.length} en) → src/generated/content.ts`);
