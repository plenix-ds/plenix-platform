# Task #131: a required single-choice quick filter (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/131 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

A single-choice `QuickFilter` can always be cleared back to All (RedSave #11). Add `required`: no All option, no
clear button, and the first option is the value when none is set. Pass it through `useCollectionView` (`quick: { field:
{ kind: 'single', required: true } }` or the form the hook already uses; read it) and `CommandBar quickFilters`.
A saved view without a value for a required filter restores the first option. Folded into More it is a radio group
with no "All".

### Files you own

- `platform/patterns/QuickFilter/` · `platform/hooks/useCollectionView*` · the QuickFilter design-system record
  (`lanes/131/design-system/parts/w131.records.js`: a Required card)

### Done means

- The quick gates pass; a lab or test shows: no All, no clear, first option by default, restored from a saved view.
- One pull request from `codex/131-quick-filter-required`, `Closes #131`.
