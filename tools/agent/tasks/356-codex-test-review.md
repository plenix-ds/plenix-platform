# Task #356: Outside review of the slimmed automatic test set (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/356 · Approved by the owner 2026-10-26 (decisions log: "Outside review: Codex does it ... so it gives an independent view").

This file is the whole brief. It works offline: everything Codex needs is in this repository, linked below. Read-only task: **change nothing**, answer in the format at the end.

## Why

The owner trimmed the tests on 2026-10-26 so that each thing is checked by one test only (PRs #348, #349, #350). Before more work builds on them, an independent reader checks the result. Codex knows only parts of Plenix in detail, so this brief states what is deliberate. Do not "fix" a deliberate rule; do report if a rule creates a gap.

## What to review

Review the **automatic** test set: the tests that run on every change (changed mode) and in the full suite. Find:

- **Gaps:** behavior or risk that no automatic test covers and should be covered.
- **Redundancy:** two tests (or a test and a check script) that still check the same thing.
- **Flakiness:** timing waits (`sleep`), order dependence, shared state, ports, network, machine-specific values (fonts, paths, Windows vs Linux), hard time limits, retries that hide failures.
- **What the slimmed set no longer catches:** things the removed tests, the removed checks inside kept tests, or the on-demand move used to catch. Use git history (`git log` and `git show` on PRs #348, #349, #350; the 52 deleted files are in git) to name each lost check and say whether the loss matters.
- **Wiring:** a test that exists but runs nowhere, or runs in one workflow but not another (see "Facts to verify" below).

## Where everything is

| What | Where |
|---|---|
| The runner and the list of automatic, on-demand and spec-only tests | `tests/run.js` |
| Which pages each test loads for a change (changed mode), `CHANGED_BASE`, `TEST_SCOPE`, `TEST_SHARD` | `tests/changed.js` |
| Shared browser helpers, the hard time limit | `tests/lib.js`, `tests/limit.js` |
| How the test site is found and its pages listed | `tests/site.js` |
| The tests (one file each; names in the catalog) | `tests/*.test.js` |
| The DataGrid regression files that `tests/data-grid.test.js` runs | `tests/data-grid-*.test.js`, `tests/cut-popover.test.js`, `tests/filter-by-field-269.test.js`, `tests/header-labels-start-326.test.js`, `tests/empty-table-a11y-313.test.js`, `tests/collection-facets.test.js`, `tests/multi-groups.test.js` |
| Saved baselines (known problems; they can only shrink) | `tests/baselines/` |
| Fixtures | `tests/fixtures/` |
| CI: every push and pull request (changed mode) | `.github/workflows/ci.yml` |
| CI: the full suite, by hand | `.github/workflows/full.yml` |
| CI: on-demand tests, by hand | `.github/workflows/on-demand.yml` |
| CI: styling proof, by hand | `.github/workflows/styling-proof.yml` |
| One-page catalog of each test: what it looks at, checks, and when it fails | [356-test-catalog.md](356-test-catalog.md) |
| Repo rules, status | `CLAUDE.md`, `AGENTS.md`, `STATUS.md` |
| The owner's test decisions, verbatim | [356-owner-test-rules.md](356-owner-test-rules.md) |

The tests themselves are not copied here. Read them in `tests/`.

**Not in this repository:** the St. John the Beloved test site, where the browser tests run. It is `github.com/LighthouseCollection/st-john-test-site` (public, on the owner's account since 2026-10-30), cloned beside this repository (`tests/site.js`, `SITE_DIR`). If it is not available offline, review the tests from their code and `tests/site.js`, and say in the answer which findings you could not check against the site.

## Out of scope

- **On-demand suites:** accessibility (`a11y`), high contrast, color contrast, themes, density. The owner runs them only by request. Do not report their absence from automatic runs as a gap. You may review their code if a finding in scope depends on it.
- **Tests on the design spec** (`platform/design-system`, the spec's component labs, `tests/labs.test.js`): tests never run on the spec (owner, 2026-10-25).
- **Dark mode, other densities, touch-target and tap-area checks:** removed or deferred by the owner on purpose.
- **Proof and one-off tooling** (`tests/*-proof/`, `tests/ci197-*`, `tests/*-compare.js`, `tests/phase2-*`, `tests/lane-*`, `tests/clash-audit.js`, `tests/compare-styles.js`): historical. Mention them only in the Wiring section if they look dead.
- **Product code quality, styling rules, design opinions, the release process, who merges.**
- **Changing anything.** No test, CI or source edits, no pull request. Findings only.

## The owner's test rules (deliberate; do not report as defects)

Verbatim records are in [356-owner-test-rules.md](356-owner-test-rules.md). Only these are owner decisions:

- Tests run on the St. John test site and the suite apps, never on the design spec (2026-10-25).
- Accessibility, color contrast, high contrast, themes and density run only when the owner asks (2026-10-25).
- No tap-area (touch target) tests (2026-10-25).
- Tests and checks run only right before a push, never on a commit or while editing (2026-10-26).
- During work and for releases only the checks for what changed run (changed mode); the full suite is a manual final gate (2026-10-13).
- Dark mode comes last.
- The reset plan (agreed "yes to all") includes fixing test conflicts and duplicates before the outside review (2026-10-26; the log's wording, not a quote).

## From the tests page / test code (Codex may question these)

These describe how the tests work today. They are not owner decisions. Challenge them if they look wrong.

- "Each thing is checked by one test only" is how the tests page describes the cleanup; the owner's wording is the line above about conflicts and duplicates.
- Known problems are recorded in a baseline that can only shrink; a worse page fails (`tests/baselines/`).
- Visual checks leave out measured widths so Windows and GitHub's Linux agree (`tests/visual.test.js`).
- Light mode at Standard density is the default for the automatic tests.
- Counts on the tests page (388 required parts; 35 keyboard, 34 navigation, 16 layout and 16 utilities checks; 98, 50, 28 and 5 known problems; 28 in 16 places; run times) are **unconfirmed**: they come from the page, not recounted from the code. Recount before relying on them.

## Facts to verify (found while writing this brief; unconfirmed)

Check each, then report in the normal format if it holds:

1. `tests/run.js` lists 20 automatic names. `ci.yml` runs 17 of them (its groups: `formats brand-rules login types`; `pages`; `typography`; `reflow`; `component-tokens`; `site-coverage visual layout`; `data-grid keyboard focus-order semantic-html utilities navigation one-primary`). `selector-kinds` and `zero-overlap` appear in no workflow. STATUS.md says zero-overlap is a local release check.
2. `full.yml` has no `one-primary`, `selector-kinds` or `zero-overlap`, though `ci.yml` runs `one-primary` per push.
3. The tests page the owner reads (read 2026-10-26) lists 18 cards and no "One primary" card; `selector-kinds` and `zero-overlap` are shown as one card (Style rules). Confirmed from the page itself; the page is not in this repository.
4. Files in `tests/` that `tests/run.js` does not run:
   - **Run by `build-packages`, not by `tests/run.js`** (confirmed): `w15c-packages.test.js` and `perf.test.js` (`build-packages.d/web-components.js`, lines 156-157, part of ci.yml's "Release build" step); `cdn-devx.test.js` (named in `build-packages.js`, line 57); `a11y-report.js` (in the ignore list of `tests/changed.js`, line 156).
   - **Unconfirmed** (no reference found by searching `tests/`, `.github/` and `package.json` only): `site-check.js`, `pixels.js`, `next-engine.js` and `next-source.js` (`data-grid.test.js` may use the last two under a `NEXT` flag; check), `data-grid-perf.test.js`, `data-grid-next-*.test.js`.
   Say which are dead, which are run by hand, and which hide a gap.
5. `typography` fails on the dashboard today (known: issue #256, 7 dates off the baseline). A test that is red on every run trains people to ignore red. Say how it affects the signal.
6. Changed mode maps a change to pages by import and class scans (`tests/changed.js`). Look for changes that map to no test (the "nothing relevant" branch prints OK with 0 checks).
7. `tests/data-grid.test.js` starts 17 regression files as child processes and loads others in-page. Check that a failure in a child fails the parent, and that a skipped child is visible.

## What good looks like

- Cite files and test names, not impressions. Quote the line or the check.
- Separate what you verified (read the code or ran it) from what you infer.
- Rank by risk to the owner: a bug that ships because no test caught it ranks above wasted CI minutes.
- If a finding needs the owner's decision (it touches a rule above), say so; do not recommend breaking a rule silently.
- Say plainly when a part is fine. Keep the answer under about 3 pages; the owner is not a developer, so the **Summary** must be plain words.

## Answer format (exact)

Reply in Markdown with exactly these sections, in this order.

```
# Codex review of the Plenix automatic tests (#356)

## Summary
<= 8 lines, plain words, no jargon. Outcome first: is the slimmed set safe to build on? The top 3 risks.

## Method
What you read, what you ran, what you could not check (for example: the test site was not available).

## Findings
One block per finding, ranked most serious first:

### F<n>. <short title>
- Type: gap | redundancy | flakiness | lost-coverage | wiring
- Severity: high | medium | low   (high = a defect can ship unnoticed)
- Confidence: verified | likely | guess
- Where: <file path>[, test name or check]
- Evidence: <what you saw; quote the line or the git commit>
- Effect: <what goes wrong, in one sentence>
- Fix: <the smallest change; name the file>
- Needs owner decision: yes | no   (yes if it touches a rule above)

## Facts to verify
For each of the 7 numbered facts: "holds", "does not hold" or "cannot tell", with one line of evidence. Findings that come from them also appear above.

## What the slimmed set no longer catches
A table: removed or moved check | where it went (PR / on-demand / nowhere) | does the loss matter (yes/no, why).

## Keep as is
Tests or rules you checked and found sound (short list).

## Questions for the owner
At most 5, each answerable yes/no or by choosing an option.
```

Do not add other sections. Do not paste whole files.
