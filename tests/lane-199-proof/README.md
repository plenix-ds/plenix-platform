# Lane 199 proof

Base: e711db8309cb8d34e2264e58826a0c13b9a97cfc; design system: 87751698ff3b1c5ac5afa246e535dc5179b8ab00.
Windows portable Node 22.23.3 and the same local Chrome, light only.

`node tests/command-fit-199.test.js` bundles the unchanged base barFit.js into the current consumer fixture, isolating the fitting algorithm from the separately approved additive-selection change. Both consumers show identical fitted commands at 1440/1024/600/360; all 12 commands remain available, including More. A count badge is included. Across 20 unrelated parent commits, geometry reads fall from 200 to zero. Raw snapshots: fit.json. The new hook reads controls once and computes candidate steps in memory, rather than committing each step.

`node tests/command-selection-199.test.js`: 6 checks pass for default add, selection-first ordering and separator, retained search, command selection policies, explicit swap and deselection. Existing command-action regression suite passes 42 checks (busy, forms, disabled states, keyboard/focus, measured selection overflow). Existing fold regression passes (Posts at 360px, quick filters, required radios and end submenu). Application command-bar regressions pass 15 checks.

Build, build-usage, SYSTEM_OK (1058 files), SPEC_OK (1171 leaves / 767 records) and JavaScript syntax checks pass. No CSS or tokens changed.

The two static component labs fail existing token-marker assertions: bulk-actions-list-gap (37px marker reads 4px), command-bar-side-gap (37px reads 12px) and command-bar-group-gap (37px reads 4px). Rebuilt detached exact base on the same runner and DS revision, then ran `LABS_ONLY=command-bar,bulk-action-bar node tests/labs.test.js` on each. Outputs are identical after removing the scope banner; raw base/head logs are retained. These lab templates do not exercise the React fitting hook. No baseline or assertion was relaxed.
