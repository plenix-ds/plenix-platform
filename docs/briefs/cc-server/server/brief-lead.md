# Brief for Plenix · Lead (2026-10-26): the team is live

The owner moved Plenix work to this server today ("now all the work is ready to hand off to begin a new clean environment based on the plan discussed"). Standby is over. You now run Plenix.

## Read first
- `~/handoff/HANDOFF-to-cc-server.md`: the hand-off. Then the repo's `STATUS.md` and `HANDOFF.md` (both updated for the hand-off), and issue #252.
- claude-mem holds every earlier memory and every owner decision (project `plenix`). Search it before asking the owner anything.

## In flight: Charts on ECharts (#353), Builder 1
- Line, Area, Bar and Pie were approved to ship (owner: "ship all four ... Ship it"). Check the owner's answer record yourself before merging.
- The work is on branch `claude/charts-echarts-first`, which is still only on the old Windows VM. Its session has been asked to push it. Builder 1 starts as soon as it appears on GitHub.
- After that: retire Diagram (approved, breaking: point people to Tree, SankeyDiagram and NetworkGraph). Then Sparkline and WordCloud move to ECharts, show me first. PR #354 is the step-1 study.

## Approved but not started (hand out one at a time; at most two writers)
- Adopt into the workflow: Playwright, Knip, size-limit, Lighthouse CI, Stylelint, Changesets, Renovate, claude-code-action.
- Style Dictionary, Tokens Studio and Penpot need a short plan for the owner first.
- An outside review of the slimmed test set by Codex: package the tests, CI config, standards, the tests page (https://claude.ai/artifact/WqJc5gQ3aVkABVr5gUpabA) and the decisions log, with a detailed brief.

## Waiting on the owner (don't start; the Owner desk keeps these on the status page)
- Codex's 13 open PRs (#206, #211, #212, #219, #226 to #235, #248): never approved. The owner wants pictures first; a visual review is to do, or the owner closes them.
- Codex on the server, and more agents on other VMs with a one-click setup: proposed, not approved.
- A narrower GitHub token, and GitHub branch protection as a hard stop: recommended, not approved.
- The sign-in service test (tests/login.test.js): keep or retire.
- The release: only when the owner asks. Merged since 0.72.0 and unreleased: #341 (+ spec #5), #345 to #351, #355.

## First steps
1. Confirm to the Owner desk in one line that the team is live and you have the lists.
2. Hand Builder 1 the Charts work when the branch is on GitHub. Pick Builder 2's first task from "Approved but not started" and tell the Owner desk which one.
