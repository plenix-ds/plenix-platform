# A block in the other direction: what the Platform does, what the app does

Written for CTM's report questions (an Arabic question block in an English portal; issue 413, owner ctm-needs-34). Checked on Plenix styling/phase-2 at 5a620b5c, which ships in the next release.

## What the Platform does (from the next release)

| Behavior | How it works |
|---|---|
| The block's direction | Every part lays out with logical properties and `:dir()` rules, so it follows the nearest `dir` attribute: a wrapper's, or the part's own. |
| Fieldset, Checkbox, Radio, Switch | `dir` and `lang` on the part go on its own element (the `<fieldset>`, the row's `<label>`). The legend, the question text and the box change sides with it. |
| NavList, Panel, SplitView | Follow the nearest `dir`. A category list in an Arabic wrapper starts at the right. |
| Language | `lang` tells screen readers, spelling and translation tools which language the text is. `dir` alone does not set it. The Arabic type (IBM Plex Sans Arabic, Readex Pro for titles) comes from the letters themselves, with or without `lang`. |
| The page around the block | Keeps its own direction. Nothing scrolls sideways. |

Proof: `tests/fixtures/rtl-ctm-question.html` draws CTM's exact block (council-case.js, the question categories and the question selection) with the Platform alone. `tests/rtl-ctm-question.test.js` checks it both ways: an Arabic block in an English page, and an English block in an Arabic page.

## What the app does

- Put `dir` and `lang` on the block, never the CSS `direction` property. The Platform's `:dir(rtl)` rules answer only to the attribute.
- The supported way, for a question set: `<Fieldset dir="rtl" lang="ar" legend="…">` around its Checkboxes and Radios, and `dir="rtl" lang="ar"` on the wrapper of anything else in the same language (the category NavList).
- For an English block in an Arabic page, the same with `dir="ltr" lang="en"`.

## CTM: drop the patch (ctm.css lines 295 to 304)

CTM's own rules are no longer needed. Its wrapper's `dir="rtl"` already turns the block on the next Plenix release.

1. Delete from `static/ctm/ctm.css`:
   ```css
   /* Arabic report questions are an RTL reading surface, independent of the portal shell language. */
   .ctm-report-question-language--rtl {
     direction: rtl;
     text-align: right;
   }

   .ctm-report-question-language--rtl .plx-check,
   .ctm-report-question-language--rtl .plx-check__text,
   .ctm-report-question-language--rtl .plx-fieldset__legend {
     direction: rtl;
     text-align: right;
   }
   ```
2. In `static/ctm/council-case.js` (the two wrappers at lines 1419 and 1427), add the language beside the direction:
   ```js
   dir: form.language === "ar" ? "rtl" : undefined,
   lang: form.language === "ar" ? "ar" : undefined,
   ```
   Or put `dir: "rtl", lang: "ar"` on the `P.Fieldset` itself.
3. The `ctm-report-question-language--rtl` class then has no rules. Remove it, or keep it as a hook for CTM's own tests.

## Identifiers and technical values (owner, #590 and #606)

- A computed identifier or case number (20261020-01) reads `01-20261020` in a right-to-left page, with each number in its own order, and `20261020-01` in a left-to-right page. This is the owner's rule: "01-20261020 everywhere".
- The identifier is shown that way by `Isolate kind="id"`, a DataGrid column of kind `id`, `DataPill kind="id"`, and `PropertyList.Item kind="id"`. The stored text is never changed: copy, search and screen readers get `20261020-01`.
- An email, a web address, a phone number and code stay left to right (`Isolate` with its default, or kinds `email`, `url`, `phone`, `code`).
- Arabic-Indic digits apply where they are on (`٢٠٢٦١٠٢٠-٠١`); the order of the two numbers is the same.
- The default of `Isolate` is unchanged (left to right), so existing uses keep their order. A use for an identifier moves to `kind="id"`. This is a visible change for CTM: tell CTM before it moves to the release that has this.
- The editor (RichTextEditor) needs no change: an identifier typed into Arabic text already reads `01-20261020`.

## Known limits

- A count in a NavList (the "(3)" beside a category) takes its digits from the page's language, not the block's. An English block in an Arabic page shows "(٣)".
