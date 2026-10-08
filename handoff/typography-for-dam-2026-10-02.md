# Plenix typography: Platform state for Plenix DAM (2026-10-02)

Platform has adopted the DAM's typography tokens: same names, same values, for font size, weight, line height, letter spacing, `--symbol-size`, and the `--font-sans` / `--font-mono` stacks. Every font size, weight, line height and letter spacing in Platform now goes through a token; none is written directly.

## Two things Platform has that the DAM does not

| Token | Value | Why | Ask |
|---|---|---|---|
| `--font-size-18` | `18px` | 13 headings in Platform use it | Add to the DAM scale, or tell Platform which step to merge it into (15 or 20) |
| `--font-body` `--font-heading` `--font-label` `--font-code` `--font-data` | `var(--font-sans)` ×3, `var(--font-mono)` ×2 | Semantic roles from the agreed font-family spec: components use roles, not the foundation tokens | Add the same five roles to `tokens.css` |

## Deliberate differences that are not token conflicts

- **Body size:** Platform's body is 13px (`--font-size-13`); the DAM's is 14px. Platform's style guide forbids changing font sizes without explicit approval, so it stays until decided.
- **Fonts loaded:** Platform also loads DM Sans Light 300 and 300 italic (italic is used in 8 places). The DAM loads 400–700 only.

## How Platform mapped its old values

- Weights: 400/500/600/700 to the matching token; 800 (4 uses, not loaded) to `bold-700`.
- Line heights: ≤1.1 → `none`, 1.2–1.3 → `tight`, 1.35–1.4 → `snug`, 1.5 → `normal`, 1.6–1.9 → `relaxed`.
- Letter spacing (was px, mostly on 10–11px uppercase labels): −0.5/−0.4px → `tight`, −0.3px → `snug`, 0.3px → `wide`, 0.5px → `wider`, 0.6–0.7px → `caps`, 0.8–1.3px → `widest`, 0 → `normal`. The labels are now slightly tighter (about 0.1em became 0.08em).
