## What and why

<!-- The issue this answers (Closes #…), the owner's request or the proposal, and what changed. -->

## Files

<!-- Every file created or changed. Design-system files under lanes/<task>/design-system/. -->

## Checks (AGENTS.md)

- [ ] `node tools/agent/lane-overlay.js`, `node build-app.js` and `node build-usage.js` succeed (exit code checked)
- [ ] `node check-system.js` → SYSTEM_OK, `node check-style.js` → STYLE_OK, `npm run lint:css` (Stylelint) with no errors, and `node check-spec.js` → SPEC_OK
- [ ] No generated file committed (`node tools/agent/generated.js --restore` before each commit)
- [ ] No test was run by the author: tests run only when the owner starts them (HANDOFF.md, "No tests")
- [ ] Meant to look different: listed below with a picture (the owner updates the visual baseline himself)
- [ ] Design system page complete (no "Not written yet" on a built item)

## Left undone

<!-- With the reason. -->

## Needs the owner

<!-- Every visible choice made from existing roles that the owner has not approved. -->
