// Plenix · installable adapters for the same source scanners used by check-system.
const fs = require('fs'), path = require('path');
function core() {
  const scanners = Object.fromEntries(['inline-style', 'links-not-buttons', 'semantic-html', 'logical-properties', 'table-geometry', 'settings-cards', 'use-of-color'].map((name) => [name, require('./check-system.rules/' + name + '.js')]));
  const copy = require('./check-copy.js');
  function scan(rule, source, file = 'source.jsx') {
    if (rule === 'copy') return copy.scanSource(source, file);
    if (!scanners[rule]) throw new Error('Unknown Plenix lint rule: ' + rule);
    return scanners[rule].scan(source, rule === 'inline-style' ? { html: /\.html?$/.test(file) } : file).map((finding) => ({ ...finding, rule, message: finding.message || finding.text }));
  }
  return { scan, lintText: copy.lintText, sourceRules: scanners };
}
function eslint() {
  const core = require('./index.cjs');
  const names = ['inline-style', 'links-not-buttons', 'semantic-html', 'table-geometry', 'settings-cards', 'use-of-color', 'copy'];
  const plugin = { meta: { name: '@plenix-ds/lint', version: VERSION }, rules: {}, configs: {} };
  for (const name of names) plugin.rules[name] = {
    meta: { type: 'problem', docs: { description: 'Plenix ' + name + ' source rule' }, schema: [], messages: { finding: '{{message}}' } },
    create(context) {
      return { 'Program:exit'() {
        const source = context.sourceCode || context.getSourceCode(), text = source.getText(), lines = text.split('\n');
        for (const finding of core.scan(name, text, context.filename || context.getFilename())) {
          const line = Math.max(1, Math.min(finding.line || 1, lines.length));
          context.report({ loc: { line, column: 0 }, messageId: 'finding', data: { message: finding.message || finding.text || name } });
        }
      } };
    },
  };
  const rules = Object.fromEntries(names.filter((name) => name !== 'settings-cards').map((name) => ['plenix/' + name, name === 'copy' ? 'warn' : 'error']));
  plugin.configs.recommended = { name: 'plenix/recommended', plugins: { plenix: plugin }, rules };
  return plugin;
}
function stylelint() {
  const stylelint = require('stylelint'), core = require('./index.cjs');
  return ['logical-properties'].map((name) => {
    const ruleName = 'plenix/' + name;
    const rule = (enabled) => (root, result) => {
      if (!stylelint.utils.validateOptions(result, ruleName, { actual: enabled, possible: [true, false] }) || !enabled) return;
      const text = root.toString(), lines = text.split('\n');
      for (const finding of core.scan(name, text, root.source && root.source.input.file || 'source.css')) {
        const index = lines.slice(0, Math.max(0, (finding.line || 1) - 1)).reduce((n, line) => n + line.length + 1, 0);
        stylelint.utils.report({ ruleName, result, node: root, index, endIndex: Math.min(text.length, index + (lines[(finding.line || 1) - 1] || '').length), message: finding.message || finding.text });
      }
    };
    rule.ruleName = ruleName; rule.messages = { rejected: 'Follow Plenix ' + name + ' rules.' };
    rule.meta = { url: 'https://design-system.lighthouseway.org/' };
    return stylelint.createPlugin(ruleName, rule);
  });
}
module.exports = function buildLint(ctx) {
  const { ROOT, PKG, VERSION, SCOPE, SITE, REPO, write, json, copy, copyDir } = ctx;
  const out = path.join(PKG, 'lint');
  copyDir(path.join(ROOT, 'check-system.rules'), path.join(out, 'check-system.rules'));
  copy(path.join(ROOT, 'check-copy.js'), path.join(out, 'check-copy.js'));
  copyDir(path.join(ROOT, 'platform', 'standards', 'content'), path.join(out, 'platform', 'standards', 'content'));
  // Keep the original rule's on-disk check API and its icon catalogue available for custom tooling.
  copy(path.join(ROOT, 'platform', 'icons', 'map.json'), path.join(out, 'platform', 'icons', 'map.json'));
  write(path.join(out, 'index.cjs'), 'module.exports = (' + core.toString() + ')();\n');
  write(path.join(out, 'eslint.cjs'), 'const VERSION = ' + JSON.stringify(VERSION) + ';\nmodule.exports = (' + eslint.toString() + ')();\n');
  write(path.join(out, 'stylelint.cjs'), 'module.exports = (' + stylelint.toString() + ')();\n');
  json(path.join(out, 'stylelint-config.json'), { plugins: ['./stylelint.cjs'], rules: { 'plenix/logical-properties': true } });
  json(path.join(out, 'package.json'), { name: SCOPE + '/lint', version: VERSION, description: 'Plenix check-system rules for ESLint and Stylelint', license: 'UNLICENSED', homepage: SITE + '/', repository: { type: 'git', url: 'git+' + REPO + '.git', directory: 'packages/lint' }, publishConfig: { registry: 'https://npm.pkg.github.com', access: 'restricted' }, main: './index.cjs', exports: { '.': './index.cjs', './eslint': './eslint.cjs', './stylelint': './stylelint.cjs', './stylelint-config': './stylelint-config.json', './check-system.rules/*': './check-system.rules/*' }, files: ['*.cjs', 'check-copy.js', 'check-system.rules', 'platform', 'stylelint-config.json', 'README.md', 'example'], sideEffects: false, dependencies: { '@babel/standalone': '^7.28.0' }, peerDependencies: { eslint: '>=8.57 <10', stylelint: '>=16 <17' }, peerDependenciesMeta: { eslint: { optional: true }, stylelint: { optional: true } } });
  write(path.join(out, 'README.md'), '# ' + SCOPE + '/lint\n\nGenerated from check-system.rules without editing the original scanners. No autofixes: design and editorial decisions stay with the owner.\n\nESLint flat config (8.57/9):\n```js\nimport plenix from "@plenix-ds/lint/eslint";\nexport default [{ ...plenix.configs.recommended, files: ["**/*.{js,jsx,mjs}"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }];\n```\n\nThis package uses ESLint flat configuration. Install ESLint only when using that adapter.\n\nStylelint 16:\n```json\n{ "extends": ["@plenix-ds/lint/stylelint-config"] }\n```\n\nOr load "@plenix-ds/lint/stylelint" as plugins and enable plenix/logical-properties.\n\nThe adapters lint in-memory unsaved source. ESLint provides inline-style, links-not-buttons, semantic-html, table-geometry, settings-cards, use-of-color and copy (static strings, sentence case, inclusive language, glossary, American English and image alternatives). Stylelint provides logical-properties. Content warnings are advisory by default. The settings-cards rule is opt-in for settings screens; the original repository limits that scanner to settings pages. Each rule supports standard linter suppression comments. `require("@plenix-ds/lint").scan(name, source, filename)` is available for editor integration; lintText(text, {kind}) checks individual copy strings.\n\nOriginal check-system.rules/*.js modules are included unchanged for custom integrations. JSON/token rules such as color-groups and field-background retain their original object/check APIs and are not misapplied to JavaScript text. Some filesystem check methods require a full Platform checkout; use the in-memory adapters in downstream apps.\n');
  write(path.join(out, 'example', 'eslint.config.cjs'), "const plenix = require('../eslint.cjs');\nmodule.exports = [{ ...plenix.configs.recommended, files: ['**/*.jsx'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }];\n");
  write(path.join(out, 'example', 'stylelint.config.cjs'), "module.exports = { extends: [require.resolve('../stylelint-config.json')] };\n");
  write(path.join(out, 'example', 'sample.jsx'), "const DEFAULT_STRINGS = { title: 'New project' };\nexport function ProjectHeading() { return <h2 className=\"plx-heading\">{DEFAULT_STRINGS.title}</h2>; }\n");
  write(path.join(out, 'example', 'sample.css'), '.plx-example { margin-inline-start: var(--plx-sys-space-inline-sm); }\n');
  write(path.join(out, 'example', 'README.md'), '# Lint example\n\nWith the matching ESLint and Stylelint peers installed, run `eslint --config eslint.config.cjs sample.jsx` and `stylelint --config stylelint.config.cjs sample.css` from this directory. Both samples pass. Replace the logical margin with margin-left or add a literal JSX style to see a source-rule finding. These configs reference the generated package directly; no publish step is needed.\n');
  return 'lint: ESLint and Stylelint adapters plus original source rules';
};
