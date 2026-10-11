/* Plenix · Settings (settings/main.jsx): the application's page entry; build-app.js compiles it to settings/app.js. */
import { appPage, mountSuite } from '../suite/suite.jsx';
import { leavePage } from 'plenix-platform';
import { Settings } from './settings.jsx';

// the settings page: #/<category> opens one (#/account: My Account); the older #<category> opens the same screen
const legacy = (hash) => (/^#[a-z][a-z-]*$/.test(hash) && hash !== '#main' ? '/' + hash.slice(1) : null);   // not the skip link's #main
mountSuite('settings', ({ prefs, setPrefs, screen }) => <Settings screen={screen} prefs={prefs} setPrefs={setPrefs} onBack={() => leavePage(appPage('home'))} />, { page: 'settings', legacy });
