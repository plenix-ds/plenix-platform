# Plenix Styling Standard: ownership, composition and precedence

How every Plenix component, pattern, template and page is styled and composed, so that no two rules clash on one
element and no component styles another. It applies to the Platform (`platform/`), the suite's applications, the
Asset Manager and the design-system site. "Must" and "never" are requirements. The checks in section 13 enforce it.

Code that does not conform yet is listed by file and reason in `check-system.exceptions.json`. That list may only
shrink: a new violation fails the build, and an entry that no longer occurs must be removed.

## 1. Principles

Every property of every element has one responsible owner. Layout arranges, components style themselves, and themes,
densities and interaction environments supply values through tokens. A parent never reaches into a child: it changes a
child only through the child's own props, variants or published tokens. Reuse is explicit: a shared token, a
documented inheritance, or a composed component. Cascade layers declare the precedence between categories (elements,
layout, components, utilities); inside one layer, an owner's base, variant and state rules follow a documented order.
Precedence never relies on `!important`. The CSS is longhand, token-only and free of unused classes and duplicate
declarations. Machines enforce all of it; every release proves the UI unchanged.

The cascade is not banned. A button variant replacing its base background is CSS working as designed. The target is
**zero unexplained overlaps**: no cross-owner conflicts, no redundancy, no undocumented exceptions. Nothing in this
document is a guarantee that overlaps cannot happen; the rules make them unlikely, and the checks catch them.

## 2. Foundation

- React components in JSX, the Babel build, the vendored runtime, and the self-hosted CDN and npm packages.
- BEM-style `plx-` classes and one stylesheet per component.
- Design tokens: W3C JSON, generated CSS, and the three tiers (ref, sys, comp). Semantic tokens stay separate even
  when they share a value.
- Themes, the three densities, the three interaction environments, and the 4px grid.
- Layout primitives, AppShell, the composition standard (regions, layout-neutral fields), and the five layout layers.
- DM Sans as the text font (it sets the standard), Reddit Mono fitted to it, and both fonts self-hosted.
- Longhand properties, logical properties, tokens only, no inline styles, no new colors without approval, and American
  English.

These are the foundation the rest of this standard builds on.

## 3. Ownership

### 3.1 Owners

| Owner | Owns | Never owns |
|---|---|---|
| Tokens and modes (theme, density, interaction) | Values, through token contracts | Selectors for components |
| Base elements (`elements.css`) | A baseline for raw HTML inside content: prose and unstyled markup only (see 3.4) | Any property a component sets on its own elements |
| Layout primitives and patterns | Arrangement: spacing between children (`gap`), tracks, region sizes, overflow policy | A child's typography, icon size, internal spacing or look |
| Component | Its anatomy, internal spacing, typography, appearance, sizes, variants and states | Its placement in a page |
| Utilities | Narrow, documented layout helpers | What a component or pattern API already offers |
| Application | Pages: a template filled with patterns, and narrowly scoped layout of its own wrappers (section 12) | Restyling a component |

### 3.2 The rule

> Each property has one responsible owner. That owner may declare base, variant, responsive and state values.
> Components own their structure and their own styling. They may inherit documented context (typography, color) and
> reference shared tokens. Parents arrange children and set their own context, but never style a child's private
> parts. A child gets a different look only through its own props, variants or published tokens.

Review question for every parent rule: **is this parent arranging the child, or redesigning it?** Redesigning becomes
a child prop, variant or token.

### 3.3 Variants and states: direct or by value

The owner may declare a property in its base rule and again in its variant and state rules:

```css
.plx-button--ghost { color: var(--plx-comp-button-ghost-text); }
.plx-button--ghost:hover { color: var(--plx-comp-button-ghost-hover-text); }
```

Where it makes value selection or reuse clearer, variants set a value the property reads instead:

