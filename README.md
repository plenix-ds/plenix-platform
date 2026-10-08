# Plenix Platform

One design system and component library (React/JSX, `plx-` classes, `plx-ref` / `plx-sys` / `plx-comp` tokens kept as JSON), and the Plenix apps built only from it.

Live: https://plenix.lighthouseway.org/ (apps) · https://design-system.lighthouseway.org/ (design system)

## Get it

```
git clone --recurse-submodules https://github.com/LighthouseCollection/plenix-platform.git Plenix
```

`platform/design-system/` is the **Plenix Design System**, its own repository ([plenix-design-system](https://github.com/LighthouseCollection/plenix-design-system)) included here as a submodule. Edit and push it there, then record the new version here with `git add platform/design-system`.

## Layout

- `platform/` is the Platform:
  - `components/`, `patterns/`, `providers/`, `hooks/`, `utils/`;
  - `tokens/*.tokens.json` (the source of every value);
  - `icons/`, `system/` (generated token CSS and themes), `vendor/` (React), `dist/` (built bundles), `dev/` (runtime style guard).
- The apps, one folder each: `dam`, `dashboard`, `notes`, `tasks`, `calendar`, `contacts`, `projects`, `messages`, `files`, `bookmarks`, `settings`, with `suite/` shared by the apps.
- `capabilities/`, `metadata/`, `docs/`, `architecture/`, `AI_CONTEXT/` hold reference and planning material.
- Scripts:
  - `build-app.js` builds the tokens, icons and bundles;
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
