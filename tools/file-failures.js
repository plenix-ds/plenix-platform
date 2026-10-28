#!/usr/bin/env node
// tools/file-failures.js: after an owner-started test run, files one GitHub issue for every check still failing at the end
// (owner, runtests-issues-27 and runtests-labels-27, "kept simple"). It reads the results file the tests wrote (TEST_RESULTS,
// tests/check.js); it runs no test. ~/team/test-runner.sh calls it after a run.
//   node tools/file-failures.js --results <file> [--repo owner/name] [--run <url>] [--commit <sha>] [--dry-run] [--open-issues <file>]
//   --results       the JSON results file: { results: [{ test, part, name, ok, detail, at }] }
//   --repo          where the issues go: only plenix-ds/plenix-platform is accepted (the default)
//   --run, --commit what the issue body names: the run (its request issue) and the commit that was tested
//   --dry-run       prints what it would do and changes nothing on GitHub
//   --open-issues   (with --dry-run) the open issues as a JSON file [{ number, body }] instead of reading GitHub
// Rules:
//   - A check counts by its last result in the file: still failing at the end means its last result is a fail.
//   - One issue per failing check. Labels: bug, qa, and the area of the test's group in the Run tests window: Tables ->
//     area:datatable, Look -> area:design, every other test -> area:library.
//   - The body carries a hidden fingerprint of test + part + check name. When an open issue already has it, the script adds a
//     comment to that issue instead of opening another one.
//   - No retry: a GitHub call that fails is reported and the script goes on. It never closes an issue.
// Uses only the machine's gh login; it reads, prints and stores no token. Exit 0 when every call worked, 1 when one failed.
const fs = require('fs');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const DRY = args.includes('--dry-run');
const RESULTS = arg('--results'), REPO = arg('--repo') || 'plenix-ds/plenix-platform';
const RUN = arg('--run') || '', COMMIT = arg('--commit') || '', OPEN_FILE = arg('--open-issues');
if (REPO !== 'plenix-ds/plenix-platform') { console.error('file-failures: issues go only to plenix-ds/plenix-platform (got ' + REPO + ')'); process.exit(2); }
if (!RESULTS) { console.error('usage: node tools/file-failures.js --results <file> [--repo owner/name] [--run <url>] [--commit <sha>] [--dry-run] [--open-issues <file>]'); process.exit(2); }

// the Run tests window's groups that have their own area (every other test is area:library)
const AREA_OF_GROUP = { Tables: 'area:datatable', Look: 'area:design' };
const GROUP_OF_TEST = { 'data-grid': 'Tables', 'component-tokens': 'Look', formats: 'Look', typography: 'Look', visual: 'Look' };
const areaOf = (test) => AREA_OF_GROUP[GROUP_OF_TEST[test]] || 'area:library';
const LABELS = { bug: 'd73a4a', qa: 'fbca04' };   // made when missing; the area labels exist

const fingerprint = (r) => 'test-failure:' + crypto.createHash('sha1').update([r.test, r.part || '', r.name].join('\n')).digest('hex').slice(0, 16);
const marker = (fp) => '<!-- ' + fp + ' -->';
const gh = (a) => execFileSync('gh', a, { encoding: 'utf8', timeout: 60000, stdio: ['ignore', 'pipe', 'pipe'] });

// 1. the checks still failing at the end: the last result of each test + part + name
const all = (JSON.parse(fs.readFileSync(RESULTS, 'utf8')).results || []);
const last = new Map();
for (const r of all) last.set([r.test, r.part || '', r.name].join('\n'), r);
const failing = [...last.values()].filter((r) => !r.ok);
console.log(all.length + ' results, ' + last.size + ' checks, ' + failing.length + ' still failing');
if (!failing.length) process.exit(0);

// 2. the open issues that carry a fingerprint
let open = [];
try {
  open = DRY && OPEN_FILE ? JSON.parse(fs.readFileSync(OPEN_FILE, 'utf8'))
    : JSON.parse(gh(['issue', 'list', '-R', REPO, '--state', 'open', '--label', 'qa', '--limit', '1000', '--json', 'number,body']));
} catch (e) { if (!DRY) { console.error('could not read the open issues of ' + REPO + ': ' + e.message.split('\n')[0]); process.exit(1); } console.log('(dry run: the open issues could not be read; every failure counts as new)'); }
const byFp = new Map();
for (const i of open) { const m = /<!-- (test-failure:[0-9a-f]{16}) -->/.exec(i.body || ''); if (m && !byFp.has(m[1])) byFp.set(m[1], i.number); }

// 3. the labels, made once when missing (a real run only)
if (!DRY) {
  let have = [];
  try { have = JSON.parse(gh(['label', 'list', '-R', REPO, '--limit', '500', '--json', 'name'])).map((l) => l.name); } catch (e) { /* create below reports it */ }
  for (const [name, color] of Object.entries(LABELS)) if (!have.includes(name)) {
    try { gh(['label', 'create', name, '-R', REPO, '--color', color]); console.log('made the label ' + name); } catch (e) { console.error('could not make the label ' + name + ': ' + e.message.split('\n')[0]); }
  }
}

// 4. one issue per failing check, or a comment on the open one
let errors = 0;
const where = [RUN ? 'Run: ' + RUN : '', COMMIT ? 'Commit: `' + COMMIT + '`' : ''].filter(Boolean).join(' · ');
for (const r of failing) {
  const fp = fingerprint(r), known = byFp.get(fp);
  const detail = r.detail ? '\n\nWhat it saw:\n```\n' + String(r.detail).slice(0, 1500) + '\n```' : '';
  if (known) {
    const body = 'Still failing in an owner-started run (' + (r.at || 'time not recorded') + ').' + (where ? '\n' + where : '') + detail;
    if (DRY) { console.log('DRY: comment on #' + known + ' (' + r.test + ' · ' + r.name + ')'); continue; }
    try { gh(['issue', 'comment', String(known), '-R', REPO, '--body', body]); console.log('commented on #' + known + ': ' + r.name); }
    catch (e) { errors++; console.error('could not comment on #' + known + ': ' + e.message.split('\n')[0]); }
    continue;
  }
  const title = ('Test failure: ' + r.test + ' · ' + r.name).slice(0, 200);
  const labels = ['bug', 'qa', areaOf(r.test)];
  const body = ['A check failed in an owner-started test run and was still failing at the end.', '',
    '- Test: `' + r.test + '`', '- Part: ' + (r.part ? '`' + r.part + '`' : 'none'), '- Check: ' + r.name, where ? '- ' + where : ''].filter((x) => x !== '').join('\n')
    + detail + '\n\nFiled by tools/file-failures.js. A later failure of the same check is added here as a comment.\n' + marker(fp);
  if (DRY) { console.log('DRY: new issue [' + labels.join(', ') + '] ' + title); byFp.set(fp, '(new)'); continue; }
  try {
    const url = gh(['issue', 'create', '-R', REPO, '--title', title, '--body', body, ...labels.flatMap((l) => ['--label', l])]).trim();
    byFp.set(fp, url.split('/').pop()); console.log('opened ' + url);
  } catch (e) { errors++; console.error('could not open the issue for ' + r.name + ': ' + e.message.split('\n')[0]); }
}
process.exit(errors ? 1 : 0);
