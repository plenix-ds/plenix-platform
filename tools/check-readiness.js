// Plenix · tools/check-readiness.js (owner, readiness-27: "open issues labeled priority:1"): a release stops while a priority:1 issue is open.
//   node tools/check-readiness.js [owner/repo]     default plenix-ds/plenix-platform (or GITHUB_REPOSITORY)
// Lists the open issues labeled priority:1 (GitHub, read-only, through the gh CLI) and exits 1 if there are any, printing their titles.
// Exit: 0 none open, 1 some open, 2 could not ask GitHub (gh missing, not signed in): a release must not pass on a failed question.
// Not a test. Run by release.yml before publishing; the owner sees red or green.
const { execFileSync } = require('child_process');

const repo = process.argv[2] || process.env.GITHUB_REPOSITORY || 'plenix-ds/plenix-platform';
const LABEL = 'priority:1';
let issues;
try {
  issues = JSON.parse(execFileSync('gh', ['issue', 'list', '-R', repo, '--label', LABEL, '--state', 'open', '--limit', '200', '--json', 'number,title,url'], { encoding: 'utf8', timeout: 60000 }));
} catch (e) { console.log('READINESS_ERROR: could not list issues of ' + repo + ' (' + String(e.message).split('\n')[0] + ')'); process.exit(2); }
console.log('Readiness, ' + repo + ': open issues labeled ' + LABEL + ': ' + issues.length);
issues.forEach((i) => console.log('  #' + i.number + '  ' + i.title + '  ' + i.url));
if (issues.length) { console.log('READINESS_FAIL: close or relabel ' + (issues.length === 1 ? 'it' : 'them') + ' before releasing'); process.exit(1); }
console.log('READINESS_OK');
