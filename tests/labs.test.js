// Plenix tests · the design system's component labs (component-lab.js, form-labs.js; batches 252-256): for every lab, at
// every size, variant, state and content, each property's token (spec.token) is set to a marker on the page and the
// property its Edit dialog field names must take that marker. A field whose token does not move its property fails: the
// Edit dialog would edit the wrong token. Button is checked by tests/visual.test.js (its lab is too large to run here).
//   node tests/labs.test.js
//   LABS_ONLY=tabs,toast LABS_PORT=8821 node tests/labs.test.js   only those labs, on another port (several runs side by side)
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.LABS_PORT || 8811;
const ONLY = process.env.LABS_ONLY ? process.env.LABS_ONLY.split(',') : null;

if (!fs.existsSync(path.join(__dirname, '..', 'platform', 'design-system', 'index.html'))) {
  console.log('NOTE: platform/design-system is not checked out; the labs are skipped');
  console.log('LABS_OK 0 labs (skipped)');
  process.exit(0);
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:' + PORT + '/Plenix/platform/design-system/index.html', { waitUntil: 'networkidle0' }); await sleep(1500);
  const ids = (await page.evaluate(() => Object.keys(window.DS.labs || {}).filter((id) => id !== 'button'))).filter((id) => !ONLY || ONLY.includes(id));
  const results = [];
  for (const id of ids) {
    // one call per size and variant: a large lab in a single call ran past the protocol timeout (CI, 2026-10-13)
    const axes = await page.evaluate((id) => { const spec = DS.labs[id]; return spec.sizes.flatMap(([size]) => spec.variants.map(([variant]) => [size, variant])); }, id);
    const r = { checks: 0, tokens: 0, bad: [], nbad: 0 }; const seen = new Set();
    for (const [onlySize, onlyVariant] of axes) {
    const part = await page.evaluate((id, onlySize, onlyVariant) => {
      const spec = DS.labs[id];
      // the lab's documentation states: :hover, :focus-visible and :active copied onto .ds-hover / .ds-focus / .ds-pressed
      if (!window.__labStates) {
        const walk = (list, owner) => { for (let i = list.length - 1; i >= 0; i--) { const x = list[i]; if (x.styleSheet) { try { walk(x.styleSheet.cssRules, x.styleSheet); } catch (e) { /* unreadable */ } continue; }
          if (x.cssRules && !x.selectorText) { walk(x.cssRules, x); continue; }
          if (x.selectorText && /:hover|:focus-visible|:active/.test(x.selectorText)) { try { owner.insertRule(x.selectorText.replace(/:hover/g, '.ds-hover').replace(/:focus-visible/g, '.ds-focus').replace(/:active/g, '.ds-pressed') + '{' + x.style.cssText + '}', i + 1); } catch (e) { /* rejected */ } } } };
        Array.from(document.styleSheets).forEach((s) => { try { walk(s.cssRules, s); } catch (e) { /* unreadable */ } });
        window.__labStates = true;
      }
      const MARK = { color: ['rgb(1, 2, 3)', (v) => /\b1, 2, 3\b/.test(v)], 'control-height': ['77px', (v) => v === '77px'], size: ['77px', (v) => v === '77px'], space: ['37px', (v) => v === '37px'],
        icon: ['17px', (v) => v === '17px'], opacity: ['0.37', (v) => v === '0.37'], columns: ['123px minmax(0, 1fr)', (v) => /^123px /.test(v)], transform: ['translateX(7px)', (v) => /, 7, 0\)$/.test(v)],
        radius: ['9px', (v) => v === '9px'], 'border-width': ['5px', (v) => v === '5px'], font: ['"Courier New"', (v) => /Courier New/.test(v)],
        'font-size': ['19px', (v) => v === '19px'], 'font-weight': ['900', (v) => v === '900'], 'line-height': ['31px', (v) => v === '31px'], shadow: ['rgb(1, 2, 3) 0px 0px 0px 3px', (v) => /1, 2, 3/.test(v)] };
      const host = document.createElement('div'); document.body.appendChild(host);
      const root = document.documentElement.style;
      let checks = 0; const bad = []; const tokens = new Set();
      for (const [size] of spec.sizes.filter(([x]) => x === onlySize)) for (const [variant] of spec.variants.filter(([x]) => x === onlyVariant)) for (const [state] of spec.states) for (const [content] of spec.content) {
        host.innerHTML = spec.html(variant, size, state, 'lab-specimen', { size, variant, state, content });
        if (spec.after) spec.after(document);
        const el = host.querySelector('.lab-specimen');
        for (const p of spec.props) {
          const full = spec.token(p.id, size, variant, state, content); if (!full) continue;
          const m = MARK[p.cat]; if (!m) { bad.push(p.id + ': no marker for the category ' + p.cat); continue; }
          tokens.add(full);
          const target = p.host === 'parent' ? el.parentElement : p.part ? el.querySelector(p.part) : el;
          if (!target) { bad.push([size, variant, state, content].join('/') + ' ' + p.id + ': its part ' + p.part + ' is not drawn'); continue; }
          const read = () => getComputedStyle(target, p.pseudo || null).getPropertyValue(p.show || p.v || p.css[0]).trim();
          const before = read();
          root.setProperty('--' + full, m[0]); const after = read(); root.removeProperty('--' + full);
          checks++;
          if (!m[1](after)) bad.push([size, variant, state, content].join('/') + ' ' + p.id + ': --' + full + ' set to ' + m[0] + ' but ' + (p.show || p.css[0]) + ' reads ' + after + ' (was ' + before + ')');
        }
      }
      host.remove();
      return { checks, tokens: [...tokens], bad: bad.slice(0, 5), nbad: bad.length };
    }, id, onlySize, onlyVariant);
    r.checks += part.checks; part.tokens.forEach((t) => seen.add(t)); r.bad.push(...part.bad); r.nbad += part.nbad;
    }
    r.tokens = seen.size; r.bad = r.bad.slice(0, 5);
    results.push([id, r]);
  }
  await browser.close(); server.close();
  const failed = results.filter((x) => x[1].nbad);
  results.forEach(([id, r]) => { console.log((r.nbad ? '  FAIL ' : '  ok   ') + id + ': ' + r.checks + ' checks, ' + r.tokens + ' tokens'); r.bad.forEach((b) => console.log('       ' + b)); });
  console.log((failed.length ? 'LABS_FAIL ' : 'LABS_OK ') + (results.length - failed.length) + '/' + results.length + ' labs');
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
