# Plenix: how should components and pages be styled? (a brief for a second opinion)

I own Plenix, a design system and a suite of web applications built on it. I want a second opinion on its CSS
architecture. Please read the facts below, then answer the questions at the end. Be concrete and point to real design
systems where you can.

## The problem

Pages and components can end up with **two rules setting the same property on the same element**. That happens with
two classes on one element, with a parent stylesheet reaching into a child component (`.plx-panel .plx-stack {…}`), or
with the same component styled in two stylesheets. When both rules give the same value, it is redundancy. When they
differ, the result depends on selector specificity or file order, so the UI is inconsistent and fragile. Inherited
properties also leak. A real example: the monospace font's tighter word spacing was inherited by a DM Sans tag inside
a monospace table cell.

I want this never to happen, and a CSS codebase that is clean:

- longhand properties (the owner's choice)
- no unnecessary classes
- no redundancy
- no clashes
- no `!important`

All of it without changing how anything looks today.

## What Plenix is (the foundation to keep)

- **Scale today:**
  - 139 components and 99 patterns (React).
  - 11 suite apps: dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings, and an
    asset manager.
  - A live design-system site that documents every component.
- **Rendering:**
  - React 18, vendored (no network needed; pages also open from `file://`).
  - Components are JSX compiled by our own Babel build (`build-app.js`) into one browser bundle (`window.Plenix`) and an
    ESM build.
  - Published on a self-hosted CDN per version (`/cdn/<version>/plenix.js`, `plenix.css`, fonts, `plenix.d.ts`) and as
    npm packages:
    - `@plenix-ds/react`;
    - `@plenix-ds/styles` (the CSS alone);
    - `@plenix-ds/tokens`;
    - `@plenix-ds/web-components` (Shadow DOM, with its own `plenix-shadow.css`);
    - `@plenix-ds/angular` and `@plenix-ds/vue` (wrappers around the React components);
    - icons, Figma, lint and an MCP server.
  - Native token sets for iOS, Android and Flutter are generated from the same tokens.
- **Design tokens:**
  - W3C Design Tokens JSON (`$value`, `$type`, `$description`), in three tiers:
    - `--plx-ref-*` raw values (340);
    - `--plx-sys-*` semantic roles (600);
    - `--plx-comp-*` component settings (about 5,000; in effect "styling hooks", one per component property).
  - A build script writes the token CSS; an index lists every token, its values per theme and density, and its users.
  - Themes: light and dark.
  - Three densities: Compact, Standard, Comfortable.
  - Three interaction environments: pointer, touch, mobile.
  - A 4px grid.
- **Classes:** BEM-style with a `plx-` prefix (`plx-card`, `plx-card__title`, `plx-card--interactive`, state classes
  `is-selected`). Utilities are `plx-u-*`.
- **Stylesheets:**
  - One stylesheet per component, aggregated by `platform.css` (287 `@import`s).
  - Bundled into one file for production (2.1 MB unminified).
  - Today: 348 stylesheets, 6,443 rules, 21,875 declarations.
  - **1,258 rules where one `plx-` class is a descendant of another** (many are a component's own elements, many reach
    into other components).
  - 420 `!important`, mostly in the utilities.
  - Longhand properties throughout (for example `border-bottom-left-radius`).
- **Layout:**
  - Layout primitives: Stack, Inline, Columns, Center, ContentGrid, and others.
  - An AppShell with page kinds and regions.
  - A composition standard (`layout.json`): which pattern builds which region; fields are layout-neutral and the
    pattern around them sizes them.
  - Containers nest at most two levels deep, never three.
- **Typography:**
  - DM Sans for text (it sets the standard, never changes).
  - Reddit Mono for code and technical values, fitted to DM Sans by `@font-face size-adjust: 97.1%` and a word-spacing
    token.
- **Rules enforced by our own checker (`check-system.js`), which fails the build on:**
  - an old token name, a raw color, a font size written as a number, or a token that isn't declared;
  - a class without the `plx-` prefix, or a stylesheet not imported;
  - inline styles (JS may set token-equal, grid-snapped sizes only);
  - logical properties, semantic HTML, links that act as buttons, color use, the composition (fields) rule and table
    geometry.
- **Hard rules from the owner:**
  - tokens only;
  - no inline styles;
  - no new colors without approval;
  - American English;
  - every change ships with proof that the UI is unchanged.

## What has been proposed so far (please critique)

1. **Discipline plus checks (the current proposal):**
   - Components style only their own elements and states; parents compose through props, slots, layout components and
     the child's published tokens, never by selecting into the child.
   - Layout components own spacing (`gap`); components have no outer margins.
   - Complete text styles (W3C `typography` composite tokens) so no font property is set alone.
    - Cascade layers (`@layer base, components, patterns, utilities`) in place of `!important`.
   - Delete unused classes and duplicate declarations.
   - Checks that fail the build on cross-component selectors, a specificity ceiling, duplicate declarations, duplicate
     JSX props, the nesting limit, unused classes and `!important`.
   - Proof: identical screenshots and computed styles.
2. **The industry alternatives found so far:**
   - **Build-time atomic CSS**, where clashes are structurally impossible: one class per property-value pair and a
     deterministic "last style wins" merge, with no descendant selectors and no specificity battles. Examples:
     - Meta StyleX;
     - Microsoft Fluent 2 (Griffel);
     - Atlassian (Compiled, `@atlaskit/css`);
     - Adobe Spectrum 2 (the style macro).
     - Note: Griffel expands shorthands to longhands so the merge stays deterministic, which matches Plenix's longhand rule.
   - **Scoped CSS per component:** GitHub Primer moved from styled-components to CSS Modules (done December 2024).
   - **Shadow DOM with styling hooks** (CSS custom properties as the only way to customize): Salesforce Lightning;
     Shopify Polaris web components; Polaris React forbids overriding component classes with a stylelint rule.
   - **Layout primitives** (Every Layout's Stack, Cluster and friends): spacing belongs to the parent, never to the
     child.
   - **Cascade layers in production:** Dialpad's Dialtone fails CI if a class is not layered.

## Questions

1. Which approach is the modern, standard way for a design system like this one (React components, design tokens,
   several framework wrappers, a plain-CSS package, self-hosted, no network)?
   - discipline plus checks;
   - CSS Modules;
   - build-time atomic CSS (StyleX, Griffel-style);
   - Shadow DOM with styling hooks;
   - utility-first (Tailwind).

   Which approach guarantees "no two rules ever set the same property on one element", and which only detects it?
2. If atomic CSS is the answer:
   - How would the plain-CSS package (`@plenix-ds/styles`) and the web-components package keep working?
   - How does it fit tokens as CSS custom properties, light/dark themes and density modes switched by an attribute?
3. Is it a mistake to have about 5,000 component-level tokens? Is "styling hooks per component" the right public API,
   or should components expose only variants and props?
4. How should a parent change a child's look: props/variants, child-published custom properties, slots, or never? Is
   setting a child's published custom property from the parent an override or a sanctioned API?
5. Typography: are composite text styles (font, size, weight, line height, letter spacing, word spacing as one unit)
   the right way to stop inheritance leaks? How do Material 3, Fluent 2 and Spectrum apply them in CSS?
6. What is the safest migration path for 6,443 rules and 238 components without visual change? Incremental per
   component behind a flag (as GitHub did), or all at once? Which automated proof is enough?
7. Which checks belong in Stylelint, and which need project-specific tooling?

## Sources found so far

- StyleX at Meta: https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/
- Griffel (Fluent UI React v9): https://github.com/microsoft/griffel
- Adobe Spectrum 2 styling (style macro): https://react-spectrum.adobe.com/styling
- Atlassian Compiled migration (RFC-73): https://community.developer.atlassian.com/t/rfc-73-migrating-our-components-to-compiled-css-in-js/85953
  and https://atlassian.design/components/css
- GitHub Primer to CSS Modules: https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/
  and https://github.com/primer/react/discussions/7086
- Salesforce styling hooks: https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-styling-hooks.html
- Shopify Polaris, no class overrides: https://polaris.shopify.com/tools/stylelint-polaris/rules/conventions-selector-disallowed-list
- Every Layout, Stack: https://every-layout.dev/layouts/stack/
- Cascade layers in a design system (Dialtone): https://dialtone.dialpad.com/deploy-previews/pr-1331/guides/migration/css-cascade-layers/
- `@scope` Baseline (Firefox 146, December 2025): https://web.dev/blog/web-platform-12-2025
