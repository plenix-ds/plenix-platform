# Contributing to Plenix

Plenix is the one source for every Plenix product: its components, patterns, tokens and icons. Changes go through one
path, so the design system, the packages, the CDN and the API never disagree.

## Who decides

The owner decides every addition. A proposal (below) comes first, with numbered options and the recommendation first; his
chat instruction or dashboard tap approves it. Changes ship once the QA Engineer clears them; a change to how something
looks then gets the owner's QA as a follow-up, which never blocks a release.

## The path of a new item

| Stage | What exists | Status on its design system page |
|---|---|---|
| 1. Proposed | An issue made with the **Component proposal** form | — |
| 2. Placeholder | Its entry in the UI Inventory, with the common-ground guidance of the enterprise systems | *Guidance written, not built* |
| 3. Built | Its JSX and CSS in `platform/`, its record in `inventory.js`, its written sections | *Experimental*, then *Active* |
| 4. Released | In a version: the packages, the CDN folder and the API | *Active*, then *Mature* |

Later stages: *Legacy* (not for new work), *Deprecated* (with its replacement; removed no earlier than the next MINOR
before 1.0, the next MAJOR after), *Archived*. See `VERSIONING.md`.

## Before proposing an item

1. Search the UI Inventory: its canonical names and aliases. Most needs are already an item, a variant or a composite.
2. Decide what it is: a component, a variant of one, a composite, a pattern, a page structure, or an implementation
   detail.
3. Add an item only when it solves a distinct problem, has its own anatomy or behavior, or its own accessibility needs.
   Do not add one that differs only by color, radius, shadow, density or branding, or that renames or wraps another.

## Building it: the rules every change must keep

- **Tokens only.** Every value comes from a token (`platform/tokens/*.tokens.json`); nothing hard-coded, no inline
  styles, no 1px or 2px nudges, no window units. When something needed is not defined, ask.
- **No new colors.** New roles point to existing palette colors.
- **Components, not utilities.** Edits happen in the component, using token values.
- **Type and layout.** DM Sans for all interface text, Reddit Mono only for code and technical values. Sizes sit on the
  4px grid and the defined control roles. Focused and invalid fields change only the border color.
- **One canonical home.** Its record in `inventory.js` (section, aliases, use and avoid, related items, mappings,
  status, owner), and its header comment (Summary, Usage, Props) kept accurate: the API tables and the TypeScript
  definitions are generated from it.
- **Accessible.** An accessible name, a visible focus indicator, keyboard operation, 44px targets on touch, contrast
  from the theme roles in light and dark, reduced motion honored, logical (right-to-left safe) properties.
- **American English**, sentence case, plain wording.

## Review checklist (every pull request)

- [ ] `node build-app.js` and `node build-usage.js` succeed (check the exit code)
- [ ] `node check-system.js`, `node check-style.js`, `npm run lint:css` and `node check-spec.js` pass
- [ ] No test was run by the author: tests run only when the owner starts them (HANDOFF.md, "No tests")
- [ ] A change meant to look different: it is listed under *Changed (visual)* with a picture; the owner updates the visual baseline himself
- [ ] The design system page is complete: no "Not written yet" on a built item
- [ ] `CHANGELOG.md` has an entry under **Unreleased**
- [ ] The work is logged as a batch (Plenix - DAM/audit/batches/), with what changed and how it was verified

## Releasing

See `VERSIONING.md` › Releasing.
