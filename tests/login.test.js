// Plenix tests · the login service (services/login): the server on a temporary DATA folder, two accounts made by the CLI with
// generated passwords (piped to its prompt), then HTTP checks of the sign-in, the session cookie and Nginx's /auth/check.
// Also the save service's /api/session with the X-Plenix-* headers (it must work after the cutover from Authentik).
//   node tests/login.test.js            (LOGIN_PORT: another port, and the next one for the save service)
//   TEST_SCOPE=full: always; by default (tests/changed.js) when services/login or services/save, a global file or this test changed
const changed = require('./changed.js');
const shared = require('./check.js');
require('./limit.js');
if (!changed.wants({ units: ['services/login'] })) changed.none('PASS login: 0 passed, 0 failed');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const LOGIN = path.join(ROOT, 'services', 'login');
const PORT = +process.env.LOGIN_PORT || 8892, SAVE_PORT = PORT + 1;
const BASE = 'http://127.0.0.1:' + PORT, ORIGIN = BASE;
const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-login-'));
const SAVE_DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-save-'));
const env = Object.assign({}, process.env, { DATA, PORT: String(PORT), CDN: 'https://cdn.example.test/cdn/0.0.0', LOCK_AFTER: '3', LOCK_BASE_MS: '60000', IP_MAX: '1000', TRUST_PROXY: '0' });
const pw = () => crypto.randomBytes(18).toString('base64url');
const PASS = pw(), LOCK_PASS = pw();

let failures = 0, passes = 0;
// one check (tests/check.js): the name starts with its component ("Sign-in: …"), so a run can ask for some components only
const check = (name, cond, detail) => { if (!shared.check(name, cond, detail)) return; if (cond) { passes++; console.log('  ok   ' + name); } else { failures++; console.log('  FAIL ' + name + (detail ? ': ' + detail : '')); } };

