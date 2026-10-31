// node tools/agent/take-pr.js <pull request number> [--dry]
// The integrator's merge of one agent's pull request (Claude or Codex, owner 2026-10-15): copies every source file the
// branch changed since it left main into this checkout. Generated files are skipped (tools/agent/generated.js): they
// are rebuilt here by node build-app.js and committed by release.sh. package.json is taken except its "version", which
// release.sh writes: this checkout keeps its own. Files under lanes/<task>/design-system/ go into
// platform/design-system (its own repository; tools/agent/lane-overlay.js). A file this checkout also changed since
// the branch's base is reported, not overwritten. Then: node build-app.js, the quick gates, release.sh, and close the
// pull request with the version (AGENTS.md › Integration).
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { isGenerated, versionOf, withVersion } = require('./generated.js');
const ROOT = path.resolve(__dirname, '../..');
const N = process.argv[2], DRY = process.argv.includes('--dry');
if (!/^\d+$/.test(N || '')) { console.error('usage: node tools/agent/take-pr.js <number> [--dry]'); process.exit(2); }
const sh = (c, o) => execSync(c, Object.assign({ cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }, o || {}));
const REF = 'refs/pr/' + N;
sh('git fetch -q origin pull/' + N + '/head:' + REF + ' --force');
const base = sh('git merge-base HEAD ' + REF).trim();
const mine = new Set(sh('git diff --name-only ' + base + ' HEAD').split('\n').filter(Boolean));
const rows = sh('git diff --name-status --no-renames ' + base + ' ' + REF).split('\n').filter(Boolean).map((l) => { const [code, file] = l.split('\t'); return { code, file }; });
const LANE = /^lanes\/[^/]+\/design-system\/(.+)$/;
let n = 0; const clash = [], skipped = [], gone = [];
// package.json without its "version": the text with the version set to a fixed value, to compare the rest
const noVersion = (text) => withVersion(text, '');
for (const { code, file } of rows) {
  if (file === 'package.json' && code === 'M') {
    const at = (ref) => sh('git show ' + ref + ':package.json'), here = fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8');
    if (noVersion(at(REF)) === noVersion(at(base))) { skipped.push(file + ' (only its "version")'); continue; }
    if (noVersion(at('HEAD')) !== noVersion(at(base))) { clash.push(file); continue; }
    if (!DRY) fs.writeFileSync(path.join(ROOT, 'package.json'), withVersion(at(REF), versionOf(here)));
    console.log((DRY ? 'would take ' : 'took ') + 'M package.json (all but its "version")'); n++; continue;
  }
  if (isGenerated(file)) { skipped.push(file); continue; }
  const m = LANE.exec(file), dstRel = m ? 'platform/design-system/' + m[1] : file;
  if (!m && /^lanes\//.test(file)) { skipped.push(file); continue; }
  if (mine.has(file) || mine.has(dstRel)) { clash.push(file); continue; }
  const dst = path.join(ROOT, dstRel);
  if (code === 'D') { gone.push(dstRel); if (!DRY && fs.existsSync(dst)) fs.unlinkSync(dst); continue; }
  if (!DRY) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.writeFileSync(dst, sh('git show ' + REF + ':"' + file + '"', { encoding: 'buffer' })); }
  console.log((DRY ? 'would take ' : 'took ') + code + ' ' + dstRel); n++;
}
console.log(n + ' files' + (gone.length ? ', deleted: ' + gone.join(', ') : ''));
if (skipped.length) console.log('skipped (generated or lane-only): ' + skipped.join(', '));
if (clash.length) { console.log('CHANGED HERE TOO since the branch started (merge by hand): ' + clash.join(', ')); process.exitCode = 1; }
