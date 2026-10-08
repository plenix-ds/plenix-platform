# Style Guide

**Live design tokens extracted from the CSS custom properties. These values drive every component in {APP_NAME}.**

The running reference is the master design spec, `platform/design-system/` (open http://localhost:8767/Plenix/platform/design-system/ from the merge server). These are the reference tokens (`--plx-ref-`); components use the role tokens (`--plx-sys-`) the theme maps onto them.

> **The master design spec is the authoritative reference** (`platform/design-system/`, read live from the token files and the components). This guide records what each reference token is for; components use the role tokens (`--plx-sys-`), never these values directly. Where a name below still lacks the `--plx-` prefix, the scale it describes was replaced by the Platform scale shown in the spec.

---

## Color

One palette for every Plenix application: **one token name means one hex value**. Colors are named `--color-{family}-{shade}` (plus `--plx-ref-color-black` and `--plx-ref-color-white`) in six families: Gray, Blue, Red, Brown, Green, Purple. Each family is listed darkest to lightest; a higher number is darker, ordered by perceived lightness.

**No color is translucent.** Never write `rgba()` or a hex color with an alpha suffix. If a color needs to look see-through, work out the solid color it produces on the background it sits on and use the nearest token.

**No hard-coded colors.** Every color in a style or in data is a token.

### Gray (with black and white at the ends)

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-black` | `#000000` | Primary and secondary text, tooltip fill |
| `--plx-ref-color-gray-800` | `#444444` | Modal shadow, modal edge and modal backdrop (a solid layer with `opacity`) |
| `--plx-ref-color-gray-700` | `#56585e` | Muted and dim text — **minimum contrast level** |
| `--plx-ref-color-gray-600` | `#6e6e6e` | Archived / neutral data color, dialog shadow |
| `--plx-ref-color-gray-500` | `#8e9094` | Asset library |
| `--plx-ref-color-gray-300` | `#d0d0d0` | Strong border, scrollbar, raised and menu shadow |
| `--plx-ref-color-gray-200` | `#e8e9ec` | Card shadow and outline |
| `--plx-ref-color-gray-100` | `#f3f3f3` | Page background, input and hover fill, standard and inner borders, tag fill |
| `--plx-ref-color-gray-75` | `#f7f7f8` | Sidebar background |
| `--plx-ref-color-white` | `#ffffff` | Cards, panels, white header, text on accent |

### Blue (brand)

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-blue-700` | `#005a9e` | Accent dark (pressed, selected text, accent header border) |
| `--plx-ref-color-blue-650` | `#3d5a80` | Asset library |
| `--plx-ref-color-blue-600` | `#1f5bb8` | Search field, Capture button, active icon and hover on the accent header |
| `--plx-ref-color-blue-400` | `#2a6fdb` | Brand base: primary accent, accent header |
| `--plx-ref-color-blue-350` | `#8fb0d9` | Borders, divider, placeholder and search icon on the accent header |
| `--plx-ref-color-blue-250` | `#c0ccda` | Frost header borders and divider |
| `--plx-ref-color-blue-200` | `#c8dff7` | Icons and hint text on the accent header, focus ring, primary button shadow, frost active icon |
| `--plx-ref-color-blue-100` | `#ebf0f7` | Selected / active item background, frost header background |
| `--plx-ref-color-blue-50` | `#f8fafd` | Unread row tint, frost search field |

### Red

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-red-700` | `#9b3a5e` | Data color |
| `--plx-ref-color-red-500` | `#c42b1c` | Error, destructive |
| `--plx-ref-color-red-300` | `#f07a70` | Asset library |
| `--plx-ref-color-red-200` | `#efc6c2` | Error tint border |
| `--plx-ref-color-red-100` | `#fde7e7` | Error background |

### Brown

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-brown-800` | `#7d3c00` | Text on warning background |
| `--plx-ref-color-brown-500` | `#c05a00` | Warning, attention |
| `--plx-ref-color-brown-200` | `#eed2ba` | Warning tint border |
| `--plx-ref-color-brown-100` | `#fef3e2` | Warning background |

### Green

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-green-800` | `#27500a` | Project layer color |
| `--plx-ref-color-green-600` | `#0e6b0e` | Text on success background |
| `--plx-ref-color-green-500` | `#107c10` | Success, positive |
| `--plx-ref-color-green-200` | `#bde8bd` | Success tint border |
| `--plx-ref-color-green-100` | `#dff6dd` | Success background |

### Purple

| Token | Value | Usage |
|---|---|---|
| `--plx-ref-color-purple-800` | `#3c3489` | Client layer color |
| `--plx-ref-color-purple-600` | `#5e35b1` | Text on info background |
| `--plx-ref-color-purple-500` | `#744da9` | Info, special |
| `--plx-ref-color-purple-200` | `#dacfe8` | Info tint border |
| `--plx-ref-color-purple-100` | `#f3eef8` | Info background |

### Data colors and tints

Projects, layers, section labels and categories carry a color token as data. For a soft chip in that color use `tint(color,0)` for the fill (the family's `100`) and `tint(color,1)` for the border (the family's `200`). Where a native control needs a hex value (the category color picker), pass the token through `hexOf()`.

---

## Shadows

One shadow set. Every shadow is centered on all sides and uses a solid color; the blur does the fading. Every elevation shadow has two layers: the soft glow plus a crisp 1px edge in . **Never write a shadow inline.** Each token has a class of the same name; add the class. For a shadow that appears on hover use `.hover-shadow-card` or `.hover-shadow-raised`.

| Token / class | Value | Usage |
|---|---|---|
| `--plx-sys-shadow-sm` | `0 0 2px var(--plx-ref-color-gray-100), 0 0 0 1px var(--plx-ref-color-gray-200)` | Faint lift: stacked sheets, badges |
| `--plx-sys-shadow-md` | `0 0 8px var(--plx-ref-color-gray-200), 0 0 0 1px var(--plx-ref-color-gray-200)` | Top bar (white and frost), pane headers, switch knob, color swatch |
| `--plx-sys-shadow-lg` | `0 0 32px var(--plx-ref-color-gray-300), 0 0 0 1px var(--plx-ref-color-gray-200)` | Large floating bars |
| `--plx-sys-shadow-card` | `0 0 4px var(--plx-ref-color-gray-200), 0 0 0 1px var(--plx-ref-color-gray-200)` | Cards and panels (draws their 1px outline) |
| `--plx-sys-shadow-raised` | `0 0 16px var(--plx-ref-color-gray-300), 0 0 0 1px var(--plx-ref-color-gray-200)` | Dropdowns, side panes, a card lifted on hover |
| `--plx-sys-shadow-menu` | `0 0 40px var(--plx-ref-color-gray-300), 0 0 0 1px var(--plx-ref-color-gray-200)` | Menus and popovers |
| `--plx-sys-shadow-modal` | `0 0 40px var(--plx-ref-color-gray-800), 0 0 0 1px var(--plx-ref-color-gray-800)` | **Every modal window** (Capture, New project, Edit category). Use `.shadow-modal` |
| `--plx-sys-shadow-ring` | `0 0 0 2px var(--plx-ref-color-blue-400)` | Selection / drop-target ring |
| `--plx-sys-shadow-ring-subtle` | `0 0 0 2px var(--plx-ref-color-blue-100)` | Soft selection ring; primary button |
| `--plx-sys-shadow-underline-focus` | `0 1px 0 var(--plx-ref-color-blue-400)` | Focus underline on a field |

Consolidated from earlier names: `--shadow-bar` and `--shadow-control` → `--plx-sys-shadow-md`; `--shadow-button` → `--plx-sys-shadow-ring-subtle`. (DAM-only names: `stack`, `stack-2`, `badge` → `sm`; `topbar` → `menu`; `pane` → `raised`; `footer` → `lg`.)

`.shadow-card-ring` combines the card shadow with the ring, for a card that is a drop target.

---

## Typography

### Font families

Two **foundation** tokens store the approved stacks once. Components never use them directly; they use the **semantic roles** built on them, so a role (headings, say) can change typeface without touching any component.

```text
Foundation font token → semantic role → component style
```

| Foundation token | Primary font | Purpose |
|---|---|---|
| `--plx-ref-font-sans` | **DM Sans** | Main product / UI font. Stack: `"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif` |
| `--plx-ref-font-mono` | **DM Mono** | Code, token names, hex values, IDs and technical metadata. Stack: `"DM Mono", ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace` |

| Role | Points to | Use it for |
|---|---|---|
| `--plx-sys-font-body` | `--plx-ref-font-sans` | Body copy; set on `body`, so everything inherits it by default |
| `--plx-sys-font-heading` | `--plx-ref-font-sans` | Headings (`h1`–`h6`) |
| `--plx-sys-font-label` | `--plx-ref-font-sans` | Buttons (`.btn`), labels, menus |
| `--plx-sys-font-code` | `--plx-ref-font-mono` | `code`, `pre`, `kbd`, token names, hex values |
| `--plx-sys-font-data` | `--plx-ref-font-mono` | Dates, counts, IDs, versions, keyboard hints, numbers that should align |

Rules:

- `body` sets `font-family: var(--plx-sys-font-body)`; `button`, `input`, `select` and `textarea` use `font-family: inherit`. Don't declare a family on a component unless it needs a different role.
- Use mono (`--plx-sys-font-code` / `--plx-sys-font-data`) only where fixed-width characters help: code, IDs, hex values, tokens, tabular technical data. Never for paragraphs, menus, buttons or normal UI copy.
- Font family is separate from size, weight, line height and letter spacing; each has its own tokens.

### Font sizes

One scale. In CSS write `font-size:var(--plx-ref-font-size-13)`; in React `fontSize:"var(--plx-ref-font-size-13)"`.

| Token | Value |
|---|---|
| `--plx-ref-font-size-09` | `9px` |
| `--plx-ref-font-size-10` | `10px` |
| `--plx-ref-font-size-11` | `11px` |
| `--plx-ref-font-size-12` | `12px` |
| `--plx-ref-font-size-13` | `13px` (body) |
| `--plx-ref-font-size-14` | `14px` |
| `--plx-ref-font-size-15` | `15px` |
| `--plx-ref-font-size-18` | `18px` (Platform only — not in the DAM scale) |
| `--plx-ref-font-size-20` | `20px` |

### Weights, line heights, letter spacing

Never write a number directly.

| Token | Value | Token | Value | Token | Value |
|---|---|---|---|---|---|
| `--plx-ref-font-weight-regular-400` | 400 | `--plx-ref-line-height-none` | 1 | `--plx-ref-letter-spacing-tight` | -0.02em |
| `--plx-ref-font-weight-medium-500` | 500 | `--plx-ref-line-height-tight` | 1.3 | `--plx-ref-letter-spacing-snug` | -0.01em |
| `--plx-ref-font-weight-semibold-600` | 600 | `--plx-ref-line-height-snug` | 1.4 | `--plx-ref-letter-spacing-wide` | 0.04em |
| `--plx-ref-font-weight-bold-700` | 700 | `--plx-ref-line-height-normal` | 1.5 | `--plx-ref-letter-spacing-wider` | 0.05em |
| | | `--plx-ref-line-height-relaxed` | 1.7 | `--plx-ref-letter-spacing-caps` | 0.06em |
| | | | | `--plx-ref-letter-spacing-widest` | 0.08em |

`--plx-ref-symbol-size` (32px) is for characters used as pictures; it is not a text size.

### Font Rules

- **NEVER** use serif fonts. DM Sans + DM Mono only.
- **NEVER** use text lighter than `--plx-ref-color-gray-700` (#56585e) for anything that must be read.
- **NEVER** change font sizes without explicit permission.
- Base body font size: `13px`.

---

## Writing CSS

- **No shorthand properties.** Write every longhand: `padding-top / -right / -bottom / -left` instead of `padding`, `border-top-left-radius`… instead of `border-radius`, `row-gap` + `column-gap` instead of `gap`, `overflow-x` + `overflow-y`, `flex-grow` + `flex-shrink` + `flex-basis`, `background-color` (or `background-image`), `transition-property` + `transition-duration` + `transition-timing-function`, `animation-name` + `animation-duration`…, `text-decoration-line`, `grid-column-start` + `grid-column-end`. Borders follow the same rule (see Border widths).
- The same applies to inline React styles: `paddingTop`, `borderTopLeftRadius`, `backgroundColor`, `rowGap`…, and to styles set from JavaScript (`el.style.backgroundColor`, not `el.style.background`).
- **Declarations inside every rule are in alphabetical order.**

## Spacing

Margin, padding, gap and offsets use `--plx-ref-space-Npx`, where N is the size in px. Steps are even numbers, plus 1px:

`--space-1` · `--space-2` · `--plx-ref-space-4px` · `--space-6` · `--plx-ref-space-8px` · `--space-10` · `--plx-ref-space-12px` · `--space-14` · `--plx-ref-space-16px` · `--plx-ref-space-20px` · `--plx-ref-space-24px` · `--plx-ref-space-28px` · `--plx-ref-space-32px` · `--space-36` · `--plx-ref-space-40px` · `--plx-ref-space-48px` · `--space-50` · `--space-52` · `--space-60` · `--space-68`

- In CSS write `padding:var(--plx-ref-space-8px) var(--plx-ref-space-12px)`; in React `padding:"var(--plx-ref-space-8px) var(--plx-ref-space-12px)"`.
- Never use an odd value: 3 → 2, 5 → 4, 7 → 6, 9 → 8, 11 → 10.
- A negative offset is `calc(var(--space-N) * -1)`.
- Positions use the scale too, often inside `calc()`: `top: calc(100% + var(--space-6))`.
- Repeated positioning patterns are classes: `.kbd-hint` (a keyboard hint pinned inside the right edge of a field) and `.drop-below` (a full-width panel dropping from the field above).

## Sizing

Widths, heights and fixed dimensions use `--plx-ref-size-Npx`, where N is the size in px.:

`1 · 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 52 · 60 · 100 · 120 · 140 · 160 · 180 · 200 · 220 · 240 · 280 · 300 · 320 · 400 · 500 · 560 · 600 · 720 · 900`

- In CSS write `width:var(--plx-ref-size-24px)`; in React `width:"var(--plx-ref-size-24px)"`.
- Percentages, `auto` and sizes computed from data (a resizable sidebar, a progress bar) are not tokens.
- A one-off size with no step close to it may stay as written; prefer the nearest step.

## Border widths

**No border shorthands.** Width, style and color are always separate declarations, so color and width each come from their own token:

```css
border-width: var(--plx-ref-border-width-1px);
border-style: var(--plx-ref-border-style-solid);
border-color: var(--plx-ref-color-gray-100);
```

In React: `borderWidth:"var(--plx-ref-border-width-1px)", borderStyle:"var(--plx-ref-border-style-solid)", borderColor:"var(--plx-ref-color-gray-100)"`. One side only uses the side names (`borderBottomWidth`, `borderBottomStyle`, `borderBottomColor`). Outlines follow the same rule (`outlineWidth`, `outlineStyle`, `outlineColor`). To remove a border, set only the style: `border-style: none`.

| Token | Value | Typical use |
|---|---|---|
| `--plx-ref-border-width-1px` | 1px | Almost every border and divider |
| `--plx-ref-border-width-2px` | 2px | Focus outline, selected swatch |
| `--plx-ref-border-width-3px` | 3px | Project color edge on cards |
| `--plx-ref-border-width-4px` | 4px | Accent edge on highlighted rows; the tooltip arrow |

Border styles are tokens too: `--plx-ref-border-style-solid` (solid) and `--plx-ref-border-style-dashed` (dashed). `none` stays a keyword.

A negative offset uses the token too: `outline-offset: calc(var(--plx-ref-border-width-1px) * -1)`.

## Radius

Corner radii use `--plx-ref-radius-Npx`:

| Token | Value | Typical use |
|---|---|---|
| `--plx-ref-radius-4px` | 4px | Buttons, inputs, tags, nav items, small swatches |
| `--plx-ref-radius-6px` | 6px | Cards and panels (Platform only — not in the DAM set yet) |
| `--plx-ref-radius-8px` | 8px | Larger panels and dialogs |
| `--plx-ref-radius-12px` | 12px | Pills and the switch track |

- Circles (avatars, dots) use `50%`.
- A shape with different corners combines tokens per corner, e.g. `border-radius: 0 var(--plx-ref-radius-4px) var(--plx-ref-radius-4px) 0`.

---

## Layers (z-index)

One token per stacking purpose, not one per component. Never write a z-index number.

| Token | Value | Use |
|---|---|---|
| `--plx-sys-layer-behind` | -1 | Behind its siblings (the dialog backdrop inside a modal) |
| `--plx-sys-layer-base` | 0 | Normal content |
| `--plx-sys-layer-raised` | 1 | A part lifted above its neighbors (a resize handle, a badge) |
| `--plx-sys-layer-sticky` | 10 | Sticky regions and the top bar |
| `--plx-sys-layer-menu` | 100 | Menus and dropdowns |
| `--plx-sys-layer-overlay` | 1000 | Backdrops directly below a drawer or modal |
| `--plx-sys-layer-modal` | 1100 | Modal windows and drawers |
| `--plx-sys-layer-popover` | 1200 | Tooltips and popovers |
| `--plx-sys-layer-toast` | 1300 | Toasts |
| `--plx-sys-layer-critical` | 9999 | Always on top: critical confirmation, lightbox, skip link |

Use a global layer only when two separately rendered things must be ordered against each other. Inside a component, give the component its layer and order its parts with a local stacking context (`z-index: 0` / `1`).

---

## Buttons

One component: `.btn`. Add exactly one visual variant when appropriate:

| Class | Use | Looks |
|---|---|---|
| `.btn-primary` | Primary or confirm action — one per view, dialog or action group (Save, Create, Continue, Confirm) | `--plx-ref-color-blue-400` fill, white text, `--plx-sys-shadow-ring-subtle`; hover `--plx-ref-color-blue-600` |
| `.btn-outline` | Secondary action (Cancel, Back, reversible choices) | White fill, `--plx-ref-color-gray-300` border; hover `--plx-ref-color-gray-100` fill |
| `.btn-ghost` | Tertiary, low-emphasis action (Skip, Fields, Help, Show details) | Transparent, `--plx-ref-color-gray-700` text; hover `--plx-ref-color-gray-100` fill |
| `.btn-danger` | Destructive action only (Delete, Remove, Revoke, Discard) | `--plx-ref-color-red-500` fill, white text; hover `--plx-ref-color-red-700` |

Optional structural modifiers: `.btn-icon` (icon-only, 32 × 32) and `.btn-caret` (opens a menu; draws a small down-arrow). States: `.active`, `.open`, `:disabled` / `aria-disabled="true"`. Keyboard focus shows a 2px `--plx-ref-color-blue-400` outline.

- Every variant has the same 1px border (transparent where not visible), so mixed buttons line up.
- `type="submit"` only for submitting a form; Cancel, Close, Skip, Help, Fields, menus and every other button are `type="button"`.
- `className` in React JSX, `class` in HTML.
- Never create per-screen classes such as `.save-button` or `.modal-cancel`.
- The old `.btn-p`, `.btn-o` and `.btn-g` names are gone (now `.btn-primary`, `.btn-outline`, `.btn-ghost`).

---

## Layout Rules

- Page background MUST be `--plx-ref-color-gray-100` (`#F3F3F3`) — Windows 11 neutral gray. Not warm, not tan.
- Cards MUST be `--plx-ref-color-white`.
- All containers: the `.shadow-card` class (which draws the 1px outline) + appropriate border-radius.

---

## Icons

- Style: **Outline** (stroke, not solid fill).
- ViewBox: Uniform `20×20`.
- Stroke width: `1.5–1.65px`.
- Hover: Tooltip only, no persistent labels.
- Active state: Accent highlight background.

---

## Header Bar

Three style options configurable in Settings > Appearance:

| Style | Description |
|---|---|
| **Accent** (default) | `--plx-ref-color-blue-400` background, white text, blue 600 fields and buttons, blue 350 borders, blue 200 icons |
| **White** | `--plx-ref-color-white` background, dark icons |
| **Frost** | `--plx-ref-color-blue-100` background with `--plx-ref-color-blue-250` borders, softer than white |

### Header Layout

Single row, 3 CSS grid segments (`1fr auto 1fr`):

| Segment | Content | Alignment |
|---|---|---|
| Left | Logo + nav icons + settings | Left-aligned |
| Center | Search bar | Centered |
| Right | Capture + avatar | Right-aligned |

---

## Dashboard

- Time strip: live clock + date (no greeting).
- Column split: `50% / 25% / 25%` (`2fr 1fr 1fr`).
- Row heights: `60/40` within each column.
- Widgets: 1-line condensed by default, configurable in Settings.

---

## Keyboard Shortcuts

- Use **Windows** conventions: `Ctrl+K` (not `⌘K`).
- Customizable shortcuts deferred to V3.

---

## Motion

One motion system shared with Plenix DAM: custom properties are `--motion-[property]-[variant]`, keyframe names are `motion-[effect]`, and direction-specific effects are `motion-[effect]-[direction]`. The DAM also defines `motion-shimmer-reverse`, `motion-toast-in` and `motion-toast-out`, which Platform does not use.

| Token / animation | Value or definition |
|---|---|
| `--plx-ref-motion-duration-fast` | `0.15s` — hovers, color and shadow changes |
| `--plx-ref-motion-duration-base` | `0.2s` — switches, small movements |
| `--plx-ref-motion-duration-slow` | `0.25s` — panels sliding or resizing |
| `--plx-ref-motion-ease-standard` | `ease` |
| `motion-fade-up` | `from { opacity: 0; transform: translateY(5px) } to { opacity: 1; transform: translateY(0) }` — the `.fu` class |
| `motion-spin` | `to { transform: rotate(360deg) }` — the `.spin` spinner |
| `motion-pulse` | `0%, 80%, 100% { opacity: .2; transform: scale(.7) } 40% { opacity: 1; transform: scale(1) }` — the `.dots` typing indicator |
| `motion-shimmer-forward` | `from { background-position: -200% 0 } to { background-position: 200% 0 }` — the `.skel` skeleton, left to right |

- Transitions use the duration and easing tokens: `transition-duration: var(--plx-ref-motion-duration-fast); transition-timing-function: var(--plx-ref-motion-ease-standard);`.
- A looping animation's period (the spinner's 0.7s, the dots' 1.1s, the shimmer's 1.4s) belongs to that effect and stays with it.
- **Reduced motion:** a `prefers-reduced-motion: reduce` rule at the end of the stylesheet cuts every transition and animation to a single near-instant frame.

---

## Scrollbar

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--plx-ref-color-gray-300); border-radius: 4px; }
```
