# {APP_NAME} — Codebase Rules

## Migration / Rename Protocol

When renaming, merging, or moving capability IDs, group names, layer assignments, or any structural identifier:

1. **Before touching any file**, grep the ENTIRE codebase for every old value being changed. Search all `*.html`, `*.js`, `*.md` files. Build a complete hit list with file, line number, and context for each match.
2. **Classify every hit** as: capability ID reference, icon key (benign), DATA_MODEL field, stub/object key, Set/array membership, placeholder/panel key, FEAT_CAP_MAP entry, count/stat, group ID, group name in heading/label, file reference, comment, or prose. Only icon keys and archive files are benign — everything else is stale.
3. **Fix every stale hit across all files in one pass** before running any build or rebuild step.
4. **Rebuild once** after all fixes are applied.
5. **Verify once** with the same grep patterns to confirm zero remaining stale hits in active files.

Never fix just the "constants layer" (CAPABILITY_GROUPS, ALL_GROUPS) and assume downstream consumers (DATA_MODEL `capability:` fields, stub object keys, placeholder objects, FEAT_CAP_MAP, DEFAULT_CAPS, counts in comments/descriptions, MASTER-PROMPT headings) will be caught later. They won't — they use the same old IDs but in different code structures that aren't obvious from the constant definition.

## PRD Cross-Reference Protocol

When creating or substantially updating a PRD file, always identify and update associated PRDs:

1. **Before writing**, determine which other capabilities this one interacts with (e.g., Bookmarks <> Tags, Tasks <> Calendar, Files <> Sharing/Collaboration, Invoices <> Payments, Time Tracking <> Timesheets).
2. **After writing**, grep the new PRD for every capability name mentioned. For each one found, open its PRD and add or update the cross-reference (in Enablers, Scenarios, or Functionality sections) so both PRDs acknowledge the interaction.
3. **Capabilities rarely exist in isolation.** Most features touch 2-5 other capabilities. If a PRD mentions no other capability, it's likely incomplete.

## Build After PRD Changes

Any time a `*-prd.md` file in `capabilities/<name>/` is added, edited, or deleted, run `node build-docs.js` from the project root before finishing. This rebuilds `docs/plenix-docs.html` so the docs viewer stays in sync with the markdown source files. Never leave PRD changes uncommitted to the docs viewer.

## Build After App Changes

`node build-app.js` (or `npm run build:app`) is the single build command. Run it from the project root before finishing whenever any of these change: Platform source (`platform/components/**`, `platform/patterns/**`, `platform/hooks/**`, `platform/providers/**`, `platform/index.js`), the icon set (`platform/icons/**`), an application's source (`<app>/*.jsx`), the suite's shared source (`suite/**`), or the Asset Manager's source (`dam/app/**`).

It writes only these generated files, each starting with `GENERATED FILE — DO NOT EDIT`; never edit them by hand:

- `platform/components/Icon/icon.css`: the icon stylesheet (build-icons.js, from `platform/icons/`)
- `platform/dist/platform.js`: the Platform bundle; publishes the exports of `platform/index.js` on `window.Plenix`
- `<app>/app.js`: each suite application's page script (dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings), from `<app>/main.jsx`
- `dam/app/assets.js`: the Asset Manager's page script (React islands)

Source files use `import`/`export`; `react`, `react-dom` and `plenix-platform` resolve to the scripts already on the page. React and ReactDOM are vendored in `platform/vendor/` (see its README), so nothing needs the network and the dashboard still opens from `file://`. The build fails and writes nothing if a file does not compile, an import does not resolve, or a public export is missing. Page script order: `platform.css`, `platform/vendor/react-loader.js` (production React; `?react=dev` for the development build), `platform/dist/platform.js`, then the application bundle. Pages do not load Tabulator themselves: the DataTable loads `platform/vendor/tabulator/` the first time a grid renders. CSS needs no build. The window.* data in `suite/plenix-app-data.js` needs no build.

## System Rules

