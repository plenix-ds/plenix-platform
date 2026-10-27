/* Plenix · the Stylelint plugin (style-plan-30, step 3): the Plenix stylesheet rules Stylelint can check one file at a
   time, so every style rule lives in exactly one place (owner, 2026-10-27). Loaded by .stylelintrc.json ("plugins").
   Rules that need other files (token declarations across the repository, the cascade-layer map, the backlogs) stay in
   the Plenix checks.

   plenix/token-tiers      every var(--name) in a stylesheet is a Plenix token (--plx-ref-, --plx-sys-, --plx-comp-, the
                           state variables --plx-state- and the token layers --plx-ctx-) or a custom property the same
                           stylesheet declares (a --plx- name is always a tier: declaring one does not admit it).
                           Options: allowedPattern, a name pattern also allowed, in the files matching allowedIn (the
                           design system's samples, --ds-sample-<property>, set by its script on the spec page).
                             .plx-x{color:var(--plx-sys-content-default)}                        ok
                             .ds-lab{--ds-r:var(--plx-sys-shape-xs);border-radius:var(--ds-r)}   ok (declared in this file)
                             .plx-x{color:var(--brand-blue)}                                     finding
                             .plx-x{--plx-x-gap:var(--plx-sys-space-xs);gap:var(--plx-x-gap)}    finding (not a tier)
   plenix/logical-properties   a component, pattern or template stylesheet says start and end, never left and right,
                           so the layout mirrors in a right-to-left page. The scanner is check-system.rules/logical-properties.js
                           (its header has the examples; the both-sides exception stays, owner style-edges-29 "Keep the
                           exception"); check-system no longer runs it. Option files: the stylesheets it reads (a path pattern).
*/
import { createRequire } from 'node:module';
import stylelint from 'stylelint';

const { createPlugin, utils: { report, ruleMessages, validateOptions } } = stylelint;
const isString = (v) => typeof v === 'string';
// the stylesheet's path from the repository root, with forward slashes ('' for code passed without a file)
const fileOf = (root) => ((root.source && root.source.input && root.source.input.file) || '').split('\\').join('/').replace(/^.*?\/(?=(platform|services)\/)/, '');

/* ── plenix/token-tiers ── */
const TIERS = 'plenix/token-tiers';
const tiersMessages = ruleMessages(TIERS, {
  rejected: (name) => `${name} is not a Plenix token (--plx-ref-, --plx-sys-, --plx-comp-, --plx-state-, --plx-ctx-) and this stylesheet does not declare it`,
});
const TIER = /^--plx-(ref|sys|comp|state|ctx)-/;
const tokenTiers = (primary, secondary) => (root, result) => {
  if (!validateOptions(result, TIERS, { actual: primary }, { actual: secondary, possible: { allowedPattern: [isString], allowedIn: [isString] }, optional: true })) return;
  if (primary !== true) return;
  const allowed = secondary && secondary.allowedPattern && (!secondary.allowedIn || new RegExp(secondary.allowedIn).test(fileOf(root)))
    ? new RegExp(secondary.allowedPattern) : null;
  const own = new Set();
  root.walkDecls((d) => { if (d.prop.startsWith('--') && !d.prop.startsWith('--plx-')) own.add(d.prop); });
  root.walkDecls((d) => {
    for (const m of d.value.matchAll(/var\(\s*(--[a-zA-Z][\w-]*)/g)) {
      const name = m[1];
      if (TIER.test(name) || own.has(name) || (allowed && allowed.test(name))) continue;
      report({ ruleName: TIERS, result, node: d, word: name, message: tiersMessages.rejected(name) });
    }
  });
};
tokenTiers.ruleName = TIERS;
tokenTiers.messages = tiersMessages;

/* ── plenix/logical-properties: the scanner of check-system.rules/logical-properties.js (one implementation, also
   published in @plenix-ds/lint) ── */
const SIDES = 'plenix/logical-properties';
const { scan } = createRequire(import.meta.url)('../../check-system.rules/logical-properties.js');
const sidesMessages = ruleMessages(SIDES, {
  rejected: (text) => `a physical side (use start and end: inline-start, inline-end, start-start …): ${text}`,
});
const logicalProperties = (primary, secondary) => (root, result) => {
  if (!validateOptions(result, SIDES, { actual: primary }, { actual: secondary, possible: { files: [isString] }, optional: true })) return;
  if (primary !== true) return;
  if (secondary && secondary.files && !new RegExp(secondary.files).test(fileOf(root))) return;
  const text = root.toString(), lines = text.split('\n');
  for (const finding of scan(text)) {
    const line = Math.max(1, Math.min(finding.line, lines.length)), at = lines.slice(0, line - 1).reduce((n, l) => n + l.length + 1, 0);
    report({ ruleName: SIDES, result, node: root, index: at, endIndex: at + lines[line - 1].length, message: sidesMessages.rejected(finding.text) });
  }
};
logicalProperties.ruleName = SIDES;
logicalProperties.messages = sidesMessages;

export default [createPlugin(TIERS, tokenTiers), createPlugin(SIDES, logicalProperties)];
