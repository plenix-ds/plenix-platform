// The applications' bundles (#709, Vite steps 3 and 4): each suite application's <app>/main.jsx -> <app>/app.js and the
// Asset Manager's dam/app/assets.jsx -> dam/app/assets.js, each one classic script (an iife). Vite builds one iife per run,
// so node build-app.js runs this config once per target (appConfig(id), write: false) after the Platform and writes the
// files only when every bundle compiled. Run alone, it writes one target into the ignored build/vite/:
//   PLENIX_APP=dashboard npx vite build --config vite.apps.config.mjs      (PLENIX_APP=dam for the Asset Manager)
//
// What it keeps from the old bundler of build-app.js (Babel and a module table; retired in #709 step 6):
//   - react, react-dom and react-dom/client are the React and ReactDOM globals, plenix-platform is window.Plenix
//   - the classic JSX runtime (React.createElement), no minifying, no source map
//   - the GENERATED FILE banner in the first lines (tools/icons/site-icons.js and the checks read a bundle's source instead)
//   - the friendly error when a global is missing: the guard after the banner throws the old bundle's words
//     (Plenix: "plenix-platform" is not loaded before this script) for each global the bundle imports
//   - icon modules (plenix-platform/icons/<set>/<name>) through the Platform config's plenix-icons plugin
//   - browser packages other than the approved @tanstack ones are refused
// One change: the old bundler compiled the suite applications without "use strict"; Rollup's output is strict. No application
// module relies on sloppy mode (no implicit globals, no this at the top level, no with, no octal literals; #709 step 3).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { plenixIcons } from './vite.platform.config.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
// the suite's applications (one folder each, beside platform/) and the Asset Manager
export const SUITE = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
export const TARGETS = [{ id: 'dam', name: 'Asset Manager', entry: 'dam/app/assets.jsx', out: 'dam/app/assets.js' }]
  .concat(SUITE.map((id) => ({ id, name: id, entry: id + '/main.jsx', out: id + '/app.js' })));
const GLOBALS = { 'react': 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM', 'plenix-platform': 'Plenix' };
const APPROVED = /^@tanstack\/(react-table|table-core|react-virtual|virtual-core)$/;

// a bare import must be an external, an icon module or an approved browser package
const approved = {
  name: 'plenix-approved',
  enforce: 'pre',
  resolveId(spec, importer) {
    if (!importer || spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('\0') || GLOBALS[spec] || spec.startsWith('plenix-platform/icons/') || APPROVED.test(spec)) return null;
    this.error('Unapproved browser package ' + spec + ' in ' + path.relative(ROOT, importer));
  },
};

// last: the banner and the guard (Vite's own final pass drops rollup's output.banner from an iife library)
function finish(target) {
  const banner = '/*\n * GENERATED FILE — DO NOT EDIT\n * Source: ' + target.entry + ' and the modules it imports\n * Build: node build-app.js (Vite, vite.apps.config.mjs)\n */\n';
  return {
    name: 'plenix-finish',
    enforce: 'post',
    generateBundle(options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        const seen = new Set();
        const guard = chunk.imports.filter((id) => GLOBALS[id] && !seen.has(GLOBALS[id]) && seen.add(GLOBALS[id]))
          .map((id) => 'if (!window.' + GLOBALS[id] + ') throw new Error(\'Plenix: "' + id + '" is not loaded before this script\');\n').join('');
        chunk.code = banner + guard + chunk.code + (chunk.code.endsWith('\n') ? '' : '\n');
      }
    },
  };
}

export function appConfig(id, overrides = {}) {
  const target = TARGETS.find((t) => t.id === id);
  if (!target) throw new Error('No application named ' + id + ' (one of: ' + TARGETS.map((t) => t.id).join(', ') + ')');
  return {
    root: ROOT,
    publicDir: false,
    logLevel: 'warn',
    plugins: [approved, plenixIcons, finish(target)],
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    esbuild: { jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment' },
    build: {
      outDir: path.join(ROOT, 'build', 'vite'),
      emptyOutDir: false,
      minify: false,
      sourcemap: false,
      target: 'es2020',
      reportCompressedSize: false,
      lib: { entry: path.join(ROOT, target.entry), formats: ['iife'], name: 'PlenixApp', fileName: () => path.basename(target.out) },
      rollupOptions: {
        external: Object.keys(GLOBALS),
        output: { globals: GLOBALS },
      },
      ...overrides,
    },
  };
}

export default defineConfig(() => appConfig(process.env.PLENIX_APP || 'dashboard'));
