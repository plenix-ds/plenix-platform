#!/usr/bin/env node
// Team guard: runs before every Bash and ArtifactData call of every Claude Code session on cc-server.
// - Only the Lead (PLENIX_ROLE=lead) may merge, release, deploy or push to a main branch.
// - No session may write an owner answer record (collection "answers"): only the owner's own tap writes those.
// - Only the Owner desk may write to an artifact database at all (to add questions).
// Exit code 2 blocks the call and shows the reason to the agent.
let raw = '';
process.stdin.on('data', d => (raw += d));
process.stdin.on('end', () => {
  let ev = {};
  try { ev = JSON.parse(raw); } catch { process.exit(0); }
  const role = (process.env.PLENIX_ROLE || 'none').toLowerCase();
  const tool = String(ev.tool_name || '');
  const input = ev.tool_input || {};
  const block = msg => { process.stderr.write('Team guard: ' + msg + '\n'); process.exit(2); };

  if (tool === 'Bash') {
    const cmd = String(input.command || '');
    const lead = role === 'lead';
    const risky = [
      [/\bgh\s+pr\s+merge\b/, 'merging a pull request'],
      [/\/pulls\/\d+\/merge\b|\/repos\/[^\s]+\/merges\b|mergePullRequest|enablePullRequestAutoMerge/, 'merging a pull request through the API'],
      [/\/repos\/[^\s]+\/releases\b[^;&|]*(-X|--method)\s*(POST|PATCH|DELETE)|(-X|--method)\s*(POST|PATCH|DELETE)[^;&|]*\/releases\b/, 'changing a GitHub release'],
      [/\/git\/refs\/heads\/(main|styling\/phase-2)\b/, 'changing a main branch through the API'],
      [/\bgh\s+release\s+(create|edit|delete)\b/, 'changing a GitHub release'],
      [/\b(release|deploy)\.sh\b/, 'releasing or deploying'],
      [/\bgit\s+push\b[^;&|]*\b(main|styling\/phase-2)\b/, 'pushing to a main branch'],
      [/\bgit\s+push\b[^;&|]*--tags?\b/, 'pushing tags'],
    ];
    for (const [re, what] of risky) {
      if (re.test(cmd) && !lead) block(what + ' is for the Lead only. Hand it to the Lead.');
    }
    if (/\bgit\s+push\b[^;&|]*(--force\b|-f\b|\+)[^;&|]*\b(main|styling\/phase-2)\b/.test(cmd)) block('force-pushing a main branch is never allowed.');
    process.exit(0);
  }

  if (/artifactdata/i.test(tool)) {
    const action = String(input.action || '').toLowerCase();
    const reads = ['get', 'list', 'query', ''];
    if (reads.includes(action)) process.exit(0);
    if (JSON.stringify(input).includes('"answers"')) block('answer records are written only by the owner\'s own tap on the status page.');
    if (role !== 'owner-desk') block('only the Owner desk writes to the status page.');
    process.exit(0);
  }
  process.exit(0);
});
