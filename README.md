# OpenMandriva Documentation — Content Creator Guide

This guide explains how to author and manage content for the OpenMandriva documentation site.

---

## 1. Navigation (the `parent` directive)

The sidebar navigation is built automatically from your Markdown files. To nest a page under a parent, use the `parent` directive in the YAML headers:

```yaml
---
parent: Getting Started
---
```

- The value must match the **title** of the parent page exactly (not the filename).
- Top-level pages omit `parent` entirely.
- The nav is generated per-language (see `_includes/components/nav/pages.html`). A page only appears in the nav for the language declared in its `lang` field.

---

## 2. Ordering pages (the `nav_order` directive)

Control the order of sibling pages with `nav_order`:

```yaml
---
nav_order: 10
---
```

- Lower numbers appear first.
- Use increments of 10 (10, 20, 30…) so you can insert pages later without renumbering everything.
- Applies within each parent group.

---

## 3. Adding a new language

1. **Edit `_config.yml`**  
   Add the language code to the `languages` array:
   ```yaml
   languages: ['en', 'fr', 'de']
   ```

2. **Create language-specific Markdown files**  
   For every page, add a `.xx.md` file alongside the English version:
   ```
   getting-started/index.en.md
   getting-started/index.fr.md
   getting-started/index.de.md   # new
   ```

3. **Add `lang` to front matter**  
   Each file must declare its language:
   ```yaml
   ---
   lang: de
   ---
   ```

4. **Create a localized home page**  
   Add `index.de.md` at the site root with the same structure as `index.en.md` / `index.fr.md`.

5. **Build and test**
   ```bash
   bundle exec jekyll build
   bundle exec jekyll serve
   # Visit http://localhost:4000/de/
   ```

No data-file changes are needed — templates construct URLs from `base_url` automatically.

---

## 4. Linking to images and downloadable assets

Place assets in the `assets/` directory:

```
assets/
├── images/
│   └── screenshot.png
└── files/
    └── openmandriva-install-guide.pdf
```

Reference them in Markdown using **site-root-relative paths**:

```markdown
![Alt text](/assets/images/screenshot.png)

[Download the guide](/assets/files/openmandriva-install-guide.pdf)
```

- `assets/` is listed in `exclude_from_localization` in `_config.yml`, so the same files serve all languages.
- Do **not** use `../` or absolute URLs — they break when the site is built into language subdirectories (e.g., `/fr/`).

---

## 5. Building and deploying

### Prerequisites
- Ruby ≥ 3.0
- Bundler (`gem install bundler`)

### Local development
```bash
bundle install
bundle exec jekyll serve
# Site runs at http://localhost:4000
```

### Production build
```bash
bundle exec jekyll build
```

Output is written to `_site/`:
```
_site/
├── index.en.html          # English home page
├── getting-started/
│   └── index.en.html
├── fr/
│   ├── index.fr.html      # French home page
│   └── getting-started/
│       └── index.fr.html
├── assets/                # Copied as-is (images, CSS, JS, PDFs)
└── ...
```

### Deploy
Upload the **entire `_site/` directory** to your web server or static hosting (Netlify, GitHub Pages, Cloudflare Pages, etc.). Configure the host to serve `index.html` for directory requests.

> **Note:** The site uses `jekyll-polyglot`. Source files for languages (Markdown) are next to the default (en) files for easy maintenance. When deployed, English (default language) stays at the root; other languages live under `/fr/`, `/de/`, etc. Ensure your host preserves this structure.

---

## Quick reference: Required front matter

```yaml
---
layout: default
title: Page Title
nav_order: 10
parent: Parent Page Title   # omit for top-level
has_toc: true               # optional, enables right-sidebar TOC
lang: en                    # REQUIRED: en, fr, de, etc.
---
```

All content files live in the repo root or in subdirectories (e.g., `getting-started/`). Side-by-side language files (`.en.md`, `.fr.md`) go in the same folder.