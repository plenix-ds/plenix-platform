// node tools/agent/generated.js --check <base ref>   fails when a branch changed a generated file since <base ref>
// node tools/agent/generated.js --restore            puts every generated file back as committed (before a commit)
// node tools/agent/generated.js --list               prints the patterns
// The files the build writes (node build-app.js and its steps). A task branch never commits them: every branch would
// change them, so every pull request would conflict with the next. The integrator rebuilds them when it merges
// (tools/agent/take-pr.js, take-lane.js) and release.sh commits them. Owner, 2026-10-15 (the Claude + Codex pilot).
const { execSync } = require('child_process');
const path = require('path');
const GENERATED = [
  /^platform\/dist\//,
  /^platform\/system\/tokens\//, /^platform\/system\/themes\//, /^platform\/system\/steps\.css$/, /^platform\/system\/layout-modes\.css$/,
  /^platform\/tokens\/tokens\.index\.json$/, /^platform\/tokens\/build\.json$/,
  /(^|\/)app\.js$/, /^dam\/app\/assets\.js$/,
  /^platform\/components\/Icon\/icon\.css$/, /^platform\/components\/Brand\/brand\.css$/,
  /^platform\/components\/ColorSwatch\/(categoryColors|dataColors)\.js$/,
  /^platform\/components\/(DataTable\/data-table|Table\/table)-steps\.css$/,
  /^platform\/patterns\/ImageEditor\/imageEditorSteps\.js$/, /^platform\/utils\/sizeSteps\.js$/,
  /^platform\/providers\/(pageLayouts|themes)\.js$/,
  /^platform\/mobile\//, /^packages\//,
  /^docs\/plenix-docs\.html$/, /^docs\/plenix-data\.js$/,
  /^CHANGELOG\.md$/, /^package\.json$/,                    // written by release.sh
  /^platform\/design-system$/, /^node_modules$/,           // the submodule pointer and the dependency junction
  // inside platform/design-system (its own repo)
  /^spec-parts\.js$/, /^ds-sample-parts\.css$/, /^native-guidance\.js$/, /^usage\.js$/,
];
const PARTIAL = ['platform/index.js', 'platform/platform.css'];
const BLOCK = /\/\* BEGIN library parts[^]*?\/\* END library parts \*\//;
const generatedBlock = (text) => (text.match(BLOCK) || [''])[0];
const isGenerated = (file) => GENERATED.some((re) => re.test(file));
module.exports = { GENERATED, isGenerated };
if (require.main === module) {
  const ROOT = path.resolve(__dirname, '../..');
  const sh = (c) => execSync(c, { cwd: ROOT, encoding: 'utf8' });
  const arg = process.argv[2];
  if (arg === '--list') { GENERATED.forEach((re) => console.log(re.source)); process.exit(0); }
  if (arg === '--check') {
    const base = process.argv[3]; if (!base) { console.error('usage: --check <base ref>'); process.exit(2); }
    const changed = sh('git diff --name-only ' + base + '...HEAD').split('\n').filter(Boolean).filter((file) => isGenerated(file) && !(file === 'platform/components/DataTable/data-table-steps.css' && sh('git diff --diff-filter=D --name-only ' + base + '...HEAD -- platform/components/DataTable/DataTable.jsx').trim() && sh('git diff --diff-filter=D --name-only ' + base + '...HEAD -- platform/components/DataTable/data-table-steps.css').trim()));
    for (const file of PARTIAL) if (generatedBlock(sh('git show ' + base + ':' + file)) !== generatedBlock(sh('git show HEAD:' + file))) changed.push(file);
    if (changed.length) {
      console.log('GENERATED_FAIL: this branch commits generated files (the integrator rebuilds them at merge):\n  ' + changed.join('\n  ') +
        '\nPut them back: node tools/agent/generated.js --restore, then commit (see AGENTS.md).');
      process.exit(1);
    }
    console.log('GENERATED_OK'); process.exit(0);
  }
  if (arg === '--restore') {
    const files = sh('git status --porcelain').split('\n').filter(Boolean).map((l) => ({ code: l.slice(0, 2), file: l.slice(3).replace(/^"|"$/g, '') }))
      .filter((x) => isGenerated(x.file) && x.code.trim() !== '??');
    for (const file of PARTIAL) {
      const full = path.join(ROOT, file), current = require('fs').readFileSync(full, 'utf8'), committed = generatedBlock(sh('git show HEAD:' + file));
      require('fs').writeFileSync(full, current.replace(BLOCK, () => committed));
    }
    for (const { file } of files.filter((x) => x.file !== 'platform/components/DataTable/data-table-steps.css' || require('fs').existsSync(path.join(ROOT, 'platform/components/DataTable/DataTable.jsx')) || require('fs').existsSync(path.join(ROOT, x.file)))) sh('git checkout -- "' + file + '"');
    console.log(files.length ? 'restored: ' + files.map((x) => x.file).join(', ') : 'nothing to restore'); process.exit(0);
  }
  console.error('usage: node tools/agent/generated.js --check <base> | --restore | --list'); process.exit(2);
}
