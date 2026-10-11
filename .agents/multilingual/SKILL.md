---
name: multilingual
description: This Jekyll-based site uses the jekyll-polyglot plugin to implement multilingual support. 
---
# Multilingual Implementation with jekyll-polyglot

This document describes the implementation of multilingual support using the `jekyll-polyglot` plugin.

## Overview

The site supports English (default) and French languages using the `jekyll-polyglot` plugin. Non-default languages get their own subdirectory (`/fr/` for French); the default language remains at the root with `.en.html` suffix.

## Configuration

### Gemfile
```ruby
group :jekyll_plugins do
  gem 'jekyll-feed', '~> 0.12'
  gem 'jekyll-polyglot', '~> 1.8'
end
```

### _config.yml
```yaml
languages: ['en', 'fr']
default_lang: 'en'
exclude_from_localization: ['assets', 'images', 'js', 'css', 'scss', 'sass', 'vendor', 'index.html']
parallel_localization: false

plugins:
  - jekyll-feed
  - jekyll-polyglot
```

## Content Structure

**Source files are side-by-side** with language suffixes (e.g., `getting-started/index.en.md`, `getting-started/index.fr.md` in the same directory).

During build, `jekyll-polyglot` generates:
- **Default language (en)**: Output at root (e.g., `_site/getting-started/index.en.html`)
- **Non-default languages (fr)**: Output in language subdirectory (e.g., `_site/fr/getting-started/index.fr.html`)

Each file must include `lang: en` or `lang: fr` in front matter for the nav filter to work.

## Language Switcher

### Component: `_includes/components/lang_switcher.html`

A dropdown in the header that:
- Detects current language from `window.location.pathname`
- Constructs language URLs entirely in JavaScript to avoid `jekyll-polyglot` URL rewriting
- Supports any number of languages defined in `_config.yml`

### Key Features
- **Client-side URL construction**: Avoids `jekyll-polyglot` rewriting by building URLs in JavaScript
- **Automatic language detection**: From `window.location.pathname`
- **Dynamic href assignment**: Sets `href` attributes after page load
- **Dropdown UI**: Accessible dropdown with keyboard support

### JavaScript Logic
1. Detects current language from URL path (`/fr/` → French, else English)
2. Strips language prefix from current path
3. Builds target URLs:
   - English: clean path (e.g., `/getting-started/`)
   - French: `/fr` + clean path (e.g., `/fr/getting-started/`)
4. Sets `href` attributes after DOM load
5. Updates UI to show current language

## Navigation

### Issue: Cached Nav
The theme's `sidebar.html` uses `{% include_cached components/site_nav.html %}` which caches the nav after the first build (English), showing English links on all languages.

### Fix: Override `_includes/components/sidebar.html`
```liquid
{% include components/site_nav.html %}
```
Removing `include_cached` ensures nav is rebuilt for each language.

### Fix: Override `_includes/components/nav/pages.html`
Filter pages by `page.lang` in the nav generation:
```liquid
{%- assign current_lang = page.lang | default: site.default_lang -%}
{%- assign filtered_pages = include.pages
      | where_exp: "item", "item.title != nil"
      | where_exp: "item", "item.lang == current_lang or item.lang == nil" -%}
```

### Result
- English pages show `/getting-started/`, `/about/`, `/`
- French pages show `/fr/getting-started/`, `/fr/about/`, `/fr/`

## Translated Content

### 1. Separate Markdown Files (Used)
Create `.en.md` and `.fr.md` files for each page with translated content in front matter and body.

### 2. Extensible Data Structure
Card/link URLs use a `base_url` in `_data/home_cards.yml` and language-specific URLs are constructed in templates:
- English: `/base_url/index.en.html` or `/base_url.en.html`
- French: `/fr/base_url/index.fr.html` or `/fr/base_url.fr.html`

Adding a new language only requires adding the language to `_config.yml` and creating `.lang.md` files — no data file changes needed.

## Files Created/Modified

### New Files
- `_includes/components/lang_switcher.html` — Language switcher component
- `_includes/components/sidebar.html` (override) — Removed `include_cached` from nav
- `_includes/components/nav/pages.html` (override) — Filters nav by `page.lang`
- `_includes/header_custom.html` — Includes language switcher
- `assets/js/lang-switcher.js` — Client-side language switcher logic

### Language-Specific Markdown Files
- `index.en.md`, `index.fr.md`
- `getting-started/index.en.md`, `getting-started/index.fr.md`
- `about.en.md`, `about.fr.md`

### Modified Files
- `Gemfile` — Added `jekyll-polyglot`
- `_config.yml` — Added polyglot configuration

## Usage

### Adding a New Language
1. Add language code to `languages` array in `_config.yml`
2. Create `{page}.{lang}.md` files for each page with `lang: {lang}` in front matter
3. Create `index.{lang}.md` with language-specific URL construction (prepend `/lang` and use `.lang.html` suffix)
4. Run `bundle exec jekyll build`

No data file changes needed — templates construct URLs from `base_url`.

### Testing
```bash
bundle exec jekyll build
# Check _site/ and _site/fr/ for generated files
bundle exec jekyll serve
# Visit http://localhost:4000/ (en) and http://localhost:4000/fr/ (fr)
```

## Known Issues

1. **Polyglot URL rewriting**: The plugin rewrites URLs in HTML output. Workaround: construct URLs in JavaScript.
2. **Cached nav**: Theme uses `include_cached` for nav. Fixed by overriding sidebar.
3. **Page metadata**: `page.url` and `page.dir` don't include language prefix. Use JavaScript URL detection.
4. **Language suffixes in URLs**: Generated URLs have `.en.html`/`.fr.html` suffixes. JavaScript handles this.

## Future Improvements

- Add hreflang tags for SEO
- Implement language-specific navigation order
- Add language prefix to default language URLs (`/en/` instead of root)