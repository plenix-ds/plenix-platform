## Batch 379 (2026-10-15): Claude + Codex pilot
- Owner agreed: quick gates per change, browser tests once per batch and at the end; then the pilot: GitHub issues per
  task, labels agent:codex / agent:claude, AGENTS.md, generated files never in a branch (generated.js check in CI,
  rebuilt at merge by take-pr.js), design-system files via lanes/<task>/design-system (lane-overlay.js, CI step).
- Codex takes wave 10 lane C (issue opened after this release; GroupBy skipped: w07K answers Grouping). Lanes A and B
  (Claude) merge next.
- Checks: SYSTEM_OK; generated.js --check proven on the last release commit; the overlay copied and cleaned a test file.
  Released as {V}.