```css
.plx-button { background-color: var(--_button-background); }
.plx-button--danger { --_button-background: var(--plx-comp-button-danger-background); }
.plx-button--ghost { --_button-background: var(--plx-comp-button-ghost-background); }
```

Both are allowed. **Variants by value are preferred** when:
- several parts depend on the same decision;
- a value changes across variants, modes or states;
- a public hook is involved;
- central value selection makes precedence easier to inspect.

**Direct declarations are preferred** when a state changes one simple property, when a variant changes structure or
layout, or when a private variable would add indirection without reuse. Finite choices are variant props
(`size="sm"`, `variant="outlined"`, `density="compact"`); independent states are booleans (`disabled`), never
overlapping appearance flags.

**States: a matrix, not one ranking.** A single source-order list cannot settle every combination. Each interactive
component documents its states in independent dimensions, and for each affected property which state wins:

- **Dimensions:**
  - availability: enabled, disabled, read-only;
  - value: checked, selected, expanded;
  - interaction: hover, pressed, focus-visible;
  - validation: default, invalid;
  - progress: idle, loading.
- **Platform defaults** (a component may refine them in its contract):

  | Property or behavior | Resolution |
  |---|---|
  | Background | The variant or selection sets the base; hover and pressed adjust it only where interaction is possible |
  | Invalid fill | The invalid field keeps its lightest red fill, also on hover |
  | Border color | Invalid keeps the danger border, also while focused (the owner's rule: focus changes the border only, never a ring) |
  | Focus | Stays identifiable in every combination; focused + invalid has one approved look, not two rules fighting over the border |
  | Disabled | Suppresses hover and pressed; keeps a meaningful selection or value |
  | Loading | Defined per component: label kept or replaced, spinner, activation blocked. Loading is not automatically disabled |

- **What each interactive component records:** default, hover, pressed, focus-visible, selected/checked, invalid,
  disabled and loading where they apply, plus its important combinations, each with expected computed values and a
  visual test.
- **How the CSS expresses it:** selectors of equal weight (section 9), mutually exclusive conditions where possible
  (`:not([aria-disabled="true"]):hover`), or a state-to-value mapping through the component's private variables.
  Never by accident of file position.

### 3.4 Base element styles

Element rules may set properties for raw HTML only where no component owns them:
- The baseline for content (headings, paragraphs, lists, links, `code` and `kbd` in running text) applies inside a
  content scope: prose, rich text and documentation.
- Outside that scope, element rules avoid every property a component sets. For example, `button { font-family:
  inherit; }` cannot apply to `.plx-button`, which sets its own font.

Element rules outside the content scope that set a property a component owns are violations, listed in the exceptions file until narrowed.

## 4. How a parent changes a child

Allowed, in this order of preference:

1. **Props and variants:** `<Avatar size="28" />`, `<Stack gap="sm">`, `<ActivityList density="compact" />`. A prop
   applies to that one instance, and always wins over a context token.
2. **Slots:** the child decides where composed content goes.
3. **Published tokens (styling hooks):** component tokens the child declares as its public API.

Not allowed: a selector from a parent into another component's classes (`.plx-app-header__item .plx-avatar`,
`.plx-notification-list .plx-activity-list__title`).

New props or variants are added only for a real, repeated need. A one-off uses an existing variant or token.

### 4.1 How published tokens work (scope and inheritance)

Custom properties inherit through every descendant. A styling hook is therefore a **context**: when a parent sets one
on its own element, it applies to every instance of that component inside it, nested instances included.

- **The component reads the hook with a fallback, and never declares the hook itself,** so the context can reach it:

  ```css
  /* the composing pattern supplies context on its own element */
  .plx-example-context { --plx-comp-example-background: var(--plx-sys-surface-sunken); }

  /* the component reads the hook, with its default as the fallback */
  .plx-example { background-color: var(--plx-comp-example-background, var(--plx-sys-surface-default)); }
  ```

