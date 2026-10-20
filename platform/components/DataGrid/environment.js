/* Plenix · DataGridEngine environment
   Summary: Engine-independent CSS token resolution.
   Usage: Internal to DataGridEngine; no legacy grid modules are imported.
   Props: A token/length and optional element.
   Behavior: Reads dimensions from inherited CSS tokens.
   Notes: Contains no engine loader or runtime stylesheet requests. */
export function tokenPixels(token, el) {
  if (!token || typeof document === 'undefined') return 0;
  const m = /^(--[\w-]+)$|^var\(\s*(--[\w-]+)\s*\)$/.exec(String(token).trim());
  if (!m) {
    if (typeof token === 'number' || /^\d+(?:\.\d+)?px$/.test(String(token))) return parseFloat(token) || 0;
    const host = el || document.documentElement, doc = host.ownerDocument || document, win = doc.defaultView;
    if (!win.CSS.supports('inline-size', String(token)) || !win.CSSStyleSheet || !('adoptedStyleSheets' in doc)) return 0;
    // Measure a caller CSS length in the container's inherited font and available width, without an inline style or a retained rule.
    const sheet = new win.CSSStyleSheet(), before = doc.adoptedStyleSheets, probe = doc.createElement('span');
    sheet.replaceSync('.plx-data-grid__length-probe{inline-size:' + String(token) + ';}');
    probe.className = 'plx-data-grid__length-probe';
    try { doc.adoptedStyleSheets = before.concat(sheet); host.appendChild(probe); return probe.getBoundingClientRect().width || 0; }
    finally { probe.remove(); doc.adoptedStyleSheets = before; }
  }
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(m[1] || m[2]).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  return /^\d+(?:\.\d+)?px$/.test(v) ? parseFloat(v) : v ? tokenPixels(v, el) : 0;
}
