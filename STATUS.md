# Plenix: what is done and what is left (2026-10-23)

Start here in a new session (Claude or Codex). TODO.md now only points here: new work is a GitHub issue. Then read `AGENTS.md` (Codex) or `CLAUDE.md` and the memory index
(Claude), and the issue for the task you take. Every remaining item below has a GitHub issue in
`plenix-ds/plenix-platform`; the tracking issue #252 lists them all.

## Where the code is

- Branch: `styling/phase-2` in both repositories (`plenix-ds/plenix-platform` and its submodule
  `platform/design-system` = `plenix-ds/plenix-design-system`). `main` is behind it. Work continues on this branch.
- Last release: 0.68.1 (2026-10-23). Not released yet on the branch: header style 2 and the spec's permanent merge.
- **No release unless the owner declares it.**

## Done

| Work | Where |
|---|---|
| Styling Standard written and enforced (Phase 0) | `platform/standards/styling.md`; check-system rule `ownership` (0.55.0) |
| App Header slice (Phase 1) | 0.55.x |
| No component styles another one (Phase 2) | 0.59.0; `check-system.exceptions.json` has 0 cross-component entries |
| Redundant declarations, order and element styles (Phase 3) | proof logged 2026-10-19 |
| Typography roles as tokens, text contracts per component (Phase 4; 22 parts left, #253) | 0.59.0; `platform/standards/text-contracts.json`, rule `text-contract` |
| Framing: containers nest two deep, never three (Phase 6) | `nesting.css` retired 2026-10-20; `tests/pages.test.js` fails a third frame |
| Legacy table removed, apps on DataGrid (Phase 7, first half) | #145 / #146 |
| Zero overlap for DataGrid, Table and the foundations | 0.59.0 |
| Header style 2: fact boxes carry their buttons, states among the facts, Title role on every header, buttons go icon-only when the facts would wrap | commits dec70d26, b888c727 |
| Spec: one page per component, the duplicate merge permanent, no redirects | spec 095bb26, parent 89cb85b3; `tools/agent/spec-merge-permanent.md` |

## Left to do

| # | Work | State |
|---|---|---|
| **#261** | **Priority 1.** Tags seem not to save: in Combobox with `multiple`, Enter on a suggested tag the person already has removes it (RedSave P-57) | not started |
| #207–#210 | Zero overlap for the rest: 137 stylesheets (Z1 charts and patterns 40, Z2 components A–L 39, Z3 M–Z and services 37, Z4 the design-system site 21) | 13 Z1 PRs (#222–#234) open, not merged |
| #249 | Phase 5: cascade layers, and remove `!important` (413 in `utilities.css`, 44 in `services/auth/brand.css`) | not started |
| #250 | Phase 7, rest: unused classes and duplicate utilities, with a check | not started |
| #152 | Phase 8: shrink the 2 MB stylesheet bundle | not started |
| #253 | Phase 4, rest: 22 parts still on the text-role backlog (`check-system.text-contract.json`) | not started; Brand lockup and DataPill wait for the owner |
| #254 | Unused component tokens: 119 `--plx-comp-*` tokens nothing reads, and a check | not started |
| #256 | Typography test fails on every run: Mono beside wrapped cells, stale baseline | not started (predates Phase 4) |
| #251 | Spec: the variant block on every variant page (1,612 pending; each needs its Figma design) | blocked by the Figma Starter plan's call limit |
| #45 | Complete library: recount the leaves with no record, classify, plan the remaining waves | not started |
| #144, #53, #54 | Figma: the Web component library; native designs for newer components; the 24 iOS drawings | blocked / open |
| #198–#203, #147–#195 | RedSave lanes and DataGrid findings (Codex) | PRs #206, #211, #212, #215, #219 open |
| #217 | Touch targets that are undersized | waits for the owner's decision |
| #255 | DataGrid: badges and icons in custom cells 0.5 to 1.1px below center | waits for the owner's decision (fix measured) |
| #257 | Spec wording: choose the rules (`docs/briefs/spec-wording/proposal.md`), then one cleanup after the styling work | waits for the owner's decision |
| #258 | Housekeeping: stale scratch copies and worktrees (remove `node_modules` junctions first) | not started |
| #263 | Bug: the color references no longer show in the spec | could not reproduce; the owner names the page |
| #264 | The design system as a PostgreSQL database (tables, links, mappings to other systems); children #265 Web/iOS/Android split, #266 a record per variation, #267 styling per variation (base, variations, themes apart) | needs the owner (schema review, hosting, tool choice) |
| #220 | Spec mappings: Django and Frappe as source systems | open |
| #262 | Library adoption: components onto the foundation hooks (moved from TODO.md) | not started |
| #244 | The page-header study into the CDN | waits for the owner |
| #52, #90–#98 | Last touch targets; owner infrastructure tasks (SMTP, backups, save service, mirrors, SSO, CPU, Figma themes, new login) | owner tasks |
| #58 | Final full system-wide test run | last, when everything else is done |
| #205, #218, #221 | Dark mode, Arabic UI, iOS/Android page template | later (owner: last) |

## How to work (the owner's rules)

- Prove only the pages you touch (`tests/clash-audit.js --check --pages …`, `tests/compare-styles.js`); dispatch the
  styling-proof CI with **full** commit hashes, log it in `tools/agent/proof-log.md`, and never wait for it.
- No exceptions to the Styling Standard; no `!important`; no inline styles; tokens only; no new colors.
- Pixel changes wait for the owner. Dark mode comes last.
- Other sessions edit the same folder: commit only your own files, and build generated files in a clean copy.
- Before finishing: `node build-app.js`, `node check-system.js`, `node check-spec.js`.