- **One instance only:** use a prop, not a hook.
- **Nested instances:** inherit the same context. A component that must not pass its context into nested instances of
  itself documents that, and re-declares the hook on its own root from its prop or default.
- **Private variables** (named `--_…`) also inherit, so they are not a boundary. A component sets its private
  variables on its own root, and nested instances set their own.
- **The hook list:** each component documents its hooks as public, with their scope ("applies to every X inside the
  element that sets it"). Everything else is private and may not be set from outside.

### 4.2 What may become a public hook

A variable existing in a stylesheet is not a promise. Three categories stay separate:

| Category | Contract |
|---|---|
| Semantic tokens (`--plx-sys-*`) | Supported inputs for themes |
| Public component hooks | Explicitly supported customization points, kept stable as an API |
| Internal component values (most `--plx-comp-*`, all `--_*`) | Implementation details; may change without notice |

A component token becomes a public hook only when:
- a real, repeated need asks for it;
- it is understandable without knowing the component's markup;
- its values, scope and behavior across states, densities and themes can be documented;
- Plenix is willing to keep it stable.

Good candidates: a constrained content size, a chart's series mapping, a documented aspect ratio. Not exposed: control
height, the focus border, a font family, internal paddings. Plenix's own applications use props, never hooks.

## 5. Reuse

| Form | Rule |
|---|---|
| Shared token | Always allowed. Many components using one token is one decision reused. |
| Documented inheritance | Allowed when the component's contract says what it inherits: an icon's `currentColor`, an inline link, a data value inside a sentence keeping the sentence's size. |
| Composition | A component that needs another renders it with its props. It never copies or restyles it. |

## 6. Typography: documented text contracts

**Text roles.**
- Each text role (body, label, heading levels, caption/eyebrow, data, code, and component roles that differ) is a W3C
  `typography` composite token: `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing` and `lineHeight`.
- Word spacing is not part of that standard type. Plenix keeps it as a companion token, recorded in the role's
  `$extensions.plenix`:
  - the data and code roles carry the fitted word spacing (`--plx-sys-font-data-word-spacing`);
  - the DM Sans roles carry `normal`.
- The generator writes each role as coordinated longhand declarations, the companion word spacing included.
- The roles are generated from the existing tokens, not maintained by hand.

**Three contracts.** Each component documents which one it has:

| Contract | Meaning | Example |
|---|---|---|
| Follows surrounding typography | Inherits its text style and declares none of it | An inline link in a sentence |
| Inherits with a documented adjustment | Inherits the role and sets only the documented properties | Emphasized text that changes weight only |
| Establishes a role | Applies a complete role | A heading; a label; a DM Sans badge inside a Reddit Mono data cell; a code value |

**The boundary rule.** When a component changes text role, it must set every property that would otherwise carry
across incompatibly. This applies most of all between ordinary and technical text: family and word spacing at least.
The word-spacing leak happened exactly there.

- A parent sets only its own text context. It never targets a child's class to change its text.
- A word spacing written in em turns into pixels where it is declared, and descendants inherit those pixels. A role
  applied at its own size reads the token again, at its own size.

## 7. Layout, spacing and framing

- **Spacing between things:** comes from the container's `gap` (Stack, Inline, Columns, Grid) or the pattern
  (Form, SettingsSection). Reusable controls and display components have **no default outer margin**.
- **Spacing inside a component:** the component's own business, margins included (a label to its input lives inside
  Field; the distance between two Fields belongs to Form or Stack).
- **Allowed exceptions:** prose containers own their document rhythm; layout primitives may use alignment and bleed
  mechanisms. Any other root margin is a named exception stating its owner and why `gap` does not fit.
- **Composition:** the composition standard stays the source: page kinds, regions, patterns per region, and fields
  sized by the pattern around them.
- **Framing as a composition choice:**
  - Framed containers (Panel, Card, a contained Tabs panel, CodeBlock, Notice, Fieldset, DropZone, Table, DataGrid)
    expose a framed and an unframed presentation where both are valid.
  - The pattern chooses the presentation, and a composition check flags a third frame.
  - `nesting.css` stays only as a defensive fallback until every pattern chooses explicitly.

