# Authoring the spec questions wizard

The owner answers the design spec's open questions in a wizard (`index.html` here, served at
`http://localhost:8767/Plenix/docs/briefs/spec-wording/wizard/`). They don't read long text: every question must **show**
what is current, what conflicts, and each option as a **live render** with the real Plenix Platform, plus a
recommendation based on mainstream UI practice.

## What you write

Only `sections/<section>.json`: an array with one record per question of that section in `questions.json` (same `id`).
`sections/actions.json` has a finished model record (`actions/button/1`): match its quality.

```json
{
  "id": "layout/grid/1",                      // from questions.json
  "title": "Plain-language question, under 90 characters",
  "context": "One or two sentences: what this is about and why it matters, no jargon.",
  "current": [                                  // the statements as they are now, quoted exactly from the spec or code
    { "where": "Grid · Overview (rec.text)", "text": "…", "conflict": true },
    { "where": "Grid · Anatomy (docs.anatomy)", "text": "…", "conflict": true }
  ],
  "renders": [ { "caption": "How it draws today", "jsx": "…" } ],   // optional but expected when it can be drawn
  "options": [                                  // 2 to 4; exactly one "recommended": true
    { "key": "A", "label": "Short label", "recommended": true, "text": "One or two sentences: what changes.",
      "render": { "caption": "…", "width": "600", "jsx": "…" } }      // or a list of renders
  ],
  "recommendation": "Which option and why, in two to four sentences, naming the mainstream practice.",
  "sources": [ "Material 3 · …", "Fluent 2 · …", "Apple HIG · …", "WAI-ARIA APG · …" ]
}
```

## Renders

- `jsx`: one JavaScript expression with `h` (React.createElement), `P` (window.Plenix: every Platform component, e.g.
  `P.Button`, `P.Inline`, `P.Stack`, `P.Card`, `P.DataGrid`, `P.Table`, `P.Tooltip`, `P.Dialog`, `P.Tabs`, `P.Badge`) and
  `React`. Read the component's header comment (`platform/components/<Name>/<Name>.jsx`, `platform/patterns/…`) for its
  real props. A small stateful demo can be written as an immediately-invoked component:
  `h(function Demo(){ const [v,s]=React.useState(1); return h(P.SegmentedControl,{…}); })`.
- `html`: Platform markup with `plx-` classes only. **No `style` attributes, no raw colors, no other libraries.**
- `width`: `"360"` (phone), `"600"` (narrow pane), `"840"` (tablet), `"1200"` (desktop), when the question is about width
  or wrapping. Show the same thing at two widths when the question is about a breakpoint.
- Show **variations side by side** when they help (each option its own render). Make conflicts visible: draw both
  versions the spec describes.
- Questions that are not visual (keyboard behavior, naming, a token name, a doc duplicate): still make it concrete.
  Draw an interactive demo people can Tab and arrow through, or a small `P.Table` comparing the options (key, what
  happens, who does it this way), or the two texts as they would read on the page.
- Plain language, American English, short sentences. Two or more sentences of guidance become bullets only in `text`
  fields when needed.

## Finding the facts

- The spec: `platform/design-system/` (`inventory.js`, `inventory-docs.js`, `parts/*.records.js`, `spec-parts.js`,
  `spec.js`). Search for the quoted strings in the question. The code: `platform/components`, `platform/patterns`,
  `platform/system/*.css`, `platform/tokens/*.tokens.json`. Quote exactly; say which is which in `where`.
- When the code settles it (the component already does one of the two things), say so in `context` and recommend that,
  unless mainstream practice clearly says otherwise.

## Recommendations

Base them on mainstream practice and name it in `sources`: Material 3, Fluent 2 (Microsoft), Apple HIG, IBM Carbon,
Atlassian, Shopify Polaris, GOV.UK, the WAI-ARIA Authoring Practices, WCAG 2.2. Prefer the option that matches the
current code and Plenix's own rules (no link-styled buttons, statuses as badges with icons, full inside table lines,
American English, nothing hard-coded) unless that is clearly worse for people.

## Done

Run `node docs/briefs/spec-wording/wizard/check.js <section>` until it prints `WIZARD_OK`. It validates the records and
opens every question in headless Chrome (a drawing that throws or renders nothing fails). Write nothing else: no spec,
code or other section files. Do not commit.

## Already settled

When the spec (the checkout's or the `origin/spec-wording-3` branch) already reads the way the question proposes, add
`"settled": true` to the record, quote the new text in `current`, and recommend keeping it. The wizard groups these so the
owner can confirm them in one click.
