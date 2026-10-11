---
name: Home Page Cards
description: The home page for this Jekyll-based site has cards navigation system driven by a YAML data file and a liquid template for display. 
---
# Home Page Cards Implementation

The home page uses a dynamic card system to provide previews of different documentation sections.

## Structure
- **Data Source:** `_data/home_cards.yml` contains the configuration for each card (title, description, and a list of links).
- **Template:** `index.markdown` uses a Liquid `{% for %}` loop to iterate through the data and render the HTML structure.
- **Styling:** `assets/css/custom.css` defines the grid layout (`.home-cards`) and individual card aesthetics (`.home-card`).

## Configuration
To add or modify cards:
1. Edit `_data/home_cards.yml`.
2. Add a new entry with `title`, `description`, and a `links` array containing `name` and `url`.

## Key CSS Properties
- **Grid:** Uses `display: grid` with `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))` for responsive behavior.
- **Alignment:** Bullets are removed using `list-style: none !important` and pseudo-element overrides (`::before`) to ensure a clean look.
