/* Plenix · useScreenLocation, navigate, goToParent, screenHref, parseScreen, useViewState
   Summary: A URL for every screen inside an application (Platforms Standard 4.3: destination, history, back, parent, deep
     link, restoration): hash routes such as #/note/42, #/project/3/tasks or #/search?q=mail. Opening a screen pushes a
     history entry, the browser's Back and Forward bring the screens back, an address opens its screen directly, and the
     header's parent control goes to the logical parent.
   Usage:
     const loc = useScreenLocation({ app: 'notes' });
     loc.parts                          // ['note', '42'] at #/note/42; [] at the start screen
     loc.params.q                       // 'mail' at #/search?q=mail
     loc.navigate(['note', 42])         // push a history entry and show the note (a string path works too: '/note/42')
     loc.parent('/')                    // the logical parent (the header's parent control, a list-detail Back)
     const [view, updateView] = useViewState('notes');   // { paneWidth, scroll, … } kept in localStorage plenix.notes.view
   Props:
     useScreenLocation(options): the current screen; re-renders when it changes. options.app: the application id: the
       last screen is kept in its view state (plenix.<app>.view, screen) and opened on load when the address names no
       screen; options.legacy(hash): maps an older address (#t-3, #account) to a screen path; it is rewritten in place on
       load (the same screen, not a move). The first call on a page sets them.
     returns { path, parts, params, href, navigate(path, params, { replace }), parent(path, params), hrefOf(path, params) }
     navigate(path, params, options): opens a screen from outside React; resolves true when the screen changed (false when
       the person kept unsaved work); options.replace: replace the entry (a correction of the same screen, never a move)
     goToParent(path, params): Back when the previous entry is that parent (the history follows the hierarchy), else a
       new entry for it (after a deep link)
     screenHref(path, params): the address of a screen ("#/note/42?tab=files"); path: a string or a list of parts
       (each part is encoded)
     parseScreen(hash): { path, parts, params, href } of an address
     useViewState(app): [view, update(patch)]: what an application keeps between visits (the pane width, the list's
       scroll position, the last screen); update merges the patch and stores it
   Behavior:
     A new screen is a new history entry (pushState); the history is never rewritten where the person moved, and an
       address opened from outside is opened alone (no padded entries).
     Back and Forward (popstate, hashchange) show the screen of the entry; a link to "#/…" works the same way.
     A screen change asks the unsaved-changes guards first (useUnsavedGuard): when the person keeps editing, Back or
       Forward is undone (the history returns to the entry they were on) and a link or navigate() does nothing.
     An address that is not a screen (the skip link's #main) changes nothing.
     Stored values are read and written in try/catch: without storage everything works for this visit.
   Notes:
     The start screen is "#/" (or no hash). The entries the hook made carry their place in history.state (plxScreen), so
     a traversal knows how far it went and can be undone.
*/
import React from 'react';
import { confirmLeave, hasUnsaved } from './UnsavedGuard.jsx';

const KEY = 'plxScreen';
const isScreen = (hash) => !hash || hash === '#' || hash.indexOf('#/') === 0;

export function screenHref(path, params) {
  const parts = Array.isArray(path) ? path.map((p) => encodeURIComponent(String(p))) : String(path || '/').split('/').filter(Boolean);
  const q = new URLSearchParams();
  Object.keys(params || {}).forEach((k) => { const v = params[k]; if (v !== undefined && v !== null && v !== '') q.append(k, String(v)); });
  const query = q.toString();
  return '#/' + parts.join('/') + (query ? '?' + query : '');
}

export function parseScreen(hash) {
  const h = hash && hash.indexOf('#/') === 0 ? hash.slice(1) : '/';
  const at = h.indexOf('?');
  const parts = (at >= 0 ? h.slice(0, at) : h).split('/').filter(Boolean).map((p) => { try { return decodeURIComponent(p); } catch (e) { return p; } });
  const params = {};
  if (at >= 0) new URLSearchParams(h.slice(at + 1)).forEach((v, k) => { params[k] = v; });
  return { path: '/' + parts.join('/'), parts, params, href: screenHref(parts, params) };
}

/* ── the view state: plenix.<app>.view ── */
const viewKey = (app) => 'plenix.' + app + '.view';
export function readView(app) {
  try { const v = JSON.parse(localStorage.getItem(viewKey(app))); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; }
}
function writeView(app, patch) {
  try { localStorage.setItem(viewKey(app), JSON.stringify(Object.assign(readView(app), patch))); } catch (e) { /* not stored: it lasts for this visit */ }
}

