/* Plenix · DataGrid engine (tabulator.js)
   Summary: Loads the engine every DataGrid runs on: Tabulator 6.6.1 (MIT), vendored in platform/vendor/tabulator.
   Usage:
     loadTabulator().then((Tabulator) => new Tabulator(element, options));
     const width = gridPx('--plx-ref-size-36px');
   Props:
     loadTabulator(): adds Tabulator's core stylesheet and script to the page once, and resolves with window.Tabulator
     gridPx(token, element): a size token's value in pixels (Tabulator takes column widths as numbers); 0 when unknown
   Behavior:
     Only the first grid on a page loads the files; later grids reuse the same promise. A page that already loaded
     Tabulator itself is used as is.
     The core stylesheet goes first in the head, so platform.css (the Plenix look, data-grid.css) wins over it.
     The vendor folder is found from the Platform script's address (platform/dist/platform.js -> platform/vendor/; a CDN
     build's plenix.js -> ./vendor/); window.PlenixVendorBase (a folder URL ending in /) overrides it.
   Notes:
     A failed load rejects; the DataGrid shows the reason in place of the grid. */

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

let loading = null;
export function loadTabulator() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Tabulator needs a browser'));
  if (window.Tabulator) return Promise.resolve(window.Tabulator);
  if (loading) return loading;
  const base = vendorBase() + 'tabulator/';
  loading = new Promise((resolve, reject) => {
    // the core stylesheet goes first in the head, so platform.css (Plenix's look) comes after it and wins
    if (!document.querySelector('link[data-plx-vendor="tabulator"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = base + 'tabulator.min.css'; link.setAttribute('data-plx-vendor', 'tabulator');
      document.head.insertBefore(link, document.head.firstChild);
    }
    const script = document.createElement('script');
    script.src = base + 'tabulator.min.js'; script.async = true; script.setAttribute('data-plx-vendor', 'tabulator');
    script.onload = () => (window.Tabulator ? resolve(window.Tabulator) : reject(new Error('Tabulator did not load from ' + script.src)));
    script.onerror = () => { loading = null; reject(new Error('Tabulator could not be loaded from ' + script.src)); };
    document.head.appendChild(script);
  });
  return loading;
}

// a token's value on the page, as pixels: '--plx-ref-size-36px' -> 36; the token written inside var() is accepted too
export function gridPx(token, el) {
  if (!token || typeof document === 'undefined') return 0;
  const m = /--[\w-]+/.exec(String(token));
  if (!m) return parseFloat(token) || 0;
  const v = getComputedStyle(el || document.documentElement).getPropertyValue(m[0]).trim();
  if (/rem$/.test(v)) return parseFloat(v) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
  return parseFloat(v) || 0;
}
