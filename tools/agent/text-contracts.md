# Text contracts: the Phase 4 migration recipe

The rule is the Plenix Styling Standard, section 6. The roles are `platform/tokens/semantic/typography.tokens.json`
(written as `--plx-sys-text-<role>-<property>`), the declarations `platform/standards/text-contracts.json`, the check
`check-system.rules/text-contract.js`, the migration list `check-system.text-contract.json` (it only shrinks).

## Clearing a part from the migration list

A part on the list changes the font family (it enters another role: a data value, a label, a heading) but sets only
some of the role's properties and inherits the rest from wherever it sits. That is where the word-spacing leak came from.

1. **Find its role.** Which of the roles is it: body, secondary, caption, label, heading, title, eyebrow, display, lead,
   data, code? A part whose look is none of them keeps its own tokens, but each of them references the closest role's
   longhand for every property they share, and the part declares all six.
2. **Measure what it computes today**, in every place it appears (the applications and its spec pages): family, size,
   weight, letter spacing, line height and word spacing. A property it inherits can differ from place to place.
3. **Apply the whole role**: the part's six declarations, each from the role (through the part's own tokens, which then
   reference `{plx-sys.text-<role>-<property>}`).
4. **Compare.** Where the role's value equals what the part computed everywhere, nothing changes: clear it. Where it does
   not (most often the line height it inherited, or a weight), that is a visible change: list it with before and after
   and leave the part on the list until the owner decides.
5. **Declare it**: `node check-system.rules/text-contract.js --record` rewrites the declarations from the stylesheets;
   check that the diff of `text-contracts.json` shows only your parts (now `establishes` with their role), then
   `--shrink`.

## Never

- A parent setting a child's text: it sets its own text context only (Standard 6, the boundary rule).
- `font-family` without `word-spacing` in the same rule.
- Editing `text-contracts.json` by hand to make the check pass: the declaration follows the stylesheet, on purpose.
