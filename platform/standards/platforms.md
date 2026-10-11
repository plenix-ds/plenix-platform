# Plenix Platforms Standard: Web, iOS and Android

**Plenix keeps one design identity on every platform while respecting each platform's native interaction patterns,
accessibility requirements and adaptive layout conventions. Consistency comes from shared principles, semantic tokens,
information architecture and functional behavior, never from forcing identical components, dimensions or navigation
onto different platforms.**

This standard defines how every Plenix application looks, sizes itself, lays out its screens and moves between them
on the web, on iOS and on Android. It applies to every Plenix app and every implementation of the Plenix design
system: the web Platform (React and CSS), native SwiftUI and Jetpack Compose apps, and Flutter apps. It serves simple
phone apps and dense multi-pane desktop workspaces alike.

Every value names its **source** and its **level** (section 2). "Must" and "never" are requirements. Where this
standard and the design system pages differ, the design system (`platform/design-system/platforms.js`, shown on
design-system.lighthouseway.org) is corrected to match this standard. A rule in this standard that misreads its
source is corrected in this standard first.

---

## 1. Principles

### 1.1 Five layers

Every Plenix screen is made from five layers. Each layer answers one question and owns its own tokens.

| Layer | Question | Values | Owns |
|---|---|---|---|
| **Theme** | What does Plenix look like? | Default, and every theme added to Plenix | Color roles, typeface (DM Sans; DM Mono for code and technical values), weights, radius, lines, motion, the focus color |
| **Platform** | Whose rules apply? | `web` · `ios` · `android` | Sizes, touch targets, spacing between targets, controls, navigation and back behavior, type scaling, platform accessibility features |
| **Input** | Which input can the person use? | `pointer` · `touch` · keyboard · stylus, in any combination | The target floor, hover behavior, gestures, keyboard focus |
| **Window** | How much room? | Narrow · Medium · Wide | Panes, the form of top-level navigation, reflow |
| **Density** | How much on screen? | Compact · Standard · Comfortable | Control heights and padding, inside the platform's minimums |

Input describes capabilities, not devices: a touchscreen laptop has touch and pointer, an iPad can have a trackpad and
a keyboard. A device with any coarse pointer gets touch targets. On the web, `data-plx-interaction` is `pointer`
(fine pointer only), `touch` (a coarse pointer) or `mobile` (a coarse pointer in a Narrow window); `mobile` is that
combination, not an input of its own.

### 1.2 Precedence

When two rules conflict, the higher one wins:

