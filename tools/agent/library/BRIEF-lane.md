# Plenix library: the brief for each lane writer

Repo: your working directory (C:/Users/Administrator/Documents/Plenix, or your git worktree of it) (the design system, platform/design-system, is its own git repo).
Scratchpad = your own session scratchpad (temporary files only); the shared tools are in tools/agent/

Your task names a wave NN and a lane L (A, B or C). Your leaves, their targets, kinds, variants, dependencies and the
files they touch are in tools/agent/library/plan.json (`leaves[]` with `wave`, `lane`, `files`, `laneFiles`; `targets[]`)
and plan.md (Waves, Recipe per kind). The house rules and checks are tools/agent/web/BRIEF-web.md: read it first.
Two other lanes of your wave work at the same time on disjoint files. Never edit a file another lane could edit.

## What you own (wNNL = your wave and lane, e.g. w04B)
- The code files plan.json lists for your targets (`files`): new components/patterns/templates and their CSS, or the
  existing file you extend.
- platform/design-system/parts/wNNL.records.js, wNNL.labs.js, wNNL.docs.js, wNNL.css (only these names in parts/)
- platform/exports/wNNL.js and wNNL.css (public exports and stylesheets)
- platform/tokens/components/<name>.tokens.json for each new component (and <name>.<context>.tokens.json, below);
  platform/tokens/semantic/<topic>.tokens.json for a foundation
- platform/standards/web-native-map.d/wNNL.json
- tools/agent/native/ios-<slug>.json and android-<slug>.json for the native designs of your components
- build-packages.d/<name>.js (package lanes of wave 15 only)

