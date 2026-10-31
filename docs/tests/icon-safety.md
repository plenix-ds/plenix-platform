# icon-safety

An icon file cannot be used to sneak harmful code into a Plenix page.

- File: `tests/icon-safety.test.js`

## What it checks
- A file in the shipped shape (one drawing in one frame) passes, and its drawing is read correctly.
- Hostile icon files are refused, each with a clear reason:
  - script elements, event attributes (onload, onclick), `javascript:` links, `<use>` references, styles with `url()`;
  - foreignObject, image, group, animation and other elements;
  - doctypes, entities, CDATA, comments and processing instructions;
  - values outside their allowed form (the drawing path, transform, frame size, namespace, fill);
  - a second drawing, stray text, no drawing at all, unquoted or repeated attributes;
  - basic shapes (circle, rect, polygon).
- Size limits: a file or a drawing path over its limit is refused before it is read, and the limits stay within set bounds.
- A refusal message quotes at most 40 characters of a name from the file.
- Very long hostile values (30,000 spaces or digits, 200,000-character module values) are refused within 250 ms.
- A number is read one way only: `1e999` and four-digit exponents are refused.
- Fill rule and clip rule must match exactly.
- A drawing from an icon module follows the same rules.
- Every shipped icon file (more than 1,000) passes and reads exactly as the build reads it.

## Why it exists
- Issue #285, "Icons (#277): treat loaded SVG as untrusted input (parse, never insert as HTML)". Stage 4 of the icon plan #277 (in the file header).
- The message-length and speed checks came from QA on #519 (in the file).
- Added in commit ac70356c "Icons stage 4 (#285): a loaded icon file is untrusted".

## How it checks
- Loads `platform/utils/iconSafety.js` (the allow-list reader) in Node, the way the formats test loads its module. No browser.
- Feeds it a good sample and many hostile variants, and reads every `.svg` file in `platform/icons`, `platform/icons/custom` and `platform/icons/library`.

## What a failure means
- A tampered icon file could run code in a person's browser, or the icon reader could hang on a crafted file.
- Or a real Plenix icon is refused and shows blank.

## When it runs
- AUTOMATIC group in `tests/run.js`, so `npm test` and `npm run test:full` run it. It has no changed-mode filter: it always runs when started.
- It is NOT in the `ci.yml` build job or browser matrix and NOT in `full.yml`, so CI never runs it.
- By hand: `node tests/icon-safety.test.js`.

## What it needs
- Node only (no browser, no server), with the installed packages (`@babel/standalone`).
- `platform/utils/iconSafety.js`, `platform/icons/layout.js` and the icon files in `platform/icons/`.