export function useViewState(app) {
  const [view, setView] = React.useState(() => readView(app));
  const update = React.useCallback((patch) => {
    setView((v) => { const p = typeof patch === 'function' ? patch(v) : patch; writeView(app, p); return Object.assign({}, v, p); });
  }, [app]);
  return [view, update];
}

/* ── the page's screen: one per page, shared by every component that asks ── */
let current = null;      // the screen shown: parseScreen(…)
let at = 0;              // the place of the current entry in this tab's history (history.state.plxScreen)
const trail = [];        // trail[i]: the screen of entry i, as far as this page knows
let app = null;          // the application whose last screen is kept
let undoTo = null;       // a traversal being undone: the entry it returns to
let passing = false;     // the person chose Leave: the next traversal goes through
const subscribers = new Set();

const urlOf = (href) => location.pathname + location.search + href;
const placeOf = (state) => (state && typeof state[KEY] === 'number' ? state[KEY] : null);
const tag = (i) => { try { history.replaceState(Object.assign({}, history.state, { [KEY]: i }), '', location.href); } catch (e) { /* no history API */ } };

function show(next, i) {
  at = i;
  trail[i] = next.href;
  if (current && next.href === current.href) return;
  current = next;
  if (app) writeView(app, { screen: next.href });
  subscribers.forEach((f) => f(next));
}

function start(options) {
  if (current) { if (options.app && !app) app = options.app; return; }
  app = options.app || null;
  const hash = location.hash;
  // an older address (#t-3): the same screen under its new address, in place
  const old = !isScreen(hash) && options.legacy ? options.legacy(hash) : null;
  if (old) history.replaceState(history.state, '', urlOf(screenHref(old)));
  // no screen named: the last screen of this application (restoration), in place
  else if (!hash && app) { const last = readView(app).screen; if (last && isScreen(last)) history.replaceState(history.state, '', urlOf(parseScreen(last).href)); }
  current = parseScreen(isScreen(location.hash) ? location.hash : '');
  const place = placeOf(history.state);
  at = place === null ? 0 : place;
  if (place === null) tag(at);
  trail[at] = current.href;
  window.addEventListener('popstate', onTraverse);
  window.addEventListener('hashchange', onTraverse);
}

// Back, Forward, or a link to "#/…" (the browser has already moved: show the entry, or undo the move and ask)
function onTraverse() {
  const place = placeOf(history.state);
  if (undoTo !== null) { if (place === undoTo) undoTo = null; return; }
  const to = place === null ? at + 1 : place;   // an entry the browser added (a link) comes after this one
  if (place === null) tag(to);
  if (!isScreen(location.hash)) { at = to; trail[to] = current.href; return; }   // #main and the like: the same screen
  const next = parseScreen(location.hash);
  if (next.href === current.href) { at = to; trail[to] = next.href; return; }
  if (passing || !hasUnsaved(next)) { passing = false; show(next, to); return; }
  // unsaved work: the page stays where it was while the question is open (the move is undone), and Leave redoes it
  const from = at;
  if (to === from) {   // nothing to undo: put the address of the shown screen back if the person stays
    confirmLeave(next).then((ok) => { if (ok) show(next, to); else history.replaceState(history.state, '', urlOf(current.href)); });
    return;
  }
  undoTo = from;
  history.go(from - to);
  confirmLeave(next).then((ok) => { if (ok) { passing = true; history.go(to - from); } });
}

export function navigate(path, params, options) {
  start({});
  const next = parseScreen(screenHref(path, params));
  if (next.href === current.href) return Promise.resolve(true);
  return confirmLeave(next).then((ok) => {
    if (!ok) return false;
    if (options && options.replace) history.replaceState(Object.assign({}, history.state, { [KEY]: at }), '', urlOf(next.href));
    else { trail.length = at + 1; history.pushState({ [KEY]: at + 1 }, '', urlOf(next.href)); at += 1; }
    show(next, at);
    return true;
  });
}

export function goToParent(path, params) {
  start({});
  const href = parseScreen(screenHref(path, params)).href;
  if (at > 0 && trail[at - 1] === href) { history.back(); return Promise.resolve(true); }
  return navigate(path, params);
}

export function useScreenLocation(options) {
  start(options || {});
  const [loc, setLoc] = React.useState(current);
  React.useEffect(() => {
    subscribers.add(setLoc);
    if (loc !== current) setLoc(current);
    return () => { subscribers.delete(setLoc); };
  }, []);
  return React.useMemo(() => Object.assign({}, loc, { navigate, parent: goToParent, hrefOf: screenHref }), [loc]);
}