Never edit: inventory.js, inventory-docs.js, inventory-guidance.js, index.html, any *-labs.js or ds-sample-*.css,
components.tokens.json (or any shared .tokens.json), web-native-map.json, native-design.json, platform/index.js,
platform/platform.css, build-*.js, check-*.js. The generated files (spec-parts.js, ds-sample-parts.css, the library
blocks of index.js and platform.css, token CSS, tokens.index.json, native-guidance.js, dist/*) are rebuilt by
node build-app.js for your testing; the integrator commits them. Do not commit, release or deploy.

## The part files
parts/wNNL.records.js (a record's fields are documented at the top of inventory.js; look at its neighbors):
```js
/* Plenix design system · library part wNNL: <what it holds> */
DSParts.records.push(function (H) {
  var h = H.h, P = H.P, row = H.row, box = H.box, eachV = H.eachV, q = H.q;   // take what you use
  return [
    { id: 'link', lab: true, icon: 'link', sec: 'content', sub: 'Links', leaf: 'Inline link', plenix: 'Link', src: 'components/Link/Link.jsx',
      level: 'Component', interaction: 'Navigation', aliases: [], use: [], avoid: [], related: ['button'], map: [H.m(H.C, 'Link')],
      covers: ['Standalone link'],            // its variant and duplicate leaves when they have no record of their own
      variantPages: [{ leaf: 'Standalone link', group: 'Variant', name: 'Standalone', lab: { variant: 'standalone' }, text: '…', use: ['…'], avoid: ['…'] }],
      examples: [['Variant', eachV([...], name, render, cls, prop)]] }
  ];
});
```
- H holds inventory.js's helpers: h, P (window.Plenix), S, W, noop, use, row, stack, box, surface, onAccent, TONES, cap,
  each, eachV, q, fieldStates, FIELD_STATES, OPTS, ROWS, TREE, FOPTS, header, A, C, M, F, D, m, plus record(id) (a record
  already listed) and iconOf(id). Records render through P.<Name>: your export must be public (exports/wNNL.js).
- Write `DSParts` bare (not window.DSParts): the bundle gives each part its own view and reports a broken part by name
  (console error, check-spec rule `parts`).
- sec/sub/leaf are the exact taxonomy names (inventory-taxonomy.js); one record per leaf (check-spec `records`); ids
  unique across all records. The icon goes in the record (no ICON map edits). A variant page's `name` equals its card
  name exactly, `group` its card group, `leaf` a unique short page name.
- Thin records (a duplicate leaf, or a leaf an existing item answers): home = the leaf, plenix/src/css of the existing
  code, use/avoid for this leaf, related: [main id], `docsFrom: '<main id>'` (it shows the main record's written
  sections), `variantClasses: []` (no variant cards of its own), `statesFrom: ['<main id>']` when interactive, and one
  example. parts/w00A.records.js has the 49 covered-elsewhere leaves done this way: they are DONE, skip them in your lane.
- Records of extended components: give the leaf its own record (same src as the existing record), its examples and
  variantPages for the new variants only.

parts/wNNL.labs.js (component-lab.js documents the spec; display-labs.js, overlay-labs.js, navigation-labs.js are finished
examples; the finished labs in display-labs.js and parts/w06*.labs.js are the recipe):
```js
if (window.DS && DS.registerLab) {
  DS.registerLab('<record id>', { name, title, file, compPrefix, store, sizes, variants, states, content, labels, defaults, props, token, every, html, labelSelector, parts });
}
```
- The guard is required (Node loaders read the bundle without a DOM). The record needs `lab: true`.
- Extending a component whose lab lives in a shared *-labs.js: re-register it from your part (spec-parts.js loads after
  every *-labs.js): `DS.registerLab(id, Object.assign({}, DS.labs[id], { variants: DS.labs[id].variants.concat([...]) }))`.
- props[].cat is one of: color, control-height, size, space, icon, opacity, columns, transform, radius, border-width,
  font, font-size, font-weight, line-height, shadow. html() uses the real classes, never a style attribute. Every variant
  card must be a value of sizes, variants or content, so its page opens the lab on it.

parts/wNNL.docs.js: `DSParts.docs.push({ '<record id>': { purpose, anatomy: [...], behavior: {...}, a11y: {...}, content: {...} } });`
Move the leaf's text from inventory-guidance.js (DSGuidance['<sec>|<leaf>']) into the docs in Plenix's words; never edit
inventory-guidance.js (the integrator prunes it).

parts/wNNL.css: only the lab specimen frames your labs need, ds-<something> classes, tokens only (no numbers).

## Exports
platform/exports/wNNL.js, one export statement per line, paths from platform/exports/:
```js
export { Link } from '../components/Link/Link.jsx';
```
platform/exports/wNNL.css: `@import url("../components/Link/link.css");` per stylesheet. build-exports.js (run by
build-app.js) flattens them into the generated block of index.js and platform.css; a name or stylesheet that is already
public stops the build. An extended component is already exported: add only new names.

## Tokens
Every value of a new stylesheet is a --plx-comp-<component>-<role> token pointing to a plx-sys role (never plx-ref
colors, never a new palette color), declared in platform/tokens/components/<name>.tokens.json:
```json
{ "$description": "Link: its component tokens.", "plx-comp": { "link-text": { "$value": "{plx-sys.<role>}", "$type": "color", "$description": "…" } } }
```
First pass: node tokenize-component.js components/Link/link.css --out components/link.tokens.json (writes your file, never
the shared one). A value that changes with density or interaction goes in <name>.density-compact.tokens.json (also
density-standard, density-comfortable, interaction-touch, interaction-mobile): same token names, no $extensions needed;
build-tokens.js writes each where the shared set of that context goes. A token is defined in one file only.
An extended component's new tokens go in components/<component>.tokens.json too (a new file), never in the shared set.

## Native
- web-native-map.d/wNNL.json: `{ "map": { "<sec>|<leaf>": { "ios": ["ios-…|<page>"], "android": ["android-…|<page>"] } } }`
  for every record you add (build-native-guidance.js fails a record without an iOS and an Android counterpart, and a web
  page mapped twice). Keys and pages must exist in inventory-taxonomy.js; look at web-native-map.json for the pages used.
- Native designs (data only, no Figma): tools/agent/native/ios-<slug>.json and android-<slug>.json in the shape of
  tools/agent/native/ios-buttons.json, as tools/agent/native/BRIEF-ios.md and BRIEF-android.md describe (for iOS: no
  figma/images fields, data only). Only for components with a native counterpart page. Run
  node tools/agent/native/check.js <your fragments> → ALL OK. The integrator merges them (tools/agent/native/merge.js).

## Recipe per kind (plan.md › Recipe per kind is the full text)
- component / pattern: JSX with the header comment (Summary / Usage / Props / Behavior / Notes; strings prop for every
  word; forwardRef when it wraps a control), BEM plx-<name> CSS on component tokens (4px grid, logical properties, focus =
  border color only), export, record, docs, an "All" lab, variant pages, native map, native designs. A pattern uses only
  Platform components (a missing primitive is its own task first).
- extend: edit the existing component in place (new prop documented in its header, CSS on new tokens, existing behavior
  and snapshots unchanged); the leaf's own record; re-register the shared lab with the new variants.
- foundation: code in platform/system, utils, hooks or providers (exported if JS), or semantic/<topic>.tokens.json; a rules
  page (level Foundation, guide or examples, rules as use/avoid); never edits the components that will adopt it.
- template: platform/templates/<Name>/ from existing components and patterns; exported; live demo in its record.
- package: packages/<name>/ built by build-packages.d/<name>.js (module.exports = function (ctx) { … return 'note'; };
  ctx has ROOT, P, VERSION, SCOPE, SITE, REPO, PKG, REL, CDN, API, write, json, copy, copyDir); a record in 14 Implementation.

## Checks (all must pass before you report)
- node --check on every .js you wrote
- node build-app.js (it runs build-exports.js and build-spec-parts.js first)
- node check-system.js → SYSTEM_OK
- node check-spec.js → SPEC_OK (rules records, parts, variants, states, api)
- LABS_ONLY=<your lab ids> LABS_PORT=<8831 lane A | 8832 lane B | 8833 lane C> node tests/labs.test.js → ok for each
- the tests for what you touched (BRIEF-web.md list), with your own ports; node tests/pages.test.js once at the end
- look at each new page in Chrome, light and dark (a small puppeteer script in the scratchpad with tests/lib.js serve and
  launch on a port of your own; tools/agent/web/s3/look.js is one)
- node tools/agent/native/check.js on your native fragments → ALL OK

## Report
Per target: files written, record ids, lab ids with checks/tokens from the labs test, variant pages, native map and
fragments, test results, anything left with the reason. Short.

## Lessons from wave 1 (the integrator, 2026-10-12)
- Run tests/typography.test.js and tests/a11y.test.js before you report: in wave 1 they caught format output in DM Sans
  (technical values are kind 'data': DM Mono at the table's size) and a scroll area without keyboard access.
- Any scrolling region you create must be keyboard reachable (tabIndex 0 plus a name), or use useVirtualizer, which
  does that already.
- New tests you add must skip cleanly when platform/design-system is not checked out (CI), like the other tests.
- New foundations should be ADOPTED where the plan says so in your lane (e.g. a component moving to useFloating or
  announce), or listed in your report for a later lane.

## Owner rule (2026-10-13): no unapproved design choices
Never add a color role, theme, accent, or any visible design choice the owner has not approved, even when built from
existing palette colors. Build the mechanism with existing roles only, or skip the item and list it in your report as
"needs the owner". (Wave 3 added an AI color, a high-contrast theme and product accents without approval; they were
taken out of the release.)

## Never kill processes you did not start (2026-10-14)
Never run `taskkill /IM chrome.exe`, `killall`, `pkill` or anything that stops processes by name: it stops the owner's
own browser and other lanes' test runs. Stop only a process you started, by its PID, or let the test's own time limit
end it.
