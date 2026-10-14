/* Plenix · DataTable engine (tabulator.js)
   Summary: Loads the engine every DataTable runs on: Tabulator 6.6.1 (MIT), vendored in platform/vendor/tabulator.
   Usage:
     loadTabulator().then((Tabulator) => new Tabulator(element, options));
     const width = tablePx('--plx-ref-size-36px');
   Props:
     loadTabulator(win): adds Tabulator's core stylesheet and script to the page once (the given window's, default this
       one: a grid in a frame uses its frame's Tabulator), and resolves with that window's Tabulator
     tablePx(token, element): a size token's value in pixels (Tabulator takes column widths as numbers); 0 when unknown
     prefetchTabulator(): fetches the two files into the browser's cache without running them (no-op when loaded)
     vendorBase(): the address of the vendor folder (see Behavior); the RichTextEditor engine loads from it too
   Behavior:
     Only the first grid on a page loads the files; later grids reuse the same promise. A page that already loaded
     Tabulator itself is used as is.
     Early load (batch 237): a page whose first screen has a table calls DataTable.preload() (or Table.preload()) as
     its script starts, so Tabulator arrives while React draws the page instead of after the grid mounts. Every other
     page prefetches the files once the browser is idle after load, so the first table anywhere opens from the cache.
     The core stylesheet goes first in the head, so platform.css (the Plenix look, data-table.css) wins over it.
     The vendor folder is found from the Platform script's address (platform/dist/platform.js -> platform/vendor/; a CDN
     build's plenix.js -> ./vendor/); in the npm package bundled into an app (no Plenix script on the page) it is the
     release's CDN copy, https://design-system.lighthouseway.org/cdn/<version>/vendor/ (batch 251);
     window.PlenixVendorBase (a folder URL ending in /) overrides it.
   Notes:
     A failed load rejects and is forgotten; the DataTable shows its error state (the reason and Retry) in place of the
     grid, and Retry loads the files again. */

import { strictTabulator } from './strict.js';

// the Platform script's own address, read while the bundle runs (document.currentScript is gone afterwards)
const SCRIPT = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '';

// the same, found among the page's scripts when the bundle ran its modules later
function platformScript() {
  if (SCRIPT) return SCRIPT;
  const s = Array.from(document.scripts).map((x) => x.src).find((src) => /\/(dist\/platform|plenix)(\.min)?\.js(\?|$)/.test(src));
  return s || '';
}

// the vendor folder (also used by the RichTextEditor engine loader, RichTextEditor/tiptap.js)
export function vendorBase() {
  if (typeof window !== 'undefined' && window.PlenixVendorBase) return String(window.PlenixVendorBase).replace(/\/?$/, '/');
  const src = platformScript();
  if (src) return new URL(/\/dist\/[^/?]+(\?.*)?$/.test(src) ? '../vendor/' : './vendor/', src).href;
  // the npm package: build-packages.js defines this release's CDN vendor folder (versioned, never changes)
  if (typeof __PLENIX_VENDOR__ !== 'undefined') return __PLENIX_VENDOR__; // eslint-disable-line no-undef
  return 'platform/vendor/';
}

// one load per window: a grid in a frame (the design system's labs) runs on its own window's Tabulator, which only
// accepts elements of its own document
const loading = new WeakMap();
export function loadTabulator(win) {
  const w = win || (typeof window !== 'undefined' ? window : null);
  if (!w) return Promise.reject(new Error('Tabulator needs a browser'));
  // every Tabulator is made strict before a grid is built (strict.js: it writes no style; Strict DS 6b, batch 285)
  const strict = (T) => strictTabulator(T, w).then(() => T);
  if (w.Tabulator) return strict(w.Tabulator);
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
    // a failed load is forgotten, so the error state's Retry loads the files again
    script.onload = () => { if (w.Tabulator) resolve(strict(w.Tabulator)); else { loading.delete(w); script.remove(); reject(new Error('Tabulator did not load from ' + script.src)); } };
    script.onerror = () => { loading.delete(w); script.remove(); reject(new Error('Tabulator could not be loaded from ' + script.src)); };
    doc.head.appendChild(script);
  });
  loading.set(w, p);
  return p;
}

// the files into the HTTP cache at low priority, not run: the first grid then loads them from the cache
export function prefetchTabulator() {
  if (typeof document === 'undefined' || window.Tabulator || loading.has(window)) return;
  if (document.querySelector('link[data-plx-vendor-prefetch="tabulator"]')) return;
  const base = vendorBase() + 'tabulator/';
  ['tabulator.min.js', 'tabulator.min.css'].forEach((f) => {
    const link = document.createElement('link');
    link.rel = 'prefetch'; link.href = base + f; link.setAttribute('data-plx-vendor-prefetch', 'tabulator');
    document.head.appendChild(link);
  });
}

// every page: prefetch once the page has loaded and the browser is idle (a table page has already started the real load)
if (typeof window !== 'undefined' && typeof document !== 'undefined' && typeof window.addEventListener === 'function') {
  const idle = () => (window.requestIdleCallback ? window.requestIdleCallback(prefetchTabulator, { timeout: 3000 }) : setTimeout(prefetchTabulator, 1000));
  if (document.readyState === 'complete') idle(); else window.addEventListener('load', idle, { once: true });
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
