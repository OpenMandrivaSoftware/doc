---
layout: default
title: Software Repository Selector
nav_order: 30
parent: Software Management
has_toc: true
lang: en
---
# Software Repository Selector

The Software Repository Selector (`om-repo-picker`) tells OpenMandriva which release, architecture, and repositories to use. Open it from the application menu (Search for *OpenMandriva Repo Selector*) or from the OM Welcome panel. Changing repositories is usually enough to switch between releases.

## The four media sources

Every repository has one of these four media sources:

- **main** holds the core packages that the OpenMandriva Lx team maintains. This includes everything in the install images plus other commonly used applications. `main/release` should always be enabled. Leave `main/testing` off unless you know why you want it.

- **extra** holds community-maintained packages. The core team does not maintain these, so some work well and some do not. You are welcome to use whatever works.

- **restricted** holds libraries that OpenMandriva cannot install by default for legal reasons such as patents. Availability varies by country. If these are not allowed where you live, leave them disabled.

- **non-free** holds applications and drivers that do not meet the definition of Free Software. OpenMandriva cannot fix problems caused by these, because it has no source code.

You can also enable third-party repositories that OpenMandriva does not host.

## After the changes

Save your changes, and then run this in a terminal:

```bash
dnf clean all
dnf repolist
```

This refreshes your local list of repositories and confirms the ones you enabled.
