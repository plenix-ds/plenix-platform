const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/tests/targets.test.js';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`    if ((w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0] && !el.labels[0].contains(el) || (w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0]) {`,
`    if ((w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0]) {`);
rep(`    // its box in page coordinates, for the spacing rule
    t.scrollIntoView({ block: 'center', inline: 'center' });
    const r = t.getBoundingClientRect(), sx = window.scrollX, sy = window.scrollY;
    box.push({ el: t, w, h, x: r.left + sx, y: r.top + sy, cx: r.left + r.width / 2 + sx, cy: r.top + r.height / 2 + sy, rw: r.width, rh: r.height, small: w < min - 0.5 || h < min - 0.5 });`,
`    // its box where the page stood before any scrolling (every target measured in the same scroll state), for the spacing rule
    const r = home.get(t);
    box.push({ el: t, w, h, x: r.left, y: r.top, cx: r.left + r.width / 2, cy: r.top + r.height / 2, rw: r.width, rh: r.height, small: w < min - 0.5 || h < min - 0.5 });`);
rep(`  const box = [];
  for (const { el, t } of targets) {`,`  const home = new Map(targets.map(({ t }) => [t, t.getBoundingClientRect()]));
  const box = [];
  for (const { el, t } of targets) {`);
fs.writeFileSync(f,s);
