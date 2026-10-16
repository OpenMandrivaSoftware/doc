---
name: Navigation
description: This Jekyll site uses the Just the Docs theme which automatically generates sidebar navigation based on page frontmatter hierarchy. Understanding the navigation structure is key to organizing documentation properly.
---

# Sidebar Navigation Implementation

This document describes how sidebar navigation works in the Just the Docs theme and important lessons learned for creating maintainable page hierarchies.

## Key Concept: Page Hierarchy

Just the Docs generates sidebar navigation from page frontmatter `parent:` fields and directory structure. The theme:
- Uses `nav_order:` to determine the display order of items
- Uses `parent:` to create nested navigation structure (must match the **exact title** of the parent page)
- Automatically discovers children based on file location and parent references

## Critical Rule: Section Index Pages Must NOT Have a Parent

**Problem Encountered**: When section index pages have `parent: SectionName`, it creates a circular reference that breaks navigation generation.

**Examples of BROKEN config**:
```yaml
# DON'T DO THIS - Creates circular reference
---
title: User Guide
nav_order: 20
parent: User Guide  # ← WRONG! This page is the section root
---
```

**Correct config for section indices**:
```yaml
# CORRECT - No parent for section root
---
title: User Guide
nav_order: 20
# No parent field - this is a top-level section
---
```

### Files That Must NOT Have Parents
These are section/root index files that appear as top-level navigation items:
- `getting-started/index.en.md` (title: "Getting Started")
- `user-guide/index.en.md` (title: "User Guide")
- `dev/index.en.md` (title: "Developer Docs")
- `community/index.en.md` (title: "OpenMandriva Community")

### Files That SHOULD Have Parents
These are children within sections. The `parent:` value must match the **exact title** of the parent page:
```yaml
# Example: A page under User Guide that should be nested
---
title: Network Configuration
nav_order: 30
parent: User Guide  # Must EXACTLY match the parent page's title
has_toc: true
---
```

## Navigation Structure

The sidebar shows 4 top-level sections:

1. **Home** - Link to index.en.html
2. **Getting Started** - Expanded by default with sub-items
   - Downloading OpenMandriva
   - Copying OpenMandriva to a USB Stick
   - Installing OpenMandriva
3. **User Guide** - Expandable with nested content
   - Software Management → (expandable)
     - Using DNF
     - Software Repository Selector
   - Desktop Environments
   - Network Configuration
4. **Developer Docs** - Expandable with technical content
   - Build System
   - Create, maintain, and update packages
   - Contributing to OpenMandriva
   - How to Report a Bug
   - Getting Started with QA
5. **OpenMandriva Community** - Expandable with nested content
   - Chat with OpenMandriva
   - Release Plan and Repositories
   - Repository Policies
   - Release Life Cycle
   - Setting Up a Mirror
   - About OpenMandriva → (expandable)
     - Governance
     - Statutes
     - Bylaws
   - Mailing Lists

## File Naming Convention

Per the Jekyll Polyglot setup:
- Extensionless `.md` files (no `.en` suffix) → render to `{slug}.html`
- `.en.md` files → render to `{slug}.en.html`

For sidebar links:
- Section indices like `getting-started/index.en.md` → `/getting-started/index.en.html`
- Pages use relative links based on current file location

## Common Pitfalls

### 1. Circular Parent References
**Symptom**: Section doesn't appear in sidebar, or navigation breaks
**Fix**: Ensure section root pages have no `parent` field

### 2. Wrong Parent Title Reference
**Symptom**: Child pages don't nest properly under the correct parent
**Fix**: The `parent:` value must match the **exact title** of the parent page
```yaml
# WRONG - Parent title is "OpenMandriva Community"
parent: Community  # Won't match!

# CORRECT
parent: OpenMandriva Community  # Matches exactly
```

### 3. Broken Internal Links
**Symptom**: Links lead to 404 errors
**Fix**: 
- Use `.en.html` extension for English pages
- Use relative paths (e.g., `./packaging.en.html` not `./packaging.md`)
- Check that target files exist before linking

### 4. Missing Pages for Home Cards
**Symptom**: Home card links point to non-existent pages
**Fix**: Create the required pages before adding cards to `home_cards.yml`

## Creating New Sections

To add a new documentation section:

1. Create a new directory under `/docs/` (e.g., `new-section/`)
2. Create an `index.en.md` file with NO `parent` field
3. Set appropriate `nav_order` value
4. Set `title` to the section name
5. Create child pages with `parent: Exact Title of Section` (must match the section index title)
6. Update `home_cards.yml` if adding to home page cards

### Example Section Index (CORRECT):
```yaml
---
layout: default
title: Your New Section
nav_order: 25
has_toc: true
lang: en
---
# Your New Section

Welcome to the documentation.
```

### Example Child Page (CORRECT):
```yaml
---
layout: default
title: Sub Page
nav_order: 10
parent: Your New Section  # Must EXACTLY match the section index title
has_toc: true
lang: en
---
# Sub Page

Content here.
```

## Lessons Learned from Community Section Fix

The community section required careful attention to parent references:

1. **Section Index**: `community/index.en.md` has `title: OpenMandriva Community` and NO parent
2. **Direct Children**: Files in `community/` (like `chat.en.md`, `mailing-lists.en.md`) need `parent: OpenMandriva Community`
3. **Subdirectory Children**: Files in `community/about/` need `parent: About OpenMandriva` (matching the title)
4. **Releases Files**: Were incorrectly using `parent: Release Engineering` (a non-existent title), needed `parent: OpenMandriva Community`