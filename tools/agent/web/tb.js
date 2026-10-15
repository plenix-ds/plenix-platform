const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/platform/providers/theme-boot.js';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`     data-plx-mode: on <html>: "light" (default) | "dark" | "system" (follows the system setting live)`,
`     data-plx-mode: on <html>: "system" (default: the person's choice, else the system setting, followed live) | "light" | "dark"
       (fixes the page, whatever the person chose: the image editor is always dark)
     PlenixWorkspace.setMode(m), mode(): the person's appearance, "system" (default) | "light" | "dark", kept for every page`);
rep(`     PlenixWorkspace.setPanelWidth(panel, px)`, `     PlenixWorkspace.setPanelWidth(panel, px)`);
rep(`  // mode: <html data-plx-mode="system"> follows the system setting live (light or dark; data-plx-mode-auto marks it);
  // "light" or "dark" fixes it. (Moved here from the asset app's include.js.)
  var sysDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  if (root.getAttribute('data-plx-mode') === 'system') root.setAttribute('data-plx-mode-auto', '');
  function followSystem() {
    if (!root.hasAttribute('data-plx-mode-auto')) return;
    root.setAttribute('data-plx-mode', sysDark && sysDark.matches ? 'dark' : 'light');
  }
  followSystem();
  if (sysDark && sysDark.addEventListener) sysDark.addEventListener('change', followSystem);`,
`  // mode (Platforms Standard 1.6): the app follows the system appearance live unless the person chooses light or dark. The
  // person's choice (PlenixWorkspace.setMode, kept under plenix.mode; the suite's older prefs.theme counts until then)
  // applies to every page whose <html> has data-plx-mode="system" or none; a page that writes "light" or "dark" keeps it.
  // "system" resolves to light or dark from prefers-color-scheme, live (data-plx-mode-auto marks it).
  var MODE_KEY = 'plenix.mode', MODES = ['system', 'light', 'dark'];
  var pageMode = root.getAttribute('data-plx-mode'), fixedMode = pageMode === 'light' || pageMode === 'dark';
  var sysDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function chosenMode() {
    var m = null;
    try { m = localStorage.getItem(MODE_KEY); if (MODES.indexOf(m) < 0) m = (JSON.parse(localStorage.getItem('plenix.prefs')) || {}).theme; } catch (e) { m = null; }
    return MODES.indexOf(m) >= 0 ? m : 'system';
  }
  function applyMode() {
    if (fixedMode) return;
    var m = chosenMode();
    if (m === 'system') { root.setAttribute('data-plx-mode-auto', ''); m = sysDark && sysDark.matches ? 'dark' : 'light'; }
    else root.removeAttribute('data-plx-mode-auto');
    if (root.getAttribute('data-plx-mode') !== m) root.setAttribute('data-plx-mode', m);
  }
  function followSystem() { if (root.hasAttribute('data-plx-mode-auto')) root.setAttribute('data-plx-mode', sysDark && sysDark.matches ? 'dark' : 'light'); }
  applyMode();
  if (sysDark && sysDark.addEventListener) sysDark.addEventListener('change', followSystem);
  function setMode(m) {
    if (MODES.indexOf(m) < 0) return;
    try { localStorage.setItem(MODE_KEY, m); } catch (e) { /* this visit only */ }
    var before = chosenMode() === m ? null : m;   // storage unavailable: still apply it to this page
    if (before) { if (!fixedMode) { root.setAttribute('data-plx-mode', m === 'system' ? (sysDark && sysDark.matches ? 'dark' : 'light') : m); if (m === 'system') root.setAttribute('data-plx-mode-auto', ''); else root.removeAttribute('data-plx-mode-auto'); } }
    else applyMode();
    window.dispatchEvent(new CustomEvent('plenix:modechange', { detail: { mode: m } }));
  }
  // another open page changed it: follow live
  window.addEventListener('storage', function (e) {
    if (e.key !== MODE_KEY) return;
    applyMode(); window.dispatchEvent(new CustomEvent('plenix:modechange', { detail: { mode: chosenMode() } }));
  });`);
rep(`    setTheme: setTheme, clearTheme: clearTheme, theme: function () { return root.getAttribute('data-plx-theme'); },`,
`    setTheme: setTheme, clearTheme: clearTheme, theme: function () { return root.getAttribute('data-plx-theme'); },
    setMode: setMode, mode: chosenMode,`);
fs.writeFileSync(f,s);
