/* Plenix · DirectionProvider, useDirection
   Summary: Sets the writing direction (left to right or right to left) of an application or of one region, and tells
     React components which it is.
   Usage:
     <DirectionProvider dir="rtl" lang="ar">{app}</DirectionProvider>
     <DirectionProvider locale="he-IL" root>{app}</DirectionProvider>   // on <html>: the whole page
     const { dir, setDir } = useDirection();
   Props:
     dir: "ltr" | "rtl"; without it, the direction of locale, else of the page
     locale: a language tag ("ar-EG", "en-US"); it sets lang and, without dir, the direction (directionOf)
     lang: the lang attribute, when it is not the locale
     root: set dir and lang on <html> instead of a region (default false): the page, its portals and its scrollbars mirror
     children: the application root or the region it wraps
     useDirection(): { dir, rtl, setDir(dir) }: the nearest provider's direction (outside one, the page's), and a way to
       change it
   Behavior:
     A region: a wrapper (div.plx-direction, display: contents, so it adds no box) with dir and lang; everything inside
       it lays out in that direction, as the stylesheets use logical properties.
     With root, the attributes go on <html> and are put back as they were when the provider unmounts.
     Overlays drawn in a Portal take the direction of where they were written (the Portal copies dir and lang).
   Notes:
     Mirror the layout, not the content: text, numbers, media controls, clocks and the icons that are not directional
       keep their shape; the icon set mirrors its directional icons (arrows, chevrons, undo and redo) by itself.
     Script reads the direction where it measures or handles arrow keys (utils/direction.js: arrowStep, physicalSide).
*/
import React from 'react';
import { directionOf, getDirection } from '../utils/direction.js';

export const DirectionContext = React.createContext(null);

export function DirectionProvider({ dir, locale, lang, root = false, children }) {
  const wanted = dir || (locale ? directionOf(locale) : null);
  const [own, setOwn] = React.useState(wanted);
  React.useEffect(() => { setOwn(wanted); }, [wanted]);
  const current = own || (typeof document !== 'undefined' ? getDirection() : 'ltr');
  const language = lang || locale || undefined;
  React.useLayoutEffect(() => {
    if (!root) return undefined;
    const html = document.documentElement, before = { dir: html.getAttribute('dir'), lang: html.getAttribute('lang') };
    html.setAttribute('dir', current);
    if (language) html.setAttribute('lang', language);
    return () => {
      if (before.dir == null) html.removeAttribute('dir'); else html.setAttribute('dir', before.dir);
      if (language) { if (before.lang == null) html.removeAttribute('lang'); else html.setAttribute('lang', before.lang); }
    };
  }, [root, current, language]);
  const value = React.useMemo(() => ({ dir: current, rtl: current === 'rtl', setDir: (d) => setOwn(d === 'rtl' ? 'rtl' : 'ltr') }), [current]);
  return (
    <DirectionContext.Provider value={value}>
      {root ? children : <div className="plx-direction" dir={current} lang={language}>{children}</div>}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const ctx = React.useContext(DirectionContext);
  const [page, setPage] = React.useState(() => (typeof document !== 'undefined' ? getDirection() : 'ltr'));
  React.useEffect(() => {
    if (ctx) return undefined;
    const observer = new MutationObserver(() => setPage(getDirection()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
    return () => observer.disconnect();
  }, [ctx]);
  if (ctx) return ctx;
  return { dir: page, rtl: page === 'rtl', setDir: (d) => document.documentElement.setAttribute('dir', d === 'rtl' ? 'rtl' : 'ltr') };
}
