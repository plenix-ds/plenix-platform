// Plenix login service · the accounts CLI (services/login/accounts.js). It changes DATA/accounts.json; the running service
// reads the file again on its next request, so nothing needs a restart. On the VM: sudo docker exec -it plenix-login node accounts.js …
//   node accounts.js list
//   node accounts.js add <user> [--email <email>] [--name "<display name>"] [--groups Admins,Editors,Users]
//   node accounts.js groups <user> <Admins,Editors,Users>
//   node accounts.js name <user> "<display name>"      node accounts.js email <user> <email>
//   node accounts.js disable <user>                     node accounts.js enable <user>
//   node accounts.js reset-password <user>
//   node accounts.js revoke <user>                      ends every session of the account (it signs in again)
// A password is typed at a hidden prompt, twice; it is never an argument, never shown and never logged. Without a terminal
// (a pipe, the tests) the prompt reads one line per question from standard input. add, groups, disable, enable,
// reset-password and revoke are logged to DATA/log.jsonl (who was changed, what, when; never the password).
'use strict';
const fs = require('fs');
const path = require('path');
const login = require('./server.js');

const MIN = 12, MAX = 1024;
const LOG = path.join(login.DATA, 'log.jsonl');
const log = (entry) => { try { fs.appendFileSync(LOG, JSON.stringify(Object.assign({ at: new Date().toISOString(), event: 'account' }, entry)) + '\n', { mode: 0o600 }); } catch (e) { /* best effort */ } };
const fail = (msg) => { console.error(msg); process.exit(1); };

// ---- the hidden prompt -------------------------------------------------------------------------------------------------
let piped = null;
function pipedLine() {
  if (!piped) piped = fs.readFileSync(0, 'utf8').split(/\r?\n/);
  return piped.length ? piped.shift() : '';
}
function ask(question) {
  if (!process.stdin.isTTY) { process.stderr.write(question); const line = pipedLine(); process.stderr.write('\n'); return Promise.resolve(line); }
  return new Promise((resolve) => {
    const input = process.stdin;
    let value = '';
    process.stderr.write(question);
    input.setRawMode(true);
    input.resume();
    input.setEncoding('utf8');
    const done = (out) => { input.setRawMode(false); input.pause(); input.removeListener('data', onData); process.stderr.write('\n'); resolve(out); };
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === '\r' || ch === '\n') return done(value);
        if (ch === '\u0003') { process.stderr.write('\n'); process.exit(130); }          // Ctrl+C
        if (ch === '\u007f' || ch === '\b') { value = value.slice(0, -1); continue; }   // Backspace
        if (ch >= ' ') value += ch;                                                       // pasting works: every printable character counts
      }
    };
    input.on('data', onData);
  });
}
async function newPassword() {
  const a = await ask('New password (at least ' + MIN + ' characters; hidden): ');
  if (a.length < MIN) fail('The password needs at least ' + MIN + ' characters. Nothing was changed.');
  if (a.length > MAX) fail('The password can have at most ' + MAX + ' characters. Nothing was changed.');
  const b = await ask('The same password again: ');
  if (a !== b) fail('The two passwords are not the same. Nothing was changed.');
  return login.hashPassword(a);
}

// ---- the commands ------------------------------------------------------------------------------------------------------
function options(args) {
  const out = { _: [] };
  for (let i = 0; i < args.length; i++) {
    if (/^--(email|name|groups)$/.test(args[i])) out[args[i].slice(2)] = args[++i];
    else if (/^--/.test(args[i])) fail('Unknown option ' + args[i] + '. Passwords are never options: they are asked for.');
    else out._.push(args[i]);
  }
  return out;
}
function groupsOf(text) {
  const list = String(text || 'Users').split(',').map((g) => g.trim()).filter(Boolean)
    .map((g) => login.GROUPS.find((x) => x.toLowerCase() === g.toLowerCase()) || fail('Unknown group "' + g + '": use ' + login.GROUPS.join(', ') + '.'));
  return Array.from(new Set(list));
}
const emailOk = (e) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
function change(user, fn, what) {
  const list = login.loadAccounts().map((a) => Object.assign({}, a));
  const a = list.find((x) => x.user === String(user || '').toLowerCase());
  if (!a) fail('There is no account "' + user + '".');
  fn(a);
  a.updated = new Date().toISOString();
  login.saveAccounts(list);
  log({ action: what, account: a.user });
  return a;
}
const show = (a) => a.user + '  ' + (a.name || '') + '  <' + (a.email || '') + '>  ' + (a.groups || []).join(',') + (a.disabled ? '  DISABLED' : '');

async function main(argv) {
  const [cmd, ...rest] = argv;
  const o = options(rest), user = String(o._[0] || '').toLowerCase();
  switch (cmd) {
    case 'list': {
      const list = login.loadAccounts();
      console.log(list.length ? list.map(show).join('\n') : 'No accounts yet.');
      return;
    }
    case 'add': {
      if (!login.USER_RE.test(user)) fail('A user name is 1 to 64 lowercase letters, digits, dots, dashes or underscores, starting with a letter or digit.');
      if (!emailOk(o.email)) fail('"' + o.email + '" is not an email address.');
      const list = login.loadAccounts();
      if (login.findAccount(list, user) || (o.email && login.findAccount(list, o.email))) fail('That user name or email already has an account.');
      const groups = groupsOf(o.groups);
      const hash = await newPassword();
      const now = new Date().toISOString();
      const account = { user, email: o.email || '', name: o.name || user, groups, hash, created: now, updated: now, disabled: false, sessionVersion: 1 };
      login.saveAccounts(login.loadAccounts().concat(account));
      log({ action: 'add', account: user, groups });
      console.log('Added: ' + show(account));
      return;
    }
    case 'groups': {
      const groups = groupsOf(o._[1] || fail('Name the groups: ' + login.GROUPS.join(',')));
      const a = change(user, (x) => { x.groups = groups; }, 'groups');
      console.log('Groups set: ' + show(a));
      return;
    }
    case 'name': { const a = change(user, (x) => { x.name = String(o._[1] || x.user); }, 'name'); console.log('Name set: ' + show(a)); return; }
    case 'email': {
      if (!emailOk(o._[1])) fail('"' + o._[1] + '" is not an email address.');
      const other = login.findAccount(login.loadAccounts(), o._[1]);
      if (other && other.user !== user) fail('Another account has that email.');
      const a = change(user, (x) => { x.email = String(o._[1] || ''); }, 'email');
      console.log('Email set: ' + show(a));
      return;
    }
    case 'disable': { const a = change(user, (x) => { x.disabled = true; x.sessionVersion = (x.sessionVersion || 1) + 1; }, 'disable'); console.log('Disabled (signed out everywhere): ' + show(a)); return; }
    case 'enable': { const a = change(user, (x) => { x.disabled = false; }, 'enable'); console.log('Enabled: ' + show(a)); return; }
    case 'reset-password': {
      if (!login.findAccount(login.loadAccounts(), user)) fail('There is no account "' + user + '".');
      const hash = await newPassword();
      const a = change(user, (x) => { x.hash = hash; x.sessionVersion = (x.sessionVersion || 1) + 1; }, 'reset-password');
      console.log('Password reset (signed out everywhere): ' + show(a));
      return;
    }
    case 'revoke': { const a = change(user, (x) => { x.sessionVersion = (x.sessionVersion || 1) + 1; }, 'revoke'); console.log('Signed out everywhere: ' + show(a)); return; }
    default:
      console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 11).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
      if (cmd && cmd !== 'help') process.exit(1);
  }
}
main(process.argv.slice(2)).catch((e) => fail(String(e && e.message || e)));
