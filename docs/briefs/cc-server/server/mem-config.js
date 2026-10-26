// Writes claude-mem settings for cc-server and tests the patterns.
const fs = require('fs');
const home = process.env.HOME;
const custom = [
  { name: 'plenix-env-secret', regex: String.raw`(DS_TOKEN|NPM_TOKEN|GH_TOKEN|GITHUB_TOKEN|AUTHENTIK_[A-Z_]*|[A-Z_]*(PASSWORD|SECRET|TOKEN|API_KEY))\s*[=:]\s*[^\s"']+` },
  { name: 'postgres-url-password', regex: String.raw`postgres(ql)?://[^:/\s]+:[^@\s]+@` },
];
const skip = String.raw`(cat|less|more|head|tail|grep|sed|awk)\s[^|;]*(\.env|credentials|hosts\.yml|\.pem|id_ed25519|database\.sqlite)|printenv|^\s*env\s*$|gh\s+auth\s+token|--show-token|ssh-keygen|claude\s+setup-token`;
const settings = {
  CLAUDE_MEM_PROVIDER: 'claude',
  CLAUDE_MEM_CLAUDE_AUTH_METHOD: 'subscription',
  CLAUDE_MEM_MODEL: 'haiku',
  CLAUDE_MEM_WORKER_HOST: '127.0.0.1',
  CLAUDE_MEM_CHROMA_ENABLED: 'false',
  CLAUDE_MEM_REDACT_ENABLED: 'true',
  CLAUDE_MEM_REDACT_GENERIC_ENABLED: 'true',
  CLAUDE_MEM_REDACT_CUSTOM_PATTERNS: JSON.stringify(custom),
  CLAUDE_MEM_SKIP_BASH_PATTERNS: skip,
  CLAUDE_MEM_EXCLUDED_PROJECTS: [home, `${home}/.ssh/**`, `${home}/.config/**`, `${home}/.claude/**`, `${home}/.claude-mem/**`].join(','),
  CLAUDE_MEM_TOOL_USES_RETENTION_DAYS: '30',
  CLAUDE_MEM_FILE_READ_GATE_ENABLED: 'false',
  CLAUDE_MEM_SKIP_SUBAGENT_OBSERVATIONS: 'true',
  CLAUDE_MEM_CLOUD_SYNC_HUB_URL: '',
  CLAUDE_MEM_TEAMBRAIN_URL: '',
};
const dir = `${home}/.claude-mem`;
fs.mkdirSync(dir, { recursive: true, mode: 0o700 });
fs.writeFileSync(`${dir}/settings.json`, JSON.stringify(settings, null, 2) + '\n', { mode: 0o600 });
fs.writeFileSync(`${dir}/telemetry.json`, JSON.stringify({ enabled: false, installId: 'cc-server-opted-out' }) + '\n', { mode: 0o600 });

const cs = `${home}/.claude/settings.json`;
const j = JSON.parse(fs.readFileSync(cs, 'utf8'));
j.env = Object.assign(j.env || {}, { DO_NOT_TRACK: '1', CLAUDE_MEM_TELEMETRY: '0', CLAUDE_MEM_TELEMETRY_ERRORS: '0' });
fs.writeFileSync(cs, JSON.stringify(j, null, 2) + '\n');

const r = new RegExp(custom[0].regex, 'g');
const k = new RegExp(skip);
console.log('redact:', 'DS_TOKEN=abc123x'.replace(r, '[X]'), '|', 'DB_PASSWORD: hunter2'.replace(r, '[X]'), '|', 'postgres://u:pw@db/x'.replace(new RegExp(custom[1].regex), '[X]'));
console.log('skip (want true true false):', k.test('cat /srv/st-john/.env'), k.test('gh auth token'), k.test('node build-app.js'));
console.log('env:', JSON.stringify(j.env));