Every application uses only the Plenix Platform: React components and patterns from `platform/`, `plx-` class names, and tokens in three tiers (`--plx-ref-` values, `--plx-sys-` roles, `--plx-comp-` component settings). Run `node check-system.js` before finishing any change to a stylesheet, a component or an application screen; it fails on old token names, raw hex colors, font sizes written as numbers, classes without the `plx-` prefix, a component stylesheet missing from `platform.css`, retired files coming back, and embedded pictures in the asset app. The master design spec (`platform/design-system/`) reads its descriptions from each component's header comment, so keep that comment current.

## Project Structure

```
Z:\Plenix\
├── CLAUDE.md                # Codebase rules (this file)
├── build-docs.js            # Build script — reads capabilities/, writes docs/plenix-docs.html
├── build-app.js             # The single build: icon stylesheet, Platform bundle, every application's page script
├── build-icons.js           # platform/icons/ -> platform/components/Icon/icon.css (run by build-app.js)
├── check-system.js          # The system check (npm run lint:system): tokens, colors, font sizes, plx- classes, imports
├── package.json             # npm scripts + @babel/standalone (dev dependency of build-app.js)
├── platform/                # The Plenix Platform design system (canonical documentation: Plenix-Platform-Canonical-Documentation.md)
│   ├── plenix-system.css    # Foundations only (tokens, theme, layout layers); platform.css imports it first
│   ├── platform.css         # Foundations + every component and pattern: the only stylesheet the applications load
│   ├── system/              # Foundation stylesheets: tokens, radius, controls, density, spacing, grid, interaction, …
│   ├── components/<Name>/   # <Name>.jsx + <name>.css per component
│   ├── patterns/  hooks/  providers/   # providers/theme-boot.js runs in <head>; ThemeProvider.jsx for React
│   ├── index.js             # The public API, published on window.Plenix
│   ├── dist/platform.js     # GENERATED by build-app.js
│   ├── icons/               # Material Symbols Sharp (weight 300), unedited, + map.json (names -> symbols), see icons/README.md
│   ├── vendor/              # React and ReactDOM 18.2.0 (production + development), react-loader.js, and tabulator/ (the DataTable engine), see vendor/README.md
│   ├── dev/                 # radius-audit.js and style-audit.js (every page; the design system shows every component)
│   └── design-system/         # The master design spec, drawn live (http://localhost:8767/Plenix/platform/design-system/)
├── suite/                   # What the suite's applications share: suite.jsx (the shell: header, navigation pane,
│                            #   search, capture, account; mountSuite), shared.jsx (data, Ico), leftnav, capture, search,
│                            #   findSources, classification, plenix-app-data.js
├── dashboard/               # One folder per application, beside platform/ (batch 149); each has index.html (the page,
├── projects/  messages/     #   Platform tokens and classes only), main.jsx (its entry: mountSuite('<id>', …)), its
├── contacts/  calendar/     #   screens (<name>.jsx) and app.js (GENERATED by build-app.js). Open one at
├── tasks/  notes/           #   http://localhost:8767/Plenix/<app>/index.html; the header links every application.
├── bookmarks/  files/
├── settings/                # The suite's settings page (#<category>, #account for My Account)
├── dam/                     # The Asset Manager: index.html, settings-system.html, settings-myaccount.html,
│                            #   image-editor.html, app/ (source; app/assets.js GENERATED), assets/ (thumbnails, editor art).
│                            #   Its history (audit/, handoff/, originals) stays in ../Plenix - DAM/ (see its MOVED.md)
├── capabilities/            # 73 capability subfolders
│   ├── 00-conventions.md    # Shared PRD conventions
│   ├── terminology.md       # Product terminology
│   └── <name>/              # One folder per capability
│       └── <name>-prd.md    # PRD file (future: schema, API spec, UI spec)
├── docs/                    # plenix-docs.html (the PRD viewer, built from capabilities/), plenix-data.js, datagrid-tabulator-demo.html
└── Archived/                # Outdated or unused files and folders (metadata/, architecture/, old docs), on disk only (not in git)
```
