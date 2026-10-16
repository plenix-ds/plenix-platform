# Task #132: command bar content other than actions folds into More (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/132 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

As the command bar narrows only `actions` fold into More (RedSave #22). Quick filters, toggle actions and `end` content
must fold too, in the order the bar already follows (#8, the Fluent model: labels become icons, then search, count and
status, then actions into More, then the quick filters). Each folded quick filter becomes a submenu in More (checked
items for a list, a radio group for a single choice, its count kept); a toggle a checked item; `end` content may give
`fold: { label, icon, items }` to say how it shows in More, and without it stays in the bar.

### Files you own

- `platform/patterns/CommandBar/` (the component, its overflow code and its stylesheet) · the CommandBar design-system
  record through `lanes/132/design-system/` (a narrow card that shows the folded quick filters)

Coordinate with #131 (required single choice in More): if both are open, take #131's radio group as is.

### Done means

- The quick gates pass; at 360px wide the Posts reference (docs/composition/posts.html) shows search, More, and every
  quick filter inside More, each still filtering.
- One pull request from `codex/132-command-bar-fold`, `Closes #132`.
