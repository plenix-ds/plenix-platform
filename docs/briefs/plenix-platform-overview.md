# Plenix: the platform as it is today (version 0.54.3, 2026-10-18)

A factual description of how Plenix is built and styled today. It describes what exists, not what should change.

## What Plenix is

- **A design system and the applications built on it:**
  - 139 components and 99 patterns, written in React.
  - About 20 charts.
  - Page templates, including a Commerce set.
  - 11 hooks and 12 providers.
- **Eleven suite applications on the system:** dashboard, projects, messages, contacts, calendar, tasks, notes,
  bookmarks, files, settings, and an asset manager.
- **A live design-system site:** 766 records covering 1,170 inventory items. It draws every component from the real
  code and reads each component's description from the header comment in its source file.
- **Platforms:** Web, iOS and Android share one model. Native token sets for iOS (Swift), Android (Kotlin) and Flutter
  are generated from the same tokens. iOS also maps to Apple's iOS 27 Figma kit.

## How it is built and shipped

- **React:**
  - React 18 is vendored in the repository; no page needs the network, and pages also open from `file://`.
  - Source is JSX with `import`/`export`.
  - One build script, `build-app.js` (Babel), compiles everything:
    - the Platform bundle (`platform/dist/platform.js`, published on `window.Plenix`) and an ESM build;
    - each application's page script;
    - the icon stylesheet (from 472 Material Symbols Sharp SVGs).
- **Releases:**
  - Every change is released immediately: version bump, changelog, commit, tag and deploy.
  - Hosting is self-hosted on the owner's own server, Nginx behind Nginx Proxy Manager, with Authentik sign-in.
- **CDN:** each version is published at `/cdn/<version>/` and never changes afterwards. It contains:
  - `plenix.js`, `plenix.esm.js`, `plenix.css` and `plenix.d.ts`;
  - fonts and the vendor engines;
  - a manifest with file hashes, and a tarball.
- **npm packages (GitHub Packages):**
  - `@plenix-ds/react`;
  - `@plenix-ds/styles` (the CSS alone, for non-React use);
  - `@plenix-ds/tokens`;
  - `@plenix-ds/web-components` (Shadow DOM, with its own `plenix-shadow.css`);
  - `@plenix-ds/angular` and `@plenix-ds/vue` (wrappers that render the React components);
  - `@plenix-ds/icons`, `@plenix-ds/figma`, `@plenix-ds/lint`, and an MCP server.
- **Vendored engines:**
  - Tables: TanStack Table and TanStack Virtual are bundled; the DataGrid and Table run on them.
  - Rich text: Tiptap.
  - Documents: pdf.js.

## Design tokens

- **Format and source:** W3C Design Tokens JSON (`$value`, `$type`, `$description`) in `platform/tokens/`. A build
  script writes the token CSS and `tokens.index.json`, which lists every token with its values per theme and density,
  its references, where it is written and what uses it.
- **Three tiers, about 5,970 tokens in all:**
  - `--plx-ref-*`: raw values named by kind and value (340).
  - `--plx-sys-*`: semantic roles named for their intent (600). They are kept even when two share a value.
  - `--plx-comp-*`: component settings, one per component property (about 5,030).
- **By type:**

  | Type | Tokens |
  |---|---|
  | Dimension | 3,105 |
  | Color | 2,003 |
  | Number | 211 |
  | Font weight | 193 |
  | Font family | 180 |
  | Shadow | 81 |
  | Duration | 74 |
  | Other | about 120 |

- **Modes, switched by attributes on `<html>` or a region:**
  - Theme: light and dark (`data-plx-theme`, `data-plx-mode`).
  - Density: Compact, Standard, Comfortable (`data-plx-density`); a region can be denser than its page.
  - Interaction environment: pointer, touch, mobile (`data-plx-interaction`); touch and mobile override density.
- **Palette:** 70 canonical colors in 12 families. Categories use their own palette of 19 colors. New colors need the
  owner's approval.
- **Spacing and sizes:** a 4px grid. Control heights come from roles, are density-aware, and step through size tokens.
- **Typography:**
  - DM Sans for text (variable, 300–700); it sets the standard and never changes.
  - Reddit Mono for code and technical values (variable, 200–900). It is fitted to DM Sans by `@font-face
    size-adjust: 97.1%` and a word-spacing token (`--plx-sys-font-data-word-spacing`, −0.279em).
  - Both fonts are self-hosted.

## Classes and stylesheets

