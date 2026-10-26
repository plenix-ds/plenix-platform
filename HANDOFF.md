# Plenix: handoff for a new session (2026-10-24)

Read this first, then [STATUS.md](STATUS.md) (what is done and left), then `CLAUDE.md` (Claude) or `AGENTS.md` (Codex).
Everything still to do is a GitHub issue in `plenix-ds/plenix-platform`; **issue #252 is the tracking list**. Nothing
is kept in TODO.md any more.

## What Plenix is

One design system and the suite of applications built on it, owned by one person (the "owner"; GitHub org
`plenix-ds`). Applications outside this repository (RedSave, CTM Council, others) load Plenix from its CDN.

| Part | Where | What |
|---|---|---|
| Platform | `platform/` | React components (`components/`), patterns (`patterns/`), hooks, providers; `plx-` CSS classes; tokens in three tiers (`--plx-ref-` values, `--plx-sys-` roles, `--plx-comp-` component settings) as W3C JSON in `platform/tokens/` |
| Design spec | `platform/design-system/` (a **submodule**, private repo `plenix-ds/plenix-design-system`) | The living spec: 688 records, 1,172 taxonomy leaves; `inventory.js` + `parts/*.records.js|docs.js|labs.js`; one page per component (the duplicate merge is permanent, no redirects) |
| Standards | `platform/standards/` | `styling.md` (the Styling Standard: ownership, zero overlap, text contracts, layers), `text-contracts.json`, themes, layout, native design |
| Apps | `dashboard/ projects/ messages/ contacts/ calendar/ tasks/ notes/ bookmarks/ files/ settings/ dam/` | The suite, each `main.jsx` → generated `app.js` |
| Checks | `check-system.js` (+ `check-system.rules/`), `check-spec.js`, `tests/` | The gates |
| Agent tools | `tools/agent/` | Work notes, proof log (`proof-log.md`), release script (`release.sh`), the spec-merge record |

## Where things stand

- **Branch**: `styling/phase-2` in both repositories; everything is committed and pushed (2026-10-24). `main` is behind.
- **Last release: 0.69.4** (tag `v0.69.4`, live at `https://design-system.lighthouseway.org/cdn/0.69.4/`).
  - 0.69.3 shipped EntityHeader's Streamlined header style (`headerStyle="streamlined"`).
  - 0.69.2 shipped the five Structured layouts (`layout`), the tag picker fix and the icon fix.
- **Hosting**: VM 130 "Plenix" (10.0.0.30) behind Nginx Proxy Manager; `plenix.lighthouseway.org` (apps), `design-system.lighthouseway.org` (spec, CDN `/cdn/<version>/`, API `/api/v1/`, behind Authentik except `/cdn/`).
- **Unfinished work saved on a branch**: `wip/data-grid-lines-as-borders` (an unverified DataGrid change found on disk): #290.

## The owner's rules (non-negotiable)

- **No release unless the owner says so.** When they do, see "Releasing" below.
- **Ask before fixing** something the owner reports: explain the cause and the options; fix after they choose.
- **Pixel changes wait for the owner's look** (screenshots of the real component; review pages in `docs/briefs/`).
- Styling Standard (`platform/standards/styling.md`): no `!important`, no inline styles (not even a style attribute),
  tokens only, no new colors (existing palette), flat selectors (a parent never styles a child; context values and
  state variables instead), every text part declares a text contract, no exceptions.
