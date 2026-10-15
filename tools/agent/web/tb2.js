const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/platform/providers/theme-boot.js';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`  function applyMode() {
    if (fixedMode) return;
    var m = chosenMode();`,`  function applyMode(m) {
    if (fixedMode) return;
    m = m || chosenMode();`);
rep(`    try { localStorage.setItem(MODE_KEY, m); } catch (e) { /* this visit only */ }
    var before = chosenMode() === m ? null : m;   // storage unavailable: still apply it to this page
    if (before) { if (!fixedMode) { root.setAttribute('data-plx-mode', m === 'system' ? (sysDark && sysDark.matches ? 'dark' : 'light') : m); if (m === 'system') root.setAttribute('data-plx-mode-auto', ''); else root.removeAttribute('data-plx-mode-auto'); } }
    else applyMode();
`,`    try { localStorage.setItem(MODE_KEY, m); } catch (e) { /* this visit only */ }
    applyMode(m);
`);
fs.writeFileSync(f,s);
