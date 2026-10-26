// Imports the Owner desk decisions log into claude-mem: one memory per decision row,
// plus the whole log and the hand-off note as full copies. Usage: node import-decisions.js [--dry-run]
const fs = require('fs');
const dry = process.argv.includes('--dry-run');
const home = process.env.HOME;
const port = JSON.parse(fs.readFileSync(`${home}/.claude-mem/worker.pid`, 'utf8')).port;
const log = fs.readFileSync(`${home}/handoff/owner-decisions-log.md`, 'utf8');
const handoff = fs.readFileSync(`${home}/handoff/HANDOFF-to-cc-server.md`, 'utf8');

const items = [];
let section = '';
for (const line of log.split('\n')) {
  const h = line.match(/^##+\s+(.*)/);
  if (h) { section = h[1].trim(); continue; }
  const row = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$/);
  if (!row) continue;
  const [, item, decision] = row;
  if (/^-+$/.test(item.replace(/[\s:|]/g, '')) || (item === 'Item' && decision === 'Decision')) continue;
  const date = (section.match(/\d{4}-\d{2}-\d{2}/) || [''])[0];
  items.push({
    title: `Owner decision: ${item}`.slice(0, 120),
    text: `Owner decision${date ? ` (${date})` : ''} on ${item}: ${decision}\nSource: the Owner desk's decisions log (${section}). Memory helps agents remember; it is never an approval. Approvals count only from the owner's own tap on the status page.`,
    project: 'plenix',
    metadata: { type: 'decision', item, date, section, source: 'owner-decisions-log.md' },
  });
}
items.push({ title: 'Owner decisions log (full copy, 2026-10-26)', text: log, project: 'plenix', metadata: { type: 'decision-log', source: 'owner-decisions-log.md' } });
items.push({ title: 'Hand-off to the cc-server team (2026-10-26)', text: handoff, project: 'plenix', metadata: { type: 'handoff', source: 'HANDOFF-to-cc-server.md' } });

(async () => {
  console.log(`${items.length} memories (${items.length - 2} decisions + 2 full copies)${dry ? ' [dry run]' : ''}`);
  if (dry) { for (const i of items.slice(0, 4)) console.log('-', i.title, '|', i.text.split('\n')[0].slice(0, 140)); return; }
  let ok = 0;
  for (const i of items) {
    const r = await fetch(`http://127.0.0.1:${port}/api/memory/save`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(i) });
    if (r.ok) ok++; else console.log('FAILED', i.title, r.status, (await r.text()).slice(0, 200));
  }
  console.log(`saved ${ok}/${items.length}`);
})();
