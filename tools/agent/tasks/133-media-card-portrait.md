# Task #133: MediaCard portrait shapes (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/133 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

`MediaCard.aspect` offers `4/3`, `1/1` and `16/9` (RedSave #28). Add `9/16` (portrait video, stories) and `3/4`, from
aspect tokens (add `--plx-comp-media-card-aspect-*` tokens that point at existing ratios; no raw values in the CSS). A
ContentGrid of mixed shapes keeps its rows aligned (the media box takes the shape, the text below keeps its height).

### Files you own

- `platform/components/Card/` (only MediaCard's part and its stylesheet) · `platform/tokens/components/media-card*.tokens.json`
- the MediaCard design-system record through `lanes/133/design-system/` (one card per shape)

### Done means

- The quick gates pass; the five shapes render in the design system, light and dark.
- One pull request from `codex/133-media-card-portrait`, `Closes #133`.
