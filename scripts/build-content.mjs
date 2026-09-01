/**
 * Content build step — runs BEFORE vite (see package.json scripts).
 *
 * Parses three markdown collections, validates the bilingual pairing, and
 * emits the typed src/generated/content.ts module the route registry, SEO
 * registry, pages and prerenderer consume:
 *
 *   content/blog/{es,en}/<slug>.md      → POSTS  (/blog/…, /en/blog/…)
 *   content/learn/{es,en}/<slug>.md     → GUIDES (/guia/…, /en/guide/…)
 *   content/glossary/{es,en}/<slug>.md  → TERMS  (/glosario/…, /en/glossary/…)
 *
 * Shared frontmatter schema (the build FAILS on violations):
 *   title:          required — the page H1
 *   metaTitle:      optional — <title> override (defaults to title)
 *   description:    required, ≤160 chars — meta description
 *   slug:           required — path segment only, [a-z0-9-]
 *   translationKey: required — joins the es/en pair
 *   date:           required, YYYY-MM-DD — datePublished
 *   updated:        optional, YYYY-MM-DD — dateModified (defaults to date)
 *   author:         required — 'juan-camara' | 'omar-curi'
 *   tags:           optional string[] — drives related content
 *   ogImage:        optional — site-relative 1200×630 image
 *   draft:          optional — true excludes the file from the build
 * Glossary only:
 *   term:           required — display name of the defined term
 *                   (feeds DefinedTerm JSON-LD and the index listing)
 *
 * The first body paragraph is extracted as plain text (`answerText`) — it
 * feeds FAQPage/DefinedTerm structured data, so it must be self-contained.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = path.join(ROOT, 'src', 'generated', 'content.ts');

const AUTHOR_IDS = new Set(['juan-camara', 'omar-curi']);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const COLLECTIONS = [
  {
    name: 'POSTS',
    dir: 'blog',
    pathFor: (lang, slug) => (lang === 'es' ? `/blog/${slug}` : `/en/blog/${slug}`),
    requiresTerm: false,
  },
  {
    name: 'GUIDES',
    dir: 'learn',
    pathFor: (lang, slug) => (lang === 'es' ? `/guia/${slug}` : `/en/guide/${slug}`),
    requiresTerm: false,
  },
  {
    name: 'TERMS',
    dir: 'glossary',
    pathFor: (lang, slug) => (lang === 'es' ? `/glosario/${slug}` : `/en/glossary/${slug}`),
    requiresTerm: true,
  },
];

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

/**
 * Validation errors accumulate so one run reports every problem in the
 * content set, instead of failing on the first file and hiding the rest.
 * Anything that makes a file unparseable still throws immediately.
 */
const errors = [];
function fail(msg) {
  errors.push(msg);
}
function bail(msg) {
  console.error(`\n[build-content] ERROR: ${msg}\n`);
  process.exit(1);
}

function readingMinutes(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
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
    bail(`${filename}: markdown render failed — ${e.message}`);
  }
  const firstP = html.match(/<p>([\s\S]*?)<\/p>/);
  const answerText = firstP ? stripTags(firstP[1]) : '';
  return { html, toc, answerText };
}

function loadLang(collection, lang) {
  const dir = path.join(ROOT, 'content', collection.dir, lang);
  if (!fs.existsSync(dir)) return [];
  const records = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data: fm, content: md } = matter(raw);
    const name = `content/${collection.dir}/${lang}/${file}`;

    if (fm.draft === true) continue;
    for (const field of ['title', 'description', 'slug', 'translationKey', 'date', 'author']) {
      if (!fm[field]) fail(`${name}: missing required frontmatter field "${field}"`);
    }
    if (collection.requiresTerm && !fm.term)
      fail(`${name}: glossary entries require the "term" frontmatter field`);
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

    const { html, toc, answerText } = renderMarkdown(md, name);
    if (!answerText)
      fail(`${name}: body must start with a plain paragraph (it feeds structured data)`);
    records.push({
      lang,
      slug: fm.slug,
      translationKey: fm.translationKey,
      path: collection.pathFor(lang, fm.slug),
      altPath: null, // paired below
      title: fm.title,
      metaTitle: fm.metaTitle ?? fm.title,
      description: fm.description,
      term: fm.term ?? null,
      datePublished: date,
      updated,
      author: fm.author,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      ogImage: fm.ogImage ?? null,
      readingMinutes: readingMinutes(md),
      answerText,
      toc,
      html,
    });
  }
  return records;
}

function loadCollection(collection) {
  const es = loadLang(collection, 'es');
  const en = loadLang(collection, 'en');
  for (const list of [es, en]) {
    const slugs = new Set();
    for (const r of list) {
      if (slugs.has(r.slug)) fail(`duplicate ${collection.dir}/${r.lang} slug "${r.slug}"`);
      slugs.add(r.slug);
    }
  }
  // Pair by translationKey (explicit hreflang pairing — slugs are localized).
  const byKey = {
    es: new Map(es.map((r) => [r.translationKey, r])),
    en: new Map(en.map((r) => [r.translationKey, r])),
  };
  for (const r of es) {
    const pair = byKey.en.get(r.translationKey);
    if (pair) r.altPath = pair.path;
    else console.warn(`[build-content] WARN: ${collection.dir} ES "${r.slug}" has no EN pair (${r.translationKey})`);
  }
  for (const r of en) {
    const pair = byKey.es.get(r.translationKey);
    if (pair) r.altPath = pair.path;
    else console.warn(`[build-content] WARN: ${collection.dir} EN "${r.slug}" has no ES pair (${r.translationKey})`);
  }
  return [...es, ...en].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

const output = {};
const counts = [];
for (const collection of COLLECTIONS) {
  output[collection.name] = loadCollection(collection);
  const es = output[collection.name].filter((r) => r.lang === 'es').length;
  const en = output[collection.name].length - es;
  counts.push(`${collection.name} ${output[collection.name].length} (${es} es / ${en} en)`);
}

const header = `/**
 * AUTO-GENERATED by scripts/build-content.mjs — do not edit by hand.
 * Sources of truth: content/blog, content/learn, content/glossary.
 */

export interface TocEntry {
  id: string;
  text: string;
  level: number;
}

export interface ContentRecord {
  lang: 'es' | 'en';
  slug: string;
  translationKey: string;
  path: string;
  altPath: string | null;
  title: string;
  metaTitle: string;
  description: string;
  /** Glossary only: display name of the defined term. */
  term: string | null;
  datePublished: string;
  updated: string;
  author: 'juan-camara' | 'omar-curi';
  tags: string[];
  ogImage: string | null;
  readingMinutes: number;
  /** Plain text of the first body paragraph — feeds structured data. */
  answerText: string;
  toc: TocEntry[];
  html: string;
}

/** Back-compat alias (blog pages predate the multi-collection layer). */
export type BlogPost = ContentRecord;

`;

const body =
  `export const POSTS: ContentRecord[] = ${JSON.stringify(output.POSTS, null, 2)};\n\n` +
  `export const GUIDES: ContentRecord[] = ${JSON.stringify(output.GUIDES, null, 2)};\n\n` +
  `export const TERMS: ContentRecord[] = ${JSON.stringify(output.TERMS, null, 2)};\n`;

if (errors.length) {
  console.error(`\n[build-content] FAILED — ${errors.length} problem(s):\n`);
  for (const e of errors) console.error(`  \u2717 ${e}`);
  console.error();
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, header + body);
console.log(`[build-content] wrote ${counts.join(' · ')} → src/generated/content.ts`);
