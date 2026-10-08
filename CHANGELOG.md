# Changelog

All notable changes to Plenix: the packages (`@plenix-ds/tokens`, `icons`, `styles`, `react`), the CDN and the API.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow `VERSIONING.md`.
The batch numbers point to the work log (Plenix - DAM/audit/batches/).

## [Unreleased]

## [0.2.0] - 2026-10-08

### Added
- TypeScript definitions for `@plenix-ds/react` (`index.d.ts`), generated from each component's header comment: prop
  unions (`variant`, `size`, `tone`…), booleans, handlers and React nodes, with the header text and defaults as docs.
- API: `/api/v1/components` items carry their written sections (`purpose`, `anatomy`, `behavior`, `a11y`, `content`)
  and `sec`, `plenix`, `src`. The tokens endpoint lists the new Button tokens (630 tokens).
- `VERSIONING.md` (what is public, what each version part means) and this changelog; release notes come from it.
- Checks on every push: build, system and spec checks, release build, the Button visual snapshot, every page, and an
  accessibility scan (axe-core) whose known issues may only go down.
- 115 Button component tokens (`--plx-comp-button-*`): per size, per variant and state, focus ring, shape and type. Every
  Button value is now a token; the design system's Edit dialog edits one token per field. (batch 207)
- Design system: purpose, anatomy, behavior, accessibility and content guidance for all 125 built items; template
  references (which apps use each item); related items for the foundations. (batch 208)

### Changed
- `button.css` uses only Button tokens; each size sets all of its own values. No visual change: 218,118 computed values
  compared, 0 differences. (batch 207)
- Design system: "Use in code" names the packages (`@plenix-ds/react`, `@plenix-ds/styles`). (batch 208)

## [0.1.0] - 2026-10-08

### Added
- The first release: `@plenix-ds/tokens` (515 tokens), `@plenix-ds/icons` (104 icons), `@plenix-ds/styles`
  (`plenix.css`, fonts, theme boot) and `@plenix-ds/react` (112 exports) on GitHub Packages.
- The CDN at https://design-system.lighthouseway.org/cdn/0.1.0/ and the JSON API at /api/v1/ (tokens, components,
  exports, taxonomy, guidance, icons). (batch 206)
