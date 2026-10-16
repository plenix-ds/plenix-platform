/* Fail-closed helper behavior without bundler assumptions. Real-package browser coverage is in dev-warn-packages.test.js. */
const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert');
if (!fs.existsSync(path.join(__dirname, '../platform/design-system/inventory.js'))) { console.log('DEV_WARN_HELPER_SKIP no design system'); process.exit(0); }
const code = fs.readFileSync(path.join(__dirname, '../platform/utils/devWarn.js'), 'utf8').replace("import React from 'react';", '').replace('export function devWarn', 'function devWarn');
function run({ dev, env, process: runtime } = {}) {
  const warnings = [], React = dev ? { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactDebugCurrentFrame: {} } } : {};
  const context = { React, console: { warn: message => warnings.push(message) } };
  if (env) context.process = { env: { NODE_ENV: env } }; else if (runtime !== undefined) context.process = runtime;
  vm.createContext(context); vm.runInContext(code, context);
  return { warnings, warn: (value, component = 'Fixture') => context.devWarn(component, { variant: value }, { variant: ['plain', 'card'] }) };
}
let checks = 0;
for (const setup of [{}, { env: 'development' }, { env: 'production', dev: true }, { dev: false, env: 'development' }]) {
  const fixture = run(setup); fixture.warn('unknown'); assert.deepStrictEqual(fixture.warnings, []); checks++;
}
const fixture = run({ dev: true });
for (const value of [undefined, null, 'plain', 'card']) fixture.warn(value);
assert.strictEqual(fixture.warnings.length, 0); checks++;
fixture.warn('unknown'); fixture.warn('unknown');
assert.strictEqual(fixture.warnings.length, 1); checks++;
assert.strictEqual(fixture.warnings[0], '[Plenix] Fixture: unknown variant "unknown". Valid values: plain, card.'); checks++;
fixture.warn('another'); fixture.warn('unknown', 'Other');
assert.strictEqual(fixture.warnings.length, 3); checks++;
console.log('DEV_WARN_HELPER_OK ' + checks + ' checks');
