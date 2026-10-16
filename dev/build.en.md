---
layout: default
title: Build System
nav_order: 10
parent: Developer Docs
has_toc: true
lang: en
---
# Build System

Build System is **ABF** (OpenMandraiva Automation Framework). You submit packages to ABF, and ABF builds them for every architecture. The build system is where your changes first compile, and where the team tests them before they move through the release plan.

## What ABF does

ABF runs your package through every target architecture, checks the build, and publishes the result. You submit a package with `abf submit`, and ABF creates a build job. The build can take a while, so ABF queues jobs and runs them in order.

## The basic workflow

1. Write the spec file and package files on your machine.
2. Build locally with `abb build` to catch problems early. See [Create, maintain, and update packages](../packaging.en.html).
3. Submit the package with `abf submit`.
4. Watch the build in the ABF project page. Fix failures, edit the spec, and submit again.

The [packaging guide](../packaging.en.html) walks through each step. This page covers the parts specific to ABF.

## Submitting a package

After you submit a package, it becomes a project in ABF. The build log shows the exact failure. Most early-build problems are small: a missing dependency, a wrong path, a file the package forgot to install. The log tells you which.

{: .note }

Build locally before submitting. It is faster to fix a local failure than a queued one, and you control your own build.

## Building for release

A build in Cooker is not enough. Packages move through the [release plan](../community/releases/release-plan.html) — Cooker, then a rolling release, then the stable release. QA verifies each package before it leaves Cooker. Do not edit the release repositories directly.
