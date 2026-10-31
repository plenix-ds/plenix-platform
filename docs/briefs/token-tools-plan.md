# Token tools: Style Dictionary, Tokens Studio, Penpot

**Bottom line:** Plenix already keeps its tokens in the industry-standard JSON and builds the CSS from it. Style Dictionary would swap a tool we wrote for a popular one, so it gains little. Tokens Studio and Penpot only matter if the owner wants designers to edit tokens in a design app. Nothing needs to happen before the owner decides on Figma (#251) and the database (#264).

## What is already decided
- Tokens live in `platform/tokens/*.tokens.json` (W3C standard format). Our own script `build-tokens.js` writes the CSS in `platform/system/tokens/`. The owner chose this on purpose.
- #251 (owner, 2026-10-24): placeholders for now; first check whether FigCraft avoids Figma's limits.
- #264 (owner, 2026-10-24): review the proposed database layout first, then hosting and tool.

## Style Dictionary
- **Does:** reads the token JSON and writes CSS, iOS and Android files, replacing our own `build-tokens.js`.
- **Owner sees:** nothing. Pages look the same.
- **Touches:** `build-tokens.js`, `tokens.index.json` (the spec reads it), the `check-system` generated-file check. Our index adds extras (where each token is used) that Style Dictionary does not make, so we would keep that code anyway.
- **Cost:** free, runs in the build, no hosting.
- **Risk:** low to medium. A swap can change a token value by accident; we would prove the output is identical before switching. Gain is small because the build already works.

## Tokens Studio
- **Does:** lets designers edit our tokens inside Figma and syncs them to the JSON in GitHub.
- **Owner sees:** a token panel in Figma and pull requests from the design side.
- **Touches:** the token JSON (it reads and writes it), #251 (it only helps if Figma is used for real), #264 (two sources of truth would compete with a database).
- **Cost:** a Figma plugin; the sync feature is paid. Needs Figma, which has call limits on the Starter plan.
- **Risk:** medium. It could rewrite the JSON in its own shape and break the build or our comments in the files.

## Penpot
- **Does:** a free, open design app, an alternative to Figma, with token support built in.
- **Owner sees:** a new design tool in place of Figma.
- **Touches:** #251 (replaces the Figma placeholder and its 1,612 pending drawings), and possibly #264 (it needs its own database).
- **Cost:** free in the cloud, or self-hosted on the Plenix server (Docker, a database, upkeep).
- **Risk:** medium to high. It restarts the design work and drops what is already drawn in Figma. Its token support is newer.

## Recommendation and order
1. Do nothing yet on Style Dictionary. Revisit when native iOS and Android tokens are needed.
2. Finish the #251 check on FigCraft first.
3. Look at Tokens Studio only if Figma stays the design home.
4. Look at Penpot only if Figma's limits cannot be avoided.
5. Settle the #264 database layout before any of the three, so tokens have one source of truth.

## Questions for the owner (tap a card)
- **Is Figma staying as the design tool?** Yes / No, try Penpot / Decide after the FigCraft check.
- **Should designers edit tokens in a design app?** Yes / No, tokens stay in code.
- **Replace our token build with Style Dictionary?** Not now (recommended) / Yes, but only after the output is proven identical.
