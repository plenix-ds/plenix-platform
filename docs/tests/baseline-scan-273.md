# baseline-scan-273

The tool that lists what an application must change to follow the newest Plenix finds every problem, and never touches the application it reads.

- File: `tests/baseline-scan-273.test.js`

## What it checks
- The baseline scan (`tools/baseline/scan.js`) reads the pretend app's Plenix version (0.73.0) and lists only change notes newer than it.
- It finds the removed DataGrid option `uniformPillWidths` and the retired `icons-all.css`, but not notes that only add something (`plenix.js`, `plenix-engines.js`).
- It finds the bare icon class, the `icons-all.css` link, the unknown token `--plx-sys-color-primary`, the written style (`style={{ fontSize: 14 }}`), the app's own stylesheet, its raw color `#253442`, and its patch over a Plenix part (`.plx-fieldset__legend`).
- It skips the copy of Plenix inside the app (`vendor-copy/plenix.js`).
- It writes a plain-words page that starts "# fixture: N things to change before it follows the newest Plenix".
- It never changes or adds a file in the app, and writes its report only into the `--out` folder (`baseline-fixture.json` and `baseline-fixture.md`).
- It refuses (exit code 2, nothing written) without `--out` or `--json`, with `--out` inside the app folder, and with `--out` set to the app folder itself.

## Why it exists
- Issue #273, "Connect the internal applications to the CDN and the spec, both ways: apps file issues and send fixes; releases reach every app at once".
- Added in commit ae164f53 "#273 PR 1: the per-app baseline scan (read-only)".
- The file header notes that on ae164f53, before the QA fix, the two refusal checks failed because the report then went to the current folder.

## How it checks
- Runs the scan in Node on the pretend application `tests/fixtures/baseline-app/` (it loads Plenix 0.73.0 and breaks each rule once). No browser.
- Records every file's bytes before, runs the scan command into a temporary folder, and compares the bytes after.
- Runs the command with bad options and reads the exit code and the message.

## What a failure means
- An app owner gets an incomplete or wrong list of what to change before upgrading Plenix.
- Worse, the scan could change or add files inside the application it was only meant to read.

## When it runs
- AUTOMATIC in `tests/run.js` since issue #756 (before, it was started by hand only), so `npm test` and `npm run test:full` run it. It has no changed mode: it runs all its checks every time.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests without a browser", on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the same step of its build job.
- By hand: `node tests/baseline-scan-273.test.js`.

## What it needs
- Node only (no browser, no server).
- The fixture `tests/fixtures/baseline-app/` and the tool `tools/baseline/scan.js`.
