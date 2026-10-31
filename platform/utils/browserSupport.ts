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
// the window-like object the report reads (any of its parts may be missing)
type Environment = { [name: string]: unknown; CSS?: { supports?(name: string, value: string): boolean }; Intl?: object };
export type BrowserFeature = 'modules' | 'grid' | 'dialog' | 'popover' | 'anchor' | 'container' | 'intl';
export function browserSupport(environment: Environment | Window | null = typeof window === 'undefined' ? {} : window): { features: Record<BrowserFeature, boolean>; missing: BrowserFeature[] } {
  const e = (environment || {}) as Environment, callable = (object: unknown, name: string) => !!object && typeof (object as Record<string, unknown>)[name] === 'function';
  const prototype = (constructor: unknown): object => (constructor as { prototype?: object }) && (constructor as { prototype?: object }).prototype && typeof (constructor as { prototype?: object }).prototype === 'object' ? (constructor as { prototype: object }).prototype : {};
  const supports = (name: string, value: string) => callable(e.CSS, 'supports') && !!e.CSS!.supports!(name, value);
  const features: Record<BrowserFeature, boolean> = { modules: 'noModule' in prototype(e.HTMLScriptElement),
    grid: supports('display', 'grid'), dialog: callable(prototype(e.HTMLDialogElement), 'showModal'),
    popover: callable(prototype(e.HTMLElement), 'showPopover'), anchor: supports('anchor-name', '--plx-anchor'),
    container: supports('container-type', 'inline-size'), intl: callable(e.Intl, 'NumberFormat') && callable(e.Intl, 'DateTimeFormat') };
  return { features, missing: (Object.keys(features) as BrowserFeature[]).filter((key) => !features[key]) };
}
