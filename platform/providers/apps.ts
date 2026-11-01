/* Plenix · applications (platform/providers/apps.ts): every Plenix application, in one list for every product. The header
   shows the pinned ones as links and the switcher shows them all (pinned first); the session keeps which are pinned.
   id: the application's id. path: its page, relative to the Plenix folder, where every application has its own folder
   beside platform/ (batch 149). appHref(app, root) turns it into a link from the current page, where root is the
   relative path from that page to the Plenix folder ("../" from an application's page, "../../" from the spec). */
import HomeIcon from 'plenix-platform/icons/plenix/home';
import BriefcaseIcon from 'plenix-platform/icons/plenix/briefcase';
import MessageIcon from 'plenix-platform/icons/plenix/message';
import SettingsUsersIcon from 'plenix-platform/icons/plenix/settings-users';
import CalendarIcon from 'plenix-platform/icons/plenix/calendar';
import CircleCheckIcon from 'plenix-platform/icons/plenix/circle-check';
import DocTextIcon from 'plenix-platform/icons/plenix/doc-text';
import BookmarkIcon from 'plenix-platform/icons/plenix/bookmark';
import FolderIcon from 'plenix-platform/icons/plenix/folder';
import ImageBIcon from 'plenix-platform/icons/plenix/image-b';

// an application: its id, its name, its icon (a name, or for a product's own list an icon module) and its page
export type PlenixApp = { id: string; label: string; icon: string | object; path: string };

export const PLENIX_APPS: PlenixApp[] = [
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
// an application's icon as the imported module the Platform draws (#280): PLENIX_APPS keeps the names (public: an
// application may print or compare them); the header, the switcher and the brand mark draw this. An application of a
// product's own list (not one of these) keeps its own icon, a name or a module
const APP_ICONS: Record<string, object> = { 'home': HomeIcon, 'briefcase': BriefcaseIcon, 'message': MessageIcon, 'settings-users': SettingsUsersIcon, 'calendar': CalendarIcon, 'circle-check': CircleCheckIcon, 'doc-text': DocTextIcon, 'bookmark': BookmarkIcon, 'folder': FolderIcon, 'image-b': ImageBIcon };
export const appIcon = (app: PlenixApp | null | undefined) => (app && (APP_ICONS[app.icon as string] || app.icon)) || null;

export const appById = (id: string) => PLENIX_APPS.find((a) => a.id === id);
export const appHref = (app: PlenixApp, root = '') => root + app.path.split('/').map(encodeURIComponent).join('/').replace(/%23/g, '#');
