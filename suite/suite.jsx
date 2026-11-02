/* Plenix suite · shell (suite/suite.jsx): the frame every Plenix application page shares (batch 149). Each application
   is its own page (<folder>/index.html) and mounts itself with mountSuite(appId, render):
   - the Plenix header: the switcher, the pinned applications (links to their pages), search, the Capture action and the
     account menu (My Account and Settings open the settings page);
   - the application's navigation pane (LeftNav) where the application has one, its footer opening its settings;
   - search: Enter in the header searches this application (the dashboard: everything); a result opens its application's
     page; Ask AI opens the AI search in this page;
   - the status bar and the capture overlay.
   render({ prefs, setPrefs, screen }) draws the application's main area. Preferences (Settings) are kept in localStorage
   (plenix.prefs) so every page reads the same ones.
   Screens (Platforms Standard 4.3): every screen has an address in the hash (useScreenLocation): #/search?q=… (the Search
   workspace), #/ask?q=… (the AI search), the application's own screens (#/note/42, #/thread/3, #/project/3/tasks) and,
   on any of them, ?in=<item> for the item chosen in the navigation pane. screen is the location with open(path, params)
   and parent(path, params), which keep the navigation pane's item. The last screen is restored on load (plenix.<app>.view).
   A search result opens its screen: in this page as a new history entry, on another application's page as its address.
   At Narrow the header search is a full-screen view (AppHeader): it shows this application's recent searches (kept in its
   view state, plenix.<app>.view, recentSearches; the last five) and, while a query is typed, its results; choosing one
   leaves the view (its history entry) and opens the result's screen. */
import { SUITE_SESSION } from './session.js';
import { ActivityList, AppHeader, AppShell, DirectionProvider, Icon, SearchField, SectionHeading, SessionProvider, StatusBar, Text, useScreenLocation, useViewState, leavePage } from 'plenix-platform';
import { CaptureUI } from './capture.jsx';
import { LeftNav } from './leftnav.jsx';
import { SearchScreen } from './search.jsx';
import { FindWorkspace, findResults } from './findSources.jsx';
import { afterSearchView } from './searchView.js';
import './prefetch.js';   // the next application page is prerendered on hover (batch 237; moved here from the Platform, issue 458)
const { useState } = React;

// every Plenix application of this suite: its id (PLENIX_APPS), its folder and its label
const SUITE = [
  { id: 'home', folder: 'dashboard', label: 'Dashboard' }, { id: 'projects', folder: 'projects', label: 'Projects' },
  { id: 'messaging', folder: 'messages', label: 'Messages' }, { id: 'contacts', folder: 'contacts', label: 'Contacts' },
  { id: 'calendar', folder: 'calendar', label: 'Calendar' }, { id: 'tasks', folder: 'tasks', label: 'Tasks' },
  { id: 'notes', folder: 'notes', label: 'Notes' }, { id: 'bookmarks', folder: 'bookmarks', label: 'Bookmarks' },
  { id: 'files', folder: 'files', label: 'Files' },
];
// the page of an application, from another application's page (every application folder sits beside the others)
// path: a screen of that application ("/note/42"), its address in the hash
export const appPage = (id, path) => { const a = SUITE.find((x) => x.id === id); return '../' + (a ? a.folder : 'dashboard') + '/index.html' + (path ? '#' + path : ''); };
export const settingsPage = (cat) => '../settings/index.html' + (cat ? '#/' + cat : '');
// the screen a search result opens in its application (FIND_SOURCES keys: a letter for the kind, then the id)
const RESULT_SCREEN = { p: 'project', t: 'thread', c: 'contact', e: 'event', k: 'task', n: 'note', b: 'bookmark', f: 'file' };
// each application's own settings category in Settings (none yet for Bookmarks)
const APP_SETTINGS = { home: 'dashboard', projects: 'projects', messaging: 'email', contacts: 'contacts', calendar: 'calendar', tasks: 'tasks', notes: 'notes', files: 'files' };
// the settings page each application's navigation footer opens
const SETTINGS_FOR = { messaging: 'email', contacts: 'contacts', calendar: 'calendar', tasks: 'tasks', notes: 'notes', files: 'files', projects: 'projects' };
// the applications whose page has a navigation pane (the dashboard, projects and settings draw their own)
const HAS_NAV = ['messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files'];
const FIRST_SUB = { messaging: 't-1', calendar: 'month' };

