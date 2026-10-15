const fs = require('fs');
const p = 'D:/Documents/Projects/Projects_Applications/Plenix/tests/navigation.test.js';
let s = fs.readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing: ' + a.slice(0, 80)); s = s.replace(a, b); };
rep(`      check(app + ' at 390px: Back to the list leads the detail', /^Back to /.test((await text(page, '.plx-secondary-pane-back')) || ''));
      check(app + ' at 390px: focus is on Back', await page.evaluate(() => !!document.activeElement.closest('.plx-secondary-pane-back')));`,
`      // one back control: the shell's parent row (NavPane) becomes the Back while the detail shows; a pane whose shell has
      // no parent row (a bottom navigation bar) draws its own Back bar
      const BACK = '.plx-nav-pane-parent button, .plx-secondary-pane-back button';
      const backs = await page.$$eval(BACK, (x) => x.filter((b) => b.offsetParent).map((b) => b.textContent.trim()));
      check(app + ' at 390px: Back to the list leads the detail', backs.length === 1 && /^Back to /.test(backs[0]), JSON.stringify(backs));
      check(app + ' at 390px: focus is on Back', await page.evaluate((sel) => !!document.activeElement.closest('.plx-nav-pane-parent, .plx-secondary-pane-back') && document.activeElement.matches(sel), BACK));`);
rep(`      await page.evaluate(() => document.querySelector('.plx-secondary-pane-back button').click()); await settle();`,
`      await page.evaluate((sel) => [...document.querySelectorAll(sel)].find((b) => b.offsetParent && /^Back to /.test(b.textContent.trim())).click(), BACK); await settle();`);
fs.writeFileSync(p, s);
console.log('ok');
