/* Plenix · prefetch (platform/utils/prefetch.js): the next page is ready before the click (batch 237). Internal; not part
   of the public API: the Platform bundle runs it once, on every page that loads the Platform over http(s).
   Chromium browsers get speculation rules: a link to another page of the same site is prerendered when the pointer
   rests on it (about 200ms) or presses it, so switching apps shows the finished page at once instead of a blank reload.
   Other browsers get the page's document fetched into the cache on hover. Links that open elsewhere (target, download),
   same-page anchors and links marked data-plx-no-prefetch are left alone. Nothing runs from file://. */
const SKIP = '[target], [download], [data-plx-no-prefetch], [href^="#"]';

function speculationRules(doc) {
  if (!(window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules'))) return false;
  const rules = { prerender: [{ where: { and: [{ href_matches: '/*' }, { not: { selector_matches: SKIP } }] }, eagerness: 'moderate' }] };
  const s = doc.createElement('script');
  s.type = 'speculationrules';
  s.textContent = JSON.stringify(rules);
  doc.head.appendChild(s);
  return true;
}

function hoverPrefetch(doc) {
  const done = new Set();
  doc.addEventListener('pointerover', (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.matches(SKIP)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname || done.has(url.pathname)) return;
    done.add(url.pathname);
    const link = doc.createElement('link');
    link.rel = 'prefetch'; link.href = url.origin + url.pathname + url.search;
    doc.head.appendChild(link);
  }, { passive: true });
}

if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.head && /^https?:$/.test(location.protocol)) {
  if (!speculationRules(document)) hoverPrefetch(document);
}
