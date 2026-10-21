# Web item page template — draft for approval

Built from what the spec draws today: all 861 Web pages were opened and read (781 item pages, plus 76 section overviews and 4 standard pages, left out). Demos and labs are not counted. iOS and Android are out of scope (issue #221).

Sources: the crawl (`pages.json`, `inventory.md` in the session scratchpad) and `platform/design-system/STANDARD.md` §7.

## 1. The template

Every item page shows these 17 sections in this order. "Always" sections appear on every page; when there is no content, they show "Not written yet". "When it applies" sections appear only on the pages they apply to.

| # | Section | Shown | What it holds (fixed) | Today |
|---|---|---|---|---|
| 1 | Overview and Purpose | Always | Name/Value: Overview · Purpose | 781 pages, same rows |
| 2 | Usage | Always | When to use (list) · When not to use (list) | 783, same |
| 3 | Variants | Always | Base, then each variant, each in the same **variant block** (part 1b): its Figma design, styles, attributes, states, behavior, example. Base holds what every variant shares; a variant shows only what differs | Titled "Variants and examples" on 709 pages, "Variants" on 74 |
| 4 | Lab | Components with a lab | Every variant in every state · The drawing and Edit | 303, same |
| 5 | States | Interactive components | One table: State · Looks · Set by · Changes, with the §7 state list | 450 pages, **two different column sets** (State · Set by · Changes on 230; State · Looks · Set by on 34) |
| 6 | Anatomy | Always | Parts (required, optional, slots) · Block · Elements · Variants (modifiers) · States (classes) · States (pseudo-classes, attributes) | 781, same; the class rows are missing on 103 pages without a stylesheet |
| 7 | Behavior | Always | Mouse and touch · Keyboard · Focus · Responsive · Loading · Error · Density · Motion | 773 same, 8 pages differ |
| 8 | Accessibility | Always | Semantic role · ARIA attributes · Accessible name · Focus management · Screen-reader announcements · Contrast · Reduced motion · Every control | 772 same |
| 9 | Content guidance | Always | Labels · Action copy · Error messages · Localization | 771 same |
| 10 | Specification | Foundations and items with rules of their own | The item's own rules, tables and values | 12 pages, titled "Specification" on 9 and "Guidelines" on 3; 12 more pages add their own sections (`p-*`) outside it |
| 11 | Development and API | Components | Usage (code) · Props table (Prop · Type · Default · Description) · Behavior · Notes, read from the component's header comment | 643, same |
| 12 | Implementation | Always | React · HTML / CSS · Vue, Angular, Web components, native; tabs: Use in code · JSX · CSS · Classes · Tokens | 781, same |
| 13 | Platforms | Items with counterparts | Counterparts on iOS and Android · Functional equivalent · Platform specification · Apple iOS kit in Figma (Component · Kit page · Variants · Variant properties) | Spread over four sections today (see 2.4) |
| 14 | Design assets | Always | Token references · Icon references · Template references | 781, same (the Figma row moves into each variant) |
| 15 | Related items | Always | List | 781 |
| 16 | Source-system mappings | Always | Table: Source system · Source component · Match type · Notes | Table on 432 of 781 pages |
| 17 | Details and Lifecycle | Always | Canonical name · Canonical ID · Category · Aliases · Also answers · Plenix · Component level · Interaction · Scope · Status · Owner · Last reviewed · Version | 781, same |

## 1b. The variant block

A variant is a design of its own: Tabs has several variants, and each one has its own Figma design, styles, attributes and behavior. Base and every variant use the same block, with the same fields in the same order. Base lists what all variants share; a variant lists only what it changes (owner rule, 2026-10-06). The page-level sections (States, Anatomy, Behavior, Accessibility) describe Base.

| # | Field | What it holds |
|---|---|---|
| 1 | Figma design | The variant's own Figma node and its link; "Not in Figma yet" until it exists |
| 2 | Styles | Modifier class · the tokens it sets (component tokens, by role) |
| 3 | Attributes | The props and values that select it, and the props it adds |
| 4 | States | The states it adds or changes (State · Looks · Set by · Changes) |
| 5 | Behavior | What it does differently (mouse and touch, keyboard, focus, responsive, density, motion) |
| 6 | Accessibility | What changes for assistive technology, if anything |
| 7 | Example | The live drawing |

Each variant page (#/section/item/v/variant) shows its block in full: Base plus its own changes.

## 2. What is inconsistent today

1. **States: two table layouts.** 230 pages use State · Set by · Changes, and 34 use State · Looks · Set by. The template uses one table with all four columns.
2. **Variants: two titles.** "Variants and examples" (709) and "Variants" (74). Same content.
3. **Specification: two titles, and sections outside it.** "Specification" (9) and "Guidelines" (3). Twelve foundation pages (Spacing, Color, Typography, Radius …) add numbered sections of their own beside the template instead of inside it.
4. **Platforms: four sections for one subject.** Across platforms (774 pages), Platforms (395, with **242 of them empty**), Platform specification (23) and the Apple iOS kit's Figma section (310).
5. **Figma: not tied to variants.** The Plenix design is one row in Design assets ("None" on every page), not per variant. In the template each variant carries its own Figma design (owner, 2026-10-21). Themes in Figma (1 page) belongs to the Themes foundation page, not to every item.
6. **Behavior and Usage appear twice.** Development and API repeats a "Usage" and a "Behavior" from the component's header comment, next to the page's own Usage and Behavior sections.
7. **Source-system mappings: table on 432 of 781 pages.** The rest show text only.
8. **"Last reviewed" means nothing.** All 768 records say 2026-10-05, a default that was set once. Owner is "Plenix Platform" on every record.
9. **Rare extra rows.** Overview and Purpose sometimes adds Used by (16), Common ground (8) and Sources (8). Details adds Also answers (37).

## 3. Differences from STANDARD.md §7

| §7 says | Pages do | Draft keeps |
|---|---|---|
| Overview and Purpose as two sections | One section, two rows | One section |
| Category, Component level, Aliases as sections | Rows in Details and Lifecycle | Rows in Details |
| When to use, When not to use as sections | One Usage section with both | Usage |
| Implementations | Implementation (owner decision, 2026-10-06) | Implementation |
| Lifecycle | Details and Lifecycle | Details and Lifecycle |
| — | Lab, Specification, Development and API, Platforms | Added to §7; the variant block (1b) added to Variants |
| Design assets (with Figma) | Design assets with a Figma row | Figma moves into each variant; Design assets keeps tokens, icons, templates |

Once approved, §7 is rewritten to match this template, and check-spec.js checks every Web page against it.

## 4. Decisions for the owner

1. **Approve the section list and order in part 1.** Recommended as drafted.
2. **States table:** one table, State · Looks · Set by · Changes. Recommended.
3. **Platforms:** fold Across platforms, Platforms and Platform specification into one Platforms section with fixed sub-parts. Recommended. Or keep them apart until #221. (Apple's iOS kit in Figma goes here too; the Plenix Figma design is per variant, part 1b.)
4. **Specification:** one title, "Specification", with each foundation's own sections inside it. Recommended.
5. **Development and API:** keep Usage and Behavior from the header comment (they describe the code) but rename them "Code usage" and "Code behavior", so they don't look like duplicates. Recommended. Or drop them.
6. **Last reviewed:** fill it from git (the date the item's content last changed), or remove the row. Filling from git is recommended.
7. **Rare rows** (Used by, Common ground, Sources, Also answers): keep them as optional rows of the template. Recommended.

## 5. After approval

1. Rewrite STANDARD.md §7 and add the check.
2. Build the side-by-side picker for duplicates: each copy in a column with all its attributes; identical fields merged already (38% of fields); fields only one copy has carried over (8%); differing fields (53%) shown next to each other with a pick or keep-both choice.
3. Merge per your picks, with redirects and a "nothing lost" check.
