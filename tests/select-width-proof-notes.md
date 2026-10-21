# Shared Select width correction

Owner request: fix the shared CDN component first, after the platform picker showed a 90px bordered field inside a 196px wrapper, with its arrow outside the field.

Change: native control receives the existing `plx-input--width-fill` class in Input.jsx. Wrapper width remains natural, fixed, fill or block as requested. Existing CSS already excludes this class from its default width assignment, so no stylesheet/token/design-system overrides were added.

Validation: Node22 build-app/build-packages including package performance budgets pass. SYSTEM_OK1069, SPEC_OK1172/691. Built CDN consumer test passes 66 viewport/direction/variant cases (360/766/1440, LTR/RTL, natural/fill/xs/sm/md/lg/block/small/disabled/invalid/long label). Field edges match wrapper, arrow fits vertically and its reserved text padding, native option changes work. Actual preview corrected from control90/wrapper196 to control196/wrapper196. Local generated package outputs are for verification only and must be restored before any commit.

Additional test: redsave118-cdn.test.js stops at its assertion requiring the removed Tabulator DataGrid engine in the archive. This assertion does not inspect Select; no package baseline or test assertion was changed.

Pending: tracking issue/PR and Claude integration/publishing. Automatic approval review rejected `gh issue create`: persistent external issue creation was not explicitly authorized and standing instructions prohibit messages to others. No issue was created; no retry or workaround attempted. Local code and tests are ready for review. Source branch codex/fix-select-control-width, isolated Tools/workspaces/select-width-fix from f32c9e3c/DS99131a3. ProductCard uncommitted work remains separately preserved.