## 8. Precedence: cascade layers, no `!important`

- **One declared order, central in `platform.css`. The whole Platform sits in one named layer, `plx`, with its own
  order nested inside** (as Mantine and Kelp UI do):

  ```css
  @layer plx {
    @layer vendor, reset, tokens, elements, layout, components, patterns, utilities;
  }
  ```

  - The Platform has no application layer inside it. A product places Plenix relative to its own CSS, for example
    `@layer plx, app;`. The product's layer comes last, so its narrowly scoped layout rules (section 12) need no
    `!important`, and it never holds rules for Platform components.
  - The order runs from general to specific: foreign CSS first, then the reset, values, raw elements, arrangement,
    components, compositions, and utilities, the most deliberate per-element choice, last.
  - Theme, density and interaction rules supply token values only; they never become late component-override layers.
  - Utilities hold only approved layout helpers, never color, typography or control overrides.
  - A later layer never grants ownership: a pattern rule into a child component stays prohibited even with predictable
    precedence.
- **Layers order categories; inside a layer, specificity and source order still decide.** That is why each
  component's state matrix (3.3) is documented, and why selectors inside a component keep equal weight where states
  combine.
- **Every production stylesheet is assigned to its layer, all at once.** Unlayered CSS beats layered CSS, so a partial
  move would invert precedence.
- **Vendor CSS:** optional third-party styles belong in `vendor`. The retired table engine and its temporary exceptions have been removed.
- **Utilities:** they win by layer order. Every `!important` is removed in verified batches; an important declaration
  reverses layer precedence, so batches are tested before release.
- **Everything else layered too:**
  - the bundle (`platform.bundle.css`, CDN `plenix.css`);
  - the web-components stylesheet (`plenix-shadow.css`);
  - the design-system site's own sheets.

  Unlayered production rules fail the build.
- **What layers do not do:** they declare precedence. They do not stop a parent reaching into a child; ownership rules
  do that.

## 9. Writing CSS

- Longhand properties, logical properties, every value a token.
- **Flat selectors are the default:**
  - each part is styled by its own element class (`.plx-card__title`), not by a chain (`.plx-card .plx-card__title`);
  - selectors inside a component's own anatomy are permitted where they express a documented structural or state
    relationship (an open item's chevron, a selected row's cells);
  - selectors into another component's classes are never permitted.

  Flat selectors are a maintainability convention, not a guarantee against overlaps; custom properties still cascade
  and inherit.
- **Allowed in a component's selectors:** its root, its elements, its modifiers, its documented states (`.is-…`,
  `[aria-…]`, `[data-plx-…]`, pseudo-classes), and responsive and mode conditions.
- **Specificity:** a normal selector is one class (0,1,0); the routine maximum is a class plus one state, modifier,
  attribute or pseudo-class (0,2,0). No IDs. A combined state that would need more is resolved first by mutually
  exclusive conditions or a state-to-value mapping; otherwise it is a registered exception. Specificity is never raised
  to fix an ordering problem. Vendor CSS is tracked separately.
- No selector that depends on unrelated DOM structure.
- No unused class. No class that repeats what a component, an option or a token already does. No declaration that
  another rule already gives the same element.
- `@scope` may be used where it limits a local style region. It is an aid, not the ownership model.

## 10. Writing JSX

- No duplicate props on an element.
- No accidental prop forwarding (a `className` or `style` passed down unseen).
- No inline styles. JavaScript may set a size only when it equals a token value on the 4px grid, through classes or
  constructed stylesheets.
