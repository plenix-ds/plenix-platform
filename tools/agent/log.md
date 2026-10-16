## Batch 402 (2026-10-16): composition governance (#55)
- layout.json: regions, pages[*].regions, decide, fields (components, stretch, content, classes); build-standards.js
  validates every pattern is a public export and every class a plx- class, emits PAGE_REGIONS / COMPOSITION_GUIDE /
  FIELD_RULES and the fields CSS (layout-modes.css). input.css: .plx-input and .plx-select inline-size auto.
- check-system.rules/composition.js: JSX parsed (syntax only); local wrappers, field-like helpers and components used
  only inside allowed patterns followed: 34 → 5 real findings, fixed with Field hideLabel. COMPOSITION_OK.
- Checked: settings fields 90px before and after (unchanged); fields in Field fill their parent; the command bar's
  search keeps its width; docs/composition tables (28 rows) and the Posts reference render without errors.
- STANDARD.md › 02 Layout & Composition: the composition rule. Released as {V}.
