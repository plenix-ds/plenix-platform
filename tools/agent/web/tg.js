const fs=require('fs');const f='D:/Documents/Projects/Projects_Applications/Plenix/tests/targets.test.js';
let s=fs.readFileSync(f,'utf8');
const rep=(a,b)=>{if(!s.includes(a))throw new Error('missing '+a.slice(0,60));s=s.replace(a,b);};
rep(`// Exceptions (WCAG): a link inside a sentence (inline), a disabled control, and an element whose center another element
// covers (it is not a target where it stands; counted as "covered" in the report only).`,
`// Exceptions (WCAG): a link inside a sentence (inline); a disabled control; a control whose label is an equivalent target
// that meets the size (a checkbox and its label: the larger counts); and an element whose center another element covers
// (it is not a target where it stands; counted as "covered" only).`);
rep(`    // a nested interactive element counts once: the outer one is the target (a row button around a checkbox is two)
    let t = el;`,`    let t = el;`);
rep(`  const box = [];
  for (const { el, t } of targets) {
    t.scrollIntoView({ block: 'center', inline: 'center' });
    const r = t.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const owns = (x) => x && (x === t || t.contains(x) || x === el || el.contains(x) || (x.closest && x.closest('label') === t));
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight || !owns(document.elementFromPoint(cx, cy))) { out.covered++; continue; }
    out.n++;
    // the hit area along the center lines, up to 32px beyond the box
    const reach = (dx, dy, lim) => { let d = 0; while (d < lim) { const x = cx + dx * (d + 1), y = cy + dy * (d + 1); if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight || !owns(document.elementFromPoint(x, y))) break; d++; } return d; };
    const w = reach(-1, 0, r.width / 2 + 32) + reach(1, 0, r.width / 2 + 32) + 1, h = reach(0, -1, r.height / 2 + 32) + reach(0, 1, r.height / 2 + 32) + 1;
    // its box in page coordinates, for the spacing rule
    const sx = window.scrollX, sy = window.scrollY;
    box.push({ el: t, w, h, x: r.left + sx, y: r.top + sy, cx: cx + sx, cy: cy + sy, rw: r.width, rh: r.height, small: w < min - 0.5 || h < min - 0.5 });
  }`,`  // the hit area of one element along its center lines, up to 32px beyond its box (null: covered where it stands)
  const hitArea = (t, el) => {
    const r = t.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    const owns = (x) => x && (x === t || t.contains(x) || x === el || el.contains(x) || (x.closest && x.closest('label') === t));
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight || !owns(document.elementFromPoint(cx, cy))) return null;
    const reach = (dx, dy, lim) => { let d = 0; while (d < lim) { const x = cx + dx * (d + 1), y = cy + dy * (d + 1); if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight || !owns(document.elementFromPoint(x, y))) break; d++; } return d; };
    return { r, cx, cy, w: reach(-1, 0, r.width / 2 + 32) + reach(1, 0, r.width / 2 + 32) + 1, h: reach(0, -1, r.height / 2 + 32) + reach(0, 1, r.height / 2 + 32) + 1 };
  };
  const box = [];
  for (const { el, t } of targets) {
    t.scrollIntoView({ block: 'center', inline: 'center' });
    const a = hitArea(t, el);
    if (!a) { out.covered++; continue; }
    out.n++;
    let { w, h } = a;
    // an equivalent target: the control's label (a checkbox's text), when it is the larger
    if ((w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0] && !el.labels[0].contains(el) || (w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0]) {
      const lab = el.labels[0]; lab.scrollIntoView({ block: 'center', inline: 'center' });
      const b = hitArea(lab, el); if (b && b.w >= min - 0.5 && b.h >= min - 0.5) { w = b.w; h = b.h; }
    }
    // its box in page coordinates, for the spacing rule
    t.scrollIntoView({ block: 'center', inline: 'center' });
    const r = t.getBoundingClientRect(), sx = window.scrollX, sy = window.scrollY;
    box.push({ el: t, w, h, x: r.left + sx, y: r.top + sy, cx: r.left + r.width / 2 + sx, cy: r.top + r.height / 2 + sy, rw: r.width, rh: r.height, small: w < min - 0.5 || h < min - 0.5 });
  }`);
fs.writeFileSync(f,s);