- **`className` policy:**

  | Component category | `className` |
  |---|---|
  | Layout primitives | Accepted on the documented root, for layout integration |
  | Structural patterns | Accepted only at documented integration points |
  | Styled controls and display components | Not an appearance override |
  | Internal parts (slots) | No class injection unless explicitly published |
  | Migration escape hatch | Named, registered and temporary |

  Where a class is accepted, it always lands on the documented root. Portal content (menus, popovers, dialogs) sits
  outside the root and is documented separately. Accepting a class never means permission to override every property:
  the checks verify what the class sets, not only that the prop exists.

## 11. How to build a component

Every component follows this recipe.

**1. Decide its contract before writing CSS.**

- **Props:** what can a user of the component change? Its variants, sizes and states, as props.
- **Published tokens:** which component tokens are public styling hooks, with their scope; the rest are private.
- **Typography:** which of the three text contracts (section 6), and which role if it establishes one.
- **States:** its state matrix (3.3).
- **Layout:** none. A component never decides its own placement or outer spacing.

**The component contract** (published on its design-system page):

```text
Typography:          follows / documented adjustment / establishes role (which)
Layout integration:  supported props, and the className target if any
Public hooks:        explicit list with scope, or none
Variants:            supported values and combinations
States:              dimensions and conflict resolutions (the matrix)
Outer spacing:       none, or the named exception
Specificity:         none above 0,2,0, or the registered exception
```

**2. Tokens.** Component tokens in `platform/tokens/components/<name>.tokens.json`, each pointing to a system token,
never a raw value. One token per decision; the public ones say so, and give their scope, in their description.

**3. Markup (JSX).**

- **Classes:** one block class on the root (`plx-avatar`); one element class on each styled part (`plx-avatar__image`);
  modifiers and states as classes or ARIA and data attributes, set from props.
- **Composition:** other components are rendered with their props, never wrapped in extra classes to restyle them.
- **No pass-through:** no `className` or `style` passed down unseen; no inline styles.

**4. CSS: owned, flat by default.**

```css
/* the root owns its box; no outer margin */
.plx-avatar {
  block-size: var(--_avatar-block-size);
  inline-size: var(--_avatar-inline-size);
}
/* sizes change the values the box reads */
.plx-avatar--24 {
  --_avatar-block-size: var(--plx-comp-avatar-24-height);
  --_avatar-inline-size: var(--plx-comp-avatar-24-width);
}
.plx-avatar--28 {
  --_avatar-block-size: var(--plx-comp-avatar-28-height);
  --_avatar-inline-size: var(--plx-comp-avatar-28-width);
}
/* each part styled by its own class */
.plx-avatar__presence { border-bottom-color: var(--plx-comp-avatar-presence-ring-color); /* … longhands … */ }
```

- **Owned:** only the component's own classes. Base, variant and state values may be declared directly or by value
  (3.3), in the documented order.
- **Flat by default** (section 9); a chain inside its own anatomy only for a documented structural or state relationship.
- **Text:** its text contract.
- **No `!important`, no outer margins, no selectors into any other block.**

**5. Register it.**

- Its stylesheet goes into the `components` layer through `platform.css`.
- Its export goes into `platform/index.js`.
- Its design-system record documents the props, the public tokens and their scope, the text contract, the state
  matrix and the states (the contract above).

**6. Prove it.**

- The checks pass.
- The runtime audit shows zero unexplained overlaps on its design-system page, in every state and mode.
- Screenshots in light and dark, the three densities, touch, and narrow widths.

## 12. How to build a page

A page is assembled from the Platform. Its default is no CSS of its own.

### Composition levels: what builds what

A page is not built by placing individual components one by one. Like Atomic Design (Brad Frost: atoms, molecules,
organisms, templates, pages), Salesforce Lightning (components, patterns, templates) and Carbon (components,
patterns), Plenix builds in levels. Each level is made only from the levels below it:

