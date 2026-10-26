# The owner's test decisions (for the #356 review)

Source: the owner decisions log (`owner-decisions-log.md`, kept by the Owner desk), test decisions only. Quotes are the owner's words. Dates are 2026.

| Date | Decision |
|---|---|
| 10-25 | Tap-area tests: "Remove tap areas from all tests." |
| 10-25 | Touch targets (#52): not a desktop failure; touch sizes apply only to mobile layouts, by that platform's standard. |
| 10-25 | On-demand tests: accessibility, high contrast, color contrast, themes and density come out of automatic runs and the release gate; they run only when the owner asks. ("Reserve only for as on demand test by owner and take out from the tests.") |
| 10-25 | Test site: tests move off the design spec to a test site, "St. John the Beloved Coptic Orthodox Church" (church database and membership) that uses every page, control and component; the spec becomes a CDN consumer. No sacrament records; "Volunteers" is called "Servants". |
| 10-25 | "make the test site", "make the design spec a consumer of the cdn". |
| 10-25 | Real site: "the test site should be an actual website.. postgre etc... on the server"; "test site should not be in the design spec". |
| 10-25 | Pause: "One cleanup pass on styling/phase-2: get every check green, run the full test suite, and do a visual sweep ... Show me what you find before fixing, then release a clean version." |
| 10-26 | Reset plan: clean up scratch copies, worktrees and about 70 unused tests; "Fix test conflicts and duplicates before the outside review." |
| 10-26 | Outside review: Codex does it ("codex doesnt know this in detail.. just parts it knows"), so it gives an independent view. |
| 10-26 | Fast lane: "show me" first (live preview and a picture, no build); tests and checks only right before a commit or push. |
| 10-26 | Tests timing: "Tests and checks ONLY on a push, never on commits or while editing." |
| 10-26 | Standing rule from the repo: during work and for releases only the checks for what changed run; the full suite runs only as the manual final gate (owner, 2026-10-13). |
| 10-26 | A release needs one green full suite run on the release commit, plus zero-overlap locally (STATUS.md). |

Defaults the tests assume (from the tests page, 2026-10-26): light mode, Standard density. Dark mode comes last (owner).

Related, not test rules: gray 250 only (no new colors), tokens only, no inline styles, corners 2 to 6px.
