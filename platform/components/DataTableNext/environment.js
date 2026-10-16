/* Plenix · DataTableNext environment
   Summary: Engine-independent CSS token resolution and structural stylesheet location.
   Usage: Internal to DataTableNext; no legacy grid modules are imported.
   Props: A token/length and optional element, or the configured vendor asset base.
   Behavior: Reads dimensions from CSS and locates the existing structural stylesheet only.
   Notes: Contains no script loader, prefetch, Tabulator constructor or prototype patches. */
const SCRIPT=typeof document!=='undefined'&&document.currentScript?document.currentScript.src:'';
export function structuralStylesheet(){
  if(typeof window!=='undefined'&&window.PlenixVendorBase)return String(window.PlenixVendorBase).replace(/\/?$/,'/')+'tabulator/tabulator.min.css';
  const src=SCRIPT||(typeof document!=='undefined'?[...document.scripts].map(s=>s.src).find(s=>/\/(dist\/platform|plenix(\.global)?)(\.min)?\.js(\?|$)/.test(s)):'');
  if(src)return new URL('tabulator/tabulator.min.css',new URL(/\/dist\/platform(\.min)?\.js(\?.*)?$/.test(src)?'../vendor/':'./vendor/',src)).href;
  if(typeof __PLENIX_VENDOR__!=='undefined')return __PLENIX_VENDOR__+'tabulator/tabulator.min.css';
  return 'platform/vendor/tabulator/tabulator.min.css';
}
export function tokenPixels(token, el) {
  if (!token || typeof document === 'undefined') return 0;
  const m = /^(--[\w-]+)$|^var\(\s*(--[\w-]+)\s*\)$/.exec(String(token).trim());
  if (!m) {
    if (typeof token === 'number' || /^\d+(?:\.\d+)?px$/.test(String(token))) return parseFloat(token) || 0;
    const host = el || document.documentElement, doc = host.ownerDocument || document, win = doc.defaultView;
    if (!win.CSS.supports('inline-size', String(token)) || !win.CSSStyleSheet || !('adoptedStyleSheets' in doc)) return 0;
    // Measure a caller CSS length in the container's inherited font and available width, without an inline style or a retained rule.
    const sheet = new win.CSSStyleSheet(), before = doc.adoptedStyleSheets, probe = doc.createElement('span');
    sheet.replaceSync('.plx-data-table__length-probe{inline-size:' + String(token) + ';}');
    probe.className = 'plx-data-table__length-probe';
    try { doc.adoptedStyleSheets = before.concat(sheet); host.appendChild(probe); return probe.getBoundingClientRect().width || 0; }
    finally { probe.remove(); doc.adoptedStyleSheets = before; }
  }
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(m[1] || m[2]).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  return /^\d+(?:\.\d+)?px$/.test(v) ? parseFloat(v) : v ? tokenPixels(v, el) : 0;
}
