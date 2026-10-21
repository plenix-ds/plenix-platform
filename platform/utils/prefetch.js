/* Plenix · enablePrefetch (platform/utils/prefetch.js)
   Summary: Opt-in document prefetching for links the application explicitly marks. Importing does nothing.
   Usage: const stop = enablePrefetch({ selector: 'a[data-plx-prefetch]', eagerness: 'conservative' });
   Props: selector selects approved links; eagerness is conservative (pointer press only); document optionally selects
     a frame's document. Returns a cleanup function. In SSR or file pages, returns a no-op.
   Behavior: Never prerenders, creates speculation rules or inserts inline scripts. Only same-origin http(s) document
     links are prefetched, at most once per URL. Downloads, targets, anchors and data-plx-no-prefetch are excluded.
   Notes: The application must mark only routes that are safe to fetch. Call the returned function when disabling it. */
const SKIP = '[target], [download], [data-plx-no-prefetch], [href^="#"]';
const active = new WeakMap();

export function enablePrefetch({ selector = 'a[data-plx-prefetch]', eagerness = 'conservative', document: doc = typeof document === 'undefined' ? null : document } = {}) {
  if (typeof selector !== 'string' || !selector.trim()) throw new TypeError('enablePrefetch needs a non-empty link selector');
  if (eagerness !== 'conservative') throw new TypeError('enablePrefetch supports only conservative eagerness');
  if (!doc || !doc.head || !doc.defaultView || !/^https?:$/.test(doc.defaultView.location.protocol)) return () => {};
  // Validate before registering, so a malformed application selector fails at the explicit opt-in call.
  doc.querySelector(selector);
  let registrations = active.get(doc);
  if (!registrations) { registrations = new Map(); active.set(doc, registrations); }
  if (registrations.has(selector)) return registrations.get(selector);
  const done = new Set(), links = new Set();
  const press = event => {
    const target = event.target && event.target.closest ? event.target : event.target && event.target.parentElement;
    const link = target && target.closest('a[href]');
    if (!link || !link.matches(selector) || link.matches(SKIP)) return;
    let current, url;
    try { current = new URL(doc.defaultView.location.href); url = new URL(link.href, current); } catch (_) { return; }
    if (!/^https?:$/.test(url.protocol) || url.origin !== current.origin || (url.pathname === current.pathname && url.search === current.search)) return;
    url.hash = '';
    if (done.has(url.href)) return;
    done.add(url.href);
    const hint = doc.createElement('link');
    hint.rel = 'prefetch'; hint.href = url.href;
    links.add(hint); doc.head.appendChild(hint);
  };
  doc.addEventListener('pointerdown', press, { passive: true });
  let stopped = false;
  const stop = () => {
    if (stopped) return;
    stopped = true;
    doc.removeEventListener('pointerdown', press);
    links.forEach(link => link.remove()); links.clear();
    registrations.delete(selector);
    if (!registrations.size) active.delete(doc);
  };
  registrations.set(selector, stop);
  return stop;
}
