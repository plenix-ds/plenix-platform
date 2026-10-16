/* Plenix · browserSupport
   Summary: Reports the capabilities used by the Platform, without browser sniffing or changing the page.
   Usage:
     const report = browserSupport(window); // application decides how to explain a missing capability
   Props:
     environment: a window-like object; defaults to window when a browser is present
   Behavior:
     Returns boolean feature flags and a missing list. No polyfill is downloaded and no browser is blocked.
   Notes:
     The support policy and existing fallbacks are documented in platform/standards/browsers.json. */
export function browserSupport(environment = typeof window === 'undefined' ? {} : window) {
  const e = environment || {}, callable = (object, name) => !!object && typeof object[name] === 'function';
  const prototype = (constructor) => constructor && constructor.prototype && typeof constructor.prototype === 'object' ? constructor.prototype : {};
  const supports = (name, value) => callable(e.CSS, 'supports') && !!e.CSS.supports(name, value);
  const features = { modules: 'noModule' in prototype(e.HTMLScriptElement),
    grid: supports('display', 'grid'), dialog: callable(prototype(e.HTMLDialogElement), 'showModal'),
    popover: callable(prototype(e.HTMLElement), 'showPopover'), anchor: supports('anchor-name', '--plx-anchor'),
    container: supports('container-type', 'inline-size'), intl: callable(e.Intl, 'NumberFormat') && callable(e.Intl, 'DateTimeFormat') };
  return { features, missing: Object.keys(features).filter((key) => !features[key]) };
}
