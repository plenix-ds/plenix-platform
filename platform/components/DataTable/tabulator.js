/* Plenix · DataTable engine (tabulator.js)
   Summary: Loads the engine every DataTable runs on: Tabulator 6.6.1 (MIT), vendored in platform/vendor/tabulator.
   Usage:
     loadTabulator().then((Tabulator) => new Tabulator(element, options));
     const width = tablePx('--plx-ref-size-36px');
   Props:
     loadTabulator(win): adds Tabulator's core stylesheet and script to the page once (the given window's, default this
       one: a grid in a frame uses its frame's Tabulator), and resolves with that window's Tabulator
     tablePx(token, element): a size token's value in pixels (Tabulator takes column widths as numbers); 0 when unknown
   Behavior:
     Only the first grid on a page loads the files; later grids reuse the same promise. A page that already loaded
     Tabulator itself is used as is.
     The core stylesheet goes first in the head, so platform.css (the Plenix look, data-table.css) wins over it.
     The vendor folder is found from the Platform script's address (platform/dist/platform.js -> platform/vendor/; a CDN
     build's plenix.js -> ./vendor/); window.PlenixVendorBase (a folder URL ending in /) overrides it.
   Notes:
     A failed load rejects; the DataTable shows the reason in place of the grid. */

// the Platform script's own address, read while the bundle runs (document.currentScript is gone afterwards)
const SCRIPT = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '';

// the same, found among the page's scripts when the bundle ran its modules later
function platformScript() {
  if (SCRIPT) return SCRIPT;
  const s = Array.from(document.scripts).map((x) => x.src).find((src) => /\/(dist\/platform|plenix)(\.min)?\.js(\?|$)/.test(src));
  return s || '';
}

function vendorBase() {
  if (typeof window !== 'undefined' && window.PlenixVendorBase) return String(window.PlenixVendorBase).replace(/\/?$/, '/');
  const src = platformScript();
  if (src) return new URL(/\/dist\/[^/?]+(\?.*)?$/.test(src) ? '../vendor/' : './vendor/', src).href;
  return 'platform/vendor/';
}

// one load per window: a grid in a frame (the design system's labs) runs on its own window's Tabulator, which only
// accepts elements of its own document
const loading = new WeakMap();
export function loadTabulator(win) {
  const w = win || (typeof window !== 'undefined' ? window : null);
  if (!w) return Promise.reject(new Error('Tabulator needs a browser'));
  if (w.Tabulator) return Promise.resolve(w.Tabulator);
  if (loading.has(w)) return loading.get(w);
  const doc = w.document, base = vendorBase() + 'tabulator/';
  const p = new Promise((resolve, reject) => {
    // the core stylesheet goes first in the head, so platform.css (Plenix's look) comes after it and wins
    if (!doc.querySelector('link[data-plx-vendor="tabulator"]')) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet'; link.href = base + 'tabulator.min.css'; link.setAttribute('data-plx-vendor', 'tabulator');
      doc.head.insertBefore(link, doc.head.firstChild);
    }
    const script = doc.createElement('script');
    script.src = base + 'tabulator.min.js'; script.async = true; script.setAttribute('data-plx-vendor', 'tabulator');
    script.onload = () => (w.Tabulator ? resolve(w.Tabulator) : reject(new Error('Tabulator did not load from ' + script.src)));
    script.onerror = () => { loading.delete(w); reject(new Error('Tabulator could not be loaded from ' + script.src)); };
    doc.head.appendChild(script);
  });
  loading.set(w, p);
  return p;
}

// a token's value on the page, as pixels: '--plx-ref-size-36px' -> 36; the token written inside var() is accepted too
export function tablePx(token, el) {
  if (!token || typeof document === 'undefined') return 0;
  const m = /--[\w-]+/.exec(String(token));
  if (!m) return parseFloat(token) || 0;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(m[0]).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  return parseFloat(v) || 0;
}
