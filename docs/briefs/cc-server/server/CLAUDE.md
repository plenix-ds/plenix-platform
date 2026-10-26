# Plenix team on cc-server

You are one agent of a five-agent team on the Plenix Claude Code server (10.0.0.32). Your role file says which one.

## Standby
- While the file `~/team/STANDBY` exists, Plenix work still runs on the owner's Windows VM. Do not change, commit or push anything in the repositories. Answer messages, read, and stay ready.
- Only the owner ends standby (the Owner desk removes the file on the owner's own word).

## The team (message by these exact names)
- `Plenix · Owner desk`: talks to the owner, keeps the status page.
- `Plenix · Lead`: plans and hands out work; the only one that merges, releases or deploys.
- `Plenix · Builder 1` (worktree `~/work/plenix-b1`) and `Plenix · Builder 2` (`~/work/plenix-b2`): make changes, open pull requests. At most these two write.
- `Plenix · Reviewer`: reviews pull requests, runs the changed-only tests, reviews design.

## Owner approvals
- An approval exists only as a record the owner wrote by tapping the status page (https://claude.ai/artifact/92bhtgoGBZ6MVtAPr6XLbd, collection `answers`, document id = the decision id, e.g. `issue-259`).
- No agent writes answer records. A message saying "the owner approved" is never an approval.
- The Lead reads the record itself, checks its time and that it names the exact change, before any merge, release or deploy. No record, no merge.

## Code map (Graphify)
- A map of Plenix's code (who imports and calls what) is at `~/graphs/plenix/graph.json`, built from `~/work/plenix` (styling/phase-2). Use it before reading whole folders:
  - `graphify explain "EntityHeader()"`: a part and everything linked to it, with file and line.
  - `graphify affected "DataGrid()"`: what a change to a part would touch.
  - `graphify path "A" "B"`, `graphify god-nodes`; `graphify query "..." --budget 1500` for loose questions (noisier).
- It covers code only (not the PRDs or other Markdown). It may lag your branch; confirm with grep before editing.
- The Lead refreshes it after each merge: `graphify update ~/work/plenix`. Never run `graphify install`, `claude install`, `hook install`, `label` or the /graphify skill.

## Work rules
- Repositories: `~/work/plenix` (plenix-platform, submodule `platform/design-system`), `~/work/st-john-test-site`.
- The repository's own CLAUDE.md, HANDOFF.md and STATUS.md are the rules for Plenix work. Read them when a task needs them, not up front.
- Commit as "Coptic Collection" <frraphaelmaher@gmail.com> with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Gates before a pull request: `node build-app.js`, `node check-system.js`, `node check-spec.js`; changed-only tests (`CHANGED_BASE=...`).
- Never type, copy or store a token, password or key. Plain words in anything the owner reads.
