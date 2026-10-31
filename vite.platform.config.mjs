// Vite step 1 (#709): builds the Platform bundle (platform/index.js) with Vite, beside build-app.js, into the ignored
// folder build/vite/. Nothing reads this output yet; build-app.js still writes platform/dist/platform.js. Run:
//   npm run build:vite-platform
//
// What it matches in build-app.js:
//   - one classic script (iife) that publishes the exports of platform/index.js on window.Plenix
//   - react, react-dom and react-dom/client are the React and ReactDOM globals the page loads from platform/vendor/
//   - the classic JSX runtime (React.createElement): the vendored UMD React has no jsx-runtime
//   - process.env.NODE_ENV is 'production' in the bundled packages (@tanstack)
//   - icon modules (plenix-platform/icons/<set>/<name>) resolve to platform/dist/icons/<set>/<name>.js, written by
//     build-icons.js (run node build-app.js first); a Material one is written on demand, as in build-app.js
//   - the same GENERATED FILE banner, no minifying, no source map
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const GLOBALS = { 'react': 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' };
const BANNER = '/*\n * GENERATED FILE — DO NOT EDIT\n * Source: platform/index.js and the modules it imports\n * Build: npm run build:vite-platform\n */\n';
const ICON = /^plenix-platform\/icons\/(plenix|material)\/([a-z0-9-]+|[a-z0-9]+(?:_[a-z0-9]+)+)$/;

// plenix-platform/icons/<set>/<name>: the asset layout's icon modules, bundled like a source file (build-app.js, #282)
const plenixIcons = {
  name: 'plenix-icons',
  enforce: 'pre',
  resolveId(spec, importer) {
    const icon = ICON.exec(spec);
    if (!icon) return null;
    if (icon[1] === 'material' && icon[2].includes('_')) this.error('Material icons are imported by their dashed name: ' + spec.replace(/_/g, '-') + ' (' + importer + ')');
    const dir = path.join(ROOT, 'platform', 'dist', 'icons', icon[1]);
    const file = icon[1] === 'material' ? require('./platform/icons/layout.js').writeMaterialModule(ROOT, icon[2], dir) : path.join(dir, icon[2] + '.js');
    if (!fs.existsSync(file)) this.error('No icon named ' + icon[2] + ' in the ' + icon[1] + ' set (' + importer + '); run node build-app.js first');
    return file;
  },
};

// the GENERATED FILE banner, added last: Vite's own final pass drops rollup's output.banner from an iife library
const banner = {
  name: 'plenix-banner',
  enforce: 'post',
  generateBundle(options, bundle) {
    for (const chunk of Object.values(bundle)) if (chunk.type === 'chunk') chunk.code = BANNER + chunk.code;
  },
};

export default defineConfig({
  root: ROOT,
  publicDir: false,
  logLevel: 'warn',
  plugins: [plenixIcons, banner],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  esbuild: { jsx: 'transform', jsxFactory: 'React.createElement', jsxFragment: 'React.Fragment' },
  build: {
    outDir: path.join(ROOT, 'build', 'vite'),
    emptyOutDir: false,
    minify: false,
    sourcemap: false,
    target: 'es2020',
    reportCompressedSize: false,
    lib: { entry: path.join(ROOT, 'platform', 'index.js'), formats: ['iife'], name: 'Plenix', fileName: () => 'platform.js' },
    rollupOptions: {
      external: Object.keys(GLOBALS),
      output: { globals: GLOBALS },
    },
  },
});
