# Plenix's own icons

Icons Plenix draws itself, kept apart from the Material Symbols set (`../README.md`: that set stays unedited and unmixed).
Each has the same four files as a Material symbol (`<name>.svg`, `-fill`, `-24`, `-24-fill`) on the same grid
(`viewBox="0 -960 960 960"`), one color (the theme colors it through the icon mask). build-icons.js reads this folder
after the working set and before the library.

| Plenix name | File | Source | Decided |
|---|---|---|---|
| `person-male` | `person_male` | the owner's silhouette (ctm-admin/assets/ico-gender-male.svg), scaled and centered to Material's person glyph, its color removed | owner, 2026-10-19 |
| `person-female` | `person_female` | the owner's silhouette (ctm-admin/assets/ico-gender-female.svg), the same | owner, 2026-10-19 |
| `flip-vertical` | `flip_vertical` | Tabler Icons `flip-vertical` (MIT), restyled to the icon guidance (`platform/icons/inventory/`) | owner, 2026-10-24 |
| `git-branch` | `git_branch` | Lucide `git-branch` (ISC), restyled to the icon guidance | owner, 2026-10-24 |
| `git-merge` | `git_merge` | Lucide `git-merge` (ISC), restyled to the icon guidance | owner, 2026-10-24 |
| `git-pull-request` | `git_pull_request` | Lucide `git-pull-request` (ISC), restyled to the icon guidance | owner, 2026-10-24 |
| `file-jpg` | `file_jpg` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |
| `file-png` | `file_png` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |
| `file-svg` | `file_svg` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |
| `file-pdf` | `file_pdf` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |
| `file-psd` | `file_psd` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |
| `file-ai` | `file_ai` | Plenix's own lettered file icon, squared letters (tools/icons/draw-file-types.js) | owner, 2026-10-24 |

The AI provider logos (`ai-claude`, `ai-anthropic`, `ai-gemini`, `ai-perplexity`, `ai-meta`, `ai-mistral`, `ai-deepseek`; owner, 2026-10-29) are brands' own marks, not drawings of Plenix's: their sources and the providers left out are in `BRANDS.md`.

The person icons are filled drawings: their outline files carry the same shape. The others are icons from other libraries restyled by tools/icons/restyle-icon.js; their originals are in platform/icons/inventory/svg/.
