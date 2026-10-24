# Integration follow-ups (owner decision, 21 October)

The owner deferred both changes to integration. Neither should be applied in PR #219. The integrator will update the resolver when combining #215 and #219 and wire the two focused tests into the existing CI setup; no task-specific workflow should be added.

## Resolver proposal (not applied here)

In build-types-contracts.js, before `return contracts[name] || null`, add:

```js
if (name === 'MediaViewer') {
  const adjacent = path.join(platform, 'components/MediaViewer/MediaViewer.types.d.ts');
  if (fs.existsSync(adjacent)) return fs.readFileSync(adjacent, 'utf8');
}
```

This retains #215's current precise array contract on its own branch. Once #203 is integrated, it reads the component-owned union supporting either items or count/getItem, without merging or cherry-picking either lane.

Extend tests/type-contracts-202.test.js with a temporary adjacent MediaViewer.types.d.ts fixture and assert it takes precedence; assert the standalone array contract remains available when the file is absent.

Automatic approval review rejected applying this change because it modifies lane-202 files outside the current lane-203 scope. The owner has now assigned this follow-up to integration. Lane-203 source and tests can continue independently.

## Focused test coverage (deferred to existing CI)

At integration, add these tests to the existing CI setup. Do not create a separate lane-203 workflow. Use Node 22, npm ci and node build-app.js, then run tests/patterns-203.test.js. Install TypeScript 5.6.3 and @types/react in an isolated temporary directory and run tests/media-types-203.test.js with TYPECHECK_DEPS pointing there. Existing repository checks remain intact.

Automatic approval review rejected creating the new workflow because CI configuration is outside lane #203's explicit file list. Both focused tests run locally; no workflow file was created. The owner has assigned this wiring to integration.
