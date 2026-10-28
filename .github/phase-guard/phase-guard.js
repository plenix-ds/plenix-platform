#!/usr/bin/env node
// phase-guard.js: checks a phase label change on an issue against the allowed table (team charter: phases and lifecycle).
// Run by .github/workflows/phase-guard.yml.
// On "issues: labeled": when a phase change is not allowed it puts the prior phase back, removes the new one and comments why.
// On "pull_request": the QA pass belongs to one commit (RULES.md section 5, step 5).
//   - a new commit (synchronize) takes the qa-passed label off: the new commit needs a new verdict;
//   - every pull request event sets the commit status "qa-passed" (success with the label, pending without it), so branch
//     protection can require it before any merge;
//   - a merge by a QA account (repository variable QA_ACCOUNTS, comma-separated) without the label gets a comment that flags it;
//   - a UX pull request (label ux) gets ux-queued when it opens, and the commit status "ux-queued" stays pending until
//     the Tech Lead or the Developer takes the label off after the Developer's current task (RULES.md section 4).
//   node phase-guard.js                     in the Action: reads GITHUB_EVENT_PATH, GITHUB_EVENT_NAME, GITHUB_TOKEN, TEAM_PHASE,
//                                           BUILD_TOOL, QA_ACCOUNTS, QA_PASSED_LABEL (default qa-passed)
//   node phase-guard.js --dry-run EVENT     no network: prints the decision for a saved event (see dry-run/*.json)
// Rules (GITHUB.md "Phases"):
//   - One phase label at a time. The allowed moves are in ALLOWED.
//   - At most two Developer-type writers per AI tool: phase:building and phase:fixing are refused when two other open issues
//     with the same agent:<tool> label are already there. ux issues are never counted (RULES.md section 4).
//   - phase:building needs TEAM_PHASE = build, phase:in-qa and phase:fixing need qa (the repository variable TEAM_PHASE).
//     Exceptions: the owner-override label; interface work (the ux label) is built at any time; and for QA, a QA actor
//     from another AI than the one building (the issue's agent:<tool> label is not BUILD_TOOL, the build tool's variable).
const fs = require('fs');
const ALLOWED = {   // RULES.md section 5: the lifecycle's steps as labels
  '': ['phase:ideas', 'phase:needs-decision', 'phase:ready'],
  'phase:ideas': ['phase:needs-decision', 'phase:ready'],
  'phase:needs-decision': ['phase:ready', 'phase:ideas'],
  'phase:ready': ['phase:building', 'phase:needs-decision'],
  'phase:building': ['phase:ready-for-qa', 'phase:ready'],
  'phase:ready-for-qa': ['phase:in-qa', 'phase:building'],
  'phase:in-qa': ['phase:qa-passed', 'phase:qa-failed'],
  'phase:qa-failed': ['phase:fixing'],
  'phase:fixing': ['phase:in-qa'],
  'phase:qa-passed': ['phase:delivered', 'phase:in-qa'],
  'phase:delivered': ['phase:owner-qa'],
  'phase:owner-qa': ['phase:in-qa'],
};
// the team phase each label belongs to (RULES.md section 4: build, then QA; no overlap). Interface work (the ux label) is
// built at any time (the UX Designer); its pull request waits with ux-queued until the Developer's current task is done.
const PHASE_OF = { 'phase:building': 'build', 'phase:in-qa': 'qa', 'phase:fixing': 'qa' };

const WRITER_PHASES = ['phase:building', 'phase:fixing'];
const MAX_WRITERS = 2;   // per AI tool (RULES.md section 4); the UX Designer (the ux label) never counts

function decide(event, env, writers) {
  const added = event.label && event.label.name;
  if (!added || !added.startsWith('phase:')) return { ok: true, why: 'not a phase label' };
  const labels = (event.issue.labels || []).map((l) => l.name);
  const others = labels.filter((l) => l.startsWith('phase:') && l !== added);
  if (others.length > 1) return { ok: false, restore: others, remove: added, why: 'the issue already has more than one phase label (' + others.join(', ') + '); fix that first' };
  const from = others[0] || '';
  if (!(ALLOWED[from] || []).includes(added)) return { ok: false, restore: others, remove: added, why: 'moving from ' + (from || 'no phase') + ' to ' + added + ' is not an allowed step (allowed: ' + ((ALLOWED[from] || []).join(', ') || 'none') + ')' };
  const need = PHASE_OF[added];
  if (need && (env.TEAM_PHASE || 'build') !== need && !(added === 'phase:building' && labels.includes('ux'))) {
    const override = labels.includes('owner-override');
    const tool = (labels.find((l) => l.startsWith('agent:')) || '').slice(6);
    const otherAi = need === 'qa' && tool && env.BUILD_TOOL && tool !== env.BUILD_TOOL;   // an external AI alongside the Developers
    if (!override && !otherAi) return { ok: false, restore: others, remove: added, why: added + ' needs the ' + need + ' phase (TEAM_PHASE is ' + (env.TEAM_PHASE || 'unset') + '); exceptions: the owner-override label' + (need === 'build' ? ', or the ux label (interface work)' : '') + (need === 'qa' ? ', or a QA actor from another AI than ' + (env.BUILD_TOOL || 'the build tool') : '') };
  }
  if (WRITER_PHASES.includes(added) && !labels.includes('ux') && writers) {
    const tool = (labels.find((l) => l.startsWith('agent:')) || '').slice(6) || 'unknown';
    const n = writers[tool] || 0;   // the other open issues of this tool at building or fixing
    if (n >= MAX_WRITERS) return { ok: false, restore: others, remove: added, why: tool + ' already has ' + n + ' Developer-type writers at work (the limit is ' + MAX_WRITERS + ' per AI tool); the UX Designer is not counted' };
  }
  return { ok: true, why: (from || 'no phase') + ' -> ' + added + ' is allowed', clear: others };
}

