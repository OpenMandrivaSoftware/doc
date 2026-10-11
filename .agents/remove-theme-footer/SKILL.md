---
name: remove-theme-footer
description: The theme footer has been customized to remove the theme's default messages.
---
# Removing Default Theme Footer Messages

This document describes how to remove the default "This site uses Just the Docs..." message from both the sidebar (desktop) and mobile footer.

## Background

The Just the Docs theme includes a default footer message in two places:
1. **Sidebar** (`_includes/components/sidebar.html`) — desktop view
2. **Mobile footer** (`_includes/components/footer.html`) — bottom of page on mobile

Both reference `_includes/nav_footer_custom.html` and fall back to the default message when that file is empty.

## Solution

### 1. Create empty override for `nav_footer_custom.html`

Create an empty file at `_includes/nav_footer_custom.html`:
```bash
printf '' > _includes/nav_footer_custom.html
```

### 2. Override `sidebar.html` to conditionally render footer

Copy the theme's `sidebar.html` to your site's `_includes/components/sidebar.html` and modify the footer section:

**Before (theme default):**
```liquid
<div class="d-md-block d-none site-footer">
{% capture nav_footer_custom %}
  {%- include nav_footer_custom.html -%}
{% endcapture %}
{% if nav_footer_custom != "" %}
  {{ nav_footer_custom }}
{% else %}
  This site uses <a href="https://github.com/just-the-docs/just-the-docs">Just the Docs</a>, a documentation theme for Jekyll.
{% endif %}
</div>
```

**After (custom):**
```liquid
{% capture nav_footer_custom %}{% include nav_footer_custom.html %}{% endcapture %}
{% if nav_footer_custom != "" %}
  <div class="d-md-block d-none site-footer">
    {{ nav_footer_custom }}
  </div>
{% endif %}
```

Now the footer `<div>` only renders when `nav_footer_custom.html` has content.

### 3. Override `footer.html` for mobile

Copy the theme's `footer.html` to your site's `_includes/components/footer.html` and remove the fallback:

**Before (theme default):**
```liquid
<div class="d-md-none mt-4 fs-2">
  {% capture nav_footer_custom %}
    {%- include nav_footer_custom.html -%}
  {% endcapture %}
  {% if nav_footer_custom != "" %}
    {{ nav_footer_custom }}
  {% else %}
    This site uses <a href="https://github.com/just-the-docs/just-the-docs">Just the Docs</a>, a documentation theme for Jekyll.
  {% endif %}
</div>
```

**After (custom):**
```liquid
<div class="d-md-none mt-4 fs-2">
  {% capture nav_footer_custom %}
    {%- include nav_footer_custom.html -%}
  {% endcapture %}
  {% if nav_footer_custom != "" %}
    {{ nav_footer_custom }}
  {% endif %}
</div>
```

Now the mobile footer section only renders content when `nav_footer_custom.html` has content.

## Files Created

- `_includes/nav_footer_custom.html` — Empty file (or custom content if desired)
- `_includes/components/sidebar.html` — Override with conditional footer
- `_includes/components/footer.html` — Override with conditional mobile footer

## Adding Custom Footer Content

To add custom content (copyright, links, etc.), edit `_includes/nav_footer_custom.html`:

```html
<p>© 2025 My Project. <a href="https://github.com/my/project">Source code</a>.</p>
```

This will appear in both desktop sidebar and mobile footer.