// Plenix tests · the St. John test site's guard (#382 F8: a site a test starts never outlives the test). tests/site.js
// starts this in a process group of its own; it starts the site's server (same group) and stops it when the test that
// asked for it is gone, even when that test was killed outright (no exit handler ran). The server's output is its own.
//   node tests/site-guard.js <test pid> <the site's server.js>   (the site's settings come in the environment)
const { spawn } = require('child_process');
const [owner, server] = [Number(process.argv[2]), process.argv[3]];
const child = spawn(process.execPath, [server], { stdio: 'inherit', env: process.env });
const stop = (code) => { try { child.kill('SIGTERM'); } catch (e) { /* already gone */ } process.exit(code); };
child.on('exit', (code) => process.exit(code === null ? 1 : code));
['SIGTERM', 'SIGINT', 'SIGHUP'].forEach((s) => process.on(s, () => stop(0)));
// the test that started the site: when it is gone, the site goes too
setInterval(() => { try { process.kill(owner, 0); } catch (e) { stop(0); } }, 1000).unref();
