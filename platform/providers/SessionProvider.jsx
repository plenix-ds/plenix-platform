/* Plenix · SessionProvider, useSession
   Summary: Who is signed in, and their notifications, for every Plenix application, from one place.
   Usage:
     <SessionProvider session={…}>{app}</SessionProvider>
     const { account, notifications, setNotifications, pinnedApps, setPinnedApps } = useSession();
   Props:
     session: { account, notifications, pinnedApps } (default: the site's default session, setDefaultSession; empty
       unless the site set one: the Platform ships no person's data)
     setDefaultSession(session): the session a site's pages show when they pass none (the design system: DEMO_SESSION, a
       fictional sample); null restores the empty one
     children: the application root or React island
     useSession(): { account: { name, firstName, lastName, email, src }, notifications: [{ id, text, time, unread }],
       setNotifications(next), pinnedApps: [application ids], setPinnedApps(next | (prev) => next),
       setPicture(dataUrl | null) }
     choosePicture(): opens the file picker for an image and resolves to a 128px square picture (a data: URL), or null
   Behavior:
     The pins are remembered in the browser (localStorage plenix.pinnedApps) until the back end stores them.
     The person's picture is too (localStorage plenix.accountPicture, batch 272): it replaces account.src everywhere.
     Outside a provider useSession() returns the default session (empty unless the site set one).
   Notes:
     The header's account menu (AppHeader.Account) and the dashboard's notifications (NotificationList) read it.
     Any page that shows the person's details reads it too (useSession().account).
     Wrap the application root, or a React island, once.
     An application passes its session (its back end's, or its own sample until then); the Platform ships none.
*/
import React from 'react';

// the demo session: the sample account and notifications every application shows until the back end sends them
// a fictional sample session, for demonstrations (the design system site sets it as its default); the Platform's own
// default is empty: no person's name, address or messages ship in an application that does not pass its own
export const DEMO_SESSION = {
  account: { name: 'Alex Morgan', firstName: 'Alex', lastName: 'Morgan', email: 'alex.morgan@example.com' },
  notifications: [
    { id: 1, text: 'Jordan Lee uploaded 12 new assets to Brand', time: '5 min ago', unread: true },
    { id: 2, text: 'Maya Chen sent a message: Round 3 concepts — confirm Thursday?', time: '10:24 AM', unread: true },
    { id: 3, text: 'Sam Rivera approved your batch download request', time: '22 min ago', unread: true },
    { id: 4, text: 'Task due Mar 8: Deliver logo concepts round 3', time: 'Yesterday', unread: false },
    { id: 5, text: 'Version 3 of Banner Icon Set is now live', time: 'Yesterday', unread: false },
  ],
  pinnedApps: ['home', 'projects', 'messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'assets'],
};

// the default when no session is passed: nobody signed in, no notifications; every application pinned
const EMPTY_SESSION = { account: {}, notifications: [], pinnedApps: DEMO_SESSION.pinnedApps };
let defaultSession = EMPTY_SESSION;
// a site sets the session its pages show when they pass none (the design system: DEMO_SESSION); null restores the empty one
export function setDefaultSession(session) { defaultSession = session || EMPTY_SESSION; }

const SessionContext = React.createContext(null);

const PINS_KEY = 'plenix.pinnedApps';
const PICTURE_KEY = 'plenix.accountPicture';
const readPicture = () => { try { return localStorage.getItem(PICTURE_KEY) || null; } catch (e) { return null; } };

// the file picker for a picture: the image cut to a centered square and drawn at 128px (a small data: URL, a PNG)
export function choosePicture() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) { resolve(null); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const side = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement('canvas');
          c.width = 128; c.height = 128;
          c.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, 128, 128);
          resolve(c.toDataURL('image/png'));
        };
        img.onerror = () => resolve(null);
        img.src = reader.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
    input.click();
  });
}
const readPins = (fallback) => { try { const v = JSON.parse(localStorage.getItem(PINS_KEY)); return Array.isArray(v) ? v : fallback; } catch (e) { return fallback; } };

export function SessionProvider({ session: sessionProp, children }) {
  const session = sessionProp || defaultSession;
  const [notifications, setNotifications] = React.useState(session.notifications || []);
  const [pinnedApps, setPins] = React.useState(() => readPins(session.pinnedApps || EMPTY_SESSION.pinnedApps));
  const [picture, setPictureState] = React.useState(readPicture);
  const setPicture = React.useCallback((v) => {
    try { if (v) localStorage.setItem(PICTURE_KEY, v); else localStorage.removeItem(PICTURE_KEY); } catch (e) { /* not stored: it lasts for this visit */ }
    setPictureState(v || null);
  }, []);
  React.useEffect(() => { setNotifications(session.notifications || []); }, [session]);
  const setPinnedApps = React.useCallback((next) => setPins((prev) => {
    const v = typeof next === 'function' ? next(prev) : next;
    try { localStorage.setItem(PINS_KEY, JSON.stringify(v)); } catch (e) { /* not stored: the pins last for this visit */ }
    return v;
  }), []);
  const account = React.useMemo(() => Object.assign({}, session.account || {}, picture ? { src: picture } : null), [session, picture]);
  const value = React.useMemo(() => ({ account, notifications, setNotifications, pinnedApps, setPinnedApps, setPicture }), [account, notifications, pinnedApps, setPinnedApps, setPicture]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// the session, or the default session outside a provider (setDefaultSession; empty unless the site set one)
export function useSession() {
  const ctx = React.useContext(SessionContext);
  if (ctx) return ctx;
  const pic = readPicture();
  const s = defaultSession;
  return { account: pic ? Object.assign({}, s.account, { src: pic }) : s.account, notifications: s.notifications || [], setNotifications: () => {}, pinnedApps: s.pinnedApps || EMPTY_SESSION.pinnedApps, setPinnedApps: () => {},
    setPicture: (v) => { try { if (v) localStorage.setItem(PICTURE_KEY, v); else localStorage.removeItem(PICTURE_KEY); } catch (e) { /* not stored */ } location.reload(); } };
}