// the recent searches kept for an application, newest first
const RECENT_MAX = 5;

function readPrefs() { try { return JSON.parse(localStorage.getItem('plenix.prefs')) || {}; } catch (e) { return {}; } }
function writePrefs(p) { try { localStorage.setItem('plenix.prefs', JSON.stringify(p)); } catch (e) { /* this visit only */ } }

function Suite({ app, render, page = 'workspace', legacy }) {
  const [prefs, setPrefsState] = useState(readPrefs);
  const setPrefs = (next) => setPrefsState((cur) => { const v = typeof next === 'function' ? next(cur) : next; writePrefs(v); return v; });
  const loc = useScreenLocation({ app, legacy });
  const top = loc.parts[0];
  const inSuite = SUITE.some((x) => x.id === app);
  const scope = inSuite && app !== 'home' ? app : 'home';
  // the navigation pane's item: ?in=<id> on any screen (Messages: the open conversation is its item)
  const sub = app === 'messaging' && top === 'thread' ? 't-' + loc.parts[1] : (loc.params.in || FIRST_SUB[app] || null);
  const setSub = (id) => { const t = app === 'messaging' && /^t-(\d+)$/.exec(id); if (t) loc.navigate(['thread', t[1]]); else loc.navigate('/', { in: id }); };
  const screen = React.useMemo(() => Object.assign({}, loc, {
    open: (path, params) => loc.navigate(path, Object.assign({ in: loc.params.in }, params)),
    parent: (path, params) => loc.parent(path || '/', Object.assign({ in: loc.params.in }, params)),
  }), [loc]);
  const [capture, setCapture] = useState(false);
  const find = top === 'search' ? { app: scope, query: loc.params.q || '' } : null;   // the search workspace in the main area (app "home": everything)
  const ai = top === 'ask' ? loc.params.q || '' : null;                               // a query handed to the AI search
  const [hq, setHq] = useState(() => (find ? find.query : ''));                       // the header search field
  const label = (SUITE.find((x) => x.id === app) || { label: 'Settings' }).label;
  const openResult = (r, a) => {
    const key = String(r.key || '').split(':').pop();   // everything's rows are keyed "<app>:<key>"
    const kind = RESULT_SCREEN[key.charAt(0)], id = key.slice(1);
    const path = kind && id ? (kind === 'project' ? ['project', id, 'home'] : [kind, id]) : null;
    if (a === app && path) loc.navigate(path); else leavePage(appPage(a, path ? '/' + path.join('/') : ''));
  };
  const tone = { blue: 'accent', frost: 'frost', white: 'plain' }[prefs.headerBar || 'blue'] || 'accent';
  // the page header background (Settings › Appearance): read by EntityHeader from the page root
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-plx-header-tint', prefs.headerTint || 'none');
    root.setAttribute('data-plx-header-tint-style', prefs.headerTintStyle || 'fade');
  }, [prefs.headerTint, prefs.headerTintStyle]);
  // the appearance (Settings › Mode: system, light or dark; Platforms Standard 1.6): theme-boot keeps it for every page
  // (PlenixWorkspace.setMode) and applies it to <html data-plx-mode>. On load the kept choice wins (another app, such as
  // the DAM, may have changed it); a later change of prefs.theme is applied live; a change in another open page comes back
  const modeLoaded = React.useRef(false);
  React.useEffect(() => {
    const ws = window.PlenixWorkspace; if (!ws || !ws.setMode) return;
    if (!modeLoaded.current) { modeLoaded.current = true; if (prefs.theme !== ws.mode()) setPrefs((p) => ({ ...p, theme: ws.mode() })); return; }
    if (prefs.theme) ws.setMode(prefs.theme);
  }, [prefs.theme]);
  React.useEffect(() => {
    const follow = (e) => setPrefs((p) => (p.theme === e.detail.mode ? p : { ...p, theme: e.detail.mode }));
    window.addEventListener('plenix:modechange', follow);
    return () => window.removeEventListener('plenix:modechange', follow);
  }, []);
  const onAccent = tone === 'accent';
  // the header search: Enter (or a recent search) opens the Search workspace and keeps the query among the recent ones
  const [kept, updateKept] = useViewState(app);
  const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
  const runSearch = (text) => {
    const q = text.trim();
    if (q) updateKept((v) => ({ recentSearches: [q].concat((v.recentSearches || []).filter((x) => x !== q)).slice(0, RECENT_MAX) }));
    setHq(q);
    afterSearchView(() => loc.navigate(['search'], { q }));
  };
  const typed = hq.trim().toLowerCase();
  const recentShown = recent.filter((x) => x.toLowerCase().indexOf(typed) >= 0);
  const searchSuggestions = recentShown.length ? <>
    <SectionHeading>Recent searches</SectionHeading>
    <ActivityList label="Recent searches">{recentShown.map((x) => (
      <ActivityList.Item key={x} leading={<Icon name="clock" />} title={x} onOpen={() => runSearch(x)} />
    ))}</ActivityList>
  </> : null;
  const results = typed ? findResults(scope, hq) : null;
  const searchResults = results ? <>
    <SectionHeading>Results</SectionHeading>
    {results.length ? <ActivityList label="Results" stacked>{results.map((r) => (
      <ActivityList.Item key={r.key} title={r.name} meta={r.section ? r.section + ' · ' + r.sub : r.sub} onOpen={() => afterSearchView(() => openResult(r, r.app))} />
    ))}</ActivityList> : <Text variant="secondary" as="p">{'Nothing matches “' + hq.trim() + '”.'}</Text>}
  </> : null;
  // refining the query keeps the same screen (its entry is corrected in place); a new search from the header is a new screen
  const main = ai !== null ? <SearchScreen key={ai} initialQuery={ai} />
    : find ? <FindWorkspace key={find.app} app={find.app} query={find.query} onQuery={(q) => { loc.navigate(['search'], { q }, { replace: true }); setHq(q); }} onOpen={openResult} onAskAI={(q) => loc.navigate(['ask'], { q })} />
    : render({ prefs, setPrefs, screen });
  return (
    <AppShell page={page} mainClassName="plx-shell-main"
      footer={<StatusBar start={<span>{SUITE.length - 1} applications · Lighthouse Way</span>} end={<span>Synced just now</span>} />}
      sideNav={HAS_NAV.includes(app) ? <LeftNav section={app} sub={sub} setSub={setSub} onSettings={() => leavePage(settingsPage(SETTINGS_FOR[app] || 'general'))} /> : null}
      header={<AppHeader tone={tone} currentApp={inSuite ? app : null} appsRoot="../" appName={inSuite ? undefined : label}
        action={<AppHeader.Action variant={onAccent ? 'secondary' : 'primary'} icon="snapshot" onClick={() => setCapture(true)}>Capture</AppHeader.Action>}
        search={<SearchField placeholder={inSuite && app !== 'home' ? 'Search ' + label.toLowerCase() + '…' : 'Search files, notes, contacts…'} label="Search" shortcut="Ctrl K" onAccent={onAccent}
          value={hq} onChange={(e) => setHq(e.target.value)} onClear={() => setHq('')} onKeyDown={(e) => { if (e.key === 'Enter') runSearch(hq); }} />}
        searchSuggestions={searchSuggestions} searchResults={searchResults}
        account={<AppHeader.Account current={app === 'settings' ? (top === 'account' ? 'account' : 'settings') : undefined}
          myAccount={{ href: settingsPage('account') }} settings={{ href: settingsPage('general') }}
          appSettings={APP_SETTINGS[app] ? { app: label, href: settingsPage(APP_SETTINGS[app]) } : {}} />} />}>
      <div className="plx-app-shell__page">{main}</div>
      {capture ? <CaptureUI onClose={() => setCapture(false)} /> : null}
    </AppShell>
  );
}

// mounts an application page: mountSuite('notes', () => <NotesScreen/>)
// opts.page: what kind of page the app is (the design system's layout standard lays it out; default "workspace")
// opts.legacy(hash): the screen path of an older address of this page (#t-3, #account), opened in its place
export function mountSuite(app, render, opts) {
  // the page's own direction (<html dir>), given to the components as context; nothing on the page changes (#262)
  ReactDOM.createRoot(document.getElementById('root')).render(<DirectionProvider follow><SessionProvider session={SUITE_SESSION}><Suite app={app} render={render} page={(opts && opts.page) || 'workspace'} legacy={opts && opts.legacy} /></SessionProvider></DirectionProvider>);
}
