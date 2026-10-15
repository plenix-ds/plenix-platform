### Added
- The Claude + Codex pilot (owner, 2026-10-15): several coding agents each own one task, coordinated through GitHub
  (one issue, one branch, one pull request). AGENTS.md holds the rules every agent reads; the issue form "Agent task"
  and the labels agent:codex, agent:claude, agent-task and needs-owner assign the work.
- tools/agent/generated.js: the one list of generated files. CI fails a pull request that commits one (they are rebuilt
  at merge, so parallel pull requests never conflict on them).
- tools/agent/lane-overlay.js: a branch keeps its design-system files under lanes/<task>/design-system/; the overlay
  copies them into the design system for the build, the checks and CI.
- tools/agent/take-pr.js: the integrator's merge of a pull request (source files only, design-system files into the
  design system's repository, files changed in main reported).
### Changed
- The pull request template asks for the files, the checks, what was left undone and what needs the owner.
- The test runner's changed mode counts a lane's design-system files where the overlay copies them.
