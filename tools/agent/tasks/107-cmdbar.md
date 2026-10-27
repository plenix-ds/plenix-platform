No tests: see HANDOFF.md (the owner runs them)

# Task #107: Command bar fixes for RedSave (#68, #69, #70, #71) (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/107 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Start after

#101 is merged (both edit CommandBar.jsx). Check the plan of record (#3): when #101 shows as done, start.

### The task

RedSave (a Chrome extension built on Plenix) reported four command bar gaps (`Redsave-v1/docs/plenix-issues.md` #20, #21,
#23, #24; GitHub #68–#71). Each keeps today's behavior when the new option is not used.

| GitHub | Issue | The fix |
|---|---|---|
| #68 | Actions have no loading state | `actions[].loading`: the action's Button shows its existing `loading` state (spinner, disabled, `aria-busy`); folded into More, the item shows the same and cannot be chosen |
| #69 | Tooltips only on disabled actions (`why`) | `actions[].tooltip`: always shown on hover and focus (the existing Tooltip), whether the action has its label or is an icon |
| #70 | The bar is sticky by default, so a bar inside a card sticks to the page | `sticky` defaults to `"auto"`: sticky only when the bar is a direct child of the page content (PageContent / AppShell's main area); `true`/`false` still force it. Document it |
| #71 | Selection actions can only be buttons; "Add tag" or "Link to person" need a small form | `actions[].panel` (also on `selection.actions`): a function returning content shown in a Popover anchored to the action (useFloating), with focus moved into it and back on close; folded into More, the panel opens from the More item |

Do not change the Fluent overflow order (labels to icons, then search/count/status, then More, then quick filters) or
the selection swap.

### Files you own

- platform/patterns/CommandBar/CommandBar.jsx
- platform/patterns/CommandBar/BarActions.jsx
- platform/patterns/CommandBar/command-bar.css
- platform/utils/barFit.js (only if the panel needs measuring)
- platform/tokens/components/command-bar-panel.tokens.json (new, if the panel needs tokens)
- tests/keyboard.test.js (add cases), new tests under tests/
- lanes/cmdbar/design-system/parts/wCMB.records.js (new example cards added to the existing command-bar record through H.record; do not edit inventory.js or w07K)

Never edit generated files.

### Done means

- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK),
  `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- `node tests/keyboard.test.js` passes with new cases for the panel (focus in, Escape back to the action).
- No generated file in the branch (CI: GENERATED_OK). The browser tests run in CI on the pull request (if CI cannot
  start, say so in the pull request; the integrator checks it locally).
- One pull request from branch `codex/107-cmdbar`, `Closes #107`, listing what changed and how an app uses it,
  anything left undone, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `tools/agent/web/BRIEF-web.md` (house rules)
3. The header comments of the files you edit