| Level | What it is | Made from | In Plenix |
|---|---|---|---|
| Tokens | Values: color, type, space, radius, motion | Nothing | `--plx-ref-*`, `--plx-sys-*`, `--plx-comp-*` |
| Components | One control or display element with one job | Tokens, other components | 139 (Button, Field, Avatar, Tag, Menu…) |
| Layout primitives | Arrangement only, no look | Tokens | Stack, Inline, Columns, Center, ContentGrid |
| Patterns | A recurring task or region, solved once: anatomy, behavior, spacing, framing | Components, primitives, other patterns | 99 (EntityHeader, CommandBar, Form, FilterBar, SettingsSection, NavPane…) |
| Templates | A page kind: its regions, how it scrolls, which pattern fills each region | AppShell, patterns, primitives | 15 (ListingPage, DetailPage, MasterDetailPage, SplitWorkspace, SearchResultsPage…) |
| Pages | A template filled with real content and data | One template; patterns in its regions | The suite's screens |

**The rule:**
- A page starts from a template, and fills each region with the pattern the template (or the composition standard)
  names for it.
- A page never assembles a region out of individual components. A page header is EntityHeader, not a Heading, three
  Buttons and a Divider placed side by side.
- Components reach a page only through a pattern: as the pattern's props (`actions={[…]}`), or as content in a
  pattern's documented slot (the fields inside Form, the body of a Card). The pattern decides their spacing, size,
  alignment and framing; the page decides only what they are and say.
- Every level styles only itself. A pattern never restyles the components it uses; it chooses their props. A template
  never restyles its patterns.
- A region with no fitting pattern is a gap in the Platform: the pattern is built (or an existing one extended) and
  documented, then used. A page does not solve it locally with components (see step 6 for the narrow exception).

Why it matters for clashes: when every region comes from a pattern, the arrangement of components is written once, in
one owner, instead of once per page. Pages then have nothing to override, so they have nothing to clash with.

### The steps

1. **Choose the template.** It fixes the page kind (AppShell `page`), the regions (header, navigation pane, main,
   footer) and how the page scrolls.
2. **Fill each region with the pattern the template names for it:** EntityHeader for the page header, CommandBar for
   the commands, DataGrid or ContentGrid for a collection, Form for data entry, SettingsSection for settings, and so
   on.
3. **Arrange inside a slot with layout primitives** only where the pattern leaves the arrangement open: Stack, Inline,
   Columns, Center, ContentGrid. Spacing comes from their `gap` prop; widths and tracks from their props.
4. **Give components to patterns, configured by props:** `<Button variant="ghost">`, `<Avatar size="28">`,
   `<Field label hideLabel>`, as a pattern's props or in its documented slots. A different look is a prop, never a
   class or a rule.
5. **Framing:** the pattern decides framed or unframed, so at most two frames nest.
6. **When nothing fits.** An application may write narrowly scoped layout rules. They never restyle a component's
   internals, and a need that repeats across applications becomes a candidate for a primitive or pattern (judged as a
   reusable layout capability, not turned into a one-off visual prop). Such rules are:
   - only for its own wrapper classes, never for a component's classes;
   - only arrangement properties (grid areas, tracks, gap, alignment, region sizes);
   - always in the product's own layer, ordered after `plx`;
   - always with a note on why no primitive or pattern fits.
7. **No utility classes for things a primitive or prop does; no inline styles.**
8. **Prove it:** the page passes the composition check and the runtime audit (zero unexplained overlaps, nesting
   within two frames).

**How this keeps nesting and clashing out:**

- Only the component writes rules for its own parts, so two owners rarely meet on one property, and the audit
  catches it when they do.
- Flat selectors keep rules from depending on where an element sits.
- Base, variant and state rules belong to one owner, in a documented order.
- Applications arrange only their own wrappers, in their own layer.
- Layers fix the order between categories without `!important`.
- The checks fail the build the moment a rule crosses an owner.

## 13. Enforcement

