// Phase 2 / #180: repeat the reviewed owner/context pattern without changing token values.
// Run from the repository root: node tools/agent/migrate-180.cjs
const fs = require('fs'), path = require('path');
const root = process.cwd();
function edit(file, from, to) { const p=path.join(root,file), s=fs.readFileSync(p,'utf8'); if (!s.includes(from)) { if(s.includes(to)) return; throw Error(file+': missing source'); } fs.writeFileSync(p,s.replace(from,to)); }
edit('platform/charts/chart-interaction.css','.plx-chart__plot--dimming .plx-chart-dim--off{opacity:var(--plx-comp-chart-interaction-dim-opacity);}', '.plx-chart__plot--dimming{--plx-comp-chart-dim-opacity:var(--plx-comp-chart-interaction-dim-opacity);}\n.plx-chart-dim--off{opacity:var(--plx-comp-chart-dim-opacity,1);}');
for(const name of ['diagram','network-graph']) edit('platform/charts/'+name+'.css','.plx-'+name+' .plx-chart__svg{overflow-x:hidden;overflow-y:hidden;}','/* ChartFrame owns SVG clipping through its clip prop. */');
edit('platform/charts/geo-map.css','.plx-geo-map__view .plx-chart-pattern{vector-effect:non-scaling-stroke;}\n.plx-geo-map__view .plx-chart-keys__ring{stroke-linejoin:round;vector-effect:non-scaling-stroke;}', '.plx-geo-map__view{--plx-comp-chart-pattern-vector-effect:non-scaling-stroke;--plx-comp-chart-keys-vector-effect:non-scaling-stroke;--plx-comp-chart-keys-linejoin:round;}');
edit('platform/charts/chart-a11y.css','.plx-chart-pattern{pointer-events:none;}', '.plx-chart-pattern{pointer-events:none;vector-effect:var(--plx-comp-chart-pattern-vector-effect,none);}');
edit('platform/charts/chart-a11y.css','.plx-chart-keys__ring{fill:none;', '.plx-chart-keys__ring{vector-effect:var(--plx-comp-chart-keys-vector-effect,none);stroke-linejoin:var(--plx-comp-chart-keys-linejoin,miter);fill:none;');
for(const file of ['platform/system/layout-grid.css','platform/dev/grid-overlay.js','lanes/phase2-180/design-system/parts/w01C.records.js','lanes/phase2-180/design-system/parts/w01C.css']) {
 const p=path.join(root,file); let s=fs.readFileSync(p,'utf8'); s=s.replaceAll('plx-layout-grid-overlay__column','plx-layout-grid__column').replaceAll('plx-layout-grid-overlay','plx-layout-grid__overlay');
 if(file.endsWith('layout-grid.css')) s=s.replace('.plx-layout-grid__overlay>.plx-layout-grid{block-size:100%;}', '.plx-layout-grid--overlay{block-size:100%;}');
 if(file.endsWith('grid-overlay.js')) s=s.replace("grid.className = 'plx-layout-grid'", "grid.className = 'plx-layout-grid plx-layout-grid--overlay'");
 if(file.endsWith('w01C.records.js')) s=s.replace("className: 'plx-layout-grid ' + mods", "className: 'plx-layout-grid plx-layout-grid--overlay ' + mods");
 fs.writeFileSync(p,s);
}