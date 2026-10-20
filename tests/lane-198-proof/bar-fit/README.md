# Shared barFit measurement fix (task 149)

Claude approved platform/utils/barFit.js in issue 149 on 2026-10-20 18:49 UTC, limiting the change to measurement dependencies/frequency with the same API and return values. Both consumers were found and tested: CommandBar and BulkActions. No CSS, token or consumer source changed.

The layout effect still observes committed text, which covers count/custom-slot changes outside a caller's key, but skips geometry reads when the element, observed width, key, min/max, row selector, step and text are unchanged. The resize observer follows ref identity. Releasing hold invalidates the reset dependency, so a width/key change while search was held can fit again. The geometry algorithm and returned step are unchanged.

Same local Chrome runner, matching design-system revision and built checkouts: before f795b8be54a30a730689eb24585b5a551962ae2f (old shared hook), after the approved narrow hook fix on lane 198. Twelve snapshots: CommandBar spec, BulkActions selection-toolbar spec, real DAM application with an actual selection, and a fixture containing both consumers; every case at 1440, 1024 and 600px. Each snapshot records visible commands, disabled state and the commands actually opened in More. base.json and head.json match exactly for every snapshot; diff.json is empty.

Across 20 unrelated parent renders with an input value changing, geometry reads drop from 180 to zero. The default regression asserts zero reads; BARFIT_BASE=1 is used only to collect the historical before result. The same test is wired into the existing DataGrid CI regressions. Reproduce: CHROME_PATH configured, BARFIT_PORT=<free port>, BARFIT_EVIDENCE=<JSON path>, node tests/bar-fit-149.test.js.

Build, SYSTEM_OK 1060, SPEC_OK 1171 leaves / 767 records, JavaScript syntax and the existing 600-row search regression pass. Generated files restored before commit. Prior exact-base attribution for aggregate CI remains in ../remaining-ci/ and ../typography/; no baseline or assertion is relaxed.
