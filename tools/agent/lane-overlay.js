// node tools/agent/lane-overlay.js [--dry]
// The design system (platform/design-system) is its own private repository, so a pull request on this repository cannot
// change it. A task branch keeps its design-system files under lanes/<task>/design-system/<path inside the design
// system> (for a library lane: lanes/w10C/design-system/parts/w10C.records.js, …). This copies them into the checked-out
// submodule, so the build, the checks and the pages see them: the agent runs it before node build-app.js, CI runs it
// before its build, and the integrator's merge (tools/agent/take-pr.js) moves them into the design system's repository.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..'), LANES = path.join(ROOT, 'lanes'), DS = path.join(ROOT, 'platform/design-system');
const DRY = process.argv.includes('--dry');
if (!fs.existsSync(LANES)) { console.log('OVERLAY: no lanes/'); process.exit(0); }
if (!fs.existsSync(path.join(DS, 'inventory.js'))) { console.log('OVERLAY: the design system is not checked out: nothing copied'); process.exit(0); }
let n = 0;
const walk = (dir, rel) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const src = path.join(dir, e.name), r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) { walk(src, r); continue; }
    const dst = path.join(DS, r);
    if (!DRY) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); }
    console.log((DRY ? 'would copy ' : 'copied ') + r); n++;
  }
};
for (const task of fs.readdirSync(LANES)) { const d = path.join(LANES, task, 'design-system'); if (fs.existsSync(d)) walk(d, ''); }
console.log('OVERLAY: ' + n + ' files into platform/design-system');
