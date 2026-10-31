# rich-text-clean-689

Formatted text that people write (notes, comments, descriptions) cannot carry harmful code into Plenix, while bold, links, lists and tables still work.

- File: `tests/rich-text-clean-689.test.js`

## What it checks
- Feeds the rich-text cleaner (`cleanRichText`) a long list of known attack samples, each a case of its own:
  - script and style tags in any letter case;
  - event attributes (onerror, onclick, …) on every kind of element;
  - `javascript:`, `data:` and `vbscript:` addresses in links and pictures, plain and disguised (entities, tabs and newlines in the scheme, leading spaces, mixed case);
  - svg and math with hidden scripts; frames, objects, embeds, forms, inputs, buttons, base, link and meta refresh;
  - style attributes with `url()` or `expression()`;
  - tricky nesting (noscript, template, textarea, title and others), comments, CDATA, broken markup.
- Three checks on every sample:
  - Structure: the output holds only allowed elements and attributes, no event attribute, only safe link and picture addresses, and only the five formatting style properties (color, background color, font, size, alignment).
  - Stable: cleaning the output again gives the same result.
  - Nothing runs: put on the page in a block and in a table cell, no sample raises the test counter, and the page does not navigate away.
- Allowed formatting is kept: bold, italic, underline, strikethrough, code, sub and superscript, highlight with a color, links (https, mailto, relative), lists, numbered lists with a start, quotes, headings, tables with merged cells, pictures from https, colored and sized text, paragraph alignment, task items with checkboxes.
- A few named cases: a `javascript:` link keeps no address; a `data:` picture loses its source; a script element becomes plain text.
- No script errors.

## Why it exists
- Issue #689, "Audit (Medium): the rich-text sanitizer has no test with hostile input", from the audit #684. The issue says the cleaner is the only gate between user-written HTML and the page, and no test named it, so a later edit could loosen it unnoticed.
- Added in commit ff3bdb16 "#689: a test of the rich-text sanitizer with hostile input (written, not run)".

## How it checks
- Opens `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) from the local test server in Chrome.
- Runs `Plenix.cleanRichText` on every sample in the page, inspects the result, puts it on the page, and waits 1.5 seconds for anything to fire.
- First proves the test can fail: a cleaner that returned its input unchanged would fail the structure, execution and address checks on the first sample (in the file header).

## What a failure means
- A person could paste or type text that runs code in other people's browsers (stealing sessions or data).
- Or normal formatting (links, tables, colors) is stripped from what people write.

## When it runs
- A child of `layout.test.js`. Layout runs it when the rich-text cleaner (`utils/richTextClean.js`), RichText or RichTextEditor changes, or when this file or the fixture it loads (`platform-host.html`) changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/rich-text-clean-689.test.js`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The built Platform (`platform/dist/platform.js`; `node build-app.js`).
- The fixture `tests/fixtures/platform-host.html`.