- **Naming:** BEM-style classes with a `plx-` prefix:
  - blocks, such as `plx-card`;
  - elements, such as `plx-card__title`;
  - modifiers, such as `plx-card--interactive`;
  - state classes, such as `is-selected` and `is-focus-visible`;
  - utilities, `plx-u-*`.
- **Files:**
  - One stylesheet per component or pattern, beside its JSX.
  - System stylesheets in `platform/system/`: base, elements, fonts, density, spacing, grid, interaction, layout modes,
    nesting, utilities, motion, shadows, print, forced colors and others.
  - `platform/platform.css` aggregates everything through 287 `@import`s. A production bundle inlines them into one
    file of about 2.1 MB, unminified.
  - No CSS preprocessor, no CSS-in-JS, no CSS Modules, no Shadow DOM in the main library (the web-components package
    excepted), and no cascade layers. All stylesheets are global.
- **Property style:** longhand properties throughout (for example `border-bottom-left-radius`), logical properties, and
  every value a token.
- **Scale of the Platform's CSS, outside the design-system site and generated files:**

  | Measure | Count |
  |---|---|
  | Stylesheets | 353 |
  | Rules | 6,443 |
  | Declarations | 21,875 |
  | Rules where one `plx-` class is a descendant of another | 1,258 |
  | Selectors with three or more parts | about 1,400 |
  | Selectors using attributes (`[data-…]`, `[aria-…]`) | about 3,400 |
  | Selectors using state classes (`.is-…`) | about 440 |
  | `!important` | 420 (342 utility rules; most utilities use it) |

- **Design-system site:** its own 60 stylesheets (not layered), plus runtime-generated sample classes for previews.
- **Inline styles:** none in markup. JavaScript may set a size only when it equals a token value and sits on the 4px
  grid; other values go through constructed stylesheets or classes.

## Layout and composition

- **Layout primitives:** Stack, Inline, Columns, Center, ContentGrid, Bleed and Sticky, among others; spacing comes
  from tokens.
- **AppShell:** one shell for every application, with header, navigation pane, footer and main content, and page kinds
  with named regions.
- **Composition standard (`platform/standards/layout.json`):**
  - Every page kind lists its regions; every region lists the patterns it is built from.
  - A "what is this region?" guide.
  - Fields are layout-neutral: the pattern around them (Form, Field, CommandBar, Toolbar…) sizes them.
- **Nesting rule:** framing containers nest at most two deep, never three. `nesting.css` drops the third frame, and a
  test enforces it.
- **Five layout layers:** the page grid, regions, containers, control rows and controls, each with a density policy.

## How components and pages are composed today

- **Components:**
  - A component renders its own markup with its own classes and reads its own component tokens.
  - Variants come through props; states through classes or ARIA attributes.
  - Some stylesheets also style another component's classes when it appears inside them (for example a table
    restyling the Text inside its cells).
- **Pages:**
  - Applications compose components and patterns in JSX.
  - Several application pages use utility classes for spacing and sizing.
  - The suite's shared shell (`suite/`) mounts each application.
- **Inheritance:** text properties inherit through the DOM. When a component sets one font property, its children
  inherit the rest. A word-spacing leak was found this way (a DM Sans tag in a Reddit Mono cell inherited the monospace
  spacing); since 0.54.1, every rule that sets a font also sets its word spacing.

## Clashes and double nesting (measured 2026-10-18)

A clash means two or more CSS rules set the same property on the same element. Measured in the browser on the first
screen of all 11 applications: every rule of every stylesheet was matched against every element on the page.

- **Scale:**
  - 4,322 elements checked; 921 (21%) have at least one property set by two or more rules.
  - 348 distinct clashes (a property plus a pair of rules), once repeats across pages are merged.
  - 270 clashes have different values; 78 have the same value.
  - 77 of the 348 came from the retired legacy table stylesheet, removed since.
  - Per application: from 30 clashes (contacts, notes) to 156 (the asset manager); the asset manager has 243 elements
    with a clash, settings 155.
- **The kinds of clash:**

  | Kind | Clashes |
  |---|---|
  | A state or variant over its own base (by the BEM pattern), for example `.plx-button--ghost` replacing `.plx-button`'s background | 129 |
  | One component styling another component's elements | 84 |
  | Two rules with different values, where file order or specificity decides | 73 |
  | Two rules with the same value (redundant) | 44 |
  | A state or variant repeating the base's value (redundant) | 18 |

