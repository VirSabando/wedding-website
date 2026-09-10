import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const MAX_POSTS = 5;
const EXCERPT_MAX_LENGTH = 150;
const DEFAULT_MEDIUM_FEED_URL = 'https://medium.com/feed/@virsabando';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = resolve(__dirname, '../src/content/medium-posts.json');

function ensureArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function stripHtml(html = '') {
  const text = String(html)
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

function toShortExcerpt(rawText) {
  const clean = stripHtml(rawText);
  if (!clean) return '';
  if (clean.length <= EXCERPT_MAX_LENGTH) return clean;

  const trimmed = clean.slice(0, EXCERPT_MAX_LENGTH - 1);
  const lastSpace = trimmed.lastIndexOf(' ');
  const safe = lastSpace > 80 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${safe}...`;
}

function toCanonicalUrl(url) {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete('source');
    return parsed.toString();
  } catch {
    return url;
  }
}

function toIsoDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function extractFirstImageUrl(rawHtml = '') {
  const html = String(rawHtml);
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  const src = match?.[1]?.trim();
  if (!src) return null;

  try {
    return new URL(src).toString();
  } catch {
    return null;
  }
}

function toPostId(link, guid, publishedAt) {
  const raw = `${link}|${guid ?? ''}|${publishedAt ?? ''}`;
  return createHash('sha1').update(raw).digest('hex').slice(0, 12);
}

function normalizeItem(item) {
  const title = stripHtml(item?.title ?? '');
  const rawUrl = item?.link ?? '';
  const url = toCanonicalUrl(rawUrl);
  const publishedAt = toIsoDate(item?.pubDate ?? item?.['dc:date'] ?? item?.published ?? '');

  const rawExcerpt =
    item?.description ??
    item?.['content:encoded'] ??
    item?.content ??
    '';

  const excerpt = toShortExcerpt(rawExcerpt);
  const thumbnail = extractFirstImageUrl(rawExcerpt);

  if (!title || !url) return null;

  return {
    id: toPostId(url, item?.guid, publishedAt),
    title,
    url,
    thumbnail,
    excerpt,
    publishedAt,
  };
}

async function fetchFeed(feedUrl) {
  const response = await fetch(feedUrl, {
    headers: {
      'user-agent': 'vs-website-medium-sync/1.0',
      accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed (${response.status} ${response.statusText})`);
  }

  return response.text();
}

function parseRss(xml) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    processEntities: true,
  });

  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel) {
    throw new Error('Invalid Medium RSS format: <channel> not found.');
  }

  return ensureArray(channel.item);
}

function sortByNewest(posts) {
  return [...posts].sort((a, b) => {
    const dateA = a.publishedAt ? Date.parse(a.publishedAt) : 0;
    const dateB = b.publishedAt ? Date.parse(b.publishedAt) : 0;
    return dateB - dateA;
  });
}

function dedupeByUrl(posts) {
  const seen = new Set();
  const unique = [];

  for (const post of posts) {
    if (seen.has(post.url)) continue;
    seen.add(post.url);
    unique.push(post);
  }

  return unique;
}

function writeIfChanged(filePath, nextData) {
  const nextJson = `${JSON.stringify(nextData, null, 2)}\n`;

  let currentJson = null;
  try {
    currentJson = readFileSync(filePath, 'utf8');
  } catch {
    currentJson = null;
  }

  if (currentJson === nextJson) {
    return false;
  }

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, nextJson, 'utf8');
  return true;
}

async function main() {
  const feedUrl = process.env.MEDIUM_FEED_URL?.trim() || DEFAULT_MEDIUM_FEED_URL;
  const xml = await fetchFeed(feedUrl);
  const items = parseRss(xml);

  const normalized = items
    .map(normalizeItem)
    .filter(Boolean);

  const posts = sortByNewest(dedupeByUrl(normalized)).slice(0, MAX_POSTS);

  const didWrite = writeIfChanged(outputPath, posts);

  if (didWrite) {
    console.log(`Updated ${posts.length} Medium posts from ${feedUrl}`);
  } else {
    console.log('No Medium post changes detected.');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