function decidePr(event, env) {
  const label = env.QA_PASSED_LABEL || 'qa-passed';
  const pr = event.pull_request, labels = (pr.labels || []).map((l) => l.name), has = labels.includes(label);
  const out = { ok: true, sha: pr.head && pr.head.sha, status: has ? 'success' : 'pending', why: has ? 'QA passed this commit' : 'waiting for QA to pass this commit' };
  if (event.action === 'synchronize' && has) Object.assign(out, { removeLabel: label, status: 'pending', why: 'a new commit needs a new QA verdict; ' + label + ' taken off' });
  // a UX pull request (the ux label) waits with ux-queued until the Developer's current task is done; the Tech Lead or the
  // Developer takes the label off then. The "ux-queued" status stays pending while the label is on.
  const ux = env.UX_LABEL || 'ux', queued = env.UX_QUEUED_LABEL || 'ux-queued';
  if (labels.includes(ux)) {
    const isQueued = labels.includes(queued) || (event.action === 'opened');
    if (event.action === 'opened' && !labels.includes(queued)) out.addLabel = queued;
    out.uxStatus = isQueued ? 'pending' : 'success';
  }
  const qa = String(env.QA_ACCOUNTS || '').split(',').map((x) => x.trim()).filter(Boolean);
  if (event.action === 'closed' && pr.merged && pr.merged_by && qa.includes(pr.merged_by.login) && !has) Object.assign(out, { ok: false, comment: 'Phase guard: ' + pr.merged_by.login + ' (a QA account) merged this pull request without the ' + label + ' label. A QA role ships only a change it has passed (RULES.md section 3).', why: 'merged by a QA account without ' + label });
  return out;
}

// the open issues at building or fixing per agent:<tool> label, other than this one and not ux (the dry run passes _writers)
async function countWriters(repo, self) {
  const counts = {};
  for (const phase of WRITER_PHASES) {
    const q = encodeURIComponent('repo:' + repo + ' is:issue is:open label:"' + phase + '" -label:ux');
    const r = await fetch('https://api.github.com/search/issues?per_page=100&q=' + q, { headers: { authorization: 'Bearer ' + process.env.GITHUB_TOKEN, accept: 'application/vnd.github+json' } });
    if (!r.ok) throw new Error('search: ' + r.status);
    for (const it of (await r.json()).items || []) {
      if (it.number === self) continue;
      const tool = ((it.labels || []).map((l) => l.name).find((l) => l.startsWith('agent:')) || '').slice(6) || 'unknown';
      counts[tool] = (counts[tool] || 0) + 1;
    }
  }
  return counts;
}

async function api(method, url, body) {
  const r = await fetch('https://api.github.com' + url, { method, headers: { authorization: 'Bearer ' + process.env.GITHUB_TOKEN, accept: 'application/vnd.github+json', 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  if (!r.ok && r.status !== 404) throw new Error(method + ' ' + url + ': ' + r.status);
}
async function main() {
  const args = process.argv.slice(2), dry = args.includes('--dry-run');
  const file = dry ? args[args.indexOf('--dry-run') + 1] : process.env.GITHUB_EVENT_PATH;
  const event = JSON.parse(fs.readFileSync(file, 'utf8'));
  const env = dry ? Object.assign({}, event._env || {}) : process.env;
  const isPr = !!event.pull_request;
  const needCount = !isPr && event.label && WRITER_PHASES.includes(event.label.name);
  const writers = !needCount ? null : dry ? event._writers || {} : await countWriters(event.repository.full_name, event.issue.number);
  const d = isPr ? decidePr(event, env) : decide(event, env, writers);
  if (dry) { console.log(JSON.stringify(Object.assign({ event: file.split('/').pop(), ok: d.ok, why: d.why }, isPr ? { status: d.status, removeLabel: d.removeLabel || null, addLabel: d.addLabel || null, uxStatus: d.uxStatus || null } : {}))); return; }
  const repo = event.repository.full_name, enc = encodeURIComponent;
  if (isPr) {
    const n = event.pull_request.number;
    if (d.removeLabel) await api('DELETE', '/repos/' + repo + '/issues/' + n + '/labels/' + enc(d.removeLabel));
    if (d.addLabel) await api('POST', '/repos/' + repo + '/issues/' + n + '/labels', { labels: [d.addLabel] });
    if (d.uxStatus && d.sha && event.action !== 'closed') await api('POST', '/repos/' + repo + '/statuses/' + d.sha, { state: d.uxStatus, context: 'ux-queued', description: d.uxStatus === 'pending' ? 'waits for the Developer\'s current task' : 'ready to merge' });
    if (d.sha && event.action !== 'closed') await api('POST', '/repos/' + repo + '/statuses/' + d.sha, { state: d.status, context: 'qa-passed', description: d.why });
    if (d.comment) await api('POST', '/repos/' + repo + '/issues/' + n + '/comments', { body: d.comment });
    return;
  }
  const n = event.issue.number;
  if (d.ok) { for (const l of d.clear || []) await api('DELETE', '/repos/' + repo + '/issues/' + n + '/labels/' + enc(l)); return; }
  await api('DELETE', '/repos/' + repo + '/issues/' + n + '/labels/' + enc(d.remove));
  if (d.restore.length) await api('POST', '/repos/' + repo + '/issues/' + n + '/labels', { labels: d.restore });
  await api('POST', '/repos/' + repo + '/issues/' + n + '/comments', { body: 'Phase guard: ' + d.why + '. The label ' + d.remove + ' was taken off. See GITHUB.md "Phases".' });
}
if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
module.exports = { decide, decidePr, ALLOWED };
