# Plenix spacing: Platform state for Plenix DAM (2026-10-02)

Platform now uses the DAM's spacing naming (`--space-N`, N = size in px) for margin, padding, gap and offsets.

## One rule the DAM does not follow yet

Steps are **even numbers, plus 1px**. Odd values merge into the even step below:

| Merge | |
|---|---|
| `--space-3` | → `--space-2` |
| `--space-7` | → `--space-6` |
| `--space-9` | → `--space-8` |
| `--space-11` | → `--space-10` |

The DAM's `tokens.css` still has `--space-3`, `-7`, `-9` and `-11`; Platform does not define them.

## Platform's scale

`1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 50, 52, 60, 68`, the DAM's steps without the odd ones. Platform does not use 48, 50, 52, 60 or 68 yet.

## How Platform mapped values that were not on the scale

Padding, margin and gap snapped to the nearest step, ties down: 5→4, 13→12, 18→16, 22→20, 26→24, 30→28, 34→32, 38→36, 41/44→40, 56→52. Six positions that are part of a shape (the switch knob, two corner badges, a tooltip offset) stay as exact numbers.