const cli = (args, input) => execFileSync(process.execPath, [path.join(LOGIN, 'accounts.js')].concat(args), { env, input: input || '', encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
const request = (method, url, { headers, body } = {}) => fetch(BASE + url, { method, headers: headers || {}, body, redirect: 'manual' });
const form = (o) => new URLSearchParams(o).toString();
const post = (url, fields, headers) => request('POST', url, { headers: Object.assign({ 'Content-Type': 'application/x-www-form-urlencoded', Origin: ORIGIN }, headers || {}), body: form(fields) });
const cookieOf = (res) => { const c = res.headers.get('set-cookie') || ''; const m = /^([^=]+)=([^;]*)/.exec(c); return m ? { name: m[1], value: m[2], raw: c } : null; };
const withCookie = (c) => ({ Cookie: c.name + '=' + c.value });
async function waitFor(port) {
  for (let i = 0; i < 100; i++) { try { await fetch('http://127.0.0.1:' + port + '/'); return; } catch (e) { await new Promise((r) => setTimeout(r, 100)); } }
  throw new Error('the server on ' + port + ' did not start');
}

async function main() {
  // the accounts, through the CLI: the password only on standard input
  cli(['add', 'tester', '--email', 'tester@example.test', '--name', 'Test Person', '--groups', 'Editors,Users'], PASS + '\n' + PASS + '\n');
  cli(['add', 'locktest', '--groups', 'Users'], LOCK_PASS + '\n' + LOCK_PASS + '\n');
  let refused = false; try { cli(['add', 'short'], 'abc\nabc\n'); } catch (e) { refused = true; }
  check('CLI: a short password is refused', refused);
  refused = false; try { cli(['add', 'x', '--password', 'abcdefghijklmnop']); } catch (e) { refused = true; }
  check('CLI: a password is never an option', refused);
  const stored = fs.readFileSync(path.join(DATA, 'accounts.json'), 'utf8');
  check('CLI: accounts.json holds scrypt hashes, not passwords', stored.indexOf(PASS) < 0 && /"hash": "scrypt\$/.test(stored));
  check('CLI: list', cli(['list']).indexOf('tester  Test Person  <tester@example.test>  Editors,Users') >= 0);

  const server = spawn(process.execPath, [path.join(LOGIN, 'server.js')], { env, stdio: ['ignore', 'pipe', 'inherit'] });
  const save = spawn(process.execPath, [path.join(ROOT, 'services', 'save', 'server.js')], { env: Object.assign({}, process.env, { DATA: SAVE_DATA, PORT: String(SAVE_PORT) }), stdio: ['ignore', 'pipe', 'inherit'] });
  try {
    await waitFor(PORT); await waitFor(SAVE_PORT);
    if (process.platform !== 'win32') check('Secret: the secret file has mode 600', (fs.statSync(path.join(DATA, 'secret')).mode & 0o777) === 0o600);
    else check('Secret: the secret file is made on first start', fs.existsSync(path.join(DATA, 'secret')));

    // signed out
    let r = await request('GET', '/auth/check');
    check('Check: 401 when signed out', r.status === 401, r.status);
    r = await request('GET', '/auth/session');
    check('Session: 401 when signed out', r.status === 401, r.status);

    // the page
    r = await request('GET', '/auth/sign-in?rd=/Plenix/dashboard/');
    let html = await r.text();
    check('Sign-in page: 200', r.status === 200);
    check('Sign-in page: no style attributes or style elements', !/\sstyle\s*=/i.test(html) && !/<style/i.test(html));
    check('Sign-in page: autocomplete username and current-password', /autocomplete="username"/.test(html) && /autocomplete="current-password"/.test(html));
    check('Sign-in page: paste and autofill are not blocked', !/onpaste|oncopy|readonly/i.test(html));
    check('Sign-in page: the release stylesheet from the CDN and login.css', /https:\/\/cdn\.example\.test\/cdn\/0\.0\.0\/plenix\.css/.test(html) && /\/auth\/login\.css/.test(html));
    check('Sign-in page: keeps a same-site rd', /name="rd" value="\/Plenix\/dashboard\/"/.test(html));
    check('Sign-in page: CSP and no-store', /frame-ancestors 'none'/.test(r.headers.get('content-security-policy') || '') && r.headers.get('cache-control') === 'no-store');
    const css = await (await request('GET', '/auth/login.css')).text();
    // (a media query's width cannot be a custom property: the Narrow breakpoint is the one number, as in the Platform's own CSS)
    const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@media \(width < 600px\)/g, '');
    check('Sign-in page: login.css: no hard-coded colors or sizes', !/#[0-9a-f]{3,8}\b|\b\d+(\.\d+)?(px|rem|em|pt)\b|rgba?\(|hsla?\(/i.test(rules));
    check('Sign-in page: login.css: only Plenix tokens', (rules.match(/var\(--[a-z0-9-]+\)/g) || []).every((v) => /^var\(--plx-/.test(v)));

    // POSTs from elsewhere
    r = await request('POST', '/auth/sign-in', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form({ user: 'tester', password: PASS }) });
    check('Sign-in: sign-in without Origin or Referer: refused', r.status === 403 && !cookieOf(r), r.status);
    r = await post('/auth/sign-in', { user: 'tester', password: PASS }, { Origin: 'https://evil.example' });
    check('Sign-in: sign-in from another origin: refused', r.status === 403 && !cookieOf(r), r.status);

    // wrong password and unknown name: the same generic answer
    r = await post('/auth/sign-in', { user: 'tester', password: 'not-the-password' });
    html = await r.text();
    check('Sign-in: wrong password: 401, generic message, no cookie', r.status === 401 && !cookieOf(r) && html.indexOf('That user name or password is not right.') >= 0, r.status);
    check('Sign-in: wrong password: the user name stays filled in (WCAG 3.3.7)', /value="tester"/.test(html));
    const r2 = await post('/auth/sign-in', { user: 'nobody-here', password: 'not-the-password' });
    const html2 = await r2.text();
    check('Sign-in: unknown user: the same answer', r2.status === 401 && html2.indexOf('That user name or password is not right.') >= 0);

    // success
    r = await post('/auth/sign-in', { user: 'Tester@Example.test', password: PASS, rd: '/Plenix/dashboard/?tab=1' });
    let c = cookieOf(r);
    check('Sign-in: sign-in (by email, any case): 303 to rd', r.status === 303 && r.headers.get('location') === '/Plenix/dashboard/?tab=1', r.status + ' ' + r.headers.get('location'));
    check('Cookie: __Host-, HttpOnly, Secure, SameSite=Lax, Path=/, ends with the browser session', c && c.name === '__Host-plenix_session' && /HttpOnly/.test(c.raw) && /Secure/.test(c.raw) && /SameSite=Lax/.test(c.raw) && /Path=\//.test(c.raw) && !/Max-Age/.test(c.raw), c && c.raw);
    r = await request('GET', '/auth/check', { headers: withCookie(c) });
    check('Check: 204 with the X-Plenix-* headers', r.status === 204 && r.headers.get('x-plenix-user') === 'tester' && r.headers.get('x-plenix-email') === 'tester@example.test' && r.headers.get('x-plenix-name') === 'Test Person' && r.headers.get('x-plenix-groups') === 'Editors|Users', r.status + ' ' + [...r.headers].join(' '));
    r = await request('POST', '/auth/check', { headers: withCookie(c) });
    check('Check: answers any method (auth_request keeps the original one)', r.status === 204);
    r = await request('GET', '/auth/session', { headers: withCookie(c) });
    const s = await r.json();
    check('Session: who is signed in', r.status === 200 && s.user === 'tester' && s.name === 'Test Person' && s.groups.join() === 'Editors,Users');
    r = await request('GET', '/auth/sign-in?rd=/x', { headers: withCookie(c) });
    check('Sign-in page: sign-in page when signed in: Continue or Switch account', /You are signed in/.test(await r.text()));
    r = await post('/auth/sign-in', { user: 'tester', password: PASS, keep: '1' });
    check('Sign-in: keep me signed in: 30 days', /Max-Age=2592000/.test(cookieOf(r).raw));

    // tampered cookies
    const [data, sig] = c.value.split('.');
    const flip = (str) => str.slice(0, 5) + (str[5] === 'A' ? 'B' : 'A') + str.slice(6);
    const forged = Buffer.from(JSON.stringify(Object.assign(JSON.parse(Buffer.from(data, 'base64url')), { u: 'locktest' }))).toString('base64url');
    const longer = Buffer.from(JSON.stringify(Object.assign(JSON.parse(Buffer.from(data, 'base64url')), { exp: Date.now() + 1e10 }))).toString('base64url');
    for (const [name, value] of [['payload changed', flip(data) + '.' + sig], ['signature changed', data + '.' + flip(sig)], ['another user', forged + '.' + sig], ['longer expiry', longer + '.' + sig], ['no signature', data], ['garbage', 'x.y']]) {
      r = await request('GET', '/auth/check', { headers: { Cookie: c.name + '=' + value } });
      check('Cookie: tampered cookie (' + name + '): 401', r.status === 401, r.status);
    }

    // open redirects
    for (const rd of ['//evil.example/', '/\\evil.example', 'https://evil.example/', 'javascript:alert(1)', '/%0d%0aSet-Cookie:x', '/%5Cevil.example', '/%2F%2Fevil.example', '/a b', '\t//evil.example', '/auth/sign-in?rd=//evil.example']) {
      r = await post('/auth/sign-in', { user: 'tester', password: PASS, rd });
      check('Redirect: rd ' + JSON.stringify(rd) + ': goes to /', r.status === 303 && r.headers.get('location') === '/', r.headers.get('location'));
    }
    for (const q of ['//evil.example', '%2F%2Fevil.example', 'https://evil.example', '/%5Cevil.example'.replace('%5C', '\\')]) {
      html = await (await request('GET', '/auth/sign-in?rd=' + q)).text();
      check('Sign-in page: sign-in page rd ' + JSON.stringify(q) + ': dropped', /name="rd" value="\/"/.test(html));
    }
    html = await (await request('GET', '/auth/sign-in?rd=/Plenix/notes/?a=1&b=2')).text();
    check('Sign-in page: Nginx\'s raw $request_uri keeps its own query', /name="rd" value="\/Plenix\/notes\/\?a=1&amp;b=2"/.test(html));

    // sign out: the cookie is cleared; "everywhere" also ends the copies
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    const c2 = cookieOf(r);
    r = await post('/auth/sign-out', {}, withCookie(c2));
    check('Sign-out: cookie cleared, back to the sign-in page', r.status === 303 && r.headers.get('location') === '/auth/sign-in' && /Max-Age=0/.test(cookieOf(r).raw) && cookieOf(r).value === '');
    r = await request('POST', '/auth/sign-out', { headers: withCookie(c2) });
    check('Sign-out: sign-out without Origin: refused', r.status === 403);
    r = await post('/auth/sign-out', { everywhere: '1' }, withCookie(c2));
    r = await request('GET', '/auth/check', { headers: withCookie(c2) });
    check('Sign-out: sign-out everywhere: that session no longer passes', r.status === 401);
    r = await request('GET', '/auth/check', { headers: withCookie(c) });
    check('Sign-out: sign-out everywhere: the other sessions end too', r.status === 401);

    // the apps' Sign out link (GET): at once from this site, asked first from anywhere else
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    const c4 = cookieOf(r);
    r = await request('GET', '/auth/sign-out', { headers: Object.assign({ 'Sec-Fetch-Site': 'cross-site' }, withCookie(c4)) });
    html = await r.text();
    check('Sign-out: sign-out link from another site: asks first, keeps the session', r.status === 200 && !cookieOf(r) && /Sign out of Plenix\?/.test(html) && !/\sstyle\s*=/i.test(html));
    r = await request('GET', '/auth/sign-out?rd=/Plenix/notes/', { headers: Object.assign({ 'Sec-Fetch-Site': 'same-origin' }, withCookie(c4)) });
    check('Sign-out: sign-out link on this site: signs out, then the sign-in page', r.status === 303 && r.headers.get('location') === '/auth/sign-in?rd=%2FPlenix%2Fnotes%2F' && /Max-Age=0/.test(cookieOf(r).raw), r.status + ' ' + r.headers.get('location'));
    html = await (await request('GET', '/auth/sign-in?rd=%2FPlenix%2Fnotes%2F')).text();
    check('Sign-in page: an encoded rd is read', /name="rd" value="\/Plenix\/notes\/"/.test(html));

    // revocation from the CLI, and a disabled account
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    const c3 = cookieOf(r);
    check('Revocation: signed in again', (await request('GET', '/auth/check', { headers: withCookie(c3) })).status === 204);
    cli(['revoke', 'tester']);
    check('Revocation: revoke ends the session', (await request('GET', '/auth/check', { headers: withCookie(c3) })).status === 401);
    cli(['disable', 'tester']);
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    check('Accounts: disabled account: cannot sign in, generic message', r.status === 401 && !cookieOf(r) && (await r.text()).indexOf('That user name or password is not right.') >= 0);
    cli(['enable', 'tester']);
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    check('Accounts: enabled again: signs in', r.status === 303);

    // lockout with backoff (LOCK_AFTER=3 here)
    for (let i = 0; i < 3; i++) await post('/auth/sign-in', { user: 'locktest', password: 'wrong-' + i });
    r = await post('/auth/sign-in', { user: 'locktest', password: LOCK_PASS });
    html = await r.text();
    check('Lockout: the right password is refused after 3 failures', r.status === 429 && !cookieOf(r) && /Too many attempts/.test(html) && +r.headers.get('retry-after') > 0, r.status);
    for (let i = 0; i < 3; i++) await post('/auth/sign-in', { user: 'ghost', password: 'wrong-' + i });
    r = await post('/auth/sign-in', { user: 'ghost', password: 'x' });
    check('Lockout: a name that is no account locks the same way (no enumeration)', r.status === 429);
    r = await post('/auth/sign-in', { user: 'tester', password: PASS });
    check('Lockout: other accounts still sign in', r.status === 303);

    // the log: every attempt, never a password
    const log = fs.readFileSync(path.join(DATA, 'log.jsonl'), 'utf8');
    const lines = log.trim().split('\n').map((l) => JSON.parse(l)).filter((e) => e.event === 'sign-in');
    check('Log: who, when, IP and result of each attempt', lines.some((e) => e.result === 'ok' && e.account === 'tester' && e.ip && e.at) && lines.some((e) => e.result === 'bad-credentials') && lines.some((e) => e.result === 'locked') && lines.some((e) => e.result === 'bad-origin'));
    check('Log: no passwords', log.indexOf(PASS) < 0 && log.indexOf(LOCK_PASS) < 0 && log.indexOf('not-the-password') < 0);

    // the save service accepts the Plenix login's headers (and still Authentik's)
    const sr = await fetch('http://127.0.0.1:' + SAVE_PORT + '/api/session', { headers: { 'X-Plenix-User': 'tester', 'X-Plenix-Email': 'tester@example.test', 'X-Plenix-Groups': 'Editors|Users' } });
    const sj = await sr.json();
    check('Save: X-Plenix-* headers sign the person in', sr.status === 200 && sj.user === 'tester' && sj.email === 'tester@example.test' && sj.canSave === true);
    const ar = await fetch('http://127.0.0.1:' + SAVE_PORT + '/api/session', { headers: { 'X-authentik-username': 'owner', 'X-authentik-groups': 'Users' } });
    const aj = await ar.json();
    check('Save: X-authentik-* headers still work', ar.status === 200 && aj.user === 'owner' && aj.canSave === false);
  } finally {
    server.kill(); save.kill();
    try { fs.rmSync(DATA, { recursive: true, force: true }); fs.rmSync(SAVE_DATA, { recursive: true, force: true }); } catch (e) { /* temp */ }
  }
  console.log((failures ? 'FAIL' : 'PASS') + ' login: ' + passes + ' passed, ' + failures + ' failed');
  process.exit(failures ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });
