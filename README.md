# Plenix Platform

One design system and component library (React/JSX, `plx-` classes, `plx-ref` / `plx-sys` / `plx-comp` tokens kept as JSON), and the Plenix apps built only from it.

Live: https://plenix.lighthouseway.org/ (apps) · https://design-system.lighthouseway.org/ (design system)

## Use Plenix in another project

Plenix is published like Carbon or Fluent: as versioned packages, a CDN and a JSON API. All three are built from the same Platform sources by `build-packages.js`.

### Packages (GitHub Packages, private)

| Package | What it holds |
|---|---|
| `@plenix-ds/tokens` | token JSON (source), CSS custom properties, a JS module (`tokens`, `token()`, `value()`, `cssVar()`) |
| `@plenix-ds/icons` | SVG icons (Material Symbols Sharp 300), `icons.json`, the icon stylesheet |
| `@plenix-ds/styles` | `plenix.css` (the whole Platform stylesheet), `fonts.css`, `theme-boot.js` |
| `@plenix-ds/react` | every component, pattern, provider and hook (React 18 peer dependency) |

To install, a project needs a `.npmrc` beside its `package.json` and a GitHub token with `read:packages` access to the plenix-ds organization, for example in the environment variable `GITHUB_TOKEN`:

```
@plenix-ds:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```
npm install @plenix-ds/react
```

```js
import '@plenix-ds/styles/plenix.css';
import { AppShell, Button, Table } from '@plenix-ds/react';
```

### CDN (no build tools)

Each version keeps a fixed address and never changes once published. The version list is at https://design-system.lighthouseway.org/cdn/index.json.

```html
<html lang="en" data-plx-density-policy="compact">
<head>
  <script src="https://design-system.lighthouseway.org/cdn/0.1.0/theme-boot.js"></script>
  <link rel="stylesheet" href="https://design-system.lighthouseway.org/cdn/0.1.0/fonts.css">
  <link rel="stylesheet" href="https://design-system.lighthouseway.org/cdn/0.1.0/plenix.css">
  <script src="https://design-system.lighthouseway.org/cdn/0.1.0/vendor/react.production.min.js"></script>
  <script src="https://design-system.lighthouseway.org/cdn/0.1.0/vendor/react-dom.production.min.js"></script>
  <script src="https://design-system.lighthouseway.org/cdn/0.1.0/plenix.js"></script>   <!-- window.Plenix -->
</head>
```

Also on the CDN:
- `plenix.esm.js`: the ES module;
- `tokens/`: `tokens.json` and the token CSS;
- `icons/<name>.svg` and `icons/icons.json`.

### API (read-only JSON)

https://design-system.lighthouseway.org/api/v1/ lists the endpoints:
- `tokens`: every token with its tier, type and values per theme and density;
- `components`: the inventory records;
- `exports`: the React package's public API;
- `taxonomy`: the 14 sections;
- `guidance`: the common-ground guidance for unbuilt items;
- `icons`.

Tools, AI agents and other systems read the rules from here.

### Releasing a version

1. Raise `version` in `package.json` (semantic versioning; 0.x while the API settles).
2. Run `bash deploy.sh`. It publishes the CDN folder for that version and refreshes the API.
3. Commit, then tag and push: `git tag v0.2.0 && git push origin main v0.2.0`. The Release workflow builds, checks and publishes the four packages, and creates the GitHub release.

## Get it

```
git clone --recurse-submodules https://github.com/plenix-ds/plenix-platform.git Plenix
```

`platform/design-system/` is the **Plenix Design System**, its own repository ([plenix-design-system](https://github.com/plenix-ds/plenix-design-system)) included here as a submodule. Edit and push it there, then record the new version here with `git add platform/design-system`.

## Layout

- `platform/` is the Platform:
  - `components/`, `patterns/`, `providers/`, `hooks/`, `utils/`;
  - `tokens/*.tokens.json` (the source of every value);
  - `icons/`, `system/` (generated token CSS and themes), `vendor/` (React), `dist/` (built bundles), `dev/` (runtime style guard).
- The apps, one folder each: `dam`, `dashboard`, `notes`, `tasks`, `calendar`, `contacts`, `projects`, `messages`, `files`, `bookmarks`, `settings`, with `suite/` shared by the apps.
- `capabilities/`, `metadata/`, `docs/`, `architecture/`, `AI_CONTEXT/` hold reference and planning material.
- Scripts:
  - `build-app.js` builds the tokens, icons and bundles;
  - `build-packages.js` builds the release: the four packages, the CDN files and the API;
  - `check-system.js` checks the system rules;
  - `check-spec.js` checks the design system;
  - `deploy.sh` publishes to the Plenix VM.

## Work

```
npm install
node build-app.js
node check-system.js
node check-spec.js
bash deploy.sh
```

Both checks must pass. The rules:
- nothing hard-coded;
- no inline styles;
- no new colors;
- tokens only from `platform/tokens/*.tokens.json`.

Open items are in `TODO.md`.
