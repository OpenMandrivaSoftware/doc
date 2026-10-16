---
layout: default
title: Software Management
nav_order: 10
parent: User Guide
has_toc: true
lang: en
---
# Software Management

You install and remove software with a package manager. OpenMandriva ships several of them, and you can use whichever you like. All of them reach the same repositories, so whichever you pick they all see the same list of available packages.

## Graphical package managers

- **Discover** is the default, built into GNOME. It finds and removes most applications. Use it for applications, not for system updates.

- **DNFDragora** is a classic OpenMandriva GUI for finding, installing, and removing packages.

- **DnfDrake** adds system-level features Discover does not, such as system-wide upgrades and package history. It also opens the Software Repository Selector.

## Command-line package manager

- **DNF** is the fastest and most powerful way to manage software. Almost everything you can do in a GUI you can do in a terminal. See [Using DNF](./using-dnf.en.html).

## Repository selector and other sources

- **Software Repository Selector** (`om-repo-picker`) picks which release, architecture, and repositories your system uses. See [Software Repository Selector](./repositories-tldr.en.html).

- **Flatpak** applications are packaged separately from the system repositories.

## What OpenMandriva does not provide

OpenMandriva does not ship software from third-party sources that sit outside its repositories. You can still run some of these:

- **AppImage** files are self-contained executables that need no installation.
- Compiling software from source and installing binary packages from other sources both work, but they need care and are your responsibility.
