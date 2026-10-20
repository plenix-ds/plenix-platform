# Zero overlap: the rollout recipe

The rule is the Plenix Styling Standard (`platform/standards/styling.md`), sections 3.3 (exclusive assignments), 3.5
(the definition) and 3.6 (the five selector kinds). The pilot (commit d5135035: Button, Input, NavList, Icon, Floating,
reduced motion, the reset) is the worked example: read its diff before starting a component.

## The definition

For every element and pseudo-element, in each condition, at most one Plenix declaration assigns a property, custom
properties included. Inheritance is not an overlap. There are no exceptions; what is not done yet is the backlog.

## The two backlogs (they only shrink)

- `check-system.selector-kinds.json`: every selector that is not one of the five kinds (component, behavior, foundation,
  base, condition). `node check-system.rules/selector-kinds.js` fails on anything new; after a repair run
  `node check-system.rules/selector-kinds.js --shrink`. Never run `--baseline`: Claude records it.
- `tests/baselines/overlap-strict.json`: every runtime overlap on the 14 application pages.
  `node tests/clash-audit.js --strict --check --pages <names>` fails on anything new and lists what is gone.

## How to repair a component

1. **Dump its rules** one declaration per line and list its runtime pairs (the audit's `--strict` output, or the
   pilot's `pilot-pairs.js` approach: mark the component's elements and audit them).
2. **Flat selectors.** No descendant, child or sibling combinator, no `:has()`, no `&`.
   - A part that changes with its root's state takes the state as **its own class** from the JSX
     (`plx-button__caret--open`, `plx-nav-list__icon--muted`, `plx-popover__arrow--top`).
   - A pointer state of the root (hover, focus-within) reaches its parts as a **context variable** set on the element
     that holds them (`.plx-nav-list__entry:is(:hover, :focus-within){--plx-comp-nav-list-context-pin-opacity:1}`), read
     with a fallback (`opacity:var(--plx-comp-nav-list-context-pin-opacity,0)`). A component that can contain itself
     uses the class, never the variable.
   - A colored surface reaches its children through `SurfaceContext` (Button reads it), never `[data-…] .child`.
   - A root modifier that changes the parts (a variant, a size): **every part carries it as its own class**
     (`plx-tabs__tab--segmented`, `plx-segmented__item--sm`). A part inside another instance of the same component then
     never takes the outer one's look (the spec's sample tabs sat inside its folder tabs and wore the folder look).
   - Position in a row (ends, joins): the JSX marks it (`plx-tabs__tab--first|--last|--joined`), or the part's own
     `:first-child` / `:not(:first-child)` / `:last-child` sets a state variable. A pseudo-element reads its element's
     value through a context variable (`--plx-comp-<c>-context-…`, unregistered): registered state variables do not
     inherit into `::before` / `::after`.
   - A part that shows its item's keyboard focus (a tree row for its focused item): the component sets
     `is-focus-visible` on the part from the item's `:focus-visible` (Tree, TreeSelect).
   - A pattern that sizes the fields in it publishes context values, it never reaches into them:
     `--plx-comp-field-context-stretch-inline-size` (a form, a dialog) and `--plx-comp-field-context-content-…` (a
     toolbar, the header). Each field reads them in one rule its width props leave alone, content over stretch over its
     own: `inline-size:var(--plx-comp-field-context-content-inline-size,var(--plx-comp-field-context-stretch-inline-size,auto))`.
   - The page's modes (layout-modes.css, generated) are context values the main region or the shell publishes; AppShell,
     PageContent and Settings read them.
   - Paper: no rule for print. The owner reads a print token with its screen value as the fallback
     (`display:var(--plx-sys-print-hidden,flex)`, `break-inside:var(--plx-sys-print-keep,auto)`).
   - Width ranges are exclusive: `@media (600px <= width < 840px)`, `@container main-region (1024px <= width < 1440px)`;
     never a cascade of `min-width` blocks over a base rule.
3. **Each property once.** The element's own rule declares it, reading a state variable with its default as the fallback:
   `background-color:var(--plx-state-button-background,var(--plx-comp-button-background))`.
   - State variables are named `--plx-state-<component>-<what>` and registered in the same stylesheet:
     `@property --plx-state-button-background{syntax:"*";inherits:false;}`.
4. **Exclusive assignments.** Variants, sizes and states assign the variable (or a property no other rule sets) under
   conditions that cannot both hold: put the exclusions in `:where(:not(…))` so specificity stays at 0,2,0 or less.
   - Order the states as the Standard's matrix says: disabled > pressed > hover > selected > rest (a component may
     refine it in its header comment). The assignment is exclusive, not the states.
   - Exclusive kinds (a text area against a text field, a color well) declare their own sizes and padding.
   - A default size or variant: either the fallback, or `:where(:not(.x--sm, .x--lg))`.
   - `:disabled` and `[aria-disabled="true"]` together: `:is(:disabled, [aria-disabled="true"])`.
   - Write a pointer state with its documentation twin in one list, `:is(:hover, .is-hover)`, and a selected or
     current part with the state class on the part itself (`.plx-tree__row.is-selected`, `.plx-app-switcher__open.is-current`),
     not a modifier: the spec's state reader (spec.js) finds `.is-…` and the pseudo-classes, and draws its state samples
     from them.
5. **What a component never declares:** `box-sizing` (the reset owns it on every element) and `scrollbar-color` /
   `scrollbar-width` (the base owns them). A component on a raw tag sets its own margins and padding: the reset reaches
   raw elements only.
6. **Two classes on one element** only when they set different properties. A component that wears another block's class
   (the Select control's `plx-input`) gets its own class and its own rules on shared tokens.
7. **Update the component's header comment** (its state order) and its JSX header (new classes).
8. **Icons the component draws in its own state** are filled by the component: `stateIcon(icon, on)` from
   `components/Icon/Icon.jsx` (Button, NavList, Tabs, SegmentedControl, AppHeader, ToolRail already do). The transitional ancestor rule is retired (2026-10-20): nothing fills an icon from an ancestor. Content inside a
   selected row or card stays outline (owner); only the component's own state icon fills.

## Proof (for every change)

- `node build-app.js`, `node check-system.js` (SYSTEM_OK, apart from findings that are not yours), `node check-spec.js`
  (a new modifier needs a variant card or a `NOT_VARIANTS` reason).
- `node tests/selector-kinds.test.js` and `node tests/zero-overlap.test.js` stay OK.
- `node tests/clash-audit.js --strict --check --pages <the pages that use it>`.
- **No visual change** except the matrix corrections the Standard requires (a hovered disabled control stays disabled);
  list each one in the PR with before and after. Compare computed styles before and after on the component's spec pages
  and the application pages that use it (`tests/compare-styles.js`, or the styling-proof workflow).
- Dispatch the **Styling proof** workflow and list the run in the PR. Never wait for it.
