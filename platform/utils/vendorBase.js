/* Plenix · vendorBase
   Summary: Resolves the shared vendor folder for optional engines.
   Usage: vendorBase() + the engine path.
   Props: window.PlenixVendorBase overrides the Platform script or versioned package URL.
   Behavior: Captures the script address while the module runs; falls back to the package CDN.
   Notes: Shared URL resolution only; loads no engine. */
// the Platform script's own address, read while the bundle runs (document.currentScript is gone afterwards)
const SCRIPT = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '';

// the same, found among the page's scripts when the bundle ran its modules later
function platformScript() {
  if (SCRIPT) return SCRIPT;
  const s = Array.from(document.scripts).map((x) => x.src).find((src) => /\/(dist\/platform|plenix(\.global)?)(\.min)?\.js(\?|$)/.test(src));
  return s || '';
}

// the vendor folder: the repository's
// platform/dist/platform.js finds it at platform/vendor/; every other copy of the script has it beside itself (the CDN's
// plenix.js: ./vendor/; the npm package's dist/plenix.global.js: dist/vendor/, where build-packages.js puts it)
export function vendorBase() {
  if (typeof window !== 'undefined' && window.PlenixVendorBase) return String(window.PlenixVendorBase).replace(/\/?$/, '/');
  const src = platformScript();
  if (src) return new URL(/\/dist\/platform(\.min)?\.js(\?.*)?$/.test(src) ? '../vendor/' : './vendor/', src).href;
  // the npm package: build-packages.js defines this release's CDN vendor folder (versioned, never changes)
  if (typeof __PLENIX_VENDOR__ !== 'undefined') return __PLENIX_VENDOR__; // eslint-disable-line no-undef
  return 'platform/vendor/';
}

