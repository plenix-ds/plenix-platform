/* Plenix tests · the self-hosting package carries every documented icon (issue 284).
   Summary: every Material name of the Icon's glyph list needs its four files under icons/library/ and every Plenix icon its four files under icons/plenix/ in
     the archive (release/cdn/<version>/plenix-<version>.tgz). build-packages.js now fails the build when one is missing (platform/icons/layout.js
     missingPackageIcons); this test checks the same function against the archive of this checkout's release build.
   The probe is proved able to see a missing file first: with one file taken away, and with a whole folder taken away, the function names what is lacking. Then the real archive
     must lack nothing.
   No browser. Usage: node tests/icon-package-assets-284.test.js   (run by layout.test.js when the Icon component changed; needs the release build) */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..'), VERSION = require(path.join(ROOT, 'package.json')).version;
const ARCHIVE = path.join(ROOT, 'release', 'cdn', VERSION, 'plenix-' + VERSION + '.tgz');
const { missingPackageIcons } = require(path.join(ROOT, 'platform', 'icons', 'layout.js'));
if (!fs.existsSync(ARCHIVE)) { console.log('icon-package-assets-284: FAIL the release build is missing (' + ARCHIVE + '): run node build-packages.js first'); process.exit(1); }
// the probe sees a missing file and a missing folder
assert.deepEqual(missingPackageIcons(ROOT, (f) => f !== 'icons/library/rocket_launch-24.svg'), ['icons/library/rocket_launch-24.svg'], 'the probe sees it: one file taken away is named');
assert.ok(missingPackageIcons(ROOT, (f) => !f.startsWith('icons/plenix/')).length >= 400, 'the probe sees it: the whole Plenix folder taken away is named');
assert.equal(missingPackageIcons(ROOT, () => true).length, 0, 'a package that holds every file lacks nothing');
// the real archive
const held = new Set(execFileSync('tar', ['tzf', ARCHIVE], { maxBuffer: 1 << 28 }).toString().split('\n').map((f) => f.replace(/^\.\//, '')));
const lacking = missingPackageIcons(ROOT, (f) => held.has(f));
assert.deepEqual(lacking.slice(0, 10), [], 'the archive lacks ' + lacking.length + ' documented icon file(s)');
console.log('icon-package-assets-284: OK');
