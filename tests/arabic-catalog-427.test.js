/* Plenix tests · every built-in English word has its Arabic (issue 427).
   Summary: platform/i18n/en.js and ar.js, key by key: every English key has an Arabic entry (a plural counts when Arabic
     has any of its forms); dialog.close is إغلاق (the owner, 2026-10-29); the unread keys removed in #427 (the common
     section, wizard.finish/step/error, emptyState.title/description/action) stay gone.
   Proof first: before #427 dialog.close had no Arabic and the common section was in English only, so those lines fail.
   Usage: node tests/arabic-catalog-427.test.js   → ARABIC_CATALOG_427_OK */
const assert = require('assert/strict'), path = require('path'), { pathToFileURL } = require('url');
(async () => {
  const load = async (f) => (await import(pathToFileURL(path.join(__dirname, '..', 'platform', 'i18n', f)).href)).default;
  const en = await load('en.js'), ar = await load('ar.js');
  const flat = (o, pre = '', out = {}) => { for (const [k, v] of Object.entries(o)) { const n = pre ? pre + '.' + k : k; if (v && typeof v === 'object' && !Array.isArray(v)) flat(v, n, out); else out[n] = v; } return out; };
  const E = flat(en), A = flat(ar);
  const base = (k) => k.replace(/\.(zero|one|two|few|many|other|=0)$/, '');
  const arBases = new Set(Object.keys(A).map(base));
  const missing = Object.keys(E).filter((k) => !(k in A) && !arBases.has(base(k)));
  assert.deepEqual(missing, [], 'every English key has its Arabic: ' + missing.join(', '));
  assert.equal(ar.dialog.close, 'إغلاق', 'dialog.close is إغلاق');
  assert.equal(en.common, undefined, 'the unread common section is gone');
  for (const k of ['wizard.finish', 'wizard.step', 'wizard.error', 'emptyState.title', 'emptyState.description', 'emptyState.action']) assert.ok(!(k in E), k + ' is gone');
  console.log('ARABIC_CATALOG_427_OK');
})().catch((e) => { console.error(e); process.exit(1); });