- **Dark mode last** (#205). American English. Statuses are badges with an icon, never a dot. No action links.
- Write documentation as definitive rules, plain words, bullets for two sentences or more.
- **Other sessions share this folder.** Commit only your own files; build generated files in a clean copy; never `git add -A`.
- Proofs: prove only the pages you touch (`tests/clash-audit.js --check --pages …`, `tests/compare-styles.js`), log
  them in `tools/agent/proof-log.md`, never wait on them; the full suite (#58) only at the very end.
- Commits: author "Coptic Collection" <frraphaelmaher@gmail.com>, trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. The global git identity is set to this author (owner, 2026-10-24).

## How to work

- **On-demand tests (owner only, 2026-10-25).**
  - Accessibility, high contrast, color contrast, themes and density run only when the owner asks for them.
  - They are not in `npm test`, `npm run test:full`, the per-push CI or the full suite.
  - On this computer: `npm run test:on-demand` checks what changed; `npm run test:on-demand:full` checks every page (accessibility alone takes about two hours).
  - On GitHub: Actions › On-demand tests › Run workflow, then pick "full" or "changed".
  - One test by name: `node tests/run.js a11y` (or `high-contrast`, `contrast`, `theme`, `density`).
- **The test site (owner, 2026-10-25).** Every automatic browser test runs on the St. John the Beloved Coptic Orthodox
  Church test site and the suite apps, never on the design spec.
  - The site is its own web app and repository: github.com/plenix-ds/st-john-test-site (Node 22 + PostgreSQL 16, Plenix from the CDN), live at https://stjohn.lighthouseway.org behind Authentik.
  - Clone it beside this repository (`../st-john-test-site`, or set `SITE_DIR`). The tests start it on their own server at `/Plenix/test-site/` with a fresh database (PGlite on a computer, the job's PostgreSQL in CI) and point it at this checkout's CDN files at `/cdn/local/`: run `node build-app.js` and `node build-packages.js` first.
  - It is a church database and membership app with made-up data (no sacrament records; "servants", never "volunteers"). Its routes are its `site/pages.js`; tests read them through `tests/site.js`.
  - CI reads the site's repository with the `DS_TOKEN` secret (owner, 2026-10-26: reuse it; it also reads the spec).
  - A new Platform part must be placed on the site: `node tests/site-coverage.test.js` (SITE_COVERAGE_OK) and `node tests/site-check.js` (the site's rules).
  - The spec's component labs are spec-only (`node tests/run.js labs`); `tests/component-tokens.test.js` checks the tokens on the site's real components.
- **No target-size test.** The owner removed it ("Remove tap areas from all tests", 2026-10-25).
- Gates before finishing any change: `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK).
  After a spec change, `node build-spec-parts.js` (build-app runs it).
- Generated files (never edit by hand): `platform/dist/platform.js`, `<app>/app.js`, `platform/system/steps.css`,
  `platform/system/tokens/*.css`, `platform/tokens/tokens.index.json`, `platform/components/Icon/icon.css`,
  `platform/design-system/spec-parts.js`, `reviewed.js`, `usage.js`.
- Clean copy for builds and proofs: a detached `git worktree` (for example `../Plenix-b0`) with `node_modules` linked
  as a junction; copy in only your changed files; for build-app, write `platform/design-system/.git` as
  `gitdir: C:/Users/Administrator/Documents/Plenix/.git/modules/platform/design-system` and remove it after.
- Local server for the spec and apps: `http://localhost:8767/Plenix/…` (the `plenix-static` preview), or `tests/lib.js` `serve()` in scripts.
- Shell quoting: `node -e` and heredocs eat backslashes and quotes; write scripts to files (the Write tool) and run them.

## Releasing (only when the owner says so)

1. Move the "Unreleased" entries of `CHANGELOG.md` into a file (the release script inserts that file as the new
   version's entry; leaving them under Unreleased duplicates them).
2. Export the git identity, then:
   `bash tools/agent/release.sh "<subject>" <changelog-entry.md> <work-log-entry.md> platform/dist platform/system platform/tokens/tokens.index.json platform/components/Icon/icon.css platform/exports`
   (the work log is `../Plenix - DAM/audit/batches/15-26.md`; the entry may use `{V}` for the version; take the next batch number).
3. **The script's deploy step runs `check-system` on the folder named `Plenix` beside the deploy copy, which is the
   working folder.** If it stops ("check-system failed" with an OK check in the clean copy), deploy from a temporary
   folder named `Plenix`: `git worktree add --detach <tmp>/Plenix <release commit>`, `git submodule update --init`,
   a `node_modules` junction, `<tmp>/Plenix - DAM/audit/batches/15-26.md` beside it, then `bash deploy.sh` there,
   then `git tag v<version> && git push origin v<version>`. Remove the junction before removing the worktree.
4. Verify: `curl https://design-system.lighthouseway.org/cdn/<version>/plenix.js | grep <something new>`; close the issues with the version.

## Where to start

Issue #252 lists everything. The current front of the work:
- **Header study** #244: both styles are shipped; left are the 30 capability headers (spec and apps).
- **Styling Standard**: zero overlap for 137 stylesheets (#207–#210, open Codex PRs #222–#234), Phase 5 cascade layers
  and no `!important` (#249), Phase 7 unused classes (#250), Phase 8 bundle size (#152), Phase 4 rest (#253).
- **Icons architecture** epic #277 (#278–#286).
- **The design system as a database** #264 (+ #265 Web/iOS/Android split, #266 a record per variation, #267 styling per variation): needs the owner's schema review.
- **Apps connected to the CDN both ways** #273: needs the owner's choice of channel.
- **Owner decisions waiting**: #217 touch targets, #257 spec wording, #259 black, #260 Mono numbers, #263 the color references bug (page to confirm).
- RedSave and DataGrid findings (P-xx, DT-xx issues), the variant block #251 (Figma limit), the complete library #45.

## Housekeeping you will meet

- Many old worktrees under `.claude/worktrees/` and `../Plenix-*` copies (#258: remove the `node_modules` junctions first).
- `memory/` in the repo root is a stray worktree folder, not project content; do not commit it.
- The older handoff (2026-10-15) is in git history (`git log -p HANDOFF.md`).
