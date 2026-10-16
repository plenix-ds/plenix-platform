# Task #130: TypeScript types on the CDN (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/130 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

The npm package has `index.d.ts`, but no CDN version `/cdn/<v>/` has a `.d.ts`, and `plenix-<v>.tgz` has none either
(checked on 0.45.0). Every CDN version must carry `plenix.d.ts` beside `plenix.esm.js`: generated from the same source
as `packages/react/index.d.ts` (every public export of `platform/index.js`, no hand-written copy), listed with its hash
in `bundle-manifest.json`, included in the tgz, and named in the CDN docs page and the changelog.

### Files you own

- The step of the release build that writes `release/cdn/<v>/` (find it from `tools/agent/release.sh`)
- `packages/react/` type generation, if it must move to a shared script

Do not edit components or `deploy.sh`'s server steps.

### Done means

- A local release build writes `release/cdn/<v>/plenix.d.ts`, the manifest lists it, the tgz contains it.
- A check fails the build when an export of `platform/index.js` has no declaration.
- The quick gates pass (`node build-app.js`, `node check-system.js`, `node check-spec.js`).
- One pull request from `codex/130-cdn-types`, `Closes #130`.