- **Real examples:**
  - **Two classes on one element, conflicting:** the app header's switch button carries both `plx-app-header__brand`
    and `plx-app-header__switch`. One rule gives it `display: flex`, the other `display: inline-flex`. Its column gap
    also comes from two tokens (`--plx-comp-app-header-brand-gap` and `--plx-comp-app-header-switch-gap`). File order
    decides which one wins.
  - **A parent sizing a child:** `.plx-app-header__item .plx-avatar` (in app-header.css) sets the avatar's width and
    height from an app-header token, while `.plx-avatar--28` (in avatar.css) sets them from the avatar's own token.
    Specificity decides.
  - **A parent reversing a child:** `.plx-notification-list .plx-activity-list__title` sets `flex-shrink: 1`, while
    the Activity List's own rule sets `flex-shrink: 0`.
  - **One layout element styled by two systems:** `.plx-app-shell__main` (app-shell.css) and `.plx-shell-main`
    (grid.css) both set `min-block-size` and `min-inline-size` on the same element.
  - **A layout primitive and a layout modifier on one element:** `.plx-stack` sets `padding-inline-start: 0` and
    `.plx-layout--inset-md` sets it from a token; `.plx-grow` and `.plx-layout--scroll` both set `min-block-size: 0`.
  - **One icon sized twice:** `.plx-icon` and `.plx-app-header__switch-chevron` both set `flex-shrink: 0`.
  - **Pure redundancy:** `.plx-app-header__brand` and `.plx-app-header__brand.plx-app-header__switch` both set the
    same zero padding; `.plx-app-header__brand` and `.plx-app-header__switch` both set `align-items: center`.
  - **Element defaults under components:** `elements.css` gives `h2` the heading font and `button`
    `font-family: inherit`. The component classes (`.plx-panel__title`, `.plx-button`) then set the font again.
- **Selectors that reach into other elements:**
  - 1,258 rules have one `plx-` class as a descendant of another `plx-` class. Many target a component's own elements;
    many reach into a different component.
  - About 1,400 selectors have three or more parts.
  - About 3,400 selectors use attributes, and about 440 use `.is-` state classes.
- **Container nesting:** framing containers (Panel, Card, a contained Tabs panel, CodeBlock, Notice, Fieldset,
  DropZone, Table, DataTable) may nest two deep. `nesting.css` removes the third frame when a third is placed inside,
  and a pages test checks it.
- **Inherited properties:** text properties inherit through the DOM, so a property set on a parent reaches children
  that do not set it. The monospace font's word spacing reached a DM Sans tag this way (patched in 0.54.1). A word
  spacing set in em becomes pixels where it is declared, so a larger child inherits the parent's pixel value.
- **`!important`:** 420 declarations, 342 of them in the utility classes. Utilities beat component rules only through
  `!important`.

## Quality gates and enforcement

- **`check-system.js`** fails the build on:
  - old token names, raw colors, font sizes written as numbers, undeclared tokens;
  - classes without `plx-`, stylesheets missing from `platform.css`, retired files coming back;
  - inline styles.
- **Project-specific rules in `check-system.rules/`:** color groups, composition (fields), copy, field background, icon
  names, inline style, links that act as buttons, logical properties, monospace spacing, semantic HTML, settings cards,
  table geometry, and use of color.
- **`check-spec.js`:** the design-system inventory is complete.
- **Runtime audits on every page:** a style audit and a radius audit.
- **Tests:** 84 test files (`tests/run.js`). They cover tables, typography, nesting, labs, pages, accessibility (axe),
  contrast, palette and performance. The full suite runs only at the end of a body of work; each change runs the quick
  gates.
- **Visual proof:** changes ship with screenshots or computed-style measurements.

## Rules the owner has set

- Tokens only, never raw values; semantic tokens are never merged by value.
- No inline styles; no new colors without approval; American English.
- No `!important`.
- No unnecessary classes, no redundancy, and no two rules setting the same property on one element.
- Longhand properties.
- Focus and invalid states change the border only: never a ring outside it. An invalid field has a 2px danger border
  and the lightest red fill.
- Statuses are badges with an icon, never a dot. Links are never styled as buttons.
- Every table is the DataTable (or the static Table); containers nest two deep at most.
- On mobile, native platform guidelines win over web values.
- Every change ships immediately, with the UI proven unchanged unless the change is meant to be visual.

## Team and workflow

- The owner decides.
- Claude integrates and releases, and builds the design-heavy work.
- Codex works task lanes through GitHub issues and pull requests, using briefs in `tools/agent/tasks/`.
- The plan of record is GitHub issue #3.
