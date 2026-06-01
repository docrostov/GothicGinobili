import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { load } from 'cheerio';
import TurndownService from 'turndown';

// This file was a 1-time use JS file used to convert the 2nd generation of the GG site 
//   (a Pelican site, coded in Python) into an Astro site coded in JS. This was run via:

//        --- > node convert.mjs

// ... at which point this converted all of the Pelican posts in gg_pelican into native
//   markdown files that can be easily used within Astro. 

// I have deleted the package-lock.json, package.json, and node_modules that were
//   artifacts of this build process. But if for some odd reason this ever needs
//   to be run again, remember to clear those out.

const HTML_DIR = './gg_pelican/gothicginobili.com/var/www/html';
const OUT_DIR = './content/posts';

mkdirSync(OUT_DIR, { recursive: true });

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});

// Preserve iframes (embedded video etc) as raw HTML
td.addRule('iframe', {
  filter: 'iframe',
  replacement: (_content, node) => `\n\n${node.outerHTML}\n\n`,
});

// Strip empty tag-cloud divs
td.addRule('tag-cloud', {
  filter: (node) => node.classList?.contains('tag-cloud'),
  replacement: () => '',
});

const files = readdirSync(HTML_DIR).filter((f) => /^\d+\.html$/.test(f));
console.log(`Found ${files.length} post files`);

let ok = 0;
let errs = [];

for (const file of files) {
  const id = basename(file, '.html');
  const raw = readFileSync(join(HTML_DIR, file), 'utf8');
  const $ = load(raw);

  try {
    // Frontmatter fields from meta tags
    const title = $('meta[property="og:title"]').attr('content')?.trim() ?? '';
    const author = $('meta[name="author"]').attr('content')?.trim() ?? '';
    const dateRaw = $('meta[property="article:published_time"]').attr('content')?.trim() ?? '';
    const date = dateRaw ? dateRaw.slice(0, 19).replace('T', ' ') : '';
    const category = $('meta[property="article:section"]').attr('content')?.trim() ?? '';

    // Post body: first <div> inside <article class="single"> that is not header/tag-cloud
    const bodyDiv = $('article.single > div').not('.tag-cloud').first();
    const bodyHtml = bodyDiv.html() ?? '';
    const body = td.turndown(bodyHtml).trim();

    // Escape quotes in title for YAML safety
    const safeTitle = title.replace(/"/g, '\\"');

    const md = `---
title: "${safeTitle}"
author: "${author}"
date: "${date}"
category: "${category}"
postId: ${id}
slug: "${id}"
---

${body}
`;

    writeFileSync(join(OUT_DIR, `${id}.md`), md, 'utf8');
    ok++;
  } catch (e) {
    errs.push({ file, error: e.message });
  }
}

console.log(`Converted: ${ok}  Errors: ${errs.length}`);
if (errs.length) {
  console.error('Errors:', JSON.stringify(errs, null, 2));
}
