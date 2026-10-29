// Plenix tests · the icon modules for esbuild (#282, #527): a component imports its icons as plenix-platform/icons/<set>/<name>, a specifier only
// build-app.js resolves (to platform/dist/icons/<set>/<name>.js, written by the build; a Material module is written on demand). A test that bundles
// Platform source with esbuild adds this plugin so those imports resolve the same way:  esbuild.build({ …, plugins: [require('./icon-modules.js'), …] })
// The build (node build-app.js) must have run first, as the browser jobs do.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
module.exports = {
  name: 'icon-modules',
  setup(build) {
    build.onResolve({ filter: /^plenix-platform\/icons\/(plenix|material)\/[a-z0-9_-]+$/ }, (args) => {
      const [, set, name] = /^plenix-platform\/icons\/(plenix|material)\/(.+)$/.exec(args.path);
      const dir = path.join(ROOT, 'platform', 'dist', 'icons', set);
      let file;
      try { file = set === 'material' ? require(path.join(ROOT, 'platform', 'icons', 'layout.js')).writeMaterialModule(ROOT, name, dir) : path.join(dir, name + '.js'); }
      catch (e) { return { errors: [{ text: 'No icon named ' + name + ' in the ' + set + ' set: ' + e.message }] }; }
      if (!fs.existsSync(file)) return { errors: [{ text: 'No icon module ' + path.relative(ROOT, file) + ': run node build-app.js first' }] };
      return { path: file };
    });
  },
};
