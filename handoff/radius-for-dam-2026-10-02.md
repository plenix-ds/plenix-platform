# Plenix radius: Platform state for Plenix DAM (2026-10-02)

Platform now uses the DAM's radius naming (`--radius-Npx`) for every corner radius. Circles use `50%`.

## One token Platform has that the DAM does not

| Token | Value | Why | Ask |
|---|---|---|---|
| `--radius-6px` | `6px` | Platform's card and panel radius (about 120 uses after merging 5px into it) | Add to `tokens.css` |

## How Platform merged its old radii

3→4, 5→6, 7→8, 9→8, 11→12, 20→12, and (Platform's call) 2→4 and 10→12. `0 3px 3px 0` became `0 var(--radius-4px) var(--radius-4px) 0`; `0 0 6px 6px` became `0 0 var(--radius-6px) var(--radius-6px)`.