1. **Accessibility requirements** (WCAG 2.2 level AA on the web; the platform's accessibility features natively) and
   **behavior the operating system enforces** (for example Android edge-to-edge, section 3.5).
2. **Platform interaction and behavior**: control behavior, back, navigation patterns, gestures, keyboards and type
   scaling follow the platform.
3. **Platform minimums**: no theme and no density makes a target smaller than its platform's minimum (section 3.1).
4. **The Plenix look**, applied as far as each implementation exposes it (section 1.3).
5. **Framework defaults**, where nothing above sets the value.

### 1.3 Who owns each property

| Ownership | Properties |
|---|---|
| **Plenix (the theme)** | Color roles, DM Sans and DM Mono, weights, icon set, the focus color, destination names and information architecture |
| **The platform** | Control behavior and semantics, text editing and selection, keyboard integration, system gestures, navigation behavior, accessibility features (VoiceOver, TalkBack, Dynamic Type, font scaling, Full Keyboard Access) |
| **Plenix within the platform** | Radius, spacing, composition and visual states, applied only as far as the control exposes them without changing its behavior |

Plenix never changes a platform-owned property to make a control look more like Plenix.

### 1.4 Implementations and controls

| Implementation | Controls | What follows OS releases |
|---|---|---|
| **SwiftUI** (iOS) | Apple's native controls, styled through the modifiers they expose | Control changes in a new iOS release reach the app |
| **Jetpack Compose** (Android) | Android's native Material 3 components, themed with Plenix tokens | Changes arrive with Compose Material 3 library updates |
| **Flutter** | Flutter's own Cupertino (iOS) and Material (Android) widgets, drawn by Flutter's engine, not by the OS. Components that must be native (maps, web views) are embedded as platform views | Nothing automatically: the app follows each Flutter SDK update and is checked on every new iOS and Android release |
| **Web** | Plenix Platform components (`plx-` classes) | — |

| Plenix | SwiftUI | Compose | Flutter |
|---|---|---|---|
| Button | `Button` | `Button` | `CupertinoButton` · `FilledButton` |
| Text field | `TextField`, `SecureField` | `OutlinedTextField` | `CupertinoTextField` · `TextField` |
| Switch | `Toggle` (switch style) | `Switch` | `CupertinoSwitch` · `Switch` |
| Top-level navigation | `TabView` | `NavigationBar`, `NavigationRail` | `CupertinoTabScaffold` · `NavigationBar`, `NavigationRail` |
| Hierarchy | `NavigationStack` | Navigation back stack | `CupertinoPageRoute` · `MaterialPageRoute` |
| List and detail | `NavigationSplitView` | List-detail scaffold | Adaptive scaffold |
| Sheet | `.sheet` with detents | `ModalBottomSheet` | `CupertinoSheetRoute` · `showModalBottomSheet` |

Flutter apps choose the Cupertino widgets on iOS and the Material widgets on Android (`defaultTargetPlatform`, or the
`.adaptive` constructors).

### 1.5 Themes on every platform

A theme holds only Plenix-owned tokens; a platform set holds only size and behavior tokens. A theme is written once and
applies to the web, iOS and Android, and a platform set works with every theme. There are no separate mobile themes.
The Default theme on the three platforms is the base design that ships.

### 1.6 Requirements on every layer

| Concern | Requirement | Source |
|---|---|---|
| **Appearance** | Light and dark come from the theme; the app follows the system appearance live unless the person chooses light or dark (web: `data-plx-mode="system"`) | Plenix |
| **Reduced motion** | When the person asks for reduced motion, movement stops or becomes a fade; no brand animation overrides it (web: `platform/system/motion.css`) | WCAG 2.2 SC 2.3.3; platform settings |
| **Contrast** | Text 4.5:1 (large text 3:1); controls, focus indicators and meaningful graphics 3:1 against adjacent colors | WCAG 2.2 SC 1.4.3, 1.4.11 |
| **Color alone** | No state, error or meaning is carried by color alone | WCAG 2.2 SC 1.4.1 |
| **Right to left** | Layouts, icons with direction and gestures mirror in right-to-left languages | Plenix |
| **Text expansion** | Labels wrap or the layout grows; translated text is never cut off without a way to read it | Plenix |
| **State restoration** | The app restores the screen and its state after it is closed, suspended, resized or rotated | HIG › Launching |
| **Screen readers** | Every control has an accessible name, role and state (VoiceOver, TalkBack, browser screen readers) | WCAG 2.2 SC 4.1.2 |

---

## 2. Sources and levels

### 2.1 Source types

| Source type | Meaning | Example |
|---|---|---|
| **Rule** | Guideline text from a platform standard or WCAG | Apple HIG: a default control size of 44×44 pt |
| **Token** | A value the platform owner publishes as a design token | Material 3 `md.comp.button.small.container.height`: 40dp |
| **System** | The size or behavior built into a native control (SwiftUI, Compose) | The SwiftUI switch |
| **Reference** | A number recorded for designers next to a System value, or a framework constant. Never a Plenix value | Flutter `CupertinoSwitch` track 51×31 |
| **Plenix** | A Plenix rule where the platform standards are silent, stated with its reason | Web touch target 44px |

### 2.2 Levels

| Level | Meaning |
|---|---|
| **Required by the source** | The source states it as a requirement: WCAG level A or AA, an OS-enforced behavior |
| **Recommended by the source** | The source recommends it: Apple's and Material's guideline values, WCAG level AAA |
| **Plenix requirement** | Plenix requires it, whether the source recommends it or the standards are silent |

Plenix adopts the recommended values in this standard as Plenix requirements; each table says which values the source
itself requires. Apple publishes rules, not component dimensions; Material publishes tokens; WCAG sets the web floor.

---

## 3. Foundations

### 3.1 Touch and pointer targets

| Platform | Plenix requirement | Source and level |
|---|---|---|
| Web · fine pointer only | At least 24×24 px (`--plx-sys-control-target-min`) | Rule: WCAG 2.2 SC 2.5.8, AA: required by the source |
| Web · any coarse pointer | At least 44×44 px | Rule: WCAG 2.2 SC 2.5.5, AAA: recommended by the source. WCAG applies both criteria to all pointer input; Plenix uses 44 wherever touch is possible |
| iOS | At least 44×44 pt; 28×28 pt only where the HIG's minimum control size applies and 44 cannot fit | Rule: Apple HIG › Accessibility (default 44×44 pt, minimum 28×28 pt): recommended by the source |
| Android · touch | At least 48×48 dp (about 9 mm) | Rule: Material 3 › Target sizes; Compose's minimum interactive size: recommended by the source |
| Android · pointer | At least 44×44 dp | Rule: Material 3 › Target sizes ("consider making pointer targets minimums 44 x 44dp"): recommended by the source |

The visible control and its target are separate sizes. A target may extend invisibly beyond a smaller control: a 40dp
Material button sits in a 48dp target, a 24dp icon in a 48dp target. The Plenix look keeps its proportions while the
target grows to the platform's minimum.

### 3.2 Spacing between targets

| Platform | Rule | Source |
|---|---|---|
| Web | A target smaller than 24px has a 24px-diameter circle of clearance that touches no other target | Rule: WCAG 2.2 SC 2.5.8 |
| Web · coarse pointer | 12px between buttons and between dialog actions (`--plx-comp-button-cluster-gap`, `--plx-comp-dialog-action-gap`) | Plenix (matches the HIG figure below) |
| iOS | About 12 pt of padding around a control with a visible background; about 24 pt around a control without one | Rule: Apple HIG › Accessibility |
| Android | At least 8dp between targets | Rule: Material 3 › Target spacing |

### 3.3 Window classes and containers

**Window classes** decide the app's broad layout: the frame, its panes and its navigation. The density name Compact is
never used for a window class.

| Window class | Width | Material 3 breakpoint | Apple horizontal size class | Typical device |
|---|---|---|---|---|
| **Narrow** | under 600 | Compact (under 600dp) | compact | Phone in portrait |
| **Medium** | 600–839 | Medium (600–839dp) | regular on iPad; compact on most phones in landscape | Tablet in portrait, unfolded foldable |
| **Wide** | 840 and up | Expanded (840–1199), Large (1200–1599), Extra-large (1600+) | regular | Tablet in landscape, laptop, desktop |

Source: Material 3 › Layout › Breakpoints. Apple size classes come from the device and orientation rather than a
width; native iOS apps read the size class and apply the matching row. Inside Wide, the web adds content widths at
1024, 1440 and 1920px for workspace arrangements.

**Containers** decide how each component arranges itself: a component adapts to the space of the region it sits in,
not to the window. A data table in a 350px side panel lays out for 350px even in a 1920px window. On the web this is
done with container queries (`platform/system/grid.css` and the component stylesheets); natively, with the size the
parent offers (`GeometryReader`, `BoxWithConstraints`, `LayoutBuilder`).

On the web, the size label of the main region (`data-plx-main-size`) reads `narrow`, `medium` or `wide`.

### 3.4 Type

Plenix uses DM Sans on every platform, with DM Mono for code and technical values. Text sizes follow the person's
text-size setting.

**Typefaces by kind** (a Plenix rule). DM Sans for all interface text:
body, headings, buttons, labels, menus, names, descriptions, statuses and what people type. DM Mono only where fixed
width helps, decided by the kind of the value, not by the element:

- **Code** (the code role, `--plx-sys-font-code`): code, token names, hex values, logs.
- **Technical values** (the data role, `--plx-sys-font-data`): IDs, file names and paths, versions, dates and times,
  sizes, counts, durations, percentages shown as measured values, coordinates.

The rule holds everywhere, table cells and property-list values included; names, descriptions and statuses beside a
technical value stay DM Sans. The data role is the only way to get DM Mono outside code, and a component chooses it by
the value's kind: a DataTable or Table column of kind `data` (`["name", "data"]` for a row named by its file name), a
PropertyList item marked `data`, Text variant `data`, Kbd and code. No component sets a font family outside its tokens.
DM Mono always takes its neighbors' size and line height: the table's size in a table, the value size in a property
list, the size of the text around it inside a sentence or a line of facts (on its own, the secondary size). So DM Mono
and DM Sans in one row share a baseline (within 0.5px, measured with the fonts loaded). On iOS and Android the data role
uses the platform's DM Mono: `Plenix.Font.mono` (SwiftUI), `PlenixFonts.MONO` (Compose, `R.font.dm_mono`).

Checks: `tests/typography.test.js` (every app page and a sample of the design system, light and dark: the data role is
DM Mono, DM Mono is never prose, a technical value on its own is DM Mono, and Mono and Sans in a row share a baseline),
`tests/data-table.test.js` (data columns DM Mono at the table's size, other cells DM Sans) and the native check (the
data role uses DM Mono in its code).

| Platform | Scales with | Default body | Minimum | Source |
|---|---|---|---|---|
| Web | rem and browser zoom | 13px at a 16px root (`plx-text--body`): the dense-application size | — | Plenix |
| iOS | Dynamic Type | Body 17 pt at the default setting (Large) | 11 pt | Rule: Apple HIG › Typography |
| Android | sp (font scale) | Body large 16sp | — | Token: Material 3 `md.sys.typescale` |

Each Plenix text role maps to one iOS text style and one Material type role:

| Plenix role (web size) | iOS text style (size / leading, pt) | Android type role (size / line height, sp) |
|---|---|---|
| `title` (20, bold) | Large Title 34 / 41, bold; collapses to the navigation bar title on scroll | Title large 22 / 28 |
| `heading` (13, semibold) | Headline 17 / 22, semibold | Title medium 16 / 24 |
| `body` (13) | Body 17 / 22 | Body large 16 / 24 |
| `strong` (semibold) | Body 17 / 22, semibold | Body large 16 / 24, semibold |
| `label` (12, semibold) | Subheadline 15 / 20, semibold | Label large 14 / 20 |
| `secondary` (12, muted) | Footnote 13 / 18 | Body medium 14 / 20 |
| `caption` (11, subtle) | Caption 1 12 / 16 | Body small 12 / 16 |
| `eyebrow` (11, bold, uppercase) | Caption 1 12 / 16, semibold | Label small 11 / 16 |
| `data` (12, DM Mono; inside text, that text's size) | Footnote 13 / 18, DM Mono | Body small 12 / 16, DM Mono |

Sources: Apple HIG › Typography (Dynamic Type sizes at Large); Material 3 `md.sys.typescale`. The pairing of each
Plenix role with a style is a Plenix rule.

**How DM Sans scales:**

| Implementation | Mechanism |
|---|---|
| SwiftUI | `Font.custom("DM Sans", size:, relativeTo:)` with the mapped text style, so the size follows Dynamic Type, including the accessibility sizes |
| UIKit | `UIFontMetrics(forTextStyle:).scaledFont(for:)` |
| Compose | Sizes in `sp` with a DM Sans `FontFamily`; the system font scale applies |
| Flutter | Sizes in logical pixels scaled by `MediaQuery.textScalerOf(context)`; never clamped below the person's setting |
| Web | Sizes in rem; layouts reflow at 200% text size and 400% zoom |

### 3.5 Screen, keyboard and orientation

| Topic | Web | iOS | Android | Source |
|---|---|---|---|---|
| Reflow | Content reflows at a width equal to 320 CSS px (for example 1280px at 400% zoom) without scrolling in two directions; content that needs two dimensions, such as data tables, maps and diagrams, is exempt | — | — | Rule: WCAG 2.2 SC 1.4.10, AA |
| Orientation | Both orientations | Both, unless one is essential | Both, unless one is essential | Rule: WCAG 2.2 SC 1.3.4, AA |
| Keyboard | The right `type`, `inputmode` and `autocomplete`; the focused field stays visible above the keyboard | The keyboard type that fits the content; the focused field stays visible | The keyboard type that fits the content; window insets keep the field visible | Rule: Apple HIG › Text fields |
| Edges and insets | `env(safe-area-inset-*)` with `viewport-fit=cover` | Safe area layout guides | Edge to edge: enforced for apps targeting API 35 or later on Android 15 or later, and without any opt-out for apps targeting API 36 on Android 16. Content draws behind the system bars; window insets keep controls clear of them | Rule: Android › Edge-to-edge; Android 16 behavior changes (enforced by the OS) |
| Text size | Pinch zoom is never blocked | Dynamic Type up to the accessibility sizes | The system font scale | Rule: Apple HIG › Typography |
| Target API | — | — | New apps and app updates on Google Play target API 36 (Android 16) or higher from August 31, 2026 (phones and tablets) | Rule: Google Play › Target API level requirements (enforced by Google Play) |

---

## 4. Navigation

Navigation structures define how screens connect: how a person moves between them and how they get back.

### 4.1 Top-level navigation

Top-level navigation depends on the app frame (5.1):

| App frame | Narrow | Medium | Wide |
|---|---|---|---|
| **Multi-area app** (3 or more peer areas) | A bottom navigation bar, 3–5 destinations, always visible | A navigation rail, 3–7 destinations; an expanded rail opens from the menu icon for secondary destinations; a navigation bar when there are few destinations | The navigation pane of the AppShell |
| **Sidebar app** (a deep collection hierarchy) | The sidebar is the first screen of a stack | Sidebar and content | Sidebar, list and detail |
| **Single-area app** | No navigation bar; the header and the hierarchy | Same | Same |
| **Document app** | The document browser; an open document has only its editor's controls | Same | Same |
| **Immersive app** | Controls appear on demand and hide again | Same | Same |

Sources: Material 3 › Navigation bar, Navigation rail ("Compact windows should always use a navigation bar");
Apple HIG › Tab bars, Sidebars, Going full screen.

Rules for multi-area apps:
- An app with more than 5 areas keeps its 4–5 most used areas in the bar; the remaining areas are listed on one
  destination of the bar or in the top bar's menu. An app whose areas form a hierarchy uses the Sidebar app frame.
- Top-level navigation never uses a navigation drawer. This is a Plenix requirement that follows Material 3, which no
  longer recommends the drawer (May 2025) and replaces it with the expanded navigation rail, and Apple, which advises
  against overflow tabs because they hide content.
- A destination the person is not entitled to (role, permission, subscription, a feature the organization has turned
  off) is not shown. A destination the person is entitled to is never hidden or disabled; when its content is
  unavailable or empty, the screen explains why (HIG › Tab bars).
- The bar holds the current app's areas. Other Plenix apps are reached through the app switcher in the header.
- iOS uses the tab bar, which adapts to a sidebar on iPad; a search destination sits at the trailing end of the bar.
  Android uses the navigation bar on compact windows and the navigation rail on medium windows and up.

### 4.2 The eight structures

| # | Structure | Movement | Narrow | Medium | Wide | iOS | Android | Source |
|---|---|---|---|---|---|---|---|---|
| 1 | **Top level** | Sideways between the app's main areas | As 4.1 | As 4.1 | As 4.1 | Tab bar; sidebar on iPad | Navigation bar; rail | HIG › Tab bars; Material 3 › Navigation bar, Navigation rail |
| 2 | **Hierarchy** | Forward into detail, back out | Each screen pushes the next; Back returns one step | Push, or list and detail side by side | Panes side by side | `NavigationStack`: back button and edge swipe | Back stack: system back and Up | Android › Principles of navigation; Material 3 › List-detail |
| 3 | **Stack per area** | Top level and hierarchy together | Each top-level area keeps its own stack; leaving an area and returning restores where the person was | Same | Same | The tab bar preserves each section's navigation state | One back stack per destination | HIG › Tab bars |
| 4 | **Related views on one screen** | Sideways inside one screen | A segmented control for 2–5 closely related views, or tabs under the top bar | Same | Contained tabs (Plenix Tabs) | Segmented control | Primary tabs under the app bar; secondary tabs inside content | HIG › Segmented controls; Material 3 › Tabs |
| 5 | **Modal** | Out of the flow for one task, then back to the same place | A sheet or a full-screen task (5.3) | Sheet or dialog | Dialog | Sheet; full-screen cover | Bottom sheet; full-screen dialog | HIG › Modality, Sheets; Material 3 › Dialogs |
| 6 | **Step flow** | Forward through ordered steps | One step per screen inside a sheet or full-screen task; Back returns to the previous step | Same | A dialog or page with steps | Multi-step sheet | Full-screen flow | HIG › Sheets |
| 7 | **Search** | Straight to any content | The search view fills the screen | Docked search view | The header search | Search tab at the trailing end of the tab bar | Search bar with a full-screen or docked search view | Material 3 › Search; HIG › Searching |
| 8 | **Deep link** | Arriving from outside (a link, a notification) | As 4.3 | As 4.3 | As 4.3 | Universal links | Deep links with a built back stack | Android › Principles of navigation |

Rules of use:
- Tabs and segmented controls group related content at the same level, never sequential steps (Material 3 › Tabs).
- A sheet shows Cancel and Done, or Back in a multi-step flow, never all three at once; on iOS, Cancel sits on the
  leading edge. Only one sheet shows at a time (HIG › Sheets).

### 4.3 Back, parent and history

Seven separate mechanisms; Plenix never merges them into one rule.

| Mechanism | What it does | Web | iOS | Android | Source |
|---|---|---|---|---|---|
| **Destination** | Says where the person is | A URL for every screen | A navigation path | A destination per screen | Plenix |
| **History** | Records the person's actual path | The browser history; never rewritten or padded | The navigation stack | The back stack | Plenix; Android › Principles of navigation |
| **Back** | Returns along the history | The browser's back | Edge swipe and the navigation bar's back button; the edge swipe is never overridden | System back (gesture or button) with predictive back | HIG; Android › Predictive back |
| **Parent (Up)** | Goes to the logical parent of the screen | The header's parent control goes to the parent screen | The back button in the navigation bar (it returns along the stack) | Up in the top app bar; never shown on the start destination; never leaves the app | Android › Principles of navigation |
| **Deep link** | Opens a destination directly | Opens that URL alone; the browser history is not padded; the header's parent control still leads to the parent | Opens the destination inside its tab, with its parent screens beneath it | Opens the destination with a back stack built from its parents, so Back and Up lead toward the start destination | Android › Principles of navigation; Plenix |
| **Guard** | Protects unsaved work | Asks before leaving a screen with unsaved changes | Asks before dismissing a view with unsaved changes | Asks before discarding unsaved changes | HIG › Modality |
| **Restoration** | Returns the person to where they were | The URL and stored view state | State restoration | Saved instance state | HIG › Launching |

Rules:
- Every app has a fixed start destination (Android › Principles of navigation).
- Back and Parent are different operations. Back returns along the history; Parent goes to the logical parent. They
  reach the same screen only when the history follows the hierarchy. After Dashboard → Search → Requirement, Back
  returns to Search and Parent goes to the Requirements list. On the web, the browser's back is Back and the header's
  parent control is Parent. On Android, Up and Back follow the Android principle: within the app's task they behave
  identically, Up never leaves the app, and after a deep link Up goes to the logical parent.
- Back is intercepted only to guard unsaved work, never to run other work (Android › Predictive back: back callbacks are
  not used to run business logic or to log). Android back handling uses `OnBackPressedCallback` or
  `PredictiveBackHandler`: for apps targeting API 36 on Android 16, `onBackPressed` is not called and
  `KEYCODE_BACK` is not dispatched (Android 16 behavior changes).
- A modal always has an obvious way out: Close or Cancel (HIG › Modality).
- Navigation never holds actions; actions sit in the toolbar or header (HIG › Tab bars, Toolbars).

---

## 5. Page structures

This section is the catalog of page structures a Plenix app may use. Every structure in it is defined by Apple's Human
Interface Guidelines, Material Design 3 or the Android developer guidance. Each app chooses the structures it needs:

- **one app frame** (5.1), which sets how the whole app is framed and navigated;
- for **each screen**, one screen layout (5.2) or one task screen (5.3);
- for each screen, one **header** (5.4);
- the **states** of 5.5 wherever content loads, is empty or fails.

Every structure is defined at Narrow, Medium and Wide, and on iOS and Android with the native container that builds
it. A screen that needs a structure the catalog does not have (a workflow designer, a relationship graph, a node
editor) gets that structure added to this standard before the screen is built: its definition, its Narrow, Medium
and Wide forms, its iOS and Android containers and its sources, approved by the owner of the Plenix design system.

Each app records its **structure map** with its design-system record: its frame, its top-level areas, and the
structure and header of each screen.

### 5.1 App frames

| Frame | Use for | Narrow | Medium | Wide | iOS | Android | Source |
|---|---|---|---|---|---|---|---|
| **Multi-area app** | An app with 3 or more main areas of equal rank | Bottom navigation bar, 3–5 destinations (4.1); each area keeps its own stack | Navigation rail, 3–7 destinations | Navigation pane (AppShell) | `TabView` (tab bar); adapts to a sidebar on iPad | `NavigationBar`; `NavigationRail` on medium and up | HIG › Tab bars, Sidebars; Material 3 › Navigation bar, Navigation rail |
| **Sidebar app** | An app whose content is a deep collection hierarchy (mail boxes, folders, libraries) | Collapses to a stack: the sidebar is the first screen, Back returns to it | Two columns: sidebar and content | Two or three columns: sidebar, list, detail | `NavigationSplitView` (two or three columns on iPad); a sidebar shows no more than two levels | List-detail scaffold with a navigation rail | HIG › Split views, Sidebars; Material 3 › List-detail |
| **Single-area app** | An app with one main task and no peer areas | One start screen; hierarchy only (4.2, structure 2); no navigation bar | Same | Same, with panes where the content allows | `NavigationStack` from one root | One start destination and its back stack | Android › Principles of navigation (fixed start destination) |
| **Document app** | An app that creates, opens and edits documents or files | The start screen browses documents; a document opens full screen in its editor | Same | Browser and editor side by side where useful | Document browser; Quick Look previews for files the app cannot open | System file picker | HIG › File management |
| **Immersive app** | Media, camera, maps and other content that fills the screen | Content fills the screen; controls appear on demand and hide again; an obvious way to exit | Same | Same | Full-screen presentation; system gestures deferred where accidental exits matter | Immersive mode | HIG › Going full screen |

### 5.2 Screen layouts

| Layout | Use for | Narrow | Medium | Wide | iOS | Android | Source |
|---|---|---|---|---|---|---|---|
| **List** | Text-first items: records, messages, settings rows | Full-width rows. Plain style for a continuous list; grouped style (headers, footers, space between groups) for sections | Same; or the list pane of List-detail | The list pane of List-detail or the Plenix listing | `List` (plain, grouped, inset grouped) | Lazy list | HIG › Lists and tables; Material 3 › Lists |
| **Collection** | Image-first items: photos, assets, products | A grid of 2–3 columns, or one row that scrolls sideways | More columns | More columns | `LazyVGrid`, collection views; the standard row or grid layout | Lazy grid | HIG › Collections |
| **Feed** | A stream of cards: activity, updates, media | One column of cards | Two columns | A configurable grid of columns | `List` or grid of cards | Lazy staggered grid | Material 3 › Canonical layouts › Feed |
| **List-detail** | Browsing a collection and reading one item | One pane at a time: the list; choosing an item pushes its detail; Back returns; no selection shown | One pane for dense content; two panes for browsing | Two panes; the selected item stays highlighted | `NavigationSplitView`, collapsing to a stack | List-detail scaffold | Material 3 › Canonical layouts › List-detail; HIG › Split views |
| **Supporting pane** | Main content with secondary content beside it: details, comments, filters | Primary content; the secondary content opens as a modal bottom or side sheet | Primary content with a standard side sheet | Primary about two thirds, supporting pane about one third | Sheet with detents; inspector on iPad | Supporting pane scaffold; standard side sheet on medium and up, modal side sheet on compact | Material 3 › Canonical layouts › Supporting pane; Material 3 › Side sheets |
| **Detail** | One item's full content | A scrolling column; sections stack; actions in the header or a bottom toolbar | Same, wider margins | The record page | `ScrollView` in a `NavigationStack` | Scrolling column with a top app bar | HIG › Scroll views |
| **Paged** | An ordered set of full-screen pages: a tour, a set of images | One page per screen; swipe between pages; a page control centered at the bottom | Same | Same | Paged `TabView` with a page control | Horizontal pager | HIG › Page controls |
| **Carousel** | A scrolling row of visual items inside a screen | Multi-browse (many items at once), uncontained (text-heavy, custom), hero (one large item and a preview), or full-screen (one item filling the screen); snap scrolling except uncontained | More items visible | More items visible | Horizontal `ScrollView` with snapping | `HorizontalMultiBrowseCarousel`, `HorizontalUncontainedCarousel` | Material 3 › Carousel |
| **Content with a persistent sheet** | A map, canvas or player behind supplementary content the person keeps open | The content fills the screen; a non-modal bottom sheet rests at a medium height (about half) or full height | A side sheet | A side sheet or pane | Non-modal sheet with medium and large detents | Standard bottom sheet | HIG › Sheets; Material 3 › Bottom sheets |
| **Full-screen viewer** | Viewing one photo, video or document | Content fills the screen; toolbars and navigation hide; a tap shows them; an obvious way to close | Same | Same | Full-screen cover | Immersive mode | HIG › Going full screen |
| **Dashboard** | An overview of metrics, charts and shortcuts | One column of cards in priority order | Two columns | The Plenix dashboard grid | Grid of cards; Swift Charts | Grid of cards | Material 3 › Canonical layouts › Feed; HIG › Charting data |

### 5.3 Task screens

| Task screen | Use for | Narrow | Medium | Wide | iOS | Android | Source |
|---|---|---|---|---|---|---|---|
| **Form** | Entering or editing structured data | One column; one field per row; the matching keyboard per field; choices instead of typing where possible; fields validated as they change | Same, centered | The Plenix form page | `Form` | Scrolling column of fields | HIG › Entering data |
| **Full-screen task** | Creating or editing something that needs the whole screen | Header with a close control (leading) and a confirm button (trailing: Save, Create, Done); asks before discarding changes | A dialog | A dialog or page | Full-screen cover with Cancel (leading) and Done (trailing) | Full-screen dialog: close icon, headline, confirm button | Material 3 › Dialogs (full-screen dialog); HIG › Modality |
| **Sheet task** | A short, self-contained task or choice that returns to its screen | A sheet at medium (about half) or large height; Cancel on the leading edge, Done on the trailing edge; one sheet at a time | A sheet; small content may use a popover on iPad | A dialog or popover | `.sheet` with detents; popovers never in compact views | Modal bottom sheet | HIG › Sheets, Popovers; Material 3 › Bottom sheets |
| **Step flow** | A task in ordered steps | One step per screen inside a full-screen task or sheet; Back returns to the previous step; never Cancel, Done and Back together | Same | A dialog or page with steps | Multi-step sheet | Full-screen flow | HIG › Sheets |
| **Search** | Finding content | The search view fills the screen: field on top, recent searches and suggestions, then results; the scope is shown | Docked: results open in a list below the search bar over a scrim | The header search | `.searchable`; a search tab at the trailing end of the tab bar | Search bar with a full-screen search view (compact) or docked view (medium and up) | Material 3 › Search; HIG › Searching, Tab bars |
| **Settings** | The app's own preferences | Grouped list: groups divided by dividers, optional group headings; most used first; no more than 10–15 items per screen; less common settings on their own screen; an "Advanced" entry only when it hides at least 3 items; a main switch at the top turns a whole feature on or off and disables its settings; footer text below a divider; switches only in rows | Grouped list, or list and detail | The SettingsLayout | `Form` with sections; only rarely changed options in the system Settings app | Compose apps: settings screens built from Compose lists that follow the Android settings design guidelines. View-based apps: the AndroidX Preference library (`PreferenceFragmentCompat`) | HIG › Settings; Android › Settings design guidelines; Android › Settings |
| **Sign-in and account** | Signing in, creating and deleting an account | One column, one task per screen; sign-in delayed until the app needs it; the benefits of an account explained | Centered card | Centered card | Sign in with Apple or passkeys; password autofill; an account created in the app can be deleted in the app | Credential Manager; passkeys | HIG › Managing accounts |
| **Onboarding** | Teaching the app at first use, only when needed | Short, optional and interactive; context-specific tips preferred to one long flow; permission requests made in context; nonessential setup postponed | Same | Same | Same | Same | HIG › Onboarding |
| **Launch screen** | What shows while the app opens | Nearly identical to the first screen; no text; no advertising; the app restores where the person left off | Same | — | Launch screen | System splash screen (Android 12 and up): the app icon on one opaque background color, no branding image; never shown on a hot start; dismissed when the first frame draws | HIG › Launching; Android › Splash screens |

### 5.4 Headers

| Header | Use for | iOS | Android | Source |
|---|---|---|---|---|
| **Large title** | Top-level screens and screens whose headline matters | Large title that collapses to the inline title on scroll | Large flexible app bar; collapses to small on scroll | HIG › Toolbars; Material 3 › App bars |
| **Medium title** | Screens that show a larger headline than the small bar | Inline title | Medium flexible app bar; collapses to small on scroll | Material 3 › App bars |
| **Small title** | Dense screens, detail screens, scrolled screens | Inline title | Small app bar | Material 3 › App bars |
| **Search header** | Home screens where search is the main entry | Search field in the navigation bar | Search app bar | Material 3 › App bars; HIG › Searching |

Header rules:
- At Narrow, a header holds one action, two when necessary; the primary action changes or leaves the whole screen
  (Send, Save, Edit). Further actions go in a toolbar, and an overflow menu in the header is avoided (Material 3 ›
  App bars).
- At Medium and Wide, the header and its toolbar hold the actions the screen needs, as far as the space allows,
  most used first; the rest go in a menu (Plenix).
- While items are selected, the header shows the actions for the selection and the number selected (Plenix).
- The header shows the back control on every screen below the start of its stack (4.3).

### 5.5 States

A state covers only the part of the screen it concerns:

| Scope | Treatment |
|---|---|
| **App** (nothing can load: offline at launch, signed out) | A full-screen state |
| **Screen** (the screen's content cannot load or is empty) | The state fills the screen's content area; the header and navigation stay |
| **Pane** (an inspector with nothing selected, a list pane with no results) | The state fills that pane; the other panes keep working |
| **Component** (one widget, one table, one field) | An inline state inside the component; the rest of the screen keeps working |

| State | Rule | Source |
|---|---|---|
| **Loading** | Something shows as soon as possible; the person can do other things while content loads; long loads show progress and how long they take | HIG › Loading |
| **Empty** | A message that explains why the area is empty, with one action that fills it where there is one | HIG › Tab bars ("explain why its content is unavailable") |
| **Error** | A message that names the problem, with one action that recovers | Plenix |

### 5.6 Plenix page structures in the catalog

Plenix's own page-structure records (taxonomy section 11) map to the catalog:

| Plenix record | Catalog structure |
|---|---|
| Application shell | Multi-area app, Sidebar app or Single-area app (5.1) |
| Master-detail workspace | List-detail |
| Inspector layout | Supporting pane |
| Listing page | List or Collection |
| Detail page, Object / record page | Detail |
| Create page, Edit page | Full-screen task or Sheet task |
| Settings page | Settings |
| Search results page | Search |
| Dashboard | Dashboard |
| Home page | Feed or Dashboard |
| Authentication page | Sign-in and account |
| Full-screen experience | Immersive app or Full-screen viewer |
| Error page, Empty application state | States (5.5) |

Patterns these structures use have their own homes: bottom sheet and full-height sheet (09 › Drawers and sheets),
onboarding (10 › Onboarding and education), bottom navigation and mobile tab bar (06 › Mobile navigation).

---

## 6. Components

The Plenix look (color, type family, radius as far as each control exposes it, the focus color) comes from the theme on
every platform and is not repeated here. The design system shows each component's values as one table per platform,
with the source of every row. Flutter rows name Flutter's widgets, which are drawn by Flutter (1.4).

### 6.1 Button

| | Web · fine pointer | Web · coarse pointer | iOS | Android |
|---|---|---|---|---|
| Control | `plx-button` | `plx-button` | System: SwiftUI `Button` · Flutter `CupertinoButton` | System: Compose `Button` · Flutter `FilledButton` |
| Visible height | Compact 24 · Standard 32 · Comfortable 36 (`--plx-sys-control-height-standard`) | 44 | System: `ControlSize` regular by default | Token: small (default) 40dp; XS 32 · M 56 · L 96 |
| Target | At least 24×24 | At least 44×44 | Rule: at least 44×44 pt | Rule: at least 48×48 dp |
| Horizontal padding | `--plx-comp-button-size-*` tokens | Same | System | Token: 16dp (small) · 12 (XS) · 24 (M) · 48 (L) |
| Icon | `--plx-sys-control-icon-standard` | 20 | System (SF Symbol scale) | Token: 20dp; 8dp between icon and label |
| Spacing between buttons | `--plx-comp-button-cluster-gap` | 12 | Rule: about 12 pt around a bezeled button | Rule: at least 8dp |
| Behavior | Hover, focus-visible and pressed states | Nothing depends on hover; the pressed state shows on touch | Rule: a visible background shape | System pressed state |

### 6.2 Text field

| | Web · fine pointer | Web · coarse pointer | iOS | Android |
|---|---|---|---|---|
| Control | `plx-input` | `plx-input` | System: SwiftUI `TextField`, `SecureField` | System: Compose `OutlinedTextField`, with the Plenix label position |
| Visible height | `--plx-sys-control-height-standard` | 44 | System | Token: 56dp |
| Target | At least 24×24 | At least 44×44 | Rule: at least 44 pt | Rule: at least 48×48 dp |
| Icons | `--plx-sys-control-icon-standard` | 20 | System | Token: leading and trailing 24dp |
| Label | A visible label above the control; the placeholder is only a hint | Same | Rule: a separate label, because the placeholder disappears | Same as web |
| Keyboard | `type`, `inputmode`, `autocomplete` | Same | Rule: the matching keyboard type | The matching keyboard type |
| Clear | A clear button at the trailing end | Same | Rule: a Clear button at the trailing end | A trailing icon button |
| Private data | `type="password"` | Same | Rule: a secure field | Password field |
| Validation | An email when the person leaves the field; a new password or user name while typing | Same | Rule: the same timing (HIG › Text fields) | Same |

**Field states.** Focus, error, pointer hover and selection are separate states with separate treatments:

| State | Treatment | Source |
|---|---|---|
| **Keyboard focus** | The border changes to the focus color (`--plx-comp-input-focus-border-color`); no outer ring. In light and in dark, the focus color has at least 3:1 contrast against the field's background and the page, and at least 3:1 against the unfocused border, so the focused field is distinguishable from an unfocused one | Plenix; WCAG 2.2 SC 2.4.7 (AA) and 1.4.11 (AA) |
| **Error** | The danger border (`--plx-comp-input-invalid-border-color`) together with an error message in text that names the problem; never the color alone | WCAG 2.2 SC 1.4.1, 3.3.1 |
| **Hover** (fine pointer) | The hover border | Plenix |
| **System focus indicators** | Indicators drawn by the operating system for its accessibility features (iPadOS Full Keyboard Access, Android keyboard navigation) are never suppressed | Platform accessibility (1.2) |

### 6.3 Switch

| | Web · fine pointer | Web · coarse pointer | iOS | Android |
|---|---|---|---|---|
| Control | `plx-switch` | `plx-switch` | System: SwiftUI `Toggle` (switch style) | System: Compose `Switch` |
| Visible size | Track 36×20, handle 16 (`--plx-comp-switch-track-*`) | Same; the row is 44 high | Reference: track 51×31 pt (Flutter `CupertinoSwitch`) | Token: track 52×32dp; handle 16dp off, 24dp on, 28dp pressed |
| Target | At least 24×24 (`--plx-comp-switch-min-height`) | At least 44×44: the row and label are part of the target | Rule: at least 44 pt (the row) | Token: 40dp state layer; Rule: at least 48×48 dp |
| Where | Settings rows and forms | Same | Rule: only in a list row; outside a list, a button that toggles | Settings rows and forms |
| Color | On: `--plx-sys-action-primary-background` | Same | Rule: the accent color replaces green when contrast is kept, so the Plenix action color | The Plenix action color |
| State | Shown by the handle position as well as color | Same | Rule: never by color alone | The handle size and icon change |

### 6.4 Navigation

| | Web Narrow | Web Medium | Web Wide | iOS | Android |
|---|---|---|---|---|---|
| Form (multi-area app) | Bottom bar, 3–5 destinations, never a drawer | Rail, 3–7 destinations | Navigation pane | System: `TabView`; sidebar on iPad | System: `NavigationBar`; `NavigationRail` on medium and up |
| Size | 44 targets per destination | The rail tokens | The navigation pane tokens | Reference: tab bar 50 pt (Flutter `CupertinoTabBar`); in iOS 26 the tab bar floats over the content | Token: bar 80dp; active indicator 64×32dp; icon 24dp |
| Labels | Always shown under each icon | Shown | Shown | Rule: always labeled, one word where possible | Shown |
| Visibility | Always visible, except in a modal or full-screen view | Same | Same | Rule: always visible, except under a modal view | Rule: one destination always active |

### 6.5 Functional equivalents

Every Plenix component has a functional equivalent on each platform. The equivalent does the same job with the
platform's own control; it is not a copy of the web component. A component whose layout cannot fit a Narrow window
changes structure rather than shrinking.

| Plenix | Web | iOS (SwiftUI) | Android (Compose) |
|---|---|---|---|
| Select | `plx-select` | `Picker` (menu style) | `ExposedDropdownMenuBox` |
| Checkbox | `plx-check` | `Toggle` in a list, or a selection list | `Checkbox` |
| Radio group | `plx-radio-group` | `Picker` (inline) or a selection list | `RadioButton` group |
| Date and time | Date field and picker | `DatePicker` | `DatePicker`, `TimePicker` |
| Dialog | `plx-dialog` | `.alert`, `.confirmationDialog` | `AlertDialog` |
| Sheet and inspector | Side panel | `.sheet` with detents; inspector on iPad | `ModalBottomSheet`; side sheet on medium and up |
| Tooltip | Hover and focus tooltip | No hover on touch: the help text is shown in the screen; `.help` on iPad with a pointer | `TooltipBox` on long press |
| Feedback message | Toast | An inline banner in the screen | `Snackbar` |
| Data table | Plenix DataTable | On Narrow, a List or List-detail (5.2) with the key columns; a table on iPad | On compact, a list or list-detail with the key columns |
| Tree | Plenix Tree | `OutlineGroup`, or a sidebar with disclosure groups | Expandable list |
| File upload | File input and drop zone | `.fileImporter`, `PhotosPicker` | System file picker and photo picker |
| Progress | Progress bar and spinner | `ProgressView` | `LinearProgressIndicator`, `CircularProgressIndicator` |
| Menu | `plx-menu` | `Menu`, context menus | `DropdownMenu` |
| Search and filters | Search field and filter controls | `.searchable` with scopes | Search bar with filter chips |

The pairing of each Plenix component with a platform control is a Plenix rule; each control's behavior is the
platform's.

---

## 7. Implementation

### 7.1 Tokens

One set of token names, with values per platform.
- Plenix-owned tokens live in the theme files (`theme-<name>.tokens.json`, `.light` and `.dark`).
- Web size and behavior tokens live in the interaction sets (`semantic.interaction-pointer`, `-touch`, `-mobile`;
  `components.interaction-touch`, `-mobile`).
- iOS and Android size and behavior tokens live in `platform-ios.tokens.json` and `platform-android.tokens.json`.
- Every platform value carries `$extensions.plenix.source` with: source type (2.1), level (2.2), source platform,
  source framework (for example Material Web, Compose Material 3, Flutter), source version, the source's token or
  rule name, the published value, the Plenix value where it differs, the URL, and the date verified. Material Web
  tokens and Compose Material 3 defaults are recorded separately; they are not assumed to be equal.

### 7.2 Build outputs

`build-tokens.js` generates:
- CSS custom properties for the web;
- a Dart `ThemeExtension` for Flutter with the iOS and Android sets, chosen by `defaultTargetPlatform` (a Flutter web
  build uses the web set);
- Swift and Kotlin constants for SwiftUI and Jetpack Compose apps.

### 7.3 Behavior

Native apps use the controls and containers in sections 1.4, 4, 5 and 6, styled with Plenix tokens. The web DOM
components are never ported to native.

---

## 8. Conformance

Every Plenix app conforms to WCAG 2.2 level AA in full on the web, and to the platform accessibility requirements on
iOS and Android. The design system's checks prove that its components meet this standard; they do not by themselves
prove that an app conforms. Each app's design-system record lists its structure map (5), its supported operating-system
versions, and its conformance results.

### 8.1 Checks

| Check | Passes when | How |
|---|---|---|
| Targets and spacing | Every target meets 3.1 and 3.2 (WCAG 2.5.8) | Automated measurement; on the web, the target-size audit |
| Keyboard | Every control can be reached and operated by keyboard, in an order that follows the meaning (WCAG 2.1.1, 2.4.3) | Keyboard walk-through |
| Focus visible | Focus is always visible and meets 6.2 in light and dark (WCAG 2.4.7, 1.4.11) | Contrast measurement of focused against unfocused states |
| Focus not obscured | A focused element is never entirely hidden by the header, bottom bar, inspector, sheets or panes (WCAG 2.4.11) | Keyboard walk-through at Narrow, Medium and Wide |
| Contrast | 1.6 contrast ratios in light and dark (WCAG 1.4.3, 1.4.11) | Automated contrast check |
| Text scaling and zoom | Layouts hold at the largest Dynamic Type size, the largest Android font scale, 200% browser text and 400% zoom (WCAG 1.4.4, 1.4.10) | Manual check at each setting |
| Forms | Every field has a visible label and instructions; errors are named in text and suggest a fix; information already given is not asked for again (WCAG 3.3.1, 3.3.2, 3.3.3, 3.3.7) | Form review |
| Authentication | Signing in needs no memory or transcription test; passkeys, password managers and paste work (WCAG 3.3.8) | Sign-in review |
| Dragging and gestures | Every drag and every multi-point or path gesture has a single-pointer alternative (WCAG 2.5.1, 2.5.7) | Interaction review |
| Consistent help | Help appears in the same place on every screen (WCAG 3.2.6) | Screen review |
| Navigation | Back, parent, deep links and guards behave as 4.3 | Scripted navigation tests |
| Restoration | The app returns to its screen and state after suspension, rotation and resizing | Lifecycle tests |
| Tokens | Every value comes from a token; generated outputs match the token JSON | `check-system.js`, token build diff |
| Semantics | Every control has a name, role and state for screen readers (WCAG 4.1.2) | Accessibility inspector (VoiceOver, TalkBack, axe) |
| Versions | The checks pass on the oldest supported OS version and the current release; Android apps target API 36 | Test matrix |

---

## Sources


**Apple Human Interface Guidelines**
[Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) ·
[Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) ·
[Toggles](https://developer.apple.com/design/human-interface-guidelines/toggles) ·
[Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields) ·
[Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) ·
[Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars) ·
[Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls) ·
[Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars) ·
[Typography](https://developer.apple.com/design/human-interface-guidelines/typography) ·
[Modality](https://developer.apple.com/design/human-interface-guidelines/modality) ·
[Sheets](https://developer.apple.com/design/human-interface-guidelines/sheets) ·
[Split views](https://developer.apple.com/design/human-interface-guidelines/split-views) ·
[Searching](https://developer.apple.com/design/human-interface-guidelines/searching) ·
[Settings](https://developer.apple.com/design/human-interface-guidelines/settings) ·
[Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) ·
[Launching](https://developer.apple.com/design/human-interface-guidelines/launching) ·
[Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables) ·
[Collections](https://developer.apple.com/design/human-interface-guidelines/collections) ·
[Page controls](https://developer.apple.com/design/human-interface-guidelines/page-controls) ·
[Scroll views](https://developer.apple.com/design/human-interface-guidelines/scroll-views) ·
[Popovers](https://developer.apple.com/design/human-interface-guidelines/popovers) ·
[Going full screen](https://developer.apple.com/design/human-interface-guidelines/going-full-screen) ·
[File management](https://developer.apple.com/design/human-interface-guidelines/file-management) ·
[Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data) ·
[Managing accounts](https://developer.apple.com/design/human-interface-guidelines/managing-accounts) ·
[Loading](https://developer.apple.com/design/human-interface-guidelines/loading) ·
[Charting data](https://developer.apple.com/design/human-interface-guidelines/charting-data) ·
SwiftUI [ControlSize](https://developer.apple.com/documentation/swiftui/controlsize)

**Material Design 3**
[Target sizes](https://m3.material.io/foundations/designing/structure) ·
[Breakpoints](https://m3.material.io/foundations/layout/breakpoints/overview) ·
[Canonical layouts](https://m3.material.io/foundations/layout/canonical-examples/overview) ·
[List-detail](https://m3.material.io/foundations/layout/canonical-examples/list-detail) ·
[Navigation bar](https://m3.material.io/components/navigation-bar/guidelines) ·
[Navigation rail](https://m3.material.io/components/navigation-rail/guidelines) ·
[Navigation drawer](https://m3.material.io/components/navigation-drawer/overview) ·
[Tabs](https://m3.material.io/components/tabs/guidelines) ·
[Lists](https://m3.material.io/components/lists/guidelines) ·
[Carousel](https://m3.material.io/components/carousel/guidelines) ·
[Search](https://m3.material.io/components/search/guidelines) ·
[App bars](https://m3.material.io/components/app-bars/guidelines) ·
[Bottom sheets](https://m3.material.io/components/bottom-sheets/guidelines) ·
[Side sheets](https://m3.material.io/components/side-sheets/guidelines) ·
[Dialogs](https://m3.material.io/components/dialogs/guidelines) ·
[Component and type tokens](https://github.com/material-components/material-web/tree/main/tokens/versions/latest/sass)

**Android developers**
[Principles of navigation](https://developer.android.com/guide/navigation/principles) ·
[Predictive back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) ·
[Settings](https://developer.android.com/develop/ui/views/components/settings) ·
[Settings design guidelines](https://source.android.com/docs/core/settings/settings-guidelines) ·
[Splash screens](https://developer.android.com/develop/ui/views/launch/splash-screen) ·
[Edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) ·
[Android 16 behavior changes](https://developer.android.com/about/versions/16/behavior-changes-16) ·
[Google Play target API level requirements](https://developer.android.com/google/play/requirements/target-sdk)

**Flutter** (reference numbers)
[FAQ: Flutter draws its own widgets](https://docs.flutter.dev/resources/faq) ·
[material/constants.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/material/constants.dart) ·
[cupertino/constants.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/constants.dart) ·
[cupertino/switch.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/switch.dart) ·
[cupertino/bottom_tab_bar.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/bottom_tab_bar.dart) ·
[cupertino/nav_bar.dart](https://github.com/flutter/flutter/blob/master/packages/flutter/lib/src/cupertino/nav_bar.dart)

**WCAG 2.2**
[2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) ·
[2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) ·
[1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) ·
[1.3.4 Orientation](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html) ·
[1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) ·
[1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) ·
[1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) ·
[2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) ·
[2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) ·
[2.4.13 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) ·
[3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) ·
[4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) ·
[1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) ·
[2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) ·
[2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) ·
[2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) ·
[2.5.1 Pointer Gestures](https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html) ·
[2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) ·
[3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) ·
[3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) ·
[3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html) ·
[3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) ·
[3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
