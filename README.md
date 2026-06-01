# Gothic Ginobili
Hello, dear reader! This is the GitHub repository where the Gothic Ginobili blog's code is stored. The actual site is on https://gothicginobili.com, but this features the actual code behind the blog. Historically, the blog started as a WordPress joint in the 2011-2016 period, went on hiatus, then got lost after an SQL table got dropped in a failed 2019 migration. I used Internet Archive to recover all the HTML, then put the blog up as a static site via a [Pelican](https://getpelican.com)-generated webpage. 

In 2026, the Spurs were good again, and I had the itch to write a bit. So I spent a weekend converting the Pelican site to Astro (as I use Astro for another site I run) and have now pushed the "new" Gothic Ginobili to a live webpage. Hooray! For development purposes, here are some important protocol to remember.

---

## Commands

Run from the `blog/` directory:

| Command           | Action                                                                 |
| :---------------- | :--------------------------------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:4321`                             |
| `npm run build`   | Build to `./dist/` and run Pagefind to generate the search index       |
| `npm run preview` | Serve the built `dist/` locally — use this to test search             |

> **Note:** The `/search` page requires a built index and won't work under `npm run dev`. Use `npm run build && npm run preview` to test it.

---

## Writing a new post

### 1. Pick a post ID

Posts use sequential numeric IDs. Legacy posts (imported from Pelican) run from roughly `1` to `7697`. New posts start at `10000`. Check `src/content/blog/2026/` (or whatever the current year folder is) to find the highest existing ID, then increment by one.

### 2. Create the file

New posts live in `src/content/blog/YYYY/` where `YYYY` is the current year:

```
src/content/blog/2026/10001.md
```

Use `.md` for standard Markdown.

### 3. Write the frontmatter

Every post needs this block at the top:

```yaml
---
title: "Your Post Title"
author: "Aaron McGuire"
date: 2026-06-01
category: "NBA"
postId: 10001
slug: "10001"
heroImage: "/images/2026/your-image.jpg"   # optional
heroImageCredit: "Photo by Someone"         # optional, appears below hero
---
```

- **`slug`** must match the filename (without `.md`) — this becomes the URL (`/10001.html`).
- **`category`** should match an existing category if possible. New categories auto-generate their own archive page at `/category/slug.html`.
- **`heroImage`** is a root-relative path to an image in `public/`. Omit the field entirely if you don't have one.

### 4. Add a hero image (optional)

Place the image in `public/images/YYYY/`:

```
public/images/2026/your-image.jpg
```

Then reference it in frontmatter as `/images/2026/your-image.jpg`. Any common format works (jpg, png, webp).

### 5. Write the post

Below the frontmatter, write standard Markdown. A few site-specific notes:

- **Internal links:** Use the post's slug path — `[Tim Duncan post](/4285.html)`.
- **Footnotes:** Supported. Use `[^1]` inline and `[^1]: footnote text` at the bottom.
- **Blockquotes:** `>` renders with a burgundy left border.
- **Figures with captions:** Use `<figure>` / `<figcaption>` HTML directly in the Markdown — this is fine in `.md` files.
- **Legacy images** (from old WordPress posts) reference `/wp-content/uploads/...` paths. These are served directly from the live server and don't exist in this repo.

### 6. Preview it

```sh
npm run dev
```

Navigate to `localhost:4321/10001.html`. The dev server hot-reloads on save.

---

## File & folder map

```
blog/
├── public/                        # Static assets served at site root
│   ├── favicon.ico / favicon.svg  # (currently unused — see BaseHead.astro)
│   ├── manu_transparent.png       # Logo / favicon
│   ├── astro-logo.svg             # Footer "Powered by Astro" icon
│   ├── bsky.svg                   # Bluesky icon in header
│   └── images/
│       ├── 2026/                  # Hero images for new posts
│       └── authors/               # Author headshots (webp/jpg/png)
│
├── src/
│   ├── components/
│   │   ├── BaseHead.astro         # <head> tag — meta, fonts, favicon
│   │   ├── Header.astro           # Sticky top nav
│   │   ├── Footer.astro           # Dark footer with copyright
│   │   ├── FormattedDate.astro    # Date formatting helper
│   │   └── HeaderLink.astro       # Nav link with active state
│   │
│   ├── content/
│   │   └── blog/
│   │       ├── legacy/            # 487 posts imported from Pelican (don't touch)
│   │       └── 2026/              # New posts — add a new YYYY/ folder each year
│   │
│   ├── data/
│   │   └── authors.ts             # Author bios, photos, and social links
│   │
│   ├── layouts/
│   │   └── BlogPost.astro         # Main post layout (hero, title, meta, prev/next nav)
│   │
│   ├── pages/
│   │   ├── index.astro            # Homepage (featured post + 3 recent cards)
│   │   ├── about.astro            # About page
│   │   ├── search.astro           # Pagefind search page
│   │   ├── [slug].astro           # Dynamic route — renders every post as /NNNN.html
│   │   ├── blog/
│   │   │   └── index.astro        # Archive — all posts grouped by year
│   │   ├── category/
│   │   │   └── [category].astro   # Per-category archive pages
│   │   ├── author/
│   │   │   └── [author].astro     # Per-author archive + bio pages
│   │   └── tags.astro             # All categories with post counts
│   │
│   ├── styles/
│   │   └── global.css             # CSS variables, typography, base element styles
│   │
│   └── content.config.ts          # Content collection schema (frontmatter types)
│
├── astro.config.mjs               # Astro config — site URL, integrations, build format
└── package.json                   # Scripts and dependencies
```

---

## Adding a new author

1. Add an entry to `src/data/authors.ts` with their slug, bio, photo path, and socials.
2. Place their photo in `public/images/authors/`.
3. The slug is the author's name lowercased, apostrophes stripped, spaces/punctuation replaced with hyphens. Example: `"Aaron McGuire"` → `"aaron-mcguire"`.
4. Their archive page at `/author/their-slug.html` generates automatically once they have a post.

---

## Adding a new static page

Create a `.astro` file in `src/pages/`. The filename becomes the URL:

- `src/pages/colophon.astro` → `/colophon`

For pages that should look like posts (with header, footer, prose styles), use the `BlogPost` layout. For standalone pages, import `Header` and `Footer` directly and write your own layout — see `tags.astro` as a simple example.

---

## Deploying

```sh
npm run build
```

This builds to `dist/` and runs Pagefind to index the site. The contents of `dist/` are what gets deployed. GitHub Actions handles FTP deployment to Lithium Hosting automatically on push to `main`.

> Search won't reflect new posts until after a full build and deploy — the index is generated at build time.

--- 

## Credits

This blog is maintained by Aaron McGuire (@docrostov). I am thankful for my good friend Samuel Gaus (@gausie) from the [Loathers](https://github.com/loathers) coding collective for his help originally learning the ropes with Astro. Claude Code was leveraged throughout this process to help convert GG to an Astro layout.