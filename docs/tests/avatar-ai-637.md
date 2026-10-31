# avatar-ai-637

An avatar for an AI assistant (Claude, Gemini and others) shows that provider's known logo, cleanly sized and colored, while people's avatars keep their initials.

- File: `tests/avatar-ai-637.test.js`

## What it checks
- Files: each of the seven built-in logos (claude, anthropic, gemini, perplexity, meta, mistral, deepseek) has its four drawing files, each a single path, and a row in `platform/icons/custom/BRANDS.md` listing its source.
- On the page, for each provider (`Avatar ai="<provider>"`):
  - Its logo is drawn, using nothing but svg paths.
  - The avatar keeps its role (an image) and its label.
  - The logo fills about three quarters of the square (70% to 80%).
  - The logo is in the avatar's own text color.
- Each provider has its own mark.
- The order is the logo, then the picture, then the initials: a logo comes before a picture.
- `logo=` shows any other logo through the icon path.
- An unknown provider, and a person, keep their initials.
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface); owner, 2026-10-29: "use the known SVG logos, keep it simple", quoted in the file header.
- From the file header: before this change the Avatar had no `ai` or `logo` option.
- Added in commit cdc19c2c "#637 AI logos: Avatar ai="claude" and a logo slot; seven built-in provider marks through the icon path".

## How it checks
- Reads the logo files under `platform/icons/custom/` and `BRANDS.md` directly.
- Opens `tests/fixtures/platform-host.html` and draws avatars for each provider, one over a picture, one with a given logo, one unknown provider and one person, with the real Platform.
- Reads each avatar's logo, its drawing, its size against the square, its colors and its label.
- No baseline.

## What a failure means
- An AI assistant in a chat could show plain initials or a broken, oversized or wrongly colored logo, or two providers could look the same.
- A screen reader could lose the avatar's name.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. (Its header's Usage line names no runner; the wiring is in `tests/layout.test.js`.)
- In changed mode (`npm test` and CI), Layout starts it when the Avatar changes (or a part it is built on), or the icon set changes (icons are a global file, so any icon change reaches the small fixed slice).
- Layout also starts it when any other global file changes or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/avatar-ai-637.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The logo files in `platform/icons/custom/` and `BRANDS.md`.
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
