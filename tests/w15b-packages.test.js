// Plenix · isolated generated-package contract and optional real peer integration tests.
// PLENIX_PACKAGE_TEST_MODULES points at a scratch node_modules for Vue/React/ESLint/Stylelint/TypeScript.
const assert = require('assert/strict'), fs = require('fs'), os = require('os'), path = require('path');
const { createRequire } = require('module'), { pathToFileURL } = require('url'), { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(ROOT, 'platform', 'design-system', 'inventory.js'))) { console.log('SKIP W15B packages: design system unavailable.'); process.exit(0); }
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-w15b-packages-'));
const PKG = path.join(temp, 'packages');
let checks = 0;
function ok(condition, message) { assert.ok(condition, message); checks++; }
const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
const copyDir = (from, to) => { for (const item of fs.readdirSync(from, { withFileTypes: true })) { const a = path.join(from, item.name), b = path.join(to, item.name); if (item.isDirectory()) copyDir(a, b); else copy(a, b); } };
const json = (file, value) => write(file, JSON.stringify(value, null, 2));
const ctx = { ROOT, PKG, VERSION: '0.0.0-test', SCOPE: '@plenix-ds', SITE: 'https://example.test', REPO: 'https://github.com/plenix-ds/plenix-platform', write, copy, copyDir, json };
const optionalModules = process.env.PLENIX_PACKAGE_TEST_MODULES;
const moduleRoot = optionalModules || path.join(ROOT, 'node_modules');
fs.symlinkSync(moduleRoot, path.join(temp, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
const peers = createRequire(path.join(temp, 'package.json'));
const has = (name) => { try { peers.resolve(name); return true; } catch (_) { return false; } };
async function main() {
  const typeFile = path.join(PKG, 'react', 'index.d.ts');
  fs.mkdirSync(path.dirname(typeFile), { recursive: true });
  require('../build-types.js')(typeFile, ctx.VERSION);
  const typeSource = fs.readFileSync(typeFile, 'utf8');
  const names = [...typeSource.matchAll(/export declare const (\w+): React\.ComponentType</g)].map((m) => m[1]);
  ok(names.length > 20, 'real generated component contract');
  require('../build-packages.d/vue.js')(ctx);
  require('../build-packages.d/lint.js')(ctx);
  const vuePath = path.join(PKG, 'vue'), lintPath = path.join(PKG, 'lint');
  const npmCli = process.env.npm_execpath || path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js');
  for (const [dir, example] of [[vuePath, 'example/main.mjs'], [lintPath, 'example/eslint.config.cjs']]) {
    const args = ['pack', '--dry-run', '--json', '--ignore-scripts'];
    const packed = fs.existsSync(npmCli) ? spawnSync(process.execPath, [npmCli, ...args], { cwd: dir, encoding: 'utf8' }) : spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, { cwd: dir, encoding: 'utf8', shell: process.platform === 'win32' });
    ok(packed.status === 0, 'npm pack dry run: ' + packed.stderr);
    const metadata = JSON.parse(packed.stdout)[0];
    ok(metadata.files.some((entry) => entry.path === example), 'npm tarball includes runnable example');
    ok(!metadata.files.some((entry) => entry.path.startsWith('node_modules/')), 'npm tarball excludes dependencies');
  }
  const exampleBuild = require('esbuild').buildSync({ entryPoints: [path.join(vuePath, 'example', 'main.mjs')], bundle: true, format: 'esm', platform: 'browser', external: ['vue'], outfile: path.join(temp, 'vue-example.mjs'), write: false });
  ok(exampleBuild.outputFiles.some((file) => file.path.endsWith('.mjs') && file.contents.length > 0), 'Vue sample app builds with external Vue peer');
  ok(exampleBuild.outputFiles.some((file) => file.path.endsWith('.css') && file.contents.length > 0), 'Vue sample emits bridge CSS');
  const manifest = JSON.parse(fs.readFileSync(path.join(vuePath, 'package.json')));
  ok(manifest.version === ctx.VERSION && manifest.peerDependencies.vue, 'versioned Vue manifest');
  ok(fs.readFileSync(path.join(vuePath, 'react-props.d.ts'), 'utf8') === typeSource, 'Vue props preserve build-types output');
  const lint = require(path.join(lintPath, 'index.cjs'));
  ok(lint.scan('inline-style', '<div style={{ color: "red" }} />', 'example.jsx').length > 0, 'in-memory inline-style failure');
  ok(lint.scan('inline-style', '<div className="plx-example" />', 'example.jsx').length === 0, 'inline-style passing source');
  ok(lint.scan('logical-properties', '.plx-example { margin-left: var(--plx-sys-space-inline-sm); }', 'example.css').length > 0, 'in-memory logical CSS failure');
  ok(lint.scan('logical-properties', '.plx-example { margin-inline-start: var(--plx-sys-space-inline-sm); }', 'example.css').length === 0, 'logical CSS accepted');
  ok(lint.scan('links-not-buttons', '<Button variant="link">Save</Button>', 'example.jsx').length > 0, 'source navigation rule');
  ok(lint.lintText('colour').length > 0, 'content dictionary packaged');
  ok(lint.scan('copy', 'const DEFAULT_STRINGS = { title: "New Project" };', 'example.jsx').length > 0, 'static copy parser adapter');
  for (const file of fs.readdirSync(path.join(ROOT, 'check-system.rules'))) if (file.endsWith('.js')) ok(fs.readFileSync(path.join(lintPath, 'check-system.rules', file), 'utf8') === fs.readFileSync(path.join(ROOT, 'check-system.rules', file), 'utf8'), 'original source rule preserved: ' + file);
  if (has('eslint')) {
    const { ESLint } = peers('eslint'), plugin = require(path.join(lintPath, 'eslint.cjs'));
    const engine = new ESLint({ overrideConfigFile: true, overrideConfig: [{ ...plugin.configs.recommended, files: ['**/*.jsx'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }] });
    const bad = await engine.lintText('const x = <div style={{ color: "red" }} />;', { filePath: 'example.jsx' });
    ok(bad[0].messages.some((m) => m.ruleId === 'plenix/inline-style'), 'real ESLint lintText reports source rule');
    const good = await engine.lintText('const x = <div className="plx-example" />;', { filePath: 'example.jsx' });
    ok(good[0].errorCount === 0, 'real ESLint accepted source');
    const exampleEngine = new ESLint({ cwd: lintPath, overrideConfigFile: path.join(lintPath, 'example', 'eslint.config.cjs') });
    const exampleResult = await exampleEngine.lintFiles([path.join(lintPath, 'example', 'sample.jsx')]);
    ok(exampleResult.length === 1 && exampleResult[0].errorCount === 0 && exampleResult[0].warningCount === 0, 'packaged ESLint sample config and source run: ' + JSON.stringify(exampleResult));
  } else console.log('SKIP ESLint peer integration (install optional peer or PLENIX_PACKAGE_TEST_MODULES).');
  if (has('stylelint')) {
    const stylelint = peers('stylelint'), config = { plugins: [path.join(lintPath, 'stylelint.cjs')], rules: { 'plenix/logical-properties': true } };
    const bad = await stylelint.lint({ code: '.plx-test { margin-left: var(--gap); }', config });
    ok(bad.results[0].warnings.some((x) => x.rule === 'plenix/logical-properties'), 'real Stylelint source warning');
    const good = await stylelint.lint({ code: '.plx-test { margin-inline-start: var(--gap); }', config });
    ok(!good.errored, 'real Stylelint accepted logical source');
    const exampleResult = await stylelint.lint({ configFile: path.join(lintPath, 'example', 'stylelint.config.cjs'), files: [path.join(lintPath, 'example', 'sample.css')] });
    ok(!exampleResult.errored && exampleResult.results.length === 1 && exampleResult.results[0].warnings.length === 0, 'packaged Stylelint sample config and source run');
  } else console.log('SKIP Stylelint peer integration.');
  if (has('typescript') && has('vue') && has('@types/react/package.json')) {
    const fixture = path.join(temp, 'types.ts');
    write(fixture, 'import { Input, Button, PlenixVue, configurePlenix } from "./packages/vue/index";\nimport { createApp, h } from "vue";\ncreateApp({render:()=>h(Button,{disabled:true})}).use(PlenixVue);\nconst input: typeof Input = Input;\n');
    const result = spawnSync(process.execPath, [peers.resolve('typescript/bin/tsc'), '--noEmit', '--strict', '--skipLibCheck', 'false', '--moduleResolution', 'node', '--target', 'es2020', fixture], { encoding: 'utf8' });
    ok(result.status === 0, 'generated Vue declaration compile: ' + result.stdout + result.stderr);
  } else console.log('SKIP TypeScript peer integration.');
  if (has('vue') && has('react') && has('react-dom/client') && has('jsdom')) {
    const { JSDOM } = peers('jsdom'), dom = new JSDOM('<div id="app"></div>', { url: 'https://example.test/' });
    for (const name of ['window', 'document', 'Element', 'HTMLElement', 'SVGElement', 'Node']) globalThis[name] = dom.window[name];
    // Vue captures document at import time; this branch precedes its first runtime import.
    const Vue = peers('vue'), React = peers('react'), ReactDOM = peers('react-dom/client');
    const wrappers = await import(pathToFileURL(path.join(vuePath, 'index.mjs')).href);
    let latest, clicks = 0, changes = 0, destroyed = 0;
    const FakeInput = (props) => { latest = props; React.useEffect(() => () => destroyed++, []); return React.createElement('input', props); };
    const runtime = { React, ReactDOM, Plenix: { Input: FakeInput, Button: (props) => React.createElement('button', props), Checkbox: (props) => React.createElement('input', { ...props, type: 'checkbox' }) } };
    wrappers.configurePlenix(runtime);
    const value = Vue.ref('first'), checked = Vue.ref(false), label = Vue.ref('Save');
    const app = Vue.createApp({ setup() { Vue.provide('message', 'injected'); return () => Vue.h('section', [Vue.h(wrappers.Input, { modelValue: value.value, 'onUpdate:modelValue': (next) => { value.value = next; }, onChange: () => changes++ }), Vue.h(wrappers.Checkbox, { modelValue: checked.value, 'onUpdate:modelValue': (next) => { checked.value = next; } }), Vue.h(wrappers.Button, { onClick: () => clicks++ }, { default: () => Vue.h('span', label.value) })]); } });
    // A child slot component checks provide/inject, as Vue inject must run in setup.
    const SlotChild = Vue.defineComponent({ setup() { const message = Vue.inject('message', 'missing'); return () => Vue.h('span', label.value + ' ' + message); } });
    const app2 = Vue.createApp({ setup() { Vue.provide('message', 'injected'); return () => Vue.h(wrappers.Button, { onClick: () => clicks++ }, { default: () => Vue.h(SlotChild) }); } });
    const wait = async () => { await Vue.nextTick(); await new Promise((resolve) => setTimeout(resolve, 150)); await Vue.nextTick(); };
    app.mount(document.querySelector('#app')); await wait();
    ok(document.querySelector('input') && document.querySelector('input').value === 'first', 'Vue model initial value reaches React');
    latest.onChange({ target: { value: 'second' } }); await wait();
    ok(value.value === 'second' && changes === 1 && document.querySelector('input').value === 'second', 'React change updates Vue model and preserves listener');
    value.value = 'third'; await wait(); ok(document.querySelector('input').value === 'third', 'Vue parent model update reaches existing React root');
    document.querySelector('input[type=checkbox]').click(); await wait(); ok(checked.value === true, 'checked v-model binding');
    const extra = document.createElement('div'); document.body.append(extra); app2.mount(extra); await wait();
    ok(extra.textContent === 'Save injected', 'Vue default slot preserves provide/inject');
    label.value = 'Keep'; await wait(); ok(extra.textContent === 'Keep injected', 'Vue slot remains reactive');
    extra.querySelector('button').click(); ok(clicks === 1, 'React onClick forwarded');
    for (const [name, start, next, extraProps, field, event] of [
      ['SearchField', undefined, 'found', {}, 'value', true],
      ['NumberInput', 0, 12, {}, 'value', false],
      ['Combobox', [], ['asset'], { multiple: true }, 'values', false],
      ['OtpInput', '', '123456', {}, 'value', false],
      ['Rating', 0, 4, {}, 'value', false],
      ['DatePicker', null, { start: '2026-01-01', end: '2026-01-02' }, {}, 'value', false],
    ]) {
      let bound, originalCalls = 0;
      runtime.Plenix[name] = (props) => { bound = props; return React.createElement('div', { className: props.className }); };
      const current = Vue.ref(start), mount = document.createElement('div'); document.body.append(mount);
      const control = Vue.createApp({ render: () => Vue.h(wrappers[name], { ...extraProps, class: 'plx-fixture', modelValue: current.value, 'onUpdate:modelValue': (value) => { current.value = value; }, onChange: () => originalCalls++ }) });
      control.mount(mount); await wait();
      assert.deepEqual(bound[field], start); checks++;
      ok(mount.querySelector('.plx-fixture'), name + ' forwards Vue class as React className');
      bound.onChange(event ? { target: { [field]: next } } : next); await wait();
      assert.deepEqual(current.value, next); checks++;
      ok(originalCalls === 1, name + ' preserves original callback');
      control.unmount(); mount.remove();
    }
    let templateProps;
    runtime.Plenix.Combobox = (props) => { templateProps = props; return React.createElement('div'); };
    const templateHost = document.createElement('div'); document.body.append(templateHost);
    const templateApp = Vue.createApp({ components: { PlxCombobox: wrappers.Combobox }, data: () => ({ picked: [] }), template: '<PlxCombobox v-model="picked" multiple disabled creatable :max-items="4" aria-label="Assets" />' });
    const templateOwner = templateApp.mount(templateHost); await wait();
    ok(templateProps.multiple === true && templateProps.disabled === true && templateProps.creatable === true, 'compiled Vue template boolean attributes');
    ok(templateProps.maxItems === 4 && templateProps['aria-label'] === 'Assets', 'compiled template camel props preserve ARIA names');
    templateProps.onChange(['choice']); await wait();
    assert.deepEqual(templateOwner.picked, ['choice']); checks++;
    templateApp.unmount(); templateHost.remove();
    app.unmount(); app2.unmount(); await wait(); ok(destroyed === 1 && !extra.textContent, 'React roots and nested Vue slots clean up on owner unmount');
    dom.window.close();
  } else console.log('SKIP Vue/React DOM integration.');
  console.log('W15B_PACKAGES_OK ' + checks + ' checks');
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => {
  const resolved = path.resolve(temp), parent = path.resolve(os.tmpdir());
  if (resolved.startsWith(parent + path.sep) && path.basename(resolved).startsWith('plenix-w15b-packages-')) fs.rmSync(resolved, { recursive: true, force: true });
});
