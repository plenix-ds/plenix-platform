/* Plenix asset app · page script (app/assets.jsx). Compiled by Plenix/build-app.js into app/assets.js — edit this file,
   never assets.js. Loaded after platform/vendor/react*.development.js and platform/dist/platform.js.

   React islands: during the migration a page keeps its HTML, and each bounded region that has moved to Platform
   components is a mount point, <… data-plx-mount="name">, that this script renders. When a region lands, its legacy
   markup, CSS and plenix.js wiring are deleted in the same batch. When a page's last legacy region is gone, the page
   becomes one React root and include.js and the partials leave it.

   Islands (name · where · since):
     page · a whole page that has moved to React · batch 109
       <div data-plx-mount="page" data-plx-page="my-account"></div> — the page's only content; it loads no include.js,
       partials or plenix.js. Pages: my-account (settings-myaccount.html, batch 109), system-settings (settings-system.html,
       batch 110), home (index.html, batch 111),
       image-editor (image-editor.html, batch 112). (The first island, badge, batch 103, went with the System Settings page.)

   Temporary event bridges between islands and plenix.js: none yet. Each one added must be named plx:<subject>-<event>,
   with one publisher, its consumers and its removal condition listed here. */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, ToastProvider, SessionProvider, DataTable } from 'plenix-platform';
import { MyAccountPage } from './pages/MyAccountPage.jsx';
import { SystemSettingsPage } from './pages/SystemSettingsPage.jsx';
import { HomePage } from './pages/home/HomePage.jsx';
import { ImageEditorPage } from './pages/ImageEditorPage.jsx';

// the Asset Manager's pages are built on tables: start loading their engine while the page draws (batch 237)
DataTable.preload();

const PAGES = {
  'my-account': MyAccountPage,
  'system-settings': SystemSettingsPage,
  home: HomePage,
  'image-editor': ImageEditorPage,
};

const ISLANDS = {
  page: (el) => { const Page = PAGES[el.getAttribute('data-plx-page')]; return Page ? <Page /> : null; },
};

function mount(el) {
  const render = ISLANDS[el.getAttribute('data-plx-mount')];
  if (!render || el.hasAttribute('data-plx-mounted')) return;
  const tree = render(el);   // read the markup before React replaces it
  el.setAttribute('data-plx-mounted', '');
  createRoot(el).render(<ThemeProvider><SessionProvider><ToastProvider>{tree}</ToastProvider></SessionProvider></ThemeProvider>);
}

function mountAll(root) {
  root.querySelectorAll('[data-plx-mount]').forEach(mount);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll(document));
else mountAll(document);
