/* Plenix · devWarn
   Summary: Warn once per invalid component discriminator during development.
   Usage: devWarn('Tabs', { variant }, { variant: ['contained', 'folder', 'segmented'] });
   Props: component: public name; values: supplied props; choices: valid values by prop.
   Behavior: Optional null/undefined values are ignored. Each complete message is warned once per module instance.
   Notes: Requires React 18's development runtime marker; unknown/production React defaults off. An explicit runtime
     NODE_ENV=production always disables warnings. Runtime env is read indirectly so package bundlers cannot replace it
     with their build mode. The existing react=dev loader selects development React; no new production opt-in exists.
     This is a runtime guard, not compile-time removal. Never changes rendering, props or CSS.
*/
import React from 'react';

const messages = new Set();
export function development() {   // also read by Icon's run-time fetch notice
  if (typeof process === 'object' && process) {
    const env = Reflect.get(process, 'env');
    if (env && Reflect.get(env, 'NODE_ENV') === 'production') return false;
  }
  const internal = React && React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  return !!(internal && internal.ReactDebugCurrentFrame);
}
export function devWarn(component, values, choices) {
  if (!development()) return;
  for (const prop of Object.keys(choices)) {
    const value = values[prop], valid = choices[prop];
    if (value == null || valid.includes(value)) continue;
    const message = '[Plenix] ' + component + ': unknown ' + prop + ' "' + String(value) + '". Valid values: ' + Array.from(new Set(valid.map(String))).join(', ') + '.';
    if (!messages.has(message)) { messages.add(message); console.warn(message); }
  }
}
