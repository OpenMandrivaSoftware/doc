# Agent Documentation

This repository contains the documentation site for the OpenMandriva Linux distribution.

## Technical Stack
- **Static Site Generator:** Jekyll
- **Theme:** [Just the Docs](https://github.com/just-the-docs/just-the-docs)
- **Customization:** Custom CSS and Liquid templates.

## Custom Implementations
This site includes several custom modifications to the base theme. For detailed instructions on how these were implemented and how to maintain them, please refer to the skills documented in the `.agents` directory:

- [Cards Functionality](./.agents/cards/): Implementation of the dynamic home page cards.
- [Layout Customizations](./.agents/layout/): Overrides for the theme's default centering and width constraints.
- [Multilingual Support](./.agents/multilingual/): Multilingual implementation with the jekyll-polyglot plugin.
- [Removable Theme Footer](./.agents/remove-theme-footer/): Removing the default theme footer messages.
- [Right Sidebar (Page TOC)](./.agents/right-sidebar/): Right sidebar that displays a table of contents.