| Check | Where | Fails on |
|---|---|---|
| Cross-component selector | Project rule (check-system) | A selector into another block's classes |
| Page composition | Project rule (composition check) | A page region built from components placed directly instead of the pattern the template names; a page without a template |
| Flat selectors | Project rule | A descendant chain inside a block that is not on the component's documented list |
| Application CSS scope | Project rule | An application rule for a component's classes, a non-layout property, or a rule outside the product's own layer |
| Specificity ceiling | Stylelint (`selector-max-specificity: 0,2,0`, `selector-max-id: 0`) | Any authored selector above 0,2,0 not in the exceptions file |
| Public hooks | Project rule | A `--plx-comp-*` set outside its component that is not on the public list |
| Component contract | Project rule | A component record without its contract (typography, layout integration, hooks, variants, states, spacing, specificity) |
| Duplicate declarations | Stylelint and project rule | The same property set twice in one rule, or the same selector and property repeated across sheets |
| Unused classes | Project rule | A `plx-` class no source uses (see the definitions below) |
| `!important` | Project rule | Any, except the listed vendor files until they are removed |
| Unlayered production CSS | Project rule | A sheet not assigned to a layer |
| Text contracts | Project rule | A text role change without its boundary properties; a component without a declared contract |
| Base element scope | Project rule | An element rule outside the content scope setting a property a component owns |
| Outer margins on components | Project rule | A component root with an outer margin, unless an exception is documented |
| Framing depth | Composition check and pages test | A third frame |
| JSX duplicates and forwarding | Project rule (JSX parsed) | Duplicate props; unseen `className` or `style` forwarding; `className` on a component outside a documented integration point |
| Runtime overlap audit | Browser audit | Unapproved overlaps (see below) |

**Definitions, so the checks neither pass falsely nor flood with false alarms:**

- **Unused class:** a class that appears in no JSX, no class-building helper (`cx`), and no string or template in the
  source. Classes assembled dynamically (`'plx-input--width-' + width`) are listed as patterns in the component's
  record; a class matching a listed pattern counts as used.
- **Approved overlap:**
  - a base, variant, size or state rule of the same owner, in its documented order;
  - a context hook read by its component;
  - a documented inheritance.

  Anything else is unapproved.
- **Temporary exceptions:** listed by file and reason in `check-system.exceptions.json`. The list may only shrink: an
  entry that no longer occurs fails the check until it is removed.
- **Coverage per change:**
  - an ownership repair runs the audit on the affected components' pages, in their states, light and dark;
  - a foundational change (layers, token generation, text roles, element baseline) runs it on all applications and
    key design-system pages, in every state and mode.
- **Visual changes:** an intended visual change is approved by the owner before release and recorded in the changelog
  with before and after captures. Anything else visible is a regression.

**The runtime audit reports, for each element:**
- the property set more than once;
- the rules that set it, and the winner;
- whether they cross ownership, and whether the values differ;
- whether the overlap is approved, and under which definition;
- the theme, density, interaction mode and state it was found in.

**What it covers:** more than first screens. Focus, invalid, selected, expanded, open menus and dialogs, scrolling,
light and dark, the three densities, touch and mobile, and narrow widths.

**Proof for every release:**
- screenshots and computed-style comparisons on the pages the change can affect, at the supported widths and modes;
- the full test suite before releasing a foundational change; the quick gates for small ownership repairs.

## 14. Conformance

A component, pattern, template or page conforms when:

- No unexplained overlaps in the runtime audit, across states and modes.
- No redundant declarations, no unused classes, no `!important`, no unlayered production CSS, and an empty exceptions
  file.
- Every component publishes its contract: text contract, layout integration, public hooks with their scope, variants,
  the state matrix, outer spacing and specificity.
- Every parent-to-child change goes through a prop, variant, slot, context hook or documented inheritance.
- Spacing between siblings comes from layout primitives; framing is chosen explicitly; element rules stay in the
  content scope.
- Every component follows section 11; every page follows section 12.
- The UI is unchanged, except for changes the owner approved as visual.
