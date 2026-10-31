// node tools/npm-esm.js < options.json   (run by build-packages.js, never by hand)
// Builds the npm package's ES modules (packages/react/dist/, one per part, #685) with what loads only when asked (#702).
// The browser global, the CDN's plenix.esm.js and the CommonJS build are built without this plugin and keep both built in.
//   Arabic: LocaleProvider's import of i18n/<code>.js (any language but English) becomes languageSlot(code) from
//     i18n/optional.js, an empty catalog that dist/i18n/<code>.js fills (import '@plenix-ds/react/i18n/ar').
//   The icon names: Icon's library.js becomes an empty list with loadLibrary(), and glyphs.js's LIBRARY line (54 KB) is a
//     chunk of its own, loaded the first time Icon meets a name outside the Plenix set.
// The options come on stdin as JSON (build-packages.js's jsOpts with the part entries); a failure exits 1.
'use strict';
const fs = require('fs'), path = require('path');
const esbuild = require('esbuild');

const P = path.resolve(__dirname, '..', 'platform');
const NS = 'plenix-optional';
const optional = { name: NS, setup(build) {
  build.onResolve({ filter: /\/i18n\/\w+\.js$/ }, (a) => (/LocaleProvider\.jsx$/.test(a.importer) && !/\/en\.js$/.test(a.path)
    ? { path: 'language:' + path.basename(a.path, '.js'), namespace: NS } : undefined));
  build.onResolve({ filter: /^\.\/library\.js$/ }, (a) => (/Icon\.jsx$/.test(a.importer) ? { path: 'icon-library', namespace: NS } : undefined));
  build.onResolve({ filter: /^plenix-optional:icon-names$/ }, () => ({ path: 'icon-names', namespace: NS }));
  build.onLoad({ filter: /.*/, namespace: NS }, (a) => {
    const at = { resolveDir: path.join(P, 'i18n'), loader: 'js' };
    if (a.path.startsWith('language:')) return Object.assign(at, { contents: 'import { languageSlot } from "./optional.js";\nexport default languageSlot(' + JSON.stringify(a.path.slice(9)) + ');\n' });
    if (a.path === 'icon-library') return Object.assign(at, { contents: 'export const LIBRARY = "";\nexport const loadLibrary = () => import("plenix-optional:icon-names").then((m) => m.LIBRARY);\n' });
    const line = /^export const LIBRARY = .*$/m.exec(fs.readFileSync(path.join(P, 'components', 'Icon', 'glyphs.js'), 'utf8'));
    if (!line) throw new Error('tools/npm-esm.js: glyphs.js has no LIBRARY line');
    return Object.assign(at, { contents: line[0] + '\n' });
  });
} };

const options = JSON.parse(fs.readFileSync(0, 'utf8'));
esbuild.build(Object.assign(options, { plugins: [optional] })).catch((e) => { console.error(e.message || e); process.exit(1); });
