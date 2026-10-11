---
name: layout
description: This Jekyll-based site uses the Just the Docs theme. The layout has been customized to take up the full width of the browser with a fixed sidebar. 
---
# Layout Customizations

This document describes custom modifications to the Just the Docs theme's default layout behavior.

## Changes

### Full-Width Content Area with Fixed Sidebar

**Problem**: The theme constrains the main content area to a fixed max-width (50rem) and centers it, leaving empty space on wide screens. The sidebar also expands its width at larger breakpoints (66.5rem+), pushing the divider line to the right.

**Solution**: Override Sass/CSS to:
1. Keep the sidebar at a fixed 16.5rem width at all breakpoints
2. Allow the main content area to expand to fill remaining browser width
3. Left-align sidebar navigation items (theme defaults to right-aligned within the sidebar column)

### Implementation

**File**: `_sass/custom/custom.scss`

```scss
/* Expand content area to full width, keeping sidebar on left */
@media (min-width: 50rem) {
  .side-bar + .main {
    margin-left: 16.5rem !important;
    max-width: none !important;
  }
}
@media (min-width: 66.5rem) {
  .side-bar + .main {
    margin-left: 16.5rem !important;
    max-width: none !important;
  }
}

/* Prevent sidebar from expanding at large screens */
@media (min-width: 66.5rem) {
  .side-bar {
    width: 16.5rem !important;
    min-width: 16.5rem !important;
  }
}

/* Left-align sidebar content (theme uses flex-end) */
@media (min-width: 50rem) {
  .side-bar {
    align-items: flex-start !important;
  }
}
```

### Home Page Cards: Fixed Two-Column Grid

**Problem**: The responsive `auto-fit` grid places all four cards in a single row on wide screens.

**Solution**: Force exactly two columns on the home page:

```scss
.home-cards.cols-2 {
  grid-template-columns: repeat(2, 1fr) !important;
}
```

### Files Modified

- `_sass/custom/custom.scss` — Main layout overrides and card grid
- `_sass/custom/setup.scss` — (Previously attempted variable overrides, now unused)

### Theme Integration

The `_sass/custom/custom.scss` file is automatically imported by the theme's Sass pipeline (via `css/custom.scss.liquid` → `@import "./custom/custom"`), so changes apply to all color scheme stylesheets (default, light, dark) without additional configuration.