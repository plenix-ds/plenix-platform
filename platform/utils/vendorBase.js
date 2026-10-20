/* Plenix · vendorBase
   Summary: Resolves the shared vendor folder for optional engines.
   Usage: vendorBase() + the engine path.
   Props: window.PlenixVendorBase explicitly overrides the Platform script's local vendor folder.
   Behavior: Captures the script address while the module runs. Without a script or explicit base, throws; never picks a remote CDN.
   Notes: Shared URL resolution only; loads no engine. */
// the Platform script's own address, read while the bundle runs (document.currentScript is gone afterwards)
const SCRIPT = /* @__PURE__ */ (() => typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : '')();

// the same, found among the page's scripts when the bundle ran its modules later
function platformScript() {
  if (SCRIPT) return SCRIPT;
  if (typeof document === 'undefined') return '';
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
  throw new Error('Plenix optional engine needs an explicit window.PlenixVendorBase when no Platform script is present');
}

