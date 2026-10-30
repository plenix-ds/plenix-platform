#!/usr/bin/env node
// Imports the AI provider logos Avatar shows with ai="<provider>" (owner, 2026-10-29, #637: "use the known SVG logos, keep it
// simple"). Each logo is the brand's single-color mark from Simple Icons (CC0 data, pinned below), its path data unedited,
// placed on Material's grid (viewBox 0 -960 960 960) with the set's padding (1/12 of the square on each side) by a transform
// on the path, so build-icons.js and the Icon allow-list take it like any custom icon. The four files are the same drawing.
//
//   npm pack simple-icons@16.35.0 && tar -xzf simple-icons-16.35.0.tgz
//   node tools/icons/import-brand-logos.js <the unpacked package folder>   writes platform/icons/custom/ai_<provider>*.svg
//
// Sources, brand pages and the logos that are not available: platform/icons/custom/BRANDS.md.
'use strict';
const fs = require('fs');
const path = require('path');

const VERSION = '16.35.0';
// Plenix provider name -> Simple Icons slug
const LOGOS = { anthropic: 'anthropic', claude: 'claude', deepseek: 'deepseek', gemini: 'googlegemini', meta: 'meta', mistral: 'mistralai', perplexity: 'perplexity' };
const OUT = path.resolve(__dirname, '..', '..', 'platform', 'icons', 'custom');
// 24px source square -> the 800px drawing area of the 960 grid, 80px in from each edge (Material's 1/12 padding)
const PLACE = 'matrix(33.333333 0 0 33.333333 80 -880)';

const pkg = process.argv[2];
if (!pkg) { console.error('usage: node tools/icons/import-brand-logos.js <unpacked simple-icons package>'); process.exit(1); }
const version = JSON.parse(fs.readFileSync(path.join(pkg, 'package.json'), 'utf8')).version;
if (version !== VERSION) { console.error('expected simple-icons ' + VERSION + ', found ' + version); process.exit(1); }
for (const [name, slug] of Object.entries(LOGOS)) {
  const svg = fs.readFileSync(path.join(pkg, 'icons', slug + '.svg'), 'utf8');
  const paths = svg.match(/<path\b[^>]*\bd="([^"]+)"/g) || [];
  if (paths.length !== 1 || !/viewBox="0 0 24 24"/.test(svg)) throw new Error(slug + ': not one path on the 24px square');
  const d = /\bd="([^"]+)"/.exec(paths[0])[1];
  const file = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path transform="' + PLACE + '" d="' + d + '"/></svg>\n';
  for (const v of ['', '-fill', '-24', '-24-fill']) fs.writeFileSync(path.join(OUT, 'ai_' + name + v + '.svg'), file);
  console.log('ai-' + name + ' <- simple-icons ' + version + ' ' + slug);
}
