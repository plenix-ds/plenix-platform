// node tools/agent/library/take-lane.js <lane worktree> [--dry]
// The integrator's merge of one lane: copies every source file the lane created or changed (main repo and the
// platform/design-system submodule) from its worktree into this checkout. Generated files are skipped: they are rebuilt
// here by node build-app.js. A file this checkout also changed since the lane's base is reported, not overwritten.
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const ROOT = path.resolve(__dirname, '../../..');
const WT = path.resolve(process.argv[2] || '');
const DRY = process.argv.includes('--dry');
if (!fs.existsSync(path.join(WT, '.git'))) { console.error('not a worktree: ' + WT); process.exit(1); }
const GENERATED = [
  /^platform\/dist\//, /^platform\/index\.js$/, /^platform\/platform\.css$/, /^platform\/system\/tokens\//, /^platform\/tokens\/tokens\.index\.json$/,
  /\/app\.js$/, /^dam\/app\/assets\.js$/, /^platform\/components\/Icon\/icon\.css$/, /^platform\/mobile\//, /^packages\//,
  /^platform\/design-system$/, /^node_modules$/,
  /^spec-parts\.js$/, /^ds-sample-parts\.css$/, /^native-guidance\.js$/, /^usage\.js$/,
];
const status = (dir) => execSync('git status --porcelain -uall', { cwd: dir, encoding: 'utf8' }).split('\n').filter(Boolean)
  .map((l) => ({ code: l.slice(0, 2), file: l.slice(3).replace(/^"|"$/g, '') }));
// the lane's base commit (main repo) and this checkout's changes since then, to catch two writers on one file
const base = execSync('git merge-base HEAD ' + execSync('git rev-parse HEAD', { cwd: WT, encoding: 'utf8' }).trim(), { cwd: ROOT, encoding: 'utf8' }).trim();
const mine = new Set(execSync('git diff --name-only ' + base + ' HEAD', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean));
let n = 0; const clash = [], gone = [];
function take(rel, from, to, sub) {
  for (const { code, file } of status(from)) {
    if (GENERATED.some((re) => re.test(file))) continue;
    const key = (sub ? sub + '/' : '') + file;
    if (!sub && mine.has(key)) { clash.push(key); continue; }
    const src = path.join(from, file), dst = path.join(to, file);
    if (code.includes('D')) { gone.push(key); if (!DRY && fs.existsSync(dst)) fs.unlinkSync(dst); continue; }
    if (!fs.existsSync(src) || fs.statSync(src).isDirectory()) continue;
    if (!DRY) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); }
    console.log((DRY ? 'would take ' : 'took ') + code.trim() + ' ' + key); n++;
  }
}
take('', WT, ROOT, '');
take('platform/design-system', path.join(WT, 'platform/design-system'), path.join(ROOT, 'platform/design-system'), 'platform/design-system');
console.log(n + ' files' + (gone.length ? ', deleted: ' + gone.join(', ') : ''));
if (clash.length) console.log('CHANGED HERE TOO since the lane started (check by hand): ' + clash.join(', '));
