---
layout: default
title: Create, maintain, and update packages
nav_order: 10
parent: Developer Docs
has_toc: true
lang: en
---
# Create, maintain, and update packages

This guide gets a package built on ABF, OpenMandriva's build system.

Install the packaging tools first:

```bash
dnf install packaging-tools
```

These tools generate templates for spec files and build RPMs. The main tool is `vs`, short for *vi specfile*. It opens a spec file template in your `$EDITOR`, honoring the `$EDITOR` and `$VISUAL` environment variables. It also ships specialized templates for different kinds of code:

| Tool | For |
| --- | --- |
| `vs` | spec files |
| `vl` | libraries |
| `vp` | Python modules |
| `vpl` | Perl modules |
| `vj` | Java libraries |
| `vo` | GNU Octave |

To set up a spec file, run the matching tool: `vs mypackage.spec`. The tool opens a template in your editor with most of the values you need; edit the top section to describe your project.

## What a spec file contains

A spec file describes how to build your RPM. A template from `vs` looks like this:

```
Name:       mypackage
Version:    1.0.0
Release:    1
Summary:    A short description
License:    MIT
Source0:    https://example.com/mypackage/mypackage-1.0.0.tar.xz

BuildSystem: autotools

%description
A longer description of what the package does.
```

- The top fields describe the package.
- The `%prep`, `%build`, `%install`, `%check`, and `%files` sections tell the build system what to do.
- Add an `%install` section that runs `make install` in a temporary directory.
- Add a `%check` section to run any test suite: `%check` `make check`.
- Add a `%files` section that lists every file the package installs.
- Add a `%changelog` section to record changes.

The `BuildSystem: autotools` line at the top means the build system is `autotools`; that is how the build knows to invoke `./configure` and `make install`.

## Build your package

When the spec file is ready, build it locally to check it compiles:

```bash
abb build
```

`abb build` runs in your working directory. If any required build tools are missing, the error message tells you which ones and suggests the packages to install them with.

## Submit your package

When the build works, submit the package with:

```bash
abf submit <path-to-spec>.spec
```

A submit form opens so you can add a summary, choose the target branch (usually Cooker), and submit. If the build succeeds on ABF, maintainers will review your package.

If you want to build only this package on ABF, use:

```bash
abb build
abf submit
abf addpkg <name> <repository>
```

You need ABF access to push the package to a repository, so start that request early.

## Update packages to a newer version

When upstream releases a new version, update your pack by:

- Updating the `Version` field in the spec file, then committing and running `abb build` to see if it still builds.

- If it breaks, fixing the spec (a dependency changed, paths changed, and so on), then running `abb build` again, and repeating until it builds.

- When the new version works, running `abf submit` and updating the package as you would when submitting it for the first time.

## More information

Read the [RPM packaging guide](https://rpm-packaging-guide.github.io/) and the [packaging-tools repo](https://github.com/OpenMandrivaSoftware/openmandriva-packaging-tools) for more details and examples.
