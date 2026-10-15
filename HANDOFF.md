# Plenix: handoff to VM 101 (2026-10-15)

Read this first in the new Claude Code session, then the memory index (MEMORY.md). The owner's decisions are in the
memory folder; this file says where the work stands and how to run it on the VM.

## Where things stand

- Latest release: 0.31.65 (live, tagged).
- Just shipped:
  - 0.31.64: status and category pills (soft 100/300 + dark text, 4px corners), yellow and orange scales, warnings
    orange, away yellow, SegmentedControl look A. Spec: `docs/pills-and-colors.md`.
  - 0.31.65: the command bar standard: `platform/patterns/CommandBar/`, the find panels (Filter, Sort, Group, Columns,
    View, QuickFilter), the selection bar (BulkActions: actions, Select all, Clear, "N selected" at the end), the
    search rule (240px, collapses to an icon when narrow), the thin chevron caret, no view button on DataTable.
- The decision study: `docs/command-bar-study/` (open `index.html` through a local server; "Decided so far" lists
  every rule). Decision record: memory `plenix-command-bar-study.md`.

## Next, in order

1. Small release: unread counters (`Count variant="pill"`) become soft pills; `Tabs variant="segmented"` takes
   SegmentedControl look A (owner said ok, 2026-10-14).
2. Open question for the owner: at narrow widths the command bar hides its count; keep hidden or show?
3. Adoption: move the DAM toolbar (DataToolbar) and the other apps' list screens onto CommandBar; badges use the six
   variant names (not the info/warning/danger aliases).
4. Native designs for the new components (`tools/agent/native/`, check.js then merge.js).
5. Library waves 7–15 (`tools/agent/library/plan.json`, `plan.md`, lane brief `BRIEF-lane.md`), 3 lanes per wave.
   The owner is considering cloud writers (Agent isolation "remote") with decisions batched per wave.
6. Composition rules (handoff in memory: controls in one row share one height; the "what is this region" guide).
7. Smaller: last touch targets (coarse 18), RedSave issues (types, unknown-icon warnings, vendor bundle download).
8. Final: the full system-wide test run (`npm run test:full` / the manual full.yml workflow), only when all is done.

## Owner-side items (not code)

Package mirror (Verdaccio) deploy + DNS; SMTP account; Proxmox backups; Authentik approval for "Save in the design
system"; replacing the faulty i9-13900KS (it corrupted builds, uploads and git objects on the old PC).

## How to work on the VM

Layout on VM 101 (set up by `tools/agent/setup-vm.ps1`):

```
C:\Users\Administrator\Documents\
  Plenix\                         the repo; open Claude Code here
  Plenix - DAM\audit\batches\     the work log every release appends to (release.sh writes ../Plenix - DAM/...)
  Plenix-rel\                     clean worktree that deploys run from
C:\Users\Administrator\.claude\projects\C--Users-Administrator-Documents-Plenix\memory\   the memory
```

- Release (Git Bash): `bash tools/agent/release.sh "<subject>" tools/agent/cl.md tools/agent/log.md <paths>`. Write
  cl.md (changelog entry) and log.md (work log entry; `{V}` becomes the version) fresh per release. The script builds,
  commits the submodule and the given paths, pushes, deploys from Plenix-rel (8 tries) and tags. If it stops silently:
  push, then in Plenix-rel `git checkout --detach <sha>; git submodule update --init; bash deploy.sh`, then tag `vX`
  and push the tag.
- The old PC's git mirrors (alternates) existed only because of its faulty CPU; not used here.
- Tools in `tools/agent/`: `build-study.js` (compiles a docs study's samples.jsx), `library/` (wave plan + lane brief),
  `web/BRIEF-web.md` (house rules every writer reads), `native/` (native design fragments, check.js, merge.js).
- Deploy needs the SSH key for the Plenix VM (10.0.0.30); the owner installs it.
- Tests run in changed mode by default (`node tests/run.js`; `CHANGED_BASE=HEAD~1` for one commit). Full suite only at
  the very end.
- Rules that save time: at most 2 local writers, each in its own git worktree; small fixes ship alone; release per
  piece with build + targeted checks; the owner reviews live.
