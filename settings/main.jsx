/* Plenix · Settings (settings/main.jsx): the application's page entry; build-app.js compiles it to settings/app.js. */
import { appPage, mountSuite } from '../suite/suite.jsx';
import { Settings } from './settings.jsx';

// the settings page: #<category> opens one (#account: My Account)
mountSuite('settings', ({ prefs, setPrefs }) => <Settings startCat={(location.hash || '#general').slice(1)} prefs={prefs} setPrefs={setPrefs} onBack={() => { location.href = appPage('home'); }} />);
