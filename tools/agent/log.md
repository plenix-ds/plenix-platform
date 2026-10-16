## Batch 401 (2026-10-16): priority size and baseline
- Cause: StatusIcon is inline-flex and takes its baseline from the glyph; the word inherited the panel's 13px. Priority is now
  Inline(baseline) of StatusIcon (named, centered with plx-u-self-center) + Text secondary (12px). Measured in the Dashboard:
  word baseline = date baseline (501 = 501), icon middle = word middle (497 = 497). Released as {V}.
