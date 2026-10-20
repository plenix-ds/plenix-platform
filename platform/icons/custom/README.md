# Plenix's own icons

Icons Plenix draws itself, kept apart from the Material Symbols set (`../README.md`: that set stays unedited and unmixed).
Each has the same four files as a Material symbol (`<name>.svg`, `-fill`, `-24`, `-24-fill`) on the same grid
(`viewBox="0 -960 960 960"`), one color (the theme colors it through the icon mask). build-icons.js reads this folder
after the working set and before the library.

| Plenix name | File | Source | Decided |
|---|---|---|---|
| `person-male` | `person_male` | the owner's silhouette (ctm-admin/assets/ico-gender-male.svg), scaled and centered to Material's person glyph, its color removed | owner, 2026-10-19 |
| `person-female` | `person_female` | the owner's silhouette (ctm-admin/assets/ico-gender-female.svg), the same | owner, 2026-10-19 |

Both are filled drawings: the outline files carry the same shape.
