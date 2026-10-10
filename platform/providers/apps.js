/* Plenix · applications (platform/providers/apps.js): every Plenix application, in one list for every product. The header
   shows the pinned ones as links and the switcher shows them all (pinned first); the session keeps which are pinned.
   id: the application's id. path: its page, relative to the Plenix folder, where every application has its own folder
   beside platform/ (batch 149). appHref(app, root) turns it into a link from the current page, where root is the
   relative path from that page to the Plenix folder ("../" from an application's page, "../../" from the spec). */
export const PLENIX_APPS = [
  { id: 'home', label: 'Dashboard', icon: 'home', path: 'dashboard/index.html' },
  { id: 'projects', label: 'Projects', icon: 'briefcase', path: 'projects/index.html' },
  { id: 'messaging', label: 'Messages', icon: 'message', path: 'messages/index.html' },
  { id: 'contacts', label: 'Contacts', icon: 'settings-users', path: 'contacts/index.html' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', path: 'calendar/index.html' },
  { id: 'tasks', label: 'Tasks', icon: 'circle-check', path: 'tasks/index.html' },
  { id: 'notes', label: 'Notes', icon: 'doc-text', path: 'notes/index.html' },
  { id: 'bookmarks', label: 'Bookmarks', icon: 'bookmark', path: 'bookmarks/index.html' },
  { id: 'files', label: 'Files', icon: 'folder', path: 'files/index.html' },
  { id: 'assets', label: 'Asset Manager', icon: 'image-b', path: 'dam/index.html' },
];

export const appById = (id) => PLENIX_APPS.find((a) => a.id === id);
export const appHref = (app, root = '') => root + app.path.split('/').map(encodeURIComponent).join('/').replace(/%23/g, '#');
